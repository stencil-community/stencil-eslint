import rule from '../../../../src/rules/reserved-member-names';
import { ruleTester } from '../rule-tester';
import * as path from 'path';
import * as fs from 'fs';

describe('stencil rules', () => {
  const files = {
    good: path.resolve(__dirname, 'reserved-member-names.good.tsx'),
    wrong: path.resolve(__dirname, 'reserved-member-names.wrong.tsx')
  };
  ruleTester.run('reserved-member-names', rule, {
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
        errors: 10
      }
    ]
  });
});
