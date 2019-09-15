import rule from '../../../../src/rules/class-pattern';
import { ruleTester } from '../rule-tester';
import * as path from 'path';
import * as fs from 'fs';

describe('stencil rules', () => {
  const files = {
    good: path.resolve(__dirname, 'class-pattern.good.tsx'),
    wrong: path.resolve(__dirname, 'class-pattern.wrong.tsx')
  };
  const options = [{ pattern: '^(?!NoStart).*Component$', ignoreCase: true }];
  ruleTester.run('class-pattern', rule, {
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
