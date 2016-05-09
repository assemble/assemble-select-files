/*!
 * assemble-select-files (https://github.com/assemble/assemble-select-files)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('assemble-select-files');

module.exports = function(config) {
  return function(app) {
    if (this.isRegistered('assemble-select-files')) return;
    debug('initializing "%s", from "%s"', __filename, module.parent.id);

    this.define('files', function() {
      debug('running files');
      
    });
  };
};
