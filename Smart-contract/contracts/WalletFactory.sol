// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./OrionWallet.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";

contract WalletFactory {
    event WalletCreated(
        address indexed wallet,
        address[] indexed owners,
        uint256[] percentages,
        uint indexed salt
    );

    // Salt value used for wallet deployment
    uint public salt;

    // Function to create a new wallet
    function createWallet(
        address[] memory _owners,
        uint256[] memory _percentages
    ) external returns (address) {
        // Check that at least one owner is provided
        require(_owners.length > 0, "At least one owner required");
        // Check that the number of owners matches the number of percentages
        require(
            _owners.length == _percentages.length,
            "Mismatch between owners and percentages"
        );

        // Deploy a new wallet
        address wallet = Create2.deploy(
            0,
            bytes32(salt),
            type(OrionWallet).creationCode
        );

        // Initialize the newly deployed wallet with the provided owners and percentages
        OrionWallet(payable(wallet)).initialize(_owners, _percentages);

        // Increment the salt value for the next wallet deployment
        salt = salt + 1;

        // Emit an event indicating the creation of the wallet
        emit WalletCreated(wallet, _owners, _percentages, salt);

        // Return the address of the created wallet
        return wallet;
    }

    // Function to compute the address of a potential wallet deployment
    function getAddress() public view returns (address) {
        return
            Create2.computeAddress(
                bytes32(salt),
                keccak256(type(OrionWallet).creationCode)
            );
    }
}
