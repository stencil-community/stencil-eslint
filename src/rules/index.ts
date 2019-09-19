import asyncMethods from './async-methods';
import banPrefix from './ban-prefix';
import classPattern from './class-pattern';
import decoratorsContext from './decorators-context';
import decoratorsStyle from './decorators-style';
import elementType from './element-type';
import hostDataDeprecated from './host-data-deprecated';
import methodsMustBePublic from './methods-must-be-public';
import noUnusedWatch from './no-unused-watch';
import ownMethodsMustBePrivate from './own-methods-must-be-private';
import ownPropsMustBePrivate from './own-props-must-be-private';
import preferVdomListener from './prefer-vdom-listener';
import propsMustBePublic from './props-must-be-public';
import propsMustBeReadonly from './props-must-be-readonly';
import renderReturnsHost from './render-returns-host';
import requiredJsdoc from './required-jsdoc';
import requiredPrefix from './required-prefix';
import reservedMemberNames from './reserved-member-names';
import singleExport from './single-export';
import strictMutable from './strict-mutable';

export default {
  'async-methods': asyncMethods,
  'ban-prefix': banPrefix,
  'class-pattern': classPattern,
  'decorators-context': decoratorsContext,
  'decorators-style': decoratorsStyle,
  'element-type': elementType,
  'host-data-deprecated': hostDataDeprecated,
  'methods-must-be-public': methodsMustBePublic,
  'no-unused-watch': noUnusedWatch,
  'own-methods-must-be-private': ownMethodsMustBePrivate,
  'own-props-must-be-private': ownPropsMustBePrivate,
  'prefer-vdom-listener': preferVdomListener,
  'props-must-be-public': propsMustBePublic,
  'props-must-be-readonly': propsMustBeReadonly,
  'render-returns-host': renderReturnsHost,
  'required-jsdoc': requiredJsdoc,
  'required-prefix': requiredPrefix,
  'reserved-member-names': reservedMemberNames,
  'single-export': singleExport,
  'strict-mutable': strictMutable
};
