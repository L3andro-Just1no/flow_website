import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  let projectsCount = 0;
  let postsCount = 0;
  let messagesCount = 0;

  if (supabase) {
    try {
      const [projectsResult, postsResult, messagesResult] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
      ]);

      projectsCount = projectsResult.count || 0;
      postsCount = postsResult.count || 0;
      messagesCount = messagesResult.count || 0;
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  const stats = [
    { name: 'Projetos', count: projectsCount },
    { name: 'Posts no Blog', count: postsCount },
    { name: 'Mensagens', count: messagesCount },
  ];

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm font-medium">{stat.name}</h3>
            <p className="text-3xl font-bold mt-2">{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href={`/${locale}/admin/projects`}
            className="p-4 border border-gray-200 rounded-lg hover:border-black transition-colors"
          >
            <h3 className="font-semibold mb-1">Gerir Projetos</h3>
            <p className="text-sm text-gray-600">Criar, editar e publicar projetos</p>
          </a>
          <a
            href={`/${locale}/admin/posts`}
            className="p-4 border border-gray-200 rounded-lg hover:border-black transition-colors"
          >
            <h3 className="font-semibold mb-1">Gerir Blog</h3>
            <p className="text-sm text-gray-600">Criar e publicar artigos no blog</p>
          </a>
          <a
            href={`/${locale}/admin/team`}
            className="p-4 border border-gray-200 rounded-lg hover:border-black transition-colors"
          >
            <h3 className="font-semibold mb-1">Gerir Equipa</h3>
            <p className="text-sm text-gray-600">Adicionar e editar membros da equipa</p>
          </a>
          <a
            href={`/${locale}/admin/media`}
            className="p-4 border border-gray-200 rounded-lg hover:border-black transition-colors"
          >
            <h3 className="font-semibold mb-1">Biblioteca de Média</h3>
            <p className="text-sm text-gray-600">Fazer upload e gerir imagens</p>
          </a>
        </div>
      </div>
    </div>
  );
}
