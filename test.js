/*eslint quotes: [0]*/
'use strict';

require('mocha');
var assert = require('assert');
var regex = require('./');

describe('regex', function() {
  describe('single quotes', function() {
    it('should match single-quoted strings', function() {
      var match = `var foo = 'bar';`.match(regex());
      assert.equal(match[0], `'bar'`);
    });

    it('should match empty single-quoted strings', function() {
      var match = `var foo = '';`.match(regex());
      assert.equal(match[0], `''`);
    });
  });

  describe('double quotes', function() {
    it('should match double-quoted strings', function() {
      var match = 'var foo = "bar";'.match(regex());
      assert.equal(match[0], '"bar"');
    });

    it('should match empty double-quoted strings', function() {
      assert.equal('var foo = "";'.match(regex())[0], '""');
      assert.equal('var foo = "\'\'";'.match(regex())[0], '"\'\'"');
      assert.equal(regex().exec('var foo = "\'\'";')[2], '\'\'');
    });
  });

  describe('backticks', function() {
    it('should match strings in backticks', function() {
      var match = 'var foo = `${bar}`;'.match(regex());
      assert.equal(match[0], '`${bar}`');
    });

    it('should match empty strings in backticks', function() {
      assert.equal('var foo = ``;'.match(regex())[0], '``');
      assert.equal('var foo = `""`;'.match(regex())[0], '`""`');
      assert.equal(regex().exec('var foo = `\'\'`;')[2], '\'\'');
    });
  });

  describe('multiple', function() {
    it('should match multiple quoted strings', function() {
      var match = `var foo = "one";\nvar bar = 'two'\nvar baz = \`three\``.match(regex());
      assert.equal(match[0], '"one"');
      assert.equal(match[1], `'two'`);
      assert.equal(match[2], `\`three\``);
    });
  });

  describe('escaping', function() {
    it('should work with escaped quotes', function() {
      var double = `var foo = "bar\\"baz";`.match(regex());
      assert.equal(double[0], '"bar\\"baz"');

      var single = `var foo = 'bar\\'baz';`.match(regex());
      assert.equal(single[0], `'bar\\'baz'`);

      var both = `var foo = '"bar\\'\\"\\'baz"';`.match(regex());
      assert.equal(both[0], `'"bar\\'\\"\\'baz"'`);
    });

    it('should match complex nested quotes', function() {
      var double = `foo bar ". // ' \\" \\ . // ' \\ ." baz`.match(regex());
      assert.equal(double[0], `". // ' \\" \\ . // ' \\ ."`);

      var single = `foo bar '. // \\' \\" \\ . // \\' \\ .' baz`.match(regex());
      assert.equal(single[0], `'. // \\' \\" \\ . // \\' \\ .'`);
    });

    it('should create a match for the inner string', function() {
      var inner = regex().exec(`foo bar \\" \\' '. // \\' \\" \\ . // \\' \\ .' \\'\\' baz`);
      assert.equal(inner[2], '. // \\\' \\" \\ . // \\\' \\ .');
    });
  });
});
