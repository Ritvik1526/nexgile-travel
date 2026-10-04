const { v4: uuidv4 } = require('uuid');

// ─── PROPERTIES ─────────────────────────────────────────────────────────────
const properties = [
  {
    id: 'prop-001', brand: 'Nexgile Luxe', chain: 'Nexgile Hotels',
    name: 'Nexgile Grand Mumbai', slug: 'grand-mumbai',
    type: 'luxury', stars: 5, currency: 'INR', timezone: 'Asia/Kolkata',
    address: { street: '14 Marine Drive', city: 'Mumbai', state: 'Maharashtra', country: 'India', zip: '400020' },
    contact: { phone: '+91-22-6789-0000', email: 'grand.mumbai@nexgile.com' },
    totalRooms: 248, floors: 32,
    amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Conference', 'Valet', 'Concierge'],
    status: 'active', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    metrics: { occupancy: 87, adr: 12500, revpar: 10875, satisfaction: 4.7 }
  },
  {
    id: 'prop-002', brand: 'Nexgile Select', chain: 'Nexgile Hotels',
    name: 'Nexgile Select Bangalore', slug: 'select-bangalore',
    type: 'business', stars: 4, currency: 'INR', timezone: 'Asia/Kolkata',
    address: { street: '88 MG Road', city: 'Bangalore', state: 'Karnataka', country: 'India', zip: '560001' },
    contact: { phone: '+91-80-4567-8900', email: 'select.blr@nexgile.com' },
    totalRooms: 156, floors: 18,
    amenities: ['Gym', 'Restaurant', 'Business Centre', 'Meeting Rooms', 'Parking'],
    status: 'active', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    metrics: { occupancy: 79, adr: 6800, revpar: 5372, satisfaction: 4.5 }
  },
  {
    id: 'prop-003', brand: 'Nexgile Escape', chain: 'Nexgile Hotels',
    name: 'Nexgile Escape Goa', slug: 'escape-goa',
    type: 'resort', stars: 5, currency: 'INR', timezone: 'Asia/Kolkata',
    address: { street: 'Calangute Beach Road', city: 'Panaji', state: 'Goa', country: 'India', zip: '403515' },
    contact: { phone: '+91-832-2345-6789', email: 'escape.goa@nexgile.com' },
    totalRooms: 198, floors: 8,
    amenities: ['Private Beach', 'Pool', 'Spa', 'Water Sports', 'Restaurant', 'Bar', 'Kids Club'],
    status: 'active', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    metrics: { occupancy: 94, adr: 18500, revpar: 17390, satisfaction: 4.9 }
  }
];

// ─── ROOM TYPES ──────────────────────────────────────────────────────────────
const roomTypes = [
  { id: 'rt-001', propertyId: 'prop-001', name: 'Deluxe Sea View', code: 'DSV', beds: 1, bedType: 'King', maxOccupancy: 2, sqft: 420, baseRate: 10500, amenities: ['Ocean View', 'Minibar', 'Rain Shower', 'Smart TV'], available: 18, total: 48 },
  { id: 'rt-002', propertyId: 'prop-001', name: 'Premier Suite', code: 'PS', beds: 2, bedType: 'King', maxOccupancy: 4, sqft: 780, baseRate: 24000, amenities: ['Living Room', 'Butler', 'Jacuzzi', 'Terrace'], available: 4, total: 12 },
  { id: 'rt-003', propertyId: 'prop-001', name: 'Standard Room', code: 'STD', beds: 1, bedType: 'Queen', maxOccupancy: 2, sqft: 320, baseRate: 7800, amenities: ['City View', 'Work Desk', 'Smart TV'], available: 22, total: 60 },
  { id: 'rt-004', propertyId: 'prop-002', name: 'Business Room', code: 'BIZ', beds: 1, bedType: 'King', maxOccupancy: 2, sqft: 380, baseRate: 5500, amenities: ['Work Desk', 'Fast WiFi', 'Coffee Machine'], available: 14, total: 80 },
  { id: 'rt-005', propertyId: 'prop-003', name: 'Beach Villa', code: 'BV', beds: 2, bedType: 'King', maxOccupancy: 4, sqft: 1200, baseRate: 32000, amenities: ['Private Pool', 'Beach Access', 'Butler', 'Outdoor Shower'], available: 3, total: 24 }
];

