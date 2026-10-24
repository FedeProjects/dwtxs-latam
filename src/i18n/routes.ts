import type { Category } from '../content/specs';
import type { Lang } from './ui';

/** Localized URL segments (PROJECT_SPEC §6.2). Model slugs are language-neutral. */
export const routes = {
  pt: {
    machines: 'maquinas',
    accessories: 'acessorios',
    about: 'sobre-nos',
    contact: 'contato',
  },
  es: {
    machines: 'maquinas',
    accessories: 'accesorios',
    about: 'sobre-nosotros',
    contact: 'contacto',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type Page = keyof (typeof routes)['pt'];

export const categorySegments: Record<Lang, Record<Category, string>> = {
  pt: { conventional: 'convencional', 'maxi-rig': 'maxi-rig', 'all-terrain': 'all-terrain' },
  es: { conventional: 'convencional', 'maxi-rig': 'maxi-rig', 'all-terrain': 'all-terrain' },
};
