const Election = artifacts.require("./Election.sol");

module.exports = function(deployer, _, accounts) {
  deployer.deploy(Election, accounts[0]);
};