// ─── GUESTS ──────────────────────────────────────────────────────────────────
const guests = [
  { id: 'g-001', firstName: 'Arjun', lastName: 'Mehta', email: 'arjun.mehta@email.com', phone: '+91-9876543210', nationality: 'Indian', passportNo: 'M1234567', loyaltyTier: 'Platinum', loyaltyPoints: 48500, totalStays: 34, totalSpend: 1245000, preferences: { roomType: 'Suite', floor: 'High', pillow: 'Soft', dietary: 'Vegetarian', newspaper: 'Business Standard' }, corporateId: 'corp-001', tags: ['VIP', 'Corporate', 'Repeat'] },
  { id: 'g-002', firstName: 'Priya', lastName: 'Sharma', email: 'priya.sharma@email.com', phone: '+91-9845001234', nationality: 'Indian', loyaltyTier: 'Gold', loyaltyPoints: 22300, totalStays: 18, totalSpend: 487000, preferences: { roomType: 'Sea View', dietary: 'Jain', amenity: 'Spa' }, tags: ['Leisure', 'Repeat'] },
  { id: 'g-003', firstName: 'Marcus', lastName: 'Thompson', email: 'marcus.t@globalcorp.com', phone: '+1-415-555-0199', nationality: 'American', loyaltyTier: 'Silver', loyaltyPoints: 8900, totalStays: 6, totalSpend: 180000, preferences: { roomType: 'Business', dietary: 'No Restrictions' }, corporateId: 'corp-002', tags: ['Corporate', 'International'] },
  { id: 'g-004', firstName: 'Ananya', lastName: 'Krishnan', email: 'ananya.k@startup.io', phone: '+91-9988776655', nationality: 'Indian', loyaltyTier: 'Member', loyaltyPoints: 1200, totalStays: 2, totalSpend: 32000, preferences: { dietary: 'Vegan' }, tags: ['New'] }
];

// ─── RESERVATIONS ────────────────────────────────────────────────────────────
const reservations = [
  { id: 'RES-2024-0891', propertyId: 'prop-001', roomTypeId: 'rt-001', roomNo: '1204', guestId: 'g-001', status: 'checked-in', checkIn: '2024-12-09', checkOut: '2024-12-12', nights: 3, adults: 2, children: 0, rateCode: 'CORP-RATE', totalAmount: 38250, paid: 38250, balance: 0, source: 'Direct', createdAt: '2024-11-15', specialRequests: 'High floor, extra pillows', confirmationNo: 'NXG891234' },
  { id: 'RES-2024-0892', propertyId: 'prop-001', roomTypeId: 'rt-002', roomNo: '2801', guestId: 'g-002', status: 'confirmed', checkIn: '2024-12-14', checkOut: '2024-12-17', nights: 3, adults: 2, children: 1, rateCode: 'LEISURE', totalAmount: 78000, paid: 20000, balance: 58000, source: 'Booking.com', createdAt: '2024-11-20', specialRequests: 'Anniversary setup', confirmationNo: 'NXG891235' },
  { id: 'RES-2024-0893', propertyId: 'prop-002', roomTypeId: 'rt-004', roomNo: '0812', guestId: 'g-003', status: 'confirmed', checkIn: '2024-12-10', checkOut: '2024-12-11', nights: 1, adults: 1, children: 0, rateCode: 'CORP-GLOBAL', totalAmount: 5500, paid: 5500, balance: 0, source: 'GDS-Amadeus', createdAt: '2024-12-01', confirmationNo: 'NXG891236' },
  { id: 'RES-2024-0894', propertyId: 'prop-003', roomTypeId: 'rt-005', roomNo: 'BV-07', guestId: 'g-004', status: 'pending', checkIn: '2024-12-20', checkOut: '2024-12-25', nights: 5, adults: 2, children: 2, rateCode: 'HOLIDAY-SPECIAL', totalAmount: 168000, paid: 50000, balance: 118000, source: 'Direct', createdAt: '2024-12-05', specialRequests: 'Christmas decorations, kids activities', confirmationNo: 'NXG891237' }
];

