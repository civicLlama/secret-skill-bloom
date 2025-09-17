# 🎮 Secret Skill Bloom

<div align="center">

![Skill Tree](https://img.shields.io/badge/Skill%20Tree-Mastery%20Awaits-00ff88?style=for-the-badge&logo=gamepad2)
![Privacy](https://img.shields.io/badge/Privacy-FHE%20Encrypted-ff6b6b?style=for-the-badge&logo=shield-check)
![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum%20Sepolia-627eea?style=for-the-badge&logo=ethereum)

*Where Champions Train in Shadows, Legends Emerge in Light*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/civicLlama/secret-skill-bloom)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## 🎯 The Ultimate Privacy-First RPG Experience

Welcome to **Secret Skill Bloom** - the revolutionary gaming platform where your character's true potential remains hidden until the perfect moment. Built on cutting-edge **Fully Homomorphic Encryption (FHE)** technology, this isn't just another RPG - it's a paradigm shift in how we think about competitive gaming and privacy.

### 🌟 Why Secret Skill Bloom?

- **🔐 True Privacy**: Your skill builds are encrypted and invisible to other players
- **⚡ Strategic Advantage**: Surprise opponents with hidden abilities in tournaments  
- **🌳 Branching Mastery**: Three distinct skill trees with hybrid combinations
- **🏆 Tournament Glory**: Compete with encrypted builds for maximum impact
- **⛓️ Blockchain Security**: Decentralized, transparent, and tamper-proof
- **💎 Premium Experience**: Seamless wallet integration with RainbowKit

## 🏗️ Architecture Deep Dive

### 🔧 Smart Contract Layer
```solidity
// Core FHE-Protected Functions
contract SecretSkillBloom {
    // Encrypted skill management
    function unlockSkill(uint256 skillId, bytes encryptedData, bytes proof);
    
    // Privacy-preserving player registration  
    function registerPlayer(bytes encryptedSkillPoints);
    
    // Tournament system with encrypted entry fees
    function createTournament(string name, bytes encryptedEntryFee);
}
```

### 🎨 Frontend Magic
- **🌳 Interactive Skill Tree**: Drag-and-drop skill progression with real-time encryption
- **💳 Wallet Integration**: One-click connection via RainbowKit (MetaMask, WalletConnect, Coinbase)
- **⚔️ Tournament Hub**: Create, join, and spectate encrypted tournaments
- **📊 Privacy Dashboard**: View your encrypted stats without revealing them to others

## 🚀 Get Started in Minutes

### 📋 Prerequisites Checklist
- ✅ **Node.js 18+** - Modern JavaScript runtime
- ✅ **MetaMask Wallet** - Your gateway to Web3
- ✅ **Sepolia ETH** - For gas fees (get free ETH from [faucets](https://sepoliafaucet.com/))
- ✅ **Git** - Version control

### ⚡ Lightning-Fast Setup

```bash
# 🎯 Clone and enter the realm
git clone https://github.com/civicLlama/secret-skill-bloom.git
cd secret-skill-bloom

# 📦 Install the magic
npm install

# 🔐 Configure your secrets
cp .env.example .env
# Edit .env with your API keys and contract address

# 🚀 Launch the experience
npm run dev
```

### 🏗️ Deploy Your Own Smart Contracts

```bash
# 🔨 Compile the contracts
npm run compile

# 🌐 Deploy to Sepolia testnet
npm run deploy

# 🧪 Run tests
npm run test
```

## 🛠️ Technology Arsenal

### 🎨 Frontend Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| **React 18** | UI Framework | Latest |
| **TypeScript** | Type Safety | 5.8+ |
| **Vite** | Build Tool | 5.4+ |
| **Tailwind CSS** | Styling | 3.4+ |
| **shadcn/ui** | Component Library | Latest |
| **RainbowKit** | Wallet Connection | 2.2+ |
| **Wagmi** | Ethereum Hooks | 2.9+ |

### ⛓️ Blockchain Stack
| Technology | Purpose | Version |
|------------|---------|---------|
| **Solidity** | Smart Contracts | 0.8.24 |
| **Hardhat** | Development Framework | 2.19+ |
| **OpenZeppelin** | Security Libraries | 5.0+ |
| **FHEVM** | Homomorphic Encryption | 0.7+ |
| **Sepolia** | Test Network | Latest |

### 🔧 Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Git** - Version control and collaboration
- **Vercel** - Deployment and hosting
- **OpenZeppelin** for security

### Blockchain
- **Ethereum Sepolia** testnet
- **FHEVM** for encrypted computations
- **Zama** FHE technology

## 📁 Project Architecture

```
🎮 secret-skill-bloom/
├── 📜 contracts/              # Smart Contract Layer
│   └── SecretSkillBloom.sol   # Main FHE-enabled contract
├── 🚀 scripts/                # Deployment & Automation
│   └── deploy.ts              # Contract deployment script
├── 🧪 test/                   # Testing Suite
│   └── SecretSkillBloom.test.ts # Contract tests
├── 🎨 src/                    # Frontend Application
│   ├── 🧩 components/         # React Components
│   │   ├── SkillTree.tsx      # Interactive skill tree
│   │   ├── WalletConnect.tsx  # Wallet integration
│   │   └── SkillNode.tsx      # Individual skill nodes
│   ├── 🔧 lib/                # Utility Libraries
│   │   ├── fhe-utils.ts       # FHE encryption utilities
│   │   └── wagmi.ts           # Wallet configuration
│   ├── 📄 pages/              # Page Components
│   │   └── Index.tsx          # Main game interface
│   └── 🎣 hooks/              # Custom React Hooks
├── ⚙️ hardhat.config.ts       # Blockchain configuration
├── 📦 package.json            # Dependencies & scripts
└── 📖 README.md               # This documentation
```

## ⚙️ Configuration Setup

### 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# 🌐 Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# 💳 Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# 📜 Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address

# 🔧 Optional: Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
```

> **💡 Pro Tip**: Get your WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)

## 🎯 The Champion's Path

### 🚀 Getting Started
1. **🔗 Forge Connection**: Connect your MetaMask or compatible wallet
2. **⚔️ Enter the Arena**: Register as a champion to receive 5 starting skill points
3. **🌳 Cultivate Power**: Unlock abilities across Combat, Magic, Support, or Hybrid disciplines

### 🎭 Advanced Mastery
4. **🔒 Shadow Training**: Advanced skills (cost ≥ 3) remain hidden in encrypted shadows
5. **🏆 Tournament Glory**: Compete with your secret arsenal for ultimate victory
6. **✨ Revelation**: Your encrypted builds are unveiled only during tournament battles

### 🎮 Gameplay Features
- **🎯 Skill Trees**: Three distinct paths with unique abilities
- **🔐 Encrypted Builds**: Keep your strategies secret until tournament time
- **⚔️ Tournament System**: Compete with encrypted entry fees and prize pools
- **⭐ Reputation System**: Build your encrypted reputation through victories

## 🛡️ Privacy Fortress

- **🔐 FHE Encryption**: All skill data protected by advanced homomorphic encryption
- **👻 Shadow Builds**: Advanced skills remain invisible until tournament reveals
- **🔒 Encrypted Operations**: All sensitive transactions secured with FHE technology
- **🎭 Privacy by Design**: Built with absolute privacy as the foundational principle

## ⚔️ Tournament Warfare

- **💰 Encrypted Entry Fees**: Secure tournament participation with encrypted payments
- **🏆 Shadow Prize Pools**: Compete for encrypted rewards and glory
- **🎪 Build Revelations**: Encrypted builds unveiled only during tournament battles
- **⭐ Reputation Matrix**: Earn encrypted reputation based on your performance

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**: Connect your GitHub repository to Vercel
2. **Configure Environment**: Set environment variables in Vercel dashboard
3. **Deploy**: Vercel will automatically deploy on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
# Upload the dist/ folder contents
```

## 🤝 Join the Revolution

We welcome contributions from the community! Here's how you can help:

### 🚀 Quick Contribution Guide
1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **✨ Make** your changes
4. **🧪 Add** tests if applicable
5. **📤 Submit** a pull request

### 🎯 Areas We Need Help
- **🔐 FHE Integration**: Enhance encryption capabilities
- **🎮 Game Mechanics**: Improve skill tree interactions
- **🎨 UI/UX**: Design better user experiences
- **📚 Documentation**: Help others understand the project

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🔗 Connect With Us

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-civicLlama-181717?style=for-the-badge&logo=github)](https://github.com/civicLlama/secret-skill-bloom)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy%20with-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/civicLlama/secret-skill-bloom)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

## 🙏 Special Thanks

<div align="center">

**Built with ❤️ by the Secret Skill Bloom Team**

</div>

- **🔐 Zama** - For revolutionary FHEVM technology
- **🌈 RainbowKit** - For seamless wallet integration
- **🎨 shadcn/ui** - For beautiful, accessible components
- **⚒️ Hardhat** - For robust smart contract development
- **⚡ Vite** - For lightning-fast development experience
- **🎯 Vercel** - For effortless deployment and hosting

---

<div align="center">

**🌟 Star this repository if you found it helpful!**

*Where Champions Train in Shadows, Legends Emerge in Light*

</div>
