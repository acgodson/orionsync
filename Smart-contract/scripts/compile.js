const fs = require("fs");
const path = require("path");
const { run } = require("hardhat");

async function compile() {
  await run("compile");

  const artifactsPath = path.join(
    __dirname,
    "../artifacts/contracts/OrionWallet.sol/OrionWallet.json"
  );
  const { bytecode } = JSON.parse(fs.readFileSync(artifactsPath));

  console.log("Deployment Bytecode:");
  console.log(bytecode);
}

compile().catch(console.error);
