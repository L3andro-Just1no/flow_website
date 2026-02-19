# Flow Productions — Reconstruction Blueprint (Cursor Instructions)

**Live reference website (OPEN THIS):** https://flowproductions.pt/  
**Note:** This site contains important **animations and micro-interactions** that must be matched. Use it as the primary visual/behavior reference during implementation.

---

## How Cursor should use the live site (animation-first workflow)

1. **Open the live site**: https://flowproductions.pt/  
2. **Record behaviors** page-by-page:
   - Page load transitions
   - Scroll-triggered reveals
   - Hover states (cards, buttons, nav)
   - Menu open/close animations (mobile + dropdowns)
   - Slider/carousel motion (testimonials, etc.)
   - Any parallax / text effects
3. For each page, capture:
   - A short screen recording (or notes) of the animations
   - The section order and spacing
   - Typography scale (H1/H2/body)
4. Implement animations in the rebuild using:
   - **Framer Motion** (recommended) or CSS transitions where appropriate
   - **IntersectionObserver**-based triggers for scroll reveals
   - Respect reduced-motion (`prefers-reduced-motion`)

---

## Tech Stack (fixed)

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Authentication:** JWT with HTTP-only cookies
- **Internationalization:** next-intl (PT, EN, FR)
- **Email:** SendGrid
- **Analytics:** Google Analytics 4

---

## Goal & scope

Rebuild the Flow Productions marketing site with:
- Same IA (pages, navigation) and **matching animations**
- Content stored in Supabase (projects, blog, testimonials, team, services)
- Multi-language PT/EN/FR via next-intl
- Contact + newsletter forms (SendGrid + DB)
- Admin area (protected) for CRUD and publishing

Out of scope (unless explicitly added):
- E-commerce “Shop” (treat as external link for now)

---

## Information architecture (IA)

Primary navigation (observed on the live site):
- Home
- Sobre Nós (About)
- Serviços (Services)
- Projetos (Projects)
  - Design
  - Marketing
  - Audiovisual
  - Animação
  - Projetos Sociais
- Blog Flow (Blog)
- Contactos (Contact)

---

## Routes map (Next.js App Router + next-intl)

Locale-prefixed routes (recommended):

Public:
- `/{locale}` → Home
- `/{locale}/sobre-nos` → About
- `/{locale}/servicos` → Services
- `/{locale}/projetos` → Projects index (filterable)
- `/{locale}/projetos/{categorySlug}` → Category landing (design/marketing/audiovisual/animacao/social)
- `/{locale}/projetos/p/{projectSlug}` → Project detail
- `/{locale}/blog` → Blog list
- `/{locale}/blog/{postSlug}` → Blog detail
- `/{locale}/contactos` → Contact

Admin (protected):
- `/{locale}/admin/login`
- `/{locale}/admin` (dashboard)
- `/{locale}/admin/projects`
- `/{locale}/admin/posts`
- `/{locale}/admin/media`
- `/{locale}/admin/team`
- `/{locale}/admin/testimonials`

API:
- `/api/contact` (SendGrid + store message)
- `/api/newsletter/subscribe` (store + email)
- `/api/revalidate` (optional, admin-only)

Redirects:
- Create a redirect map from legacy WP-ish slugs to new localized routes (add after content migration).

---

## Page-by-page build spec (match sections + animation beats)

### 1) Home — `/{locale}`
Reference: https://flowproductions.pt/

Sections (top → bottom):
1. **Header / Nav**
   - Desktop nav + mobile menu
   - Dropdown “Projetos” with the 5 categories
   - Animation: menu open/close, dropdown reveal, link hover underline/slide

2. **Hero**
   - Label: “Flow with us”
   - H1: “Somos Flow: Criatividade em movimento”
   - Intro paragraph
   - CTA button: “Sobre a Flow”
   - Animation: hero fade/slide in, CTA hover micro-interaction

3. **Services preview**
   - Title: “Os nossos serviços”
   - 4 cards: Design, Marketing, Audiovisual, Animação (01–04)
   - Animation: scroll reveal stagger, hover lift + subtle shadow

4. **Testimonials**
   - Title: “Marcas que fluem connosco”
   - Carousel or grid (match live behavior)
   - Animation: slide transition or fade (match live)

5. **Projects preview**
   - Title: “Projetos com Flow”
   - Description + “Ver Mais”
   - Grid of featured projects with tags
   - Animation: card hover + image zoom, scroll-in stagger

