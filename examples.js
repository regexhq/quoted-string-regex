var regex = require('./');

console.log(regex().exec('var foo = \'bar\';')[2]);
//=> ['bar']

console.log(regex().exec('var foo = "bar";')[2]);
//=> ['bar']

console.log(regex().exec('var foo = "bar";\nvar bar = \'baz\'')[2]);
//=> ['bar']

console.log('var foo = "one";\nvar bar = \'two\';\nvar baz = `three`'.match(regex()));
//=> [ '"one"', '\'two\'', '`three`' ]

console.log(regex().exec('foo bar ". // \' \\ . // \' \\ ." baz')[2]);
//=> ['. // \' \\ . // \' \\ .']
