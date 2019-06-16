import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, isPrivate } from '../utils';
import * as tsutils from 'tsutils';

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
      'MethodDefinition': (node: any) => {
        if (getDecorator(node, 'Method')) {
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
