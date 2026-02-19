# Flow Productions Website

Modern, multi-language marketing website built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL with RLS)
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth with JWT + HTTP-only cookies
- **i18n**: next-intl (PT/EN/FR)
- **Email**: SendGrid
- **Analytics**: Google Analytics 4

## 📦 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd flow_website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# SendGrid
SENDGRID_API_KEY=your-sendgrid-api-key
CONTACT_INBOX_EMAIL=info@flowproductions.pt

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Auth
JWT_SECRET=your-jwt-secret-key
```

### 4. Set up Supabase

1. Create a new Supabase project at https://supabase.com
2. Run the database schema:
   ```bash
   # Copy the contents of supabase/schema.sql to Supabase SQL Editor
   ```
3. Run the seed data:
   ```bash
   # Copy the contents of supabase/seed.sql to Supabase SQL Editor
   ```

### 5. Start the development server

```bash
npm run dev
```

Visit http://localhost:3000/pt to see the site.

## 🌍 Multi-language Support

The site supports three languages:
- Portuguese (PT) - Default
- English (EN)
- French (FR)

Routes are prefixed with the locale:
- `/pt` - Portuguese
- `/en` - English
- `/fr` - French

## 📁 Project Structure

```
├── app/
│   ├── [locale]/
│   │   ├── (site)/          # Public pages
│   │   │   ├── page.tsx     # Home
│   │   │   ├── servicos/    # Services
│   │   │   ├── projetos/    # Projects
│   │   │   ├── blog/        # Blog
│   │   │   └── contactos/   # Contact
│   │   └── admin/           # Admin panel
│   ├── api/                 # API routes
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/              # Header, Footer, etc.
│   ├── sections/            # Page sections
│   ├── ui/                  # Reusable UI components
│   └── analytics/           # Google Analytics
├── lib/
│   ├── supabase/            # Supabase clients
│   ├── i18n.ts
│   └── seo.ts
├── messages/                # Translation files
│   ├── pt.json
│   ├── en.json
│   └── fr.json
└── supabase/
    ├── schema.sql           # Database schema
    └── seed.sql             # Seed data
```

## 🎨 Services Page

The Services page (`/servicos`) is the primary focus, showcasing 4 main service pillars:

1. **Design** (01) - Branding, Editorial, Web Design, UX/UI Design, Packaging Design, Social Media Design, Ilustração, Space Branding
2. **Marketing** (02) - Content Strategy, Brand Strategy, Copywriting, Social Media Content, Blog Content Writing, Digital Advertising, Storytelling, Consultoria
3. **Audiovisual** (03) - Storytelling, Vídeo, Fotografia, Cobertura de Eventos
4. **Animação** (04) - Motion Graphics, Animação de Produto, Animação Corporativa e Educativa, Animação Publicitária e Social Media, Efeitos Especiais

### Features:
- Scroll-triggered animations with Framer Motion
- Staggered list item reveals
- Hover effects with card lift
- Responsive design
- Respects `prefers-reduced-motion`

## 🔐 Admin Panel

Access the admin panel at `/admin/login`. Features include:

- **Dashboard** - Overview statistics
- **Projects** - Create and manage projects
- **Blog** - Write and publish blog posts
- **Team** - Manage team members
- **Media** - Upload and manage images
- **Testimonials** - Manage client testimonials

### Authentication

Protected routes use Supabase Auth with:
- JWT tokens stored in HTTP-only cookies
- Row-Level Security (RLS) policies
- Role-based access (admin/editor)

## 📧 Contact Form & Newsletter

Both forms integrate with SendGrid and store data in Supabase:

- **Contact Form** (`/api/contact`)
  - Validates with Zod
  - Stores messages in `contact_messages` table
  - Sends email notification to inbox
  - Tracks consent and timestamp

- **Newsletter** (`/api/newsletter/subscribe`)
  - Stores subscribers in `newsletter_subscribers` table
  - Sends welcome email
  - Supports double opt-in (optional)

## 🔍 SEO

- **Metadata** - `generateMetadata` on each page
- **Sitemap** - Auto-generated at `/sitemap.xml`
- **Robots.txt** - Configured to disallow `/admin` and `/api`
- **Open Graph** - Social media previews
- **Structured Data** - JSON-LD (future enhancement)

## 📊 Analytics

Google Analytics 4 is integrated with event tracking for:
- Page views
- Contact form submissions
- Newsletter subscriptions
- Project clicks (optional)

## 🎨 Animations

All animations use Framer Motion with:
- Scroll-triggered reveals (`AnimateIn`)
- Stagger animations (`StaggerContainer`, `StaggerItem`)
- Hover effects (`HoverLift`)
- Reduced motion support (`useReducedMotion`)

## 🚢 Deployment

### Recommended: Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables

Make sure to set all required environment variables in your hosting platform:
- Supabase credentials
- SendGrid API key
- Site URL
- Google Analytics ID

## 📝 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🗃️ Database Seeding

The database is pre-seeded with:
- 4 service categories with items
- 5 project categories
- 8 project tags

To add more content, use the admin panel or insert directly via Supabase dashboard.

## 🔧 Customization

### Adding a New Language

1. Add locale to `i18n/routing.ts`
2. Create `messages/{locale}.json`
3. Update `locales` array in components

### Modifying Services

Services are stored in Supabase `services` and `service_items` tables. Edit via:
- Admin panel (when implemented)
- Supabase dashboard
- SQL migrations

### Styling

The site uses Tailwind CSS. Customize colors in `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      primary: '#000000',
      secondary: '#FFFFFF',
      // Add your colors
    },
  },
}
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [next-intl](https://next-intl-docs.vercel.app/)

## 📄 License

© Flow Productions. All Rights Reserved.

## 🤝 Support

For support, email info@flowproductions.pt or visit https://flowproductions.pt
