// Flat ESLint config (ESLint 9). `next lint` was removed in Next 16 — the old
// "lint": "next lint" script had been failing silently since the upgrade, so
// nothing was linted. eslint-config-next v16 ships flat configs natively.
import next from 'eslint-config-next'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const config = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'logs/**',
      'media-originals/**',
      'public/**',
      'scripts/**', // plain Node build scripts, not app code
      'next-env.d.ts',
    ],
  },
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Owner-authored editorial copy: literal apostrophes/quotes in JSX text
      // are the norm across this site.
      'react/no-unescaped-entities': 'off',
      // Deliberate architecture: static export (images.unoptimized) with
      // hand-rolled <picture> + pre-generated -mobile/-thumb variants.
      // next/image adds nothing here — documented in CLAUDE.md.
      '@next/next/no-img-element': 'off',
      // Allow the `({ omitted, ...rest })` idiom and _-prefixed intentional unused
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }],
    },
  },
]

export default config
