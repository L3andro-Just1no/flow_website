import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flowproductions.pt';
  const locales = ['pt', 'en', 'fr'];
  const routes = ['', 'sobre-nos', 'servicos', 'projetos', 'blog', 'contactos'];

  const staticUrls: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}/${locale}${route ? `/${route}` : ''}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  return staticUrls;
}
