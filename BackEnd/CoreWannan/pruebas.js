var fs = require('fs');
var parser = require('./WE');


fs.readFile('./Entrada2.txt', (err, data) => {
    if (err) throw err;
    var a = parser.parse(data.toString());
    console.log(a);
});
