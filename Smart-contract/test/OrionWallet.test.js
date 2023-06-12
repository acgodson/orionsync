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

    console.log("leader address ", owner.address);
    console.log("contract address ", walletFactory.address);

    // Create a space and wait for the deployment process to complete
    const xx = await walletFactory.createSpace(
      spaceId,
      participants,
      proposedShares
    );
    await xx.wait();
    // Check if space was created
    const spaceInfo = await walletFactory.spaces(spaceId);
    console.log("space info", spaceInfo);

    // Check if the wallet was created
    const walletAddress = await walletFactory.wallets(spaceId);

    console.log("wallet address", walletAddress);

    const OrionWallet = await ethers.getContractFactory("OrionWallet");

    // Attach to the deployed OrionWallet contract
    const wallet = OrionWallet.attach(walletAddress);


    const ownersBalance = await wallet.balances(owner.address);
    console.log("wallet ownerBalance:", ownersBalance);
  }).timeout(60000000000);
});
