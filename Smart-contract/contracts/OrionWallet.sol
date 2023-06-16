pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OrionWallet is Initializable {
    struct Deposit {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => uint256) public balances;
    mapping(address => Deposit[]) public deposits;
    mapping(address => uint256) public shares;
    address[] public owners;

    modifier onlyOwner() {
        require(isOwner(msg.sender), "Only owners can call this function.");
        _;
    }

    function initialize(
        address[] memory _ownerAddresses,
        uint256[] memory _shares
    ) public initializer {
        require(_ownerAddresses.length > 0, "At least one owner required");
        require(
            _ownerAddresses.length == _shares.length,
            "Mismatch between owners and shares"
        );

        for (uint256 i = 0; i < _ownerAddresses.length; i++) {
            address owner = _ownerAddresses[i];
            uint256 share = _shares[i];

            require(owner != address(0), "Invalid owner address");
            require(share > 0, "Invalid share");

            owners.push(owner);
            shares[owner] = share;
        }
    }

    // Fallback function to handle received Ether
    receive() external payable {
        deposit();
    }

    function deposit() public payable {
        require(msg.value > 0, "Invalid deposit amount");

        balances[address(this)] += msg.value;

        for (uint256 i = 0; i < owners.length; i++) {
            address owner = owners[i];
            uint256 share = shares[owner];
            uint256 amount = (msg.value * share) / 100;

            balances[owner] += amount;
            deposits[owner].push(Deposit(amount, block.timestamp));
        }
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= balances[msg.sender], "Insufficient balance");

        balances[msg.sender] -= amount;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    function transfer(
        address payable recipient,
        uint256 amount
    ) external onlyOwner {
        require(amount <= balances[msg.sender], "Insufficient balance");

        balances[msg.sender] -= amount;

        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");
    }

    function isOwner(address ownerAddress) public view returns (bool) {
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == ownerAddress) {
                return true;
            }
        }
        return false;
    }
}
