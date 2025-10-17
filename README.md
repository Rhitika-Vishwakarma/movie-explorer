# 🎬 MovieExplorer - Next.js Movie Discovery App

A full-featured movie discovery application built with Next.js 14, TypeScript, and Tailwind CSS, powered by The Movie Database (TMDB) API.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

### ✅ Core Features

- **Project Setup**
  - ✅ Next.js 14 with App Router
  - ✅ TypeScript for type safety
  - ✅ Tailwind CSS for styling

- **Authentication**
  - ✅ Login & Register functionality using JWT-based authentication
  - ✅ User authentication state stored in localStorage
  - ✅ Protected routes - only logged-in users can access main features

- **Movie Listing Page**
  - ✅ Fetch and display movies from TMDB API (`https://api.themoviedb.org/3`)
  - ✅ Show poster, title, and rating for each movie
  - ✅ Implemented infinite scrolling with pagination

- **Search Functionality**
  - ✅ Search bar for dynamic movie search
  - ✅ Fetch and display search results from API

- **Movie Detail Page**
  - ✅ Dynamic routing (`/movie/[id]`)
  - ✅ Display title, description, rating, release date, and other details

- **Favorite Movies Feature**
  - ✅ Add/remove movies to/from favorites
  - ✅ Store favorites in localStorage
  - ✅ "My Favorites" page to view saved movies

- **UI & Performance**
  - ✅ Fully responsive design
  - ✅ Next.js Image Optimization (`next/image`)
  - ✅ Loading skeletons for better UX

### ✅ Bonus Features Implemented

- ✅ **Server-side rendering (SSR)** for movie detail pages
- ✅ **Dark mode support** using Tailwind's dark mode with system preference detection
- ✅ **Deployed on Vercel** with live demo link

## 🚀 Live Demo

- **Live Application**: https://movie-explorer-pmgye8fzb-rhitika-vishwakarma-s-projects.vercel.app/login

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript 5.5
- **Styling**: Tailwind CSS 3.4
- **Authentication**: JWT + bcryptjs
- **API**: TMDB API v3

### Key Libraries Used
- `next-auth@4.24.7` - Authentication framework
- `bcryptjs@2.4.3` - Password hashing
- `jsonwebtoken@9.0.2` - JWT token generation
- `zod@3.23.8` - Schema validation
- `lucide-react@0.263.1` - Icon library

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- TMDB API key (get from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Create `.env.local` file in root directory:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_here
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
movie-explorer/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (protected)/         # Protected routes
│   │   │   ├── movies/          # Movie listing page
│   │   │   ├── movie/[id]/      # Movie detail page
│   │   │   ├── favorites/       # Favorites page
│   │   │   └── search/          # Search page
│   │   ├── api/                 # API routes
│   │   │   ├── auth/            # Auth endpoints
│   │   │   └── movies/          # Movie endpoints
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   ├── auth/                # Auth forms
│   │   ├── movies/              # Movie components
│   │   ├── layout/              # Layout components
│   │   └── providers/           # Context providers
│   ├── lib/
│   │   ├── api/                 # API client functions
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Utility functions
│   │   └── constants/           # App constants
│   ├── types/                   # TypeScript definitions
│   ├── context/                 # React Context
│   └── middleware.ts            # Route protection
├── public/
├── .env.local
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 Key Features Implementation

### 1. Authentication System
- JWT-based authentication with secure password hashing
- Login and registration forms with validation
- Protected routes using Next.js middleware
- Persistent sessions using localStorage
- Automatic redirect to login for unauthorized access

### 2. Movie Listing with Infinite Scroll
- Fetches popular movies from TMDB API
- Grid layout showing poster, title, and rating
- Infinite scroll implementation using Intersection Observer
- Loading skeletons during data fetch
- Responsive grid (2 to 6 columns based on screen size)

### 3. Search Functionality
- Real-time search with 500ms debouncing
- Dynamic results display
- Clear search button
- Search results count

### 4. Movie Detail Page
- Server-side rendered for SEO optimization
- Dynamic routing with `[id]` parameter
- Displays comprehensive movie information
- Backdrop image with gradient overlay
- Genre tags, runtime, budget, revenue
- Add/remove from favorites functionality

### 5. Favorites Management
- Context API for global state management
- Add/remove movies with heart icon toggle
- Persistent storage in localStorage
- Dedicated favorites page
- Badge showing favorites count in navbar

### 6. Responsive Design & Dark Mode
- Mobile-first responsive design
- Breakpoints: sm, md, lg, xl, 2xl
- Dark mode with Tailwind CSS
- System preference detection
- Toggle button in navbar

## 🔌 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Movies
- `GET /api/movies/popular?page=1` - Get popular movies
- `GET /api/movies/search?query=term&page=1` - Search movies
- `GET /api/movies/[id]` - Get movie details

## 💡 Technical Highlights

### State Management
- React Context API for authentication state
- Custom hooks (`useAuth`, `useFavorites`, `useDebounce`)
- localStorage for data persistence

### Performance Optimizations
- Next.js Image component for optimized images
- Infinite scroll to reduce initial load
- Debounced search to minimize API calls
- Loading skeletons for perceived performance

### Code Quality
- TypeScript for type safety
- Proper component structure and separation
- Reusable UI components
- Custom hooks for shared logic
- Consistent naming conventions

### Security
- Password hashing with bcryptjs
- JWT tokens for authentication
- Protected API routes
- Environment variables for sensitive data

## 🐛 Known Limitations

### Development Environment
- User data stored in-memory (not persistent across server restarts)
- For production, requires database integration (PostgreSQL, MongoDB, etc.)

### TMDB API
- Rate limits: 40 requests per 10 seconds
- Requires valid API key
- Some regions may have network restrictions

## 🙏 Acknowledgments

- TMDB for providing the movie database API
- Next.js team for the excellent framework
