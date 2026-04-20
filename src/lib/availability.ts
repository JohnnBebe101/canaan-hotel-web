import { supabase } from './supabase';

export interface DateRange {
  checkIn: string;
  checkOut: string;
}

export async function checkRoomAvailability(
  roomType: string,
  dateRange: DateRange
): Promise<boolean> {
  const { checkIn, checkOut } = dateRange;

  const { data: conflictingBookings, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('room_type', roomType)
    .not('status', 'in', '("cancelled","conflict_flagged","booking_created")')
    .not('payment_status', 'in', '("failed","refunded")')
    .or(`check_in_date.lt.${checkOut},check_out_date.gt.${checkIn})`)
    .not('check_in_date', 'is', null)
    .not('check_out_date', 'is', null);

  if (error) {
    console.error('[Availability] Error checking availability:', error);
    return false;
  }

  return !conflictingBookings || conflictingBookings.length === 0;
}

export async function getAvailableRoomsForDates(
  dateRange: DateRange
): Promise<string[]> {
  const allRoomTypes = [
    'economy-single',
    'economy-double',
    'family-room',
    'comfort-double',
  ];

  const available: string[] = [];

  for (const roomType of allRoomTypes) {
    const isAvailable = await checkRoomAvailability(roomType, dateRange);
    if (isAvailable) {
      available.push(roomType);
    }
  }

  return available;
}