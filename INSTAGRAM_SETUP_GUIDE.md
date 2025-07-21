# Instagram API Setup Guide for Ultimate Tours

This guide will help you set up Instagram API integration to automatically fetch your latest 3 posts from `@_ultimate_tours_` for the Customer Diaries section.

## Overview

Your website now includes Instagram API integration that:

- ✅ Automatically fetches your latest 3 Instagram posts
- ✅ Falls back to sample data if API is not configured
- ✅ Updates posts dynamically when you refresh
- ✅ Links directly to your Instagram posts
- ✅ Extracts customer names, locations, and hashtags from captions

## Setup Instructions

### Step 1: Create a Facebook/Instagram App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App" → "Consumer" → "Next"
3. Enter app details:
   - **App Name**: "Ultimate Tours Instagram Feed"
   - **App Contact Email**: Your email address
4. Click "Create App"

### Step 2: Add Instagram Basic Display Product

1. In your app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Go to **Instagram Basic Display** → **Basic Display**
4. Click "Create New App"
5. Enter the same app name and click "Create App"

### Step 3: Configure Instagram App

1. In **Instagram Basic Display** settings:

   - **Valid OAuth Redirect URIs**: `https://localhost/`
   - **Deauthorize Callback URL**: `https://localhost/`
   - **Data Deletion Request URL**: `https://localhost/`

2. Save changes

### Step 4: Add Instagram Test User

1. Go to **Roles** → **Roles**
2. Click "Add Instagram Testers"
3. Enter your Instagram username: `_ultimate_tours_`
4. Click "Submit"

### Step 5: Accept Tester Invitation

1. Log into your Instagram account `@_ultimate_tours_`
2. Go to **Settings** → **Apps and Websites** → **Tester Invites**
3. Accept the invitation

### Step 6: Generate Access Token

1. In your Facebook app, go to **Instagram Basic Display** → **Basic Display**
2. Click "Generate Token" next to your Instagram account
3. Log in with your Instagram credentials
4. Authorize the app
5. Copy the generated **Access Token** (it starts with `IGQV...`)

### Step 7: Add Environment Variable

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Instagram access token:

```bash
# Instagram API Configuration
INSTAGRAM_ACCESS_TOKEN=IGQV...your_actual_token_here...
```

### Step 8: Test the Integration

1. Restart your development server:

```bash
npm run dev
```

2. Visit your website and check the Customer Diaries section
3. You should see:
   - ✅ "Live from Instagram" indicator (green dot)
   - ✅ Your actual Instagram posts
   - ✅ Real captions, dates, and images

## Important Notes

### Access Token Expiry

- **Short-term tokens**: Expire in 1 hour
- **Long-term tokens**: Expire in 60 days
- You'll need to refresh tokens periodically

### To Get Long-term Token

After getting your short-term token, exchange it for a long-term one:

```bash
curl -i -X GET "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=YOUR_SHORT_TERM_TOKEN"
```

### Automatic Token Refresh (Optional)

For production, consider implementing automatic token refresh in your API.

## Troubleshooting

### "Using sample data" indicator shows

- ✅ Check if `INSTAGRAM_ACCESS_TOKEN` is set in `.env.local`
- ✅ Restart your development server
- ✅ Verify the token hasn't expired

### API errors in console

- ✅ Check if your Instagram account has recent posts
- ✅ Verify the token has correct permissions
- ✅ Ensure your account is public or properly authorized

### Posts not updating

- ✅ Click the "Refresh" button in the Customer Diaries section
- ✅ Check if you've posted new content on Instagram
- ✅ Verify the token is still valid

## Fallback Behavior

If Instagram API is not configured or fails:

- ✅ Website shows sample customer stories
- ✅ No errors or broken functionality
- ✅ "Using sample data" indicator appears
- ✅ All functionality remains intact

## Caption Intelligence

The system automatically extracts:

- **Customer Names**: From patterns like "Thanks to Sarah" or "Michael enjoyed"
- **Locations**: From patterns like "in Kerala" or "Goa experience"
- **Hashtags**: All hashtags in your captions
- **Dates**: Automatically formatted relative dates

## Next Steps

1. Follow the setup instructions above
2. Test with your actual Instagram account
3. Post new content with customer mentions and location tags
4. Watch your website automatically update with fresh content!

---

**Need Help?**

- Check the browser console for error messages
- Verify your `.env.local` file is properly configured
- Ensure your Instagram account is active and has recent posts

Your Customer Diaries section will now stay fresh with your latest Instagram content! 🎉
