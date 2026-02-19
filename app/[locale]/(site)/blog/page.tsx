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
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      {post.featured_image_path && (
                        <img
                          src={post.featured_image_path}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
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
