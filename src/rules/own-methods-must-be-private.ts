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
    fixable: 'code'
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    const parserServices = context.parserServices;
    return {
      ...stencil.rules,
      'MethodDefinition': (node: any) => {
        if (!stencil.isComponent()) {
          return;
        }
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const stencilDecorator = originalNode.decorators && originalNode.decorators.some(
            (dec: any) => stencilDecorators.includes(dec.expression.expression.escapedText));
        const stencilCycle = stencilLifecycle.includes(originalNode.name.escapedText);
        if (!stencilDecorator && !stencilCycle && !isPrivate(originalNode)) {
          const text = String(originalNode.getFullText());
          context.report({
            node: node,
            message: `Own class methods cannot be public`,
            fix(fixer) {
              const methodName = node.key.name;
              const result = text.replace('public ', '').replace(methodName, `private ${methodName}`);
              return fixer.replaceText(node, result);
            }
          });
        }
      }
    };
  }
};

export default rule;
