'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function MainNav() {
  const t = useTranslations('nav');

  return (
    <nav className="flex items-center space-x-8">
      <Link
        href="/"
        className="text-sm font-medium hover:text-gray-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full"
      >
        {t('home')}
      </Link>
      <Link
        href="/sobre-nos"
        className="text-sm font-medium hover:text-gray-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full"
      >
        {t('about')}
      </Link>
      <Link
        href="/servicos"
        className="text-sm font-medium hover:text-gray-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full"
      >
        {t('services')}
      </Link>
      <Link
        href="/projetos"
        className="text-sm font-medium hover:text-gray-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full"
      >
        {t('projects')}
      </Link>
      <Link
        href="/blog"
        className="text-sm font-medium hover:text-gray-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full"
      >
        {t('blog')}
      </Link>
    </nav>
  );
}
