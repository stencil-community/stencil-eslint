import { Rule } from 'eslint';
import { getDecorator, stencilComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "This rule catches Stencil Props marked as private or protected.",
      category: "Possible Errors",
      recommended: true
    },
    schema: []
  },

  create(context): Rule.RuleListener {
    const stencil = stencilComponentContext();
    return {
      ...stencil.rules,
      'MethodDefinition': (node: any) => {
        if (stencil.isComponent()) {
          const listenDec = getDecorator(node, 'Listen');
          if (listenDec && listenDec.expression.arguments.length === 1 && listenDec.expression.arguments[0].type === 'Literal') {
            const eventName = listenDec.expression.arguments[0].value;
            if (PREFER_VDOM_LISTENER.includes(eventName)) {
              context.report({
                node: listenDec,
                message: `Use vDOM listener instead.`
              });
            }
          }
        }
      }
    };
  }
};

const PREFER_VDOM_LISTENER = [
  'click',
  'touchstart',
  'touchend',
  'touchmove',
  'mousedown',
  'mouseup',
  'mousemove',
  'keyup',
  'keydown',
  'focusin',
  'focusout',
  'focus',
  'blur'
];

export default rule;
