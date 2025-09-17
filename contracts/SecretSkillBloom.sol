// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretSkillBloom is SepoliaConfig {
    using FHE for *;
    
    struct Skill {
        euint32 skillId;
        euint32 cost;
        euint32 level;
        ebool isUnlocked;
        ebool isEncrypted;
        string name;
        string description;
        string branch;
        address owner;
        uint256 unlockTime;
    }
    
    struct Player {
        euint32 totalSkillPoints;
        euint32 combatLevel;
        euint32 magicLevel;
        euint32 supportLevel;
        euint32 hybridLevel;
        ebool isActive;
        address wallet;
        uint256 joinTime;
    }
    
    struct Tournament {
        euint32 tournamentId;
        euint32 entryFee;
        euint32 prizePool;
        ebool isActive;
        ebool isRevealed;
        string name;
        address organizer;
        uint256 startTime;
        uint256 endTime;
    }
    
    mapping(uint256 => Skill) public skills;
    mapping(address => Player) public players;
    mapping(uint256 => Tournament) public tournaments;
    mapping(address => mapping(uint256 => ebool)) public playerSkills;
    mapping(address => euint32) public playerReputation;
    
    uint256 public skillCounter;
    uint256 public tournamentCounter;
    
    address public owner;
    address public verifier;
    
    event SkillUnlocked(uint256 indexed skillId, address indexed player, uint32 cost);
    event TournamentCreated(uint256 indexed tournamentId, address indexed organizer, string name);
    event TournamentJoined(uint256 indexed tournamentId, address indexed player);
    event TournamentRevealed(uint256 indexed tournamentId);
    event ReputationUpdated(address indexed player, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createSkill(
        string memory _name,
        string memory _description,
        string memory _branch,
        externalEuint32 _cost,
        bytes calldata inputProof
    ) public onlyOwner returns (uint256) {
        uint256 skillId = skillCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalCost = FHE.fromExternal(_cost, inputProof);
        
        skills[skillId] = Skill({
            skillId: FHE.asEuint32(skillId),
            cost: internalCost,
            level: FHE.asEuint32(0),
            isUnlocked: FHE.asEbool(false),
            isEncrypted: FHE.asEbool(_cost > FHE.asEuint32(2)), // Skills with cost > 2 are encrypted
            name: _name,
            description: _description,
            branch: _branch,
            owner: address(0),
            unlockTime: 0
        });
        
        return skillId;
    }
    
    function joinGame() public returns (uint256) {
        require(players[msg.sender].wallet == address(0), "Player already exists");
        
        players[msg.sender] = Player({
            totalSkillPoints: FHE.asEuint32(5), // Starting skill points
            combatLevel: FHE.asEuint32(0),
            magicLevel: FHE.asEuint32(0),
            supportLevel: FHE.asEuint32(0),
            hybridLevel: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            wallet: msg.sender,
            joinTime: block.timestamp
        });
        
        playerReputation[msg.sender] = FHE.asEuint32(0);
        
        return block.timestamp;
    }
    
    function unlockSkill(
        uint256 skillId,
        externalEuint32 skillPoints,
        bytes calldata inputProof
    ) public returns (bool) {
        require(players[msg.sender].wallet != address(0), "Player not registered");
        require(skills[skillId].owner != address(0), "Skill does not exist");
        
        // Convert externalEuint32 to euint32
        euint32 internalSkillPoints = FHE.fromExternal(skillPoints, inputProof);
        
        // Check if player has enough skill points
        ebool hasEnoughPoints = FHE.gt(players[msg.sender].totalSkillPoints, skills[skillId].cost);
        require(FHE.decrypt(hasEnoughPoints), "Insufficient skill points");
        
        // Deduct skill points
        players[msg.sender].totalSkillPoints = FHE.sub(players[msg.sender].totalSkillPoints, skills[skillId].cost);
        
        // Unlock skill
        playerSkills[msg.sender][skillId] = FHE.asEbool(true);
        skills[skillId].isUnlocked = FHE.asEbool(true);
        skills[skillId].owner = msg.sender;
        skills[skillId].unlockTime = block.timestamp;
        
        // Update branch levels
        if (FHE.eq(FHE.asEuint32(keccak256(bytes(skills[skillId].branch))), FHE.asEuint32(keccak256(bytes("combat"))))) {
            players[msg.sender].combatLevel = FHE.add(players[msg.sender].combatLevel, FHE.asEuint32(1));
        } else if (FHE.eq(FHE.asEuint32(keccak256(bytes(skills[skillId].branch))), FHE.asEuint32(keccak256(bytes("magic"))))) {
            players[msg.sender].magicLevel = FHE.add(players[msg.sender].magicLevel, FHE.asEuint32(1));
        } else if (FHE.eq(FHE.asEuint32(keccak256(bytes(skills[skillId].branch))), FHE.asEuint32(keccak256(bytes("support"))))) {
            players[msg.sender].supportLevel = FHE.add(players[msg.sender].supportLevel, FHE.asEuint32(1));
        } else if (FHE.eq(FHE.asEuint32(keccak256(bytes(skills[skillId].branch))), FHE.asEuint32(keccak256(bytes("hybrid"))))) {
            players[msg.sender].hybridLevel = FHE.add(players[msg.sender].hybridLevel, FHE.asEuint32(1));
        }
        
        emit SkillUnlocked(skillId, msg.sender, 0); // Cost will be decrypted off-chain
        return true;
    }
    
    function createTournament(
        string memory _name,
        externalEuint32 _entryFee,
        externalEuint32 _prizePool,
        bytes calldata inputProof
    ) public returns (uint256) {
        uint256 tournamentId = tournamentCounter++;
        
        // Convert externalEuint32 to euint32
        euint32 internalEntryFee = FHE.fromExternal(_entryFee, inputProof);
        euint32 internalPrizePool = FHE.fromExternal(_prizePool, inputProof);
        
        tournaments[tournamentId] = Tournament({
            tournamentId: FHE.asEuint32(tournamentId),
            entryFee: internalEntryFee,
            prizePool: internalPrizePool,
            isActive: FHE.asEbool(true),
            isRevealed: FHE.asEbool(false),
            name: _name,
            organizer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + 7 days
        });
        
        emit TournamentCreated(tournamentId, msg.sender, _name);
        return tournamentId;
    }
    
    function joinTournament(
        uint256 tournamentId,
        externalEuint32 entryFee,
        bytes calldata inputProof
    ) public payable returns (bool) {
        require(players[msg.sender].wallet != address(0), "Player not registered");
        require(FHE.decrypt(tournaments[tournamentId].isActive), "Tournament not active");
        require(block.timestamp <= tournaments[tournamentId].endTime, "Tournament ended");
        
        // Convert externalEuint32 to euint32
        euint32 internalEntryFee = FHE.fromExternal(entryFee, inputProof);
        
        // Verify entry fee payment
        require(msg.value >= FHE.decrypt(internalEntryFee), "Insufficient entry fee");
        
        // Add to prize pool
        tournaments[tournamentId].prizePool = FHE.add(tournaments[tournamentId].prizePool, internalEntryFee);
        
        emit TournamentJoined(tournamentId, msg.sender);
        return true;
    }
    
    function revealTournament(uint256 tournamentId) public onlyOwner {
        require(FHE.decrypt(tournaments[tournamentId].isActive), "Tournament not active");
        require(block.timestamp >= tournaments[tournamentId].endTime, "Tournament not ended");
        
        tournaments[tournamentId].isRevealed = FHE.asEbool(true);
        tournaments[tournamentId].isActive = FHE.asEbool(false);
        
        emit TournamentRevealed(tournamentId);
    }
    
    function updateReputation(
        address player,
        externalEuint32 reputationChange,
        bytes calldata inputProof
    ) public onlyVerifier {
        require(players[player].wallet != address(0), "Player not registered");
        
        // Convert externalEuint32 to euint32
        euint32 internalReputationChange = FHE.fromExternal(reputationChange, inputProof);
        
        playerReputation[player] = FHE.add(playerReputation[player], internalReputationChange);
        
        emit ReputationUpdated(player, 0); // Reputation will be decrypted off-chain
    }
    
    function getPlayerSkillPoints(address player) public view returns (uint32) {
        require(players[player].wallet != address(0), "Player not registered");
        return FHE.decrypt(players[player].totalSkillPoints);
    }
    
    function getPlayerLevel(address player, string memory branch) public view returns (uint32) {
        require(players[player].wallet != address(0), "Player not registered");
        
        if (keccak256(bytes(branch)) == keccak256(bytes("combat"))) {
            return FHE.decrypt(players[player].combatLevel);
        } else if (keccak256(bytes(branch)) == keccak256(bytes("magic"))) {
            return FHE.decrypt(players[player].magicLevel);
        } else if (keccak256(bytes(branch)) == keccak256(bytes("support"))) {
            return FHE.decrypt(players[player].supportLevel);
        } else if (keccak256(bytes(branch)) == keccak256(bytes("hybrid"))) {
            return FHE.decrypt(players[player].hybridLevel);
        }
        
        return 0;
    }
    
    function isSkillUnlocked(address player, uint256 skillId) public view returns (bool) {
        require(players[player].wallet != address(0), "Player not registered");
        require(skills[skillId].owner != address(0), "Skill does not exist");
        
        return FHE.decrypt(playerSkills[player][skillId]);
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
}
