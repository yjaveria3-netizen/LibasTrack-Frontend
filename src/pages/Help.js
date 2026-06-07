import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem, GlowCard } from '../components/Motion';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  FolderOpen, 
  DollarSign, 
  Truck, 
  RotateCcw,
  ArrowRight,
  Database,
  Link2,
  FileText,
  HelpCircle,
  Settings,
  Cloud,
  HardDrive,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Plus,
  Minus
} from 'lucide-react';

const ENTITY_RELATIONSHIPS = [
  {
    entity: 'Products',
    icon: <Package size={24} />,
    description: 'Your inventory items with pricing, stock, and images',
    details: 'Products are the core of your inventory. Each product has a unique ID, name, category, pricing information, stock quantity, and can be associated with a collection and supplier.',
    relationships: [
      { to: 'Collections', type: 'Belongs to', description: 'A product can be part of a collection' },
      { to: 'Suppliers', type: 'Sourced from', description: 'A product can have a supplier' },
      { to: 'Orders', type: 'Sold in', description: 'Products appear in order items' },
      { to: 'Returns', type: 'Returned in', description: 'Products can be returned' },
    ],
    fields: ['Product ID', 'Name', 'Category', 'Subcategory', 'Price', 'Cost Price', 'Sale Price', 'Stock Qty', 'Status', 'Image', 'Supplier ID', 'Collection'],
  },
  {
    entity: 'Orders',
    icon: <ShoppingBag size={24} />,
    description: 'Customer orders with items, shipping, and payment details',
    details: 'Orders represent sales transactions. Each order contains customer information, multiple product items with quantities, shipping details, payment status, and order status tracking.',
    relationships: [
      { to: 'Customers', type: 'Placed by', description: 'Each order belongs to one customer' },
      { to: 'Products', type: 'Contains', description: 'Orders contain multiple product items' },
      { to: 'Financial', type: 'Generates', description: 'Orders create financial transactions' },
      { to: 'Returns', type: 'Can have', description: 'Orders can have returns/refunds' },
    ],
    fields: ['Order ID', 'Customer ID', 'Customer Name', 'Items', 'Subtotal', 'Discount', 'Shipping', 'Tax', 'Total', 'Status', 'Channel', 'Shipping Address', 'Order Date'],
  },
  {
    entity: 'Customers',
    icon: <Users size={24} />,
    description: 'Your buyers with contact info and purchase history',
    details: 'Customers are your buyers. Each customer has contact information, purchase history, total spent, loyalty points, and can be segmented for targeted marketing.',
    relationships: [
      { to: 'Orders', type: 'Places', description: 'Customers place orders' },
      { to: 'Financial', type: 'Pays in', description: 'Customer payments are recorded' },
      { to: 'Returns', type: 'Can request', description: 'Customers can request returns' },
    ],
    fields: ['Customer ID', 'Name', 'Email', 'Phone', 'WhatsApp', 'City', 'Country', 'Address', 'Total Spent', 'Total Orders', 'Loyalty Points', 'Segment'],
  },
  {
    entity: 'Collections',
    icon: <FolderOpen size={24} />,
    description: 'Brand collections for organizing products by season/theme',
    details: 'Collections help organize products by season, theme, or category. They make it easier to manage and showcase related products together.',
    relationships: [
      { to: 'Products', type: 'Contains', description: 'Collections group products together' },
    ],
    fields: ['Collection ID', 'Name', 'Description', 'Season', 'Year', 'Theme', 'Status', 'Launch Date', 'Product Count'],
  },
  {
    entity: 'Suppliers',
    icon: <Truck size={24} />,
    description: 'Your supply chain contacts and vendor information',
    details: 'Suppliers are your vendors who provide products. Track their contact information, rating, lead time, minimum order quantities, and payment terms.',
    relationships: [
      { to: 'Products', type: 'Supply', description: 'Suppliers provide products' },
    ],
    fields: ['Supplier ID', 'Name', 'Contact Person', 'Email', 'Phone', 'WhatsApp', 'City', 'Category', 'Materials', 'Rating', 'Lead Time', 'Min Order', 'Payment Terms'],
  },
  {
    entity: 'Financial',
    icon: <DollarSign size={24} />,
    description: 'Payment transactions and financial records',
    details: 'Financial records track all payment transactions linked to orders. Track payment methods, status, amounts, and transaction dates for accounting.',
    relationships: [
      { to: 'Orders', type: 'Linked to', description: 'Transactions are linked to orders' },
      { to: 'Customers', type: 'From', description: 'Payments come from customers' },
    ],
    fields: ['Transaction ID', 'Order ID', 'Customer ID', 'Amount', 'Payment Method', 'Payment Status', 'Transaction Date'],
  },
  {
    entity: 'Returns',
    icon: <RotateCcw size={24} />,
    description: 'Product returns and refund requests',
    details: 'Returns track product returns and refund requests. Each return is linked to an order, product, and customer with reason, type, and refund amount.',
    relationships: [
      { to: 'Orders', type: 'From', description: 'Returns are for specific orders' },
      { to: 'Products', type: 'For', description: 'Returns are for specific products' },
      { to: 'Customers', type: 'By', description: 'Returns are requested by customers' },
      { to: 'Financial', type: 'Generates', description: 'Returns create refund transactions' },
    ],
    fields: ['Return ID', 'Order ID', 'Product ID', 'Reason', 'Type', 'Status', 'Refund Amount', 'Return Date', 'Notes'],
  },
];

