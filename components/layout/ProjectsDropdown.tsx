'use client';

import { Link } from '@/i18n/routing';

const projectCategories = [
  { key: 'design', label: 'Design' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'audiovisual', label: 'Audiovisual' },
  { key: 'animacao', label: 'Animação' },
  { key: 'projetos-sociais', label: 'Projetos Sociais' },
];

export default function ProjectsDropdown({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
      {projectCategories.map((category) => (
        <Link
          key={category.key}
          href={`/projetos/${category.key}`}
          className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}
