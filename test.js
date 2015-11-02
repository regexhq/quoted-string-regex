'use strict';

require('mocha');
var assert = require('assert');
var regex = require('./');

describe('regex', function() {
  it('should return a function:', function() {
    assert(typeof regex === 'function');
  });

  it('should match single-quoted strings:', function() {
    var re = regex();
    var str = 'var foo = \'bar\';';
    var m = str.match(re);
    assert(m[0] === '\'bar\'');
  });

  it('should match double-quoted strings:', function() {
    var re = regex();
    var str = 'var foo = "bar";';
    var m = str.match(re);
    assert(m[0] === '"bar"');
  });

  it('should match multiple quoted strings:', function() {
    var re = regex();
    var str = 'var foo = "bar";\nvar bar = \'baz\'';
    var m = str.match(re);
    assert(m[0] === '"bar"');
    assert(m[1] === '\'baz\'');
  });

  it('should match complex nested quotes:', function() {
    var re = regex();
    var str = 'foo bar ". // \' \\ . // \' \\ ." baz';
    var m = str.match(re);
    assert(m[0] === '". // \' \\ . // \' \\ ."');
  });
});
