import { Rule } from 'eslint';
import { getDecorator, parseDecorator, stencilComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches required prefix in component tagName.',
      category: 'Possible Errors',
      recommended: false
    },
    schema: [
      {
        type: 'array',
        minLength: 1
      }
    ],
    type: 'layout'
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    return {
      ...stencil.rules,
      'ClassDeclaration': (node: any) => {
        const component = getDecorator(node, 'Component');
        const [{ tag }] = parseDecorator(component);
        const tags = context.options[0];
        const match = tags.some((t: string) => tag.startsWith(t));

        if (!match) {
          context.report({
            node: node,
            message: `The component with tagName ${tag} have not a valid prefix.`
          });
        }
      }
    };
  }
};

export default rule;
