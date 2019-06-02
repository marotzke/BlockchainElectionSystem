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
app.use(express.urlencoded())
const URL = "http://localhost:8545"
const provider = new Web3.providers.HttpProvider(URL)

const ElectionJson = require("../../../blockchain/build/contracts/Election.json")
const Election = contract(ElectionJson)
Election.setProvider(provider);

/**
 * @api {post} /vote Votes on a candidate
 * @apiName Votes
 * @apiGroup Election
 *
 *
 * @apiParam (Request body) {String} id Candidate Id
 * @apiParam (Request body) {String} address Voter address 
 * 
 */

app.post("/vote", async (req, res, next) => {
    const candidateId = req.body.id
    const address = req.body.address
    await vote(Election, candidateId, address)
        .then((result) => { return res.status(204).send() })
        .catch((error) => { return res.status(400).json(error) })
});


/**
 * @api {post} /finish Finishes election
 * @apiName Finish
 * @apiGroup Election
 *
 *
 * @apiParam (Request body) {String} address Master address
 * 
 */

app.post("/finish", async (req, res, next) => {
    const address = req.body.address
    await endElection(Election, address)
        .then((result) => { return res.status(204).send() })
        .catch((error) => { return res.status(400).json(error) })
});

/**
 * @api {post} /add_candidate Adds new candidate
 * @apiName Add Candidate
 * @apiGroup Election
 *
 *
 * @apiParam (Request body) {String} name Name of the candidate
 * @apiParam (Request body) {String} party Party of the candidate 
 * @apiParam (Request body) {String} address Master address 
 * 
 */


app.post("/add_candidate", async (req, res, next) => {
    const name = req.body.name
    const party = req.body.party
    const address = req.body.address
    await addCandidate(Election, name, party, address)
        .then((result) => { return res.status(204).send() })
        .catch((error) => { return res.status(404).json(error) })
});

/**
 * @api {get} /results Request election results
 * @apiName Results
 * @apiGroup Election
 *
 *
 * @apiSuccess {Object[]} candidates List of cadidates.
 * @apiSuccess {Number} candidate.id  Id of the candidate.
 * @apiSuccess {String} candidate.name Name of the candidate.
 * @apiSuccess {String} candidate.party Party of the candidate.
 * @apiSuccess {Number} candidate.voteCount Vote Count of the candidate.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "id": 0,
 *             "name": "Joao",
 *             "party": "PT",
 *             "voteCount": 112
 *         },
 *         {
 *             "id": 1,
 *             "name": "Otavio",
 *             "party": "PSDB",
 *             "voteCount": 87
 *         }
 *     ]
 *
 */

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
        return res.status(204).send()
    }
 
})


/**
 * @api {get} /info Request candidates info
 * @apiName Info
 * @apiGroup Election
 *
 *
 * @apiSuccess {Object[]} candidates List of cadidates.
 * @apiSuccess {Number} candidate.id  Id of the candidate.
 * @apiSuccess {String} candidate.name Name of the candidate.
 * @apiSuccess {String} candidate.party Party of the candidate.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "id": 0,
 *             "name": "Joao",
 *             "party": "PT",
 *         },
 *         {
 *             "id": 1,
 *             "name": "Otavio",
 *             "party": "PSDB",
 *         }
 *     ]
 *
 */

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