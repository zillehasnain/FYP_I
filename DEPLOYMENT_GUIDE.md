# BrandBurst - Vercel Deployment Guide

## Overview
This guide explains how to deploy BrandBurst (full-stack MERN application) on Vercel.

## Project Structure
```
FYP_BrandBurst/
 client/                 # React + Vite frontend
 server/                 # Express.js backend
 vercel.json            # Vercel configuration
 .env.example           # Environment variables template
 .vercelignore          # Files to ignore during deployment
```

## Prerequisites
1. **Vercel Account** - Sign up at https://vercel.com
2. **GitHub Repository** - Your code must be pushed to GitHub
3. **MongoDB Atlas** - Cloud MongoDB instance for production
4. **Environment Variables** - JWT secret and MongoDB connection string

## Step 1: Prepare MongoDB
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a cluster (free tier available)
3. Create a database user with strong password
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname?appName=appname`
5. Keep this safe - you'll need it for Vercel

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)
1. Push your code to GitHub (main branch)
2. Go to https://vercel.com/dashboard
3. Click "Add New Project"
4. Select your GitHub repository
5. Vercel auto-detects it's a monorepo with Vite
6. In "Environment Variables", add:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong random key (e.g., generated from https://www.random.org/strings/)
   - `NODE_ENV`: `production`
7. Click "Deploy"

### Option B: Using Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

## Step 3: Configure Environment Variables in Vercel
 Environment Variables and add:

```
MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/dbname?appName=appname
JWT_SECRET = your_very_secret_key_here
NODE_ENV = production
```

## Step 4: Update Client API URL
After deployment, update the client to call the correct backend URL:

**In `client/.env.production`:**
```
VITE_API_URL=https://your-vercel-domain.vercel.app/api
```

Or set it during build in Vercel dashboard:
- Add Build Environment Variable: `VITE_API_URL=https://your-vercel-domain.vercel.app/api`

## Step 5: Update CORS
The server's CORS settings will automatically accept your Vercel domain:
- Pattern: `https://*.vercel.app`
- Your domain: `https://your-domain.vercel.app`

## Deployment Architecture

### What Happens During Build
1. Vercel runs: `cd client && npm install && npm run build`
2. Client builds to `client/dist/` (static files)
3. Server files are available at `/api/*` routes
4. Vercel serves the static React app from dist/

### How API Routes Work
- Client requests to `/api/*` are automatically proxied to your backend
- Express server handles all `/api/` endpoints
- MongoDB connections are pooled and reused

## Monitoring & Logs
1. Go to your project on Vercel Dashboard
2. Click "Deployments" to see deployment history
3. Click "Logs" to view real-time server logs
4. Check "Functions" to see serverless function metrics

## Troubleshooting

### Build Fails
- Check Node version compatibility (Vercel supports 18+)
- Verify all dependencies in `package.json`
- Check build logs in Vercel Dashboard

### API Calls Fail
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas network access (whitelist 0.0.0.0/0)
- Verify `JWT_SECRET` is set in environment
- Check browser console for CORS errors

### MongoDB Connection Issues
1. Go to MongoDB Atlas Dashboard
2. Click "Network Access"
3. Add IP address: `0.0.0.0/0` (allows all IPs)
4. Verify username/password credentials

### 404 on Page Refresh
- This is normal - Vercel is configured to serve `index.html` for all non-API routes
- React Router handles client-side routing

## File Changes Made for Vercel

### Created:
- `vercel.json` - Build and routing configuration
- `.vercelignore` - Files to exclude from deployment
- `.env.example` - Template for environment variables
- `DEPLOYMENT_GUIDE.md` - This file

### Configuration:
- Build command: `cd client && npm install && npm run build`
- Output directory: `client/dist`
- Framework: Vite
- Public access: Enabled

## Custom Domain (Optional)
 Domains
2. Add your custom domain
3. Update DNS records according to Vercel instructions
4. Update CORS in server if using custom domain

## Performance Tips
1. Use MongoDB indexes on frequently queried fields
2. Implement API rate limiting
3. Cache static assets (Vercel does this automatically)
4. Monitor function execution time in Vercel Dashboard

## Next Steps
- Set up GitHub Actions for CI/CD
- Add monitoring with Sentry
- Set up automated backups for MongoDB
- Configure custom domain

## Support
For issues, check:
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.atlas.mongodb.com
- Express Docs: https://expressjs.com
