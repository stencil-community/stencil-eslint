import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, isPrivate, stencilComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Stencil Methods marked as private or protected.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    fixable: 'code',
    type: 'problem'
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();
    const parserServices = context.parserServices;
    return {
      ...stencil.rules,
      'MethodDefinition[kind=method]': (node: any) => {
        if (stencil.isComponent() && getDecorator(node, 'Method')) {
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node) as ts.Node;
          if (isPrivate(originalNode)) {
            const text = String(originalNode.getFullText());
            context.report({
              node: node,
              message: `Class methods decorated with @Method() cannot be private nor protected`,
              fix(fixer) {
                return fixer.replaceText(node, text.replace(/(private |protected )/, ''));
              }
            });
          }
        }
      }
    };
  }
};

export default rule;
