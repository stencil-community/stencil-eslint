/**
 * @fileoverview ESLint rules specific to Stencil JS projects.
 * @author Tom Chinery <tom.chinery@addtoevent.co.uk>
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "This rule catches Stencil Prop names that share names of Global HTML Attributes.",
            category: "Possible Errors",
            recommended: true
        },
        fixable: null,
        schema: [ ]
    },

    create: function(context) {

        const globalHTMLAttributes = [
            "accesskey",
            "autocapitalize",
            "autocomplete",
            "class",
            "contenteditable",
            "contextmenu",
            "dir",
            "draggable",
            "dropzone",
            "hidden",
            "id",
            "inputmode",
            "is",
            "itemid",
            "itemprop",
            "itemref",
            "itemscope",
            "itemtype",
            "lang",
            "slot",
            "spellcheck",
            "style",
            "tabindex",
            "title",
            "translate"
        ];

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            Decorator: (node) => {
                if (node.parent.type === 'ClassProperty') {
                    if (globalHTMLAttributes.includes(node.parent.key.name)) {
                        context.report(node, "Avoid using Global HTML Attributes as Prop names.");
                    }

                    if (node.parent.key.name.includes('data-')) {
                        context.report(node, "Avoid using Global HTML Attributes as Prop names.");
                    }
                }
            }
        };
    }
};
