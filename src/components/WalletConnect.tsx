import { useState, useEffect } from "react";
import { Wallet, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { ContractUtils } from "@/lib/fhe-utils";

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  contract?: any;
}

export const WalletConnect = ({ onConnect, contract }: WalletConnectProps) => {
  const { address, isConnected, isConnecting } = useAccount();
  const { data: balance } = useBalance({ address });
  const [skillPoints, setSkillPoints] = useState(5);
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      onConnect?.(address);
      loadPlayerData();
    }
  }, [isConnected, address]);

  const loadPlayerData = async () => {
    if (!contract || !address) return;
    
    try {
      const points = await ContractUtils.getPlayerSkillPoints(contract, address);
      setSkillPoints(points);
      setIsJoined(true);
    } catch (error) {
      console.log("Player not registered yet");
      setIsJoined(false);
    }
  };

  const handleJoinGame = async () => {
    if (!contract || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsJoining(true);
    try {
      await ContractUtils.registerPlayer(contract, address);
      setIsJoined(true);
      setSkillPoints(5); // Starting skill points
      toast.success("Successfully joined the game!");
    } catch (error: any) {
      console.error("Error joining game:", error);
      toast.error(error.message || "Failed to join game");
    } finally {
      setIsJoining(false);
    }
  };

  if (isConnected && address) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
          
          {balance && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30">
              <span className="text-sm font-semibold text-green-500">
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">{skillPoints} SP</span>
          </div>

          <div className="ml-auto">
            <ConnectButton />
          </div>
        </div>

        {!isJoined && (
          <div className="text-center">
            <Button
              onClick={handleJoinGame}
              disabled={isJoining}
              className="w-full"
              size="lg"
            >
              {isJoining ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Joining Game...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Join Game to Start
                </>
              )}
            </Button>
          </div>
        )}

        {isJoined && (
          <div className="text-center text-sm text-muted-foreground">
            🎮 Ready to develop your skills in secret!
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="text-center">
      <ConnectButton />
      <p className="text-sm text-muted-foreground mt-2">
        Connect your wallet to start your secret skill journey
      </p>
    </div>
  );
};