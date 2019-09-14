import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, stencilComponentContext } from '../utils';

type DecoratorsStyleOptionsEnum = 'inline' | 'multiline' | 'ignore';

interface DecoratorsStyleOptions {
  prop?: DecoratorsStyleOptionsEnum;
  state?: DecoratorsStyleOptionsEnum;
  element?: DecoratorsStyleOptionsEnum;
  event?: DecoratorsStyleOptionsEnum;
  method?: DecoratorsStyleOptionsEnum;
  watch?: DecoratorsStyleOptionsEnum;
  listen?: DecoratorsStyleOptionsEnum;
}

const ENUMERATE = ['inline', 'multiline', 'ignore'];
const DEFAULTS: DecoratorsStyleOptions = {
  prop: 'inline',
  state: 'inline',
  element: 'inline',
  event: 'inline',
  method: 'multiline',
  watch: 'multiline',
  listen: 'multiline'
};
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Stencil Decorators not used in consistent style.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [
      {
        type: 'object',
        properties: {
          prop: {
            type: 'string',
            enum: ENUMERATE
          },
          state: {
            type: 'string',
            enum: ENUMERATE
          },
          element: {
            type: 'string',
            enum: ENUMERATE
          },
          event: {
            type: 'string',
            enum: ENUMERATE
          },
          method: {
            type: 'string',
            enum: ENUMERATE
          },
          watch: {
            type: 'string',
            enum: ENUMERATE
          },
          listen: {
            type: 'string',
            enum: ENUMERATE
          }
        }
      }],
    fixable: 'code'
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();

    const parserServices = context.parserServices;
    const opts = context.options[0] || {};
    const options = { ...DEFAULTS, ...opts };

    function getDefinitions() {
      return (node: any) => {
        if (!stencil.isComponent() || !options || !Object.keys(options).length) {
          return;
        }

        Object.keys(options).forEach((optDec) => {
          const decName = optDec[0].toUpperCase() + optDec.slice(1);
          const config: DecoratorsStyleOptionsEnum = options[optDec];
          if (getDecorator(node, decName) && config && config !== 'ignore') {
            const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node) as ts.Node;
            const nodeIndex = node.decorators.findIndex(
                (dec: any) => dec.expression.callee.name.toLowerCase() === optDec);
            const nodeDec = originalNode.decorators![nodeIndex];
            const decoratorBase = nodeDec.getText();
            const text = String(originalNode.getText());
            const decorator = decoratorBase
                .replace('(', '\\(')
                .replace(')', '\\)');
            const separator = config === 'multiline' ? '\\n' : ' ';
            const regExp = new RegExp(`${decorator}([${separator}]+)`, 'i');
            if (!regExp.test(text)) {
              context.report({
                node: node,
                message: `The @${decName} decorator can only be applied as ${config}.`,
                fix(fixer) {
                  const opposite = config === 'multiline' ? ' ' : '\\n';
                  const separatorChar = config === 'multiline' ? '\n' : ' ';
                  const matchRegExp = new RegExp(`(${decorator})([${opposite}]+)`, 'i');
                  const result = text.replace(matchRegExp, `$1${separatorChar}`);
                  return fixer.replaceText(node, result);
                }
              });
            }
          }
        });
      };
    }

    return {
      ...stencil.rules,
      'ClassProperty': getDefinitions(),
      'MethodDefinition': getDefinitions()
    };
  }
};

export default rule;
