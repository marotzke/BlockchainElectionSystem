pragma solidity ^0.5.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        int voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;

    // Read/write candidates
    mapping(uint => Candidate) public candidates;

    // Store Candidates Count
    uint private candidatesCount;

    // End election
    bool private hasFinished;

    // Master address
    address master;

    // Modifier to permission
    modifier onlyMaster {
        require(msg.sender == master);
        _;
    }

    constructor(address masterAddress) public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
        hasFinished = false;
        master = masterAddress;
    }

    function getCandidateVoteCount(uint _candidateId) view public returns (int value) {
        if (hasFinished == true) {
            return candidates[_candidateId].voteCount;
        } else {
            return -1;
        }
    }

    function getCandidateInfo (uint _candidateId) public view  returns (uint id, string memory name) {
        return (candidates[_candidateId].id, candidates[_candidateId].name);
    }

    function getCandidatesCount () public view returns (uint count) {
        return candidatesCount;
    }

    function addCandidate (string memory _name) private {
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        candidatesCount ++;
    }

    function endElection() public onlyMaster {
        hasFinished = true;
    }

    function getHasFinished() public view returns (bool finished) {
        return hasFinished;
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        // require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;
    }
}