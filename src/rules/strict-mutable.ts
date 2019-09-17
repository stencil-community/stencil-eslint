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
        mutableProps.set(varName, node.parent);
      }
    }

    // function getName(expression: any) {
    //   if (expression.left && expression.left.name) {
    //     return expression.left.name;
    //   }
    //   return null;
    // }
    //
    // function parseExpression(expression: any): any {
    //   if (!expression) {
    //     return null;
    //   }
    //   if (expression.expression) {
    //     return parseExpression(expression.expression);
    //   }
    //   if (expression.openingElement) {
    //     const container = expression.openingElement.attributes && expression.openingElement.attributes.nextContainer;
    //     if (container) {
    //       return container.body && container.body.expression ? removeUsedVars(container.body) : parseExpression(container.body);
    //     } else {
    //       return null;
    //     }
    //   }
    //   return expression && getName(expression);
    // }
    //
    // function removeUsedVars(statements: any[]) {
    //   statements
    //     .map((st) => st.expression && parseExpression(st.expression))
    //     .filter((name) => !!name)
    //     .forEach((name) => {
    //       mutableProps.delete(name.escapedText);
    //     });
    //   statements
    //     .filter((st) => st.thenStatement && st.thenStatement.statements)
    //     .map((st) => st.thenStatement.statements)
    //     .forEach((st) => {
    //       removeUsedVars(st);
    //     });
    //   statements
    //     .filter((st) => st.elseStatement)
    //     .forEach((st) => {
    //       const sts = Array.isArray(st.elseStatement) ? st.elseStatement : [st.elseStatement];
    //       removeUsedVars(sts);
    //     });
    // }

    // function getJsonPath(element: any, path: string[]) {
    //   const name = path[0];
    //   const value = element[name];
    //   if (path.length === 1) {
    //     return value;
    //   } else {
    //     return value && getJsonPath(value, path.slice(1));
    //   }
    // }

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
      console.log('kind:', !!expression, st.getText());
      [...getArray(thenStatement), ...getArray(elseStatement), expression].filter((ex) => !!ex).forEach(checkExpression);
      console.log('statement end');
    }

    function checkExpression(expr: any) {
      if (!expr) {
        return;
      }
      const { expression, left, openingElement, nextContainer, body, statements, thenStatement } = expr;
      if (left && left.name && expr.operatorToken && ASSIGN_TOKENS.includes(expr.operatorToken.kind)) {
        removeVar(left.name);
      }
      if (openingElement) {
        getArray(openingElement.attributes).forEach(checkExpression);
      }
      [...getArray(thenStatement), expression, nextContainer, body].filter((ex) => !!ex).forEach(checkExpression);
      if (statements) {
        statements.forEach(checkStatement);
      }
      console.log('expression');
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
          const originalNode = parserServices.esTreeNodeToTSNodeMap.get(varNode);
          const text = originalNode.getFullText();
          const parsed = parseDecorator(varNode);
          context.report({
            node: varNode,
            message: `@Prop() "${varName}" should not be mutable`,
            fix(fixer) {
              // const options = parsed && parsed.length && parsed[0] || {};
              // delete options.mutable;
              // let opts = '';
              // if (options && Object.keys(options).length) {
              //   opts = Object.keys(options).map((key) => {
              //     const value = options[key];
              //     const val = typeof value === 'string' ? `'${value}'` : value;
              //     return `${key}: ${val}`;
              //   }).join(', ');
              //   opts = `{ ${opts} }`;
              // }
              // const result = text.replace(/@Prop\((.*)?\)/, `@Prop(${opts})`);
              return fixer.replaceText(varNode, text);
            }
          });
        });
        mutableProps.clear();
      }
    };
  }
};

export default rule;
