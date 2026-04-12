# S. Vigneshwaran - Freelance Web Developer Portfolio

A modern, professional business website for freelance web developer S. Vigneshwaran, built with React, Vite, Tailwind CSS, and Firebase.

## 🚀 Features

- **Dark Theme with Glassmorphism**: Beautiful dark design with glass-like effects
- **Smooth Animations**: Scroll, hover, and fade-in animations throughout
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- **Firebase Integration**: Booking form data stored in Firestore
- **Sticky Navbar**: Navigation that follows as you scroll
- **WhatsApp Floating Button**: Quick contact via WhatsApp
- **Loading Animation**: Visual feedback during form submission

## 📄 Sections

1. **Hero Section**: Name, tagline, and call-to-action buttons
2. **About Section**: Personal introduction and statistics
3. **Services Section**: List of services offered
4. **Portfolio Section**: Showcase of recent projects
5. **Pricing Section**: Transparent pricing plans
6. **Booking Section**: Contact form with Firebase integration

## 🔥 Firebase Setup

### 1. Create a Firebase Project

Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.

### 2. Add a Web App

In your Firebase project:
1. Click on the web icon (</>) to add a web app
2. Register your app with a name
3. Copy the firebaseConfig object

### 3. Create Firestore Database

1. Go to "Build" → "Firestore Database"
2. Click "Create Database"
3. Choose a location and start in test mode or production mode
4. Create a collection named "bookings"

### 4. Set Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Firestore Collection Structure

The booking form stores data in the "bookings" collection with the following fields:

- `name`: string - Client's name
- `email`: string - Client's email
- `phone`: string - Client's phone number
- `project`: string - Project details/description
- `timestamp`: serverTimestamp - Automatic timestamp

## 🛠️ Tech Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling framework
- **Firebase Web SDK v10**: Backend services
- **TypeScript**: Type safety

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customization

### Colors

The color scheme uses Tailwind's indigo and purple gradients. Modify colors in the `bg-gradient-to-r` classes.

### WhatsApp Number

Change the WhatsApp number in the `App.tsx` file:

```tsx
href="https://wa.me/919876543210"
```

Replace `919876543210` with your actual number (include country code without `+`).

### Contact Information

Update email, phone, and social links in the footer section.

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Firestore Security Rules

For production, set up proper security rules in Firestore:

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{document=**} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

## 📄 License

This project is open source and available for personal and commercial use.

---

Made with ❤️ by S. Vigneshwaran