// eslint.config.js

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    // Базовая конфигурация для всех файлов
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
        plugins: {
            js,
            prettier: pluginPrettier,
        },
        extends: ['js/recommended'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node, // Добавим окружение Node.js на всякий случай
            },
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    tabWidth: 4,
                    semi: true,
                    trailingComma: 'es5',
                    printWidth: 100,
                    endOfLine: 'crlf',
                },
            ],
        },
    },

    // Конфигурации для TypeScript (распространяются на .ts и .vue)
    ...tseslint.configs.recommended,

    // Конфигурации для Vue
    ...pluginVue.configs['flat/essential'],

    // ОБЪЕДИНЕННЫЙ БЛОК для .ts и .vue файлов
    {
        files: ['**/*.ts', '**/*.vue'],
        languageOptions: {
            parserOptions: {
                // Указываем парсер для .vue файлов, чтобы он понимал <script lang="ts">
                parser: tseslint.parser,
            },
        },
        rules: {
            // Отключаем правило, которое требует именования компонентов из нескольких слов
            'vue/multi-word-component-names': 'off',
            // Отключаем правило, запрещающее 'any', для всех TS и VUE файлов
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },

    // НОВЫЙ БЛОК: Специальные правила для файлов объявлений (.d.ts)
    {
        files: ['**/*.d.ts'],
        rules: {
            // В файлах объявлений часто используются 'any' и пустые интерфейсы/типы,
            // поэтому здесь мы полностью отключаем эти правила.
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
        },
    },
]);
