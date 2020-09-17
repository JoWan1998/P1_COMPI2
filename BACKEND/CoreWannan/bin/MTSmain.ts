///<reference path="Statements.ts"/>
///<reference path="NativeStatements.ts"/>
///<reference path="DeclarationStatements.ts"/>
/*
    UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
    JOSE WANNAN - 201612331 @2020
 */
let jsondataprueba = '{"linea":"196","S":[{"linea":"1","statement":"declaration","type":[{"linea":"1","tipo":[{"linea":"1","tipo":"let"}],"size":[]}], "values":[{"linea":"1","statement":"variable","tipoExpresion":[{"linea":"1","tipo":[{"linea":"1","tipo":"number"}],"size":[{"linea":"1","statement":"array","elementos":[]},\n' +
    '{"linea":"1","statement":"array","elementos":[]}]}],"name":"matrixA","ValExpression":[{"linea":"1","operator":[{"linea":"1","v":"="}],"Expression":[{"linea":"1","statement":"arreglo","value":[]}]}]}]},\n' +
    '{"linea":"2","statement":"declaration","type":[{"linea":"2","tipo":[{"linea":"2","tipo":"let"}],"size":[]}], "values":[{"linea":"2","statement":"variable","tipoExpresion":[{"linea":"2","tipo":[{"linea":"2","tipo":"number"}],"size":[{"linea":"2","statement":"array","elementos":[]},\n' +
    '{"linea":"2","statement":"array","elementos":[]}]}],"name":"matrixB","ValExpression":[{"linea":"2","operator":[{"linea":"2","v":"="}],"Expression":[{"linea":"2","statement":"arreglo","value":[]}]}]}]},\n' +
    '{"linea":"3","statement":"declaration","type":[{"linea":"3","tipo":[{"linea":"3","tipo":"let"}],"size":[]}], "values":[{"linea":"3","statement":"variable","tipoExpresion":[{"linea":"3","tipo":[{"linea":"3","tipo":"number"}],"size":[{"linea":"3","statement":"array","elementos":[]},\n' +
    '{"linea":"3","statement":"array","elementos":[]}]}],"name":"matrixR","ValExpression":[{"linea":"3","operator":[{"linea":"3","v":"="}],"Expression":[{"linea":"3","statement":"arreglo","value":[]}]}]}]},\n' +
    '{"linea":"4","statement":"declaration","type":[{"linea":"4","tipo":[{"linea":"4","tipo":"const"}],"size":[]}], "values":[{"linea":"4","statement":"variable","tipoExpresion":[],"name":"min","ValExpression":[{"linea":"4","operator":[{"linea":"4","v":"="}],"Expression":[{"linea":"4","tipo":"number", "value":"0"}]}]}]},\n' +
    '{"linea":"5","statement":"declaration","type":[{"linea":"5","tipo":[{"linea":"5","tipo":"const"}],"size":[]}], "values":[{"linea":"5","statement":"variable","tipoExpresion":[],"name":"max","ValExpression":[{"linea":"5","operator":[{"linea":"5","v":"="}],"Expression":[{"linea":"5","tipo":"number", "value":"4"}]}]}]},\n' +
    '{"linea":"18","statement":"funcion","name":"llenado","type":[{"linea":"7","tipo":[{"linea":"7","tipo":"void"}],"size":[]}],"params":[{"linea":"7","statement":"parameter","name":"matrix1","tipo":[{"linea":"7","tipo":[{"linea":"7","tipo":"number"}],"size":[{"linea":"7","statement":"array","elementos":[]},\n' +
    '{"linea":"7","statement":"array","elementos":[]}]}]},\n' +
    '{"linea":"7","statement":"parameter","name":"matrix2","tipo":[{"linea":"7","tipo":[{"linea":"7","tipo":"number"}],"size":[{"linea":"7","statement":"array","elementos":[]},\n' +
    '{"linea":"7","statement":"array","elementos":[]}]}]},\n' +
    '{"linea":"7","statement":"parameter","name":"matrix3","tipo":[{"linea":"7","tipo":[{"linea":"7","tipo":"number"}],"size":[{"linea":"7","statement":"array","elementos":[]},\n' +
    '{"linea":"7","statement":"array","elementos":[]}]}]}],"body":[{"linea":"17","statement":"for","ExpresionInitial":[{"linea":"8","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"8","tipo":"let"}],"name":"i","ValExpression":[{"linea":"8","operator":[{"linea":"8","v":"="}],"Expression":[{"linea":"8","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"8","statement":"Relational","Relational":"<","Expression1":[{"linea":"8","statement":"variable","value":"i"}],"Expression2":[{"linea":"8","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"8","statement":"postincrement","padre":[{"linea":"8","statement":"variable","value":"i"}]}],"body":[{"linea":"9","statement":"asignation","variable":"matrix1","params":[{"linea":"9","statement":"ArrayList","value":[{"linea":"9","statement":"MatrizPosition","value":[{"linea":"9","statement":"variable","value":"i"}]}]}],"ValExpression":[{"linea":"9","operator":[{"linea":"9","v":"="}],"Expression":[{"linea":"9","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"10","statement":"asignation","variable":"matrix2","params":[{"linea":"10","statement":"ArrayList","value":[{"linea":"10","statement":"MatrizPosition","value":[{"linea":"10","statement":"variable","value":"i"}]}]}],"ValExpression":[{"linea":"10","operator":[{"linea":"10","v":"="}],"Expression":[{"linea":"10","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"11","statement":"asignation","variable":"matrix3","params":[{"linea":"11","statement":"ArrayList","value":[{"linea":"11","statement":"MatrizPosition","value":[{"linea":"11","statement":"variable","value":"i"}]}]}],"ValExpression":[{"linea":"11","operator":[{"linea":"11","v":"="}],"Expression":[{"linea":"11","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"16","statement":"for","ExpresionInitial":[{"linea":"12","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"12","tipo":"let"}],"name":"j","ValExpression":[{"linea":"12","operator":[{"linea":"12","v":"="}],"Expression":[{"linea":"12","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"12","statement":"Relational","Relational":"<","Expression1":[{"linea":"12","statement":"variable","value":"j"}],"Expression2":[{"linea":"12","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"12","statement":"postincrement","padre":[{"linea":"12","statement":"variable","value":"j"}]}],"body":[{"linea":"13","statement":"asignation","variable":"matrix1","params":[{"linea":"13","statement":"ArrayList","value":[{"linea":"13","statement":"MatrizPosition","value":[{"linea":"13","statement":"variable","value":"i"}]},\n' +
    '{"linea":"13","statement":"MatrizPosition","value":[{"linea":"13","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"13","operator":[{"linea":"13","v":"="}],"Expression":[{"linea":"13","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"13","statement":"Aritmetic","Aritmetic":"*","Expression1":[{"linea":"13","statement":"variable","value":"j"}],"Expression2":[{"linea":"13","tipo":"number", "value":"3"}]}],"Expression2":[{"linea":"13","statement":"variable","value":"i"}]}]}]},\n' +
    '{"linea":"14","statement":"asignation","variable":"matrix2","params":[{"linea":"14","statement":"ArrayList","value":[{"linea":"14","statement":"MatrizPosition","value":[{"linea":"14","statement":"variable","value":"i"}]},\n' +
    '{"linea":"14","statement":"MatrizPosition","value":[{"linea":"14","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"14","operator":[{"linea":"14","v":"="}],"Expression":[{"linea":"14","statement":"Aritmetic","Aritmetic":"-","Expression1":[{"linea":"14","statement":"Aritmetic","Aritmetic":"**","Expression1":[{"linea":"14","statement":"variable","value":"i"}],"Expression2":[{"linea":"14","tipo":"number", "value":"3"}]}],"Expression2":[{"linea":"14","statement":"Aritmetic","Aritmetic":"**","Expression1":[{"linea":"14","statement":"variable","value":"j"}],"Expression2":[{"linea":"14","tipo":"number", "value":"2"}]}]}]}]},\n' +
    '{"linea":"15","statement":"asignation","variable":"matrix3","params":[{"linea":"15","statement":"ArrayList","value":[{"linea":"15","statement":"MatrizPosition","value":[{"linea":"15","statement":"variable","value":"i"}]},\n' +
    '{"linea":"15","statement":"MatrizPosition","value":[{"linea":"15","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"15","operator":[{"linea":"15","v":"="}],"Expression":[{"linea":"15","tipo":"number", "value":"0"}]}]}]}]}]},\n' +
    '{"linea":"28","statement":"funcion","name":"print","type":[{"linea":"20","tipo":[{"linea":"20","tipo":"void"}],"size":[]}],"params":[{"linea":"20","statement":"parameter","name":"matrix","tipo":[{"linea":"20","tipo":[{"linea":"20","tipo":"number"}],"size":[{"linea":"20","statement":"array","elementos":[]},\n' +
    '{"linea":"20","statement":"array","elementos":[]}]}]}],"body":[{"linea":"27","statement":"for","ExpresionInitial":[{"linea":"21","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"21","tipo":"let"}],"name":"i","ValExpression":[{"linea":"21","operator":[{"linea":"21","v":"="}],"Expression":[{"linea":"21","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"21","statement":"Relational","Relational":"<","Expression1":[{"linea":"21","statement":"variable","value":"i"}],"Expression2":[{"linea":"21","statement":"nativeArray", "padre":[{"linea":"21","statement":"variable","value":"matrix"}],"native":"length"}]}],"ExpressionFinal":[{"linea":"21","statement":"postincrement","padre":[{"linea":"21","statement":"variable","value":"i"}]}],"body":[{"linea":"22","statement":"declaration","type":[{"linea":"22","tipo":[{"linea":"22","tipo":"let"}],"size":[]}], "values":[{"linea":"22","statement":"variable","tipoExpresion":[],"name":"salida","ValExpression":[{"linea":"22","operator":[{"linea":"22","v":"="}],"Expression":[{"linea":"22","tipo":"string3", "value":""}]}]}]},\n' +
    '{"linea":"25","statement":"for","ExpresionInitial":[{"linea":"23","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"23","tipo":"let"}],"name":"j","ValExpression":[{"linea":"23","operator":[{"linea":"23","v":"="}],"Expression":[{"linea":"23","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"23","statement":"Relational","Relational":"<","Expression1":[{"linea":"23","statement":"variable","value":"j"}],"Expression2":[{"linea":"23","statement":"nativeArray", "padre":[{"linea":"23","statement":"callMatriz", "padre":[{"linea":"23","statement":"variable","value":"matrix"}],"posicion":[{"linea":"23","statement":"variable","value":"i"}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"23","statement":"postincrement","padre":[{"linea":"23","statement":"variable","value":"j"}]}],"body":[{"linea":"24","statement":"asignation","variable":"salida","params":[],"ValExpression":[{"linea":"24","operator":[{"linea":"24","v":"="}],"Expression":[{"linea":"24","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"24","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"24","statement":"variable","value":"salida"}],"Expression2":[{"linea":"24","tipo":"string1", "value":"\\t|\\t"}]}],"Expression2":[{"linea":"24","statement":"callMatriz", "padre":[{"linea":"24","statement":"callMatriz", "padre":[{"linea":"24","statement":"variable","value":"matrix"}],"posicion":[{"linea":"24","statement":"variable","value":"i"}]}],"posicion":[{"linea":"24","statement":"variable","value":"j"}]}]}]}]}]},\n' +
    '{"linea":"26","statement":"console","expression":[{"linea":"26","statement":"variable","value":"salida"}]}]}]},\n' +
    '{"linea":"36","statement":"funcion","name":"suma","type":[],"params":[{"linea":"30","statement":"parameter","name":"matrix1","tipo":[{"linea":"30","tipo":[{"linea":"30","tipo":"number"}],"size":[{"linea":"30","statement":"array","elementos":[]},\n' +
    '{"linea":"30","statement":"array","elementos":[]}]}]},\n' +
    '{"linea":"30","statement":"parameter","name":"matrix2","tipo":[{"linea":"30","tipo":[{"linea":"30","tipo":"number"}],"size":[{"linea":"30","statement":"array","elementos":[]},\n' +
    '{"linea":"30","statement":"array","elementos":[]}]}]},\n' +
    '{"linea":"30","statement":"parameter","name":"matrixR","tipo":[{"linea":"30","tipo":[{"linea":"30","tipo":"number"}],"size":[{"linea":"30","statement":"array","elementos":[]},\n' +
    '{"linea":"30","statement":"array","elementos":[]}]}]}],"body":[{"linea":"35","statement":"for","ExpresionInitial":[{"linea":"31","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"31","tipo":"let"}],"name":"i","ValExpression":[{"linea":"31","operator":[{"linea":"31","v":"="}],"Expression":[{"linea":"31","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"31","statement":"Relational","Relational":"<","Expression1":[{"linea":"31","statement":"variable","value":"i"}],"Expression2":[{"linea":"31","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"31","statement":"postincrement","padre":[{"linea":"31","statement":"variable","value":"i"}]}],"body":[{"linea":"34","statement":"for","ExpresionInitial":[{"linea":"32","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"32","tipo":"let"}],"name":"j","ValExpression":[{"linea":"32","operator":[{"linea":"32","v":"="}],"Expression":[{"linea":"32","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"32","statement":"Relational","Relational":"<","Expression1":[{"linea":"32","statement":"variable","value":"j"}],"Expression2":[{"linea":"32","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"32","statement":"postincrement","padre":[{"linea":"32","statement":"variable","value":"j"}]}],"body":[{"linea":"33","statement":"asignation","variable":"matrixR","params":[{"linea":"33","statement":"ArrayList","value":[{"linea":"33","statement":"MatrizPosition","value":[{"linea":"33","statement":"variable","value":"i"}]},\n' +
    '{"linea":"33","statement":"MatrizPosition","value":[{"linea":"33","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"33","operator":[{"linea":"33","v":"="}],"Expression":[{"linea":"33","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"33","statement":"callMatriz", "padre":[{"linea":"33","statement":"callMatriz", "padre":[{"linea":"33","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"33","statement":"variable","value":"i"}]}],"posicion":[{"linea":"33","statement":"variable","value":"j"}]}],"Expression2":[{"linea":"33","statement":"callMatriz", "padre":[{"linea":"33","statement":"callMatriz", "padre":[{"linea":"33","statement":"variable","value":"matrix2"}],"posicion":[{"linea":"33","statement":"variable","value":"i"}]}],"posicion":[{"linea":"33","statement":"variable","value":"j"}]}]}]}]}]}]}]},\n' +
    '{"linea":"50","statement":"funcion","name":"sumarFilas","type":[{"linea":"38","tipo":[{"linea":"38","tipo":"void"}],"size":[]}],"params":[{"linea":"38","statement":"parameter","name":"matrix","tipo":[{"linea":"38","tipo":[{"linea":"38","tipo":"number"}],"size":[{"linea":"38","statement":"array","elementos":[]},\n' +
    '{"linea":"38","statement":"array","elementos":[]}]}]}],"body":[{"linea":"39","statement":"declaration","type":[{"linea":"39","tipo":[{"linea":"39","tipo":"let"}],"size":[]}], "values":[{"linea":"39","statement":"variable","tipoExpresion":[],"name":"contador","ValExpression":[{"linea":"39","operator":[{"linea":"39","v":"="}],"Expression":[{"linea":"39","tipo":"number", "value":"0"}]}]}]},\n' +
    '{"linea":"40","statement":"console","expression":[{"linea":"40","tipo":"string1", "value":"\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tR"}]},\n' +
    '{"linea":"49","statement":"for","ExpresionInitial":[{"linea":"41","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"41","tipo":"let"}],"name":"i","ValExpression":[{"linea":"41","operator":[{"linea":"41","v":"="}],"Expression":[{"linea":"41","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"41","statement":"Relational","Relational":"<","Expression1":[{"linea":"41","statement":"variable","value":"i"}],"Expression2":[{"linea":"41","statement":"nativeArray", "padre":[{"linea":"41","statement":"variable","value":"matrix"}],"native":"length"}]}],"ExpressionFinal":[{"linea":"41","statement":"postincrement","padre":[{"linea":"41","statement":"variable","value":"i"}]}],"body":[{"linea":"42","statement":"asignation","variable":"contador","params":[],"ValExpression":[{"linea":"42","operator":[{"linea":"42","v":"="}],"Expression":[{"linea":"42","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"43","statement":"declaration","type":[{"linea":"43","tipo":[{"linea":"43","tipo":"let"}],"size":[]}], "values":[{"linea":"43","statement":"variable","tipoExpresion":[],"name":"salida","ValExpression":[{"linea":"43","operator":[{"linea":"43","v":"="}],"Expression":[{"linea":"43","tipo":"string3", "value":""}]}]}]},\n' +
    '{"linea":"47","statement":"for","ExpresionInitial":[{"linea":"44","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"44","tipo":"let"}],"name":"j","ValExpression":[{"linea":"44","operator":[{"linea":"44","v":"="}],"Expression":[{"linea":"44","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"44","statement":"Relational","Relational":"<","Expression1":[{"linea":"44","statement":"variable","value":"j"}],"Expression2":[{"linea":"44","statement":"nativeArray", "padre":[{"linea":"44","statement":"callMatriz", "padre":[{"linea":"44","statement":"variable","value":"matrix"}],"posicion":[{"linea":"44","statement":"variable","value":"i"}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"44","statement":"postincrement","padre":[{"linea":"44","statement":"variable","value":"j"}]}],"body":[{"linea":"45","statement":"asignation","variable":"contador","params":[],"ValExpression":[{"linea":"45","operator":[{"linea":"45","v":"="}],"Expression":[{"linea":"45","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"45","statement":"variable","value":"contador"}],"Expression2":[{"linea":"45","statement":"callMatriz", "padre":[{"linea":"45","statement":"callMatriz", "padre":[{"linea":"45","statement":"variable","value":"matrix"}],"posicion":[{"linea":"45","statement":"variable","value":"i"}]}],"posicion":[{"linea":"45","statement":"variable","value":"j"}]}]}]}]},\n' +
    '{"linea":"46","statement":"asignation","variable":"salida","params":[],"ValExpression":[{"linea":"46","operator":[{"linea":"46","v":"="}],"Expression":[{"linea":"46","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"46","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"46","statement":"variable","value":"salida"}],"Expression2":[{"linea":"46","tipo":"string1", "value":"\\t|\\t"}]}],"Expression2":[{"linea":"46","statement":"callMatriz", "padre":[{"linea":"46","statement":"callMatriz", "padre":[{"linea":"46","statement":"variable","value":"matrix"}],"posicion":[{"linea":"46","statement":"variable","value":"i"}]}],"posicion":[{"linea":"46","statement":"variable","value":"j"}]}]}]}]}]},\n' +
    '{"linea":"48","statement":"console","expression":[{"linea":"48","statement":"variable","value":"salida"},\n' +
    '{"linea":"48","tipo":"string1", "value":"\\t|\\t"},\n' +
    '{"linea":"48","statement":"variable","value":"contador"}]}]}]},\n' +
    '{"linea":"63","statement":"funcion","name":"sumarColumnas","type":[{"linea":"52","tipo":[{"linea":"52","tipo":"void"}],"size":[]}],"params":[{"linea":"52","statement":"parameter","name":"matrix","tipo":[{"linea":"52","tipo":[{"linea":"52","tipo":"number"}],"size":[{"linea":"52","statement":"array","elementos":[]},\n' +
    '{"linea":"52","statement":"array","elementos":[]}]}]}],"body":[{"linea":"53","statement":"declaration","type":[{"linea":"53","tipo":[{"linea":"53","tipo":"let"}],"size":[]}], "values":[{"linea":"53","statement":"variable","tipoExpresion":[],"name":"contador","ValExpression":[{"linea":"53","operator":[{"linea":"53","v":"="}],"Expression":[{"linea":"53","tipo":"number", "value":"0"}]}]}]},\n' +
    '{"linea":"54","statement":"declaration","type":[{"linea":"54","tipo":[{"linea":"54","tipo":"let"}],"size":[]}], "values":[{"linea":"54","statement":"variable","tipoExpresion":[],"name":"salida","ValExpression":[{"linea":"54","operator":[{"linea":"54","v":"="}],"Expression":[{"linea":"54","tipo":"string3", "value":"R"}]}]}]},\n' +
    '{"linea":"61","statement":"for","ExpresionInitial":[{"linea":"55","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"55","tipo":"let"}],"name":"i","ValExpression":[{"linea":"55","operator":[{"linea":"55","v":"="}],"Expression":[{"linea":"55","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"55","statement":"Relational","Relational":"<","Expression1":[{"linea":"55","statement":"variable","value":"i"}],"Expression2":[{"linea":"55","statement":"nativeArray", "padre":[{"linea":"55","statement":"variable","value":"matrix"}],"native":"length"}]}],"ExpressionFinal":[{"linea":"55","statement":"postincrement","padre":[{"linea":"55","statement":"variable","value":"i"}]}],"body":[{"linea":"56","statement":"asignation","variable":"contador","params":[],"ValExpression":[{"linea":"56","operator":[{"linea":"56","v":"="}],"Expression":[{"linea":"56","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"59","statement":"for","ExpresionInitial":[{"linea":"57","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"57","tipo":"let"}],"name":"j","ValExpression":[{"linea":"57","operator":[{"linea":"57","v":"="}],"Expression":[{"linea":"57","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"57","statement":"Relational","Relational":"<","Expression1":[{"linea":"57","statement":"variable","value":"j"}],"Expression2":[{"linea":"57","statement":"nativeArray", "padre":[{"linea":"57","statement":"callMatriz", "padre":[{"linea":"57","statement":"variable","value":"matrix"}],"posicion":[{"linea":"57","statement":"variable","value":"i"}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"57","statement":"postincrement","padre":[{"linea":"57","statement":"variable","value":"j"}]}],"body":[{"linea":"58","statement":"asignation","variable":"contador","params":[],"ValExpression":[{"linea":"58","operator":[{"linea":"58","v":"="}],"Expression":[{"linea":"58","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"58","statement":"variable","value":"contador"}],"Expression2":[{"linea":"58","statement":"callMatriz", "padre":[{"linea":"58","statement":"callMatriz", "padre":[{"linea":"58","statement":"variable","value":"matrix"}],"posicion":[{"linea":"58","statement":"variable","value":"j"}]}],"posicion":[{"linea":"58","statement":"variable","value":"i"}]}]}]}]}]},\n' +
    '{"linea":"60","statement":"asignation","variable":"salida","params":[],"ValExpression":[{"linea":"60","operator":[{"linea":"60","v":"="}],"Expression":[{"linea":"60","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"60","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"60","statement":"variable","value":"salida"}],"Expression2":[{"linea":"60","tipo":"string1", "value":"\\t|\\t"}]}],"Expression2":[{"linea":"60","statement":"variable","value":"contador"}]}]}]}]},\n' +
    '{"linea":"62","statement":"console","expression":[{"linea":"62","statement":"variable","value":"salida"}]}]},\n' +
    '{"linea":"72","statement":"funcion","name":"resta","type":[],"params":[{"linea":"66","statement":"parameter","name":"matrix1","tipo":[{"linea":"66","tipo":[{"linea":"66","tipo":"number"}],"size":[{"linea":"66","statement":"array","elementos":[]},\n' +
    '{"linea":"66","statement":"array","elementos":[]}]}]},\n' +
    '{"linea":"66","statement":"parameter","name":"matrix2","tipo":[{"linea":"66","tipo":[{"linea":"66","tipo":"number"}],"size":[{"linea":"66","statement":"array","elementos":[]},\n' +
    '{"linea":"66","statement":"array","elementos":[]}]}]},\n' +
    '{"linea":"66","statement":"parameter","name":"matrixR","tipo":[{"linea":"66","tipo":[{"linea":"66","tipo":"number"}],"size":[{"linea":"66","statement":"array","elementos":[]},\n' +
    '{"linea":"66","statement":"array","elementos":[]}]}]}],"body":[{"linea":"71","statement":"for","ExpresionInitial":[{"linea":"67","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"67","tipo":"let"}],"name":"i","ValExpression":[{"linea":"67","operator":[{"linea":"67","v":"="}],"Expression":[{"linea":"67","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"67","statement":"Relational","Relational":"<","Expression1":[{"linea":"67","statement":"variable","value":"i"}],"Expression2":[{"linea":"67","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"67","statement":"postincrement","padre":[{"linea":"67","statement":"variable","value":"i"}]}],"body":[{"linea":"70","statement":"for","ExpresionInitial":[{"linea":"68","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"68","tipo":"let"}],"name":"j","ValExpression":[{"linea":"68","operator":[{"linea":"68","v":"="}],"Expression":[{"linea":"68","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"68","statement":"Relational","Relational":"<","Expression1":[{"linea":"68","statement":"variable","value":"j"}],"Expression2":[{"linea":"68","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"68","statement":"postincrement","padre":[{"linea":"68","statement":"variable","value":"j"}]}],"body":[{"linea":"69","statement":"asignation","variable":"matrixR","params":[{"linea":"69","statement":"ArrayList","value":[{"linea":"69","statement":"MatrizPosition","value":[{"linea":"69","statement":"variable","value":"i"}]},\n' +
    '{"linea":"69","statement":"MatrizPosition","value":[{"linea":"69","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"69","operator":[{"linea":"69","v":"="}],"Expression":[{"linea":"69","statement":"Aritmetic","Aritmetic":"-","Expression1":[{"linea":"69","statement":"callMatriz", "padre":[{"linea":"69","statement":"callMatriz", "padre":[{"linea":"69","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"69","statement":"variable","value":"i"}]}],"posicion":[{"linea":"69","statement":"variable","value":"j"}]}],"Expression2":[{"linea":"69","statement":"callMatriz", "padre":[{"linea":"69","statement":"callMatriz", "padre":[{"linea":"69","statement":"variable","value":"matrix2"}],"posicion":[{"linea":"69","statement":"variable","value":"i"}]}],"posicion":[{"linea":"69","statement":"variable","value":"j"}]}]}]}]}]}]}]},\n' +
    '{"linea":"83","statement":"funcion","name":"multiplicar","type":[],"params":[{"linea":"75","statement":"parameter","name":"matrix1","tipo":[{"linea":"75","tipo":[{"linea":"75","tipo":"number"}],"size":[{"linea":"75","statement":"array","elementos":[]},\n' +
    '{"linea":"75","statement":"array","elementos":[]}]}]},\n' +
    '{"linea":"75","statement":"parameter","name":"matrix2","tipo":[{"linea":"75","tipo":[{"linea":"75","tipo":"number"}],"size":[{"linea":"75","statement":"array","elementos":[]},\n' +
    '{"linea":"75","statement":"array","elementos":[]}]}]},\n' +
    '{"linea":"75","statement":"parameter","name":"matrixR","tipo":[{"linea":"75","tipo":[{"linea":"75","tipo":"number"}],"size":[{"linea":"75","statement":"array","elementos":[]},\n' +
    '{"linea":"75","statement":"array","elementos":[]}]}]}],"body":[{"linea":"82","statement":"for","ExpresionInitial":[{"linea":"76","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"76","tipo":"let"}],"name":"i","ValExpression":[{"linea":"76","operator":[{"linea":"76","v":"="}],"Expression":[{"linea":"76","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"76","statement":"Relational","Relational":"<","Expression1":[{"linea":"76","statement":"variable","value":"i"}],"Expression2":[{"linea":"76","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"76","statement":"postincrement","padre":[{"linea":"76","statement":"variable","value":"i"}]}],"body":[{"linea":"81","statement":"for","ExpresionInitial":[{"linea":"77","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"77","tipo":"let"}],"name":"j","ValExpression":[{"linea":"77","operator":[{"linea":"77","v":"="}],"Expression":[{"linea":"77","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"77","statement":"Relational","Relational":"<","Expression1":[{"linea":"77","statement":"variable","value":"j"}],"Expression2":[{"linea":"77","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"77","statement":"postincrement","padre":[{"linea":"77","statement":"variable","value":"j"}]}],"body":[{"linea":"80","statement":"for","ExpresionInitial":[{"linea":"78","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"78","tipo":"let"}],"name":"k","ValExpression":[{"linea":"78","operator":[{"linea":"78","v":"="}],"Expression":[{"linea":"78","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"78","statement":"Relational","Relational":"<","Expression1":[{"linea":"78","statement":"variable","value":"k"}],"Expression2":[{"linea":"78","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"78","statement":"postincrement","padre":[{"linea":"78","statement":"variable","value":"k"}]}],"body":[{"linea":"79","statement":"asignation","variable":"matrixR","params":[{"linea":"79","statement":"ArrayList","value":[{"linea":"79","statement":"MatrizPosition","value":[{"linea":"79","statement":"variable","value":"i"}]},\n' +
    '{"linea":"79","statement":"MatrizPosition","value":[{"linea":"79","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"79","operator":[{"linea":"79","v":"="}],"Expression":[{"linea":"79","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"79","statement":"callMatriz", "padre":[{"linea":"79","statement":"callMatriz", "padre":[{"linea":"79","statement":"variable","value":"matrixR"}],"posicion":[{"linea":"79","statement":"variable","value":"i"}]}],"posicion":[{"linea":"79","statement":"variable","value":"j"}]}],"Expression2":[{"linea":"79","statement":"Aritmetic","Aritmetic":"*","Expression1":[{"linea":"79","statement":"callMatriz", "padre":[{"linea":"79","statement":"callMatriz", "padre":[{"linea":"79","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"79","statement":"variable","value":"i"}]}],"posicion":[{"linea":"79","statement":"variable","value":"k"}]}],"Expression2":[{"linea":"79","statement":"callMatriz", "padre":[{"linea":"79","statement":"callMatriz", "padre":[{"linea":"79","statement":"variable","value":"matrix2"}],"posicion":[{"linea":"79","statement":"variable","value":"k"}]}],"posicion":[{"linea":"79","statement":"variable","value":"j"}]}]}]}]}]}]}]}]}]},\n' +
    '{"linea":"98","statement":"funcion","name":"transpuesta","type":[],"params":[{"linea":"85","statement":"parameter","name":"matrix1","tipo":[{"linea":"85","tipo":[{"linea":"85","tipo":"number"}],"size":[{"linea":"85","statement":"array","elementos":[]},\n' +
    '{"linea":"85","statement":"array","elementos":[]}]}]}],"body":[{"linea":"86","statement":"declaration","type":[{"linea":"86","tipo":[{"linea":"86","tipo":"const"}],"size":[]}], "values":[{"linea":"86","statement":"variable","tipoExpresion":[{"linea":"86","tipo":[{"linea":"86","tipo":"number"}],"size":[{"linea":"86","statement":"array","elementos":[]},\n' +
    '{"linea":"86","statement":"array","elementos":[]}]}],"name":"matrixAux","ValExpression":[{"linea":"86","operator":[{"linea":"86","v":"="}],"Expression":[{"linea":"86","statement":"arreglo","value":[]}]}]}]},\n' +
    '{"linea":"92","statement":"for","ExpresionInitial":[{"linea":"87","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"87","tipo":"let"}],"name":"i","ValExpression":[{"linea":"87","operator":[{"linea":"87","v":"="}],"Expression":[{"linea":"87","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"87","statement":"Relational","Relational":"<","Expression1":[{"linea":"87","statement":"variable","value":"i"}],"Expression2":[{"linea":"87","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"87","statement":"postincrement","padre":[{"linea":"87","statement":"variable","value":"i"}]}],"body":[{"linea":"88","statement":"asignation","variable":"matrixAux","params":[{"linea":"88","statement":"ArrayList","value":[{"linea":"88","statement":"MatrizPosition","value":[{"linea":"88","statement":"variable","value":"i"}]}]}],"ValExpression":[{"linea":"88","operator":[{"linea":"88","v":"="}],"Expression":[{"linea":"88","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"91","statement":"for","ExpresionInitial":[{"linea":"89","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"89","tipo":"let"}],"name":"j","ValExpression":[{"linea":"89","operator":[{"linea":"89","v":"="}],"Expression":[{"linea":"89","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"89","statement":"Relational","Relational":"<","Expression1":[{"linea":"89","statement":"variable","value":"j"}],"Expression2":[{"linea":"89","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"89","statement":"postincrement","padre":[{"linea":"89","statement":"variable","value":"j"}]}],"body":[{"linea":"90","statement":"asignation","variable":"matrixAux","params":[{"linea":"90","statement":"ArrayList","value":[{"linea":"90","statement":"MatrizPosition","value":[{"linea":"90","statement":"variable","value":"i"}]},\n' +
    '{"linea":"90","statement":"MatrizPosition","value":[{"linea":"90","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"90","operator":[{"linea":"90","v":"="}],"Expression":[{"linea":"90","statement":"callMatriz", "padre":[{"linea":"90","statement":"callMatriz", "padre":[{"linea":"90","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"90","statement":"variable","value":"j"}]}],"posicion":[{"linea":"90","statement":"variable","value":"i"}]}]}]}]}]},\n' +
    '{"linea":"97","statement":"for","ExpresionInitial":[{"linea":"93","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"93","tipo":"let"}],"name":"i","ValExpression":[{"linea":"93","operator":[{"linea":"93","v":"="}],"Expression":[{"linea":"93","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"93","statement":"Relational","Relational":"<","Expression1":[{"linea":"93","statement":"variable","value":"i"}],"Expression2":[{"linea":"93","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"93","statement":"postincrement","padre":[{"linea":"93","statement":"variable","value":"i"}]}],"body":[{"linea":"96","statement":"for","ExpresionInitial":[{"linea":"94","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"94","tipo":"let"}],"name":"j","ValExpression":[{"linea":"94","operator":[{"linea":"94","v":"="}],"Expression":[{"linea":"94","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"94","statement":"Relational","Relational":"<","Expression1":[{"linea":"94","statement":"variable","value":"j"}],"Expression2":[{"linea":"94","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"94","statement":"postincrement","padre":[{"linea":"94","statement":"variable","value":"j"}]}],"body":[{"linea":"95","statement":"asignation","variable":"matrix1","params":[{"linea":"95","statement":"ArrayList","value":[{"linea":"95","statement":"MatrizPosition","value":[{"linea":"95","statement":"variable","value":"i"}]},\n' +
    '{"linea":"95","statement":"MatrizPosition","value":[{"linea":"95","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"95","operator":[{"linea":"95","v":"="}],"Expression":[{"linea":"95","statement":"callMatriz", "padre":[{"linea":"95","statement":"callMatriz", "padre":[{"linea":"95","statement":"variable","value":"matrixAux"}],"posicion":[{"linea":"95","statement":"variable","value":"i"}]}],"posicion":[{"linea":"95","statement":"variable","value":"j"}]}]}]}]}]}]},\n' +
    '{"linea":"114","statement":"funcion","name":"minValue","type":[{"linea":"100","tipo":[{"linea":"100","tipo":"number"}],"size":[]}],"params":[{"linea":"100","statement":"parameter","name":"matrix1","tipo":[{"linea":"100","tipo":[{"linea":"100","tipo":"number"}],"size":[{"linea":"100","statement":"array","elementos":[]},\n' +
    '{"linea":"100","statement":"array","elementos":[]}]}]}],"body":[{"linea":"102","statement":"declaration","type":[{"linea":"102","tipo":[{"linea":"102","tipo":"let"}],"size":[]}], "values":[{"linea":"102","statement":"variable","tipoExpresion":[],"name":"iAux","ValExpression":[{"linea":"102","operator":[{"linea":"102","v":"="}],"Expression":[{"linea":"102","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"102","statement":"variable","tipoExpresion":[],"name":"jAux","ValExpression":[{"linea":"102","operator":[{"linea":"102","v":"="}],"Expression":[{"linea":"102","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"102","statement":"variable","tipoExpresion":[],"name":"temp","ValExpression":[{"linea":"102","operator":[{"linea":"102","v":"="}],"Expression":[{"linea":"102","statement":"callMatriz", "padre":[{"linea":"102","statement":"callMatriz", "padre":[{"linea":"102","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"102","statement":"variable","value":"min"}]}],"posicion":[{"linea":"102","statement":"variable","value":"min"}]}]}]}]},\n' +
    '{"linea":"111","statement":"for","ExpresionInitial":[{"linea":"103","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"103","tipo":"let"}],"name":"i","ValExpression":[{"linea":"103","operator":[{"linea":"103","v":"="}],"Expression":[{"linea":"103","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"103","statement":"Relational","Relational":"<","Expression1":[{"linea":"103","statement":"variable","value":"i"}],"Expression2":[{"linea":"103","statement":"nativeArray", "padre":[{"linea":"103","statement":"variable","value":"matrix1"}],"native":"length"}]}],"ExpressionFinal":[{"linea":"103","statement":"postincrement","padre":[{"linea":"103","statement":"variable","value":"i"}]}],"body":[{"linea":"110","statement":"for","ExpresionInitial":[{"linea":"104","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"104","tipo":"let"}],"name":"j","ValExpression":[{"linea":"104","operator":[{"linea":"104","v":"="}],"Expression":[{"linea":"104","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"104","statement":"Relational","Relational":"<","Expression1":[{"linea":"104","statement":"variable","value":"j"}],"Expression2":[{"linea":"104","statement":"nativeArray", "padre":[{"linea":"104","statement":"callMatriz", "padre":[{"linea":"104","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"104","statement":"variable","value":"i"}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"104","statement":"postincrement","padre":[{"linea":"104","statement":"variable","value":"j"}]}],"body":[{"linea":"109","statement":"if","Expression":[{"linea":"105","statement":"Relational","Relational":"<","Expression1":[{"linea":"105","statement":"callMatriz", "padre":[{"linea":"105","statement":"callMatriz", "padre":[{"linea":"105","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"105","statement":"variable","value":"i"}]}],"posicion":[{"linea":"105","statement":"variable","value":"j"}]}],"Expression2":[{"linea":"105","statement":"variable","value":"temp"}]}],"body":[{"linea":"106","statement":"asignation","variable":"temp","params":[],"ValExpression":[{"linea":"106","operator":[{"linea":"106","v":"="}],"Expression":[{"linea":"106","statement":"callMatriz", "padre":[{"linea":"106","statement":"callMatriz", "padre":[{"linea":"106","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"106","statement":"variable","value":"i"}]}],"posicion":[{"linea":"106","statement":"variable","value":"j"}]}]}]},\n' +
    '{"linea":"107","statement":"asignation","variable":"iAux","params":[],"ValExpression":[{"linea":"107","operator":[{"linea":"107","v":"="}],"Expression":[{"linea":"107","statement":"variable","value":"i"}]}]},\n' +
    '{"linea":"108","statement":"asignation","variable":"jAux","params":[],"ValExpression":[{"linea":"108","operator":[{"linea":"108","v":"="}],"Expression":[{"linea":"108","statement":"variable","value":"j"}]}]}], "else":[]}]}]},\n' +
    '{"linea":"112","statement":"console","expression":[{"linea":"112","tipo":"string1", "value":"Min -> ["},\n' +
    '{"linea":"112","statement":"variable","value":"iAux"},\n' +
    '{"linea":"112","tipo":"string1", "value":","},\n' +
    '{"linea":"112","statement":"variable","value":"jAux"},\n' +
    '{"linea":"112","tipo":"string1", "value":"] = "},\n' +
    '{"linea":"112","statement":"variable","value":"temp"}]},\n' +
    '{"linea":"113","statement":"return", "Expression":[{"linea":"113","statement":"variable","value":"temp"}]}]},\n' +
    '{"linea":"129","statement":"funcion","name":"maxValue","type":[{"linea":"116","tipo":[{"linea":"116","tipo":"number"}],"size":[]}],"params":[{"linea":"116","statement":"parameter","name":"matrix1","tipo":[{"linea":"116","tipo":[{"linea":"116","tipo":"number"}],"size":[{"linea":"116","statement":"array","elementos":[]},\n' +
    '{"linea":"116","statement":"array","elementos":[]}]}]}],"body":[{"linea":"117","statement":"declaration","type":[{"linea":"117","tipo":[{"linea":"117","tipo":"let"}],"size":[]}], "values":[{"linea":"117","statement":"variable","tipoExpresion":[],"name":"iAux","ValExpression":[{"linea":"117","operator":[{"linea":"117","v":"="}],"Expression":[{"linea":"117","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"117","statement":"variable","tipoExpresion":[],"name":"jAux","ValExpression":[{"linea":"117","operator":[{"linea":"117","v":"="}],"Expression":[{"linea":"117","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"117","statement":"variable","tipoExpresion":[],"name":"temp","ValExpression":[{"linea":"117","operator":[{"linea":"117","v":"="}],"Expression":[{"linea":"117","statement":"callMatriz", "padre":[{"linea":"117","statement":"callMatriz", "padre":[{"linea":"117","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"117","statement":"variable","value":"min"}]}],"posicion":[{"linea":"117","statement":"variable","value":"min"}]}]}]}]},\n' +
    '{"linea":"126","statement":"for","ExpresionInitial":[{"linea":"118","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"118","tipo":"let"}],"name":"i","ValExpression":[{"linea":"118","operator":[{"linea":"118","v":"="}],"Expression":[{"linea":"118","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"118","statement":"Relational","Relational":"<","Expression1":[{"linea":"118","statement":"variable","value":"i"}],"Expression2":[{"linea":"118","statement":"nativeArray", "padre":[{"linea":"118","statement":"variable","value":"matrix1"}],"native":"length"}]}],"ExpressionFinal":[{"linea":"118","statement":"postincrement","padre":[{"linea":"118","statement":"variable","value":"i"}]}],"body":[{"linea":"125","statement":"for","ExpresionInitial":[{"linea":"119","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"119","tipo":"let"}],"name":"j","ValExpression":[{"linea":"119","operator":[{"linea":"119","v":"="}],"Expression":[{"linea":"119","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"119","statement":"Relational","Relational":"<","Expression1":[{"linea":"119","statement":"variable","value":"j"}],"Expression2":[{"linea":"119","statement":"nativeArray", "padre":[{"linea":"119","statement":"callMatriz", "padre":[{"linea":"119","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"119","statement":"variable","value":"i"}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"119","statement":"postincrement","padre":[{"linea":"119","statement":"variable","value":"j"}]}],"body":[{"linea":"124","statement":"if","Expression":[{"linea":"120","statement":"Relational","Relational":">","Expression1":[{"linea":"120","statement":"callMatriz", "padre":[{"linea":"120","statement":"callMatriz", "padre":[{"linea":"120","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"120","statement":"variable","value":"i"}]}],"posicion":[{"linea":"120","statement":"variable","value":"j"}]}],"Expression2":[{"linea":"120","statement":"variable","value":"temp"}]}],"body":[{"linea":"121","statement":"asignation","variable":"temp","params":[],"ValExpression":[{"linea":"121","operator":[{"linea":"121","v":"="}],"Expression":[{"linea":"121","statement":"callMatriz", "padre":[{"linea":"121","statement":"callMatriz", "padre":[{"linea":"121","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"121","statement":"variable","value":"i"}]}],"posicion":[{"linea":"121","statement":"variable","value":"j"}]}]}]},\n' +
    '{"linea":"122","statement":"asignation","variable":"iAux","params":[],"ValExpression":[{"linea":"122","operator":[{"linea":"122","v":"="}],"Expression":[{"linea":"122","statement":"variable","value":"i"}]}]},\n' +
    '{"linea":"123","statement":"asignation","variable":"jAux","params":[],"ValExpression":[{"linea":"123","operator":[{"linea":"123","v":"="}],"Expression":[{"linea":"123","statement":"variable","value":"j"}]}]}], "else":[]}]}]},\n' +
    '{"linea":"127","statement":"console","expression":[{"linea":"127","tipo":"string1", "value":"Max -> ["},\n' +
    '{"linea":"127","statement":"variable","value":"iAux"},\n' +
    '{"linea":"127","tipo":"string1", "value":","},\n' +
    '{"linea":"127","statement":"variable","value":"jAux"},\n' +
    '{"linea":"127","tipo":"string1", "value":"] = "},\n' +
    '{"linea":"127","statement":"variable","value":"temp"}]},\n' +
    '{"linea":"128","statement":"return", "Expression":[{"linea":"128","statement":"variable","value":"temp"}]}]},\n' +
    '{"linea":"146","statement":"funcion","name":"ordenar","type":[],"params":[{"linea":"131","statement":"parameter","name":"matrix1","tipo":[{"linea":"131","tipo":[{"linea":"131","tipo":"number"}],"size":[{"linea":"131","statement":"array","elementos":[]},\n' +
    '{"linea":"131","statement":"array","elementos":[]}]}]}],"body":[{"linea":"132","statement":"declaration","type":[{"linea":"132","tipo":[{"linea":"132","tipo":"let"}],"size":[]}], "values":[{"linea":"132","statement":"variable","tipoExpresion":[],"name":"aux","ValExpression":[{"linea":"132","operator":[{"linea":"132","v":"="}],"Expression":[{"linea":"132","tipo":"number", "value":"0"}]}]}]},\n' +
    '{"linea":"145","statement":"for","ExpresionInitial":[{"linea":"133","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"133","tipo":"let"}],"name":"i","ValExpression":[{"linea":"133","operator":[{"linea":"133","v":"="}],"Expression":[{"linea":"133","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"133","statement":"Relational","Relational":"<","Expression1":[{"linea":"133","statement":"variable","value":"i"}],"Expression2":[{"linea":"133","statement":"nativeArray", "padre":[{"linea":"133","statement":"variable","value":"matrix1"}],"native":"length"}]}],"ExpressionFinal":[{"linea":"133","statement":"postincrement","padre":[{"linea":"133","statement":"variable","value":"i"}]}],"body":[{"linea":"144","statement":"for","ExpresionInitial":[{"linea":"134","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"134","tipo":"let"}],"name":"j","ValExpression":[{"linea":"134","operator":[{"linea":"134","v":"="}],"Expression":[{"linea":"134","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"134","statement":"Relational","Relational":"<","Expression1":[{"linea":"134","statement":"variable","value":"j"}],"Expression2":[{"linea":"134","statement":"nativeArray", "padre":[{"linea":"134","statement":"callMatriz", "padre":[{"linea":"134","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"134","statement":"variable","value":"i"}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"134","statement":"postincrement","padre":[{"linea":"134","statement":"variable","value":"j"}]}],"body":[{"linea":"143","statement":"for","ExpresionInitial":[{"linea":"135","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"135","tipo":"let"}],"name":"k","ValExpression":[{"linea":"135","operator":[{"linea":"135","v":"="}],"Expression":[{"linea":"135","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"135","statement":"Relational","Relational":"<=","Expression1":[{"linea":"135","statement":"variable","value":"k"}],"Expression2":[{"linea":"135","statement":"variable","value":"i"}]}],"ExpressionFinal":[{"linea":"135","statement":"postincrement","padre":[{"linea":"135","statement":"variable","value":"k"}]}],"body":[{"linea":"142","statement":"for","ExpresionInitial":[{"linea":"136","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"136","tipo":"let"}],"name":"l","ValExpression":[{"linea":"136","operator":[{"linea":"136","v":"="}],"Expression":[{"linea":"136","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"136","statement":"Relational","Relational":"<=","Expression1":[{"linea":"136","statement":"variable","value":"l"}],"Expression2":[{"linea":"136","statement":"variable","value":"j"}]}],"ExpressionFinal":[{"linea":"136","statement":"postincrement","padre":[{"linea":"136","statement":"variable","value":"l"}]}],"body":[{"linea":"141","statement":"if","Expression":[{"linea":"137","statement":"Relational","Relational":"<","Expression1":[{"linea":"137","statement":"callMatriz", "padre":[{"linea":"137","statement":"callMatriz", "padre":[{"linea":"137","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"137","statement":"variable","value":"i"}]}],"posicion":[{"linea":"137","statement":"variable","value":"j"}]}],"Expression2":[{"linea":"137","statement":"callMatriz", "padre":[{"linea":"137","statement":"callMatriz", "padre":[{"linea":"137","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"137","statement":"variable","value":"k"}]}],"posicion":[{"linea":"137","statement":"variable","value":"l"}]}]}],"body":[{"linea":"138","statement":"asignation","variable":"aux","params":[],"ValExpression":[{"linea":"138","operator":[{"linea":"138","v":"="}],"Expression":[{"linea":"138","statement":"callMatriz", "padre":[{"linea":"138","statement":"callMatriz", "padre":[{"linea":"138","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"138","statement":"variable","value":"i"}]}],"posicion":[{"linea":"138","statement":"variable","value":"j"}]}]}]},\n' +
    '{"linea":"139","statement":"asignation","variable":"matrix1","params":[{"linea":"139","statement":"ArrayList","value":[{"linea":"139","statement":"MatrizPosition","value":[{"linea":"139","statement":"variable","value":"i"}]},\n' +
    '{"linea":"139","statement":"MatrizPosition","value":[{"linea":"139","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"139","operator":[{"linea":"139","v":"="}],"Expression":[{"linea":"139","statement":"callMatriz", "padre":[{"linea":"139","statement":"callMatriz", "padre":[{"linea":"139","statement":"variable","value":"matrix1"}],"posicion":[{"linea":"139","statement":"variable","value":"k"}]}],"posicion":[{"linea":"139","statement":"variable","value":"l"}]}]}]},\n' +
    '{"linea":"140","statement":"asignation","variable":"matrix1","params":[{"linea":"140","statement":"ArrayList","value":[{"linea":"140","statement":"MatrizPosition","value":[{"linea":"140","statement":"variable","value":"k"}]},\n' +
    '{"linea":"140","statement":"MatrizPosition","value":[{"linea":"140","statement":"variable","value":"l"}]}]}],"ValExpression":[{"linea":"140","operator":[{"linea":"140","v":"="}],"Expression":[{"linea":"140","statement":"variable","value":"aux"}]}]}], "else":[]}]}]}]}]}]},\n' +
    '{"linea":"154","statement":"funcion","name":"clearMat","type":[],"params":[{"linea":"148","statement":"parameter","name":"matrix","tipo":[{"linea":"148","tipo":[{"linea":"148","tipo":"number"}],"size":[{"linea":"148","statement":"array","elementos":[]},\n' +
    '{"linea":"148","statement":"array","elementos":[]}]}]}],"body":[{"linea":"153","statement":"for","ExpresionInitial":[{"linea":"149","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"149","tipo":"let"}],"name":"i","ValExpression":[{"linea":"149","operator":[{"linea":"149","v":"="}],"Expression":[{"linea":"149","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"149","statement":"Relational","Relational":"<","Expression1":[{"linea":"149","statement":"variable","value":"i"}],"Expression2":[{"linea":"149","statement":"nativeArray", "padre":[{"linea":"149","statement":"variable","value":"matrix"}],"native":"length"}]}],"ExpressionFinal":[{"linea":"149","statement":"postincrement","padre":[{"linea":"149","statement":"variable","value":"i"}]}],"body":[{"linea":"152","statement":"for","ExpresionInitial":[{"linea":"150","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"150","tipo":"let"}],"name":"j","ValExpression":[{"linea":"150","operator":[{"linea":"150","v":"="}],"Expression":[{"linea":"150","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"150","statement":"Relational","Relational":"<","Expression1":[{"linea":"150","statement":"variable","value":"j"}],"Expression2":[{"linea":"150","statement":"nativeArray", "padre":[{"linea":"150","statement":"callMatriz", "padre":[{"linea":"150","statement":"variable","value":"matrix"}],"posicion":[{"linea":"150","statement":"variable","value":"i"}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"150","statement":"postincrement","padre":[{"linea":"150","statement":"variable","value":"j"}]}],"body":[{"linea":"151","statement":"asignation","variable":"matrix","params":[{"linea":"151","statement":"ArrayList","value":[{"linea":"151","statement":"MatrizPosition","value":[{"linea":"151","statement":"variable","value":"i"}]},\n' +
    '{"linea":"151","statement":"MatrizPosition","value":[{"linea":"151","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"151","operator":[{"linea":"151","v":"="}],"Expression":[{"linea":"151","tipo":"number", "value":"0"}]}]}]}]}]},\n' +
    '{"linea":"157","statement":"CallFunction","name":"llenado", "parameters":[{"linea":"157","statement":"variable","value":"matrixA"},\n' +
    '{"linea":"157","statement":"variable","value":"matrixB"},\n' +
    '{"linea":"157","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"157","statement":""},\n' +
    '{"linea":"158","statement":"console","expression":[{"linea":"158","tipo":"string1", "value":"Matrix A"}]},\n' +
    '{"linea":"159","statement":"CallFunction","name":"print", "parameters":[{"linea":"159","statement":"variable","value":"matrixA"}]},\n' +
    '{"linea":"159","statement":""},\n' +
    '{"linea":"160","statement":"console","expression":[{"linea":"160","tipo":"string1", "value":"Matrix B"}]},\n' +
    '{"linea":"161","statement":"CallFunction","name":"print", "parameters":[{"linea":"161","statement":"variable","value":"matrixB"}]},\n' +
    '{"linea":"161","statement":""},\n' +
    '{"linea":"163","statement":"console","expression":[{"linea":"163","tipo":"string1", "value":"MatR = MatA + MatB"}]},\n' +
    '{"linea":"164","statement":"CallFunction","name":"suma", "parameters":[{"linea":"164","statement":"variable","value":"matrixA"},\n' +
    '{"linea":"164","statement":"variable","value":"matrixB"},\n' +
    '{"linea":"164","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"164","statement":""},\n' +
    '{"linea":"165","statement":"CallFunction","name":"print", "parameters":[{"linea":"165","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"165","statement":""},\n' +
    '{"linea":"167","statement":"console","expression":[{"linea":"167","tipo":"string1", "value":"MatR = MatA - MatB"}]},\n' +
    '{"linea":"168","statement":"CallFunction","name":"resta", "parameters":[{"linea":"168","statement":"variable","value":"matrixA"},\n' +
    '{"linea":"168","statement":"variable","value":"matrixB"},\n' +
    '{"linea":"168","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"168","statement":""},\n' +
    '{"linea":"169","statement":"CallFunction","name":"print", "parameters":[{"linea":"169","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"169","statement":""},\n' +
    '{"linea":"171","statement":"console","expression":[{"linea":"171","tipo":"string1", "value":"Clear MatR"}]},\n' +
    '{"linea":"172","statement":"CallFunction","name":"clearMat", "parameters":[{"linea":"172","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"172","statement":""},\n' +
    '{"linea":"173","statement":"CallFunction","name":"print", "parameters":[{"linea":"173","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"173","statement":""},\n' +
    '{"linea":"175","statement":"console","expression":[{"linea":"175","tipo":"string1", "value":"MatR = MatA * MatB"}]},\n' +
    '{"linea":"176","statement":"CallFunction","name":"multiplicar", "parameters":[{"linea":"176","statement":"variable","value":"matrixA"},\n' +
    '{"linea":"176","statement":"variable","value":"matrixB"},\n' +
    '{"linea":"176","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"176","statement":""},\n' +
    '{"linea":"177","statement":"CallFunction","name":"print", "parameters":[{"linea":"177","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"177","statement":""},\n' +
    '{"linea":"179","statement":"console","expression":[{"linea":"179","tipo":"string1", "value":"Tranpose(MatA)"}]},\n' +
    '{"linea":"180","statement":"CallFunction","name":"transpuesta", "parameters":[{"linea":"180","statement":"variable","value":"matrixA"}]},\n' +
    '{"linea":"180","statement":""},\n' +
    '{"linea":"181","statement":"CallFunction","name":"print", "parameters":[{"linea":"181","statement":"variable","value":"matrixA"}]},\n' +
    '{"linea":"181","statement":""},\n' +
    '{"linea":"183","statement":"CallFunction","name":"minValue", "parameters":[{"linea":"183","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"183","statement":""},\n' +
    '{"linea":"184","statement":"CallFunction","name":"maxValue", "parameters":[{"linea":"184","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"184","statement":""},\n' +
    '{"linea":"186","statement":"console","expression":[{"linea":"186","tipo":"string1", "value":"Sort MatR"}]},\n' +
    '{"linea":"187","statement":"CallFunction","name":"ordenar", "parameters":[{"linea":"187","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"187","statement":""},\n' +
    '{"linea":"188","statement":"CallFunction","name":"print", "parameters":[{"linea":"188","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"188","statement":""},\n' +
    '{"linea":"190","statement":"CallFunction","name":"minValue", "parameters":[{"linea":"190","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"190","statement":""},\n' +
    '{"linea":"191","statement":"CallFunction","name":"maxValue", "parameters":[{"linea":"191","statement":"variable","value":"matrixR"}]},\n' +
    '{"linea":"191","statement":""},\n' +
    '{"linea":"193","statement":"console","expression":[{"linea":"193","tipo":"string1", "value":"Suma Filas y Columnas"}]},\n' +
    '{"linea":"194","statement":"CallFunction","name":"sumarFilas", "parameters":[{"linea":"194","statement":"variable","value":"matrixA"}]},\n' +
    '{"linea":"194","statement":""},\n' +
    '{"linea":"195","statement":"CallFunction","name":"sumarColumnas", "parameters":[{"linea":"195","statement":"variable","value":"matrixA"}]},\n' +
    '{"linea":"195","statement":""},\n' +
    '{"linea":"196","statement":""}]}';

