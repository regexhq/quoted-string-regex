/*!
 * quoted-string-regex <https://github.com/jonschlinkert/quoted-string-regex>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function() {
  return /'([^'\\]*\\.)*[^']*'|"([^"\\]*\\.)*[^"]*"/g;
};
