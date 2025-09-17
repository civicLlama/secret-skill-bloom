import { Lock, Unlock, Shield, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillNodeProps {
  id: string;
  name: string;
  description: string;
  status: "locked" | "available" | "unlocked" | "encrypted";
  position: { x: number; y: number };
  icon?: string;
  cost?: number;
  onUnlock?: (id: string) => void;
  className?: string;
}

const iconMap = {
  shield: Shield,
  star: Star,
  zap: Zap,
};

export const SkillNode = ({
  id,
  name,
  description,
  status,
  position,
  icon = "star",
  cost = 1,
  onUnlock,
  className
}: SkillNodeProps) => {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Star;

  const handleClick = () => {
    if (status === "available" && onUnlock) {
      onUnlock(id);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "locked":
        return <Lock className="w-4 h-4 text-muted-foreground" />;
      case "available":
        return <IconComponent className="w-6 h-6 text-primary-foreground" />;
      case "unlocked":
        return <Unlock className="w-6 h-6 text-yellow-300" />;
      case "encrypted":
        return <Shield className="w-6 h-6 text-red-400" />;
      default:
        return <IconComponent className="w-6 h-6" />;
    }
  };

  return (
    <div
      className={cn(
        "absolute group",
        className
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)"
      }}
    >
      {/* Skill Node */}
      <div
        className={cn(
          "skill-node w-16 h-16 flex items-center justify-center",
          {
            "skill-node-locked": status === "locked",
            "skill-node-available hover:scale-110": status === "available",
            "skill-node-unlocked": status === "unlocked",
            "skill-node-encrypted": status === "encrypted"
          }
        )}
        onClick={handleClick}
      >
        {getStatusIcon()}
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        <div className="bg-card border border-border rounded-lg p-3 min-w-48 shadow-xl">
          <h3 className="font-semibold text-card-foreground mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          {status === "available" && (
            <div className="text-xs text-primary">
              Cost: {cost} point{cost !== 1 ? "s" : ""}
            </div>
          )}
          {status === "encrypted" && (
            <div className="text-xs text-red-400">
              🔐 Encrypted - Revealed at tournaments
            </div>
          )}
        </div>
      </div>
    </div>
  );
};