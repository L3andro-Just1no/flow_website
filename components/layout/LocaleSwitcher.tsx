'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

const locales = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
];

export default function LocaleSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="flex items-center space-x-2">
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => onSelectChange(loc.code)}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            locale === loc.code
              ? 'bg-black text-white'
              : 'text-gray-600 hover:text-black'
          }`}
          disabled={isPending}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}
