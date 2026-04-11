// frontend/src/utils/navItems.js

// Flat list of all nav destinations (used by CommandPalette)
export const NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard', icon: '▦', section: 'Overview' },
  { label: 'Orders', to: '/orders', icon: '◫', section: 'Commerce' },
  { label: 'Products', to: '/products', icon: '▣', section: 'Commerce' },
  { label: 'Customers', to: '/customers', icon: '◎', section: 'Commerce' },
  { label: 'Collections', to: '/collections', icon: '▤', section: 'Commerce' },
  { label: 'Financial', to: '/financial', icon: '◉', section: 'Operations' },
  { label: 'Suppliers', to: '/suppliers', icon: '◈', section: 'Operations' },
  { label: 'Returns & Refunds', to: '/returns', icon: '↩', section: 'Operations' },
  { label: 'Checklist', to: '/checklist', icon: '✓', section: 'Planning' },
  { label: 'Drive & Sync', to: '/drive-setup', icon: '↑', section: 'Setup' },
  { label: 'Brand Settings', to: '/brand-settings', icon: '◇', section: 'Setup' },
];

// Grouped structure for the sidebar (used by Layout.js)
export const NAV_GROUPS = [
  { section: 'Overview', items: [NAV_ITEMS[0]] },
  { section: 'Commerce', items: NAV_ITEMS.slice(1, 5) },
  { section: 'Operations', items: NAV_ITEMS.slice(5, 8) },
  { section: 'Planning', items: [NAV_ITEMS[8]] },
  { section: 'Setup', items: NAV_ITEMS.slice(9) },
];

// Quick actions for Dashboard and CommandPalette
export const QUICK_ACTIONS = [
  { label: 'New Order', desc: 'Record a sale', icon: '◫', to: '/orders' },
  { label: 'Add Product', desc: 'Add to inventory', icon: '▣', to: '/products' },
  { label: 'Add Customer', desc: 'Register a buyer', icon: '⊕', to: '/customers' },
  { label: 'Add Supplier', desc: 'New supply contact', icon: '⊞', to: '/suppliers' },
  { label: 'New Collection', desc: 'Start a collection', icon: '▤', to: '/collections' },
  { label: 'Record Payment', desc: 'Log a transaction', icon: '◉', to: '/financial' },
];
