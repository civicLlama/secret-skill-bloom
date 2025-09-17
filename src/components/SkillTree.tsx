import { useState, useEffect } from "react";
import { SkillNode } from "./SkillNode";
import { SkillConnection } from "./SkillConnection";
import { toast } from "sonner";
import { useAccount } from 'wagmi';
import { ContractUtils } from "@/lib/fhe-utils";

interface Skill {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number };
  icon: string;
  cost: number;
  requirements: string[];
  branch: string;
}

const skillData: Skill[] = [
  // Combat Branch
  {
    id: "combat_basic",
    name: "Basic Combat",
    description: "Fundamental fighting techniques and weapon handling",
    position: { x: 20, y: 80 },
    icon: "shield",
    cost: 1,
    requirements: [],
    branch: "combat"
  },
  {
    id: "combat_advanced",
    name: "Advanced Combat",
    description: "Master-level fighting techniques and combo attacks",
    position: { x: 20, y: 60 },
    icon: "shield",
    cost: 2,
    requirements: ["combat_basic"],
    branch: "combat"
  },
  {
    id: "combat_master",
    name: "Combat Mastery",
    description: "Legendary combat prowess - ENCRYPTED BUILD",
    position: { x: 20, y: 40 },
    icon: "shield",
    cost: 3,
    requirements: ["combat_advanced"],
    branch: "combat"
  },

  // Magic Branch
  {
    id: "magic_basic",
    name: "Basic Spellcasting",
    description: "Learn to channel magical energies",
    position: { x: 50, y: 80 },
    icon: "zap",
    cost: 1,
    requirements: [],
    branch: "magic"
  },
  {
    id: "magic_advanced",
    name: "Arcane Mastery",
    description: "Harness powerful magical forces",
    position: { x: 50, y: 60 },
    icon: "zap",
    cost: 2,
    requirements: ["magic_basic"],
    branch: "magic"
  },
  {
    id: "magic_forbidden",
    name: "Forbidden Arts",
    description: "Ancient forbidden magic - ENCRYPTED BUILD",
    position: { x: 50, y: 40 },
    icon: "zap",
    cost: 4,
    requirements: ["magic_advanced"],
    branch: "magic"
  },

  // Support Branch
  {
    id: "support_basic",
    name: "Basic Support",
    description: "Learn healing and buffing abilities",
    position: { x: 80, y: 80 },
    icon: "star",
    cost: 1,
    requirements: [],
    branch: "support"
  },
  {
    id: "support_advanced",
    name: "Divine Grace",
    description: "Master healing and protection spells",
    position: { x: 80, y: 60 },
    icon: "star",
    cost: 2,
    requirements: ["support_basic"],
    branch: "support"
  },
  {
    id: "support_legendary",
    name: "Resurrection",
    description: "The power over life and death - ENCRYPTED BUILD",
    position: { x: 80, y: 40 },
    icon: "star",
    cost: 5,
    requirements: ["support_advanced"],
    branch: "support"
  },

  // Hybrid Skills
  {
    id: "hybrid_spellsword",
    name: "Spellsword",
    description: "Combine magic and combat - ENCRYPTED BUILD",
    position: { x: 35, y: 25 },
    icon: "zap",
    cost: 3,
    requirements: ["combat_advanced", "magic_advanced"],
    branch: "hybrid"
  },
  {
    id: "hybrid_paladin",
    name: "Sacred Warrior",
    description: "Holy combat mastery - ENCRYPTED BUILD",
    position: { x: 65, y: 25 },
    icon: "shield",
    cost: 3,
    requirements: ["combat_advanced", "support_advanced"],
    branch: "hybrid"
  }
];

const connections = [
  { from: "combat_basic", to: "combat_advanced" },
  { from: "combat_advanced", to: "combat_master" },
  { from: "magic_basic", to: "magic_advanced" },
  { from: "magic_advanced", to: "magic_forbidden" },
  { from: "support_basic", to: "support_advanced" },
  { from: "support_advanced", to: "support_legendary" },
  { from: "combat_advanced", to: "hybrid_spellsword" },
  { from: "magic_advanced", to: "hybrid_spellsword" },
  { from: "combat_advanced", to: "hybrid_paladin" },
  { from: "support_advanced", to: "hybrid_paladin" }
];

