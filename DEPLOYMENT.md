# Flow Productions - Deployment Guide

## Pre-Deployment Checklist

### ✅ 1. Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Run database schema:
   - Go to SQL Editor in Supabase dashboard
   - Copy and paste contents of `supabase/schema.sql`
   - Execute the script
3. Run seed data:
   - Copy and paste contents of `supabase/seed.sql`
   - Execute the script
4. Configure Storage:
   - Create bucket named `public-media`
   - Set bucket to public
   - Configure storage policies (see schema.sql)

5. Get your credentials:
   - Go to Settings > API
   - Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon/public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### ✅ 2. SendGrid Setup

1. Create account at https://sendgrid.com
2. Create API key with "Mail Send" permissions
3. Verify sender email address
4. Copy API key → `SENDGRID_API_KEY`

### ✅ 3. Google Analytics Setup

1. Create GA4 property at https://analytics.google.com
2. Get Measurement ID (format: G-XXXXXXXXXX)
3. Copy Measurement ID → `NEXT_PUBLIC_GA4_MEASUREMENT_ID`

### ✅ 4. Environment Variables

Set all required variables in your hosting platform:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
SENDGRID_API_KEY=SG.xxx
CONTACT_INBOX_EMAIL=info@flowproductions.pt
NEXT_PUBLIC_SITE_URL=https://flowproductions.pt
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
JWT_SECRET=your-secure-random-string
```

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Import to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables

In Vercel project settings → Environment Variables, add all variables from `.env.local`.

### Step 4: Deploy

Click "Deploy" and wait for deployment to complete.

### Step 5: Configure Custom Domain

1. Go to Settings → Domains
2. Add `flowproductions.pt`
3. Update DNS records as instructed by Vercel:
   - Add A record pointing to Vercel's IP
   - Add CNAME record for `www`

## Post-Deployment Tasks

### ✅ 1. Test All Features

- [ ] Visit site in all languages (PT/EN/FR)
- [ ] Test contact form submission
- [ ] Test newsletter subscription
- [ ] Check admin login at `/admin/login`
- [ ] Verify Google Analytics is tracking

### ✅ 2. Create Admin User

In Supabase dashboard:

1. Go to Authentication → Users
2. Create new user with email/password
3. Go to Table Editor → profiles
4. Insert row:
   ```sql
   INSERT INTO profiles (id, email, role)
   VALUES ('user-uuid-from-auth', 'admin@flowproductions.pt', 'admin');
   ```

### ✅ 3. Add Initial Content

1. Login to admin panel
2. Add team members
3. Add testimonials
4. Create first project
5. Publish first blog post

### ✅ 4. SEO Verification

- [ ] Submit sitemap to Google Search Console: `https://flowproductions.pt/sitemap.xml`
- [ ] Verify robots.txt: `https://flowproductions.pt/robots.txt`
- [ ] Test Open Graph tags with https://www.opengraph.xyz/
- [ ] Check meta tags with https://metatags.io/

### ✅ 5. Performance Audit

Run Lighthouse audit in Chrome DevTools:

```bash
npm run build
npm start
```

Then open Chrome DevTools → Lighthouse → Generate report

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### ✅ 6. Set Up Monitoring

1. **Vercel Analytics** (optional):
   - Enable in Vercel dashboard
   - Track real user metrics

2. **Supabase Logs**:
   - Monitor database queries
   - Check for errors

3. **SendGrid Stats**:
   - Track email delivery rates
   - Monitor bounce rates

## Troubleshooting

### Issue: 500 Error on Contact Form

**Solution**: Check SendGrid API key and verify sender email is authenticated.

### Issue: Images Not Loading

**Solution**: 
1. Verify Supabase Storage bucket is public
2. Check RLS policies on storage.objects
3. Verify image paths in database

### Issue: Admin Login Not Working

**Solution**:
1. Verify Supabase Auth is enabled
2. Check user exists in auth.users table
3. Verify profile has 'admin' or 'editor' role
4. Check middleware is properly configured

### Issue: Translations Not Working

**Solution**:
1. Verify all locale files exist in `messages/`
2. Check `i18n/routing.ts` configuration
3. Ensure middleware is handling locale routing

### Issue: Build Failing

**Solution**:
1. Check TypeScript errors: `npm run build`
2. Verify all environment variables are set
3. Check Next.js and React versions are compatible

## Backup Strategy

### Database Backups

Supabase automatically backs up your database. To manually backup:

1. Go to Supabase Dashboard
2. Database → Backups
3. Download backup or schedule automatic backups

### Storage Backups

For Supabase Storage:

1. Use Supabase CLI to download all files
2. Or use Supabase Management API to automate

### Code Backups

- Code is backed up on GitHub
- Vercel keeps deployment history

## Scaling Considerations

### Database

Supabase Free tier limits:
- 500MB database size
- 1GB file storage
- 2GB bandwidth

Upgrade to Pro when needed.

### Email

SendGrid Free tier:
- 100 emails/day

Monitor usage and upgrade if needed.

### Vercel

Free tier is generous for most sites. Upgrade if:
- High traffic (>100GB bandwidth/month)
- Need advanced features
- Require commercial license

## Maintenance

### Weekly

- [ ] Check contact messages in admin panel
- [ ] Review analytics for insights
- [ ] Monitor error logs in Vercel

### Monthly

- [ ] Update dependencies: `npm update`
- [ ] Review and respond to newsletter subscribers
- [ ] Backup database
- [ ] Check site speed with Lighthouse

### Quarterly

- [ ] Review and update content
- [ ] Check for security updates
- [ ] Audit user permissions
- [ ] Review SEO performance

## Support

For issues or questions:
- Email: info@flowproductions.pt
- Documentation: See README.md
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
