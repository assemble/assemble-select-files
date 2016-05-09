'use strict';

var path = require('path');
var assemble = require('assemble');
var questions = require('base-questions');
var conflicts = require('base-fs-conflicts');
var rename = require('base-fs-rename');
var select = require('./');

// register plugins
var app = assemble()
  .use(questions())
  .use(conflicts())
  .use(rename())
  .use(select())

app.preRender(/./, function(file, next) {
  file.data.name = file.stem.toUpperCase();
  next();
});

// engine
app.engine('hbs', require('engine-handlebars'));

// options
app.option({
  engine: 'hbs',
  dest: 'actual',
  flatten: true,
  renameKey: function(key, file) {
    return file ? file.basename : path.basename(key);
  }
});

// example task
app.task('default', function(cb) {
  app.selectFiles('fixtures/*.hbs', cb);
});

module.exports = app;
