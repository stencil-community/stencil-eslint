import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, isPrivate, stencilComponentContext, parseDecorator } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "This rule catches Stencil Props marked as private or protected.",
      category: "Possible Errors",
      recommended: true
    },
    schema: [],
    fixable: 'code'
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    const parserServices = context.parserServices;
    return {
      ...stencil.rules,
      'ClassProperty': (node: any) => {
        const propDecorator = getDecorator(node, 'Prop');
        if (stencil.isComponent() && propDecorator) {
          const [opts] = parseDecorator(propDecorator);
          if (opts && opts.mutable === true) {
            return;
          }

          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node) as ts.Node;
          const hasReadonly = !!(
            originalNode.modifiers &&
            originalNode.modifiers.some(m =>  m.kind === ts.SyntaxKind.ReadonlyKeyword)
          );
          if (!hasReadonly) {
            context.report({
              node: node.key,
              message: `Class properties decorated with @Prop() should be readonly`,
              fix(fixer) {
                return fixer.insertTextBefore(node.key, "readonly ");
              },
            });
          }
        }
      }
    };
  }
};

export default rule;
