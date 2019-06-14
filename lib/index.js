/**
 * @fileoverview ESLint rules specific to Stencil JS projects.
 * @author Tom Chinery &lt;tom.chinery@addtoevent.co.uk&gt;
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

// import all configs in lib/configs
module.exports.configs = requireIndex(__dirname + "/configs");
