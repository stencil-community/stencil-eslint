import ts from 'typescript';
// @ts-ignore
import { getStaticValue } from 'eslint-utils';

export function isPrivate(originalNode: ts.Node) {
  if (originalNode.modifiers) {
    return originalNode.modifiers.some(m => (
      m.kind === ts.SyntaxKind.PrivateKeyword ||
      m.kind === ts.SyntaxKind.ProtectedKeyword
    ));
  }
  return false;
}

export function getDecorator(node: any, decoratorName?: string): any | any[] {
  if (decoratorName) {
    return node.decorators && node.decorators.find(isDecoratorNamed(decoratorName));
  }
  return node.decorators ? node.decorators.filter((dec: any) => dec.expression) : [];
}

export function parseDecorator(decorator: any) {
  if (decorator && decorator.expression.type === 'CallExpression') {
    return decorator.expression.arguments.map((a: any) => {
      const parsed = getStaticValue(a);
      return parsed ? parsed.value : undefined;
    });
  }
  return [];
}

export function decoratorName(dec: any): string {
  return dec.expression && dec.expression.callee.name;
}

export function isDecoratorNamed(propName: string) {
  return (dec: any): boolean => {
    return decoratorName(dec) === propName;
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
  };
}

export function getType(node: any) {
  return node.typeAnnotation.typeAnnotation.typeName.name;
}

export const stencilDecorators = ['Component', 'Prop', 'State', 'Watch', 'Element', 'Method', 'Event', 'Listen'];

export const stencilLifecycle = [
  'connectedCallback',
  'disconnectedCallback',
  'componentWillLoad',
  'componentDidLoad',
  'componentWillRender',
  'componentDidRender',
  'componentWillUpdate',
  'componentDidUpdate',
  'render'
];
