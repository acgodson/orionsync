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
    const spaceId = 94313;
    const participants = [owner.address, xxx.address];
    const proposedShares = [50, 50];

    console.log("leader address ", xxx.address);
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

    // Sign the agreement as participant 2
    await walletFactory.connect(xxx).signAgreement(spaceId);

    // Check if the wallet was created
    const walletAddress = await walletFactory.wallets(spaceId);

    console.log("wallet address", walletAddress);

    const newSpaceInfo = await walletFactory.spaces(spaceId);
    console.log("wallet recorded for space: ", newSpaceInfo.walletCreated);

    const OrionWallet = await ethers.getContractFactory("OrionWallet");

    // Attach to the deployed OrionWallet contract
    const wallet = OrionWallet.attach(walletAddress);

    const ownersShare = await wallet.shares(owner.address);
    console.log("Owner's share:", ownersShare);
  }).timeout(60000000000);
});
