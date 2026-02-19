'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LocaleSwitcher from './LocaleSwitcher';

export default function MobileMenu({
  isOpen,
  onClose,
  locale,
}: {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}) {
  const t = useTranslations('nav');

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 top-16 bg-white z-40 p-6">
      <nav className="flex flex-col space-y-4">
        <Link
          href="/"
          onClick={onClose}
          className="text-lg font-medium hover:text-gray-600 transition-colors"
        >
          {t('home')}
        </Link>
        <Link
          href="/sobre-nos"
          onClick={onClose}
          className="text-lg font-medium hover:text-gray-600 transition-colors"
        >
          {t('about')}
        </Link>
        <Link
          href="/servicos"
          onClick={onClose}
          className="text-lg font-medium hover:text-gray-600 transition-colors"
        >
          {t('services')}
        </Link>

        <div>
          <Link
            href="/projetos"
            onClick={onClose}
            className="text-lg font-medium hover:text-gray-600 transition-colors block mb-2"
          >
            {t('projects')}
          </Link>
          <div className="pl-4 space-y-2">
            <Link
              href="/projetos/design"
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-black block"
            >
              Design
            </Link>
            <Link
              href="/projetos/marketing"
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-black block"
            >
              Marketing
            </Link>
            <Link
              href="/projetos/audiovisual"
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-black block"
            >
              Audiovisual
            </Link>
            <Link
              href="/projetos/animacao"
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-black block"
            >
              Animação
            </Link>
            <Link
              href="/projetos/projetos-sociais"
              onClick={onClose}
              className="text-sm text-gray-600 hover:text-black block"
            >
              Projetos Sociais
            </Link>
          </div>
        </div>

        <Link
          href="/blog"
          onClick={onClose}
          className="text-lg font-medium hover:text-gray-600 transition-colors"
        >
          {t('blog')}
        </Link>
        <Link
          href="/contactos"
          onClick={onClose}
          className="text-lg font-medium hover:text-gray-600 transition-colors"
        >
          {t('contact')}
        </Link>

        <div className="pt-4 border-t border-gray-200">
          <LocaleSwitcher locale={locale} />
        </div>
      </nav>
    </div>
  );
}
