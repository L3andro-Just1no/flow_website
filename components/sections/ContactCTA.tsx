'use client';

import { Link } from '@/i18n/routing';
import { AnimateIn } from '@/components/ui/AnimateIn';

export default function ContactCTA() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <AnimateIn>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Vamos pôr os teus projetos a fluir?
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="space-y-4 mb-8 text-gray-600">
            <p>
              <strong>Endereço:</strong><br />
              Edifício Ualg Tec Campus, 8005-139 Faro
            </p>
            <p>
              <strong>Telefone:</strong><br />
              <a
                href="tel:+351910814616"
                className="hover:text-black transition-colors"
              >
                +351 910 814 616
              </a>
            </p>
            <p>
              <strong>Email:</strong><br />
              <a
                href="mailto:info@flowproductions.pt"
                className="hover:text-black transition-colors"
              >
                info@flowproductions.pt
              </a>
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.4}>
          <Link href="/contactos">
            <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Contacta-nos
            </button>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
