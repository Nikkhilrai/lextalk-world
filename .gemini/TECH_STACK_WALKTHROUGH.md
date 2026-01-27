# LexTalk World - Technical Stack Walkthrough

## 🏗️ Architecture Overview

LexTalk World is a **full-stack web application** built with modern technologies, following a **serverless architecture** with a **PostgreSQL database** for data persistence.

---

## 📚 Frontend Technologies

### **Core Framework**
- **Next.js 16** (React 19)
  - App Router architecture (not Pages Router)
  - Server Components & Client Components
  - File-based routing in `src/app/`
  - API Routes in `src/app/api/`
  - Server Actions in `src/actions/`

### **UI & Styling**
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
  - `@tailwindcss/typography` - Rich text styling
  - Custom color palette (amber/gold, slate, black theme)
- **Lucide React** - Icon library (modern, tree-shakeable)

### **Form Management**
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### **Rich Text Editing**
- **Tiptap** - Headless WYSIWYG editor
  - Extensions: Link, Table, Text Align, Underline
  - Used in blog post creation/editing

### **Data Visualization**
- **Recharts** - Chart library for analytics
- **D3 Scale** - Data scaling utilities
- **React Simple Maps** - Geographic visualizations

### **UI Components & Utilities**
- **React Hot Toast** - Toast notifications
- **React Tooltip** - Tooltips
- **React Markdown** - Markdown rendering
  - `rehype-raw` - HTML in markdown
  - `rehype-sanitize` - XSS protection
- **clsx** / **tailwind-merge** - Conditional class merging
- **date-fns** - Date manipulation

---

## 🔧 Backend Technologies

### **Runtime & Framework**
- **Next.js API Routes** - Serverless API endpoints
- **Server Actions** - Direct server-side mutations
- **Node.js** - JavaScript runtime

### **Database**
- **PostgreSQL** - Primary relational database
  - Hosted on cloud (likely Vercel Postgres or similar)
- **Prisma ORM** - Database toolkit
  - Type-safe database client
  - Schema-first development
  - Migrations management
  - `@prisma/adapter-pg` - PostgreSQL adapter
  - Driver adapters for serverless environments

### **Authentication & Security**
- **Jose** - JWT token handling
- **bcryptjs** - Password hashing
- Custom session management
- Login attempt tracking (security model)

### **File Storage & Processing**
- **Cloudinary** - Image/video hosting & CDN
  - Image optimization
  - Transformations on-the-fly
- **Mammoth** - Word document (.docx) to HTML conversion
- **PDF Generation**:
  - **jsPDF** - PDF creation
  - **jspdf-autotable** - Table generation in PDFs
  - **pdf-lib** - PDF manipulation
  - **QRCode** - QR code generation for tickets

### **Email Service**
- **Resend** - Transactional email API
- **@react-email/components** - Email templates in React

### **Payment Integration**
- **Razorpay** - Payment gateway (India)
- **PayPal** (`@paypal/react-paypal-js`) - International payments

### **Analytics**
- **Google Analytics Data API** (`@google-analytics/data`)
  - Server-side analytics data fetching
  - Custom dashboards in admin panel

### **Data Export**
- **XLSX** - Excel file generation
  - Export leads, registrations, etc.

---

## 🗄️ Database Schema (Prisma Models)

### **User-Facing Data**
1. **Lead** - Contact form submissions, registrations
2. **Subscriber** - Newsletter subscribers
3. **AgendaDownload** - Agenda download lead capture

### **Content Management**
4. **BlogPost** - Blog articles with SEO fields
5. **BlogCategory** - Blog categorization
6. **BlogAuthor** - Author profiles
7. **BlogComment** - User comments (moderated)
8. **AboutPage** - Dynamic About page content

### **Events & Conferences**
9. **Conference** - Event details
10. **TicketType** - Ticket tiers (Standard, Premium, Executive)
11. **TicketOrder** - Ticket purchases with QR codes
12. **Speaker** - Conference speakers
13. **Sponsor** - Event sponsors

### **Awards System**
14. **AwardEvent** - Award ceremonies (Dubai 2024, etc.)
15. **Awardee** - Award recipients
16. **Nomination** - Award nominations
17. **Payment** - Payment transactions
18. **Award** - Legacy award model

### **Admin & Governance**
19. **AdminUser** - Admin authentication
20. **Advisor** - Advisory board members
21. **LoginAttempt** - Security tracking

---

## 📁 Project Structure

```
lextalkWorld/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/           # Public pages
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── dubai-2026/     # Dubai event
│   │   │   ├── tickets/        # Ticket purchasing
│   │   │   ├── blog/           # Blog pages
│   │   │   └── ...
│   │   ├── api/                # API Routes
│   │   │   ├── auth/           # Authentication
│   │   │   ├── blog/           # Blog CRUD
│   │   │   ├── tickets/        # Ticket operations
│   │   │   ├── razorpay/       # Payment webhooks
│   │   │   └── ...
│   │   ├── admin/              # Admin dashboard
│   │   └── layout.tsx          # Root layout
│   ├── actions/                # Server Actions
│   │   ├── auth.ts
│   │   ├── lead.ts
│   │   ├── blog.ts
│   │   └── ...
│   ├── components/             # React Components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── admin/              # Admin components
│   │   └── ...
│   ├── lib/                    # Utilities
│   │   ├── prisma.ts           # Prisma client
│   │   ├── auth.ts             # Auth helpers
│   │   └── countries.ts
│   └── contexts/               # React Contexts
│       ├── CartContext.tsx
│       └── ToastContext.tsx
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── public/                     # Static assets
│   ├── dubai-event/
│   ├── logo/
│   └── ...
├── scripts/                    # Utility scripts
│   └── reset-admin.ts
└── package.json
```

