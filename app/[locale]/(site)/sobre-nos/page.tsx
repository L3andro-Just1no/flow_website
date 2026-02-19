import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AnimateIn } from '@/components/ui/AnimateIn';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="pt-20">
      {/* Hero Section with Image Placeholder */}
      <section className="relative h-[60vh] bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm uppercase tracking-wider">Hero Image Placeholder</p>
            <p className="text-xs text-gray-400 mt-2">About Us / Team Photo</p>
          </div>
        </div>
        {/* Uncomment when image is ready:
        <img
          src="/images/about-hero.jpg"
          alt="Flow Productions Team"
          className="w-full h-full object-cover"
        />
        */}
      </section>

      {/* History Section - "Onde o Flow Começou" */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-widest text-gray-600 mb-4">
                {t('history.label')}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-12">
                {t('history.title')} <span className="text-gray-300">{t('history.titleHighlight')}</span>
              </h2>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-base md:text-lg">
                {t('history.paragraph1')}
              </p>
              <p className="text-base md:text-lg">
                {t('history.paragraph2')}
              </p>
              <p className="text-base md:text-lg">
                {t('history.paragraph3')}
              </p>
              <p className="text-base md:text-lg">
                {t('history.paragraph4')}
              </p>
              <p className="text-base md:text-lg">
                {t('history.paragraph5')}
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Mission, Vision & Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-widest text-gray-600 mb-4">
                {t('mission.label')}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-12">
                {t('mission.title')} <span className="text-gray-300">{t('mission.titleHighlight')}</span>
              </h2>
            </div>
          </AnimateIn>

          {/* Divider Line */}
          <div className="border-t border-gray-300 mb-16" />

          {/* Mission, Vision, Values Grid */}
          <div className="space-y-16">
            {/* Mission */}
            <AnimateIn delay={0.1}>
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3">
                  <div className="flex items-start gap-6">
                    <span className="text-6xl font-bold text-gray-200">01</span>
                    <h3 className="text-2xl font-bold pt-3">{t('mission.mission.title')}</h3>
                  </div>
                </div>
                <div className="md:col-span-9">
                  <p className="text-gray-700 leading-relaxed">
                    {t('mission.mission.description')}
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* Vision */}
            <AnimateIn delay={0.2}>
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3">
                  <div className="flex items-start gap-6">
                    <span className="text-6xl font-bold text-gray-200">02</span>
                    <h3 className="text-2xl font-bold pt-3">{t('mission.vision.title')}</h3>
                  </div>
                </div>
                <div className="md:col-span-9">
                  <p className="text-gray-700 leading-relaxed">
                    {t('mission.vision.description')}
                  </p>
                </div>
              </div>
            </AnimateIn>

            {/* Values */}
            <AnimateIn delay={0.3}>
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3">
                  <div className="flex items-start gap-6">
                    <span className="text-6xl font-bold text-gray-200">03</span>
                    <h3 className="text-2xl font-bold pt-3">{t('mission.values.title')}</h3>
                  </div>
                </div>
                <div className="md:col-span-9">
                  <p className="text-gray-700 leading-relaxed">
                    {t('mission.values.items')}
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Team Section - 9 Members Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimateIn>
            <div className="text-center mb-16 relative">
              {/* Badge */}
              <div className="inline-block mb-6">
                <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wider leading-tight">FLOW</p>
                    <p className="text-[8px] leading-tight">Creative</p>
                    <p className="text-[8px] leading-tight">Team</p>
                  </div>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                {t('team.title')} <span className="text-gray-300">{t('team.titleHighlight')}</span>
              </h2>
            </div>
          </AnimateIn>

          {/* 3x3 Grid of Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
              <AnimateIn key={index} delay={0.1 * index}>
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative group">
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs">Team Member {index}</p>
                    </div>
                  </div>
                  {/* Uncomment when images are ready:
                  <img
                    src={`/images/team/member-${index}.jpg`}
                    alt={`Team Member ${index}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  */}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
