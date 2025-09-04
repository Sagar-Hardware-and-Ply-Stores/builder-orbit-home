# Vercel Deployment Guide

This project is now ready for deployment on Vercel. Follow these steps to deploy your Sagar Hardware & Ply Stores website.

## Prerequisites

1. **Vercel Account**: Create a free account at [vercel.com](https://vercel.com)
2. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Methods

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:

   ```bash
   vercel
   ```

4. **Follow the prompts**:

   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N` (for first deployment)
   - What's your project's name? `sagar-hardware-ply-stores`
   - In which directory is your code located? `./`

5. **Production deployment**:
   ```bash
   vercel --prod
   ```

### Method 2: Vercel Dashboard

1. **Connect Repository**:

   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository

2. **Configure Project**:

   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist/spa`
   - **Install Command**: `npm install`

3. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete

## Configuration Details

### Build Settings

- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist/spa`
- **Node.js Version**: 18.x (default)

### API Routes

The following API endpoints will be available:

- `/api/ping` - Health check endpoint
- `/api/demo` - Demo endpoint
- `/api/contact` - Contact form handler

### Environment Variables (Optional)

If you need environment variables, add them in the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add variables like:
   - `PING_MESSAGE` - Custom ping message

## File Structure for Vercel

```
├── api/                    # Vercel serverless functions
│   ├── contact.ts         # Contact form API
│   ├── demo.ts           # Demo API
│   └── ping.ts           # Ping API
├── client/               # React application source
├── dist/spa/            # Built static files (generated)
├── vercel.json          # Vercel configuration
└── package.json         # Updated with vercel-build script
```

## Important Notes

1. **SPA Routing**: The `vercel.json` configuration handles client-side routing for React Router.

2. **API Routes**: Server functions have been converted to Vercel serverless functions in the `/api` directory.

3. **CORS**: API routes include CORS headers for cross-origin requests.

4. **Build Process**: The `vercel-build` script only builds the client-side application, as API routes are handled separately.

5. **Performance**: The build output shows bundle size warnings. Consider code splitting for better performance:
   ```bash
   # Optional: Analyze bundle
   npm run build:client -- --mode analyze
   ```

## Automatic Deployments

Once connected to a Git repository, Vercel will automatically:

- Deploy on every push to the main branch (production)
- Create preview deployments for pull requests
- Provide deployment previews with unique URLs

## Custom Domain (Optional)

1. Go to your project dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Ensure TypeScript types are correct
- Verify the build runs locally with `npm run vercel-build`

### API Routes Not Working

- Check that API files are in the `/api` directory
- Verify function exports are correct
- Check Vercel function logs in the dashboard

### Routing Issues

- Ensure `vercel.json` routing configuration is correct
- Check that React Router is properly configured

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

Your website is now ready for Vercel deployment! 🚀
