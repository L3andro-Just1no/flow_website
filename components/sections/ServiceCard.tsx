'use client';

import { StaggerItem, StaggerContainer } from '@/components/ui/AnimateIn';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  key: string;
  title: Record<string, string>;
  order: number;
  service_items: Array<{
    id: string;
    label: Record<string, string>;
    order: number;
  }>;
}

interface ServiceCardProps {
  service: Service;
  locale: string;
  number: string;
}

export default function ServiceCard({ service, locale, number }: ServiceCardProps) {
  const title = service.title[locale] || service.title['pt'] || service.key;
  const sortedItems = [...service.service_items].sort((a, b) => a.order - b.order);

  return (
    <StaggerItem>
      <motion.div
        className="group"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <div className="border-l-4 border-black pl-6 py-4">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-5xl md:text-6xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">
              {number}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          </div>

          <StaggerContainer
            className="space-y-3"
            staggerDelay={0.05}
          >
            {sortedItems.map((item) => {
              const label = item.label[locale] || item.label['pt'] || '';
              return (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  {label}
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </motion.div>
    </StaggerItem>
  );
}
