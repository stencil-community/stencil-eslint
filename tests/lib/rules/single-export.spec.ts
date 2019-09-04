import rule from '../../../src/rules/single-export';
import { RuleTester } from 'eslint';
import * as path from 'path';

describe('stencil rules', () => {

  const ruleTester = new RuleTester({
    parser: path.resolve(__dirname, '../../../node_modules/@typescript-eslint/parser/dist/parser.js'),
    parserOptions: {
      ecmaVersion: 2017,
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
  });

  ruleTester.run('single-export', rule, {
    valid: [
      {
        code: `@Component({ tag: 'sample-tag' })
export class SampleTag {
  render() {
    return (<div>test</div>);
  }
}`,
        filename: path.resolve(__dirname, 'single-export.tsx')
      }
    ],

    invalid: [
      {
        code: 'Invalid single export',
        filename: path.resolve(__dirname, 'single-export.wrong.tsx'),
        errors: 2
      }
    ]
  });
});