6. **Contact CTA**
   - “Vamos pôr os teus projetos a fluir?” + address/phone/email
   - Consent link wording re: collected/stored data
   - Animation: section reveal + button hover

7. **Footer**
   - Address, email, phone, socials
   - Optional newsletter inline repeated here (match live placement)

8. **Newsletter subscribe**
   - “Subscreva a nossa newsletter!” + email field
   - Animation: input focus states

---

### 2) About — `/{locale}/sobre-nos`
Reference: https://flowproductions.pt/sobre-nos/

Sections:
- “A nossa história” / “Onde o Flow Começou”
- “Missão e Visão Flow” with 3 blocks: Missão, Visão, Valores
- “Equipa Flow: o motor criativo” team grid

Animation requirements:
- Text blocks reveal on scroll
- Team cards hover states (if present on live site)

Data:
- `team_members`
- About copy from translations or `pages` table

---

### 3) Services — `/{locale}/servicos`
Reference: https://flowproductions.pt/servicos/

Sections:
- Title: “Os nossos serviços”
- 4 pillars with sub-services lists:
  - Design: Branding, Editorial, Web Design, UX/UI, Packaging, Social Media Design, Ilustração, Space Branding
  - Marketing: Content Strategy, Brand Strategy, Copywriting, Social Media Content, Blog Content Writing, Digital Advertising, Storytelling, Consultoria
  - Audiovisual: Storytelling, Vídeo, Fotografia, Cobertura de Eventos
  - Animação: Motion Graphics, Animação de Produto, Corporativa/Educativa, Publicitária/Social Media, Efeitos Especiais

Animation:
- Expand/scroll reveal per block, list item stagger (if present)

Data:
- `services`, `service_items`

---

### 4) Projects index — `/{locale}/projetos`
Reference: https://flowproductions.pt/projetos/

Requirements:
- Project grid with:
  - featured image
  - title
  - tags (Design/Marketing/Vídeo/Animação/Content Writing, etc.)
- Filters:
  - by tag/category
  - search by title/client
- Pagination or “Load more”
- Animation:
  - Filter transitions
  - Card hover effects and scroll reveals

Data:
- `projects`, `project_tags`, `project_project_tags`

---

### 5) Project category pages — `/{locale}/projetos/{categorySlug}`
References:
- Design: https://flowproductions.pt/design/
- Marketing: https://flowproductions.pt/marketing/
- Audiovisual: https://flowproductions.pt/audiovisual/
- Animação: https://flowproductions.pt/animacao-2/
- Projetos Sociais: https://flowproductions.pt/projetos-sociais-2/

Structure:
- Category hero (title/intro)
- One or more curated sections (Marketing has multiple groups)
- Lists/grids of projects per section
- Animation: section reveal + list hover + image motion

Data:
- `project_categories`
- `project_category_sections`
- `category_section_projects`

---

### 6) Project detail — `/{locale}/projetos/p/{projectSlug}`
Reference example: https://flowproductions.pt/portfolio/fujifilm-promo/

Fields:
- Title
- Publish date
- Summary/excerpt
- Client name
- Year label
- Featured image
- Rich content blocks (markdown/MDX/blocks)
- Optional: share buttons, related projects

Animation:
- Hero image load / reveal
- Section transitions within content blocks

Data:
- `projects`

---

### 7) Blog list — `/{locale}/blog`
Reference: https://flowproductions.pt/blog-flow/

Requirements:
- Newest-first list
- Featured image + date + title
- Pagination
- Animation: list reveal + card hover

Data:
- `blog_posts`

---

### 8) Blog post detail — `/{locale}/blog/{postSlug}`
Reference example: https://flowproductions.pt/o-marketing-ja-mudou-a-tua-marca-acompanhou/

Structure:
- Category label (e.g., “Flow Blog”)
- H1 title
- Author + date
- Body content
- Optional: likes, prev/next, related posts

Animation:
- Reading-progress or subtle header stickiness (if present)
- Content reveals (only if it matches live)

Data:
- `blog_posts`, tags relations

---

### 9) Contact — `/{locale}/contactos`
Reference: https://flowproductions.pt/contacte-nos/

Requirements:
- Contact details
- Contact form:
  - name
  - email
  - message
  - consent checkbox (store consent + timestamp)
- On submit:
  - Store in `contact_messages`
  - Send SendGrid email to internal inbox
  - Optional user auto-reply

Animation:
- Form focus/validation micro-interactions
- Button loading state

---

## Component library (build once, reuse everywhere)

Layout:
- `Header`
  - `MainNav`
  - `ProjectsDropdown`
  - `LocaleSwitcher` (PT/EN/FR)
  - `MobileMenu`
