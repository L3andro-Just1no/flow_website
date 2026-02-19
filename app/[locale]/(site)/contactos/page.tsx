'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { AnimateIn } from '@/components/ui/AnimateIn';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', consent: false });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-16">
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
              {t('title')}
            </h1>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <AnimateIn delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold mb-6">Contactos</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">Endereço</h3>
                    <p className="text-gray-700">
                      Edifício Ualg Tec, Campus da Penha<br />
                      8005-139 Faro
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:info@flowproductions.pt"
                      className="text-gray-700 hover:text-black transition-colors"
                    >
                      info@flowproductions.pt
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefone</h3>
                    <a
                      href="tel:+351910814616"
                      className="text-gray-700 hover:text-black transition-colors"
                    >
                      +351 910 814 616
                    </a>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.4}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label={t('form.name')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  label={t('form.email')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Textarea
                  label={t('form.message')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                />
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    required
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-700">
                    {t('form.consent')}
                  </label>
                </div>
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full"
                >
                  {status === 'loading' ? 'A enviar...' : t('form.submit')}
                </Button>

                {status === 'success' && (
                  <p className="text-green-600 text-center">{t('form.success')}</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600 text-center">{t('form.error')}</p>
                )}
              </form>
            </AnimateIn>
          </div>
        </div>
      </section>
    </div>
  );
}
