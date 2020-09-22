var fs = require('fs');
var parser = require('./WT');


fs.readFile('./Entrada1.txt', (err, data) => {
    if (err) throw err;
    var a = parser.parse(data.toString());
    console.log(a);
    fs.writeFile('./output.txt',a.toString(),function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
    var obj = JSON.parse(a);
    console.log(obj)
    fs.writeFile('./output.json',a.toString(),function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });

});
