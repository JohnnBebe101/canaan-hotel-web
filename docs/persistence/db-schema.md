# V6 Persistence Layer Database Schema

## Overview

This document defines the **database schema design** for V6 persistence layer implementation. **No database implementation exists in the current version** - this is purely architectural planning for future migration from in-memory storage.

## Migration Strategy

### Phase 1: In-Memory (Current V5)
- Array-based storage in memory
- No persistence across restarts
- Used for development and testing

### Phase 2: SQLite (V6.1)
- File-based SQLite database
- Local development and testing
- Easy deployment, zero configuration

### Phase 3: PostgreSQL (V6.2+)
- Production-ready relational database
- Scalability and concurrency
- Advanced features (JSONB, indexing)

## Core Tables

### 1. bookings

Primary booking management table.

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255) NOT NULL,
  guest_phone VARCHAR(50),
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  room_id VARCHAR(100) NOT NULL,
  room_name VARCHAR(255) NOT NULL,
  total_guests INTEGER NOT NULL,
  special_requests TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'NEW',
  invoice_ref VARCHAR(100) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(100), -- Future: admin user ID
  updated_by VARCHAR(100)  -- Future: admin user ID
);

-- Indexes
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX idx_bookings_email ON bookings(guest_email);
CREATE INDEX idx_bookings_invoice ON bookings(invoice_ref);
```

**Key Fields:**
- `id`: UUID primary key
- `status`: NEW, REVIEWED, CONFIRMED, INVOICED, CANCELLED, CLOSED
- `invoice_ref`: Auto-generated reference number
- `created_at/updated_at`: Audit timestamps

### 2. payments

Payment tracking and status management.

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  provider VARCHAR(50) NOT NULL DEFAULT 'STRIPE',
  status VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
  amount_cents INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'USD',
  payment_link TEXT,
  external_payment_id VARCHAR(255), -- Stripe payment_intent.id
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_external_id ON payments(external_payment_id);
CREATE UNIQUE INDEX idx_payments_booking_active ON payments(booking_id) WHERE status NOT IN ('CANCELLED', 'CLOSED');
```

**Key Fields:**
- `booking_id`: Foreign key to bookings
- `status`: DRAFT, LINK_CREATED, AWAITING_CONFIRMATION, PAID, FAILED, CANCELLED, CLOSED
- `external_payment_id`: Stripe payment intent ID (no card data)
- `amount_cents`: Precise monetary values

### 3. payment_events

Audit trail for payment status changes and webhook events.

```sql
CREATE TABLE payment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  event_type VARCHAR(100) NOT NULL,
  event_id VARCHAR(255), -- External event ID (Stripe webhook ID)
  old_status VARCHAR(50),
  new_status VARCHAR(50) NOT NULL,
  amount_cents INTEGER,
  metadata JSONB, -- Additional event data
  source VARCHAR(50) DEFAULT 'manual', -- 'manual', 'webhook', 'api'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(100) -- Future: admin user ID
);

-- Indexes
CREATE INDEX idx_payment_events_payment_id ON payment_events(payment_id);
CREATE INDEX idx_payment_events_event_id ON payment_events(event_id);
CREATE INDEX idx_payment_events_type ON payment_events(event_type);
CREATE INDEX idx_payment_events_created_at ON payment_events(created_at DESC);
```

**Key Fields:**
- `payment_id`: Foreign key to payments
- `event_type`: Status change type or webhook event
- `event_id`: External system event identifier
- `metadata`: Flexible JSON storage for event details

### 4. admin_actions

Comprehensive audit log for all admin operations.

