# Authentication Setup Guide

## Overview

Your Ultimate Tours website now includes comprehensive authentication with:

- ✅ Email OTP verification for signup
- ✅ Google OAuth sign-in integration
- ✅ Secure JWT-based sessions
- ✅ Email verification system
- ✅ Beautiful email templates

## Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# Database
MONGODB_URI=mongodb://localhost:27017/ultimate-tours

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-key-change-in-production

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-change-in-production

# Email Configuration for OTP
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Ultimate Tours <your-email@gmail.com>"

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OTP Configuration
OTP_EXPIRY_MINUTES=10
MAX_OTP_ATTEMPTS=3
```

## Email Service Setup (Gmail)

### 1. Enable 2-Factor Authentication

- Go to your Google Account settings
- Security → 2-Step Verification → Turn on

### 2. Generate App Password

- Go to Google Account → Security → App passwords
- Select "Mail" and your device
- Copy the generated 16-character password
- Use this as `EMAIL_PASS` in your environment variables

### 3. Alternative Email Services

For production, consider using:

- **SendGrid**: More reliable for transactional emails
- **Mailgun**: Good for high-volume sending
- **Amazon SES**: Cost-effective for AWS users

## Google OAuth Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API and Google OAuth2 API

### 2. Configure OAuth Consent Screen

1. Go to APIs & Services → OAuth consent screen
2. Choose "External" user type
3. Fill in required information:
   - App name: "Ultimate Tours"
   - User support email: your email
   - Developer contact: your email
4. Add scopes: `openid`, `email`, `profile`
5. Add test users if needed

### 3. Create OAuth Credentials

1. Go to APIs & Services → Credentials
2. Click "Create Credentials" → OAuth 2.0 Client IDs
3. Application type: Web application
4. Name: "Ultimate Tours Web"
5. Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
6. Copy Client ID and Client Secret to your `.env.local`

## Security Recommendations

### 1. JWT Secrets

Generate strong secrets using:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Environment Variables for Production

- Use environment variable services (Vercel, Netlify, Railway)
- Never commit `.env.local` to version control
- Use different secrets for development and production

### 3. Email Security

- Use app-specific passwords for Gmail
- Consider using dedicated email services for production
- Monitor email sending limits and reputation

## Authentication Flow

### 1. Email/Password Registration

```
User fills form → OTP sent to email → User verifies OTP → Account created
```

### 2. Google OAuth Registration

```
User clicks Google button → Google auth → Account created automatically → User logged in
```

### 3. Sign In Process

```
User enters credentials → Email verification check → JWT token generated → User logged in
```

## API Endpoints

### Registration & Verification

- `POST /api/auth/register` - Start registration with OTP
- `POST /api/auth/verify-otp` - Verify email with OTP
- `POST /api/auth/resend-otp` - Resend verification code

### Authentication

- `POST /api/auth/login` - Email/password login
- `GET /api/auth/[...nextauth]` - Google OAuth endpoints

## Testing the System

### 1. Email Registration Flow

1. Go to `/signup`
2. Fill form with valid email
3. Check email for OTP code
4. Enter OTP on verification page
5. Should redirect to home page

### 2. Google OAuth Flow

1. Go to `/signup` or `/signin`
2. Click "Sign in with Google"
3. Complete Google authentication
4. Should redirect to home page

### 3. Sign In Flow

1. Go to `/signin`
2. Enter verified email and password
3. Should redirect to home page
4. Try with unverified email - should show verification prompt

## Troubleshooting

### Email Issues

- **OTP not received**: Check spam folder, verify email credentials
- **SMTP errors**: Ensure app password is correct, 2FA is enabled
- **Rate limiting**: Implement proper delays between OTP requests

### Google OAuth Issues

- **Redirect URI mismatch**: Ensure exact URLs in Google Console
- **Invalid client**: Check CLIENT_ID and CLIENT_SECRET
- **Consent screen**: Ensure app is published or users are added as testers

### General Issues

- **JWT errors**: Verify JWT_SECRET is set and consistent
- **Database errors**: Ensure MongoDB is running and connected
- **Missing packages**: Run `npm install` to ensure all dependencies

## Production Checklist

- [ ] Set strong JWT secrets
- [ ] Configure production email service
- [ ] Set up Google OAuth for production domain
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure error monitoring
- [ ] Test all authentication flows
- [ ] Set up email delivery monitoring

## Support

If you need help setting up any part of the authentication system:

1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Test email sending manually
4. Ensure Google OAuth is configured properly

The authentication system is now production-ready with proper security measures and user experience!
