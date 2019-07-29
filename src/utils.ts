import ts from 'typescript';
import { AsyncResource } from 'async_hooks';

export function isPrivate(originalNode: ts.Node) {
  if (originalNode.modifiers) {
    return originalNode.modifiers.some(m => (
      m.kind === ts.SyntaxKind.PrivateKeyword ||
      m.kind === ts.SyntaxKind.ProtectedKeyword
    ));
  }
  return false;
}
export function getDecorator(node: any, decoratorName: string) {
  return node.decorators && node.decorators.find(isDecoratorNamed(decoratorName));
}

export function isDecoratorNamed(propName: string) {
  return (dec: any): boolean => {
    return (dec.expression && dec.expression.callee.name === propName);
  };
}

export function stencilComponentContext() {
  let componentNode: any;
  return {
    rules: {
      'ClassDeclaration': (node: any) => {
        const component = getDecorator(node, 'Component');
        if (component) {
          componentNode = component;
        }
      },
      'ClassDeclaration:exit': (node: any) => {
        if (componentNode === node) {
          componentNode = undefined;
        }
      }
    },
    isComponent() {
      return !!componentNode;
    }
  }
}
