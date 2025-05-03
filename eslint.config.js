import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      next: nextPlugin
    },
    rules: {
      'next/no-img-element': 'off',
      // Add any other custom rules you want here
    }
  }
];