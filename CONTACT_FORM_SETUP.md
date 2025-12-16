# Contact Form Setup Guide

Your contact form is now configured to send emails to **valahiral563@gmail.com** and store submissions in MongoDB. Follow these steps to complete the setup.

## 📋 Prerequisites

- MongoDB database (free tier available on MongoDB Atlas)
- Resend account (free tier: 100 emails/day)

## 🚀 Setup Instructions

### Step 1: Set up MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (free tier available)
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster.xxx.mongodb.net/<dbname>`)
7. Replace `<password>` with your database password
8. Replace `<dbname>` with a name like `portfolio`

### Step 2: Set up Resend

1. Go to [Resend](https://resend.com)
2. Sign up for a free account
3. Navigate to [API Keys](https://resend.com/api-keys)
4. Click "Create API Key"
5. Give it a name (e.g., "Portfolio Contact Form")
6. Copy the API key (starts with `re_`)

### Step 3: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.xxx.mongodb.net/portfolio
   ```
3. Add your Resend API key:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
   ```

### Step 4: Verify Your Domain (Optional but Recommended)

By default, Resend uses `onboarding@resend.dev` as the sender email. To use your own domain:

1. Go to [Resend Domains](https://resend.com/domains)
2. Click "Add Domain"
3. Follow the DNS verification steps
4. Update the `from` field in `app/api/contact/route.ts`:
   ```typescript
   from: 'Portfolio <noreply@yourdomain.com>'
   ```

## 🧪 Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact section on your portfolio
3. Fill out the form with test data
4. Check your email at valahiral563@gmail.com
5. Verify the submission is saved in MongoDB Atlas (Collections > Contacts)

## 📁 What Was Created

- **`/app/api/contact/route.ts`** - API endpoint handling form submissions
- **`/lib/mongodb.ts`** - MongoDB connection utility
- **`/models/Contact.ts`** - Contact data model/schema
- **`.env.local`** - Environment variables (not committed to git)

## 🎨 Features

✅ Email notifications sent to valahiral563@gmail.com
✅ All submissions stored in MongoDB database
✅ Beautiful HTML email template
✅ Form validation (name, email, message)
✅ Error handling with user-friendly messages
✅ Graceful degradation (saves to DB even if email fails)

## 🔒 Security Notes

- `.env.local` is already in `.gitignore` (your keys are safe)
- Email validation prevents invalid submissions
- MongoDB connection is cached for performance
- Error messages don't expose sensitive information

## 📊 Viewing Submissions

To view all contact form submissions:

1. Log into [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Browse Collections" on your cluster
3. Navigate to your database → `contacts` collection
4. You'll see all submissions with name, email, message, and timestamp

## 🛠️ Troubleshooting

**"Please define the MONGODB_URI environment variable"**
- Make sure `.env.local` exists in your project root
- Verify the variable name is exactly `MONGODB_URI`
- Restart your development server after adding env variables

**Email not received**
- Check spam/junk folder
- Verify your Resend API key is correct
- Check Resend dashboard for delivery status
- Note: The contact still saves to the database even if email fails

**"Cannot connect to MongoDB"**
- Verify your connection string is correct
- Check that your IP address is whitelisted in MongoDB Atlas (Network Access)
- Ensure your database password doesn't contain special characters (or URL encode them)

## 🎯 Next Steps

Consider adding:
- Email notifications to the person who submitted the form (confirmation email)
- Admin dashboard to view all submissions
- Spam protection (reCAPTCHA, rate limiting)
- Email templates for different types of inquiries

---

Need help? Check the documentation:
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [Resend Docs](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
