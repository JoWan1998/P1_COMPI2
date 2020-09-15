///<reference path="Statements.ts"/>
/*
    UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
    JOSE WANNAN - 201612331 @2020
 */

let instrucciones: statement[] = [];
let tablasimbolo: tablasimbolos = new tablasimbolos();


function generatinginformation(data:string)
{
    let statement = JSON.parse(data);
    console.log("No. Lineas: "+statement[0].linea);
    let S = statement[0].S;
    for(let statement of S)
    {
        let stat = getStatement(statement.toString());
        if(stat!=null) instrucciones.push(stat);
    }
}

function getStatement(data1:string):statement
{
    let data = JSON.parse(data1);
    switch (data.statement)
    {
        default:
            break;
    }
    return null;
}
