import rule from '../../../../src/rules/ban-prefix';
import { ruleTester } from '../rule-tester';
import * as path from 'path';
import * as fs from 'fs';

describe('stencil rules', () => {
  const files = {
    good: path.resolve(__dirname, 'ban-prefix.good.tsx'),
    wrong: path.resolve(__dirname, 'ban-prefix.wrong.tsx')
  };
  // const options = [['stencil', 'stnl']];
  ruleTester.run('ban-prefix', rule, {
    valid: [
      {
        code: fs.readFileSync(files.good, 'utf8'),
        // options,
        filename: files.good
      }
    ],

    invalid: [
      {
        code: fs.readFileSync(files.wrong, 'utf8'),
        // options,
        filename: files.wrong,
        errors: 1
      }
    ]
  });
});
