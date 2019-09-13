import rule from '../../../../src/rules/required-prefix';
import { ruleTester } from '../rule-tester';
import * as path from 'path';
import * as fs from 'fs';

describe('stencil rules', () => {
  const files = {
    good: path.resolve(__dirname, 'required-prefix.good.tsx'),
    wrong: path.resolve(__dirname, 'required-prefix.wrong.tsx')
  };
  const options = [['app-', 'me-']];
  ruleTester.run('required-prefix', rule, {
    valid: [
      {
        code: fs.readFileSync(files.good, 'utf8'),
        options,
        filename: files.good
      }
    ],

    invalid: [
      {
        code: fs.readFileSync(files.wrong, 'utf8'),
        options,
        filename: files.wrong,
        errors: 1
      }
    ]
  });
});
