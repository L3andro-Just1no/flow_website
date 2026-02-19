'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function NewsletterInline() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">{t('title')}</h3>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            required
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {t('submit')}
          </button>
        </form>
        {status === 'success' && (
          <p className="mt-4 text-green-600">{t('success')}</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600">{t('error')}</p>
        )}
      </div>
    </div>
  );
}
