import {RuleTester} from 'eslint';
import * as path from 'path';

export const ruleTester = new RuleTester({
    languageOptions: {
        parser: require(path.resolve(__dirname, '../../../node_modules/@typescript-eslint/parser/dist/parser.js')),
        parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true
            },
            project: path.resolve(__dirname, '../../tsconfig.json'),
            extraFileExtensions: ['.ts', '.tsx'],
            env: {
                browser: true,
                node: true,
                es6: true
            }
        }
    }
});
