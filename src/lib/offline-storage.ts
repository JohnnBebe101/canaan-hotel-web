/**
 * Offline Storage - Complete fallback system when Supabase is unavailable
 * All data stored in-memory for demo/testing purposes
 */

// In-memory storage
const storage = {
  bookings: new Map<string, any>(),
  rooms: new Map<string, any>(),
  attractions: new Map<string, any>(),
  blogs: new Map<string, any>(),
  payments: new Map<string, any>(),
};

// Initialize with seed data
function initializeStorage() {
  // Seed Rooms
  storage.rooms.set('standard-room', {
    id: 'standard-room',
    name: 'Standard Room',
    description: 'Comfortable room with essential amenities for a pleasant stay.',
    price_per_night: 45,
    max_guests: 2,
    is_active: true,
    image_src: '/images/rooms/single-room-with-light.webp',
    image_alt: 'Standard Room',
    price_label: 'From $45 / night',
    badges: ['Free WiFi', 'Air Conditioning'],
    rating: 4.5,
    created_at: new Date().toISOString(),
  });

  storage.rooms.set('deluxe-room', {
    id: 'deluxe-room',
    name: 'Deluxe Room',
    description: 'Spacious room with premium furnishings and enhanced amenities.',
    price_per_night: 75,
    max_guests: 2,
    is_active: true,
    image_src: '/images/rooms/twin-room.webp',
    image_alt: 'Deluxe Room',
    price_label: 'From $75 / night',
    badges: ['Free WiFi', 'Room Service', 'Breakfast Included'],
    rating: 4.8,
    created_at: new Date().toISOString(),
  });

  storage.rooms.set('family-room', {
    id: 'family-room',
    name: 'Family Room',
    description: 'Spacious accommodation perfect for families.',
    price_per_night: 95,
    max_guests: 4,
    is_active: true,
    image_src: '/images/rooms/corridor-rooms.webp',
    image_alt: 'Family Room',
    price_label: 'From $95 / night',
    badges: ['Free WiFi', 'Breakfast Included', 'Extra Beds'],
    rating: 4.7,
    created_at: new Date().toISOString(),
  });

  storage.rooms.set('suite', {
    id: 'suite',
    name: 'Luxury Suite',
    description: 'Expansive suite with separate living area.',
    price_per_night: 120,
    max_guests: 2,
    is_active: true,
    image_src: '/images/rooms/single-room-best-view.webp',
    image_alt: 'Luxury Suite',
    price_label: 'From $120 / night',
    badges: ['Free WiFi', 'Room Service', 'Breakfast Included', 'Minibar'],
    rating: 5.0,
    created_at: new Date().toISOString(),
  });

  // Seed Attractions
  storage.attractions.set('debre-damo', {
    id: 'debre-damo',
    name: 'Debre Damo Monastery',
    description: 'An ancient monastery perched atop a flat-topped mountain.',
    category: 'Religious Site',
    distance: '45 km',
    image: '/images/attractions/Debre-Damo-Abune-Aregawi-monaster--1920x1080.svg',
    is_active: true,
    created_at: new Date().toISOString(),
  });

  storage.attractions.set('gheralta', {
    id: 'gheralta',
    name: 'Gheralta Mountains',
    description: 'Dramatic sandstone cliffs with ancient rock-hewn churches.',
    category: 'Natural Wonder',
    distance: '65 km',
    image: '/images/attractions/Gheralta.svg',
    is_active: true,
    created_at: new Date().toISOString(),
  });

  storage.attractions.set('al-nejashi', {
    id: 'al-nejashi',
    name: 'Al-Nejashi Mosque',
    description: 'One of the earliest mosques in Africa.',
    category: 'Religious Site',
    distance: '30 km',
    image: '/images/attractions/Al Najashi5.svg',
    is_active: true,
    created_at: new Date().toISOString(),
  });

  // Seed Blogs
  storage.blogs.set('gheralta-mountains-tigray', {
    id: 'blog-1',
    title: 'Discover Gheralta: A Hikers Paradise in Tigray',
    slug: 'gheralta-mountains-tigray',
    excerpt: 'Explore the dramatic sandstone cliffs and ancient rock-hewn churches.',
    content: '<p>The Gheralta Mountains are a hidden gem...</p>',
    featured_image: '/images/attractions/Gheralta.svg',
    author: 'Canaan Hotel Team',
    published_at: new Date().toISOString(),
    is_published: true,
    created_at: new Date().toISOString(),
  });

  storage.blogs.set('al-nejashi-mosque-history', {
    id: 'blog-2',
    title: 'Al-Nejashi Mosque: One of Africas Oldest Mosques',
    slug: 'al-nejashi-mosque-history',
    excerpt: 'Learn about this remarkable 7th-century architectural marvel.',
    content: '<p>The Al-Nejashi Mosque is one of the oldest in Africa...</p>',
    featured_image: '/images/attractions/Al Najashi5.svg',
    author: 'Canaan Hotel Team',
    published_at: new Date().toISOString(),
    is_published: true,
    created_at: new Date().toISOString(),
  });
}

