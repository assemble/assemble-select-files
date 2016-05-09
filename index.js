'use strict';

var path = require('path');
var extend = require('extend-shallow');
var select = require('assemble-select-views');
var loader = require('assemble-loader');

module.exports = function(config) {
  config = config || {};

  return function plugin(app) {
    if (!isValidInstance(this)) return;


    this.use(select());
    this.use(loader());

    this.define('selectFiles', function(patterns, options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      var name = 'select_file';
      var defaults = {cwd: this.cwd, message: 'Which files to you want to render?'};
      var opts = extend(defaults, this.options, config, options);
      opts.dest = path.resolve(opts.cwd, opts.dest || '');

      if (typeof opts.renameKey !== 'function') {
        opts.renameKey = function(key, file) {
          return file ? file.basename : path.basename(key);
        };
      }

      if (typeof this.question !== 'function') {
        cb(new Error('expected the base-questions plugin to be registered'));
        return;
      }

      // create a temporary view collection
      this.create(name, opts);
      this[name].load(patterns, opts);

      if (typeof opts.selectFiles !== 'undefined') {
        opts.selectViews = opts.selectFiles;
      }

      return this.selectViews(name, opts, function(err, views) {
        if (err) return cb(err);

        // clean up temporary collection
        app.del('views.' + name);
        app.del(name);

        // pass rendered views to callback
        cb(null, views);
      });
    });

    return plugin;
  };
};

function isValidInstance(app) {
  if (!app.isApp && !app.isGenerator && !app.isViews) {
    return false;
  }
  if (app.isRegistered('assemble-select-files')) {
    return false;
  }
  return true;
}

