require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

const goerliPrivateKey = process.env.GOERLI_PRIVATE_KEY;
const url = process.env.API_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: url,
      accounts: [goerliPrivateKey],
    },
  },
};
