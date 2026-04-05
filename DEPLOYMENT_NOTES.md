# Canaan Hotel Booking Site - Deployment Notes

## Overview
This project is a modern Next.js 16 application for the **Canaan International Hotel**, featuring a guest booking system and a CRM administrative dashboard.

## Quick Start
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
3.  **Production Build**:
    ```bash
    npm run build
    ```

## Project details

### 🛡️ Administrative Access
The CRM dashboard is accessible at `/admin`.
- **Credentials**: Managed via `.env` file (ensure `AUTH_SECRET` is set in production).
- **Functionality**: Admins can view guest inquiries, update booking statuses, and manage room allocations.

### 🗄️ Persistence Layer
- **Storage**: Data is stored locally in `data/db.json` using `lowdb`.
- **Branch**: This implementation is currently located in the `feature/lowdb-database-integration` environment for the final handoff.

### 💳 Payment Integration
- **Status**: Schema-ready for Stripe/Commercial processing.
- **Next Steps**: Connect your Stripe secret keys in the environment configuration to enable live automated payment link generation.

## Environment Configuration
Ensure your `.env` file contains the following flags for full functionality:
```text
DB_PERSISTENCE_ENABLED=true
DB_SHADOW_READ_ENABLED=true
DB_READ_PRIMARY_ENABLED=true
```
