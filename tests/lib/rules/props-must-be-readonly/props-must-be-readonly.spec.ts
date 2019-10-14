import rule from '../../../../src/rules/props-must-be-readonly';
import { ruleTester } from '../rule-tester';
import * as path from 'path';
import * as fs from 'fs';

describe('stencil rules', () => {
  const files = {
    good: path.resolve(__dirname, 'props-must-be-readonly.good.tsx'),
    wrong: path.resolve(__dirname, 'props-must-be-readonly.wrong.tsx')
  };
  ruleTester.run('props-must-be-readonly', rule, {
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
