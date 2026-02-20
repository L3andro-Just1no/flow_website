import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

function getYoutubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  return null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

function MediaThumbnail({ post, title }: { post: any; title: string }) {
  const isVideo = post.media_type === 'video';

  if (isVideo && post.video_url) {
    const ytThumb = getYoutubeThumbnail(post.video_url);
    return (
      <div className="aspect-video bg-gray-900 rounded-lg mb-4 overflow-hidden relative group-hover:opacity-90 transition-opacity">
        {ytThumb ? (
          <img src={ytThumb} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800" />
        )}
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
      {post.featured_image_path ? (
        <img
          src={post.featured_image_path}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-300">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  let posts = null;

  if (supabase) {
    try {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      posts = data;
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  return (
    <div className="pt-16">
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-16">
            Blog Flow
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts && posts.length > 0 ? (
              posts.map((post) => {
                const title = post.title[locale] || post.title['pt'] || 'Untitled';
                const excerpt = post.excerpt?.[locale] || post.excerpt?.['pt'] || '';

                return (
                  <article key={post.id} className="group cursor-pointer">
                    <MediaThumbnail post={post} title={title} />
                    {post.published_at && (
                      <time className="text-sm text-gray-500">
                        {new Date(post.published_at).toLocaleDateString(locale)}
                      </time>
                    )}
                    <h2 className="text-xl font-bold mt-2 mb-2 group-hover:text-gray-600 transition-colors">
                      {title}
                    </h2>
                    {excerpt && (
                      <p className="text-gray-700 line-clamp-2">{excerpt}</p>
                    )}
                  </article>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Nenhum artigo disponível ainda.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
