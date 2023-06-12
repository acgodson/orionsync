const { expect } = require("chai");

describe("WalletFactory", function () {
  let walletFactory;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const WalletFactory = await ethers.getContractFactory("WalletFactory");
    walletFactory = await WalletFactory.deploy();
    await walletFactory.deployed();
  });

  it("should create a space and sign an agreement", async function () {
    console.log("let's me check");

    const spaceId = 1;
    const participants = [owner.address];
    const proposedShares = [100];

    // Create a space and wait for the deployment process to complete
    await walletFactory.createSpace(spaceId, participants, proposedShares);
    console.log("space created");

    // Check if the wallet was created
    const walletAddress = await walletFactory.wallets(spaceId);
    console.log(walletAddress);
  }).timeout(600000);
});
