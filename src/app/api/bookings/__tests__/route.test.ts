import { describe, it, expect, vi } from 'vitest';
import { POST } from '../route';
import { NextRequest } from 'next/server';

// Mock the booking-store module
vi.mock('@/lib/booking-store', () => ({
  createBooking: vi.fn(),
}));

import { createBooking } from '@/lib/booking-store';

describe('POST /api/bookings', () => {
  it('should return 201 when a valid booking request is submitted', async () => {
    const mockBookingData = {
      guest_name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      room_type: 'Economy Single Room',
      dates: {
        check_in: '2024-08-01',
        check_out: '2024-08-05',
      },
      message: 'Test message',
    };

    const createdBooking = {
      id: 'mock-booking-id',
      status: 'pending',
      guestName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      roomType: 'Economy Single Room',
      checkIn: '2024-08-01',
      checkOut: '2024-08-05',
      notes: 'Test message',
    };

    // @ts-ignore
    createBooking.mockResolvedValue(createdBooking);

    const request = new NextRequest('http://localhost/api/bookings', {
      method: 'POST',
      body: JSON.stringify(mockBookingData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(201);
    expect(responseBody.message).toBe('Booking inquiry received successfully');
    expect(responseBody.booking_id).toBe('mock-booking-id');
    expect(responseBody.status).toBe('pending');

    expect(createBooking).toHaveBeenCalledWith({
      guestName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      roomType: 'Economy Single Room',
      checkIn: '2024-08-01',
      checkOut: '2024-08-05',
      numberOfGuests: 1,
      totalPrice: 200,
      notes: 'Test message',
      status: 'pending',
    });
  });

  it('should return 400 for missing required fields', async () => {
    const mockBookingData = {
      guest_name: 'John Doe',
      // email is missing
      phone: '1234567890',
      room_type: 'Economy Single Room',
      dates: {
        check_in: '2024-08-01',
        check_out: '2024-08-05',
      },
    };

    const request = new NextRequest('http://localhost/api/bookings', {
      method: 'POST',
      body: JSON.stringify(mockBookingData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody.error).toContain('email');
  });

  it('should return 500 if createBooking throws an error', async () => {
    const mockBookingData = {
        guest_name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        room_type: 'Economy Single Room',
        dates: {
          check_in: '2024-08-01',
          check_out: '2024-08-05',
        },
        message: 'Test message',
    };
    
    // @ts-ignore
    createBooking.mockRejectedValue(new Error('Database error'));

    const request = new NextRequest('http://localhost/api/bookings', {
        method: 'POST',
        body: JSON.stringify(mockBookingData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const response = await POST(request);
      const responseBody = await response.json();
  
      expect(response.status).toBe(500);
      expect(responseBody.error).toBe('Internal server error');
  });

});
