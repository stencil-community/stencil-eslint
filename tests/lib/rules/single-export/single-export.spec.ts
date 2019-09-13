import rule from '../../../../src/rules/single-export';
import { ruleTester } from '../rule-tester';
import * as path from 'path';
import * as fs from 'fs';

describe('stencil rules', () => {
  const files = {
    good: path.resolve(__dirname, 'single-export.good.tsx'),
    wrong: path.resolve(__dirname, 'single-export.wrong.tsx')
  };
  ruleTester.run('single-export', rule, {
    valid: [
      {
        code: fs.readFileSync(files.good, 'utf8'),
        filename: files.good
      }
    ],

    invalid: [
      {
        code: fs.readFileSync(files.wrong, 'utf8'),
        filename: files.wrong,
        errors: 2
      }
    ]
  });
});
