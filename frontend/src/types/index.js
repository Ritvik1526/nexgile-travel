// Role definitions and permissions
export const ROLES = {
  SUPER_ADMIN: 'SuperAdmin',
  PROPERTY_ADMIN: 'PropertyAdmin',
  FRONT_DESK: 'FrontDesk',
  RESERVATIONS: 'Reservations',
  REVENUE_MANAGER: 'RevenueManager',
  HOUSEKEEPING: 'Housekeeping',
  MAINTENANCE: 'Maintenance',
  FINANCE: 'Finance',
  OTA_AGENT: 'OTA/Agent',
  CORPORATE_MANAGER: 'CorporateManager',
  TRAVELER: 'Traveler',
  SUPPORT: 'Support'
};

export const ROLE_COLORS = {
  SuperAdmin: '#6366f1',
  PropertyAdmin: '#0ea5e9',
  FrontDesk: '#10b981',
  RevenueManager: '#f59e0b',
  Housekeeping: '#ec4899',
  Maintenance: '#ef4444',
  Finance: '#8b5cf6',
  Traveler: '#06b6d4'
};

export const STATUS_COLORS = {
  confirmed: { bg: '#dbeafe', text: '#1d4ed8' },
  'checked-in': { bg: '#dcfce7', text: '#15803d' },
  'checked-out': { bg: '#f3f4f6', text: '#374151' },
  cancelled: { bg: '#fee2e2', text: '#dc2626' },
  pending: { bg: '#fef9c3', text: '#a16207' },
  'no-show': { bg: '#fce7f3', text: '#be185d' },
  active: { bg: '#dcfce7', text: '#15803d' },
  'in-progress': { bg: '#dbeafe', text: '#1d4ed8' },
  scheduled: { bg: '#ede9fe', text: '#7c3aed' },
  open: { bg: '#fef9c3', text: '#a16207' },
  completed: { bg: '#f3f4f6', text: '#374151' }
};

export const LOYALTY_TIERS = {
  Member: { color: '#6b7280', bg: '#f3f4f6' },
  Silver: { color: '#64748b', bg: '#f1f5f9' },
  Gold: { color: '#d97706', bg: '#fef3c7' },
  Platinum: { color: '#7c3aed', bg: '#ede9fe' }
};

export const CURRENCIES = { INR: '₹', USD: '$', EUR: '€', GBP: '£', AED: 'د.إ' };

export const NAV_ITEMS_BY_ROLE = {
  SuperAdmin: ['dashboard', 'properties', 'rooms', 'reservations', 'guests', 'housekeeping', 'maintenance', 'revenue', 'forecasting', 'competitors', 'analytics', 'channels', 'marketplace', 'concierge', 'trips', 'documents', 'wallet', 'loyalty', 'corporate', 'approvals', 'expenses', 'users', 'integrations', 'api-audit', 'settings'],
  PropertyAdmin: ['dashboard', 'properties', 'rooms', 'reservations', 'guests', 'housekeeping', 'maintenance', 'revenue', 'forecasting', 'analytics', 'concierge', 'settings'],
  FrontDesk: ['dashboard', 'reservations', 'guests', 'housekeeping', 'concierge'],
  Reservations: ['dashboard', 'reservations', 'guests', 'marketplace', 'concierge'],
  RevenueManager: ['dashboard', 'revenue', 'forecasting', 'competitors', 'channels', 'analytics'],
  Housekeeping: ['dashboard', 'housekeeping'],
  Maintenance: ['dashboard', 'maintenance'],
  Finance: ['dashboard', 'reservations', 'analytics', 'expenses', 'approvals'],
  'OTA/Agent': ['marketplace', 'channels', 'reservations'],
  CorporateManager: ['dashboard', 'corporate', 'approvals', 'expenses', 'trips', 'analytics'],
  Traveler: ['trips', 'marketplace', 'concierge', 'documents', 'wallet', 'loyalty', 'settings'],
  Support: ['dashboard', 'guests', 'concierge', 'api-audit']
};
