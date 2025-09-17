// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SecretSkillBloom {
    struct Player {
        uint32 skillPoints;
        uint32 level;
        bool isRegistered;
        mapping(uint256 => bool) unlockedSkills; // Maps skill index to unlocked status
    }

    struct Skill {
        uint32 cost;
        uint32 requiredLevel;
    }

    mapping(address => Player) public players;
    Skill[] public skills; // Array of all available skills

    event PlayerRegistered(address indexed playerAddress, uint32 initialSkillPoints);
    event SkillUnlocked(address indexed playerAddress, uint256 indexed skillIndex, uint32 newSkillPoints);

    constructor() {
        // Initialize some basic skills
        skills.push(Skill({cost: 1, requiredLevel: 0})); // Basic Combat
        skills.push(Skill({cost: 1, requiredLevel: 0})); // Basic Magic
        skills.push(Skill({cost: 1, requiredLevel: 0})); // Basic Support
        skills.push(Skill({cost: 2, requiredLevel: 1})); // Advanced Combat
        skills.push(Skill({cost: 2, requiredLevel: 1})); // Arcane Mastery
        skills.push(Skill({cost: 2, requiredLevel: 1})); // Divine Grace
        skills.push(Skill({cost: 3, requiredLevel: 2})); // Combat Mastery (Encrypted)
        skills.push(Skill({cost: 4, requiredLevel: 2})); // Forbidden Arts (Encrypted)
        skills.push(Skill({cost: 5, requiredLevel: 2})); // Resurrection (Encrypted)
        skills.push(Skill({cost: 3, requiredLevel: 2})); // Spellsword (Hybrid Encrypted)
        skills.push(Skill({cost: 3, requiredLevel: 2})); // Sacred Warrior (Hybrid Encrypted)
    }

    function registerPlayer() public {
        require(!players[msg.sender].isRegistered, "Player already registered");
        players[msg.sender].skillPoints = 5; // Starting skill points
        players[msg.sender].level = 0;
        players[msg.sender].isRegistered = true;
        emit PlayerRegistered(msg.sender, 5);
    }

    function getPlayerSkillPoints(address playerAddress) public view returns (uint32) {
        require(players[playerAddress].isRegistered, "Player not registered");
        return players[playerAddress].skillPoints;
    }

    function getPlayerLevel(address playerAddress) public view returns (uint32) {
        require(players[playerAddress].isRegistered, "Player not registered");
        return players[playerAddress].level;
    }

    function isSkillUnlocked(address playerAddress, uint256 skillIndex) public view returns (bool) {
        require(players[playerAddress].isRegistered, "Player not registered");
        require(skillIndex < skills.length, "Invalid skill index");
        return players[playerAddress].unlockedSkills[skillIndex];
    }

    function unlockSkill(uint256 skillIndex, bytes calldata encryptedCurrentSkillPoints, bytes calldata inputProof) public {
        require(players[msg.sender].isRegistered, "Player not registered");
        require(skillIndex < skills.length, "Invalid skill index");
        require(!players[msg.sender].unlockedSkills[skillIndex], "Skill already unlocked");
        require(players[msg.sender].skillPoints >= skills[skillIndex].cost, "Not enough skill points");

        // For now, we'll use a simplified approach without FHE encryption
        // In production, this would decrypt and verify the encrypted data
        players[msg.sender].skillPoints -= skills[skillIndex].cost;
        players[msg.sender].unlockedSkills[skillIndex] = true;

        emit SkillUnlocked(msg.sender, skillIndex, players[msg.sender].skillPoints);
    }

    function skillsLength() public view returns (uint256) {
        return skills.length;
    }

    function skills(uint256 index) public view returns (uint32 cost, uint32 requiredLevel) {
        require(index < skills.length, "Invalid skill index");
        Skill storage skill = skills[index];
        return (skill.cost, skill.requiredLevel);
    }
}