// ─── REVENUE DATA ─────────────────────────────────────────────────────────────
const revenueMetrics = {
  current: { occupancy: 87.3, adr: 12485, revpar: 10899, totalRevenue: 4280000, roomRevenue: 3650000, ancillaryRevenue: 630000, bookings: 248 },
  forecast: [
    { date: '2024-12-10', occupancy: 88, adr: 12800, revpar: 11264, demand: 'high' },
    { date: '2024-12-11', occupancy: 91, adr: 13200, revpar: 12012, demand: 'high' },
    { date: '2024-12-12', occupancy: 85, adr: 12100, revpar: 10285, demand: 'medium' },
    { date: '2024-12-13', occupancy: 79, adr: 11500, revpar: 9085, demand: 'medium' },
    { date: '2024-12-14', occupancy: 95, adr: 15000, revpar: 14250, demand: 'peak' },
    { date: '2024-12-15', occupancy: 98, adr: 16500, revpar: 16170, demand: 'peak' },
    { date: '2024-12-16', occupancy: 96, adr: 16000, revpar: 15360, demand: 'peak' }
  ],
  monthly: [
    { month: 'Jul', occupancy: 72, adr: 9800, revpar: 7056, revenue: 2100000 },
    { month: 'Aug', occupancy: 68, adr: 9200, revpar: 6256, revenue: 1980000 },
    { month: 'Sep', occupancy: 75, adr: 10100, revpar: 7575, revenue: 2300000 },
    { month: 'Oct', occupancy: 83, adr: 11500, revpar: 9545, revenue: 3100000 },
    { month: 'Nov', occupancy: 85, adr: 12000, revpar: 10200, revenue: 3800000 },
    { month: 'Dec', occupancy: 92, adr: 13800, revpar: 12696, revenue: 4600000 }
  ]
};

// ─── HOUSEKEEPING ─────────────────────────────────────────────────────────────
const housekeepingTasks = [
  { id: 'hk-001', propertyId: 'prop-001', roomNo: '1204', type: 'checkout-clean', status: 'in-progress', priority: 'high', assignedTo: 'Kavitha R.', startTime: '10:00', estimatedEnd: '11:30', guestCheckOut: '11:00', notes: 'VIP guest — deep clean required' },
  { id: 'hk-002', propertyId: 'prop-001', roomNo: '0508', type: 'stayover', status: 'pending', priority: 'medium', assignedTo: 'Rajan M.', startTime: '13:00', estimatedEnd: '13:45' },
  { id: 'hk-003', propertyId: 'prop-001', roomNo: '2103', type: 'turndown', status: 'pending', priority: 'low', assignedTo: 'Preethi S.', startTime: '18:00', estimatedEnd: '18:20' },
  { id: 'hk-004', propertyId: 'prop-001', roomNo: '1506', type: 'checkout-clean', status: 'completed', priority: 'high', assignedTo: 'Kavitha R.', completedAt: '09:45' }
];

// ─── MAINTENANCE ──────────────────────────────────────────────────────────────
const maintenanceCases = [
  { id: 'mnt-001', propertyId: 'prop-001', location: 'Room 1802', type: 'plumbing', title: 'Slow drain in bathroom', status: 'open', priority: 'medium', reportedBy: 'FrontDesk', assignedTo: 'Suresh K.', createdAt: '2024-12-09T08:30:00Z' },
  { id: 'mnt-002', propertyId: 'prop-001', location: 'Restaurant Kitchen', type: 'electrical', title: 'Faulty light fixture', status: 'in-progress', priority: 'high', reportedBy: 'F&B Manager', assignedTo: 'Vijay P.', createdAt: '2024-12-08T14:00:00Z' },
  { id: 'mnt-003', propertyId: 'prop-001', location: 'Pool Area', type: 'mechanical', title: 'Pool pump noise', status: 'scheduled', priority: 'medium', reportedBy: 'Housekeeping', assignedTo: 'Ravi T.', scheduledFor: '2024-12-11T09:00:00Z', createdAt: '2024-12-07T11:00:00Z' }
];

// ─── CHANNELS ─────────────────────────────────────────────────────────────────
const channels = [
  { id: 'ch-001', name: 'Booking.com', type: 'OTA', status: 'active', commission: 15, contribution: 34, rooms: 45, lastSync: '2024-12-09T09:45:00Z', errors: 0 },
  { id: 'ch-002', name: 'Expedia', type: 'OTA', status: 'active', commission: 18, contribution: 22, rooms: 30, lastSync: '2024-12-09T09:44:00Z', errors: 2 },
  { id: 'ch-003', name: 'MakeMyTrip', type: 'OTA', status: 'active', commission: 12, contribution: 18, rooms: 25, lastSync: '2024-12-09T09:43:00Z', errors: 0 },
  { id: 'ch-004', name: 'Amadeus GDS', type: 'GDS', status: 'active', commission: 10, contribution: 12, rooms: 20, lastSync: '2024-12-09T09:40:00Z', errors: 0 },
  { id: 'ch-005', name: 'Direct/Website', type: 'Direct', status: 'active', commission: 0, contribution: 14, rooms: 40, lastSync: '2024-12-09T09:46:00Z', errors: 0 }
];

