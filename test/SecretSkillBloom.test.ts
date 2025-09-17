import { expect } from "chai";
import { ethers } from "hardhat";
import { SecretSkillBloom } from "../typechain-types";

describe("SecretSkillBloom", function () {
  let secretSkillBloom: SecretSkillBloom;
  let owner: any;
  let verifier: any;
  let player1: any;
  let player2: any;

  beforeEach(async function () {
    [owner, verifier, player1, player2] = await ethers.getSigners();

    const SecretSkillBloom = await ethers.getContractFactory("SecretSkillBloom");
    secretSkillBloom = await SecretSkillBloom.deploy(verifier.address);
    await secretSkillBloom.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await secretSkillBloom.owner()).to.equal(owner.address);
    });

    it("Should set the right verifier", async function () {
      expect(await secretSkillBloom.verifier()).to.equal(verifier.address);
    });
  });

  describe("Skill Creation", function () {
    it("Should create a skill successfully", async function () {
      const skillName = "Test Skill";
      const skillDescription = "A test skill for testing";
      const skillBranch = "combat";
      const skillCost = ethers.encodeBytes32String("1");

      const tx = await secretSkillBloom.createSkill(
        skillName,
        skillDescription,
        skillBranch,
        skillCost,
        "0x"
      );

      await expect(tx)
        .to.emit(secretSkillBloom, "SkillUnlocked")
        .withArgs(0, owner.address, 0);
    });

    it("Should not allow non-owner to create skills", async function () {
      await expect(
        secretSkillBloom.connect(player1).createSkill(
          "Test Skill",
          "A test skill",
          "combat",
          ethers.encodeBytes32String("1"),
          "0x"
        )
      ).to.be.revertedWith("Only owner can call this function");
    });
  });

  describe("Player Registration", function () {
    it("Should allow players to join the game", async function () {
      const tx = await secretSkillBloom.connect(player1).joinGame();
      await tx.wait();

      // Check if player is registered
      const player = await secretSkillBloom.players(player1.address);
      expect(player.wallet).to.equal(player1.address);
    });

    it("Should not allow duplicate registration", async function () {
      await secretSkillBloom.connect(player1).joinGame();
      
      await expect(
        secretSkillBloom.connect(player1).joinGame()
      ).to.be.revertedWith("Player already exists");
    });
  });

  describe("Skill Unlocking", function () {
    beforeEach(async function () {
      // Create a skill
      await secretSkillBloom.createSkill(
        "Test Skill",
        "A test skill",
        "combat",
        ethers.encodeBytes32String("1"),
        "0x"
      );

      // Register a player
      await secretSkillBloom.connect(player1).joinGame();
    });

    it("Should allow players to unlock skills with sufficient points", async function () {
      const tx = await secretSkillBloom.connect(player1).unlockSkill(
        0, // skillId
        ethers.encodeBytes32String("5"), // skillPoints (starting with 5)
        "0x"
      );

      await expect(tx)
        .to.emit(secretSkillBloom, "SkillUnlocked")
        .withArgs(0, player1.address, 0);
    });

    it("Should not allow unlocking skills without registration", async function () {
      await expect(
        secretSkillBloom.connect(player2).unlockSkill(
          0,
          ethers.encodeBytes32String("5"),
          "0x"
        )
      ).to.be.revertedWith("Player not registered");
    });
  });

  describe("Tournament Management", function () {
    it("Should allow creating tournaments", async function () {
      const tx = await secretSkillBloom.createTournament(
        "Test Tournament",
        ethers.encodeBytes32String("1"), // entryFee
        ethers.encodeBytes32String("10"), // prizePool
        "0x"
      );

      await expect(tx)
        .to.emit(secretSkillBloom, "TournamentCreated")
        .withArgs(0, owner.address, "Test Tournament");
    });

    it("Should allow players to join tournaments", async function () {
      // Create tournament
      await secretSkillBloom.createTournament(
        "Test Tournament",
        ethers.encodeBytes32String("1"),
        ethers.encodeBytes32String("10"),
        "0x"
      );

      // Register player
      await secretSkillBloom.connect(player1).joinGame();

      // Join tournament
      const tx = await secretSkillBloom.connect(player1).joinTournament(
        0, // tournamentId
        ethers.encodeBytes32String("1"), // entryFee
        "0x",
        { value: ethers.parseEther("1") }
      );

      await expect(tx)
        .to.emit(secretSkillBloom, "TournamentJoined")
        .withArgs(0, player1.address);
    });
  });

  describe("Reputation System", function () {
    beforeEach(async function () {
      await secretSkillBloom.connect(player1).joinGame();
    });

    it("Should allow verifier to update reputation", async function () {
      const tx = await secretSkillBloom.connect(verifier).updateReputation(
        player1.address,
        ethers.encodeBytes32String("10"), // reputation change
        "0x"
      );

      await expect(tx)
        .to.emit(secretSkillBloom, "ReputationUpdated")
        .withArgs(player1.address, 0);
    });

    it("Should not allow non-verifier to update reputation", async function () {
      await expect(
        secretSkillBloom.connect(player1).updateReputation(
          player1.address,
          ethers.encodeBytes32String("10"),
          "0x"
        )
      ).to.be.revertedWith("Only verifier can call this function");
    });
  });
});
