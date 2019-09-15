import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, getType, parseDecorator, stencilComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Stencil Element type not matching tag name.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: []
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    function parseTag(tag: string) {
      let result = tag[0].toUpperCase() + tag.slice(1);
      const tagBody = tag.split('-');
      if (tagBody.length > 1) {
        result = tagBody.map((tpart) => tpart[0].toUpperCase() + tpart.slice(1)).join('');
      }
      return result;
    }

    const parserServices = context.parserServices;
    return {
      ...stencil.rules,
      'ClassProperty': (node: any) => {
        if (stencil.isComponent() && getDecorator(node, 'Element')) {
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node) as ts.Node;
          const tagType = getType(originalNode);
          const component = getDecorator(node.parent.parent, 'Component');
          const [{ tag }] = parseDecorator(component);
          const parsedTag = `HTML${parseTag(tag)}Element`;
          if (tagType !== parsedTag) {
            context.report({
              node: node,
              message: `@Element type is not matching tag for component (${parsedTag})`
            });
          }
        }
      }
    };
  }
};

export default rule;
