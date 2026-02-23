'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { createPost, updatePost, deletePost, toggleStatus } from './actions';

type Post = {
  id: string;
  title: { pt?: string; en?: string };
  slug: { pt?: string };
  excerpt?: { pt?: string };
  author_name?: string;
  status: string;
  media_type?: string;
  video_url?: string;
  featured_image_path?: string;
  published_at?: string;
  created_at: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getYoutubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  return null;
}

export default function PostsManager({ posts: initialPosts }: { posts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Form state
  const [titlePt, setTitlePt] = useState('');
  const [slug, setSlug] = useState('');
  const [excerptPt, setExcerptPt] = useState('');
  const [authorName, setAuthorName] = useState('Flow Productions');
  const [status, setStatus] = useState('draft');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [videoUrl, setVideoUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  function openCreate() {
    setEditingPost(null);
    setTitlePt('');
    setSlug('');
    setExcerptPt('');
    setAuthorName('Flow Productions');
    setStatus('draft');
    setMediaType('image');
    setVideoUrl('');
    setImagePreview(null);
    setSlugManuallyEdited(false);
    setError('');
    setPanelOpen(true);
  }

  function openEdit(post: Post) {
    setEditingPost(post);
    setTitlePt(post.title?.pt || '');
    setSlug(post.slug?.pt || '');
    setExcerptPt(post.excerpt?.pt || '');
    setAuthorName(post.author_name || 'Flow Productions');
    setStatus(post.status);
    setMediaType((post.media_type as 'image' | 'video') || 'image');
    setVideoUrl(post.video_url || '');
    setImagePreview(post.featured_image_path || null);
    setSlugManuallyEdited(true);
    setError('');
    setPanelOpen(true);
  }

  function handleTitleChange(val: string) {
    setTitlePt(val);
    if (!slugManuallyEdited) setSlug(slugify(val));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titlePt.trim()) { setError('O título é obrigatório.'); return; }
    setError('');

    const fd = new FormData(formRef.current!);

    startTransition(async () => {
      try {
        if (editingPost) {
          await updatePost(editingPost.id, fd);
          setPosts(prev => prev.map(p =>
            p.id === editingPost.id
              ? { ...p, title: { pt: titlePt }, slug: { pt: slug }, excerpt: { pt: excerptPt }, author_name: authorName, status, media_type: mediaType, video_url: mediaType === 'video' ? videoUrl : undefined }
              : p
          ));
        } else {
          await createPost(fd);
        }
        setPanelOpen(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deletePost(id);
        setPosts(prev => prev.filter(p => p.id !== id));
        setConfirmDelete(null);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erro ao eliminar.');
      }
    });
  }

  function handleToggle(post: Post) {
    startTransition(async () => {
      try {
        await toggleStatus(post.id, post.status);
        setPosts(prev => prev.map(p =>
          p.id === post.id
            ? { ...p, status: p.status === 'published' ? 'draft' : 'published' }
            : p
        ));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Erro ao atualizar estado.');
      }
    });
  }

  const ytThumb = mediaType === 'video' && videoUrl ? getYoutubeThumbnail(videoUrl) : null;

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          + Novo Post
        </button>
      </div>

      {error && !panelOpen && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Autor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.length > 0 ? posts.map(post => {
              const title = post.title?.pt || post.title?.en || 'Sem título';
              return (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {post.author_name || 'Flow Productions'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${post.media_type === 'video' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                      {post.media_type === 'video' ? '▶ Vídeo' : '🖼 Imagem'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggle(post)}
                      disabled={isPending}
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-colors ${post.status === 'published' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                    >
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(post.published_at || post.created_at).toLocaleDateString('pt-PT')}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                    <button onClick={() => openEdit(post)} className="text-black hover:text-gray-600 transition-colors">
                      Editar
                    </button>
                    <button onClick={() => setConfirmDelete(post.id)} className="text-red-600 hover:text-red-900 transition-colors">
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                  Nenhum post encontrado. Crie o primeiro!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold mb-2">Eliminar post?</h3>
            <p className="text-sm text-gray-600 mb-6">Esta ação não pode ser revertida.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                disabled={isPending}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isPending ? 'A eliminar...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {panelOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="flex-1 bg-black/30" onClick={() => setPanelOpen(false)} />
          <div className="w-full max-w-xl bg-white shadow-2xl flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">
                {editingPost ? 'Editar Post' : 'Novo Post'}
              </h2>
              <button onClick={() => setPanelOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="flex-1 flex flex-col px-6 py-6 gap-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  name="title_pt"
                  value={titlePt}
                  onChange={e => handleTitleChange(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Título do artigo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={slug}
                  onChange={e => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="gerado-automaticamente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resumo</label>
                <textarea
                  name="excerpt_pt"
                  value={excerptPt}
                  onChange={e => setExcerptPt(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  placeholder="Breve descrição do artigo..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                <input
                  type="text"
                  name="author_name"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de média</label>
                <input type="hidden" name="media_type" value={mediaType} />
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMediaType('image')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${mediaType === 'image' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    🖼 Imagem
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaType('video')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${mediaType === 'video' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    ▶ Vídeo
                  </button>
                </div>
              </div>

              {mediaType === 'image' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagem de capa</label>
                  {imagePreview && (
                    <div className="mb-2 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                </div>
              )}

              {mediaType === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL do vídeo (YouTube / Vimeo)</label>
                  <input
                    type="url"
                    name="video_url"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  {ytThumb && (
                    <div className="mt-2 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img src={ytThumb} alt="thumbnail" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <div className="flex gap-4">
                  {(['draft', 'published'] as const).map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={s}
                        checked={status === s}
                        onChange={() => setStatus(s)}
                        className="accent-black"
                      />
                      <span className="text-sm">{s === 'draft' ? 'Rascunho' : 'Publicado'}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 mt-auto flex gap-3">
                <button
                  type="button"
                  onClick={() => setPanelOpen(false)}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {isPending ? 'A guardar...' : editingPost ? 'Guardar alterações' : 'Criar post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
