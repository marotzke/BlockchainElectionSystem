// routes/index.js
import express from 'express';
import contract from 'truffle-contract';
import Web3 from 'web3';
import { vote,
         getCandidatesCount,
         getCandidateInfo,
         getCandidateVoteCount,
         getElectionHasFinished,
         endElection,
         addCandidate
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
        .then((result) => { return res.status(204) })
        .catch((error) => { return res.status(400).json(error) })
});

app.post("/finish", async (req, res, next) => {
    const address = body.address
    endElection(Election, address)
        .then((result) => { return res.status(204) })
        .catch((error) => { return res.status(400).json(error) })
});

app.post("/add_candidate", async (req, res, next) => {
    const name = body.name
    const party = body.party
    addCandidate(Election, name, party)
        .then((result) => { return res.status(204) })
        .catch((error) => { return res.status(400).json(error) })
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
                name: info.name,
                party: info.party
            }
        })
        candidatesInfo = await Promise.all(candidatesInfo.map(async (info, i) => {
             const voteCount = await getCandidateVoteCount(Election, i)
             info.voteCount = voteCount.toNumber()
             return info
        }))
        return res.status(200).json(candidatesInfo)
    } else {
        return res.status(204)
    }
 
})

app.get("/info", async (req, res, next) => {
    const candidateCount = await getCandidatesCount(Election)
    let candidatesInfo = Array(candidateCount.toNumber()).fill()
    candidatesInfo = await Promise.all(candidatesInfo.map((_, i) => getCandidateInfo(Election, i)))
    candidatesInfo = candidatesInfo.map(info => {
        return {
            id: info.id,
            name: info.name,
            party: info.party
        }
    })
    return res.status(200).json(candidatesInfo)
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});