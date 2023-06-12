// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

interface ISharedWallet {
    function deposit() external payable;

    function withdraw(uint256 amount) external;

    function transfer(address payable recipient, uint256 amount) external;
    // Add other function signatures from the orionwallet contract
}
