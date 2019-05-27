// routes/index.js
import express from 'express';
import contract from 'truffle-contract';
import Web3 from 'web3';

const app = express();
const URL = "http://localhost:8545"
const provider = new Web3.providers.HttpProvider(URL)

const ElectionJson = require("../../../blockchain/build/contracts/Election.json")
const Election = contract(ElectionJson)
Election.setProvider(provider);
const account = "b055264b1cb8e62d3b1a3c133de014c21093416d"

const vote = async (candidateId, address) => {
    return Election.deployed()
        .then((deployed) => { return deployed.vote(candidateId, {from: address}) })
        .then((result) => { console.log(result); return result })
        .catch((error) => { console.log(error); return error })
}

const getCandidatesCount = async () => {
    return Election.deployed()
        .then((deployed) => { return deployed.getCandidatesCount() })
        .then((count) => { console.log(count); return count })
        .catch((error) => { console.log(error); return error })
}

const getCandidateInfo = async (candidateId) => {
    return Election.deployed()
        .then((deployed) => { return deployed.getCandidateInfo(candidateId) })
        .then((candidateInfo) => { console.log(candidateInfo); return candidateInfo })
        .catch((error) => { console.log(error); return error })
}

const getCandidateVoteCount = async (candidateId) => {
    return Election.deployed()
        .then((deployed) => { return deployed.getCandidateVoteCount(candidateId) })
        .then((candidateVoteCount) => { console.log(candidateVoteCount); return candidateVoteCount })
        .catch((error) => { console.log(error); return error })
}

const getElectionHasFinished = async () => {
    return Election.deployed()
        .then((deployed) => { return deployed.getHasFinished() })
        .catch((error) => { console.log(error); return error })
}

const endElection = async (address) => {
    return Election.deployed()
        .then((deployed) => { return deployed.endElection(address)})
        .catch((error) => { console.log(error); return error})
}

app.post("/vote", async (req, res, next) => {
    const candidateId = body.id
    vote(candidateId)
        .then((result) => { return res.json(result) })
        .catch((error) => { return res.json(error) })
});

app.post("/finish", async (req, res, next) => {
    const address = body.address
    endElection(address)
        .then((result) => { return res.json(result) })
        .catch((error) => { return res.json(error) })
});

app.get("/results", async (req, res, next) => {
    const hasEnded = await getElectionHasFinished()
    if (hasEnded){
        const candidateCount = await getCandidatesCount()
        let candidatesInfo = Array(candidateCount.toNumber()).fill()
        candidatesInfo = await Promise.all(candidatesInfo.map((_, i) => getCandidateInfo(i)))
        candidatesInfo = candidatesInfo.map(info => {
            return {
                id: info.id,
                name: info.name
            }
        })
        candidatesInfo = await Promise.all(candidatesInfo.map(async (info, i) => {
             const voteCount = await getCandidateVoteCount(i)
             info.voteCount = voteCount.toNumber()
             return info
        }))
        return res.json(candidatesInfo)
    } else {
        return res.json("Em andamento")
    }
 
})

app.get("/info", async (req, res, next) => {
    const candidateCount = await getCandidatesCount()
    let candidatesInfo = Array(candidateCount.toNumber()).fill()
    candidatesInfo = await Promise.all(candidatesInfo.map((_, i) => getCandidateInfo(i)))
    candidatesInfo = candidatesInfo.map(info => {
        return {
            id: info.id,
            name: info.name
        }
    })
    return res.json(candidatesInfo)
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});