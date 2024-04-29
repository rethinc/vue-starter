import eslintJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginVue from 'eslint-plugin-vue'
import typescriptEslint from 'typescript-eslint'

export default typescriptEslint.config(
  eslintJs.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],

  {
    plugins: {
      'typescript-eslint': typescriptEslint.plugin,
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    languageOptions: {
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
  },
  {
    ignores: ['dist/*'],
  },
  eslintPluginPrettierRecommended
)