const STORAGE_OPTIONS = [
  {
    type: 'Google Drive',
    icon: <Cloud size={24} />,
    description: 'Cloud storage with automatic sync to Google Sheets',
    pros: ['Automatic cloud backup', 'Access from anywhere', 'Real-time collaboration', 'No local storage needed'],
    cons: ['Requires internet connection', 'Google account required', 'File size limits'],
    setup: 'Connect your Google Drive folder and spreadsheets will be automatically created. Images are uploaded to Drive folders.',
  },
  {
    type: 'Local Excel',
    icon: <HardDrive size={24} />,
    description: 'Local Excel files stored on your computer',
    pros: ['Works offline', 'No internet needed', 'Full control over data', 'No external dependencies'],
    cons: ['Manual backup required', 'Single device access', 'Risk of data loss if not backed up'],
    setup: 'Choose a local folder. Excel files and image folders will be created automatically. Images are saved locally.',
  },
];

const FAQS = [
  {
    question: 'How do I set up storage for the first time?',
    answer: 'After completing brand onboarding, you\'ll be directed to Storage Setup. Choose between Google Drive (cloud) or Local Excel (offline). Follow the prompts to connect your Drive or select a local folder. The system will automatically create the necessary folders and files.',
    icon: <Settings size={20} />,
  },
  {
    question: 'Can I switch between Google Drive and Local Excel?',
    answer: 'Yes! Go to Settings > Drive & Sync to switch storage options. Note that your data will remain in the database, but the sync destination will change. We recommend backing up your data before switching.',
    icon: <Zap size={20} />,
  },
  {
    question: 'What happens if I delete a product that has orders?',
    answer: 'The product will be deleted from your inventory, but historical order records will remain intact. However, you won\'t be able to view the product details in old orders. We recommend archiving instead of deleting for products with order history.',
    icon: <AlertTriangle size={20} />,
  },
  {
    question: 'How are images stored?',
    answer: 'In Google Drive mode: Images are uploaded to Drive/Images/products/ folder. In Local Excel mode: Images are saved to your local folder/Images/products/. The image link is stored in the product record.',
    icon: <Database size={20} />,
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. Google Drive uses Google\'s security infrastructure. For Local Excel, data is stored on your computer. We recommend regular backups. OAuth tokens are encrypted at rest in our database.',
    icon: <Shield size={20} />,
  },
  {
    question: 'Can I export my data?',
    answer: 'Yes. In Google Drive mode, your data is already in Google Sheets which you can export. In Local Excel mode, your data is in Excel files. You can also use the API to export data in various formats.',
    icon: <FileText size={20} />,
  },
  {
    question: 'What happens if I lose internet connection?',
    answer: 'In Google Drive mode, you can view cached data but cannot make changes until reconnected. In Local Excel mode, everything works offline as data is stored locally.',
    icon: <Cloud size={20} />,
  },
  {
    question: 'How do I handle product returns?',
    answer: 'Go to Returns page, click "Add Return", select the order and product, specify the reason and refund amount. The system will automatically update the order status and create a refund transaction in Financial.',
    icon: <RotateCcw size={20} />,
  },
  {
    question: 'Can I track supplier performance?',
    answer: 'Yes. Each supplier has a rating field. You can also track total purchased amount, lead time, and payment terms. Use this data to evaluate and compare suppliers.',
    icon: <Truck size={20} />,
  },
  {
    question: 'How do collections work?',
    answer: 'Collections are groups of products. Create a collection with a name, season, and theme. When adding or editing products, you can assign them to collections. This helps organize products for seasonal launches or themed collections.',
    icon: <FolderOpen size={20} />,
  },
];

