import { Rule } from 'eslint';
import { getDecorator, parseDecorator, stencilComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches usages of non valid class names.',
      category: 'Possible Errors',
      recommended: false
    },
    schema: [
      {
        type: 'object',
        properties: {
          pattern: {
            type: 'string'
          },
          ignoreCase: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }],
    type: 'problem'

  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();
    const parserServices = context.parserServices;

    return {
      ...stencil.rules,
      'ClassDeclaration': (node: any) => {
        const component = getDecorator(node, 'Component');
        const options = context.options[0];
        const { pattern, ignoreCase } = options || {};
        if (!component || !options || !pattern) {
          return;
        }
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const className = originalNode.symbol.escapedName;
        const regExp = new RegExp(pattern, ignoreCase ? 'i' : undefined);

        if (!regExp.test(className)) {
          const [{ tag }] = parseDecorator(component);
          context.report({
            node: node,
            message: `The class name in component with tag name ${tag} is not valid (${regExp}).`
          });
        }
      }
    };
  }
};

export default rule;
