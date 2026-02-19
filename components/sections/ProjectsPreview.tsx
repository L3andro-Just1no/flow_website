'use client';

import { Link } from '@/i18n/routing';
import { AnimateIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimateIn';
import { HoverLift } from '@/components/ui/AnimateIn';

interface Project {
  id: string;
  title: Record<string, string>;
  slug: Record<string, string>;
  featured_image_path?: string;
  client_name?: string;
}

interface ProjectsPreviewProps {
  projects: Project[];
  locale: string;
}

export default function ProjectsPreview({ projects, locale }: ProjectsPreviewProps) {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <AnimateIn>
          <div className="text-center mb-4">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
              Trabalhos que falam por si
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Projetos com Flow
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Do conceito à execução, fazemos as ideias ganhar forma e movimento. Este é o nosso portfólio de projetos, onde design, marketing, audiovisual e animação ganham vida.
            </p>
          </div>
        </AnimateIn>

        {projects.length > 0 ? (
          <>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.slice(0, 6).map((project) => {
                const title = project.title[locale] || project.title['pt'];
                const slug = project.slug[locale] || project.slug['pt'];

                return (
                  <StaggerItem key={project.id}>
                    <HoverLift>
                      <Link href={`/projetos/p/${slug}`}>
                        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                          <div className="aspect-video bg-gray-200 relative overflow-hidden">
                            {project.featured_image_path ? (
                              <img
                                src={project.featured_image_path}
                                alt={title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg
                                  className="w-16 h-16"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{title}</h3>
                            {project.client_name && (
                              <p className="text-gray-600 text-sm">{project.client_name}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    </HoverLift>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <AnimateIn delay={0.4}>
              <div className="text-center">
                <Link href="/projetos">
                  <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                    Ver Mais
                  </button>
                </Link>
              </div>
            </AnimateIn>
          </>
        ) : (
          <AnimateIn>
            <div className="text-center py-12">
              <p className="text-gray-500">Em breve, novos projetos...</p>
            </div>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
