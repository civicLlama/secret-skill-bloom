import { cn } from "@/lib/utils";

interface SkillConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  active?: boolean;
  className?: string;
}

export const SkillConnection = ({ from, to, active = false, className }: SkillConnectionProps) => {
  // Calculate the line properties
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  return (
    <div
      className={cn(
        "skill-connection",
        {
          "skill-connection-active": active
        },
        className
      )}
      style={{
        left: `${from.x}%`,
        top: `${from.y}%`,
        width: `${distance}%`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0 50%"
      }}
    />
  );
};