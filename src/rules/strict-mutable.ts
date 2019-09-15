import { Rule } from 'eslint';
import { parseDecorator, stencilComponentContext } from '../utils';

const mutableProps = new Map<string, any>();

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches mutable Props that not need to be mutable.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'suggestion',
    fixable: 'code'
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();
    const parserServices = context.parserServices;

    function getMutable(node: any) {
      if (!stencil.isComponent()) {
        return;
      }
      const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const parsed = parseDecorator(node);
      const mutable = parsed && parsed.length && parsed[0].mutable || false;
      if (mutable) {
        const varName = originalNode.parent.name.escapedText;
        mutableProps.set(varName, node);
      }
    }

    function getName(expression: any) {
      if (expression.left && expression.left.name) {
        return expression.left.name;
      }
      return false;
    }

    function removeUsedVars(statements: any) {
      statements
          .filter((st: any) => st.expression)
          .map((st: any) => getName(st.expression))
          .filter((name: any) => !!name)
          .forEach((name: any) => {
            mutableProps.delete(name.escapedText);
          });
      statements
          .filter((st: any) => st.thenStatement && st.thenStatement.statements)
          .map((st: any) => st.thenStatement.statements)
          .forEach((st: any) => {
            removeUsedVars(st);
          })
    }

    return {
      'ClassDeclaration': stencil.rules.ClassDeclaration,
      'ClassProperty > Decorator[expression.callee.name=Prop]': getMutable,
      'MethodDefinition': (node: any) => {
        if (!stencil.isComponent()) {
          return;
        }
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const body = originalNode.body.getFullText();
        const statements = originalNode.body.statements;
        if (statements && statements.length) {
          removeUsedVars(statements);
        }
      },
      'ClassDeclaration:exit': (node: any) => {
        if (!stencil.isComponent()) {
          return;
        }
        stencil.rules['ClassDeclaration:exit'](node);
        mutableProps.forEach((varNode, varName) => {
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(varNode);
          const text = originalNode.getFullText();
          const parsed = parseDecorator(varNode);
          context.report({
            node: varNode,
            message: `@Prop() "${varName}" should not be mutable`,
            fix(fixer) {
              const options = parsed && parsed.length && parsed[0] || {};
              delete options.mutable;
              let opts = '';
              if (options && Object.keys(options).length) {
                opts = Object.keys(options).map((key) => {
                  const value = options[key];
                  const val = typeof value === 'string' ? `'${value}'` : value;
                  return `${key}: ${val}`;
                }).join(', ');
                opts = `{ ${opts} }`;
              }
              const result = text.replace(/@Prop\((.*)?\)/, `@Prop(${opts})`);
              return fixer.replaceText(varNode, result);
            }
          });
        });
        mutableProps.clear();
      }
    };
  }
};

export default rule;