// ─── USERS ────────────────────────────────────────────────────────────────────
const users = [
  { id: 'u-001', name: 'Super Admin', email: 'admin@nexgile.com', role: 'SuperAdmin', propertyId: null, status: 'active', avatar: 'SA' },
  { id: 'u-002', name: 'Rohit Verma', email: 'rohit.v@nexgile.com', role: 'PropertyAdmin', propertyId: 'prop-001', status: 'active', avatar: 'RV' },
  { id: 'u-003', name: 'Sunita Rao', email: 'sunita.r@nexgile.com', role: 'FrontDesk', propertyId: 'prop-001', status: 'active', avatar: 'SR' },
  { id: 'u-004', name: 'Karthik N.', email: 'karthik.n@nexgile.com', role: 'RevenueManager', propertyId: 'prop-001', status: 'active', avatar: 'KN' },
  { id: 'u-005', name: 'Meena Pillai', email: 'meena.p@nexgile.com', role: 'Housekeeping', propertyId: 'prop-001', status: 'active', avatar: 'MP' }
];

// ─── LOYALTY ──────────────────────────────────────────────────────────────────
const loyaltyData = {
  tiers: [
    { name: 'Member', minPoints: 0, color: '#6b7280', perks: ['Member rates', 'Digital key'] },
    { name: 'Silver', minPoints: 10000, color: '#94a3b8', perks: ['10% bonus points', 'Late checkout', 'Upgrade requests'] },
    { name: 'Gold', minPoints: 25000, color: '#f59e0b', perks: ['25% bonus points', 'Guaranteed upgrade', 'Lounge access', 'Welcome amenity'] },
    { name: 'Platinum', minPoints: 50000, color: '#8b5cf6', perks: ['50% bonus points', 'Suite upgrade', 'Butler', 'Airport transfer', 'Dedicated line'] }
  ]
};

// ─── MARKETPLACE LISTINGS ─────────────────────────────────────────────────────
const marketplaceListings = [
  { id: 'ml-001', type: 'hotel', name: 'Nexgile Grand Mumbai', location: 'Mumbai', rating: 4.7, reviews: 1284, price: 10500, currency: 'INR', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400', amenities: ['Pool', 'Spa', 'Sea View'], tags: ['Luxury', 'Sea View'] },
  { id: 'ml-002', type: 'hotel', name: 'Nexgile Escape Goa', location: 'Goa', rating: 4.9, reviews: 2156, price: 18500, currency: 'INR', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400', amenities: ['Beach', 'Pool', 'Spa'], tags: ['Resort', 'Beach'] },
  { id: 'ml-003', type: 'activity', name: 'Mumbai Heritage Walk', location: 'Mumbai', rating: 4.6, reviews: 445, price: 1200, currency: 'INR', image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=400', duration: '3 hours', tags: ['Cultural', 'Walking'] },
  { id: 'ml-004', type: 'restaurant', name: 'Sea Spice - Coastal Kitchen', location: 'Mumbai', rating: 4.8, reviews: 892, price: 2500, currency: 'INR', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', cuisine: 'Coastal Indian', tags: ['Fine Dining', 'Seafood'] }
];

// ─── AI CONCIERGE CONVERSATIONS ───────────────────────────────────────────────
const conciergeHistory = [
  { id: 'conv-001', guestId: 'g-001', messages: [
    { role: 'guest', text: 'What are the top things to do in Mumbai tomorrow?', time: '09:15' },
    { role: 'ai', text: 'Great question, Arjun! Given the clear weather forecast for tomorrow, I\'d suggest: 1) Marine Drive sunrise walk (5 min from us), 2) Elephanta Caves ferry (book via our concierge desk), 3) Dharavi craft tour, 4) Dinner reservation at Sea Spice — shall I book the 8pm slot?', time: '09:15' },
    { role: 'guest', text: 'Yes please book Sea Spice for 2 at 8pm', time: '09:17' },
    { role: 'ai', text: 'Done! Reservation confirmed at Sea Spice for 2 guests at 8:00 PM tomorrow. I\'ve noted your vegetarian preference and alerted the chef. Shall I arrange a hotel car at 7:30 PM?', time: '09:17' }
  ]}
];

module.exports = { properties, roomTypes, guests, reservations, revenueMetrics, housekeepingTasks, maintenanceCases, channels, users, loyaltyData, marketplaceListings, conciergeHistory };
