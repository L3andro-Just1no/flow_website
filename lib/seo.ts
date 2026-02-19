import type { Metadata } from 'next';

export function getSEOConfig(locale: string): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flowproductions.pt';
  
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'Flow Productions',
      template: '%s | Flow Productions',
    },
    description: 'Criatividade em movimento',
    keywords: ['design', 'marketing', 'audiovisual', 'animação', 'flow productions'],
    authors: [{ name: 'Flow Productions' }],
    creator: 'Flow Productions',
    publisher: 'Flow Productions',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: siteUrl,
      siteName: 'Flow Productions',
      title: 'Flow Productions',
      description: 'Criatividade em movimento',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Flow Productions',
      description: 'Criatividade em movimento',
      creator: '@flowproductions',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
