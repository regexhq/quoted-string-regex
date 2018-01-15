/*!
 * quoted-string-regex <https://github.com/regexps/quoted-string-regex>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

module.exports = function() {
  return /(?:\\['"`].)*?(['"`])((?:\\\1|.)*?)(\1)/g;
};
