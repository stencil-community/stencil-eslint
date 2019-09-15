import { Rule } from 'eslint';
import { isPrivate, stencilComponentContext, stencilDecorators } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches own class attributes marked as public.',
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
        if (!stencil.isComponent()) {
          return;
        }
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const stencilDecorator = originalNode.decorators && originalNode.decorators.some(
            (dec: any) => stencilDecorators.includes(dec.expression.expression.escapedText));
        if (!stencilDecorator && !isPrivate(originalNode)) {
          const text = String(originalNode.getFullText());
          context.report({
            node: node,
            message: `Own class properties cannot be public`,
            fix(fixer) {
              const varName = node.key.name;
              const result = text.replace('public ', '').replace(varName, `private ${varName}`);
              return fixer.replaceText(node, result);
            }
          });
        }
      }
    };
  }
};

export default rule;
