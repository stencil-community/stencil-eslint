import { Rule } from 'eslint';
import ts from 'typescript';
import { parseDecorator, stencilComponentContext } from '../utils';

const mutableProps = new Map<string, any>();
const ASSIGN_TOKENS = [
  ts.SyntaxKind.EqualsToken,
  ts.SyntaxKind.PlusEqualsToken,
  ts.SyntaxKind.MinusEqualsToken,
  ts.SyntaxKind.AsteriskEqualsToken,
  ts.SyntaxKind.AsteriskAsteriskEqualsToken,
  ts.SyntaxKind.SlashEqualsToken,
  ts.SyntaxKind.PercentEqualsToken,
  ts.SyntaxKind.LessThanLessThanEqualsToken,
  ts.SyntaxKind.GreaterThanGreaterThanEqualsToken,
  ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
  ts.SyntaxKind.AmpersandEqualsToken,
  ts.SyntaxKind.BarEqualsToken,
  ts.SyntaxKind.CaretEqualsToken
];
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
      const parsed = parseDecorator(node);
      const mutable = parsed && parsed.length && parsed[0].mutable || false;
      if (mutable) {
        const varName = node.parent.key.name;
        mutableProps.set(varName, node);
      }
    }

    function removeVar(name: any) {
      if (!name) {
        return;
      }
      if (name.escapedText) {
        mutableProps.delete(name.escapedText);
      }
    }

    function getArray(value: any | any[]): any[] {
      if (!value) {
        return [];
      }
      return Array.isArray(value) ? value : [value];
    }

    function checkStatement(st: any) {
      if (!st) {
        return;
      }
      const { expression, thenStatement, elseStatement } = st;
      [...getArray(thenStatement), ...getArray(elseStatement), expression].filter((ex) => !!ex).forEach(checkExpression);
    }

    function checkExpression(expr: any) {
      if (!expr) {
        return;
      }
      const { expression, left, openingElement, body, nextContainer, statements, thenStatement } = expr;
      if (left && left.name && expr.operatorToken && ASSIGN_TOKENS.includes(expr.operatorToken.kind)) {
        removeVar(left.name);
      }
      if (openingElement) {
        getArray(openingElement.attributes).forEach(checkExpression);
      }
      [...getArray(thenStatement), expression, body, nextContainer].filter((ex) => !!ex).forEach(checkExpression);
      if (statements) {
        statements.forEach(checkStatement);
      }
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
          statements.forEach((st: any) => {
            checkStatement(st);
          });
        }
      },
      'ClassDeclaration:exit': (node: any) => {
        if (!stencil.isComponent()) {
          return;
        }
        stencil.rules['ClassDeclaration:exit'](node);
        mutableProps.forEach((varNode, varName) => {
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(varNode.parent);
          const text = originalNode.getFullText();
          const parsed = parseDecorator(varNode);
          context.report({
            node: varNode.parent,
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
