// const { expect } = require("chai");

describe("WalletFactory", function () {
  let walletFactory;
  let owner;
  let xxx;

  beforeEach(async function () {
    [owner, xxx] = await ethers.getSigners();
    const WalletFactory = await ethers.getContractFactory("WalletFactory");

    walletFactory = await WalletFactory.deploy();
    await walletFactory.deployed();
  });

  it("should create a space, sign agreement and deploy new wallet", async function () {
    const spaceId = ethers.utils.getAddress(
      "0x1234567890123456789012345678901234567890"
    );
    const participants = [
      owner.address,
      //  ,xxx.address
    ];
    const proposedShares = [100];

    console.log("contract address ", walletFactory.address);

    // Create a space and wait for the deployment process to complete
    const xx = await walletFactory.createSpace(
      spaceId,
      participants,
      proposedShares
    );
    await xx.wait();
    // Check if space was created
    const createdSpace = await walletFactory.spaces(spaceId);
    console.log("wallet recorded for space: ", createdSpace.walletCreated);
  }).timeout(600000000000);
});
