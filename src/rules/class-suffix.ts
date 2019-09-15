import { Rule } from 'eslint';
import { getDecorator, parseDecorator, stencilComponentContext } from '../utils';

const REQUIRED_SUFFIX = 'Component';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches usages of non valid class suffix.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'layout'
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();
    const parserServices = context.parserServices;

    return {
      ...stencil.rules,
      'ClassDeclaration': (node: any) => {
        const component = getDecorator(node, 'Component');
        if (!component) {
          return;
        }
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const className = originalNode.symbol.escapedName;
        const match = className.endsWith(REQUIRED_SUFFIX);

        if (!match) {
          const [{ tag }] = parseDecorator(component);
          context.report({
            node: node,
            message: `The component with tag name ${tag} haven't got a valid suffix (...${REQUIRED_SUFFIX}).`
          });
        }
      }
    };
  }
};

export default rule;
