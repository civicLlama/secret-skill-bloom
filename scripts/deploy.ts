import { ethers } from "hardhat";

async function main() {
  console.log("Deploying SecretSkillBloom contract...");

  // Get the contract factory
  const SecretSkillBloom = await ethers.getContractFactory("SecretSkillBloom");

  // Deploy the contract with a verifier address (using deployer as verifier for now)
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const secretSkillBloom = await SecretSkillBloom.deploy(deployer.address);

  await secretSkillBloom.waitForDeployment();

  const contractAddress = await secretSkillBloom.getAddress();
  console.log("SecretSkillBloom deployed to:", contractAddress);

  // Create initial skills
  console.log("Creating initial skills...");
  
  // Basic Combat Skill
  const basicCombatTx = await secretSkillBloom.createSkill(
    "Basic Combat",
    "Fundamental fighting techniques and weapon handling",
    "combat",
    ethers.encodeBytes32String("1"), // Cost: 1
    "0x" // Empty proof for now
  );
  await basicCombatTx.wait();

  // Advanced Combat Skill
  const advancedCombatTx = await secretSkillBloom.createSkill(
    "Advanced Combat",
    "Master-level fighting techniques and combo attacks",
    "combat",
    ethers.encodeBytes32String("2"), // Cost: 2
    "0x"
  );
  await advancedCombatTx.wait();

  // Combat Mastery (Encrypted)
  const combatMasterTx = await secretSkillBloom.createSkill(
    "Combat Mastery",
    "Legendary combat prowess - ENCRYPTED BUILD",
    "combat",
    ethers.encodeBytes32String("3"), // Cost: 3 (encrypted)
    "0x"
  );
  await combatMasterTx.wait();

  // Basic Magic Skill
  const basicMagicTx = await secretSkillBloom.createSkill(
    "Basic Spellcasting",
    "Learn to channel magical energies",
    "magic",
    ethers.encodeBytes32String("1"), // Cost: 1
    "0x"
  );
  await basicMagicTx.wait();

  // Advanced Magic Skill
  const advancedMagicTx = await secretSkillBloom.createSkill(
    "Arcane Mastery",
    "Harness powerful magical forces",
    "magic",
    ethers.encodeBytes32String("2"), // Cost: 2
    "0x"
  );
  await advancedMagicTx.wait();

  // Forbidden Arts (Encrypted)
  const forbiddenArtsTx = await secretSkillBloom.createSkill(
    "Forbidden Arts",
    "Ancient forbidden magic - ENCRYPTED BUILD",
    "magic",
    ethers.encodeBytes32String("4"), // Cost: 4 (encrypted)
    "0x"
  );
  await forbiddenArtsTx.wait();

  // Basic Support Skill
  const basicSupportTx = await secretSkillBloom.createSkill(
    "Basic Support",
    "Learn healing and buffing abilities",
    "support",
    ethers.encodeBytes32String("1"), // Cost: 1
    "0x"
  );
  await basicSupportTx.wait();

  // Advanced Support Skill
  const advancedSupportTx = await secretSkillBloom.createSkill(
    "Divine Grace",
    "Master healing and protection spells",
    "support",
    ethers.encodeBytes32String("2"), // Cost: 2
    "0x"
  );
  await advancedSupportTx.wait();

  // Resurrection (Encrypted)
  const resurrectionTx = await secretSkillBloom.createSkill(
    "Resurrection",
    "The power over life and death - ENCRYPTED BUILD",
    "support",
    ethers.encodeBytes32String("5"), // Cost: 5 (encrypted)
    "0x"
  );
  await resurrectionTx.wait();

  // Hybrid Skills
  const spellswordTx = await secretSkillBloom.createSkill(
    "Spellsword",
    "Combine magic and combat - ENCRYPTED BUILD",
    "hybrid",
    ethers.encodeBytes32String("3"), // Cost: 3 (encrypted)
    "0x"
  );
  await spellswordTx.wait();

  const paladinTx = await secretSkillBloom.createSkill(
    "Sacred Warrior",
    "Holy combat mastery - ENCRYPTED BUILD",
    "hybrid",
    ethers.encodeBytes32String("3"), // Cost: 3 (encrypted)
    "0x"
  );
  await paladinTx.wait();

  console.log("All initial skills created successfully!");
  console.log("Contract deployment completed!");
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    deployer: deployer.address,
    network: (await ethers.provider.getNetwork()).name,
    chainId: (await ethers.provider.getNetwork()).chainId,
    timestamp: new Date().toISOString()
  };

  console.log("Deployment Info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
