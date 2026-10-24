import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES, KEY_SPECS, SPEC_KEYS, SPEC_SECTIONS, SPEC_VALUE_KEYS } from './content/specs';

/**
 * A spec value. Numbers are formatted per locale at render time.
 * - number: `90`
 * - range: `{ range: [13, 19] }` → "13–19"
 * - list: `{ list: [7000, 4500, 2500], sep: '/' }` → "7000 / 4500 / 2500"
 * - string: codes and names that are not translated (`Cummins`, `NC38`, `Ø60 × 3048`)
 */
const specValue = z.union([
  z.number(),
  z.object({ range: z.tuple([z.number(), z.number()]) }),
  z.object({ list: z.array(z.number()).min(2), sep: z.enum(['/', ',', '×']) }),
  z.string().min(1),
]);

const specRow = z
  .object({
    key: z.enum(SPEC_KEYS),
    value: specValue.optional(),
    /** Translated text value; use instead of `value` for words (see SPEC_VALUE_KEYS). */
    valueKey: z.enum(SPEC_VALUE_KEYS).optional(),
    unit: z.string().min(1).optional(),
  })
  .refine((row) => (row.value === undefined) !== (row.valueKey === undefined), {
    message: 'A spec row needs exactly one of `value` or `valueKey`',
  });

const text = z.string().trim().min(1);

const modelText = z.object({
  name: text,
  summary: text,
  description: text,
});

const models = defineCollection({
  // The file name is the slug: ddw10-04.yaml → /maquinas/convencional/ddw10-04/
  loader: glob({ pattern: '*.yaml', base: './src/content/models' }),
  schema: ({ image }) =>
    z.object({
      code: text,
      category: z.enum(CATEGORIES),
      order: z.number().int().positive(),
      featured: z.boolean().default(false),
      /** First image is the main photo; the rest is the gallery (max 6). */
      images: z.array(image()).min(1).max(7),
      keySpecs: z
        .array(
          z.object({
            key: z.enum(KEY_SPECS),
            value: z.union([z.number(), z.string().min(1)]),
            unit: z.string().min(1),
          }),
        )
        .min(1),
      specSheet: z
        .array(z.object({ section: z.enum(SPEC_SECTIONS), rows: z.array(specRow).min(1) }))
        .min(1),
      /** Internal notes for the client review (source conflicts, missing data). Not rendered. */
      reviewNotes: z.array(text).default([]),
      i18n: z.object({ pt: modelText, es: modelText }),
    }),
});

const accessoryText = z.object({
  name: text,
  summary: text,
  description: text,
  highlights: z.array(text).min(1),
});

const accessories = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/accessories' }),
  schema: ({ image }) =>
    z.object({
      order: z.number().int().positive(),
      images: z.array(image()).min(1).max(7),
      reviewNotes: z.array(text).default([]),
      i18n: z.object({ pt: accessoryText, es: accessoryText }),
    }),
});

/** Long-form page texts, one Markdown file per page and language: about.pt.md, about.es.md… */
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    page: z.enum(['about', 'all-terrain']),
    lang: z.enum(['pt', 'es']),
    title: text,
    description: text,
    reviewNotes: z.array(text).default([]),
  }),
});

export const collections = { models, accessories, pages };
