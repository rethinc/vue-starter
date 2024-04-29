import eslintJs from "@eslint/js";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginVue from "eslint-plugin-vue";
import typescriptEslint from "typescript-eslint";

export default typescriptEslint.config(
    eslintJs.configs.recommended,
    ...typescriptEslint.configs.recommended,
    ...eslintPluginVue.configs['flat/recommended'],
    {
        plugins: {
            'typescript-eslint': typescriptEslint.plugin,
            'simple-import-sort': eslintPluginSimpleImportSort
        },
        rules: {
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
        },
        languageOptions: {
            parserOptions: {
                parser: typescriptEslint.parser,
                project: './tsconfig.json',
                extraFileExtensions: ['.vue'],
                sourceType: 'module',
            },
        },
    },
    {
        ignores:['dist/*']
    }
);