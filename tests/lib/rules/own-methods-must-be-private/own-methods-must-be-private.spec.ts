import rule from '../../../../src/rules/own-methods-must-be-private';
import { ruleTester } from '../rule-tester';
import * as path from 'path';
import * as fs from 'fs';

describe('stencil rules', () => {
  const files = {
    good: path.resolve(__dirname, 'own-methods-must-be-private.good.tsx'),
    wrong: path.resolve(__dirname, 'own-methods-must-be-private.wrong.tsx')
  };
  ruleTester.run('own-methods-must-be-private', rule, {
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
        errors: 4
      }
    ]
  });
});
