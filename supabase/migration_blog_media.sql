-- Add media type fields to blog_posts
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS media_type text DEFAULT 'image' CHECK (media_type IN ('image', 'video'));
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS video_url text;

-- Allow admins and editors to fully manage blog posts
CREATE POLICY "Admins and editors can manage blog posts"
  ON blog_posts FOR ALL
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'editor')
    )
  )
  WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'editor')
    )
  );
