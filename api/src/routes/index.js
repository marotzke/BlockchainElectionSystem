// routes/index.js
import express from 'express';
import contract from 'truffle-contract';
import Web3 from 'web3';
import { vote,
         getCandidatesCount,
         getCandidateInfo,
         getCandidateVoteCount,
         getElectionHasFinished,
         endElection
       } from '../controllers/controllers'

const app = express();
const URL = "http://localhost:8545"
const provider = new Web3.providers.HttpProvider(URL)

const ElectionJson = require("../../../blockchain/build/contracts/Election.json")
const Election = contract(ElectionJson)
Election.setProvider(provider);
const account = "b055264b1cb8e62d3b1a3c133de014c21093416d"


app.post("/vote", async (req, res, next) => {
    const candidateId = body.id
    vote(Election, candidateId)
        .then((result) => { return res.json(result) })
        .catch((error) => { return res.json(error) })
});

app.post("/finish", async (req, res, next) => {
    const address = body.address
    endElection(Election, address)
        .then((result) => { return res.json(result) })
        .catch((error) => { return res.json(error) })
});

app.get("/results", async (req, res, next) => {
    const hasEnded = await getElectionHasFinished(Election)
    if (hasEnded){
        const candidateCount = await getCandidatesCount(Election)
        let candidatesInfo = Array(candidateCount.toNumber()).fill()
        candidatesInfo = await Promise.all(candidatesInfo.map((_, i) => getCandidateInfo(Election, i)))
        candidatesInfo = candidatesInfo.map(info => {
            return {
                id: info.id,
                name: info.name
            }
        })
        candidatesInfo = await Promise.all(candidatesInfo.map(async (info, i) => {
             const voteCount = await getCandidateVoteCount(Election, i)
             info.voteCount = voteCount.toNumber()
             return info
        }))
        return res.json(candidatesInfo)
    } else {
        return res.json("Em andamento")
    }
 
})

app.get("/info", async (req, res, next) => {
    const candidateCount = await getCandidatesCount(Election)
    let candidatesInfo = Array(candidateCount.toNumber()).fill()
    candidatesInfo = await Promise.all(candidatesInfo.map((_, i) => getCandidateInfo(Election, i)))
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