// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./OrionWallet.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

contract WalletFactory is Ownable {
    event SpaceCreated(address indexed spaceId, address indexed leader);
    event WalletCreated(address indexed spaceId, address indexed wallet);

    address public EPNS_COMM_ADDRESS =
        0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa;

    bytes32 public salt;

    struct Space {
        address leader; //retrievable
        address[] participants;
        uint256[] proposedShares;
        bool walletCreated; //retrievable
        mapping(address => bool) participantsSigned;
    }

    mapping(address => Space) public spaces;
    mapping(address => address) public wallets;

    /**
     * @dev Creates a new space with specified participants and proposed shares.
     * @param spaceId The ID of the space.
     * @param _participants The addresses of the participants.
     * @param _proposedShares The proposed shares for each participant.
     */
    function createSpace(
        address spaceId,
        address[] memory _participants,
        uint256[] memory _proposedShares
    ) external {
        require(!isSpaceCreated(spaceId), "Space already created");
        require(_participants.length > 0, "At least one participant required");
        require(
            _participants.length == _proposedShares.length,
            "Mismatch between participants and proposedShares"
        );
        Space storage space = spaces[spaceId];
        space.participants = _participants;
        space.proposedShares = _proposedShares;
        require(
            space.participants.length > 0,
            "Failed to update partcicpants" //this is used to test a bug
        );

        space.leader = msg.sender; // Assign the leader address
        space.walletCreated = false;

        // Set the leader's signature to true
        space.participantsSigned[msg.sender] = true;

        // Check if all participants have signed
        if (allParticipantsSigned(spaceId)) {
            createWallet(spaceId);
        }

        emit SpaceCreated(spaceId, msg.sender);
    }

    /**
     * @dev Checks if a space has been created.
     * @param spaceId The ID of the space.
     * @return A boolean indicating if the space has been created.
     */

    function isSpaceCreated(address spaceId) public view returns (bool) {
        return spaces[spaceId].leader != address(0);
    }

    /**
     * @dev Allows a participant to sign the agreement for a space.
     * @param spaceId The ID of the space.
     */
    function signAgreement(address spaceId) external {
        require(isSpaceCreated(spaceId), "Space does not exist");
        require(
            !spaces[spaceId].participantsSigned[msg.sender],
            "Participant has already signed"
        );

        Space storage space = spaces[spaceId];
        space.participantsSigned[msg.sender] = true;

        // Check if all participants have signed
        if (allParticipantsSigned(spaceId)) {
            createWallet(spaceId);
        }
    }

    function isParticipantSigned(
        address spaceId,
        address participant
    ) external view returns (bool) {
        return spaces[spaceId].participantsSigned[participant];
    }

    /**
     * @dev Checks if all participants of a space have signed the agreement.
     * @param spaceId The ID of the space.
     * @return A boolean indicating if all participants have signed.
     */
    function allParticipantsSigned(
        address spaceId
    ) internal view returns (bool) {
        Space storage space = spaces[spaceId];

        for (uint256 i = 0; i < space.participants.length; i++) {
            address participant = space.participants[i];
            if (!space.participantsSigned[participant]) {
                return false;
            }
        }

        return true;
    }

    //  * @dev Creates a new wallet for a space using Create2 deployment.
    function createWallet(address spaceId) internal {
        Space storage space = spaces[spaceId];

        // Retrieve participants and shares for the space
        address[] memory participants = space.participants;
        uint256[] memory shares = space.proposedShares;

        // Generate salt using the spaceID and the deploymentNonce
        salt = keccak256(abi.encode(spaceId)); // Update the contract-level salt

        // Compute the expected address based on the deployment bytecode and salt
        bytes memory bytecode = type(OrionWallet).creationCode;
        address expectedAddress = Create2.computeAddress(
            salt,
            keccak256(bytecode)
        );

        // Create the wallet if it doesn't already exist
        address wallet = Create2.deploy(
            0,
            salt,
            type(OrionWallet).creationCode
        );

        OrionWallet(payable(wallet)).initialize(participants, shares);

        // Require the deployed address to be equal to the expected address
        require(
            address(wallet) == expectedAddress,
            "Deployed address does not match the expected address"
        );

        // Store the wallet address in the mapping
        wallets[spaceId] = address(wallet);

        space.walletCreated = true;
        emit WalletCreated(spaceId, address(wallet));

        for (uint256 i = 0; i < participants.length; i++) {
            address recipient = participants[i];
            IPUSHCommInterface(
                address(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)
            ).sendNotification(
                    recipient,
                    address(0xf2750684eB187fF9f82e2F980f6233707eF5768C),
                    bytes(
                        string(
                            // We are passing identity here: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                            abi.encodePacked(
                                "0", // this is notification identity: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/identity/payload-identity-implementations
                                "+", // segregator
                                "3", // this is payload type: https://docs.epns.io/developers/developer-guides/sending-notifications/advanced/notification-payload-types/payload (1, 3 or 4) = (Broadcast, targetted or subset)
                                "+", // segregator
                                "New Wallet", // this is notificaiton title
                                "+", // segregator
                                "Consensus Wallet has been created successfully with address "
                                // notification body
                            )
                        )
                    )
                );
        }
    }

    function addressToString(
        address addr
    ) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = "0";
        str[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }

        return string(str);
    }
}
