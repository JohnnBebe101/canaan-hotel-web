# Canaan International Hotel - Data Architecture Overview

To optimize performance, reduce infrastructure complexity, and lower costs, we have implemented a **Hybrid Data Strategy**. This strategy separates transactional data from static content.

## 1. Data Categorization

### Transactional & Dynamic Data (Supabase)
Used for data that changes frequently, requires real-time updates, or involves user-generated transactions.
- **Bookings**: Handled via Supabase for multi-user consistency and persistence.
- **Rooms**: Stored in Supabase to allow for availability updates and dynamic pricing adjustments.
- **Authentication**: Using Supabase Auth for security and session management.

### Static & Content-Driven Data (Local Storage)
Used for data that is infrequently updated and primarily serves as informational content.
- **Attractions**: Local storage to ensure 100% availability even in offline scenarios and to minimize API latency.
- **Blogs**: Managed locally as a lightweight "CMS" solution.
- **Hero Assets**: Defined in code to ensure immediate "above-the-fold" rendering.

## 2. Key Architecture Distinctions

| Feature | Primary Storage | Motivation |
| :--- | :--- | :--- |
| **Bookings & Payments** | **Supabase** | Multi-user consistency, ACID compliance, and secure transactional tracking. |
| **Room Availability** | **Supabase** | Needs to be synchronized across all booking sessions in real-time. |
| **Attractions** | **Local Store** | Static nature. Reduces network overhead and guarantees performance in the Tigray region. |
| **Blog Content** | **Local Store** | Simplifies Content Management. Updated via code commits rather than DB migrations. |
| **Offline Resilience** | **Unified API** | Every store includes an `offlineStorage` fallback to ensure the site remains functional without Internet. |

## 3. Implementation Patterns
- **Supabase-First Stores**: `booking-store.ts`, `room-store.ts`. These attempt to reach Supabase and fall back to `offline-storage.ts`.
- **Local-Only Stores**: `attraction-store.ts`, `blog-store.ts`. These now bypass Supabase entirely (as of Phase III) to streamline the architecture.
- **Shared Models**: `models.ts` ensures type safety across both local and remote data sources.