```sql
CREATE TABLE admin_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id VARCHAR(100), -- Future: admin user ID
  admin_email VARCHAR(255), -- For audit purposes
  action_type VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50) NOT NULL, -- 'booking', 'payment', 'room'
  resource_id VARCHAR(255) NOT NULL,
  old_values JSONB,
  new_values JSONB,
  notes TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_admin_actions_admin ON admin_actions(admin_id);
CREATE INDEX idx_admin_actions_resource ON admin_actions(resource_type, resource_id);
CREATE INDEX idx_admin_actions_type ON admin_actions(action_type);
CREATE INDEX idx_admin_actions_created_at ON admin_actions(created_at DESC);
```

**Key Fields:**
- `resource_type/id`: What was modified
- `old_values/new_values`: Before/after state
- `notes`: Admin justification/comments

## Relationships

### Entity Relationship Diagram

```
bookings (1) ──── (N) payments
                    │
                    └── (N) payment_events
```

### Foreign Key Constraints

- `payments.booking_id` → `bookings.id` (CASCADE DELETE)
- `payment_events.payment_id` → `payments.id` (CASCADE DELETE)
- All relationships enforce referential integrity

### Business Rules

- **One Active Payment per Booking**: Unique constraint prevents multiple active payments
- **Cascading Deletes**: Removing booking deletes associated payments and events
- **Audit Trail**: Every status change creates event record
- **Admin Accountability**: All changes logged with admin context

## Data Types and Constraints

### Enums (Check Constraints)

```sql
-- Booking Status
CHECK (status IN ('NEW', 'REVIEWED', 'CONFIRMED', 'INVOICED', 'CANCELLED', 'CLOSED'))

-- Payment Status
CHECK (status IN ('DRAFT', 'LINK_CREATED', 'AWAITING_CONFIRMATION', 'PAID', 'FAILED', 'CANCELLED', 'CLOSED'))

-- Payment Provider
CHECK (provider IN ('STRIPE', 'PAYPAL', 'MANUAL'))
```

### Validation Rules

- **Date Logic**: `check_out_date > check_in_date`
- **Positive Amounts**: `amount_cents > 0`
- **Valid Currencies**: ISO 4217 currency codes
- **Email Format**: RFC-compliant email validation
- **Phone Format**: Optional but validated if provided

## Migration Plan

### V6.1: SQLite Migration

1. **Schema Creation**: Run table creation scripts
2. **Data Migration**: Export in-memory data to SQLite
3. **Application Update**: Replace array stores with database queries
4. **Testing**: Full functionality verification

### V6.2: PostgreSQL Migration

1. **Schema Enhancement**: Add PostgreSQL-specific features
2. **Data Transfer**: Migrate from SQLite to PostgreSQL
3. **Performance Optimization**: Add indexes, constraints
4. **Production Deployment**: Environment configuration

## Safety and Security

### Data Protection

- **No Card Data**: Never store credit card information
- **External IDs Only**: Reference Stripe payment_intent IDs
- **PII Minimization**: Store only necessary guest information
- **Encryption**: Database-level encryption for sensitive fields

### Audit and Compliance

- **Complete Audit Trail**: Every action logged with context
- **Temporal Data**: Point-in-time recovery capability
- **Admin Accountability**: All changes attributed to users
- **Data Retention**: Configurable retention policies

### Performance Considerations

- **Indexing Strategy**: Optimized for common query patterns
- **Connection Pooling**: Efficient database connection management
- **Read Replicas**: Future scalability preparation
- **Query Optimization**: Prepared statements and efficient queries

## Implementation Phases

### Phase 1: Repository Pattern
```typescript
interface BookingRepository {
  findById(id: string): Promise<Booking | null>
  findByStatus(status: BookingStatus): Promise<Booking[]>
  create(booking: CreateBookingData): Promise<Booking>
  update(id: string, updates: Partial<Booking>): Promise<Booking>
}
```

### Phase 2: Transaction Support
- Database transactions for multi-table operations
- Rollback on failure scenarios
- Atomic payment status updates

### Phase 3: Advanced Features
- Full-text search capabilities
- Analytics and reporting queries
- Automated cleanup and archiving

---

**V6 introduces persistence, not automation.**