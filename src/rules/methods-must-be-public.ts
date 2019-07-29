import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, isPrivate, stencilComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "This rule catches Stencil Methods marked as private or protected.",
      category: "Possible Errors",
      recommended: true
    },
    schema: []
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();
    const parserServices = context.parserServices;
    return {
      ...stencil.rules,
      'MethodDefinition': (node: any) => {
        if (stencil.isComponent() && getDecorator(node, 'Method')) {
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node) as ts.Node;
          if (isPrivate(originalNode)) {
            context.report({
              node: node.key,
              message: `Class methods decorated with @Method() cannot be private nor protected`
            });
          }
        }
      }
    };
  }
};


export default rule;
