import { Rule } from 'eslint';
import ts from 'typescript';
import { getDecorator, stencilComponentContext } from '../utils';

type DecoratorsStyleOptionsEnum = 'singleline' | 'multiline' | 'ignore';

interface DecoratorsStyleOptions {
  prop?: DecoratorsStyleOptionsEnum;
  state?: DecoratorsStyleOptionsEnum;
  element?: DecoratorsStyleOptionsEnum;
  event?: DecoratorsStyleOptionsEnum;
  method?: DecoratorsStyleOptionsEnum;
  watch?: DecoratorsStyleOptionsEnum;
  listen?: DecoratorsStyleOptionsEnum;
}

const ENUMERATE = ['singleline', 'multiline', 'ignore'];
const DEFAULTS: DecoratorsStyleOptions = {
  prop: 'singleline',
  state: 'singleline',
  element: 'singleline',
  event: 'singleline',
  method: 'multiline',
  watch: 'multiline',
  listen: 'multiline'
};
const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Stencil Decorators used in incorrect locations.',
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

        Object.keys(options).forEach((decoder) => {
          const decName = decoder[0].toUpperCase() + decoder.slice(1);
          const config: DecoratorsStyleOptionsEnum = options[decoder];
          if (getDecorator(node, decName) && config && config !== 'ignore') {
            const originalNode = parserServices.esTreeNodeToTSNodeMap.get(node) as ts.Node;
            const separator = config === 'multiline' ? '\n' : ' ';
            const text = String(originalNode.getFullText());
            const regExp = new RegExp(`@${decName}\\([\\w'"-]*\\)([${separator}]+)`);
            if (!regExp.test(text)) {
              context.report({
                node: node,
                message: `The @${decName} decorator can only be applied as ${config}.`,
                fix(fixer) {
                  const oposite = config === 'multiline' ? ' ' : '\n';
                  const matchRegExp = new RegExp(`(@${decName}\\([\\w'"-]*\\))([${oposite}]+)`);
                  const result = text.replace(matchRegExp, `$1${separator}`);
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