export default function Help() {
  const [expandedFaq, setExpandedFaq] = React.useState(null);

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div className="help-page animate-vibe">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-inner">
          <Reveal delay={0.05} direction="none">
            <div>
              <h1 className="page-title">Help & Documentation</h1>
              <p className="page-subtitle">
                Complete guide to LibasTrack entities, storage, and common questions
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="page-body">
        <StaggerContainer staggerDelay={0.08} delayStart={0.1}>
          {/* Introduction */}
          <Reveal delay={0.1}>
            <GlowCard className="card glass" style={{ marginBottom: 32, padding: 32 }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: 'var(--accent-soft)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Database size={28} style={{ color: 'var(--accent)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
                    Welcome to LibasTrack Help
                  </h2>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                    LibasTrack is a comprehensive brand management system that helps you track products, orders, customers, suppliers, and financial transactions. This guide explains how everything connects together.
                  </p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <Link2 size={16} />
                      <span>Entity Relationships</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <FileText size={16} />
                      <span>Storage Options</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <HelpCircle size={16} />
                      <span>FAQ</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </Reveal>

          {/* Entity Relationships */}
          <Reveal delay={0.15}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Database size={24} style={{ color: 'var(--accent)' }} />
              Entity Relationships
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gap: 24, marginBottom: 48 }}>
            {ENTITY_RELATIONSHIPS.map((entity, idx) => (
              <StaggerItem key={entity.entity}>
                <GlowCard className="card glass" style={{ padding: 28 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 10,
                      background: 'var(--accent-soft)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {entity.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>
                        {entity.entity}
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 8 }}>
                        {entity.description}
                      </p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                        {entity.details}
                      </p>
                    </div>
                  </div>

                  {/* Relationships */}
                  <div style={{ marginBottom: 20 }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                      Relationships
                    </h4>
                    <div style={{ display: 'grid', gap: 12 }}>
                      {entity.relationships.map((rel, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: 12,
                          background: 'var(--bg-layer1)',
                          borderRadius: 8,
                          border: '1px solid var(--border-faint)'
                        }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: 'var(--accent-soft)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)'
                          }}>
                            {rel.to[0]}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>
                                {rel.to}
                              </span>
                              <ArrowRight size={14} style={{ color: 'var(--accent)' }} />
                              <span style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '0.9rem' }}>
                                {rel.type}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              {rel.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Fields */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                      Key Fields
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {entity.fields.map((field, i) => (
                        <span key={i} style={{
                          padding: '6px 12px',
                          background: 'var(--bg-layer1)',
                          border: '1px solid var(--border-faint)',
                          borderRadius: 6,
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          fontWeight: 500
                        }}>
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </div>

          {/* Storage Options */}
          <Reveal delay={0.2}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <HardDrive size={24} style={{ color: 'var(--accent)' }} />
              Storage Options
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24, marginBottom: 48 }}>
            {STORAGE_OPTIONS.map((option, idx) => (
              <StaggerItem key={option.type}>
                <GlowCard className="card glass" style={{ padding: 28 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 10,
                      background: 'var(--accent-soft)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {option.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>
                        {option.type}
                      </h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {option.description}
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle size={14} />
                      Pros
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                      {option.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <AlertTriangle size={14} />
                      Cons
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                      {option.cons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ padding: 16, background: 'var(--bg-layer1)', borderRadius: 8, border: '1px solid var(--border-faint)' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                      Setup
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                      {option.setup}
                    </p>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </div>

          {/* FAQ */}
          <Reveal delay={0.25}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <HelpCircle size={24} style={{ color: 'var(--accent)' }} />
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div style={{ display: 'grid', gap: 16 }}>
            {FAQS.map((faq, idx) => (
              <StaggerItem key={idx}>
                <GlowCard className="card glass" style={{ padding: 0, overflow: 'hidden' }}>
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: 24,
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: 'var(--accent-soft)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: 'var(--accent)'
                    }}>
                      {faq.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)', margin: 0 }}>
                        {faq.question}
                      </h3>
                    </div>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: 'var(--bg-layer1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: 'var(--accent)'
                    }}>
                      {expandedFaq === idx ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 24px 24px 80px' }}>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlowCard>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </div>
  );
}
