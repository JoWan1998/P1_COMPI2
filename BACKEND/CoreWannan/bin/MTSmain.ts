///<reference path="Statements.ts"/>
///<reference path="NativeStatements.ts"/>
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
        case "console":
            let console = consoleStatement(data);
            if(console!=null) instrucciones.push(console);
            break;
        case "graph":
        case "declaration":
        case "CallFunction":
        case "asignation":
        case "Argument":
        case "ArrayList":
        case "Object":
        case "MatrizPosition":
        case "variable":
        case "variableArray":
        case "funcion":
        case "continue":
        case "break":
        case "return":
        case "switch":
        case "case":
        case "default":
        case "if":
        case "dowhile":
        case "for":
        case "forin":
        case "while":
        case "forof":
        case "parameter":
        case "array":
        case "atributo":
        case "typebody":
        case "arreglo":
        case "callMatriz":
        case "callAtributo":
        case "callFuncion":
        case "nativeArray":
        case "postincrement":
        case "postdecrement":
        case "preincrement":
        case "predecrement":
        case "positivo":
        case "negativo":
        case "logical":
        case "Aritmetic":
        case "Relational":
        case "Logical":
        case "ternario":
        default:
            break;
    }
    return null;
}
function consoleStatement(console:string):statement
{
    try
    {
        let data = JSON.parse(console);
        let consola:NativeStatement = new NativeStatement(TypeStatement.NativeStatement, Native.console);
        consola.Expression = [];
        consola.linea = Number(data.linea);
        for(let datos of data.expression)
        {
            let val = getExpressiones(datos);
            if(val!=null) consola.Expression.push(val);
        }
        return consola;
    }
    catch (e) {
        return null;
    }

}
function getExpressiones(expressiones:string):statement
{
    try
    {
        let data = JSON.parse(expressiones);
        if(data.hasOwnProperty("statement"))
        {
            switch (data.statement)
            {
                case "console":
                    return consoleStatement(data);
                case "graph":

                case "declaration":
                case "CallFunction":
                case "asignation":
                case "Argument":
                case "ArrayList":
                case "Object":
                case "MatrizPosition":
                case "variable":
                case "variableArray":
                case "funcion":
                case "continue":
                case "break":
                case "return":
                case "switch":
                case "case":
                case "default":
                case "if":
                case "dowhile":
                case "for":
                case "forin":
                case "while":
                case "forof":
                case "parameter":
                case "array":
                case "atributo":
                case "typebody":
                case "arreglo":
                case "callMatriz":
                case "callAtributo":
                case "callFuncion":
                case "nativeArray":
                case "postincrement":
                case "postdecrement":
                case "preincrement":
                case "predecrement":
                case "positivo":
                case "negativo":
                case "logical":
                case "Aritmetic":
                case "Relational":
                case "Logical":
                case "ternario":

            }
        }
        else if(data.hasOwnProperty("tipo"))
        {
            switch (data.tipo)
            {
                case "null":
                    let nullable:Nulls = new Nulls();
                    nullable.tipoValue = TypeValue.null;
                    return nullable;
                case "boolean":
                    let booleano:Booleans = new Booleans();
                    booleano.tipoValue = TypeValue.Boolean;
                    booleano.type = null;
                    booleano.value = (data.value.toLowerCase( ) == "true");
                    return booleano;
                case "number":
                    let numeros:Numbers = new Numbers();
                    numeros.tipoValue = TypeValue.Number;
                    numeros.type = null;
                    numeros.value = Number(data.value);
                    return numeros;
                case "string1":
                    let strings:Strings = new Strings();
                    strings.tipoValue = TypeValue.String;
                    strings.type = null;
                    strings.value = data.value.toString();
                    return strings;
                case "string2":
                    let strings2:Strings = new Strings();
                    strings2.tipoValue = TypeValue.String;
                    strings2.type = null;
                    strings2.value = data.value.toString();
                    return strings2;
                case "string3":
                    let strings3:Cadena3 = new Cadena3();
                    strings3.tipoValue = TypeValue.String;
                    strings3.type = null;
                    strings3.value = data.value.toString();
                    return strings3;
            }
        }

    }catch (e)
    {
        return null;
    }
}