// Initialize on module load
initializeStorage();

// Export storage API
export const offlineStorage = {
  // Bookings
  getBookings: () => Array.from(storage.bookings.values()),
  getBooking: (id: string) => storage.bookings.get(id),
  createBooking: (booking: any) => {
    const id = `booking-${Date.now()}`;
    const newBooking = { ...booking, id, status: 'pending', created_at: new Date().toISOString() };
    storage.bookings.set(id, newBooking);
    return newBooking;
  },
  updateBooking: (id: string, updates: any) => {
    const existing = storage.bookings.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...updates };
    storage.bookings.set(id, updated);
    return updated;
  },
  deleteBooking: (id: string) => storage.bookings.delete(id),

  // Rooms
  getRooms: () => Array.from(storage.rooms.values()),
  getRoom: (id: string) => storage.rooms.get(id),
  createRoom: (room: any) => {
    const id = room.name.toLowerCase().replace(/\s+/g, '-');
    storage.rooms.set(id, { ...room, id, created_at: new Date().toISOString() });
    return storage.rooms.get(id);
  },
  updateRoom: (id: string, updates: any) => {
    const existing = storage.rooms.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...updates };
    storage.rooms.set(id, updated);
    return updated;
  },
  deleteRoom: (id: string) => storage.rooms.delete(id),

  // Attractions
  getAttractions: () => Array.from(storage.attractions.values()),
  getAttraction: (id: string) => storage.attractions.get(id),
  createAttraction: (attraction: any) => {
    const id = attraction.name.toLowerCase().replace(/\s+/g, '-');
    storage.attractions.set(id, { ...attraction, id, created_at: new Date().toISOString() });
    return storage.attractions.get(id);
  },
  updateAttraction: (id: string, updates: any) => {
    const existing = storage.attractions.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...updates };
    storage.attractions.set(id, updated);
    return updated;
  },
  deleteAttraction: (id: string) => storage.attractions.delete(id),

  // Blogs
  getBlogs: () => Array.from(storage.blogs.values()),
  getPublishedBlogs: () => Array.from(storage.blogs.values()).filter(b => b.is_published),
  getLatestBlogs: (limit: number = 2) => Array.from(storage.blogs.values())
    .filter(b => b.is_published)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, limit),
  getBlogBySlug: (slug: string) => storage.blogs.get(slug),
  getBlogById: (id: string) => storage.blogs.get(id),
  createBlog: (blog: any) => {
    const id = `blog-${Date.now()}`;
    storage.blogs.set(id, { ...blog, id, created_at: new Date().toISOString() });
    return storage.blogs.get(id);
  },
  updateBlog: (id: string, updates: any) => {
    const existing = storage.blogs.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...updates, updated_at: new Date().toISOString() };
    storage.blogs.set(id, updated);
    return updated;
  },
  deleteBlog: (id: string) => storage.blogs.delete(id),

  // Payments
  getPayments: () => Array.from(storage.payments.values()),
  createPayment: (payment: any) => {
    const id = `payment-${Date.now()}`;
    storage.payments.set(id, { ...payment, id, created_at: new Date().toISOString() });
    return storage.payments.get(id);
  },

  // Stats
  getStats: () => ({
    totalBookings: storage.bookings.size,
    totalRooms: storage.rooms.size,
    totalAttractions: storage.attractions.size,
    totalBlogs: storage.blogs.size,
    pendingBookings: Array.from(storage.bookings.values()).filter(b => b.status === 'pending').length,
    confirmedBookings: Array.from(storage.bookings.values()).filter(b => b.status === 'confirmed').length,
  }),
};