- `Footer`
- `NewsletterInline`
- `CookieConsent` (if required)

Sections:
- `Hero`
- `SectionHeading`
- `ServiceCard`, `ServicesGrid`
- `TestimonialCarousel` or `TestimonialsGrid` (match live)
- `ProjectCard`, `ProjectGrid`
- `FilterBar` (chips + search)
- `ContentRenderer` (MDX/Markdown/blocks)
- `ShareButtons` (optional)

Forms:
- `ContactForm` (Zod validation)
- `NewsletterForm`

Admin:
- `AdminShell`
- `DataTable`
- `MediaUploader`
- `ProjectEditor`, `PostEditor`
- `AuthGuard`, `RoleGate`

---

## Supabase data model (localized content via jsonb)

**Localization strategy:** store localized strings in `jsonb`:
- `title: { "pt": "...", "en": "...", "fr": "..." }`
- `slug: { "pt": "...", "en": "...", "fr": "..." }`
- `content/excerpt/summary` similarly

### Tables

`profiles`
- `id uuid` PK (auth.users)
- `email text`
- `role text` enum: `admin | editor`
- `created_at timestamptz`

`services`
- `id uuid`
- `key text` (design/marketing/audiovisual/animacao)
- `title jsonb`
- `subtitle jsonb`
- `order int`

`service_items`
- `id uuid`
- `service_id uuid` FK
- `label jsonb`
- `order int`

`team_members`
- `id uuid`
- `name text`
- `role_title jsonb`
- `order int`
- `photo_path text`
- `is_active bool`

`testimonials`
- `id uuid`
- `quote jsonb`
- `person_name text`
- `company_name text`
- `avatar_path text`
- `order int`
- `is_featured bool`

`project_categories`
- `id uuid`
- `key text` (design|marketing|audiovisual|animacao|social)
- `title jsonb`
- `intro jsonb`
- `order int`

`project_category_sections`
- `id uuid`
- `category_id uuid` FK
- `title jsonb`
- `order int`

`projects`
- `id uuid`
- `title jsonb`
- `slug jsonb`
- `summary jsonb`
- `content jsonb`
- `client_name text`
- `year_label jsonb`
- `published_at timestamptz`
- `featured_image_path text`
- `gallery jsonb` (array of paths)
- `is_featured bool`
- `status text` enum: `draft|published`

`project_tags`
- `id uuid`
- `key text`
- `label jsonb`

`project_project_tags`
- `project_id uuid`
- `tag_id uuid`

`category_section_projects`
- `category_section_id uuid`
- `project_id uuid`
- `order int`

`blog_posts`
- `id uuid`
- `title jsonb`
- `slug jsonb`
- `excerpt jsonb`
- `content jsonb`
- `featured_image_path text`
- `author_name text` default 'Flow Productions'
- `published_at timestamptz`
- `status text` enum: `draft|published`

`blog_tags`, `blog_post_tags`
- same pattern as projects

`newsletter_subscribers`
- `id uuid`
- `email text` unique
- `locale text`
- `status text` enum: `pending|active|unsubscribed`
- `consent_at timestamptz`
- `source text`
- `created_at timestamptz`

`contact_messages`
- `id uuid`
- `name text`
- `email text`
- `message text`
- `locale text`
- `consent bool`
- `consent_at timestamptz`
- `created_at timestamptz`
- `status text` enum: `new|replied|archived`

---

## Storage (Supabase Storage)

Buckets:
- `public-media` (public read): blog/project/team images

Path conventions:
- `projects/{projectId}/featured.webp`
- `projects/{projectId}/gallery/{n}.webp`
- `blog/{postId}/featured.webp`
- `team/{memberId}.webp`

---

## Auth (JWT + HTTP-only cookies)

Approach:
- Use Supabase Auth to issue JWTs
- Store session in **HTTP-only cookies** for SSR support
- Protect `/admin/**` via middleware + server-side checks

Roles:
- `admin` and `editor`
- Only `admin` can publish; `editor` drafts

RLS:
- Public can select `published` only
- Auth users can CRUD based on role
- Storage policies aligned with roles

---

## next-intl (PT/EN/FR)

Locales:
- `pt` default
- `en`
- `fr`

Routing:
- Always locale prefix, redirect `/` → `/pt`

Slugs:
- `slug->>locale` used for lookups
- Build helpers to resolve slug per locale

---

## SendGrid

Use SendGrid for:
- Contact form → internal email
- Newsletter subscription (double opt-in recommended)

