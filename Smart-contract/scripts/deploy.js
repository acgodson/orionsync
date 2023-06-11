// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const Create2Deployer = await hre.ethers.getContractFactory(
    "Create2Deployer"
  );
  const create2Deployer = await Create2Deployer.attach(
    "0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2"
  );

  const WalletFactory = await hre.ethers.getContractFactory("WalletFactory");
  const salt =
    "0x0001000000000000000000000000000000000010000000000000000001011010";
  console.log("salt", salt);

  const tx = await create2Deployer.deploy(0, salt, WalletFactory.bytecode);
  await tx.wait();
  const bytecodehash = hre.ethers.utils.keccak256(WalletFactory.bytecode);
  const address = await create2Deployer.computeAddress(salt, bytecodehash);
  console.log("address", address);

  // const xDeployer = await XDeployer.attach(address);
  // await xDeployer.initialize(
  //   "0xe432150cce91c13a887f7D836923d5597adD8E31",
  //   "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6"
  // );
  // console.log("xDeployer", xDeployer.address);

  // await sleep(10000);

  // await hre.run("verify:verify", {
  //   address: address,
  // });
  // console.log("verified");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
