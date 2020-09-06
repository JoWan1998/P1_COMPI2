/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

abstract class statement
{
    abstract type: TypeStatement;
    abstract StateCode: number;
    abstract execute(): any[2];
    abstract traduction():string;
    abstract grahp():string;
}
enum TypeSym
{
    'Variable',
    'Funcion'
}
enum TypeStatement
{
    'NativeStatement',
    'ControlStatement',
    'IterationStatement',
    'ExpresionStatement',
    'FunctionStatement',
    'DeclarationStatement',
    'AssignationStatement',
    'ReturnStatement',
    'BreakStatement',
    'ContinueStatement',
    'SwichtStatement'
}
enum Iteration
{
    'DoWhile',
    'While',
    'For'
}
enum Native
{
    console,
    graph
}
enum Expression
{
    Arichmetic,
    Logical,
    Relational
}
enum ArichmeticExpr
{
    suma,
    resta,
    division,
    multiplicacion,
    potenciacion,
    modulo,
    negacion
}
enum LogicalExpr
{
    O,
    Y,
    NOT
}
enum RelationalExpr
{
    MayorQue,
    MenorQue,
    Mayor,
    Menor,
    Igual,
    NoIgual
}
enum TypeValue
{
    String,
    Number,
    Object,
    Array
}
enum NativeArray
{
    Nothing,
    Push,
    Pop,
    Length
}