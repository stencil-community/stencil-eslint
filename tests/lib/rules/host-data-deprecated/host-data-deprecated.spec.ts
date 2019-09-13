import rule from '../../../../src/rules/host-data-deprecated';
import { ruleTester } from '../rule-tester';
import * as path from 'path';
import * as fs from 'fs';

describe('stencil rules', () => {
  const files = {
    good: path.resolve(__dirname, 'host-data-deprecated.good.tsx'),
    wrong: path.resolve(__dirname, 'host-data-deprecated.wrong.tsx')
  };
  ruleTester.run('host-data-deprecated', rule, {
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
        errors: 1
      }
    ]
  });
});
