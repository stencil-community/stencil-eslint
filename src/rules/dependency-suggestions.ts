import { Rule } from 'eslint';
import ts from 'typescript';
import { stencilComponentContext } from '../utils';
import * as tsutils from 'tsutils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule can provide suggestions about dependencies in stencil apps',
      recommended: true
    },
    schema: [],
    type: 'suggestion',
  },

  create(context): Rule.RuleListener {
    return {
      'ImportDeclaration': (node: any) => {
        const importName = node.source.value;
        const message = SUGGESTIONS[importName];
        if (message) {
          context.report({
            node,
            message
          });
        }
      }
    };
  }
};

const SUGGESTIONS: {[importName: string]: string} = {
  'classnames': `Stencil can already render conditional classes:
  <div class={{disabled: condition}}>`,
  'lodash': `"loadash" will bloat your build, use "lodash-es" instead: https://www.npmjs.com/package/lodash-es`
}

export default rule;
