# Image and Video Placeholders Update

## Changes Made

### 1. Home Page Hero Section (`app/[locale]/(site)/page.tsx`)

**Added:**
- Full-screen background video placeholder with play icon
- Dark overlay for text readability
- Updated text colors to white for contrast against video background
- Changed CTA button to white background with black text
- Commented-out video element ready for when actual video is available

**Video placeholder location:**
```
/videos/hero-video.mp4
```

**To add the real video:**
1. Place your video file in `public/videos/hero-video.mp4`
2. Uncomment the `<video>` element in the hero section
3. Remove or reduce the placeholder div

### 2. Projects Preview Section (`components/sections/ProjectsPreview.tsx`)

**Already implemented:**
- Image placeholders for project thumbnails
- SVG icon showing when no featured image is available
- Responsive aspect-ratio container (16:9)

### 3. Testimonials Carousel (`components/sections/TestimonialCarousel.tsx`)

**Added:**
- Avatar placeholder with user icon
- Circular avatar display (64px)
- Falls back to placeholder when `avatar_path` is not provided
- Supports both placeholder and actual avatar images

## Placeholder Styling

All placeholders use:
- Gray backgrounds (`bg-gray-200`, `bg-gray-800`, `bg-gray-900`)
- SVG icons in appropriate sizes
- Smooth transitions for hover states
- Responsive sizing

## Next Steps

To replace placeholders with actual content:

1. **Hero Video:**
   - Add video file to `public/videos/hero-video.mp4`
   - Uncomment the video element in `app/[locale]/(site)/page.tsx`
   - Recommended formats: MP4 (H.264), WebM for better browser support
   - Optimize video for web (compress, reduce file size)

2. **Project Images:**
   - Upload images via Supabase Storage or admin panel
   - Update `featured_image_path` in the projects table
   - Recommended size: 1280x720px (16:9 aspect ratio)

3. **Testimonial Avatars:**
   - Upload avatar images via Supabase Storage
   - Update `avatar_path` in the testimonials table
   - Recommended size: 256x256px (square)

## Visual Indicators

All placeholders have clear visual indicators:
- 📹 Video: Play icon with "Hero Video Placeholder" text
- 🖼️ Images: Image icon (photo frame)
- 👤 Avatars: User silhouette icon
