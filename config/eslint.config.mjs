import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {'@stylistic': stylistic},
    rules: {
      ...stylistic.configs['all-flat'].rules,
      '@stylistic/object-curly-spacing': ['error', 'always'] ,
      // '@stylistic/object-curly-newline': ['error', 'always'] ,
      '@stylistic/function-call-argument-newline': ["error", "consistent"],
      '@stylistic/object-property-newline': ["error", { "allowAllPropertiesOnSameLine": true }],
      '@stylistic/indent': [
        'error',
        2
      ],
      '@stylistic/array-bracket-newline': [
        'error',
        'consistent'
      ],
      'object-curly-newline': ['error',
        {
          multiline: true,
          minProperties: 3
        }],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 1
        }
      ],
      '@stylistic/comma-spacing': [
        'error',
        {
          after: true,
          before: false
        }
      ],
      '@stylistic/padded-blocks': [
        'error',
        {
          blocks: 'never',
          classes: 'always'
        }
      ],
      '@stylistic/quote-props': ['error',
        'as-needed'],
      '@stylistic/quotes': ['error',
        'single']
    }
  }
];
