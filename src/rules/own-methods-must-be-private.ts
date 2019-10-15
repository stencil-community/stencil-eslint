import { Rule } from 'eslint';
import ts from 'typescript';
import { isPrivate, stencilComponentContext, stencilDecorators, stencilLifecycle } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches own class methods marked as public.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'problem',
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    const parserServices = context.parserServices;
    return {
      ...stencil.rules,
      'MethodDefinition[kind=method]': (node: any) => {
        if (!stencil.isComponent()) {
          return;
        }
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const stencilDecorator = originalNode.decorators && originalNode.decorators.some(
            (dec: any) => stencilDecorators.includes(dec.expression.expression.escapedText));
        const stencilCycle = stencilLifecycle.includes(originalNode.name.escapedText);
        if (!stencilDecorator && !stencilCycle && !isPrivate(originalNode)) {
          context.report({
            node: node,
            message: `Own class methods cannot be public`
          });
        }
      }
    };
  }
};

export default rule;
