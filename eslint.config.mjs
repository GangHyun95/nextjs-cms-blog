import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      quotes: ['warn', 'single', { allowTemplateLiterals: true }],
      'jsx-quotes': ['warn', 'prefer-single'],
      'import/order': [
        'warn',
        {
          groups: [
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          'newlines-between': 'always-and-inside-groups',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];

export default eslintConfig;
