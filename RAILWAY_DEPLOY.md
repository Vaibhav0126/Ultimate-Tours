# 🚂 Ultimate Tours - Railway Deployment Guide

## 🎯 Why Railway?

Railway is perfect for your Ultimate Tours website because:

- ✅ **All-in-one platform** - Frontend, backend, and database in one place
- ✅ **Built-in MongoDB** - No need for external database setup
- ✅ **Simple deployment** - Connect GitHub and deploy
- ✅ **Automatic scaling** - Handles traffic spikes
- ✅ **Fair pricing** - Pay only for what you use

## 🚀 Quick Deployment (5 Minutes)

### Step 1: Prepare Your Code

```bash
# Make sure everything is ready
npm install
npm run build

# Run the deployment script
./deploy.sh
```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### Step 3: Deploy on Railway

#### 3.1 Create Railway Account

1. Go to [railway.app](https://railway.app/)
2. Sign up with GitHub (recommended)

#### 3.2 Create New Project

1. Click **"Start a New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your **Ultimate Tours** repository
4. Railway will automatically detect it's a Next.js app

#### 3.3 Add MongoDB Database

1. In your project dashboard, click **"Add Service"**
2. Select **"Database"** → **"Add MongoDB"**
3. Railway will automatically provide the `MONGODB_URI`

#### 3.4 Configure Environment Variables

1. Click on your **app service** (not the database)
2. Go to **"Variables"** tab
3. Add these environment variables:

```env
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-admin-password
NODE_ENV=production
```

**Note**: `MONGODB_URI` is automatically provided by Railway's MongoDB service.

#### 3.5 Deploy!

1. Click **"Deploy"**
2. Wait for deployment to complete (2-3 minutes)
3. Your app will be live at: `https://your-app-name.up.railway.app`

## 🔧 Environment Variables Setup

### Required Variables:

| Variable         | Description                          | Example                         |
| ---------------- | ------------------------------------ | ------------------------------- |
| `JWT_SECRET`     | Secret key for JWT tokens            | `your-super-secret-32-char-key` |
| `EMAIL_USER`     | Your email for sending notifications | `your-email@gmail.com`          |
| `EMAIL_PASS`     | Gmail app password                   | `abcd efgh ijkl mnop`           |
| `ADMIN_EMAIL`    | Admin panel login email              | `admin@yourdomain.com`          |
| `ADMIN_PASSWORD` | Admin panel password                 | `SecurePassword123!`            |

### Auto-Provided by Railway:

- `MONGODB_URI` - Database connection (automatic)
- `PORT` - Application port (automatic)

## 📧 Email Setup (Gmail)

### Get Gmail App Password:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification (enable if not already)
3. App passwords → Generate new password
4. Use this password as `EMAIL_PASS`

## 🔒 Security Checklist

Before deployment:

- [ ] Strong JWT secret (32+ characters)
- [ ] Secure admin password
- [ ] Valid email credentials
- [ ] No sensitive data in code
- [ ] Environment variables properly set

## 🌍 Custom Domain (Optional)

### Add Your Domain:

1. In Railway project → App service
2. **Settings** → **Networking**
3. **Custom Domains** → Add your domain
4. Update your DNS records as shown

## 📊 Post-Deployment

### 1. Seed Your Database

```bash
# Access Railway's database directly or use the seed script
npm run seed
```

### 2. Test Everything:

- [ ] Home page loads
- [ ] User registration/login
- [ ] Package browsing
- [ ] Contact form
- [ ] Admin panel access
- [ ] File uploads
- [ ] Email notifications

### 3. Monitor Your App:

- Railway provides automatic monitoring
- Check logs in Railway dashboard
- Set up error alerts if needed

## 🔧 Troubleshooting

### Common Issues:

**Build Failures:**

- Check Railway build logs
- Verify Node.js version compatibility
- Ensure all dependencies are in package.json

**Database Connection:**

- Verify MongoDB service is running
- Check if MONGODB_URI is auto-provided
- Restart services if needed

**Environment Variables:**

- Double-check all required variables are set
- Verify no typos in variable names
- Restart deployment after adding variables

**Email Not Working:**

- Verify Gmail app password
- Check EMAIL_USER and EMAIL_PASS
- Test SMTP settings

## 💰 Railway Pricing

### Free Tier:

- $5 credit monthly
- Perfect for testing and small apps
- Includes database hosting

### Paid Plans:

- Pay-per-use after free credit
- Typically $5-20/month for small to medium apps
- Automatic scaling included

## 🎉 You're Live!

After successful deployment:

1. **Share your link**: `https://your-app.up.railway.app`
2. **Test all features** thoroughly
3. **Add your custom domain** (optional)
4. **Monitor performance** in Railway dashboard
5. **Set up backups** for your database

---

## 🆘 Need Help?

- **Railway Documentation**: [docs.railway.app](https://docs.railway.app/)
- **Railway Discord**: Active community support
- **GitHub Issues**: For code-specific problems

**Ready to deploy?** Run `./deploy.sh` and follow the instructions!

🚂 **All aboard the Railway deployment train!** 🎉
