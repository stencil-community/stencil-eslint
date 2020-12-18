import { Rule } from 'eslint';
import { getDecorator, parseDecorator, stencilComponentContext } from '../utils';

const rule: Rule.RuleModule = {
    meta: {
        docs: {
            description: 'This rule will catch any Stencil boolean Props that would not be able to be set to false with plain HTML5.',
            category: 'Possible Errors',
            recommended: false
        },
        schema: [],
        type: 'problem'
    },

    create(context): Rule.RuleListener {
        const stencil = stencilComponentContext();

        return {
            ...stencil.rules,
            'ClassProperty': (node: any) => {
                const propDecorator = getDecorator(node, 'Prop');
                if (stencil.isComponent() && propDecorator) {
                    const [opts] = parseDecorator(propDecorator);
                    if (opts?.reflected === false) {
                        return;
                    }

                    const initializer = node.value.value;
                    if (initializer === true) {
                        context.report({
                            node: node.key,
                            message: `Boolean properties decorated with @Prop() that are reflected should not be initialized to true`
                        });
                    }
                }
            }
        };
    }
};

export default rule;
