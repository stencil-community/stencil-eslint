import rule from '../../../../src/rules/decorators-style';
import { ruleTester } from '../rule-tester';
import * as path from 'path';
import * as fs from 'fs';

describe('stencil rules', () => {
  const files = {
    good: path.resolve(__dirname, 'decorators-style.good.tsx'),
    wrong: path.resolve(__dirname, 'decorators-style.wrong.tsx')
  };
  const options = [{
    prop: 'inline',
    state: 'inline',
    element: 'inline',
    event: 'inline',
    method: 'multiline',
    watch: 'multiline',
    listen: 'multiline'
  }];
  ruleTester.run('decorators-style', rule, {
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
        errors: 5
      }
    ]
  });
});