Endpoints:
- `POST /api/contact`:
  - validate → insert `contact_messages` → send email
- `POST /api/newsletter/subscribe`:
  - upsert subscriber → send confirm email (token link)

Security:
- rate limit + honeypot field

---

## Google Analytics 4

- Add GA script in `/{locale}/layout.tsx`
- Track conversions:
  - contact submit
  - newsletter subscribe
  - optional: project click or CTA click events

---

## SEO

- `generateMetadata` for pages
- OG image uses featured images for posts/projects
- `sitemap.xml` includes:
  - static routes per locale
  - published posts/projects per locale slug
- `robots.txt` disallow `/admin`

---

## Recommended project structure

```txt
app/
  [locale]/
    (site)/
      layout.tsx
      page.tsx
      sobre-nos/page.tsx
      servicos/page.tsx
      projetos/page.tsx
      projetos/[category]/page.tsx
      projetos/p/[slug]/page.tsx
      blog/page.tsx
      blog/[slug]/page.tsx
      contactos/page.tsx
    admin/
      layout.tsx
      login/page.tsx
      page.tsx
      projects/page.tsx
      posts/page.tsx
      media/page.tsx
      team/page.tsx
      testimonials/page.tsx
  api/
    contact/route.ts
    newsletter/subscribe/route.ts
    revalidate/route.ts
middleware.ts

lib/
  supabase/
    server.ts
    client.ts
  i18n.ts
  seo.ts

components/
  layout/
  sections/
  ui/
  admin/

messages/
  pt.json
  en.json
  fr.json
```

Env vars:
```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SENDGRID_API_KEY=
CONTACT_INBOX_EMAIL=
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
NEXT_PUBLIC_SITE_URL=
```

---

## Milestones & checklist

Milestone 1 — Foundations
- [ ] Next.js + Tailwind + next-intl
- [ ] Base layout (Header/Footer) with animations
- [ ] Supabase SSR setup (cookies)
- [ ] GA4 installed

Milestone 2 — Public pages (match layout + animation)
- [ ] Home/About/Services/Projects/Blog/Contact pages
- [ ] Reusable components + motion patterns
- [ ] Mock data wired to components

Milestone 3 — Supabase integration
- [ ] Tables + RLS + Storage buckets/policies
- [ ] Real queries replace mocks

Milestone 4 — Admin
- [ ] Login + role gating
- [ ] CRUD for projects/posts/team/testimonials
- [ ] Publish workflow

Milestone 5 — Email + forms
- [ ] SendGrid contact route
- [ ] Newsletter route (double opt-in)
- [ ] Store consent + timestamp

Milestone 6 — SEO + launch
- [ ] Sitemap/robots + metadata
- [ ] Redirect map from legacy routes
- [ ] Final QA: mobile, performance, accessibility

---

## Cursor task prompts (copy/paste)

1. **Scaffold**
   - “Create a Next.js 14 App Router project with TypeScript + Tailwind + next-intl (pt/en/fr), locale-prefixed routes, and a Header/Footer matching https://flowproductions.pt/ including dropdown + mobile menu animations.”

2. **Animation system**
   - “Add Framer Motion + reduced-motion support and implement shared scroll-reveal utilities that match the live site’s section animations.”

3. **Supabase SSR + auth**
   - “Integrate Supabase for SSR, store auth in HTTP-only cookies, add middleware to protect /admin routes, and implement role checks (admin/editor).”

4. **Public pages**
   - “Build Home/About/Services/Projects/Blog/Contact with reusable components and mock data, matching section order and animations from https://flowproductions.pt/.”

5. **DB schema**
   - “Create Supabase schema + RLS + Storage for projects, blog, services, team, testimonials, newsletter, and contact messages using jsonb localized fields.”

6. **Replace mock data**
   - “Swap mock content for Supabase queries in Server Components; implement caching and revalidate strategy for published content.”

7. **Admin CRUD**
   - “Build admin dashboard with CRUD for projects/posts/team/testimonials + media upload to Supabase Storage; include publish workflow.”

8. **SendGrid + GA4 events**
   - “Implement /api/contact and /api/newsletter/subscribe with validation + rate limiting; add GA4 conversion events for submits.”

---

## Acceptance criteria

- Visual parity with https://flowproductions.pt/ (layout, spacing, typography)
- Behavioral parity (animations, hover states, menu behavior)
- Multi-language working end-to-end
- Admin can manage and publish content
- Forms deliver email and persist to DB with consent

---
