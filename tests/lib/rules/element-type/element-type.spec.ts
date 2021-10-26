import rule from '../../../../src/rules/element-type';
import { ruleTester } from '../rule-tester';
import * as path from 'path';
import * as fs from 'fs';

describe('stencil rules', () => {
  const files = {
    good: path.resolve(__dirname, 'element-type.good.tsx'),
    wrong: path.resolve(__dirname, 'element-type.wrong.tsx')
  };
  const validCode = fs.readFileSync(files.good, 'utf8');

  ruleTester.run('element-type', rule, {
    valid: [
      {
        code: validCode,
        filename: files.good
      }
    ],

    invalid: [
      {
        code: fs.readFileSync(files.wrong, 'utf8'),
        filename: files.wrong,
        errors: 1,
        output: validCode,
      }
    ]
  });
});
