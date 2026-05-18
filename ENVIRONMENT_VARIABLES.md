# Environment Variables Reference

## Production (Vercel Dashboard)

 Environment Variables):

### Required Variables

| Variable | Value | Source |
|----------|-------|--------|
| `MONGO_URI` | `mongodb+srv://user:password@cluster.mongodb.net/db?appName=app` | MongoDB Atlas |
| `JWT_SECRET` | Random 32+ character string | Generate random |
| `NODE_ENV` | `production` | Hardcoded |

### Build Variables (Optional but Recommended)

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `https://your-project.vercel.app` | Set after first deploy |

## Development (.env files)

### Root Level: `.env`
```env
# Leave empty or use for local server dev
```

### Client: `client/.env.local`
```env
VITE_API_URL=http://localhost:5001
```

### Server: `server/.env`
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?appName=appname
JWT_SECRET=your_jwt_secret_key_here
PORT=8080
NODE_ENV=development
```

## How to Get These Values

### MONGO_URI
1. Go to https://www.mongodb.com/cloud/atlas
2. Create/select a cluster
3. Click "Connect"
4. Copy connection string
5. Replace `<password>` with your database user password
6. Add database name at the end

**Example:**
```
mongodb+srv://myuser:mypassword@cluster.mongodb.net/brandburst?appName=mybrand
```

### JWT_SECRET
Generate a random string using one of these methods:

**Online:**
- https://www.random.org/strings/

**Command line (macOS/Linux):**
```bash
openssl rand -base64 32
```

**Node.js:**
```javascript
require('crypto').randomBytes(32).toString('hex')
```

**Python:**
```python
import secrets
secrets.token_urlsafe(32)
```

## Vercel Environment Variable Types

### Development
- Used during `vercel dev`
- Not available during build

### Preview
- Used for preview deployments (PRs)
- Should be same as Production for testing

### Production
- Used for main deployments
- Never expose secrets here unnecessarily

## Security Best Practices

 DO:
- [ ] Use strong passwords (MongoDB user password)
- [ ] Use long JWT secrets (32+ characters)
- [ ] Keep `.env` files local (in .gitignore)
- [ ] Rotate secrets periodically
- [ ] Use separate credentials per environment

 DON'T:
- [ ] Commit `.env` files to Git
- [ ] Share secrets in messages/emails
- [ ] Use simple/guessable secrets
- [ ] Use the same secret for dev and prod
- [ ] Log sensitive values

## Testing Environment Variables

### Check if variables are set
```bash
# On Vercel (during deployment)
# Check Function Logs in Vercel Dashboard

# Locally
echo $MONGO_URI
echo $JWT_SECRET
```

### API Health Check
```bash
# Test API connection (replace with your domain)
curl https://your-project.vercel.app/api/health
```

## Troubleshooting

### MongoDB Connection Fails
- Verify `MONGO_URI` is correct
- Check MongoDB user password
- Whitelist IP: `0.0.0.0/0` in MongoDB Atlas

### API Returns 401
- Verify `JWT_SECRET` is set
- Check token format in requests
- Verify token generation logic

### Build Fails
- Check `NODE_ENV` is not set to "development"
- Verify all required variables are present
- Check Vercel build logs

## References

- [MongoDB Connection String](https://docs.mongodb.com/manual/reference/connection-string/)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [JWT Secrets](https://jwt.io/introduction)
