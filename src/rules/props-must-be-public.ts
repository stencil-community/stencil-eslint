import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, isPrivate } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "This rule catches Stencil Prop names that share names of Global HTML Attributes.",
      category: "Possible Errors",
      recommended: true
    },
    schema: []
  },

  create(context): Rule.RuleListener {
    const parserServices = context.parserServices;
    return {
      'ClassProperty': (node: any) => {
        if (getDecorator(node, 'Prop')) {
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node) as ts.Node;
          if (isPrivate(originalNode)) {
            context.report({
              node: node.key,
              message: `Class properties decorated with @Prop() cannot be private nor protected`
            });
          }
        }
      }
    };
  }
};

export default rule;