---

## 🔄 Data Flow

### **1. User Registration Flow**
```
User Form → RegisterModal.tsx → 
Server Action (createLead) → 
Prisma → PostgreSQL → 
Email via Resend → 
Success Toast
```

### **2. Blog Post Creation**
```
Admin Dashboard → 
Tiptap Editor → 
Image Upload (Cloudinary) → 
API Route (/api/blog) → 
Prisma → PostgreSQL → 
Revalidate Cache
```

### **3. Ticket Purchase**
```
Ticket Selection → 
Razorpay/PayPal → 
Webhook (/api/razorpay/webhook) → 
Create TicketOrder → 
Generate PDF + QR Code → 
Send Email with Ticket → 
Store in Cloudinary
```

### **4. Agenda Download**
```
User fills form → 
AgendaModal → 
API (/api/agenda/download) → 
Save to AgendaDownload → 
Return PDF URL → 
Track download
```

---

## 🚀 Deployment & Hosting

### **Platform**
- **Vercel** (inferred from Next.js setup)
  - Automatic deployments from Git
  - Edge functions for API routes
  - CDN for static assets

### **Database Hosting**
- **PostgreSQL** (cloud-hosted)
  - Likely Vercel Postgres, Supabase, or Railway
  - Connection pooling via Prisma

### **Asset Storage**
- **Cloudinary** - Images, videos, PDFs
- **Vercel CDN** - Static files in `/public`

### **Environment Variables**
Required env vars (in `.env`):
- `DATABASE_URL` - PostgreSQL connection string
- `CLOUDINARY_*` - Cloudinary credentials
- `RESEND_API_KEY` - Email service
- `RAZORPAY_*` - Payment gateway
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
- `JWT_SECRET` - Auth token signing

---

## 🔐 Security Features

1. **Authentication**
   - JWT-based sessions
   - Bcrypt password hashing
   - Login attempt tracking
   - Rate limiting (via login attempts)

2. **Data Validation**
   - Zod schemas on all forms
   - Server-side validation
   - SQL injection protection (Prisma)

3. **XSS Protection**
   - `rehype-sanitize` for markdown
   - Content Security Policy headers
   - Input sanitization

4. **Payment Security**
   - Webhook signature verification
   - Encrypted QR code data
   - PCI compliance via Razorpay/PayPal

---

## 📊 Admin Dashboard Features

Located at `/admin`:
- **Analytics** - Google Analytics integration
- **Lead Management** - View/export registrations
- **Blog CMS** - Create/edit posts with Tiptap
- **Ticket Management** - View orders, generate reports
- **Advisory Board** - CRUD operations
- **Speaker Management**
- **Sponsor Management**
- **Award Nominations** - Review submissions
- **Settings** - About page content

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Amber/Gold (#F59E0B, #D97706)
- **Background**: Dark slate (#0a0a0a, #1a1a2e)
- **Text**: White, Slate-300, Slate-400
- **Accents**: Purple, Emerald, Blue

### **Typography**
- **Headings**: Serif fonts (elegant, formal)
- **Body**: Sans-serif (readable)
- **Tracking**: Wide letter spacing for headings

### **Components**
- Glassmorphism effects
- Gradient backgrounds
- Animated hover states
- Responsive grid layouts

---

## 🧪 Development Workflow

### **Scripts**
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npx prisma studio    # Database GUI
npx prisma migrate   # Run migrations
```

### **Key Commands**
```bash
# Database
npx prisma generate              # Generate Prisma client
npx prisma db push               # Push schema changes
npx prisma migrate dev           # Create migration

# Deployment
git push origin main             # Auto-deploy to Vercel
```

---

## 📦 Third-Party Integrations

1. **Cloudinary** - Media management
2. **Resend** - Email delivery
3. **Razorpay** - Payment processing (India)
4. **PayPal** - International payments
5. **Google Analytics** - Traffic analytics
6. **Vercel** - Hosting & deployment

---

## 🔮 Technology Highlights

### **Why Next.js 16?**
- Server Components for better performance
- Built-in API routes (no separate backend)
- Automatic code splitting
- Image optimization
- SEO-friendly SSR/SSG

### **Why Prisma?**
- Type-safe database queries
- Auto-generated types
- Easy migrations
- Works great with serverless

### **Why Tailwind CSS?**
- Rapid UI development
- Consistent design system
- Small bundle size (tree-shaking)
- No CSS conflicts

---

## 📈 Performance Optimizations

1. **Image Optimization**
   - Next.js Image component
   - Cloudinary transformations
   - WebP/AVIF formats

2. **Code Splitting**
   - Dynamic imports
   - Route-based splitting
   - Component lazy loading

3. **Caching**
   - Static page generation
   - API route caching
   - CDN edge caching

4. **Database**
   - Prisma connection pooling
   - Indexed queries
   - Efficient relations

---

## 🎯 Summary

**Frontend**: Next.js 16 + React 19 + TypeScript + Tailwind CSS  
**Backend**: Next.js API Routes + Server Actions  
**Database**: PostgreSQL + Prisma ORM  
**Storage**: Cloudinary (media) + Vercel (static)  
**Payments**: Razorpay + PayPal  
**Email**: Resend  
**Hosting**: Vercel  
**Language**: TypeScript (100%)

This is a **modern, type-safe, full-stack application** with a focus on **performance, security, and developer experience**.
