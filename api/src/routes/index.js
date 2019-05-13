// routes/index.js
import express from 'express';
import contract from 'truffle-contract';
import Web3 from 'web3';

const app = express();
const URL = "http://localhost:8545"
const provider = new Web3.providers.HttpProvider(URL)

const ElectionJson = require("../../../poc/build/contracts/Election.json")
const Election = contract(ElectionJson)
Election.setProvider(provider);
const account = "b055264b1cb8e62d3b1a3c133de014c21093416d"

const vote = async (candidateId) => {
    return Election.deployed()
        .then((deployed) => { return deployed.vote(candidateId, {from: account}) })
        .then((result) => { console.log(result); return result })
        .catch((error) => { console.log(error); return error })
}

app.get("/", async (req, res, next) => {
    vote(1)
        .then((result) => { return res.json(result) })
        .catch((error) => { return res.json(error) })
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});