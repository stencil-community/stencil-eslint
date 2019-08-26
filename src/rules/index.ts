
import reservedMemberNames from './reserved-member-names';
import singleExport from './single-export';
import asyncMethods from './async-methods';
import propsMustBePublic from './props-must-be-public';
import methodsMustBePublic from './methods-must-be-public';
import decoratorsContext from './decorators-context';
import hostDataDeprecated from './host-data-deprecated';
import preferVdomListener from './prefer-vdom-listener';
import renderReturnsHost from './render-returns-host';
import propsMustBeReadonly from './props-must-be-readonly';

export default {
  'reserved-member-names': reservedMemberNames,
  'single-export': singleExport,
  'async-methods': asyncMethods,
  'props-must-be-public': propsMustBePublic,
  'methods-must-be-public': methodsMustBePublic,
  'decorators-context': decoratorsContext,
  'host-data-deprecated': hostDataDeprecated,
  'prefer-vdom-listener': preferVdomListener,
  'render-returns-host': renderReturnsHost,
  'props-must-be-readonly': propsMustBeReadonly
};
