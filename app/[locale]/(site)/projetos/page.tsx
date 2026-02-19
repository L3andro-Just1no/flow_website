import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const supabase = await createClient();

  let projects = null;

  if (supabase) {
    try {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      projects = data;
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  return (
    <div className="pt-16">
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-16">
            Projetos
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects && projects.length > 0 ? (
              projects.map((project) => {
                const title = project.title[locale] || project.title['pt'] || 'Untitled';
                return (
                  <div key={project.id} className="group cursor-pointer">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      {project.featured_image_path && (
                        <img
                          src={project.featured_image_path}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    {project.client_name && (
                      <p className="text-gray-600">{project.client_name}</p>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Nenhum projeto disponível ainda.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
