# Vercel Deployment Guide for Secret Skill Bloom

This guide provides step-by-step instructions for deploying the Secret Skill Bloom project to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Environment variables ready

## Step-by-Step Deployment

### 1. Connect Repository to Vercel

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" on the dashboard
   - Select "Import Git Repository"
   - Choose `civicLlama/secret-skill-bloom` from the list
   - Click "Import"

### 2. Configure Project Settings

1. **Project Name**
   - Project Name: `secret-skill-bloom`
   - Framework Preset: `Vite`
   - Root Directory: `./` (default)

2. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Environment Variables Configuration

Add the following environment variables in Vercel dashboard:

#### Required Variables

```env
# Chain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=your_infura_api_key
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia

# Contract Configuration (Update after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
```

#### How to Add Environment Variables

1. In Vercel dashboard, go to your project
2. Click on "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add each variable:
   - **Name**: `NEXT_PUBLIC_CHAIN_ID`
   - **Value**: `11155111`
   - **Environment**: Production, Preview, Development (select all)
5. Click "Save"
6. Repeat for all variables

### 4. Deploy the Project

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for the build process to complete
   - Vercel will automatically assign a domain

2. **Custom Domain (Optional)**
   - Go to "Settings" → "Domains"
   - Add your custom domain
   - Configure DNS settings as instructed

### 5. Post-Deployment Configuration

#### Deploy Smart Contract

1. **Local Setup**
   ```bash
   git clone https://github.com/civicLlama/secret-skill-bloom.git
   cd secret-skill-bloom
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your private key and other settings
   ```

3. **Deploy Contract**
   ```bash
   npm run compile
   npm run deploy
   ```

4. **Update Environment Variables**
   - Copy the deployed contract address
   - Update `NEXT_PUBLIC_CONTRACT_ADDRESS` in Vercel dashboard

#### Redeploy Frontend

1. **Trigger Redeploy**
   - Go to Vercel dashboard
   - Click "Deployments" tab
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger automatic deployment

### 6. Verification Steps

1. **Test Wallet Connection**
   - Visit your deployed site
   - Click "Connect Wallet"
   - Verify MetaMask connection works

2. **Test Contract Interaction**
   - Connect wallet
   - Click "Join Game"
   - Verify transaction succeeds

3. **Test Skill Unlocking**
   - Try to unlock a basic skill
   - Verify skill points are deducted
   - Check skill appears as unlocked

### 7. Monitoring and Maintenance

#### Vercel Analytics
- Enable Vercel Analytics in project settings
- Monitor performance and usage

#### Error Monitoring
- Check Vercel function logs
- Monitor browser console for errors
- Set up error tracking if needed

#### Updates
- Push changes to main branch for automatic deployment
- Use preview deployments for testing
- Monitor build logs for issues

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Verify all dependencies are in package.json
   - Ensure environment variables are set correctly

2. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure MetaMask is configured for Sepolia

3. **Contract Interaction Failures**
   - Verify contract address is correct
   - Check if contract is deployed on Sepolia
   - Ensure user has Sepolia ETH for gas

4. **Environment Variable Issues**
   - Verify all required variables are set
   - Check variable names match exactly
   - Ensure variables are available in all environments

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/introduction)
- [Wagmi Documentation](https://wagmi.sh/)
- [FHEVM Documentation](https://docs.fhevm.org/)

## Production Checklist

- [ ] Repository connected to Vercel
- [ ] All environment variables configured
- [ ] Smart contract deployed to Sepolia
- [ ] Contract address updated in environment variables
- [ ] Wallet connection tested
- [ ] Contract interactions tested
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Documentation updated with live URL

## Deployment URLs

After successful deployment, your application will be available at:

- **Vercel Domain**: `https://secret-skill-bloom.vercel.app`
- **Custom Domain**: `https://yourdomain.com` (if configured)

## Next Steps

1. **Marketing**: Share the deployed application
2. **User Testing**: Gather feedback from users
3. **Feature Updates**: Implement additional features
4. **Mainnet Deployment**: Deploy to Ethereum mainnet when ready
5. **Community Building**: Build a community around the platform

---

**Note**: This deployment guide assumes you're using the Sepolia testnet. For mainnet deployment, update the chain configuration and ensure you have sufficient ETH for gas fees.
