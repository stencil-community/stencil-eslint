import ts from 'typescript';

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