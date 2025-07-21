#!/bin/bash

echo "🚂 Ultimate Tours - Railway Deployment Script"
echo "============================================="

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Please create it with your environment variables."
    echo "   Required variables:"
    echo "   - JWT_SECRET"
    echo "   - EMAIL_USER"
    echo "   - EMAIL_PASS"
    echo "   - ADMIN_EMAIL"
    echo "   - ADMIN_PASSWORD"
    echo ""
    echo "   Note: MONGODB_URI will be provided automatically by Railway"
    echo ""
    read -p "Do you want to continue anyway? (y/n): " continue_anyway
    if [ "$continue_anyway" != "y" ]; then
        exit 1
    fi
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

echo ""
echo "🚂 Railway Deployment Instructions:"
echo "===================================="
echo ""
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for Railway deployment'"
echo "   git push origin main"
echo ""
echo "2. Go to https://railway.app/"
echo "3. Click 'Start a New Project'"
echo "4. Select 'Deploy from GitHub repo'"
echo "5. Connect your Ultimate Tours repository"
echo "6. Add MongoDB service:"
echo "   - Click 'Add Service' → 'Database' → 'Add MongoDB'"
echo "7. Set environment variables in your app service:"
echo "   - JWT_SECRET"
echo "   - EMAIL_USER"
echo "   - EMAIL_PASS" 
echo "   - ADMIN_EMAIL"
echo "   - ADMIN_PASSWORD"
echo "8. Deploy!"
echo ""
echo "📖 See RAILWAY_DEPLOY.md for detailed instructions"
echo ""
echo "🎉 Your Ultimate Tours website will be live on Railway!" 