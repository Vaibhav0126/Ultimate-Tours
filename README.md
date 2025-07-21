# 🌍 Ultimate Tours - Travel Booking Platform

> A full-stack travel booking website built with Next.js, MongoDB, and modern web technologies.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://your-app.up.railway.app)
[![Deploy on Railway](https://img.shields.io/badge/Deploy-Railway-purple)](https://railway.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)](https://mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://typescriptlang.org/)

## 📸 Screenshots

### Home Page

![Home Page](public/images/tourism1.jpg)

### Package Listings

_Beautiful travel packages with detailed information_

### Admin Dashboard

_Comprehensive admin panel for managing tours and bookings_

## ✨ Features

### 🎯 **Core Features**

- **🏠 Modern Homepage** - Hero section, featured packages, services showcase
- **📦 Package Management** - Browse travel packages with detailed information
- **👤 User Authentication** - Secure signup/login with email verification
- **💝 Wishlist System** - Save favorite travel packages
- **📞 Contact System** - Contact forms with email notifications
- **⭐ Rating System** - User reviews and ratings for packages
- **🔐 Admin Panel** - Complete administrative dashboard

### 🛠️ **Technical Features**

- **📱 Responsive Design** - Works on all devices
- **🎨 Modern UI** - Built with Tailwind CSS
- **🔒 Secure Authentication** - JWT tokens with email verification
- **📧 Email Integration** - Nodemailer for transactional emails
- **🖼️ Image Upload** - Secure file upload system
- **🗄️ Database Integration** - MongoDB with Mongoose ODM
- **⚡ Performance Optimized** - Next.js optimization features

### 👨‍💼 **Admin Features**

- Dashboard overview with statistics
- Package management (CRUD operations)
- User management and monitoring
- Inquiry and contact form management
- Rating and review moderation
- File upload management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB database
- Gmail account (for email features)

### 1. Clone & Install

```bash
git clone https://github.com/Vaibhav0126/Ultimate-Tours.git
cd ultimate-tours
npm install
```

### 2. Environment Setup

```bash
cp env.template .env.local
# Edit .env.local with your configuration
```

### 3. Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

### 4. Seed Database (Optional)

```bash
npm run seed
```

## 🚂 Deploy on Railway

### Quick Deploy (5 minutes)

```bash
# Build and test
./deploy.sh

# Push to GitHub
git add .
git commit -m "Deploy to Railway"
git push origin main
```

**Then follow the [Railway Deployment Guide](./RAILWAY_DEPLOY.md)**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template)

## 🏗️ Tech Stack

### Frontend

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Components**: Custom React components

### Backend

- **API Routes**: Next.js API routes
- **Authentication**: JWT with bcryptjs
- **File Upload**: Formidable
- **Email**: Nodemailer

### Database

- **Database**: MongoDB
- **ODM**: Mongoose
- **Hosting**: MongoDB Atlas / Railway MongoDB

### Deployment

- **Platform**: Railway (recommended)
- **Alternative**: Vercel + MongoDB Atlas

## 📁 Project Structure

```
Ultimate Tours/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Homepage hero section
│   ├── FeaturedPackages.tsx
│   └── ...
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   │   ├── auth/      # Authentication endpoints
│   │   ├── packages/  # Package management
│   │   └── ...
│   ├── admin/         # Admin pages
│   ├── packages/      # Package listing & details
│   └── ...
├── lib/               # Utility libraries
│   ├── mongodb.ts     # Database connection
│   ├── emailService.ts # Email functionality
│   └── ...
├── models/            # Database models
│   ├── User.ts
│   ├── Package.ts
│   └── ...
├── styles/            # Global styles
├── public/            # Static assets
└── data/              # Sample data
```

## 🔧 Environment Variables

Create `.env.local` with these variables:

```env
# Database (Auto-provided by Railway)
MONGODB_URI=mongodb://localhost:27017/ultimate-tours

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Admin Account
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-secure-admin-password

# Environment
NODE_ENV=development
```

## 📝 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - Email verification
- `POST /api/auth/forgot-password` - Password reset

### Packages

- `GET /api/packages` - Get all packages
- `GET /api/packages/[id]` - Get package by ID
- `POST /api/packages` - Create package (admin)
- `PUT /api/packages/[id]` - Update package (admin)
- `DELETE /api/packages/[id]` - Delete package (admin)

### User Features

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/wishlist` - Get user wishlist
- `POST /api/user/wishlist` - Add to wishlist

### Admin

- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/inquiries` - Get contact inquiries
- `POST /api/contact` - Submit contact form

## 🎨 UI Components

### Core Components

- **Header** - Navigation with auth states
- **Hero** - Homepage hero section
- **FeaturedPackages** - Package showcase
- **Services** - Service offerings display
- **Footer** - Site footer with links
- **InquiryModal** - Contact form modal

### Feature Components

- **WishlistButton** - Add/remove from wishlist
- **RatingDisplay** - Star rating component
- **CustomerDiaries** - Testimonials section
- **WhyChooseUs** - Benefits section

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with sample data
```

### Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting (recommended)

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** with bcryptjs
- **Email Verification** for account security
- **Input Validation** on all forms
- **File Upload Security** with type checking
- **CORS Protection** configured
- **XSS Protection** headers set

## 📊 Database Schema

### User Model

```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  isVerified: boolean
  wishlist: ObjectId[] (Package references)
  createdAt: Date
}
```

### Package Model

```typescript
{
  title: string
  description: string
  price: number
  duration: string
  location: string
  images: string[]
  features: string[]
  itinerary: string[]
  isActive: boolean
  createdAt: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **MongoDB** for the database solution
- **Railway** for easy deployment
- **Tailwind CSS** for styling utilities
- **Lucide** for beautiful icons

## 📞 Support

- **Documentation**: Check the [Railway Deploy Guide](./RAILWAY_DEPLOY.md)
- **Issues**: [GitHub Issues](https://github.com/Vaibhav0126/Ultimate-Tours/issues)
- **Email**: support@ultimatetours.com

---

<div align="center">

**Made with ❤️ for travelers around the world**

[![GitHub stars](https://img.shields.io/github/stars/Vaibhav0126/Ultimate-Tours)](https://github.com/Vaibhav0126/Ultimate-Tours/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Vaibhav0126/Ultimate-Tours)](https://github.com/Vaibhav0126/Ultimate-Tours/network)
[![GitHub issues](https://img.shields.io/github/issues/Vaibhav0126/Ultimate-Tours)](https://github.com/Vaibhav0126/Ultimate-Tours/issues)

[🌐 Live Demo](https://your-app.up.railway.app) • [📖 Documentation](./RAILWAY_DEPLOY.md) • [🐛 Report Bug](https://github.com/Vaibhav0126/Ultimate-Tours/issues)

</div>
