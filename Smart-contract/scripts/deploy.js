const hre = require("hardhat");

async function main() {
  const WalletFactory = await hre.ethers.getContractFactory("WalletFactory");
  const walletFactory = await WalletFactory.deploy();
  await walletFactory.deployed();

  console.log("Contract deployed to:", walletFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
