import { WalletConnect } from "@/components/WalletConnect";
import { SkillTree } from "@/components/SkillTree";
import { Eye, Lock } from "lucide-react";
import skillTreeLogo from "@/assets/skill-tree-logo.png";
import { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { ContractUtils } from "@/lib/fhe-utils";

const Index = () => {
  const { address, isConnected } = useAccount();
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    const initializeContract = async () => {
      if (isConnected && address && window.ethereum) {
        try {
          const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
          if (contractAddress) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractInstance = await ContractUtils.getContract(signer, contractAddress);
            setContract(contractInstance);
            console.log("Contract initialized:", contractAddress);
          } else {
            console.log("No contract address configured");
          }
        } catch (error) {
          console.error("Error initializing contract:", error);
        }
      }
    };

    initializeContract();
  }, [isConnected, address]);

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src={skillTreeLogo} alt="Skill Tree Logo" className="w-12 h-12" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Grow Skills in Secret
          </h1>
          <Eye className="w-8 h-8 text-accent" />
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Develop your character's abilities in complete privacy. Your skill builds remain encrypted until tournament reveals.
        </p>
      </header>

      {/* Wallet Connection */}
      <div className="max-w-4xl mx-auto mb-8">
        <WalletConnect contract={contract} />
      </div>

      {/* Skill Tree */}
      <div className="max-w-6xl mx-auto mb-8">
        <SkillTree contract={contract} />
      </div>

      {/* Info Cards */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-6 h-6 text-red-400" />
            <h3 className="font-semibold">Encrypted Builds</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Advanced skills are encrypted and hidden from other players until revealed in tournaments.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <img src={skillTreeLogo} alt="Skill Tree" className="w-6 h-6" />
            <h3 className="font-semibold">Branching Paths</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Choose from Combat, Magic, or Support trees. Unlock hybrid skills by mastering multiple branches.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-6 h-6 text-accent" />
            <h3 className="font-semibold">Tournament Reveals</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Your secret builds are unveiled only when you compete, giving you the element of surprise.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 text-sm text-muted-foreground">
        <p>🔐 Private Skill Progression • 🏆 Tournament Ready • ⚡ Blockchain Secured</p>
      </footer>
    </div>
  );
};

export default Index;
