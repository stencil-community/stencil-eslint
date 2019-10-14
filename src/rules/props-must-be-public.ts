import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, isPrivate, stencilComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Stencil Props marked as private or protected.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'problem',
    fixable: 'code'
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    const parserServices = context.parserServices;
    return {
      ...stencil.rules,
      'ClassProperty': (node: any) => {
        if (stencil.isComponent() && getDecorator(node, 'Prop')) {
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node) as ts.Node;
          if (isPrivate(originalNode)) {
            const text = String(originalNode.getFullText());
            context.report({
              node: node,
              message: `Class properties decorated with @Prop() cannot be private nor protected`,
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
