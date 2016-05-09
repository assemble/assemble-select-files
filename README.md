# assemble-select-files [![NPM version](https://img.shields.io/npm/v/assemble-select-files.svg?style=flat)](https://www.npmjs.com/package/assemble-select-files) [![NPM downloads](https://img.shields.io/npm/dm/assemble-select-files.svg?style=flat)](https://npmjs.org/package/assemble-select-files) [![Build Status](https://img.shields.io/travis/assemble/assemble-select-files.svg?style=flat)](https://travis-ci.org/assemble/assemble-select-files)

Assemble plugin that adds a `.selectFiles` method to the instance, for reading in a glob of files and prompting the user to select the files they want to write to the file system.

You might also be interested in [assemble-select-views](https://github.com/assemble/assemble-select-views).

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install assemble-select-files --save
```

**Example**

![assemble-select-files](https://cloud.githubusercontent.com/assets/383994/15121181/49828aec-15e7-11e6-9d7d-9f388f2666e3.gif)

## Usage

```js
var select = require('assemble-select-files');
var assemble = require('assemble');
var app = assemble();

// register the plugin
app.use(select());
```

**Example usage**

```js
// create a collection
app.create('pages');

// register an engine for rendering ".hbs" files
app.engine('hbs', require('engine-handlebars'));

// ask the user which files they want to render and write to the file system
app.selectFiles('*.hbs', function(err, files) {
  // `files` is the array of rendered files
  console.log(files);
});
```

## Related projects

You might also be interested in these projects:

* [assemble-select-views](https://www.npmjs.com/package/assemble-select-views): Assemble plugin that adds a `.selectViews` method to the instance, for prompting the user to… [more](https://www.npmjs.com/package/assemble-select-views) | [homepage](https://github.com/assemble/assemble-select-views)
* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)
* [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine.… [more](https://www.npmjs.com/package/templates) | [homepage](https://github.com/jonschlinkert/templates)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/assemble/assemble-select-files/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/assemble/assemble-select-files/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on May 09, 2016._