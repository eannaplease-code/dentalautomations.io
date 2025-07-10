# DentalAutomations.io - Replit Development Guide

## Overview

DentalAutomations.io is a modern dental practice automation platform built with a React frontend and Express backend. The application provides AI-powered automation services including WhatsApp/Instagram assistants, smart notifications, HR onboarding, and invoice scanning for dental practices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript, Vite build system
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Routing**: Wouter (lightweight React router)

### Project Structure
- `client/` - React frontend application
- `server/` - Express backend API
- `shared/` - Shared TypeScript types and schemas
- `components.json` - shadcn/ui configuration
- `drizzle.config.ts` - Database configuration

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom dental-themed color palette
- **Type Safety**: Full TypeScript implementation
- **Build Tool**: Vite with React plugin and hot module replacement

### Backend Architecture
- **API Framework**: Express.js with TypeScript
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Prepared for connect-pg-simple (PostgreSQL sessions)
- **Development**: tsx for TypeScript execution

### Database Design
- Currently minimal schema with users table
- Drizzle migrations in `./migrations` directory
- Schema definitions in `shared/schema.ts`
- Uses Neon Database serverless PostgreSQL

### Authentication & Security
- HIPAA compliance ready (mentioned in marketing copy)
- Session-based authentication prepared
- PostgreSQL session storage configuration

## Data Flow

1. **Client Requests**: React components use TanStack Query for API calls
2. **API Layer**: Express routes handle HTTP requests with proper error handling
3. **Database**: Drizzle ORM manages PostgreSQL interactions
4. **Response**: JSON responses with consistent error handling

### Storage Interface
- Full database implementation with PostgreSQL via Neon Database
- DatabaseStorage class implementing comprehensive CRUD operations
- Support for users, dentists, demo requests, and newsletter subscriptions
- Automated database schema management with Drizzle migrations

## External Dependencies

### Core Libraries
- **Database**: @neondatabase/serverless, drizzle-orm
- **UI Components**: Full Radix UI suite (@radix-ui/react-*)
- **Styling**: class-variance-authority, clsx, tailwindcss
- **Forms**: @hookform/resolvers, react-hook-form (prepared)
- **Validation**: zod with drizzle-zod integration

### Development Tools
- **Build**: esbuild for server bundling
- **Development**: Replit-specific plugins for cartographer and error overlay
- **Type Checking**: Strict TypeScript configuration

## Deployment Strategy

### Build Process
1. `npm run build` - Builds both frontend (Vite) and backend (esbuild)
2. Frontend builds to `dist/public`
3. Backend bundles to `dist/index.js`

### Production Setup
- Static file serving for built frontend
- Express server with proper error handling
- Environment variable configuration for DATABASE_URL
- Ready for PostgreSQL deployment

### Development Workflow
- `npm run dev` - Starts development server with hot reload
- `npm run check` - TypeScript type checking
- `npm run db:push` - Database schema updates

### Environment Configuration
- Development and production environment detection
- Database URL required for production
- Vite dev server integration in development

## Landing Page Features

The current implementation includes a complete dental practice marketing website with:

### Frontend Features
- Professional hero section with trust badges (HIPAA, SOC 2)
- Service showcase (WhatsApp AI, notifications, HR automation, invoice scanning)
- Customer testimonials and social proof
- Interactive demo request form with comprehensive practice information capture
- Newsletter subscription functionality (both dedicated section and footer)
- Mobile-responsive design with scroll animations
- SEO-optimized meta tags and descriptions
- Toast notifications for user feedback
- Glass-morphism UI effects with sophisticated aesthetic

### Backend API Features
- `/api/demo-request` - Submit demo requests with practice information
- `/api/demo-requests` - Retrieve all demo requests (admin functionality)
- `/api/newsletter` - Newsletter subscription management
- `/api/newsletter/unsubscribe` - Unsubscribe functionality
- `/api/health` - System health check endpoint
- Full form validation using Zod schemas
- PostgreSQL data persistence with Drizzle ORM

### Recent Updates (January 2025)
- Implemented complete database integration with PostgreSQL
- Added functional demo request form with practice size, software, and challenge selection
- Created newsletter signup components with email validation
- Enhanced footer with quick newsletter subscription
- Added comprehensive error handling and success notifications
- Integrated TanStack Query for optimized API calls

The design follows dental industry best practices with a professional teal/green color scheme, clean typography, and healthcare-focused messaging inspired by Practice Better's aesthetic.