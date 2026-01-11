# Environment Variables Setup

This document describes the environment variables needed for the Canaan International Hotel website.

## Quick Start

1. Create a `.env.local` file in the project root directory
2. Copy the template below and fill in your values
3. The `.env.local` file is gitignored and will not be committed

## Environment Variables Template

```bash
# Application Environment
NODE_ENV=development

# Development Server Configuration (optional)
# Comma-separated list of IP addresses or origins allowed for cross-origin requests during development
# Only needed if accessing the dev server from other devices on your network
# Example: NEXT_ALLOWED_DEV_ORIGINS=192.168.1.100,192.168.1.101
# NEXT_ALLOWED_DEV_ORIGINS=192.168.56.1

# Email/SMTP Configuration (for booking inquiry notifications)
# These will be needed when email functionality is implemented
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=your-email@example.com
# SMTP_PASSWORD=your-password
# SMTP_FROM_EMAIL=noreply@canaanhotel.com
# HOTEL_NOTIFICATION_EMAIL=bookings@canaanhotel.com

# Admin Dashboard Authentication (REQUIRED)
# These are required for admin login functionality
# Change these default values in production!
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
SESSION_SECRET=change-me-in-production-generate-a-secure-random-key

# Google Maps API (for location/map integration)
# GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# External Widget Integrations (if needed)
# BOOKING_COM_WIDGET_ID=your-booking-com-widget-id
# TRIPADVISOR_WIDGET_ID=your-tripadvisor-widget-id

# Feature Flags (V3-V6 - Production-Safe Toggles)
# These control optional advanced features. All default to 'false' for safety.
# Set to 'true' only when features are fully tested and ready for production.
# PAYMENTS_ENABLED=false
# EMAIL_NOTIFICATIONS_ENABLED=false
# OTA_INTEGRATIONS_ENABLED=false
# DB_PERSISTENCE_ENABLED=false
```

## Required Environment Variables

**Admin Authentication** (REQUIRED):
- `ADMIN_USERNAME`: Username for admin login (default: "admin")
- `ADMIN_PASSWORD`: Password for admin login (default: "admin")
- `SESSION_SECRET`: Secret key for session management (default: "change-me-in-production")
  - **Important**: Change the default SESSION_SECRET in production!
  - Generate a secure random key: `openssl rand -base64 32`

## Optional Environment Variables

All other variables listed above are optional or for future features:

- **NEXT_ALLOWED_DEV_ORIGINS**: Optional - Only needed if accessing the dev server from other devices on your network and you see cross-origin warnings
- **Email/SMTP**: Will be needed when booking inquiry email notifications are implemented
- **Google Maps**: Will be needed when map integration is added
- **Widget IDs**: Will be needed when external review widgets are integrated

## Security Notes

⚠️ **Production Deployment**:
- Always change `ADMIN_USERNAME` and `ADMIN_PASSWORD` from defaults
- Generate a strong `SESSION_SECRET` using a secure random generator
- Never commit `.env.local` to version control (already gitignored)
- Use strong passwords for production environments

🔒 **Feature Flags Security**:
- Feature flags default to 'false' for safety - no accidental activations
- Test features thoroughly in staging before enabling in production
- Monitor logs when enabling new features for unexpected behavior
- Use environment-specific flag values (dev: false, staging: selective, prod: tested-only)

## Development Server

The development server runs on **port 3002** (configured in `package.json`).

To start the server:
```bash
npm run dev
```

Then open: http://localhost:3002

The server may take a few moments to compile on first run. You should see "Ready" in the terminal when compilation is complete.

