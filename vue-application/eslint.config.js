import js from "@eslint/js";
import typescript from "typescript-eslint";
import vue from "eslint-plugin-vue";

export default typescript.config(
    js.configs.recommended,
    ...typescript.configs.recommended,
    ...vue.configs['flat/recommended'],
    {
        plugins: {
            'typescript-eslint': typescript.plugin,
        },
        languageOptions: {
            parserOptions: {
                parser: typescript.parser,
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