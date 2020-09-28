var fs = require('fs');
var parser = require('./WT');


fs.readFile('./errores.txt', (err, data) => {
    if (err) throw err;
    var a = parser.parse(data.toString());
    console.log(a[0])
    console.log(a[1])
    console.log(a[2])
    fs.writeFile('./output.txt',a[0],function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
    var obj = JSON.parse(a[0]);
    //console.log(obj)
    fs.writeFile('./output.json',a[0],function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });

});
