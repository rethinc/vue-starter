import eslintJs from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import eslintPluginVue from "eslint-plugin-vue";

export default typescriptEslint.config(
    eslintJs.configs.recommended,
    ...typescriptEslint.configs.recommended,
    ...eslintPluginVue.configs['flat/recommended'],
    {
        plugins: {
            'typescript-eslint': typescriptEslint.plugin,
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