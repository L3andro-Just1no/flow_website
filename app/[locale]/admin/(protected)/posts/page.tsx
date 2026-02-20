import { createClient } from '@/lib/supabase/server';
import PostsManager from './PostsManager';

export default async function AdminPostsPage() {
  const supabase = await createClient();

  let posts: any[] = [];

  if (supabase) {
    try {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      posts = data || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  return <PostsManager posts={posts} />;
}
