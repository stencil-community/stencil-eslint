import asyncMethods from './async-methods';
import banPrefix from './ban-prefix';
import classSuffix from './class-suffix';
import decoratorsContext from './decorators-context';
import decoratorsStyle from './decorators-style';
import hostDataDeprecated from './host-data-deprecated';
import methodsMustBePublic from './methods-must-be-public';
import preferVdomListener from './prefer-vdom-listener';
import propsMustBePublic from './props-must-be-public';
import propsMustBeReadonly from './props-must-be-readonly';
import renderReturnsHost from './render-returns-host';
import requiredJsdoc from './required-jsdoc';
import requiredPrefix from './required-prefix';
import reservedMemberNames from './reserved-member-names';
import singleExport from './single-export';

export default {
  'async-methods': asyncMethods,
  'ban-prefix': banPrefix,
  'class-suffix': classSuffix,
  'decorators-context': decoratorsContext,
  'decorators-style': decoratorsStyle,
  'host-data-deprecated': hostDataDeprecated,
  'methods-must-be-public': methodsMustBePublic,
  'prefer-vdom-listener': preferVdomListener,
  'props-must-be-public': propsMustBePublic,
  'props-must-be-readonly': propsMustBeReadonly,
  'render-returns-host': renderReturnsHost,
  'required-jsdoc': requiredJsdoc,
  'required-prefix': requiredPrefix,
  'reserved-member-names': reservedMemberNames,
  'single-export': singleExport
};