interface SkillTreeProps {
  contract?: any;
}

export const SkillTree = ({ contract }: SkillTreeProps) => {
  const { address, isConnected } = useAccount();
  const [unlockedSkills, setUnlockedSkills] = useState<Set<string>>(new Set());
  const [skillPoints, setSkillPoints] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address && contract) {
      loadPlayerData();
    }
  }, [isConnected, address, contract]);

  const loadPlayerData = async () => {
    if (!contract || !address) return;
    
    try {
      const points = await ContractUtils.getPlayerSkillPoints(contract, address);
      setSkillPoints(points);
      
      // Load unlocked skills
      const unlocked = new Set<string>();
      for (let i = 0; i < skillData.length; i++) {
        try {
          const isUnlocked = await ContractUtils.isSkillUnlocked(contract, address, i);
          if (isUnlocked) {
            unlocked.add(skillData[i].id);
          }
        } catch (error) {
          // Skill doesn't exist yet
        }
      }
      setUnlockedSkills(unlocked);
    } catch (error) {
      console.log("Player not registered yet");
    }
  };

  const getSkillStatus = (skill: Skill) => {
    if (unlockedSkills.has(skill.id)) {
      return "unlocked";
    }

    // Check if it's an encrypted/high-tier skill
    if (skill.cost >= 3 || skill.description.includes("ENCRYPTED")) {
      if (skill.requirements.every(req => unlockedSkills.has(req))) {
        return "encrypted";
      }
      return "locked";
    }

    // Check if requirements are met
    if (skill.requirements.every(req => unlockedSkills.has(req))) {
      return skillPoints >= skill.cost ? "available" : "locked";
    }

    return "locked";
  };

  const handleUnlock = async (skillId: string) => {
    if (!contract || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    const skill = skillData.find(s => s.id === skillId);
    if (!skill) return;

    if (skillPoints < skill.cost) {
      toast.error("Not enough skill points!");
      return;
    }

    setIsLoading(true);
    try {
      const skillIndex = skillData.findIndex(s => s.id === skillId);
      await ContractUtils.unlockSkill(contract, address, skillIndex, skillPoints);
      
      setUnlockedSkills(prev => new Set([...prev, skillId]));
      setSkillPoints(prev => prev - skill.cost);
      toast.success(`Unlocked: ${skill.name}!`);
    } catch (error: any) {
      console.error("Error unlocking skill:", error);
      toast.error(error.message || "Failed to unlock skill");
    } finally {
      setIsLoading(false);
    }
  };

  const getConnectionStatus = (connection: { from: string; to: string }) => {
    return unlockedSkills.has(connection.from) && unlockedSkills.has(connection.to);
  };

  return (
    <div className="relative w-full h-96 bg-card/30 rounded-xl border border-border backdrop-blur-sm overflow-hidden">
      {/* Connections */}
      {connections.map((connection, index) => {
        const fromSkill = skillData.find(s => s.id === connection.from);
        const toSkill = skillData.find(s => s.id === connection.to);
        
        if (!fromSkill || !toSkill) return null;

        return (
          <SkillConnection
            key={index}
            from={fromSkill.position}
            to={toSkill.position}
            active={getConnectionStatus(connection)}
          />
        );
      })}

      {/* Skill Nodes */}
      {skillData.map((skill) => (
        <SkillNode
          key={skill.id}
          id={skill.id}
          name={skill.name}
          description={skill.description}
          status={getSkillStatus(skill)}
          position={skill.position}
          icon={skill.icon}
          cost={skill.cost}
          onUnlock={handleUnlock}
        />
      ))}

      {/* Branch Labels */}
      <div className="absolute top-4 left-4 text-sm font-semibold text-red-400">
        Combat
      </div>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-blue-400">
        Magic
      </div>
      <div className="absolute top-4 right-4 text-sm font-semibold text-yellow-400">
        Support
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
        🔐 Encrypted builds revealed in tournaments
      </div>
    </div>
  );
};