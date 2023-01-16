import { Rule } from "eslint";
import {
  getDecoratorList,
  isPrivate,
  stencilComponentContext,
  stencilDecorators,
} from "../utils";

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "This rule catches own class attributes marked as public.",
      category: "Possible Errors",
      recommended: true,
    },
    schema: [],
    type: "problem",
  },

  create(context: any): Rule.RuleListener {
    const stencil = stencilComponentContext();

    const parserServices = context.parserServices;
    return {
      ...stencil.rules,
      PropertyDefinition: (node: any) => {
        if (!stencil.isComponent()) {
          return;
        }

        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const decorators = getDecoratorList(originalNode);

        const stencilDecorator =
          decorators &&
          decorators.some((dec: any) =>
            stencilDecorators.includes(dec.expression.expression.escapedText)
          );

        if (!stencilDecorator && !isPrivate(originalNode)) {
          context.report({
            node: node,
            message: `Own class properties cannot be public`,
          });
        }
      },
    };
  },
};

export default rule;