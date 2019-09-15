import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, isPrivate, stencilComponentContext } from '../utils';

const varsList = new Set<string>();

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Stencil Watch for not defined variables in Prop or State.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'suggestion'
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    const parserServices = context.parserServices;

    function getVars(node: any) {
      if (!stencil.isComponent()) {
        return;
      }
      const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const varName = originalNode.parent.name.escapedText;
      varsList.add(varName);
    }

    function checkWatch(node: any) {
      if (!stencil.isComponent()) {
        return;
      }
      const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const varName = originalNode.expression.arguments[0].text;
      if (!varsList.has(varName)) {
        context.report({
          node: node,
          message: `Watch decorator @Watch("${varName}") is not matching with any @Prop() or @State()`,
        });
      }
    }

    return {
      ...stencil.rules,
      'ClassProperty > Decorator[expression.callee.name=Prop]': getVars,
      'ClassProperty > Decorator[expression.callee.name=State]': getVars,
      'MethodDefinition > Decorator[expression.callee.name=Watch]': checkWatch
    };
  }
};

export default rule;
