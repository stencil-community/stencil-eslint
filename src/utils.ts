import ts from 'typescript';

export function getComponentDecorator(cmpNode: any) {
  return cmpNode.decorators.find(isDecoratorNamed('Component'));
}

export function isDecoratorNamed(propName: string) {
  return (dec: any): boolean => {
    return (dec.expression && dec.expression.callee.name === propName);
  };
}