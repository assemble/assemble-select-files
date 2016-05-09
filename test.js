'use strict';

require('mocha');
var assert = require('assert');
var assemble = require('assemble-core');
var questions = require('base-questions');
var conflicts = require('base-fs-conflicts');
var rename = require('base-fs-rename');
var exists = require('fs-exists-sync');
var del = require('delete');
var select = require('./');
var app;

describe('assemble-select-files', function() {
  describe('module', function() {
    it('should export a function', function() {
      assert.equal(typeof select, 'function');
    });
  });

  describe('plugin', function() {
    it('should only register the plugin once', function(cb) {
      var count = 0;
      app = assemble();
      app.on('plugin', function(name) {
        if (name === 'assemble-select-files') {
          count++;
        }
      });
      app.use(select());
      app.use(select());
      app.use(select());
      assert.equal(count, 1);
      cb();
    });
  });

  describe('errors', function() {
    beforeEach(function() {
      app = assemble();
      app.use(select());
      app.create('pages');
    });

    it('should throw an error when base-questions is not registered', function(cb) {
      app.use(conflicts());
      app.use(rename());

      app.selectFiles('fixtures/*.hbs', function(err, views) {
        assert(err);
        assert.equal(err.message, 'expected the base-questions plugin to be registered');
        cb();
      });
    });

    it('should throw an error when base-fs-conflicts is not registered', function(cb) {
      app.use(questions());
      app.use(rename());

      app.selectFiles('fixtures/*.hbs', function(err, views) {
        assert(err);
        assert.equal(err.message, 'expected the base-fs-conflicts plugin to be registered');
        cb();
      });
    });

    it('should throw an error when base-fs-rename is not registered', function(cb) {
      app.use(questions());
      app.use(conflicts());

      app.selectFiles('fixtures/*.hbs', function(err, views) {
        assert(err);
        assert.equal(err.message, 'expected the base-fs-rename plugin to be registered');
        cb();
      });
    });

    it('should throw an error when base-fs-rename is not registered', function(cb) {
      app.use(questions());
      app.use(conflicts());

      app.selectFiles('fixtures/*.hbs', function(err, views) {
        assert(err);
        assert.equal(err.message, 'expected the base-fs-rename plugin to be registered');
        cb();
      });
    });
  });

  describe('plugin', function() {
    this.timeout(10000);

    beforeEach(function() {
      app = assemble();
      app.use(questions());
      app.use(conflicts());
      app.use(rename());
      app.use(select());
      app.create('pages');
    });

    afterEach(function(cb) {
      del('actual', cb);
    });

    it('should render views specified on the `selectFiles` option', function(cb) {
      app.engine('hbs', require('engine-handlebars'));

      app.data({name: 'blah'});
      app.option('dest', 'actual');
      app.option('selectFiles', ['a.hbs', 'c.hbs']);
      app.option('flatten', true);

      app.selectFiles('fixtures/*.hbs', function(err, views) {
        if (err) return cb(err);
        assert(exists('actual/a.hbs'));
        assert(exists('actual/c.hbs'));
        cb();
      });
    });
  });
});