let instrucciones: statement[] = [];
let tablasimbolo: tablasimbolos = new tablasimbolos();
let jsondata:string = '';
let erroresSemanticos:string = '';
generatinginformation();
console.log(instrucciones);

function generatinginformation()
{
    let statement = JSON.parse(jsondataprueba);
    console.log("No. Lineas: "+statement[0].linea);
    let S = statement[0].S;

    for(let statement of S)
    {
        console.log(statement);
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
            let graph = grahpStatement(data);
            if(graph!=null) instrucciones.push(graph);
            break;
        case "declaration":
            let declaration = declarationStatement(data);
            if(declaration!=null) instrucciones.push(declaration);
            break;
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
function getDeclarations(consoles:string):statement[]
{
    try
    {
        let data = JSON.parse(consoles);
        for(let decla of data)
        {
            console.log(decla);
        }
    }
    catch (e)
    {
        return [];
    }
}
function declarationStatement(console:string):statement
{
    try
    {
        let data = JSON.parse(console);
        let declaration:declarations = new declarations();
        declaration.linea = Number(data.linea);
        declaration.type = TypeStatement.DeclarationStatement;
        declaration.Expression = getDeclarations(data.values);
    }
    catch (e) {
        return null;
    }
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
function grahpStatement(console:string):statement
{
    try
    {
        let data = JSON.parse(console);
        let consola:NativeStatement = new NativeStatement(TypeStatement.NativeStatement, Native.graph);
        consola.Expression = [];
        consola.linea = Number(data.linea);
        consola.graph = jsondata;
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
                    return grahpStatement(data);
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
