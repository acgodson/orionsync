// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IMultiSigWallet.sol";
import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract OrionWallet is Initializable, IMultiSigWallet {
    struct Deposit {
        uint256 amount;
        uint256 timestamp;
    }

    // Array to store the addresses of the owners
    address[] public owners;
    // Array to store the percentages of each owner's entitlement
    uint256[] public percentages;
    // Mapping to store the balances of each address
    mapping(address => uint256) public balances;
    // Mapping to store deposits for each address
    mapping(address => Deposit[]) public deposits;

    modifier onlyOwner() {
        require(isOwner(msg.sender), "Only owners can call this function");
        _;
    }

    // Initialization function to set the initial owners and percentages
    function initialize(
        address[] memory _owners,
        uint256[] memory _percentages
    ) public initializer {
        // Check if the contract is already initialized
        require(owners.length == 0, "Already initialized");
        // Check that at least one owner is provided
        require(_owners.length > 0, "At least one owner required");
        // Check that the number of owners matches the number of percentages
        require(
            _owners.length == _percentages.length,
            "Mismatch between owners and percentages"
        );

        // Set the owners and percentages
        owners = _owners;
        percentages = _percentages;
    }

    // Fallback function to handle received tokens
    receive() external payable {
        deposit();
    }

    function isOwner(address account) public view returns (bool) {
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == account) {
                return true;
            }
        }
        return false;
    }

    // Function to handle depositing funds into the wallet
    function deposit() public payable {
        // Check if the deposit amount is valid
        require(msg.value > 0, "Invalid deposit amount");

        // Increase the contract's balance
        balances[address(this)] += msg.value;

        // Distribute the deposited amount to the owners according to their percentages
        for (uint256 i = 0; i < owners.length; i++) {
            // Calculate the amount each owner is entitled to
            uint256 amount = (msg.value * percentages[i]) / 100;
            // Increase the owner's balance
            balances[owners[i]] += amount;
            // Record the deposit for the owner
            deposits[owners[i]].push(Deposit(amount, block.timestamp));
        }
    }

    // Function to withdraw funds from the contract into the owner's address
    function withdraw(uint256 amount) external onlyOwner {
        // Check if the owner has sufficient balance
        require(amount <= balances[msg.sender], "Insufficient balance");

        // Decrease the owner's balance
        balances[msg.sender] -= amount;

        // Transfer the funds to the owner
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    // Function to transfer funds to a specified recipient
    function transfer(
        address payable recipient,
        uint256 amount
    ) external onlyOwner {
        // Check if the owner has sufficient balance
        require(amount <= balances[msg.sender], "Insufficient balance");

        // Decrease the owner's balance
        balances[msg.sender] -= amount;

        // Increase the recipient's balance
        balances[recipient] += amount;

        // Record the transfer for the recipient
        deposits[recipient].push(Deposit(amount, block.timestamp));

        // Transfer the funds to the recipient
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");
    }
}
