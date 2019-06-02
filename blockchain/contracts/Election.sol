pragma solidity ^0.5.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string party;
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
        require(msg.sender == master, "Sender is master");
        _;
    }

    // Modifier has finished
    modifier hasFinishedModifier {
        require(hasFinished == true, "Election has finished");
        _;
    }

    constructor(address masterAddress) public {
        master = masterAddress;
        addCandidate("Candidate 1", "PT");
        addCandidate("Candidate 2", "PSDB");
        hasFinished = false;
    }

    function getCandidateVoteCount(uint _candidateId) public view  hasFinishedModifier returns (int value) {
        return candidates[_candidateId].voteCount;
    }

    function getCandidateInfo (uint _candidateId) public view  returns (uint id, string memory name, string memory party) {
        return (candidates[_candidateId].id,
                candidates[_candidateId].name,
                candidates[_candidateId].party);
    }

    function getCandidatesCount () public view returns (uint count) {
        return candidatesCount;
    }

    function addCandidate (string memory _name, string memory _party) public onlyMaster {
        candidates[candidatesCount] = Candidate(candidatesCount, _party, _name, 0);
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