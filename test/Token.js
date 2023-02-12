const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DomwstToken contract", function () {
  async function testCommonSetup(initialSupply) {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("DomwstToken");
    const DomwstToken = await Token.deploy(initialSupply);
    return {Token, DomwstToken, owner};
  }

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const initialSupply = 10;
    const { _, DomwstToken, owner } = await testCommonSetup(initialSupply);

    const ownerBalance = await DomwstToken.balanceOf(owner.address);
    expect(initialSupply).to.equal(ownerBalance);
  });

  it("Minting works", async function() {
    const initialSupply = 0;
    const topupAmount = 10;
    const { _, DomwstToken, owner } = await testCommonSetup(initialSupply);

    const ownerBalanceBeforeTopup = await DomwstToken.balanceOf(owner.address);
    expect(initialSupply).to.equal(ownerBalanceBeforeTopup);

    await DomwstToken.mint(owner.address, topupAmount);

    const ownerBalanceAfterTopup = await DomwstToken.balanceOf(owner.address);
    expect(initialSupply + topupAmount).to.equal(ownerBalanceAfterTopup);
  });

  it("Burning works", async function() {
    const initialSupply = 10;
    const burnAmount = 3;
    const { _, DomwstToken, owner } = await testCommonSetup(initialSupply);

    const ownerBalanceBeforeBurn = await DomwstToken.balanceOf(owner.address);
    expect(initialSupply).to.equal(ownerBalanceBeforeBurn);

    await DomwstToken.burn(owner.address, burnAmount);

    const ownerBalanceAfterBurn = await DomwstToken.balanceOf(owner.address);
    expect(initialSupply - burnAmount).to.equal(ownerBalanceAfterBurn);
  });
});
