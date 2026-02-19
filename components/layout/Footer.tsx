'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Flow Productions</h3>
            <p className="text-sm text-gray-400">{t('address')}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contactos</h4>
            <div className="space-y-2 text-sm">
              <p>
                <a
                  href={`mailto:${t('email')}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('email')}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${t('phone')}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t('phone')}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Siga-nos</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/flowproductions.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/flowproductions.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/flow-productions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/@flowproductions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">{t('rights')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contactos"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Contactos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
