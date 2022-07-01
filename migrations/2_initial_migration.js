const ICO = artifacts.require("GBTokenAndCrowdsale");

module.exports = function (deployer) {
  deployer.deploy(ICO ,1000);
};
