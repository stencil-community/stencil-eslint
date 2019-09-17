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
    type: 'layout',
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
      return null;
    }

    function parseExpression(expression: any): any {
      if (expression.expression) {
        return parseExpression(expression.expression);
      }
      if (expression.openingElement) {
        return expression.openingElement.attributes &&
        expression.openingElement.attributes.nextContainer &&
        parseExpression(expression.openingElement.attributes.nextContainer.body)
      }
      return expression && getName(expression);
    }

    function removeUsedVars(statements: any[]) {
      statements
        .map((st) => st.expression && parseExpression(st.expression))
        .filter((name) => !!name)
        .forEach((name) => {
          mutableProps.delete(name.escapedText);
        });
      statements
        .filter((st) => st.thenStatement && st.thenStatement.statements)
        .map((st) => st.thenStatement.statements)
        .forEach((st) => {
          removeUsedVars(st);
        });
      statements
        .filter((st) => st.elseStatement)
        .forEach((st) => {
          const sts = Array.isArray(st.elseStatement) ? st.elseStatement : [st.elseStatement];
          removeUsedVars(sts);
        });
    }

    return {
      'ClassDeclaration': stencil.rules.ClassDeclaration,
      'ClassProperty > Decorator[expression.callee.name=Prop]': getMutable,
      'MethodDefinition': (node: any) => {
        if (!stencil.isComponent()) {
          return;
        }
        const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node);
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
