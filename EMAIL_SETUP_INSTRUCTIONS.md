# Email Setup Instructions for Ultimate Tours

To enable email delivery for your contact form, you need to set up Gmail App Password authentication.

## Step 1: Create Gmail App Password

1. Go to your Google Account settings: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google," click on "App passwords"
4. You may need to sign in again
5. Select app: Choose "Mail"
6. Select device: Choose "Other" and type "Ultimate Tours Website"
7. Click "Generate"
8. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

## Step 2: Create Environment Variables File

Create a file named `.env.local` in your project root (same folder as package.json) with this content:

```env
# Email Configuration for Contact Form
EMAIL_USER=ultimatetours1@gmail.com
EMAIL_PASS=your-16-character-app-password-here

# JWT Secret for admin authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

Replace `your-16-character-app-password-here` with the password you generated in Step 1.
Replace `your-super-secret-jwt-key-change-this-in-production` with a random string.

## Step 3: Restart Your Development Server

After creating the `.env.local` file:

1. Stop your development server (Ctrl+C)
2. Run `npm run dev` again
3. Test the contact form

## Security Notes

- Never share your App Password
- The `.env.local` file should never be committed to Git
- App Passwords are safer than using your regular Gmail password
- You can revoke the App Password anytime from your Google Account settings

## Troubleshooting

If emails still don't send:

1. Check that 2-factor authentication is enabled on your Gmail account
2. Verify the App Password is correct (no spaces)
3. Check the browser console and terminal for error messages
4. Make sure `.env.local` is in the correct location (project root)

## Alternative Email Services

If Gmail doesn't work for you, the contact form API can be configured to use:

- SendGrid
- AWS SES
- Mailgun
- Resend
- Any SMTP service

Contact your developer to configure alternative email services.
