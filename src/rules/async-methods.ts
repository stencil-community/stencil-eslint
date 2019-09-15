import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, stencilComponentContext } from '../utils';
import * as tsutils from 'tsutils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Stencil public methods that are not async.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'problem',
    fixable: 'code'
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();
    const parserServices = context.parserServices;
    const typeChecker = parserServices.program.getTypeChecker() as ts.TypeChecker;

    return {
      ...stencil.rules,
      'MethodDefinition': (node: any) => {
        if (getDecorator(node, 'Method')) {
          const method = parserServices.esTreeNodeToTSNodeMap.get(node);
          const signature = typeChecker.getSignatureFromDeclaration(method);
          const returnType = typeChecker.getReturnTypeOfSignature(signature!);
          if (!tsutils.isThenableType(typeChecker, method, returnType)) {
            const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node) as ts.Node;
            const text = String(originalNode.getFullText());
            context.report({
              node: node.key,
              message: `External @Method() ${node.key.name}() must return a Promise. Consider prefixing the method with async, such as @Method async ${node.key.name}().`,
              fix(fixer) {
                const result = text.replace('@Method()\n', '@Method()\nasync')
                    .replace('@Method() ', '@Method() async');
                return fixer.replaceText(node, result);
              }
            });
          }
        }
      }
    };
  }
};

export default rule;
