/**
 * @fileoverview ESLint rules specific to Stencil JS projects.
 * @author Tom Chinery <tom.chinery@addtoevent.co.uk>
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

import { Rule } from 'eslint';
import { stencilComponentContext } from '../utils';

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'This rule catches Stencil Prop names that share names of Global HTML Attributes.',
      category: 'Possible Errors',
      recommended: true
    },
    schema: [],
    type: 'problem'
  },

  create(context): Rule.RuleListener {

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    const stencil = stencilComponentContext();

    const checkName = (node: any) => {
      if (!stencil.isComponent()) {
        return;
      }
      const decoratorName = node.expression.callee.name;
      if (decoratorName === 'Prop' || decoratorName === 'Method') {
        const propName = node.parent.key.name;
        if (isReservedMember(propName)) {
          context.report({
            node: node.parent.key,
            message: `The @${decoratorName} name "${propName} conflicts with a key in the HTMLElement prototype. Please choose a different name.`
          });
        }
        if (propName.startsWith('data-')) {
          context.report({
            node: node.parent.key,
            message: 'Avoid using Global HTML Attributes as Prop names.'
          });
        }
      }
    };
    return {
      ...stencil.rules,
      'ClassProperty > Decorator[expression.callee.name=Prop]': checkName,
      'MethodDefinition[kind=method] > Decorator[expression.callee.name=Method]': checkName
    };
  }
};

const HTML_ELEMENT_KEYS = [
  'title',
  'lang',
  'translate',
  'dir',
  // 'dataset',
  'hidden',
  'tabIndex',
  'accessKey',
  'draggable',
  'spellcheck',
  'autocapitalize',
  'contentEditable',
  'isContentEditable',
  'inputMode',
  'offsetParent',
  'offsetTop',
  'offsetLeft',
  'offsetWidth',
  'offsetHeight',
  'style',
  'innerText',
  'outerText',
  'oncopy',
  'oncut',
  'onpaste',
  'onabort',
  'onblur',
  'oncancel',
  'oncanplay',
  'oncanplaythrough',
  'onchange',
  'onclick',
  'onclose',
  'oncontextmenu',
  'oncuechange',
  'ondblclick',
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondragstart',
  'ondrop',
  'ondurationchange',
  'onemptied',
  'onended',
  'onerror',
  'onfocus',
  'oninput',
  'oninvalid',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onload',
  'onloadeddata',
  'onloadedmetadata',
  'onloadstart',
  'onmousedown',
  'onmouseenter',
  'onmouseleave',
  'onmousemove',
  'onmouseout',
  'onmouseover',
  'onmouseup',
  'onmousewheel',
  'onpause',
  'onplay',
  'onplaying',
  'onprogress',
  'onratechange',
  'onreset',
  'onresize',
  'onscroll',
  'onseeked',
  'onseeking',
  'onselect',
  'onstalled',
  'onsubmit',
  'onsuspend',
  'ontimeupdate',
  'ontoggle',
  'onvolumechange',
  'onwaiting',
  'onwheel',
  'onauxclick',
  'ongotpointercapture',
  'onlostpointercapture',
  'onpointerdown',
  'onpointermove',
  'onpointerup',
  'onpointercancel',
  'onpointerover',
  'onpointerout',
  'onpointerenter',
  'onpointerleave',
  'onselectstart',
  'onselectionchange',
  'nonce',
  'click',
  'focus',
  'blur',
  'class',
  'contextmenu',
  'tabindex?',
  'enterkeyhint',
  'is',
  'radiogroup',
  'role',
  'about',
  'datatype',
  'inlist',
  'property',
  'resource',
  'typeof',
  'vocab',
  'autocorrect',
  'autosave',
  'color',
  'itemprop',
  'itemscope',
  'itemtype',
  'itemid',
  'itemref',
  'results',
  'security',
  'unselectable'
];

const ELEMENT_KEYS = [
  'namespaceURI',
  'prefix',
  'localName',
  'tagName',
  'id',
  'className',
  'classList',
  'slot',
  'attributes',
  'shadowRoot',
  'assignedSlot',
  'innerHTML',
  'outerHTML',
  'scrollTop',
  'scrollLeft',
  'scrollWidth',
  'scrollHeight',
  'clientTop',
  'clientLeft',
  'clientWidth',
  'clientHeight',
  'attributeStyleMap',
  'onbeforecopy',
  'onbeforecut',
  'onbeforepaste',
  'onsearch',
  'previousElementSibling',
  'nextElementSibling',
  'children',
  'firstElementChild',
  'lastElementChild',
  'childElementCount',
  'onfullscreenchange',
  'onfullscreenerror',
  'onwebkitfullscreenchange',
  'onwebkitfullscreenerror',
  'setPointerCapture',
  'releasePointerCapture',
  'hasPointerCapture',
  'hasAttributes',
  'getAttributeNames',
  'getAttribute',
  'getAttributeNS',
  'setAttribute',
  'setAttributeNS',
  'removeAttribute',
  'removeAttributeNS',
  'hasAttribute',
  'hasAttributeNS',
  'toggleAttribute',
  'getAttributeNode',
  'getAttributeNodeNS',
  'setAttributeNode',
  'setAttributeNodeNS',
  'removeAttributeNode',
  'closest',
  'matches',
  'webkitMatchesSelector',
  'attachShadow',
  'getElementsByTagName',
  'getElementsByTagNameNS',
  'getElementsByClassName',
  'insertAdjacentElement',
  'insertAdjacentText',
  'insertAdjacentHTML',
  'requestPointerLock',
  'getClientRects',
  'getBoundingClientRect',
  'scrollIntoView',
  'scroll',
  'scrollTo',
  'scrollBy',
  'scrollIntoViewIfNeeded',
  'animate',
  'computedStyleMap',
  'before',
  'after',
  'replaceWith',
  'remove',
  'prepend',
  'append',
  'querySelector',
  'querySelectorAll',
  'requestFullscreen',
  'webkitRequestFullScreen',
  'webkitRequestFullscreen',
  'part',
  'createShadowRoot',
  'getDestinationInsertionPoints'
];

const NODE_KEYS = [
  'ELEMENT_NODE',
  'ATTRIBUTE_NODE',
  'TEXT_NODE',
  'CDATA_SECTION_NODE',
  'ENTITY_REFERENCE_NODE',
  'ENTITY_NODE',
  'PROCESSING_INSTRUCTION_NODE',
  'COMMENT_NODE',
  'DOCUMENT_NODE',
  'DOCUMENT_TYPE_NODE',
  'DOCUMENT_FRAGMENT_NODE',
  'NOTATION_NODE',
  'DOCUMENT_POSITION_DISCONNECTED',
  'DOCUMENT_POSITION_PRECEDING',
  'DOCUMENT_POSITION_FOLLOWING',
  'DOCUMENT_POSITION_CONTAINS',
  'DOCUMENT_POSITION_CONTAINED_BY',
  'DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC',
  'nodeType',
  'nodeName',
  'baseURI',
  'isConnected',
  'ownerDocument',
  'parentNode',
  'parentElement',
  'childNodes',
  'firstChild',
  'lastChild',
  'previousSibling',
  'nextSibling',
  'nodeValue',
  'textContent',
  'hasChildNodes',
  'getRootNode',
  'normalize',
  'cloneNode',
  'isEqualNode',
  'isSameNode',
  'compareDocumentPosition',
  'contains',
  'lookupPrefix',
  'lookupNamespaceURI',
  'isDefaultNamespace',
  'insertBefore',
  'appendChild',
  'replaceChild',
  'removeChild'
];

const JSX_KEYS = [
  'ref',
  'key'
];

const RESERVED_PUBLIC_MEMBERS = new Set([
  ...HTML_ELEMENT_KEYS,
  ...ELEMENT_KEYS,
  ...NODE_KEYS,
  ...JSX_KEYS
].map(p => p.toLowerCase()));

function isReservedMember(memberName: string) {
  memberName = memberName.toLowerCase();
  return RESERVED_PUBLIC_MEMBERS.has(memberName);
}

export default rule;
