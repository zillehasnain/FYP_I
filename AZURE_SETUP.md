# Azure Deployment Setup Guide

##  What We've Fixed Locally

- .env files are now correctly configured in server/ and client/
- Client .env has updated Azure API URL format

## 
### 1. Azure App Service (Backend) - Environment Variables

 **Application settings**

Add these variables:

| Name | Value |
|------|-------|
| `PORT` | `8080` |
| `MONGO_URI` | `mongodb+srv://FYP_ADCS:FYP_ADCS@hasnaicluster.f8op0ge.mongodb.net/?appName=HasnaiCluster` |
| `JWT_SECRET` | `brandburst_super_secret_key_99` |

**IMPORTANT:** Click "Save" after adding!

### 2. Verify App Service Name

Update the `.env` file for client to match your actual App Service URL:

```
VITE_API_URL=https://YOUR_APP_SERVICE_NAME.azurewebsites.net
```

Example: If your App Service is `brandburst-api`, use:
```
VITE_API_URL=https://brandburst-api.azurewebsites.net
```

### 3. Server CORS Configuration

The server is already configured to accept requests from:
- `http://localhost:5173` (local dev)
- `http://127.0.0.1:5173` (local dev)
- `https://victorious-ground-0443e4d00.7.azurestaticapps.net` (Azure SWA)

### 4. Deploy Steps

1. **Commit & Push Changes:**
   ```bash
   git add .
   git commit -m "Fix Azure deployment configuration"
   git push origin main
   ```

2. **GitHub Actions will trigger:**
   - Client builds and deploys to Azure Static Web Apps
   - Server needs to be deployed separately to App Service

3. **For Server Deployment:**
   - Use Azure CLI or Azure Portal UI to deploy the `/server` folder
   - Or configure Azure Pipelines for automatic deployment

### 5. Test the Connection

Once deployed:
1. Visit: `https://victorious-ground-0443e4d00.7.azurestaticapps.net`
2. Try registering a user
3. Check browser console for API errors
4. Monitor Azure Portal logs

## 
1. **Check Azure App Service Logs:**
 Log Stream
   
2. **Check Static Web Apps Logs:**
 Build History

3. **Browser Console Errors:**
 Console tab
   - Look for network errors (red 404, 500, etc.)

## Quick Checklist

- [ ] Environment variables added to App Service
- [ ] Client .env updated with correct API URL
- [ ] Changes committed and pushed to GitHub
- [ ] GitHub Actions completed deployment
- [ ] App Service is running and healthy
- [ ] Tested login/register from Azure SWA URL
