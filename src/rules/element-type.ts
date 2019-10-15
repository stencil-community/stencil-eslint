import { Rule } from 'eslint';
import { getDecorator, getType, parseDecorator, stencilComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Stencil Element type not matching tag name.',
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

    function parseTag(tag: string) {
      let result = tag[0].toUpperCase() + tag.slice(1);
      const tagBody = tag.split('-');
      if (tagBody.length > 1) {
        result = tagBody.map((tpart) => tpart[0].toUpperCase() + tpart.slice(1)).join('');
      }
      return result;
    }

    return {
      ...stencil.rules,
      'ClassProperty > Decorator[expression.callee.name=Element]': (node: any) => {
        if (stencil.isComponent()) {
          const tagType = getType(node.parent);
          const component = getDecorator(node.parent.parent.parent, 'Component');
          const [{ tag }] = parseDecorator(component);
          const parsedTag = `HTML${parseTag(tag)}Element`;

          if (tagType !== parsedTag) {
            context.report({
              node: node.parent.typeAnnotation,
              message: `@Element type is not matching tag for component (${parsedTag})`,
              fix(fixer) {
                return fixer.replaceText(node.parent.typeAnnotation.typeAnnotation, parsedTag);
              }
            });
          }
        }
      }
    };
  }
};

export default rule;
