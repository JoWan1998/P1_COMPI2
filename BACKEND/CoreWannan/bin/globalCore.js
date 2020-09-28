/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var output = [];
var outs = [];
/*
    simbologia de estados
    -2 -> error instanciar variable
    -1 -> error
     0 -> finalizado
     1 -> sin errores
     2 -> sin errores, break
     3 -> sin errores, continue
     4 -> sin errores, return
 */
var tablasimbolos = /** @class */ (function () {
    function tablasimbolos(tabla, CF) {
        if (CF === void 0) { CF = false; }
        if (tabla == undefined) {
            this.simbolos = [];
            this.ambitoLevel = 0;
        }
        else {
            if (tabla instanceof tablasimbolos) {
                this.ambitoLevel = tabla.ambitoLevel + 1;
                this.simbolos = [];
                for (var _i = 0, _a = tabla.simbolos; _i < _a.length; _i++) {
                    var tablas = _a[_i];
                    if (CF) {
                        if (tablas.ambito == 0)
                            this.simbolos.push(tablas);
                    }
                    else {
                        this.simbolos.push(tablas);
                    }
                }
            }
        }
    }
    tablasimbolos.prototype.updateo = function (name, new_value) {
        try {
            for (var _i = 0, _a = this.simbolos; _i < _a.length; _i++) {
                var simbolo = _a[_i];
                if (simbolo instanceof sym) {
                    if (simbolo.name == name) {
                        if (simbolo.tipoValue == TypeValue.type) {
                            return simbolo.update(new_value, undefined, undefined);
                        }
                    }
                }
            }
            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Its impossible to the machine locate the sym.token\"}')
            return [-1, null];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:' + name);
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Its impossible to the machine locate the sym.token, sym:' + name + '\"}');
            return [-2, 'Unexpected Error, cannot get information of the variable'];
        }
    };
    tablasimbolos.prototype.update = function (name, new_value, atributo, posicion) {
        try {
            var ambitoglob = true;
            var ambitoloc = false;
            for (var _i = 0, _a = this.simbolos; _i < _a.length; _i++) {
                var simbolo = _a[_i];
                if (simbolo instanceof sym) {
                    if (simbolo.name == name) {
                        ////console.log(simbolo.ambito)
                        if (simbolo.ambito == this.ambitoLevel && this.ambitoLevel > 0 && simbolo.ambito > 0) {
                            ambitoglob = false;
                            ambitoloc = true;
                        }
                        else if (simbolo.ambito < this.ambitoLevel && this.ambitoLevel > 0 && simbolo.ambito > 0) {
                            ambitoglob = false;
                        }
                    }
                }
            }
            ////console.log(ambitoglob, ambitoloc)
            if (ambitoglob) {
                for (var _b = 0, _c = this.simbolos; _b < _c.length; _b++) {
                    var simbolo = _c[_b];
                    if (simbolo instanceof sym) {
                        if (simbolo.name == name) {
                            if (simbolo.tipoValue == TypeValue.type) {
                                return simbolo.update(new_value, atributo, undefined);
                            }
                            else if (simbolo.tipoValue == TypeValue.Array) {
                                return simbolo.update(new_value, undefined, posicion);
                            }
                            else {
                                return simbolo.update(new_value, undefined, undefined);
                            }
                        }
                    }
                }
            }
            else {
                if (ambitoloc) {
                    for (var _d = 0, _e = this.simbolos; _d < _e.length; _d++) {
                        var simbolo = _e[_d];
                        if (simbolo instanceof sym) {
                            if (simbolo.name == name) {
                                if (simbolo.ambito == this.ambitoLevel) {
                                    if (simbolo.tipoValue == TypeValue.type) {
                                        return simbolo.update(new_value, atributo, undefined);
                                    }
                                    else if (simbolo.tipoValue == TypeValue.Array) {
                                        return simbolo.update(new_value, undefined, posicion);
                                    }
                                    else {
                                        return simbolo.update(new_value, undefined, undefined);
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    for (var _f = 0, _g = this.simbolos; _f < _g.length; _f++) {
                        var simbolo = _g[_f];
                        if (simbolo instanceof sym) {
                            if (simbolo.name == name) {
                                if (simbolo.ambito < this.ambitoLevel && simbolo.ambito > 0) {
                                    if (simbolo.tipoValue == TypeValue.type) {
                                        return simbolo.update(new_value, atributo, undefined);
                                    }
                                    else if (simbolo.tipoValue == TypeValue.Array) {
                                        return simbolo.update(new_value, undefined, posicion);
                                    }
                                    else {
                                        return simbolo.update(new_value, undefined, undefined);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [UPDATE] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
            return [-1, 'We cannot find the object: ' + name];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:' + name);
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [UPDATE] Its impossible to the machine locate the sym.token, sym:' + name + '\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    //metodo el cual a diferencia de otros al no tener una ejecucion correcta devuelve null
    tablasimbolos.prototype.get = function (name, atributo, posicion) {
        try {
            var ambitoglob = true;
            var ambitoloc = false;
            for (var _i = 0, _a = this.simbolos; _i < _a.length; _i++) {
                var simbolo = _a[_i];
                if (simbolo instanceof sym) {
                    if (simbolo.name == name) {
                        if (simbolo.ambito == this.ambitoLevel && this.ambitoLevel > 0 && simbolo.ambito > 0) {
                            ambitoglob = false;
                            ambitoloc = true;
                        }
                        else if (simbolo.ambito < this.ambitoLevel && this.ambitoLevel > 0 && simbolo.ambito > 0) {
                            ambitoglob = false;
                        }
                    }
                }
            }
            ////console.log(ambitoglob)
            if (ambitoglob) {
                for (var _b = 0, _c = this.simbolos; _b < _c.length; _b++) {
                    var simbolo = _c[_b];
                    if (simbolo instanceof sym) {
                        if (simbolo.name == name) {
                            if (simbolo.tipo == TypeSym.Variable) {
                                if (simbolo.tipoValue == TypeValue.type) {
                                    var sim = simbolo.getValue();
                                    return sim.getValueAtributo(atributo);
                                }
                                else if (simbolo.tipoValue == TypeValue.Array) {
                                    var sim = simbolo.getValue();
                                    return sim.getValue(posicion, this);
                                }
                                else {
                                    return [1, simbolo.getValue()];
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (ambitoloc) {
                    for (var _d = 0, _e = this.simbolos; _d < _e.length; _d++) {
                        var simbolo = _e[_d];
                        if (simbolo instanceof sym) {
                            ////console.log(simbolo, this.ambitoLevel)
                            if (simbolo.name == name && simbolo.ambito == this.ambitoLevel) {
                                if (simbolo.tipo == TypeSym.Variable) {
                                    if (simbolo.tipoValue == TypeValue.type) {
                                        var sim = simbolo.getValue();
                                        return sim.getValueAtributo(atributo);
                                    }
                                    else if (simbolo.tipoValue == TypeValue.Array) {
                                        var sim = simbolo.getValue();
                                        return sim.getValue(posicion, this);
                                    }
                                    else {
                                        return [1, simbolo.getValue()];
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    for (var _f = 0, _g = this.simbolos; _f < _g.length; _f++) {
                        var simbolo = _g[_f];
                        if (simbolo instanceof sym) {
                            if (simbolo.name == name && simbolo.ambito < this.ambitoLevel && simbolo.ambito > 0) {
                                if (simbolo.tipo == TypeSym.Variable) {
                                    if (simbolo.tipoValue == TypeValue.type) {
                                        var sim = simbolo.getValue();
                                        return sim.getValueAtributo(atributo);
                                    }
                                    else if (simbolo.tipoValue == TypeValue.Array) {
                                        var sim = simbolo.getValue();
                                        return sim.getValue(posicion, this);
                                    }
                                    else {
                                        return [1, simbolo.getValue()];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GET] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
            return [-1, 'We cannot find the object: ' + name];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:' + name);
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GET] Its impossible to the machine locate the sym.token, sym:' + name + '\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    tablasimbolos.prototype.getsym = function (name) {
        try {
            var ambitoglob = true;
            var ambitoloc = false;
            for (var _i = 0, _a = this.simbolos; _i < _a.length; _i++) {
                var simbolo = _a[_i];
                if (simbolo instanceof sym) {
                    if (simbolo.name == name) {
                        if (simbolo.ambito == this.ambitoLevel && this.ambitoLevel > 0 && simbolo.ambito > 0) {
                            ambitoglob = false;
                            ambitoloc = true;
                        }
                        else if (simbolo.ambito < this.ambitoLevel && this.ambitoLevel > 0 && simbolo.ambito > 0) {
                            ambitoglob = false;
                        }
                    }
                }
            }
            ////console.log(ambitoglob,ambitoloc)
            if (ambitoglob) {
                for (var _b = 0, _c = this.simbolos; _b < _c.length; _b++) {
                    var simbolo = _c[_b];
                    if (simbolo instanceof sym) {
                        if (simbolo.name == name) {
                            return [1, simbolo];
                        }
                    }
                }
            }
            else {
                if (ambitoloc) {
                    for (var _d = 0, _e = this.simbolos; _d < _e.length; _d++) {
                        var simbolo = _e[_d];
                        if (simbolo instanceof sym) {
                            if (simbolo.name == name && simbolo.ambito == this.ambitoLevel) {
                                return [1, simbolo];
                            }
                        }
                    }
                }
                else {
                    for (var _f = 0, _g = this.simbolos; _f < _g.length; _f++) {
                        var simbolo = _g[_f];
                        if (simbolo instanceof sym) {
                            if (simbolo.name == name && simbolo.ambito < this.ambitoLevel && simbolo.ambito > 0) {
                                return [1, simbolo];
                            }
                        }
                    }
                }
            }
            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETSYM] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
            return [-1, 'We cannot find the object: ' + name];
        }
        catch (e) {
            ////console.log(e);
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:' + name);
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETSYM] Its impossible to the machine locate the sym.token, sym:' + name + '\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    tablasimbolos.prototype.getType = function (name) {
        try {
            for (var _i = 0, _a = this.simbolos; _i < _a.length; _i++) {
                var simbolo = _a[_i];
                if (simbolo instanceof sym) {
                    if (simbolo.name == name) {
                        return [1, simbolo.tipo];
                    }
                }
            }
            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETTYPE] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
            return [-1, 'the object doesn\'t exists'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:' + name);
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETTYPE] Its impossible to the machine locate the sym.token, sym:' + name + '\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    tablasimbolos.prototype.getTypeValue = function (name) {
        try {
            for (var _i = 0, _a = this.simbolos; _i < _a.length; _i++) {
                var simbolo = _a[_i];
                if (simbolo instanceof sym) {
                    if (simbolo.name == name) {
                        return [1, simbolo.tipoValue];
                    }
                }
            }
            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETTYPEVALUE] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
            return [-1, 'the object doesn\'t exists'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:' + name);
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETTYPEVALUE] Its impossible to the machine locate the sym.token, sym:' + name + '\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    tablasimbolos.prototype.insert = function (name, value, tipo, tipovalue) {
        try {
            var state = false;
            for (var _i = 0, _a = this.simbolos; _i < _a.length; _i++) {
                var simbolo = _a[_i];
                if (simbolo instanceof sym) {
                    if (simbolo.name == name && simbolo.ambito == this.ambitoLevel) {
                        state = true;
                        break;
                    }
                }
            }
            if (!state) {
                var simbolo = new sym(name, this.ambitoLevel, value, tipo);
                simbolo.tipoValue = tipovalue;
                this.simbolos.push(simbolo);
                return [1, null];
            }
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:' + name + ', because its aleready defined');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Its impossible to the machine insert the sym.token, because its aleready defined\"}');
            erroresSemanticos.push('You cant set this sym.token, the object its already exists.');
            return [-2, 'we can\'t locate the variable, it\'s probably the variable exists'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:' + name);
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [INSERT] Its impossible to the machine locate the sym.token, sym:' + name + '\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    return tablasimbolos;
}());
var sym = /** @class */ (function () {
    function sym(name, ambito, value, tipo) {
        this.name = name;
        this.ambito = ambito;
        this.value = value;
        this.tipo = tipo;
    }
    sym.prototype.update = function (new_value, atributo, position) {
        try {
            if (atributo != undefined && position == undefined) {
                var valor = this.value;
                valor.setValueAtributo(atributo, new_value);
                this.value = valor;
                return [1, null];
            }
            else if (atributo == undefined && position != undefined) {
                var valor = this.value;
                valor.setValue(position, new_value);
                this.value = valor;
                return [1, null];
            }
            else {
                this.value = new_value;
                return [1, null];
            }
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Its imposible defined or get the sym.token');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  its imposible defined or get the sym.token\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    sym.prototype.getValue = function () {
        return this.value;
    };
    return sym;
}());
var statement = /** @class */ (function () {
    function statement() {
    }
    return statement;
}());
var TypeSym;
(function (TypeSym) {
    TypeSym[TypeSym["Variable"] = 0] = "Variable";
    TypeSym[TypeSym["Funcion"] = 1] = "Funcion";
    TypeSym[TypeSym["class"] = 2] = "class";
    TypeSym[TypeSym["const"] = 3] = "const";
    TypeSym[TypeSym["let"] = 4] = "let";
    TypeSym[TypeSym["var"] = 5] = "var";
})(TypeSym || (TypeSym = {}));
var TypeStatement;
(function (TypeStatement) {
    TypeStatement[TypeStatement["NativeStatement"] = 0] = "NativeStatement";
    TypeStatement[TypeStatement["ControlStatement"] = 1] = "ControlStatement";
    TypeStatement[TypeStatement["IterationStatement"] = 2] = "IterationStatement";
    TypeStatement[TypeStatement["ExpresionStatement"] = 3] = "ExpresionStatement";
    TypeStatement[TypeStatement["FunctionStatement"] = 4] = "FunctionStatement";
    TypeStatement[TypeStatement["DeclarationStatement"] = 5] = "DeclarationStatement";
    TypeStatement[TypeStatement["AssignationStatement"] = 6] = "AssignationStatement";
    TypeStatement[TypeStatement["ReturnStatement"] = 7] = "ReturnStatement";
    TypeStatement[TypeStatement["BreakStatement"] = 8] = "BreakStatement";
    TypeStatement[TypeStatement["ContinueStatement"] = 9] = "ContinueStatement";
    TypeStatement[TypeStatement["SwichtStatement"] = 10] = "SwichtStatement";
})(TypeStatement || (TypeStatement = {}));
var Iteration;
(function (Iteration) {
    Iteration[Iteration["DoWhile"] = 0] = "DoWhile";
    Iteration[Iteration["While"] = 1] = "While";
    Iteration[Iteration["For"] = 2] = "For";
})(Iteration || (Iteration = {}));
var Native;
(function (Native) {
    Native[Native["console"] = 0] = "console";
    Native[Native["graph"] = 1] = "graph";
})(Native || (Native = {}));
var Expression;
(function (Expression) {
    Expression[Expression["Arichmetic"] = 0] = "Arichmetic";
    Expression[Expression["Logical"] = 1] = "Logical";
    Expression[Expression["Relational"] = 2] = "Relational";
})(Expression || (Expression = {}));
var ArichmeticExpr;
(function (ArichmeticExpr) {
    ArichmeticExpr[ArichmeticExpr["suma"] = 0] = "suma";
    ArichmeticExpr[ArichmeticExpr["resta"] = 1] = "resta";
    ArichmeticExpr[ArichmeticExpr["division"] = 2] = "division";
    ArichmeticExpr[ArichmeticExpr["multiplicacion"] = 3] = "multiplicacion";
    ArichmeticExpr[ArichmeticExpr["potenciacion"] = 4] = "potenciacion";
    ArichmeticExpr[ArichmeticExpr["modulo"] = 5] = "modulo";
    ArichmeticExpr[ArichmeticExpr["negacion"] = 6] = "negacion";
})(ArichmeticExpr || (ArichmeticExpr = {}));
var LogicalExpr;
(function (LogicalExpr) {
    LogicalExpr[LogicalExpr["O"] = 0] = "O";
    LogicalExpr[LogicalExpr["Y"] = 1] = "Y";
    LogicalExpr[LogicalExpr["NOT"] = 2] = "NOT";
})(LogicalExpr || (LogicalExpr = {}));
var RelationalExpr;
(function (RelationalExpr) {
    RelationalExpr[RelationalExpr["MayorQue"] = 0] = "MayorQue";
    RelationalExpr[RelationalExpr["MenorQue"] = 1] = "MenorQue";
    RelationalExpr[RelationalExpr["Mayor"] = 2] = "Mayor";
    RelationalExpr[RelationalExpr["Menor"] = 3] = "Menor";
    RelationalExpr[RelationalExpr["Igual"] = 4] = "Igual";
    RelationalExpr[RelationalExpr["NoIgual"] = 5] = "NoIgual";
})(RelationalExpr || (RelationalExpr = {}));
var TypeValue;
(function (TypeValue) {
    TypeValue[TypeValue["String"] = 0] = "String";
    TypeValue[TypeValue["Number"] = 1] = "Number";
    TypeValue[TypeValue["Object"] = 2] = "Object";
    TypeValue[TypeValue["Array"] = 3] = "Array";
    TypeValue[TypeValue["type"] = 4] = "type";
    TypeValue[TypeValue["Boolean"] = 5] = "Boolean";
    TypeValue[TypeValue["void"] = 6] = "void";
    TypeValue[TypeValue["let"] = 7] = "let";
    TypeValue[TypeValue["var"] = 8] = "var";
    TypeValue[TypeValue["const"] = 9] = "const";
    TypeValue[TypeValue["null"] = 10] = "null";
})(TypeValue || (TypeValue = {}));
var NativeArray;
(function (NativeArray) {
    NativeArray[NativeArray["Nothing"] = 0] = "Nothing";
    NativeArray[NativeArray["Push"] = 1] = "Push";
    NativeArray[NativeArray["Pop"] = 2] = "Pop";
    NativeArray[NativeArray["Length"] = 3] = "Length";
})(NativeArray || (NativeArray = {}));
var typeAssigment;
(function (typeAssigment) {
    typeAssigment[typeAssigment["igual"] = 0] = "igual";
    typeAssigment[typeAssigment["suma"] = 1] = "suma";
    typeAssigment[typeAssigment["resta"] = 2] = "resta";
    typeAssigment[typeAssigment["multiplicacion"] = 3] = "multiplicacion";
    typeAssigment[typeAssigment["potencia"] = 4] = "potencia";
    typeAssigment[typeAssigment["modulo"] = 5] = "modulo";
    typeAssigment[typeAssigment["division"] = 6] = "division";
})(typeAssigment || (typeAssigment = {}));
var increments;
(function (increments) {
    increments[increments["postincrement"] = 0] = "postincrement";
    increments[increments["postdecrement"] = 1] = "postdecrement";
    increments[increments["preincreement"] = 2] = "preincreement";
    increments[increments["predecrement"] = 3] = "predecrement";
})(increments || (increments = {}));
var SwitchStatement = /** @class */ (function (_super) {
    __extends(SwitchStatement, _super);
    function SwitchStatement() {
        var _this = _super.call(this) || this;
        _this.cases = [];
        _this["default"] = null;
        _this.value = [];
        return _this;
    }
    SwitchStatement.prototype.execute = function (tablasimbolo1) {
        try {
            this.value = [];
            ////console.log(this);
            var tablasimbolo_1 = new tablasimbolos(tablasimbolo1, false);
            var state = 5;
            for (var _i = 0, _a = this.cases; _i < _a.length; _i++) {
                var statements = _a[_i];
                if (statements instanceof cases) {
                    ////console.log('SW->', this.val.execute(tablasimbolo))
                    statements.val = this.val;
                    var value = statements.execute(tablasimbolo_1);
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return value;
                        case -1: //-> error
                            return value;
                        case 0: //-> finalizado
                            state = 0;
                            if (statements instanceof autoincrements) {
                            }
                            else {
                                if (value[1] != null) {
                                    if (value[1] instanceof Array) {
                                        for (var _b = 0, _c = value[1]; _b < _c.length; _b++) {
                                            var m = _c[_b];
                                            this.value.push(m);
                                        }
                                    }
                                    else {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            return [0, this.value];
                        case 1: //-> sin errores
                            state = 1;
                            if (statements instanceof autoincrements) {
                            }
                            else {
                                if (value[1] != null) {
                                    if (value[1] instanceof Array) {
                                        for (var _d = 0, _e = value[1]; _d < _e.length; _d++) {
                                            var m = _e[_d];
                                            this.value.push(m);
                                        }
                                    }
                                    else {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            return [1, this.value];
                        case 2: //-> sin errores, break
                            return [1, this.value];
                        case 3: //-> sin errores, continue
                            return [3, this.value];
                        case 4: //-> sin errores, return
                            return [4, value[1]];
                        case 5:
                            state = 5;
                            break;
                    }
                }
            }
            if (state == 5 && this["default"] != null) {
                var value = this["default"].execute(tablasimbolo_1);
                switch (value[0]) {
                    case -2: //-> error instanciar variable
                        return value;
                    case -1: //-> error
                        return value;
                    case 0: //-> finalizado
                        state = 0;
                        if (value[1] != null) {
                            if (value[1] instanceof Array) {
                                for (var _f = 0, _g = value[1]; _f < _g.length; _f++) {
                                    var m = _g[_f];
                                    this.value.push(m);
                                }
                            }
                            else {
                                this.value.push(value[1]);
                            }
                        }
                        break;
                    case 1: //-> sin errores
                        state = 1;
                        if (value[1] != null) {
                            if (value[1] instanceof Array) {
                                for (var _h = 0, _j = value[1]; _h < _j.length; _h++) {
                                    var m = _j[_h];
                                    this.value.push(m);
                                }
                            }
                            else {
                                this.value.push(value[1]);
                            }
                        }
                        break;
                    case 2: //-> sin errores, break
                        return [1, null];
                    case 3: //-> sin errores, continue
                        return [3, null];
                    case 4: //-> sin errores, return
                        return [4, value[1]];
                }
            }
            return [1, this.value];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-1, 'Unexpected error, we cannot find the error...'];
        }
    };
    SwitchStatement.prototype.grahp = function () {
        return "";
    };
    SwitchStatement.prototype.traduction = function () {
        return "";
    };
    return SwitchStatement;
}(statement));
var cases = /** @class */ (function (_super) {
    __extends(cases, _super);
    function cases() {
        var _this = _super.call(this) || this;
        _this.val = null;
        _this.ValueExpression = null;
        _this.body = [];
        _this.value = [];
        return _this;
    }
    cases.prototype.execute = function (tablasimbolo) {
        try {
            this.value = [];
            var valInitial1 = new RelationalExpression();
            valInitial1.type = TypeStatement.ExpresionStatement;
            valInitial1.Function = RelationalExpr.Igual;
            valInitial1.Expression1 = this.val;
            valInitial1.Expression2 = this.ValueExpression;
            this.StateCode = -1;
            var valInitial = valInitial1.execute(tablasimbolo);
            ////console.log('CS->', this.ValueExpression.execute(tablasimbolo));
            if (valInitial[0] < 0)
                return [-1, null];
            if (valInitial[1]) {
                for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                    var statement0 = _a[_i];
                    var value = statement0.execute(tablasimbolo);
                    ////console.log(value);
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return value;
                        case -1: //-> error
                            return value;
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            if (statement0 instanceof autoincrements) {
                            }
                            else {
                                if (value[1] != null) {
                                    if (value[1] instanceof Array) {
                                        for (var _b = 0, _c = value[1]; _b < _c.length; _b++) {
                                            var m = _c[_b];
                                            this.value.push(m);
                                        }
                                    }
                                    else {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            if (statement0 instanceof autoincrements) {
                            }
                            else {
                                if (value[1] != null) {
                                    if (value[1] instanceof Array) {
                                        for (var _d = 0, _e = value[1]; _d < _e.length; _d++) {
                                            var m = _e[_d];
                                            this.value.push(m);
                                        }
                                    }
                                    else {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            break;
                        case 2: //-> sin errores, break
                            this.StateCode = 1;
                            break;
                        case 3: //-> sin errores, continue
                            return [3, this.value];
                        case 4: //-> sin errores, return
                            return [4, value[1]];
                    }
                }
            }
            if (this.StateCode == 1 || this.StateCode == 0)
                return [1, this.value];
            return [5, null];
        }
        catch (e) {
            ////console.log(e);
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-1, 'Unexpected Error, we cannot find the error...'];
        }
    };
    cases.prototype.grahp = function () {
        return "";
    };
    cases.prototype.traduction = function () {
        return "";
    };
    return cases;
}(statement));
var defaults = /** @class */ (function (_super) {
    __extends(defaults, _super);
    function defaults() {
        var _this = _super.call(this) || this;
        _this.body = [];
        _this.value = [];
        return _this;
    }
    defaults.prototype.execute = function (tablasimbolo) {
        try {
            this.value = [];
            for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                var statement0 = _a[_i];
                var value = statement0.execute(tablasimbolo);
                switch (value[0]) {
                    case -2: //-> error instanciar variable
                        return value;
                    case -1: //-> error
                        return value;
                    case 0: //-> finalizado
                        this.StateCode = 0;
                        if (value[1] != null) {
                            if (value[1] instanceof Array) {
                                for (var _b = 0, _c = value[1]; _b < _c.length; _b++) {
                                    var m = _c[_b];
                                    this.value.push(m);
                                }
                            }
                            else {
                                this.value.push(value[1]);
                            }
                        }
                        break;
                    case 1: //-> sin errores
                        this.StateCode = 1;
                        if (value[1] != null) {
                            if (value[1] instanceof Array) {
                                for (var _d = 0, _e = value[1]; _d < _e.length; _d++) {
                                    var m = _e[_d];
                                    this.value.push(m);
                                }
                            }
                            else {
                                this.value.push(value[1]);
                            }
                        }
                        break;
                    case 2: //-> sin errores, break
                        return [2, this.value];
                    case 3: //-> sin errores, continue
                        return [3, this.value];
                    case 4: //-> sin errores, return
                        return [4, value[1]];
                }
            }
            return [1, this.value];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-1, 'Unexpected Error, we cannot find the error'];
        }
    };
    defaults.prototype.grahp = function () {
        return "";
    };
    defaults.prototype.traduction = function () {
        return "";
    };
    return defaults;
}(statement));
var autoincrements = /** @class */ (function (_super) {
    __extends(autoincrements, _super);
    function autoincrements() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    autoincrements.prototype.execute = function (tablasimbolo) {
        try {
            var positions = [];
            for (var _i = 0, _a = this.position; _i < _a.length; _i++) {
                var valss = _a[_i];
                positions.push(valss);
            }
            var atributos = [];
            for (var _b = 0, _c = this.atributo; _b < _c.length; _b++) {
                var valss = _c[_b];
                atributos.push(valss);
            }
            if (this.atributo.length > 0 && this.position.length > 0) {
                if (this.isArr && this.firstArr) {
                    //array with type in object
                    var simbolo = tablasimbolo.getsym(this.name.name);
                    if (simbolo[0] > 0) {
                        var simbolito = simbolo[1];
                        if (simbolito.getValue() instanceof arrays) {
                            var arrs = simbolito.getValue();
                            var atrs = arrs.getValue(positions, tablasimbolo);
                            if (atrs instanceof types) {
                                var valesito = atrs.getValuesAtributo(atributos, tablasimbolo)[1];
                                var newvalue = new ArichmeticExpression();
                                var old = valesito;
                                switch (this.Assigment) {
                                    case increments.postincrement:
                                        var numero = new Numbers();
                                        numero.value = 1;
                                        numero.tipoValue = TypeValue.Number;
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero;
                                        newvalue.Function = ArichmeticExpr.suma;
                                        newvalue.linea = this.linea;
                                        var val5 = newvalue.execute(tablasimbolo);
                                        if (val5[0] > 0) {
                                            var numero_1 = new Numbers();
                                            numero_1.value = Number(val5[1]);
                                            numero_1.tipoValue = TypeValue.Number;
                                            var m = this.operateArrAtr(arrs, tablasimbolo, this.position, this.atributo, numero_1);
                                            if (m[0] > 0) {
                                                var k = tablasimbolo.update(this.name.name, m[1]);
                                                if (k[0] > 0)
                                                    return [1, valesito];
                                            }
                                            return [-1, null];
                                        }
                                        else {
                                            return [-1, null];
                                        }
                                    case increments.preincreement:
                                        var numero1 = new Numbers();
                                        numero1.value = 1;
                                        numero1.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo);
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero1;
                                        newvalue.Function = ArichmeticExpr.suma;
                                        newvalue.linea = this.linea;
                                        var val4 = newvalue.execute(tablasimbolo);
                                        if (val4[0] > 0) {
                                            var numero_2 = new Numbers();
                                            numero_2.value = Number(val4[1]);
                                            numero_2.tipoValue = TypeValue.Number;
                                            var m = this.operateArrAtr(arrs, tablasimbolo, this.position, this.atributo, numero_2);
                                            if (m[0] > 0) {
                                                var k = tablasimbolo.update(this.name.name, m[1]);
                                                if (k[0] > 0)
                                                    return [1, numero_2];
                                            }
                                            return [-1, null];
                                        }
                                        else {
                                            return [-1, null];
                                        }
                                    case increments.postdecrement:
                                        var numero2 = new Numbers();
                                        numero2.value = 1;
                                        numero2.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo);
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero2;
                                        newvalue.Function = ArichmeticExpr.resta;
                                        newvalue.linea = this.linea;
                                        var val3 = newvalue.execute(tablasimbolo);
                                        if (val3[0] > 0) {
                                            var numero_3 = new Numbers();
                                            numero_3.value = Number(val3[1]);
                                            numero_3.tipoValue = TypeValue.Number;
                                            var m = this.operateArrAtr(arrs, tablasimbolo, this.position, this.atributo, numero_3);
                                            if (m[0] > 0) {
                                                var k = tablasimbolo.update(this.name.name, m[1]);
                                                if (k[0] > 0)
                                                    return [1, valesito];
                                            }
                                            return [-1, null];
                                        }
                                        else {
                                            return [-1, null];
                                        }
                                    case increments.predecrement:
                                        var numero3 = new Numbers();
                                        numero3.value = 1;
                                        numero3.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo);
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero3;
                                        newvalue.Function = ArichmeticExpr.resta;
                                        newvalue.linea = this.linea;
                                        var val2 = newvalue.execute(tablasimbolo);
                                        if (val2[0] > 0) {
                                            var numero_4 = new Numbers();
                                            numero_4.value = Number(val2[1]);
                                            numero_4.tipoValue = TypeValue.Number;
                                            var m = this.operateArrAtr(arrs, tablasimbolo, this.position, this.atributo, numero_4);
                                            if (m[0] > 0) {
                                                var k = tablasimbolo.update(this.name.name, m[1]);
                                                if (k[0] > 0)
                                                    return [1, numero_4];
                                            }
                                            return [-1, null];
                                        }
                                        else {
                                            return [-1, null];
                                        }
                                }
                                /*
                                let numero:Numbers = new Numbers();
                                numero.value = Number(valesito);
                                numero.tipoValue = TypeValue.Number;
                                let result = this.operateArrAtr(arrs,tablasimbolo,this.position,this.atributo,numero);
                                if(result[0]>0)
                                {
                                    let m =  tablasimbolo.update(this.name.name,result[1]);
                                    if(m[0]>0) return [1,this.value]
                                }
                                */
                            }
                        }
                    }
                }
                else {
                    //type with array
                    var simbolo = tablasimbolo.getsym(this.name.name);
                    if (simbolo[0] > 0) {
                        var simbolito = simbolo[1];
                        if (simbolito.getValue() instanceof types) {
                            var arrs = simbolito.getValue();
                            var arrt = arrs.getValuesAtributo(atributos, tablasimbolo);
                            if (arrt instanceof arrays) {
                                var valesito = arrt.getValue(positions, tablasimbolo)[1];
                                var newvalue = new ArichmeticExpression();
                                var old = valesito;
                                switch (this.Assigment) {
                                    case increments.postincrement:
                                        var numero = new Numbers();
                                        numero.value = 1;
                                        numero.tipoValue = TypeValue.Number;
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero;
                                        newvalue.Function = ArichmeticExpr.suma;
                                        newvalue.linea = this.linea;
                                        var val5 = newvalue.execute(tablasimbolo);
                                        if (val5[0] > 0) {
                                            var numero_5 = new Numbers();
                                            numero_5.value = Number(val5[1]);
                                            numero_5.tipoValue = TypeValue.Number;
                                            var m = this.operateAtrArr(arrs, tablasimbolo, this.atributo, this.position, numero_5);
                                            if (m[0] > 0) {
                                                var k = tablasimbolo.update(this.name.name, m[1]);
                                                if (k[0] > 0)
                                                    return [1, valesito];
                                            }
                                            return [-1, null];
                                        }
                                        else {
                                            return [-1, null];
                                        }
                                    case increments.preincreement:
                                        var numero1 = new Numbers();
                                        numero1.value = 1;
                                        numero1.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo);
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero1;
                                        newvalue.Function = ArichmeticExpr.suma;
                                        newvalue.linea = this.linea;
                                        var val4 = newvalue.execute(tablasimbolo);
                                        if (val4[0] > 0) {
                                            var numero_6 = new Numbers();
                                            numero_6.value = Number(val4[1]);
                                            numero_6.tipoValue = TypeValue.Number;
                                            var m = this.operateAtrArr(arrs, tablasimbolo, this.atributo, this.position, numero_6);
                                            if (m[0] > 0) {
                                                var k = tablasimbolo.update(this.name.name, m[1]);
                                                if (k[0] > 0)
                                                    return [1, numero_6];
                                            }
                                            return [-1, null];
                                        }
                                        else {
                                            return [-1, null];
                                        }
                                    case increments.postdecrement:
                                        var numero2 = new Numbers();
                                        numero2.value = 1;
                                        numero2.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo);
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero2;
                                        newvalue.Function = ArichmeticExpr.resta;
                                        newvalue.linea = this.linea;
                                        var val3 = newvalue.execute(tablasimbolo);
                                        if (val3[0] > 0) {
                                            var numero_7 = new Numbers();
                                            numero_7.value = Number(val3[1]);
                                            numero_7.tipoValue = TypeValue.Number;
                                            var m = this.operateAtrArr(arrs, tablasimbolo, this.atributo, this.position, numero_7);
                                            if (m[0] > 0) {
                                                var k = tablasimbolo.update(this.name.name, m[1]);
                                                if (k[0] > 0)
                                                    return [1, valesito];
                                            }
                                            return [-1, null];
                                        }
                                        else {
                                            return [-1, null];
                                        }
                                    case increments.predecrement:
                                        var numero3 = new Numbers();
                                        numero3.value = 1;
                                        numero3.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo);
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero3;
                                        newvalue.Function = ArichmeticExpr.resta;
                                        newvalue.linea = this.linea;
                                        var val2 = newvalue.execute(tablasimbolo);
                                        if (val2[0] > 0) {
                                            var numero_8 = new Numbers();
                                            numero_8.value = Number(val2[1]);
                                            numero_8.tipoValue = TypeValue.Number;
                                            var m = this.operateAtrArr(arrs, tablasimbolo, this.atributo, this.position, numero_8);
                                            if (m[0] > 0) {
                                                var k = tablasimbolo.update(this.name.name, m[1]);
                                                if (k[0] > 0)
                                                    return [1, numero_8];
                                            }
                                            return [-1, null];
                                        }
                                        else {
                                            return [-1, null];
                                        }
                                }
                                /*
                                let numero:Numbers = new Numbers();
                                numero.value = Number(valesito);
                                numero.tipoValue = TypeValue.Number;
                                let result = this.operateAtrArr(arrs,tablasimbolo,this.atributo,this.position,numero);
                                if(result[0]>0)
                                {
                                    let m =  tablasimbolo.update(this.name.name,result[1]);
                                    if(m[0]>0) return [1,this.value]
                                }*/
                            }
                        }
                    }
                }
            }
            else if (this.atributo.length > 0) {
                var simbolo = tablasimbolo.getsym(this.name.name);
                if (simbolo[0] > 0) {
                    var simbolito = simbolo[1];
                    if (simbolito.getValue() instanceof types) {
                        var atr = simbolito.getValue();
                        var valesito = atr.getValuesAtributo(atributos, tablasimbolo)[1];
                        var newvalue = new ArichmeticExpression();
                        var old = valesito;
                        switch (this.Assigment) {
                            case increments.postincrement:
                                var numero = new Numbers();
                                numero.value = 1;
                                numero.tipoValue = TypeValue.Number;
                                newvalue.Expression1 = this.name;
                                newvalue.Expression2 = numero;
                                newvalue.Function = ArichmeticExpr.suma;
                                newvalue.linea = this.linea;
                                var val5 = newvalue.execute(tablasimbolo);
                                if (val5[0] > 0) {
                                    var numero_9 = new Numbers();
                                    numero_9.value = Number(val5[1]);
                                    numero_9.tipoValue = TypeValue.Number;
                                    var m = this.operateAtr(atr, tablasimbolo, this.atributo, numero_9);
                                    if (m[0] > 0) {
                                        var k = tablasimbolo.update(this.name.name, atr);
                                        if (k[0] > 0)
                                            return [1, valesito];
                                    }
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            case increments.preincreement:
                                var numero1 = new Numbers();
                                numero1.value = 1;
                                numero1.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo);
                                newvalue.Expression1 = this.name;
                                newvalue.Expression2 = numero1;
                                newvalue.Function = ArichmeticExpr.suma;
                                newvalue.linea = this.linea;
                                var val4 = newvalue.execute(tablasimbolo);
                                if (val4[0] > 0) {
                                    var numero_10 = new Numbers();
                                    numero_10.value = Number(val4[1]);
                                    numero_10.tipoValue = TypeValue.Number;
                                    var m = this.operateAtr(atr, tablasimbolo, this.atributo, numero_10);
                                    if (m[0] > 0) {
                                        var k = tablasimbolo.update(this.name.name, atr);
                                        if (k[0] > 0)
                                            return [1, numero_10];
                                    }
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            case increments.postdecrement:
                                var numero2 = new Numbers();
                                numero2.value = 1;
                                numero2.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo);
                                newvalue.Expression1 = this.name;
                                newvalue.Expression2 = numero2;
                                newvalue.Function = ArichmeticExpr.resta;
                                newvalue.linea = this.linea;
                                var val3 = newvalue.execute(tablasimbolo);
                                if (val3[0] > 0) {
                                    var numero_11 = new Numbers();
                                    numero_11.value = Number(val3[1]);
                                    numero_11.tipoValue = TypeValue.Number;
                                    var m = this.operateAtr(atr, tablasimbolo, this.atributo, numero_11);
                                    if (m[0] > 0) {
                                        var k = tablasimbolo.update(this.name.name, atr);
                                        if (k[0] > 0)
                                            return [1, valesito];
                                    }
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            case increments.predecrement:
                                var numero3 = new Numbers();
                                numero3.value = 1;
                                numero3.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo);
                                newvalue.Expression1 = this.name;
                                newvalue.Expression2 = numero3;
                                newvalue.Function = ArichmeticExpr.resta;
                                newvalue.linea = this.linea;
                                var val2 = newvalue.execute(tablasimbolo);
                                if (val2[0] > 0) {
                                    var numero_12 = new Numbers();
                                    numero_12.value = Number(val2[1]);
                                    numero_12.tipoValue = TypeValue.Number;
                                    var m = this.operateAtr(atr, tablasimbolo, this.atributo, numero_12);
                                    if (m[0] > 0) {
                                        var k = tablasimbolo.update(this.name.name, atr);
                                        if (k[0] > 0)
                                            return [1, numero_12];
                                    }
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                        }
                    }
                }
            }
            else if (this.position.length > 0) {
                var simbolo = tablasimbolo.getsym(this.name.name);
                if (simbolo[0] > 0) {
                    var simbolito = simbolo[1];
                    if (simbolito.getValue() instanceof arrays) {
                        var arrs = simbolito.getValue();
                        var valesito = arrs.getValue(positions, tablasimbolo)[1];
                        var newvalue = new ArichmeticExpression();
                        var old = valesito;
                        switch (this.Assigment) {
                            case increments.postincrement:
                                var numero = new Numbers();
                                numero.value = 1;
                                numero.tipoValue = TypeValue.Number;
                                newvalue.Expression1 = valesito;
                                newvalue.Expression2 = numero;
                                newvalue.Function = ArichmeticExpr.suma;
                                newvalue.linea = this.linea;
                                var val5 = newvalue.execute(tablasimbolo);
                                if (val5[0] > 0) {
                                    var numero_13 = new Numbers();
                                    numero_13.value = Number(val5[1]);
                                    numero_13.tipoValue = TypeValue.Number;
                                    var m = arrs.setValue(tablasimbolo, this.position, numero_13);
                                    if (m[0] > 0) {
                                        var k = tablasimbolo.update(this.name.name, arrs);
                                        if (k[0] > 0)
                                            return [1, valesito];
                                    }
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            case increments.preincreement:
                                var numero1 = new Numbers();
                                numero1.value = 1;
                                numero1.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo);
                                newvalue.Expression1 = valesito;
                                newvalue.Expression2 = numero1;
                                newvalue.Function = ArichmeticExpr.suma;
                                newvalue.linea = this.linea;
                                var val4 = newvalue.execute(tablasimbolo);
                                if (val4[0] > 0) {
                                    var numero_14 = new Numbers();
                                    numero_14.value = Number(val4[1]);
                                    numero_14.tipoValue = TypeValue.Number;
                                    var m = arrs.setValue(tablasimbolo, this.position, numero_14);
                                    if (m[0] > 0) {
                                        var k = tablasimbolo.update(this.name.name, arrs);
                                        if (k[0] > 0)
                                            return [1, numero_14];
                                    }
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            case increments.postdecrement:
                                var numero2 = new Numbers();
                                numero2.value = 1;
                                numero2.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo);
                                newvalue.Expression1 = valesito;
                                newvalue.Expression2 = numero2;
                                newvalue.Function = ArichmeticExpr.resta;
                                newvalue.linea = this.linea;
                                var val3 = newvalue.execute(tablasimbolo);
                                if (val3[0] > 0) {
                                    var numero_15 = new Numbers();
                                    numero_15.value = Number(val3[1]);
                                    numero_15.tipoValue = TypeValue.Number;
                                    var m = arrs.setValue(tablasimbolo, this.position, numero_15);
                                    if (m[0] > 0) {
                                        var k = tablasimbolo.update(this.name.name, arrs);
                                        if (k[0] > 0)
                                            return [1, valesito];
                                    }
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            case increments.predecrement:
                                var numero3 = new Numbers();
                                numero3.value = 1;
                                numero3.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo);
                                newvalue.Expression1 = valesito;
                                newvalue.Expression2 = numero3;
                                newvalue.Function = ArichmeticExpr.resta;
                                newvalue.linea = this.linea;
                                var val2 = newvalue.execute(tablasimbolo);
                                if (val2[0] > 0) {
                                    var numero_16 = new Numbers();
                                    numero_16.value = Number(val2[1]);
                                    numero_16.tipoValue = TypeValue.Number;
                                    var m = arrs.setValue(tablasimbolo, this.position, numero_16);
                                    if (m[0] > 0) {
                                        var k = tablasimbolo.update(this.name.name, arrs);
                                        if (k[0] > 0)
                                            return [1, numero_16];
                                    }
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                        }
                    }
                }
            }
            else {
                switch (this.Assigment) {
                    case increments.postincrement:
                        var numero = new Numbers();
                        numero.value = 1;
                        numero.tipoValue = TypeValue.Number;
                        var old = this.name.execute(tablasimbolo);
                        var newvalue5 = new ArichmeticExpression();
                        newvalue5.Expression1 = this.name;
                        newvalue5.Expression2 = numero;
                        newvalue5.Function = ArichmeticExpr.suma;
                        newvalue5.linea = this.linea;
                        var val5 = newvalue5.execute(tablasimbolo);
                        if (val5[0] > 0) {
                            var result5 = tablasimbolo.update(this.name.name, val5[1]);
                            if (result5[0] > 0)
                                return [1, old[1]];
                            return [-1, null];
                        }
                        else {
                            return [-1, null];
                        }
                    case increments.preincreement:
                        var numero1 = new Numbers();
                        numero1.value = 1;
                        numero1.tipoValue = TypeValue.Number;
                        var old1 = this.name.execute(tablasimbolo);
                        var newvalue4 = new ArichmeticExpression();
                        newvalue4.Expression1 = this.name;
                        newvalue4.Expression2 = numero1;
                        newvalue4.Function = ArichmeticExpr.suma;
                        newvalue4.linea = this.linea;
                        var val4 = newvalue4.execute(tablasimbolo);
                        if (val4[0] > 0) {
                            var result5 = tablasimbolo.update(this.name.name, val4[1]);
                            if (result5[0] > 0)
                                return [1, val4[1]];
                            return [-1, null];
                        }
                        else {
                            return [-1, null];
                        }
                    case increments.postdecrement:
                        var numero2 = new Numbers();
                        numero2.value = 1;
                        numero2.tipoValue = TypeValue.Number;
                        var old2 = this.name.execute(tablasimbolo);
                        var newvalue3 = new ArichmeticExpression();
                        newvalue3.Expression1 = this.name;
                        newvalue3.Expression2 = numero2;
                        newvalue3.Function = ArichmeticExpr.resta;
                        newvalue3.linea = this.linea;
                        var val3 = newvalue3.execute(tablasimbolo);
                        if (val3[0] > 0) {
                            var result5 = tablasimbolo.update(this.name.name, val3[1]);
                            if (result5[0] > 0)
                                return [1, old2[1]];
                            return [-1, null];
                        }
                        else {
                            return [-1, null];
                        }
                    case increments.predecrement:
                        var numero3 = new Numbers();
                        numero3.value = 1;
                        numero3.tipoValue = TypeValue.Number;
                        var old3 = this.name.execute(tablasimbolo);
                        var newvalue2 = new ArichmeticExpression();
                        newvalue2.Expression1 = this.name;
                        newvalue2.Expression2 = numero3;
                        newvalue2.Function = ArichmeticExpr.resta;
                        newvalue2.linea = this.linea;
                        var val2 = newvalue2.execute(tablasimbolo);
                        if (val2[0] > 0) {
                            var result5 = tablasimbolo.update(this.name.name, val2[1]);
                            if (result5[0] > 0)
                                return [1, val2[1]];
                            return [-1, null];
                        }
                        else {
                            return [-1, null];
                        }
                }
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-1, null];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-2, null];
        }
    };
    autoincrements.prototype.operateArrAtr = function (objeto, tablasimbolo, position, atributos, value) {
        try {
            var tp = position.pop();
            if (tp instanceof statement) {
                var tpr = tp.execute(tablasimbolo);
                if (tpr[0] > 0) {
                    if (tpr[1] instanceof Number) {
                        if (position.length > 0) {
                            var arr = objeto.get(Number(tpr[1]));
                            if (arr[0] > 0) {
                                var arrsub = this.operateArrAtr(arr[1], tablasimbolo, position, atributos, value);
                                if (arrsub[0] > 0) {
                                    var result = objeto.set(Number(tpr[1]), arrsub[1]);
                                    if (result[0] > 0) {
                                        return [1, objeto];
                                    }
                                }
                            }
                        }
                        else {
                            var arr0 = objeto.get(Number(tpr[1]));
                            if (arr0[0] > 0) {
                                if (arr0[1] instanceof types) {
                                    var arr = this.operateAtr(arr0[1], tablasimbolo, atributos, value);
                                    if (arr[0] > 0) {
                                        var resultf = objeto.set(Number(tpr[1]), arr[1]);
                                        if (resultf[0] > 0) {
                                            return [1, objeto];
                                        }
                                    }
                                }
                            }
                            /*
                                let position:Numbers = new Numbers();
                            position.value = Number(tpr[1]);
                            position.tipoValue = TypeValue.Number;

                            let numero:Numbers = new Numbers();
                            numero.value = 1;
                            numero.tipoValue = TypeValue.Number;

                            let arichmetic:ArichmeticExpression = new ArichmeticExpression();
                            switch (this.Assigment)
                            {
                                case increments.postincrement:
                                    arichmetic.Expression1 = value;
                                    arichmetic.Expression2 = numero;
                                    arichmetic.Function = ArichmeticExpr.suma;
                                    arichmetic.linea = this.linea;
                                    let val = arichmetic.execute(tablasimbolo);
                                    if(val[0]!=-1)
                                    {
                                        let arr0 = objeto.setValorA(tablasimbolo,objeto,[position],val[1]);
                                        this.value = value;
                                        if(arr0[0]>0) return[1,objeto];
                                        return [-1,null];
                                    }
                                    else
                                    {
                                        return [-1,null];
                                    }
                                case increments.preincreement:
                                    arichmetic.Expression1 = value;
                                    arichmetic.Expression2 = numero;
                                    arichmetic.Function = ArichmeticExpr.suma;
                                    arichmetic.linea = this.linea;
                                    let val1 = arichmetic.execute(tablasimbolo);
                                    if(val1[0]!=-1)
                                    {
                                        let arr0 = objeto.setValorA(tablasimbolo,objeto,[position],val1[1]);
                                        this.value = val1[1];
                                        if(arr0[0]>0) return[1,objeto];
                                        return [-1,null];
                                    }
                                    else
                                    {
                                        return [-1,null];
                                    }
                                case increments.postdecrement:
                                    arichmetic.Expression1 = value;
                                    arichmetic.Expression2 = numero;
                                    arichmetic.Function = ArichmeticExpr.resta;
                                    arichmetic.linea = this.linea;
                                    let val2 = arichmetic.execute(tablasimbolo);
                                    if(val2[0]!=-1)
                                    {
                                        let arr0 = objeto.setValorA(tablasimbolo,objeto,[position],val2[1]);
                                        this.value = value;
                                        if(arr0[0]>0) return[1,objeto];
                                        return [-1,null];
                                    }
                                    else
                                    {
                                        return [-1,null];
                                    }
                                case increments.predecrement:
                                    arichmetic.Expression1 = value;
                                    arichmetic.Expression2 = numero;
                                    arichmetic.Function = ArichmeticExpr.resta;
                                    arichmetic.linea = this.linea;
                                    let val3 = arichmetic.execute(tablasimbolo);
                                    if(val3[0]!=-1)
                                    {
                                        let arr0 = objeto.setValorA(tablasimbolo,objeto,[position],val3[1]);
                                        this.value = val3[1];
                                        if(arr0[0]>0) return[1,objeto];
                                        return [-1,null];
                                    }
                                    else
                                    {
                                        return [-1,null];
                                    }
                            }

                            */
                        }
                    }
                }
            }
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    autoincrements.prototype.operateAtrArr = function (objeto, tablasimbolo, atributos, position, value) {
        try {
            var atr = atributos.pop();
            if (atributos.length > 0) {
                var atrsub0 = objeto.getValueAtributo(atr);
                if (atrsub0[0] > 0) {
                    if (atrsub0[1] instanceof types) {
                        var atrsub = this.operateAtrArr(atrsub0[1], tablasimbolo, atributos, position, value);
                        if (atrsub[0] > 0) {
                            var rsult = objeto.setValueAtributo(atr, atrsub[1]);
                            if (rsult[0] > 0) {
                                return [1, objeto];
                            }
                        }
                    }
                }
            }
            else {
                var arrs = objeto.getValueAtributo(atr);
                if (arrs[0] > 0) {
                    if (arrs[1] instanceof arrays) {
                        var atrs = this.operateArr(arrs[1], tablasimbolo, position, value);
                        if (atrs[0] > 0) {
                            var atratr = objeto.setValueAtributo(atr, atrs[1]);
                            if (atratr[0] > 0) {
                                return [1, objeto];
                            }
                        }
                    }
                }
            }
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    autoincrements.prototype.operateAtr = function (objeto, tablasimbolo, atributos, value) {
        try {
            var atr = atributos.pop();
            if (atributos.length > 0) {
                var atrsub0 = objeto.getValueAtributo(atr);
                if (atrsub0[0] > 0) {
                    if (atrsub0[1] instanceof types) {
                        var atrsub = this.operateAtr(atrsub0[1], tablasimbolo, atributos, value);
                        if (atrsub[0] > 0) {
                            var rsult = objeto.setValueAtributo(atr, atrsub[1]);
                            if (rsult[0] > 0) {
                                return [1, objeto];
                            }
                        }
                    }
                }
            }
            else {
                /*
                let atratr  = objeto.setValueAtributo(atr,value);
                if(atratr[0]>0)
                {
                    return [1,objeto];
                }
                */
                var numero = new Numbers();
                numero.value = 1;
                numero.tipoValue = TypeValue.Number;
                var arichmetic = new ArichmeticExpression();
                switch (this.Assigment) {
                    case increments.postincrement:
                        arichmetic.Expression1 = value;
                        arichmetic.Expression2 = numero;
                        arichmetic.Function = ArichmeticExpr.suma;
                        arichmetic.linea = this.linea;
                        var val0 = arichmetic.execute(tablasimbolo);
                        if (val0[0] != -1) {
                            var arr0 = objeto.setValueAtributo(atr, val0[1]);
                            this.value = value;
                            if (arr0[0] > 0)
                                return [1, objeto];
                            return [-1, null];
                        }
                        else {
                            return [-1, null];
                        }
                    case increments.preincreement:
                        arichmetic.Expression1 = value;
                        arichmetic.Expression2 = numero;
                        arichmetic.Function = ArichmeticExpr.suma;
                        arichmetic.linea = this.linea;
                        var val1 = arichmetic.execute(tablasimbolo);
                        if (val1[0] != -1) {
                            var arr0 = objeto.setValueAtributo(atr, val1[1]);
                            this.value = val1[1];
                            if (arr0[0] > 0)
                                return [1, objeto];
                            return [-1, null];
                        }
                        else {
                            return [-1, null];
                        }
                    case increments.postdecrement:
                        arichmetic.Expression1 = value;
                        arichmetic.Expression2 = numero;
                        arichmetic.Function = ArichmeticExpr.resta;
                        arichmetic.linea = this.linea;
                        var val2 = arichmetic.execute(tablasimbolo);
                        if (val2[0] != -1) {
                            var arr0 = objeto.setValueAtributo(atr, val2[1]);
                            this.value = value;
                            if (arr0[0] > 0)
                                return [1, objeto];
                            return [-1, null];
                        }
                        else {
                            return [-1, null];
                        }
                    case increments.predecrement:
                        arichmetic.Expression1 = value;
                        arichmetic.Expression2 = numero;
                        arichmetic.Function = ArichmeticExpr.resta;
                        arichmetic.linea = this.linea;
                        var val3 = arichmetic.execute(tablasimbolo);
                        if (val3[0] != -1) {
                            var arr0 = objeto.setValueAtributo(atr, val3[1]);
                            this.value = val3[1];
                            if (arr0[0] > 0)
                                return [1, objeto];
                            return [-1, null];
                        }
                        else {
                            return [-1, null];
                        }
                }
            }
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    autoincrements.prototype.operateArr = function (objeto, tablasimbolo, position, value) {
        try {
            var tp = position.pop();
            if (tp instanceof statement) {
                var tpr = tp.execute(tablasimbolo);
                if (tpr[0] > 0) {
                    if (tpr[1] instanceof Number) {
                        if (position.length > 0) {
                            var arr = objeto.get(Number(tpr[1]));
                            if (arr[0] > 0) {
                                var arrsub = this.operateArr(arr[1], tablasimbolo, position, value);
                                if (arrsub[0] > 0) {
                                    var result = objeto.set(Number(tpr[1]), arrsub[1]);
                                    if (result[0] > 0) {
                                        return [1, objeto];
                                    }
                                }
                            }
                        }
                        else {
                            /*
                            let arr = objeto.set(Number(tpr[1]),value);
                            if(arr[0]>0)
                            {
                                return [1,objeto];
                            }
                            */
                            var numero = new Numbers();
                            numero.value = 1;
                            numero.tipoValue = TypeValue.Number;
                            var arichmetic = new ArichmeticExpression();
                            switch (this.Assigment) {
                                case increments.postincrement:
                                    arichmetic.Expression1 = value;
                                    arichmetic.Expression2 = numero;
                                    arichmetic.Function = ArichmeticExpr.suma;
                                    arichmetic.linea = this.linea;
                                    var val0 = arichmetic.execute(tablasimbolo);
                                    if (val0[0] != -1) {
                                        var arr0 = objeto.set(Number(tpr[1]), val0[1]);
                                        this.value = value;
                                        if (arr0[0] > 0)
                                            return [1, objeto];
                                        return [-1, null];
                                    }
                                    else {
                                        return [-1, null];
                                    }
                                case increments.preincreement:
                                    arichmetic.Expression1 = value;
                                    arichmetic.Expression2 = numero;
                                    arichmetic.Function = ArichmeticExpr.suma;
                                    arichmetic.linea = this.linea;
                                    var val1 = arichmetic.execute(tablasimbolo);
                                    if (val1[0] != -1) {
                                        var arr0 = objeto.set(Number(tpr[1]), val1[1]);
                                        this.value = val1[1];
                                        if (arr0[0] > 0)
                                            return [1, objeto];
                                        return [-1, null];
                                    }
                                    else {
                                        return [-1, null];
                                    }
                                case increments.postdecrement:
                                    arichmetic.Expression1 = value;
                                    arichmetic.Expression2 = numero;
                                    arichmetic.Function = ArichmeticExpr.resta;
                                    arichmetic.linea = this.linea;
                                    var val2 = arichmetic.execute(tablasimbolo);
                                    if (val2[0] != -1) {
                                        var arr0 = objeto.set(Number(tpr[1]), val2[1]);
                                        this.value = value;
                                        if (arr0[0] > 0)
                                            return [1, objeto];
                                        return [-1, null];
                                    }
                                    else {
                                        return [-1, null];
                                    }
                                case increments.predecrement:
                                    arichmetic.Expression1 = value;
                                    arichmetic.Expression2 = numero;
                                    arichmetic.Function = ArichmeticExpr.resta;
                                    arichmetic.linea = this.linea;
                                    var val3 = arichmetic.execute(tablasimbolo);
                                    if (val3[0] != -1) {
                                        var arr0 = objeto.set(Number(tpr[1]), val3[1]);
                                        this.value = val3[1];
                                        if (arr0[0] > 0)
                                            return [1, objeto];
                                        return [-1, null];
                                    }
                                    else {
                                        return [-1, null];
                                    }
                            }
                        }
                    }
                }
            }
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    autoincrements.prototype.grahp = function () {
        return "";
    };
    autoincrements.prototype.traduction = function () {
        return "";
    };
    return autoincrements;
}(statement));
var arrays = /** @class */ (function (_super) {
    __extends(arrays, _super);
    function arrays() {
        var _this = _super.call(this) || this;
        _this.niu = false;
        return _this;
    }
    arrays.prototype.execute = function () {
        return [1, this];
    };
    arrays.prototype.getValue = function (position, tablasimbolo) {
        try {
            if (position.length > 0) {
                var a = position.pop();
                var result = a.execute(tablasimbolo);
                ////console.log('R', result);
                if (result[0] > 0) {
                    result[1] = Math.round(result[1]);
                    ////console.log(result[1])
                    if (position.length > 0) {
                        ////console.log('m1->>', position.length,' pos: '+result[1])
                        ////console.log(this.values, '->>>>>', this.values[result[1]])
                        if (this.values[result[1]] instanceof arrays)
                            return this.getValorA(position, this.values[result[1]].getAll(), tablasimbolo);
                    }
                    else {
                        ////console.log('pos: ',result[1], 'value: ',this.values[result[1]], ' values: ',this.values[result[1]].getAll());
                        return [1, this.values[result[1]]];
                    }
                }
            }
            erroresSemanticos.push('Linea: ' + this.linea + ', EL objeto al que apunta no es un arreglo');
            return [-1, 'EL objeto al que apunta no es un arreglo'];
        }
        catch (e) {
            ////console.log(e)
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-1, null];
        }
    };
    arrays.prototype.getValorA = function (position, objeto, tablasimbolo) {
        try {
            var a = position.pop();
            var result = a.execute(tablasimbolo);
            if (result[0] > 0) {
                result[1] = Math.round(result[1]);
                if (position.length > 0) {
                    ////console.log('m2->>', position.length, 'pos: '+result[1])
                    ////console.log(objeto, '->>>>>', objeto[result[1]])
                    if (objeto[result[1]] instanceof arrays)
                        return this.getValorA(position, objeto[result[1]].getAll(), tablasimbolo);
                }
                else {
                    ////console.log(objeto[result[1]])
                    return [1, objeto[result[1]]];
                }
            }
            erroresSemanticos.push('Linea: ' + this.linea + ', EL objeto al que apunta no es un arreglo');
            return [-1, 'EL objeto al que apunta no es un arreglo'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-1, null];
        }
    };
    arrays.prototype.getAll = function () {
        return this.values;
    };
    arrays.prototype.get1 = function (position) {
        var a = 0;
        for (var _i = 0, _a = this.values; _i < _a.length; _i++) {
            var value = _a[_i];
            if (a == position) {
                ////console.log(value);
                return value;
            }
            a++;
        }
        return null;
    };
    arrays.prototype.get = function (position) {
        var a = 0;
        for (var _i = 0, _a = this.values; _i < _a.length; _i++) {
            var value = _a[_i];
            if (a == position) {
                return [1, value];
            }
            a++;
        }
        outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
        output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
        return [-1, null];
    };
    arrays.prototype.setValue = function (tablasimbolo, position, value) {
        try {
            ////console.log(101,value);
            if (position.length > 0) {
                if (value == null) {
                    var a = position.pop();
                    var result = a.execute(tablasimbolo);
                    ////console.log(a);
                    if (result[0] > 0) {
                        result[1] = Math.round(result[1]);
                        if (position.length > 0) {
                            var tt = this.setValorA(tablasimbolo, this.values[result[1]], position, null);
                            if (tt[0] > 0) {
                                this.values[result[1]] = tt[1];
                                return [1, null];
                            }
                            else {
                                erroresSemanticos.push('Linea: ' + this.linea + ', Bad Exposure.... in Arrays');
                                return [-1, null];
                            }
                        }
                        else {
                            this.values[result[1]] = this.val;
                            return [1, null];
                        }
                    }
                    else {
                        outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
                        output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
                        return [-1, null];
                    }
                }
                else {
                    if (value instanceof statement) {
                        var vals = value.execute(tablasimbolo);
                        ////console.log(11,vals)
                        if (vals[0] > 0) {
                            var a = position.pop();
                            var result = a.execute(tablasimbolo);
                            ////console.log('Pos: ',result)
                            if (result[0] > 0) {
                                result[1] = Math.round(result[1]);
                                if (position.length > 0) {
                                    if (this.values[result[1]] instanceof arrays) {
                                        var tt = this.setValorA(tablasimbolo, this.values[result[1]].getAll(), position, value);
                                        if (tt[0] > 0) {
                                            this.values[result[1]].values = tt[1];
                                            return [1, null];
                                        }
                                        else {
                                            return [-1, null];
                                        }
                                    }
                                }
                                else {
                                    this.values[result[1]] = vals[1];
                                    return [1, null];
                                }
                            }
                            else {
                                return [-1, null];
                            }
                        }
                        else {
                            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
                            return [-1, 'Value cannot be executed'];
                        }
                    }
                }
            }
            erroresSemanticos.push('Linea: ' + this.linea + ', No puedes asignar a una matriz una posicion no existente, por favor verifica tu declaracion');
            return [-1, null];
        }
        catch (e) {
            ////console.log(e);
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            return [-1, null];
        }
    };
    arrays.prototype.setValorA = function (tablasimbolo, objeto, position, value) {
        try {
            if (objeto.length != undefined) {
                var vals = value.execute(tablasimbolo);
                if (vals[0] > 0) {
                    var a = position.pop();
                    var result = a.execute(tablasimbolo);
                    ////console.log('Pos: ',result)
                    if (result[0] > 0) {
                        result[1] = Math.round(result[1]);
                        if (position.length > 0) {
                            if (objeto[result[1]] instanceof arrays) {
                                var tt = this.setValorA(tablasimbolo, objeto[result[1]].getAll(), position, vals[1]);
                                if (tt[0] > 0) {
                                    objeto[result[1]].values = tt[1];
                                    return [1, objeto];
                                }
                                else {
                                    erroresSemanticos.push('Linea: ' + this.linea + ', Bad Exposure... in Arrays');
                                    return [-1, null];
                                }
                            }
                        }
                        else {
                            objeto[result[1]] = vals[1];
                            ////console.log(objeto)
                            return [1, objeto];
                        }
                    }
                    else {
                        erroresSemanticos.push('Linea: ' + this.linea + ', Bad Exposure... in Arrays');
                        return [-1, null];
                    }
                }
                else {
                    erroresSemanticos.push('Linea: ' + this.linea + ', Bad Exposure... in Arrays');
                    return [-1, null];
                }
            }
            else {
                erroresSemanticos.push('Linea: ' + this.linea + ', Bad Exposure... in Arrays');
                return [-1, null];
            }
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-1, null];
        }
    };
    arrays.prototype.set = function (position, value) {
        try {
            for (var a = 0; a < this.values.length; a++) {
                if (a == position) {
                    this.values[a] = value;
                    return [1, null];
                }
            }
            erroresSemanticos.push('Linea: ' + this.linea + ', Bad position, Array cant get this position');
            return [-1, null];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-1, null];
        }
    };
    arrays.prototype.grahp = function () {
        return "";
    };
    arrays.prototype.traduction = function () {
        return "";
    };
    arrays.prototype.push1 = function (values, positions, tablasimbolos) {
        try {
            var value = values.execute(tablasimbolos);
            if (value[0] > 0) {
                if (positions.length > 0) {
                    ////console.log(positions)
                    var a = positions.pop();
                    var result = a.execute(tablasimbolos);
                    ////console.log(result[1], this.values)
                    if (result[0] > 0) {
                        result[1] = Math.round(result[1]);
                        if (this.values[result[1]] instanceof arrays) {
                            var k = this.push2(this.values[result[1]], value[1], positions, tablasimbolos);
                            if (k != null) {
                                this.values[result[1]] = k;
                                return [1, null];
                            }
                        }
                    }
                }
                else {
                    this.values.push(value);
                    ////console.log(this.values)
                    return [1, null];
                }
            }
            return [-2, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    arrays.prototype.push2 = function (objeto, value, positions, tablasimbolos) {
        try {
            ////console.log(objeto)
            if (positions.length > 0) {
                var a = positions.pop();
                var result = a.execute(tablasimbolos);
                if (result[0] > 0) {
                    result[1] = Math.round(result[1]);
                    if (objeto[result[1]] instanceof arrays) {
                        var k = this.push2(objeto[result[1]], value, positions, tablasimbolos);
                        if (k != null) {
                            objeto[result[1]] = k;
                            return objeto;
                        }
                    }
                }
            }
            else {
                objeto.values.push(value);
                ////console.log(objeto)
                return objeto;
            }
            return objeto;
        }
        catch (e) {
            return null;
        }
    };
    arrays.prototype.push = function (value) {
        ////console.log(this.values);
        try {
            this.values.push(value);
            ////console.log(this.values);
            return [1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    arrays.prototype.pop = function () {
        try {
            return [1, this.values.pop()];
        }
        catch (e) {
            return [-1, null];
        }
    };
    arrays.prototype.length = function () {
        try {
            return this.values.length;
        }
        catch (e) {
            return -1;
        }
    };
    return arrays;
}(statement));
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var Asignation = /** @class */ (function (_super) {
    __extends(Asignation, _super);
    function Asignation() {
        var _this = _super.call(this) || this;
        _this.atributo = [];
        _this.position = [];
        _this.isArr = false;
        return _this;
    }
    Asignation.prototype.execute = function (tablasimbolo) {
        try {
            ////console.log(this.name, this)
            var positions = [];
            for (var _i = 0, _a = this.position; _i < _a.length; _i++) {
                var pos = _a[_i];
                positions.push(pos);
            }
            var atributos = [];
            for (var _b = 0, _c = this.atributo; _b < _c.length; _b++) {
                var pos = _c[_b];
                atributos.push(pos);
            }
            ////console.log(this.Expression)
            if (this.atributo.length > 0 && this.position.length > 0) {
                if (this.Assigment == typeAssigment.igual) {
                    var value = this.Expression.execute(tablasimbolo);
                    if (value[0] > 0) {
                        if (this.isArr) {
                            //array with type in object
                            var simbolo = tablasimbolo.getsym(this.name);
                            if (simbolo[0] > 0) {
                                var simbolito = simbolo[1];
                                if (simbolito.getValue() instanceof arrays) {
                                    var arrs = simbolito.getValue();
                                    var result = this.operateArrAtr(arrs, tablasimbolo, positions, atributos, this.Expression);
                                    if (result[0] > 0) {
                                        return tablasimbolo.update(this.name, result[1]);
                                    }
                                }
                            }
                        }
                        else {
                            //type with array
                            var simbolo = tablasimbolo.getsym(this.name);
                            if (simbolo[0] > 0) {
                                var simbolito = simbolo[1];
                                if (simbolito.getValue() instanceof types) {
                                    var arrs = simbolito.getValue();
                                    var result = this.operateAtrArr(arrs, tablasimbolo, atributos, positions, this.Expression);
                                    if (result[0] > 0) {
                                        return tablasimbolo.update(this.name, result[1]);
                                    }
                                }
                            }
                        }
                    }
                    return [-2, 'We cannot apply the instruction, the object does not have the attribute or the position'];
                }
                return [-1, 'cannot be aplied ' + typeAssigment[this.Assigment] + ', in the object'];
            }
            else if (this.atributo.length > 0) {
                if (this.Assigment == typeAssigment.igual) {
                    var value = this.Expression.execute(tablasimbolo);
                    ////console.log('A-> ',value[1]);
                    if (value[0] > 0) {
                        var simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0) {
                            var simbolito = simbolo[1];
                            ////console.log('AA -> ', simbolito)
                            if (simbolito.getValue() instanceof types) {
                                var atr = simbolito.getValue();
                                ////console.log('ABR > ',atr);
                                var val = atr.setValueAtributo1(atributos, value[1]);
                                ////console.log('ARR > ',atr);
                                if (val[0] > 0) {
                                    return tablasimbolo.update(this.name, atr);
                                }
                            }
                        }
                    }
                    return [-2, 'We cannot apply the instruction, the object does not have the attribute'];
                }
                return [-1, 'cannot be aplied ' + typeAssigment[this.Assigment] + ', in the object'];
            }
            else if (this.position.length > 0) {
                if (this.Assigment == typeAssigment.igual) {
                    ////console.log(this.Expression)
                    var value = this.Expression.execute(tablasimbolo);
                    if (value[0] > 0) {
                        var simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0) {
                            var simbolito = simbolo[1];
                            if (simbolito.getValue() instanceof arrays) {
                                var arrs = simbolito.getValue();
                                ////console.log(arrs);
                                var k = arrs.setValue(tablasimbolo, positions, this.Expression);
                                ////console.log(k)
                                if (k[0] > 0)
                                    return tablasimbolo.update(this.name, arrs);
                            }
                        }
                    }
                    return [-2, 'We cannot apply the instruction, the object does not have the position'];
                }
                return [-1, 'cannot be aplied ' + typeAssigment[this.Assigment] + ', in the object'];
            }
            else {
                var newvalue = new ArichmeticExpression();
                var valant = new expression();
                valant.name = this.name;
                valant.linea = this.linea;
                valant.type = TypeStatement.ExpresionStatement;
                newvalue.Expression1 = valant;
                switch (this.Assigment) {
                    case typeAssigment.division:
                        newvalue.Expression2 = this.Expression;
                        newvalue.Function = ArichmeticExpr.division;
                        newvalue.linea = this.linea;
                        var val5 = newvalue.execute(tablasimbolo);
                        if (val5[0] > 0) {
                            return tablasimbolo.update(this.name, val5[1]);
                        }
                        break;
                    case typeAssigment.igual:
                        if (this.Expression instanceof types) {
                            var newtypes = new types();
                            newtypes.atributos = [];
                            newtypes.niu = true;
                            newtypes.linea = this.Expression.linea;
                            for (var _d = 0, _e = this.Expression.atributos; _d < _e.length; _d++) {
                                var m = _e[_d];
                                m.execute(tablasimbolo);
                                newtypes.atributos.push(m);
                            }
                            var value = newtypes.execute(tablasimbolo);
                            ////console.log(value);
                            if (value[0] > 0) {
                                return tablasimbolo.update(this.name, value[1]);
                            }
                        }
                        else {
                            var value = this.Expression.execute(tablasimbolo);
                            ////console.log(value);
                            if (value[0] > 0) {
                                return tablasimbolo.update(this.name, value[1]);
                            }
                        }
                        break;
                    case typeAssigment.modulo:
                        newvalue.Expression2 = this.Expression;
                        newvalue.Function = ArichmeticExpr.modulo;
                        newvalue.linea = this.linea;
                        var val4 = newvalue.execute(tablasimbolo);
                        if (val4[0] > 0) {
                            return tablasimbolo.update(this.name, val4[1]);
                        }
                        break;
                    case typeAssigment.multiplicacion:
                        newvalue.Expression2 = this.Expression;
                        newvalue.Function = ArichmeticExpr.multiplicacion;
                        newvalue.linea = this.linea;
                        var val3 = newvalue.execute(tablasimbolo);
                        if (val3[0] > 0) {
                            return tablasimbolo.update(this.name, val3[1]);
                        }
                        break;
                    case typeAssigment.potencia:
                        newvalue.Expression2 = this.Expression;
                        newvalue.Function = ArichmeticExpr.potenciacion;
                        newvalue.linea = this.linea;
                        var val2 = newvalue.execute(tablasimbolo);
                        if (val2[0] > 0) {
                            return tablasimbolo.update(this.name, val2[1]);
                        }
                        break;
                    case typeAssigment.resta:
                        newvalue.Expression2 = this.Expression;
                        newvalue.Function = ArichmeticExpr.resta;
                        newvalue.linea = this.linea;
                        var val1 = newvalue.execute(tablasimbolo);
                        if (val1[0] > 0) {
                            return tablasimbolo.update(this.name, val1[1]);
                        }
                        break;
                    case typeAssigment.suma:
                        newvalue.Expression2 = this.Expression;
                        newvalue.Function = ArichmeticExpr.suma;
                        newvalue.linea = this.linea;
                        var val = newvalue.execute(tablasimbolo);
                        if (val[0] > 0) {
                            return tablasimbolo.update(this.name, val[1]);
                        }
                        break;
                }
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be aplied ' + typeAssigment[this.Assigment] + ', in the object');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',cannot be aplied ' + typeAssigment[this.Assigment] + ', in the object\"}');
            return [-1, 'cannot be aplied ' + typeAssigment[this.Assigment] + ', in the object'];
        }
        catch (e) {
            ////console.log(e)
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    Asignation.prototype.operateArrAtr = function (objeto, tablasimbolo, position, atributos, value) {
        try {
            var tp = position.pop();
            if (tp instanceof statement) {
                var tpr = tp.execute(tablasimbolo);
                if (tpr[0] > 0) {
                    if (tpr[1] instanceof Number) {
                        if (position.length > 0) {
                            var arr = objeto.get(Number(tpr[1]));
                            if (arr[0] > 0) {
                                var arrsub = this.operateArrAtr(arr[1], tablasimbolo, position, atributos, value);
                                if (arrsub[0] > 0) {
                                    var result = objeto.set(Number(tpr[1]), arrsub[1]);
                                    if (result[0] > 0) {
                                        return [1, objeto];
                                    }
                                }
                            }
                        }
                        else {
                            var arr0 = objeto.get(Number(tpr[1]));
                            if (arr0[0] > 0) {
                                if (arr0[1] instanceof types) {
                                    var arr = this.operateAtr(arr0[1], tablasimbolo, atributos, value);
                                    if (arr[0] > 0) {
                                        var resultf = objeto.set(Number(tpr[1]), arr[1]);
                                        if (resultf[0] > 0) {
                                            return [1, objeto];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return [-1, null];
        }
        catch (e) {
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    Asignation.prototype.operateAtrArr = function (objeto, tablasimbolo, atributos, position, value) {
        try {
            var atr = atributos.pop();
            if (atributos.length > 0) {
                var atrsub0 = objeto.getValueAtributo(atr);
                if (atrsub0[0] > 0) {
                    if (atrsub0[1] instanceof types) {
                        var atrsub = this.operateAtrArr(atrsub0[1], tablasimbolo, atributos, position, value);
                        if (atrsub[0] > 0) {
                            var rsult = objeto.setValueAtributo(atr, atrsub[1]);
                            if (rsult[0] > 0) {
                                return [1, objeto];
                            }
                        }
                    }
                }
            }
            else {
                var arrs = objeto.getValueAtributo(atr);
                if (arrs[0] > 0) {
                    if (arrs[1] instanceof arrays) {
                        var atrs = this.operateArr(arrs[1], tablasimbolo, position, value);
                        if (atrs[0] > 0) {
                            var atratr = objeto.setValueAtributo(atr, atrs[1]);
                            if (atratr[0] > 0) {
                                return [1, objeto];
                            }
                        }
                    }
                }
            }
            return [-1, null];
        }
        catch (e) {
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    Asignation.prototype.operateAtr = function (objeto, tablasimbolo, atributos, value) {
        try {
            var atr = atributos.pop();
            if (atributos.length > 0) {
                var atrsub0 = objeto.getValueAtributo(atr);
                ////console.log(objeto);
                if (atrsub0[0] > 0) {
                    if (atrsub0[1] instanceof types) {
                        var atrsub = this.operateAtr(atrsub0[1], tablasimbolo, atributos, value);
                        if (atrsub[0] > 0) {
                            var rsult = objeto.setValueAtributo(atr, atrsub[1]);
                            if (rsult[0] > 0) {
                                return [1, objeto];
                            }
                        }
                    }
                }
            }
            else {
                var atratr = objeto.setValueAtributo(atr, value);
                if (atratr[0] > 0) {
                    return [1, objeto];
                }
            }
            return [-1, null];
        }
        catch (e) {
            outs.push('Salida: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    Asignation.prototype.operateArr = function (objeto, tablasimbolo, position, value) {
        try {
            var tp = position.pop();
            if (tp instanceof statement) {
                var tpr = tp.execute(tablasimbolo);
                if (tpr[0] > 0) {
                    if (tpr[1] instanceof Number) {
                        if (position.length > 0) {
                            var arr = objeto.get(Number(tpr[1]));
                            if (arr[0] > 0) {
                                var arrsub = this.operateArr(arr[1], tablasimbolo, position, value);
                                if (arrsub[0] > 0) {
                                    var result = objeto.set(Number(tpr[1]), arrsub[1]);
                                    if (result[0] > 0) {
                                        return [1, objeto];
                                    }
                                }
                            }
                        }
                        else {
                            var arr = objeto.set(Number(tpr[1]), value);
                            if (arr[0] > 0) {
                                return [1, objeto];
                            }
                        }
                    }
                }
            }
            return [-1, null];
        }
        catch (e) {
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    Asignation.prototype.grahp = function () {
        return "";
    };
    Asignation.prototype.traduction = function () {
        return "";
    };
    return Asignation;
}(statement));
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var IfStatement = /** @class */ (function (_super) {
    __extends(IfStatement, _super);
    function IfStatement() {
        var _this = _super.call(this) || this;
        _this.body = [];
        _this.bodyElse = [];
        _this.value = [];
        return _this;
    }
    IfStatement.prototype.execute = function (tablasimbolo1) {
        try {
            ////console.log(this);
            this.value = [];
            var tablasimbolo_2 = new tablasimbolos(tablasimbolo1, false);
            var valInitial = this.ValueExpression.execute(tablasimbolo_2);
            if (valInitial[0] < 0)
                return [-1, null];
            if (valInitial[1]) {
                for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                    var statement0 = _a[_i];
                    var value = statement0.execute(tablasimbolo_2);
                    ////console.log(value)
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return value;
                        case -1: //-> error
                            return value;
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            if (statement0 instanceof autoincrements) {
                            }
                            else {
                                if (value[1] != null) {
                                    if (value[1] instanceof Array) {
                                        for (var _b = 0, _c = value[1]; _b < _c.length; _b++) {
                                            var m = _c[_b];
                                            this.value.push(m);
                                        }
                                    }
                                    else {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            if (statement0 instanceof autoincrements) {
                            }
                            else {
                                if (value[1] != null) {
                                    if (value[1] instanceof Array) {
                                        for (var _d = 0, _e = value[1]; _d < _e.length; _d++) {
                                            var m = _e[_d];
                                            this.value.push(m);
                                        }
                                    }
                                    else {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            break;
                        case 2: //-> sin errores, break
                            return [2, this.value];
                        case 3: //-> sin errores, continue
                            return [3, this.value];
                        case 4: //-> sin errores, return
                            return [4, value[1]];
                    }
                }
            }
            else {
                if (this.bodyElse.length > 0) {
                    for (var _f = 0, _g = this.bodyElse; _f < _g.length; _f++) {
                        var statement0 = _g[_f];
                        var value = statement0.execute(tablasimbolo_2);
                        switch (value[0]) {
                            case -2: //-> error instanciar variable
                                return value;
                            case -1: //-> error
                                return value;
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                if (statement0 instanceof autoincrements) {
                                }
                                else {
                                    if (value[1] != null) {
                                        if (value[1] instanceof Array) {
                                            for (var _h = 0, _j = value[1]; _h < _j.length; _h++) {
                                                var m = _j[_h];
                                                this.value.push(m);
                                            }
                                        }
                                        else {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                if (statement0 instanceof autoincrements) {
                                }
                                else {
                                    if (value[1] != null) {
                                        if (value[1] instanceof Array) {
                                            for (var _k = 0, _l = value[1]; _k < _l.length; _k++) {
                                                var m = _l[_k];
                                                this.value.push(m);
                                            }
                                        }
                                        else {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 2: //-> sin errores, break
                                return [2, this.value];
                            case 3: //-> sin errores, continue
                                return [3, this.value];
                            case 4: //-> sin errores, return
                                return [4, value[1]];
                        }
                    }
                }
            }
            return [this.StateCode, this.value];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    IfStatement.prototype.grahp = function () {
        return "";
    };
    IfStatement.prototype.traduction = function () {
        return "";
    };
    return IfStatement;
}(statement));
var OperatorTernario = /** @class */ (function (_super) {
    __extends(OperatorTernario, _super);
    function OperatorTernario() {
        var _this = _super.call(this) || this;
        _this.Expression1 = null;
        _this.Expression2 = null;
        _this.ValueExpression = null;
        return _this;
    }
    OperatorTernario.prototype.execute = function (tablasimbolo) {
        try {
            var valInitial = this.ValueExpression.execute(tablasimbolo);
            if (valInitial[0] < 0)
                return [-1, null];
            if (valInitial[1]) {
                var val1 = this.Expression1.execute(tablasimbolo);
                if (val1[1] < 0)
                    return [-1, null];
                this.StateCode = 1;
                this.value = val1[1];
            }
            else {
                var val2 = this.Expression2.execute(tablasimbolo);
                if (val2[1] < 0)
                    return [-1, null];
                this.StateCode = 1;
                this.value = val2[1];
            }
            return [this.StateCode, this.value];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    OperatorTernario.prototype.grahp = function () {
        return "";
    };
    OperatorTernario.prototype.traduction = function () {
        return "";
    };
    return OperatorTernario;
}(statement));
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var expression = /** @class */ (function (_super) {
    __extends(expression, _super);
    function expression() {
        var _this = _super.call(this) || this;
        _this.Expresion = null;
        _this.atributo = [];
        _this.position = [];
        _this.name = "";
        _this.ArrayType = null;
        _this.isCallFunction = false;
        _this.parameters = [];
        _this.farray = false;
        return _this;
    }
    expression.prototype.getValueAtributo = function (tablasimbolo) {
        //get all atributes
        var positions = [];
        var atributos = [];
        for (var _i = 0, _a = this.position; _i < _a.length; _i++) {
            var pos = _a[_i];
            positions.push(pos);
        }
        for (var _b = 0, _c = this.atributo; _b < _c.length; _b++) {
            var atr = _c[_b];
            atributos.push(atr);
        }
        try {
            if (this.atributo.length > 0) {
                if (this.name != "") {
                    var simbolo = tablasimbolo.getsym(this.name);
                    ////console.log(simbolo)
                    if (simbolo[0] > 0) {
                        if (simbolo[1] instanceof sym) {
                            var simbolito1 = simbolo[1];
                            ////console.log(simbolito1)
                            if (simbolito1.getValue() instanceof types) {
                                var valors = simbolito1.getValue();
                                ////console.log(atributos)
                                var val = valors.getValuesAtributo(atributos, tablasimbolo);
                                //console.log(val);
                                if (val[0] > 0) {
                                    ////console.log(val[1])
                                    if (val[1].value instanceof statement) {
                                        if (val[1].value instanceof Nulls) {
                                            return '__jw__';
                                        }
                                        else {
                                            var result = val[1].value.execute(tablasimbolo);
                                            ////console.log(result)
                                            if (result[0] > 0)
                                                return result[1];
                                        }
                                    }
                                    else {
                                        ////console.log(val[1].value);
                                        return val[1].value;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return null;
        }
        catch (e) {
            return null;
        }
    };
    expression.prototype.getValueAtributoArray = function (tablasimbolo) {
        //get all atributes
        var positions = [];
        var atributos = [];
        for (var _i = 0, _a = this.position; _i < _a.length; _i++) {
            var pos = _a[_i];
            positions.push(pos);
        }
        for (var _b = 0, _c = this.atributo; _b < _c.length; _b++) {
            var atr = _c[_b];
            atributos.push(atr);
        }
        try {
            if (this.atributo.length > 0) {
                if (this.name != "") {
                    var simbolo = tablasimbolo.getsym(this.name);
                    if (simbolo[0] > 0) {
                        if (simbolo[1] instanceof sym) {
                            var simbolito1 = simbolo[1];
                            if (simbolito1.getValue() instanceof types) {
                                var valors = simbolito1.getValue();
                                var val = valors.getValuesAtributo(atributos, tablasimbolo);
                                if (val[0] > 0) {
                                    try {
                                        if (val[1].value instanceof arrays) {
                                            var valors2 = val[1].value;
                                            if (this.position.length > 0) {
                                                var vae = valors2.getValue(positions, tablasimbolo);
                                                if (vae[0] > 0) {
                                                    try {
                                                        var result = vae[1].execute(tablasimbolo);
                                                        if (result[0] > 0)
                                                            return result[1];
                                                    }
                                                    catch (e) {
                                                        return val[1];
                                                    }
                                                }
                                            }
                                            else {
                                                return valors2.getAll();
                                            }
                                        }
                                    }
                                    catch (e) {
                                        return null;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return null;
        }
        catch (e) {
            return null;
        }
    };
    expression.prototype.getValuesArrayAtributo = function (tablasimbolo) {
        var Expression = this.Expresion;
        //get all values array
        var positions = [];
        var atributos = [];
        for (var _i = 0, _a = this.position; _i < _a.length; _i++) {
            var pos = _a[_i];
            positions.push(pos);
        }
        for (var _b = 0, _c = this.atributo; _b < _c.length; _b++) {
            var atr = _c[_b];
            atributos.push(atr);
        }
        try {
            if (this.name != "") {
                var simbolo = tablasimbolo.getsym(this.name);
                if (simbolo[0] > 0) {
                    if (simbolo[1] instanceof sym) {
                        var simbolito1 = simbolo[1];
                        if (simbolito1.getValue() instanceof arrays) {
                            var valors = simbolito1.getValue();
                            if (this.position.length > 0) {
                                var val = valors.getValue(positions, tablasimbolo);
                                if (val[0] > 0) {
                                    if (val[1] instanceof types) {
                                        var valors2 = val[1];
                                        var vae = valors2.getValuesAtributo(atributos, tablasimbolo);
                                        if (vae[0] > 0) {
                                            try {
                                                if (vae[1].value instanceof Nulls) {
                                                    return '__jw__';
                                                }
                                                else {
                                                    var result = vae[1].value.execute(tablasimbolo);
                                                    if (result[0] > 0)
                                                        return result[1];
                                                }
                                            }
                                            catch (e) {
                                                return null;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                return valors.getAll();
                            }
                        }
                    }
                }
            }
            else {
                if (this.position.length > 0) {
                    var valors = Expression;
                    var val = valors.execute(tablasimbolo);
                    if (val[0] > 0) {
                        var resu = val[1].getValue(positions, tablasimbolo);
                        if (resu[0] > 0) {
                            var result = resu[1].execute(tablasimbolo);
                            if (result[0] > 0)
                                return result[1];
                        }
                    }
                }
                else {
                    var valors = Expression;
                    var val = valors.execute(tablasimbolo);
                    if (val[0] > 0) {
                        return val[1].getAll();
                    }
                }
            }
            return null;
        }
        catch (e) {
            return null;
        }
    };
    expression.prototype.getValuesArray = function (tablasimbolo) {
        var Expression = this.Expresion;
        //get all values array
        var positions = [];
        var atributos = [];
        for (var _i = 0, _a = this.position; _i < _a.length; _i++) {
            var pos = _a[_i];
            positions.push(pos);
        }
        for (var _b = 0, _c = this.atributo; _b < _c.length; _b++) {
            var atr = _c[_b];
            atributos.push(atr);
        }
        ////console.log(positions)
        try {
            if (this.name != "") {
                var simbolo = tablasimbolo.getsym(this.name);
                if (simbolo[0] > 0) {
                    if (simbolo[1] instanceof sym) {
                        var simbolito1 = simbolo[1];
                        if (simbolito1.getValue() instanceof arrays) {
                            ////console.log(simbolito1)
                            var valors = simbolito1.getValue();
                            if (this.position.length > 0) {
                                var val = valors.getValue(positions, tablasimbolo);
                                if (val[0] > 0) {
                                    if (val[1] instanceof statement) {
                                        var result = val[1].execute(tablasimbolo);
                                        ////console.log(result)
                                        if (result[0] > 0)
                                            return result[1];
                                    }
                                    else {
                                        ////console.log(val[1])
                                        return val[1];
                                    }
                                }
                            }
                            else {
                                return valors.getAll();
                            }
                        }
                    }
                }
            }
            else {
                if (this.position.length > 0) {
                    var valors = Expression;
                    var val = valors.execute(tablasimbolo);
                    if (val[0] > 0) {
                        var resu = val[1].getValue(positions, tablasimbolo);
                        if (resu[0] > 0) {
                            var result = resu[1].execute(tablasimbolo);
                            if (result[0] > 0)
                                return result[1];
                        }
                    }
                }
                else {
                    var valors = Expression;
                    var val = valors.execute(tablasimbolo);
                    if (val[0] > 0) {
                        return val[1].getAll();
                    }
                }
            }
            return null;
        }
        catch (e) {
            //console.log(e);
            return null;
        }
    };
    expression.prototype.getValueCallFunction = function (tablasimbolo) {
        try {
            var val = tablasimbolo.getsym(this.name);
            if (val[0] > 0) {
                var func = val[1];
                var funcion = func.value;
                ////console.log(this.parameters)
                ////console.log(funcion);
                var res = funcion.executeV(tablasimbolo, this.parameters);
                ////console.log(res);
                if (res[0] > 0) {
                    if (res[1] == null)
                        return '__jw__';
                    return res[1];
                }
            }
            return null;
        }
        catch (e) {
            return null;
        }
    };
    expression.prototype.getValue = function (tablasimbolo) {
        //get data in especific
        ////console.log(this.position)
        var Expression = this.Expresion;
        this.Expresion = null;
        this.Expresion = Expression;
        var positions = [];
        var atributos = [];
        for (var _i = 0, _a = this.position; _i < _a.length; _i++) {
            var pos = _a[_i];
            positions.push(pos);
        }
        var temp = [];
        for (var _b = 0, positions_1 = positions; _b < positions_1.length; _b++) {
            var tempo = positions_1[_b];
            temp.push(tempo);
        }
        for (var _c = 0, _d = this.atributo; _c < _d.length; _c++) {
            var atr = _d[_c];
            atributos.push(atr);
        }
        try {
            if (this.ArrayType != null) {
                switch (this.ArrayType) {
                    case NativeArray.Length:
                        var simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0) {
                            ////console.log(simbolo)
                            if (simbolo[1] instanceof sym) {
                                var simbolito1 = simbolo[1];
                                if (simbolito1.getValue() instanceof arrays) {
                                    var valors = simbolito1.getValue();
                                    ////console.log(valors);
                                    if (this.position.length > 0) {
                                        var val1 = valors.getValue(temp, tablasimbolo);
                                        if (val1[0] > 0) {
                                            if (val1[1] instanceof arrays) {
                                                var retorno = val1[1];
                                                return retorno.length();
                                            }
                                        }
                                    }
                                    else {
                                        ////console.log(valors.values.length)
                                        return valors.values.length;
                                    }
                                }
                            }
                        }
                        break;
                    case NativeArray.Pop:
                        var simbolo1 = tablasimbolo.getsym(this.name);
                        if (simbolo1[0] > 0) {
                            if (simbolo1[1] instanceof sym) {
                                var simbolito1 = simbolo1[1];
                                if (simbolito1.getValue() instanceof arrays) {
                                    var valors = simbolito1.getValue();
                                    if (this.position.length > 0) {
                                        var val1 = valors.getValue(positions, tablasimbolo);
                                        if (val1[0] > 0) {
                                            if (val1[1] instanceof arrays) {
                                                var retorno = val1[1];
                                                var retorno1 = retorno.pop();
                                                if (retorno1[0] > 0) {
                                                    var m = valors.setValue(tablasimbolo, temp, retorno);
                                                    if (m[0] > 0) {
                                                        var k = tablasimbolo.update(this.name, valors);
                                                        if (k[0] > 0)
                                                            return retorno1[1].execute(tablasimbolo)[1];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        var retorno = valors.pop();
                                        if (retorno[0] > 0) {
                                            var k = tablasimbolo.update(this.name, valors);
                                            if (k[0] > 0)
                                                return retorno[1].execute(tablasimbolo)[1];
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case NativeArray.Push:
                        var simbolo2 = tablasimbolo.getsym(this.name);
                        ////console.log(simbolo2);
                        ////console.log('Ambito ---- ', tablasimbolo.ambitoLevel)
                        ////console.log(this.position, this.name, value[1]);
                        if (simbolo2[0] > 0) {
                            if (simbolo2[1] instanceof sym) {
                                var simbolito1 = simbolo2[1];
                                ////console.log(simbolito1.getValue())
                                if (simbolito1.getValue() instanceof arrays) {
                                    var valors = simbolito1.getValue();
                                    if (this.position.length > 0) {
                                        var bb = valors.push1(this.Expresion, temp, tablasimbolo);
                                        if (bb[0] > 0) {
                                            var k = tablasimbolo.update(this.name, valors);
                                            if (k[0] > 0)
                                                return valors.length() + 1;
                                        }
                                    }
                                    else {
                                        var value = Expression.execute(tablasimbolo);
                                        ////console.log('Ambito ---- ', tablasimbolo.ambitoLevel)
                                        ////console.log(this.position, this.name, value[1]);
                                        if (value[0] > 0) {
                                            if (value[1] instanceof arrays) {
                                                if (value[1].niu) {
                                                    value[1].values = [];
                                                    var bb = valors.push(value[1]);
                                                    if (bb[0] > 0) {
                                                        var k = tablasimbolo.update(this.name, valors);
                                                        if (k[0] > 0)
                                                            return valors.length() + 1;
                                                    }
                                                }
                                                else {
                                                    var bb = valors.push(value[1]);
                                                    if (bb[0] > 0) {
                                                        var k = tablasimbolo.update(this.name, valors);
                                                        if (k[0] > 0)
                                                            return valors.length() + 1;
                                                    }
                                                }
                                            }
                                            else {
                                                var bb = valors.push(value[1]);
                                                if (bb[0] > 0) {
                                                    var k = tablasimbolo.update(this.name, valors);
                                                    if (k[0] > 0)
                                                        return valors.length() + 1;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                }
            }
            else if (this.atributo.length > 0 && this.position.length > 0) {
                if (this.farray) {
                    return this.getValuesArrayAtributo(tablasimbolo);
                }
                else {
                    return this.getValueAtributoArray(tablasimbolo);
                }
            }
            else if (this.atributo.length > 0) {
                return this.getValueAtributo(tablasimbolo);
            }
            else if (this.position.length > 0) {
                return this.getValuesArray(tablasimbolo);
            }
            else if (this.name != "") {
                if (this.isCallFunction) {
                    return this.getValueCallFunction(tablasimbolo);
                }
                else {
                    var simbolo = tablasimbolo.getsym(this.name);
                    ////console.log(simbolo);
                    if (simbolo[0] > 0) {
                        if (simbolo[1] instanceof sym) {
                            var simbolito1 = simbolo[1];
                            if (simbolito1.getValue() == null)
                                return '__jw__';
                            return simbolito1.getValue();
                        }
                    }
                }
            }
            else {
                ////console.log(this);
                switch (this.valueType) {
                    case TypeValue["null"]:
                        return "__jw__";
                    case TypeValue.Array:
                        if (Expression instanceof arrays) {
                            return Expression.getAll();
                        }
                        break;
                    case TypeValue.Boolean:
                        if (Expression instanceof Booleans) {
                            return Expression.getValue();
                        }
                        break;
                    case TypeValue["const"]:
                        return Expression.execute(tablasimbolo);
                    case TypeValue.let:
                        return Expression.execute(tablasimbolo);
                    case TypeValue.Number:
                        if (Expression instanceof Numbers) {
                            return Expression.getValue();
                        }
                        break;
                    case TypeValue.Object:
                        var simbolo = tablasimbolo.getsym(this.name);
                        return simbolo[1];
                    case TypeValue.String:
                        if (Expression instanceof Strings) {
                            return Expression.getValue();
                        }
                        break;
                    case TypeValue.type:
                        if (Expression instanceof types) {
                            return Expression;
                        }
                        break;
                    case TypeValue["var"]:
                        if (name != "") {
                            var simbolo_1 = tablasimbolo.getsym(this.name);
                            if (simbolo_1[0] > 0) {
                                if (simbolo_1[1] instanceof sym) {
                                    var simbolito1 = simbolo_1[1];
                                    return simbolito1.getValue();
                                }
                            }
                        }
                        break;
                    case TypeValue["void"]:
                        return '__jw__';
                    default:
                        var simbolo0 = tablasimbolo.getsym(this.name);
                        ////console.log(simbolo0)
                        if (simbolo0[0] > 0) {
                            if (simbolo0[1] instanceof sym) {
                                var simbolito1 = simbolo0[1];
                                return simbolito1.getValue();
                            }
                        }
                }
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction\"}');
            return null;
        }
        catch (e) {
            ////console.log(e)
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction\"}');
            return null;
        }
    };
    expression.prototype.execute = function (tablasimbolo) {
        //get all data from all version of types
        try {
            var data = this.getValue(tablasimbolo);
            ////console.log(this.name)
            if (data != null) {
                if (data == '__jw__')
                    return [1, null];
                return [1, data];
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, We cant get the data');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',We cant get the data\"}');
            return [-1, 'We cant get the data'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ',Unexpected Error, cannot be execute the instruction\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    expression.prototype.grahp = function () {
        return "";
    };
    expression.prototype.traduction = function () {
        return (this.Expresion != null) ? this.Expresion.traduction() : '';
    };
    return expression;
}(statement));
var ArichmeticExpression = /** @class */ (function (_super) {
    __extends(ArichmeticExpression, _super);
    function ArichmeticExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArichmeticExpression.prototype.execute = function (tablasimbolo) {
        this.StateCode = -1;
        this.value = null;
        try {
            var izq = (this.Expression1 != null) ? this.Expression1.execute(tablasimbolo) : [-1, null];
            var der = (this.Expression2 != null) ? this.Expression2.execute(tablasimbolo) : [-1, null];
            ////console.log(izq, der)
            if (izq[0] > 0 && der[0] > 0) {
                switch (this.Function) {
                    case ArichmeticExpr.suma:
                        return [1, izq[1] + der[1]];
                    case ArichmeticExpr.resta:
                        return [1, izq[1] - der[1]];
                    case ArichmeticExpr.potenciacion:
                        return [1, Math.pow(izq[1], der[1])];
                    case ArichmeticExpr.multiplicacion:
                        return [1, izq[1] * der[1]];
                    case ArichmeticExpr.modulo:
                        ////console.log(izq[1]%der[1])
                        return [1, izq[1] % der[1]];
                    case ArichmeticExpr.negacion:
                        return [1, -izq[1]];
                    case ArichmeticExpr.division:
                        if (der[1] != 0) {
                            return [1, izq[1] / der[1]];
                        }
                        else {
                            return [1, izq[1] / der[1]];
                        }
                }
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, An Lost Expression cant result');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', An Lost Expression cant result\"}');
            return [-1, 'Arichmetic Exception not defined values...'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    ArichmeticExpression.prototype.grahp = function () {
        return "";
    };
    ArichmeticExpression.prototype.traduction = function () {
        var izq = (this.Expression1 != null) ? this.Expression1.traduction() : '';
        var der = (this.Expression2 != null) ? this.Expression2.traduction() : '';
        switch (this.Function) {
            case ArichmeticExpr.division:
                return izq + '/' + der;
            case ArichmeticExpr.modulo:
                return izq + '%' + der;
            case ArichmeticExpr.multiplicacion:
                return izq + '*' + der;
            case ArichmeticExpr.negacion:
                return '-' + izq;
            case ArichmeticExpr.potenciacion:
                return izq + '**' + der;
            case ArichmeticExpr.resta:
                return izq + '-' + der;
            case ArichmeticExpr.suma:
                return izq + '+' + der;
        }
    };
    return ArichmeticExpression;
}(statement));
var LogialExpression = /** @class */ (function (_super) {
    __extends(LogialExpression, _super);
    function LogialExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogialExpression.prototype.execute = function (tablasimbolo) {
        this.StateCode = -1;
        this.value = null;
        try {
            ////console.log('F->'+this.Function);
            ////console.log(this.Expression1);
            ////console.log(this.Expression2);
            var izq = (this.Expression1 != null) ? this.Expression1.execute(tablasimbolo) : [-1, null];
            var der = (this.Expression2 != null) ? this.Expression2.execute(tablasimbolo) : [-1, null];
            ////console.log(izq);
            ////console.log(der);
            if (izq[0] > 0 && der[0] > 0) {
                switch (this.Function) {
                    case LogicalExpr.Y:
                        return [1, izq[1] && der[1]];
                    case LogicalExpr.O:
                        return [1, izq[1] || der[1]];
                    case LogicalExpr.NOT:
                        return [1, !izq[1]];
                }
            }
            else if (izq[0] > 0) {
                switch (this.Function) {
                    case LogicalExpr.NOT:
                        return [1, !izq[1]];
                }
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, An Lost Expression cant result');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', An Lost Expression cant result\"}');
            return [-1, null];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    LogialExpression.prototype.grahp = function () {
        return "";
    };
    LogialExpression.prototype.traduction = function () {
        var izq = (this.Expression1 != null) ? this.Expression1.traduction() : '';
        var der = (this.Expression2 != null) ? this.Expression2.traduction() : '';
        switch (this.Function) {
            case LogicalExpr.NOT:
                return '!' + der;
            case LogicalExpr.O:
                return izq + '||' + der;
            case LogicalExpr.Y:
                return izq + '&&' + der;
        }
    };
    return LogialExpression;
}(statement));
var RelationalExpression = /** @class */ (function (_super) {
    __extends(RelationalExpression, _super);
    function RelationalExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelationalExpression.prototype.execute = function (tablasimbolo) {
        this.StateCode = -1;
        this.value = null;
        try {
            var izq = (this.Expression1 != null) ? this.Expression1.execute(tablasimbolo) : [1, null];
            var der = (this.Expression2 != null) ? this.Expression2.execute(tablasimbolo) : [1, null];
            //console.log(izq, der)
            if (izq[0] == 1 && der[0] == 1) {
                switch (this.Function) {
                    case RelationalExpr.Igual:
                        return [1, izq[1] == der[1]];
                    case RelationalExpr.Mayor:
                        return [1, izq[1] > der[1]];
                    case RelationalExpr.MayorQue:
                        return [1, izq[1] >= der[1]];
                    case RelationalExpr.Menor:
                        return [1, izq[1] < der[1]];
                    case RelationalExpr.MenorQue:
                        return [1, izq[1] <= der[1]];
                    case RelationalExpr.NoIgual:
                        return [1, izq[1] != der[1]];
                }
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, An Lost Expression cant result');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', An Lost Expression cant result\"}');
            return [-1, null];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, we cannot find the error...\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    RelationalExpression.prototype.grahp = function () {
        return '';
    };
    RelationalExpression.prototype.traduction = function () {
        var izq = (this.Expression1 != null) ? this.Expression1.traduction() : '';
        var der = (this.Expression2 != null) ? this.Expression2.traduction() : '';
        switch (this.Function) {
            case RelationalExpr.NoIgual:
                return izq + '!=' + der;
            case RelationalExpr.MenorQue:
                return izq + '<=' + der;
            case RelationalExpr.Menor:
                return izq + '<' + der;
            case RelationalExpr.MayorQue:
                return izq + '>=' + der;
            case RelationalExpr.Mayor:
                return izq + '>' + der;
            case RelationalExpr.Igual:
                return izq + '==' + der;
        }
    };
    return RelationalExpression;
}(statement));
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var functions = /** @class */ (function (_super) {
    __extends(functions, _super);
    function functions() {
        var _this = _super.call(this) || this;
        _this.Parameters = [];
        _this.body = [];
        return _this;
    }
    functions.prototype.execute = function (tablasimbolo) {
        return tablasimbolo.insert(this.name, this, TypeSym.Funcion, this.tipo);
    };
    functions.prototype.executeV = function (tablasimbolo1, parameters) {
        try {
            var tempBody = [];
            for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                var btemp = _a[_i];
                tempBody.push(btemp);
            }
            ////console.log(this.name)
            var tablasimbolo_3 = new tablasimbolos(tablasimbolo1, true);
            ////console.log(this.Parameters.length == parameters.length)
            if (this.Parameters.length == parameters.length) {
                for (var a = 0; a < this.Parameters.length; a++) {
                    var namev = this.Parameters[a].name;
                    ////console.log(namev)
                    if (parameters[a] instanceof expression) {
                        var value = parameters[a];
                        var valueS = value.execute(tablasimbolo1);
                        if (valueS[0] > 0) {
                            tablasimbolo_3.insert(namev, valueS[1], TypeSym.Variable, this.Parameters[a].tipo);
                        }
                        /*
                        switch (this.Parameters[a].tipo)
                        {
                            case TypeValue.String:
                                let valueS = value.execute(tablasimbolo);
                                if(valueS[0]>0) {

                                    if (valueS[1] instanceof String) {
                                        tablasimbolo.insert(namev, valueS[1], TypeSym.Variable, TypeValue.String);
                                    } else {
                                        return [-1, 'Parametro invalido...']
                                    }
                                }
                                else
                                {
                                    return [-1, 'Parametro invalido...']
                                }
                                break;
                            case TypeValue.Number:
                                let valueN = value.execute(tablasimbolo);
                                if(valueN[0]>0) {

                                    if (valueN[1] instanceof Number) {
                                        tablasimbolo.insert(namev, valueN[1], TypeSym.Variable, TypeValue.Number);
                                    } else {
                                        return [-1, 'Parametro invalido...']
                                    }
                                }
                                else
                                {
                                    return [-1, 'Parametro invalido...']
                                }
                                break;
                            case TypeValue.Boolean:
                                let valueB = value.execute(tablasimbolo);
                                if(valueB[0]>0) {

                                    if (valueB[1] instanceof Boolean) {
                                        tablasimbolo.insert(namev, valueB[1], TypeSym.Variable, TypeValue.Boolean);
                                    } else {
                                        return [-1, 'Parametro invalido...']
                                    }
                                }
                                else
                                {
                                    return [-1, 'Parametro invalido...']
                                }
                                break;
                            case TypeValue.var:
                                let valueV = tablasimbolo.getsym(value.name);
                                if(valueV[0]>1) {
                                    let simbolo =<sym> valueV[1];
                                    tablasimbolo.insert(namev,simbolo.value,simbolo.tipo,simbolo.tipoValue);
                                }
                                else
                                {
                                    return [-1, 'Parametro invalido...']
                                }
                                break;
                            case TypeValue.type:
                                let valueT = value.execute(tablasimbolo);
                                if(valueT[0]>0) {

                                    if (valueT[1] instanceof types) {
                                        tablasimbolo.insert(namev, valueT[1], TypeSym.Variable, TypeValue.type);
                                    } else {
                                        return [-1, 'Parametro invalido...']
                                    }
                                }
                                else
                                {
                                    return [-1, 'Parametro invalido...']
                                }
                                break;
                            case TypeValue.Array:
                                let valueA = value.execute(tablasimbolo);
                                if(valueA[0]>0) {

                                    if (valueA[1] instanceof arrays) {
                                        tablasimbolo.insert(namev, valueA[1], TypeSym.Variable, TypeValue.Array);
                                    } else {
                                        return [-1, 'Parametro invalido...']
                                    }
                                }
                                else
                                {
                                    return [-1, 'Parametro invalido...']
                                }
                                break;
                            default:
                                return [-1, 'Parametro invalido...']


                        }
                        */
                    }
                    else {
                        if (parameters[a] instanceof Strings || parameters[a] instanceof arrays || parameters[a] instanceof types || parameters[a] instanceof Numbers || parameters[a] instanceof Booleans || parameters[a] instanceof Nulls) {
                            var valueS = parameters[a].execute();
                            if (valueS[0] > 0) {
                                tablasimbolo_3.insert(namev, valueS[1], TypeSym.Variable, this.Parameters[a].tipo);
                            }
                        }
                        else {
                            var valueS = parameters[a].execute(tablasimbolo1);
                            if (valueS[0] > 0) {
                                tablasimbolo_3.insert(namev, valueS[1], TypeSym.Variable, this.Parameters[a].tipo);
                            }
                        }
                        /*
                        switch (this.Parameters[a].tipo)
                        {
                            case TypeValue.String:
                                let valueS = parameters[a].execute(tablasimbolo);
                                if(valueS[0]>0) {

                                    if (valueS[1] instanceof String) {
                                        tablasimbolo.insert(namev, valueS[1], TypeSym.Variable, TypeValue.String);
                                    } else {
                                        return [-1, null]
                                    }
                                }
                                else
                                {
                                    return [-1,null]
                                }
                                break;
                            case TypeValue.Number:
                                let valueN = parameters[a].execute(tablasimbolo);
                                if(valueN[0]>0) {

                                    if (valueN[1] instanceof Number) {
                                        tablasimbolo.insert(namev, valueN[1], TypeSym.Variable, TypeValue.Number);
                                    } else {
                                        return [-1, null]
                                    }
                                }
                                else
                                {
                                    return [-1,null]
                                }
                                break;
                            case TypeValue.Boolean:
                                let valueB = parameters[a].execute(tablasimbolo);
                                if(valueB[0]>0) {

                                    if (valueB[1] instanceof Boolean) {
                                        tablasimbolo.insert(namev, valueB[1], TypeSym.Variable, TypeValue.Boolean);
                                    } else {
                                        return [-1, null]
                                    }
                                }
                                else
                                {
                                    return [-1,null]
                                }
                                break;
                            default:
                                return [-1,null]


                        }

                         */
                    }
                }
                ////console.log(tablasimbolo)
                for (var _b = 0, tempBody_1 = tempBody; _b < tempBody_1.length; _b++) {
                    var statement1 = tempBody_1[_b];
                    ////console.log(this.name, tablasimbolo);
                    var value = statement1.execute(tablasimbolo_3);
                    ////console.log(this.name, value, statement1); //-> [4,5] -> value = [4,5] -> value = [4,5]
                    ////console.log('----------------------------------')
                    ////console.log(tablasimbolo)
                    //conssole.log(value)
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return value;
                        case -1: //-> error
                            return value;
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            this.value = value[1];
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            this.value = value[1];
                            break;
                        case 2: //-> sin errores, break
                            break;
                        case 3: //-> sin errores, continue
                            break;
                        case 4: //-> sin errores, return
                            this.actualizarTs(tablasimbolo1, tablasimbolo_3, parameters);
                            ////console.log(value);
                            return [4, value[1]];
                    }
                }
                this.actualizarTs(tablasimbolo1, tablasimbolo_3, parameters);
                return [1, null];
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, Internal Error, Parameters length is not the same length, length: ' + this.Parameters.length + ', length_send: ' + parameters.length);
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Internal Error, Parameters length is not the same length, length: ' + this.Parameters.length + ', length_send: ' + parameters.length + '"}');
            return [-1, 'Internal Error, Parameters length is not the same length, length: ' + this.Parameters.length + ", length_send: " + parameters.length];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, we cannot find the error...\"}');
            return [-1, 'Unexpected Error, we cannot find a solution for this error'];
        }
    };
    functions.prototype.grahp = function () {
        return "";
    };
    functions.prototype.traduction = function () {
        return "";
    };
    functions.prototype.actualizarTs = function (tablasimbolos, tablasimbolos1, paramsCall) {
        try {
            for (var _i = 0, paramsCall_1 = paramsCall; _i < paramsCall_1.length; _i++) {
                var finder = paramsCall_1[_i];
                if (finder instanceof expression) {
                    var value = finder;
                    if (value.name != '' && value.isCallFunction == false) {
                        var simbol = tablasimbolos1.getsym(value.name);
                        if (simbol[0] > 0) {
                            var valor = simbol[1];
                            var insert = tablasimbolos.update(value.name, valor.getValue());
                        }
                    }
                }
            }
        }
        catch (e) {
        }
    };
    return functions;
}(statement));
var Parameter = /** @class */ (function (_super) {
    __extends(Parameter, _super);
    function Parameter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Parameter.prototype.execute = function (tablasimbolo) {
    };
    Parameter.prototype.grahp = function () {
        return "";
    };
    Parameter.prototype.traduction = function () {
        return "";
    };
    return Parameter;
}(statement));
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var WhileStatements = /** @class */ (function (_super) {
    __extends(WhileStatements, _super);
    function WhileStatements() {
        var _this = _super.call(this) || this;
        _this.ValueExpression = null;
        _this.body = [];
        _this.value = [];
        return _this;
    }
    WhileStatements.prototype.execute = function (tablasimbolo1) {
        try {
            this.value = [];
            var state = true;
            var tempBody = [];
            for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                var btemp = _a[_i];
                tempBody.push(btemp);
            }
            while (state) {
                var tablasimbolo_4 = new tablasimbolos(tablasimbolo1, false);
                var valInitial = this.ValueExpression.execute(tablasimbolo_4);
                if (valInitial[0] < 0)
                    return [-1, null];
                if (!valInitial[1])
                    break;
                var internalState = 0;
                for (var _b = 0, tempBody_2 = tempBody; _b < tempBody_2.length; _b++) {
                    var statement0 = tempBody_2[_b];
                    var value = statement0.execute(tablasimbolo_4);
                    ////console.log(value);
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return value;
                        case -1: //-> error
                            return value;
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            if (statement0 instanceof autoincrements) {
                            }
                            else {
                                if (value[1] != null) {
                                    if (value[1] instanceof Array) {
                                        for (var _c = 0, _d = value[1]; _c < _d.length; _c++) {
                                            var m = _d[_c];
                                            this.value.push(m);
                                        }
                                    }
                                    else {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            if (statement0 instanceof autoincrements) {
                            }
                            else {
                                if (value[1] != null) {
                                    if (value[1] instanceof Array) {
                                        for (var _e = 0, _f = value[1]; _e < _f.length; _e++) {
                                            var m = _f[_e];
                                            this.value.push(m);
                                        }
                                    }
                                    else {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            break;
                        case 2: //-> sin errores, break
                            internalState = 2;
                            break;
                        case 3: //-> sin errores, continue
                            internalState = 3;
                            break;
                        case 4: //-> sin errores, return
                            return [4, value[1]];
                    }
                    if (internalState == 3 || internalState == 2)
                        break;
                }
                if (internalState == 3)
                    continue;
                if (internalState == 2)
                    break;
            }
            return [1, this.value];
        }
        catch (e) {
            ////console.log(e);
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, we cannot find the error...\"}');
            return [-1, 'Unexpected Error, we cannot find the error...'];
        }
    };
    WhileStatements.prototype.grahp = function () {
        return "";
    };
    WhileStatements.prototype.traduction = function () {
        return "";
    };
    return WhileStatements;
}(statement));
var DoWhileStatements = /** @class */ (function (_super) {
    __extends(DoWhileStatements, _super);
    function DoWhileStatements() {
        var _this = _super.call(this) || this;
        _this.ValueExpression = null;
        _this.body = [];
        _this.value = [];
        return _this;
    }
    DoWhileStatements.prototype.execute = function (tablasimblolo1) {
        try {
            this.value = [];
            //let tablasimblolo:tablasimbolos = new tablasimbolos(tablasimblolo1,false)
            var state = true;
            var tempBody = [];
            for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                var btemp = _a[_i];
                tempBody.push(btemp);
            }
            while (state) {
                var tablasimblolo = new tablasimbolos(tablasimblolo1, false);
                var internalState = 0;
                for (var _b = 0, tempBody_3 = tempBody; _b < tempBody_3.length; _b++) {
                    var statement0 = tempBody_3[_b];
                    var value = statement0.execute(tablasimblolo);
                    //////console.log(value, statement0);
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return value;
                        case -1: //-> error
                            return value;
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            if (statement0 instanceof autoincrements) {
                            }
                            else {
                                if (value[1] != null) {
                                    if (value[1] instanceof Array) {
                                        for (var _c = 0, _d = value[1]; _c < _d.length; _c++) {
                                            var m = _d[_c];
                                            this.value.push(m);
                                        }
                                    }
                                    else {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            if (statement0 instanceof autoincrements) {
                            }
                            else {
                                if (value[1] != null) {
                                    if (value[1] instanceof Array) {
                                        for (var _e = 0, _f = value[1]; _e < _f.length; _e++) {
                                            var m = _f[_e];
                                            this.value.push(m);
                                        }
                                    }
                                    else {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            break;
                        case 2: //-> sin errores, break
                            internalState = 2;
                            break;
                        case 3: //-> sin errores, continue
                            internalState = 3;
                            break;
                        case 4: //-> sin errores, return
                            return [4, value[1]];
                    }
                    if (internalState == 3 || internalState == 2)
                        break;
                }
                if (internalState == 3)
                    continue;
                if (internalState == 2)
                    break;
                var valInitial = this.ValueExpression.execute(tablasimblolo);
                ////console.log(valInitial)
                if (valInitial[0] < 0)
                    return [-1, null];
                if (!valInitial[1])
                    break;
            }
            return [1, this.value];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, we cannot find the error...\"}');
            return [-1, 'Unexpected Error, we cannot find the error...'];
        }
    };
    DoWhileStatements.prototype.grahp = function () {
        return "";
    };
    DoWhileStatements.prototype.traduction = function () {
        return "";
    };
    return DoWhileStatements;
}(statement));
//for normal -> for(var a =0;a<4;a++)
var ForStatements1 = /** @class */ (function (_super) {
    __extends(ForStatements1, _super);
    function ForStatements1() {
        var _this = _super.call(this) || this;
        _this.body = [];
        _this.condicion = null;
        _this.valueInitial = null;
        _this.postIterator = null;
        _this.value = [];
        return _this;
    }
    ForStatements1.prototype.execute = function (tablasimbolo1) {
        try {
            //this.value = []
            ////console.log(this.body)
            //let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1,false)
            var tablasimbolo2 = new tablasimbolos(tablasimbolo1, false);
            var initial = this.valueInitial.execute(tablasimbolo2);
            var tempBody = [];
            for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                var btemp = _a[_i];
                tempBody.push(btemp);
            }
            if (initial[0] > 0) {
                ////console.log(tablasimbolo)
                var state = true;
                while (state) {
                    var internalState = 0;
                    var condicion = this.condicion.execute(tablasimbolo2);
                    ////console.log(condicion)
                    if (condicion[0] < 0)
                        return [-1, 'Condition Iteration For, Error, cannot execute the  Condition'];
                    if (condicion[1]) {
                        var tablasimbolo_5 = new tablasimbolos(tablasimbolo2, false);
                        ////console.log(condicion[1])
                        for (var _b = 0, tempBody_4 = tempBody; _b < tempBody_4.length; _b++) {
                            var statement1 = tempBody_4[_b];
                            var value = statement1.execute(tablasimbolo_5);
                            switch (value[0]) {
                                case -2: //-> error instanciar variable
                                    return value;
                                case -1: //-> error
                                    return value;
                                case 0: //-> finalizado
                                    this.StateCode = 0;
                                    if (statement1 instanceof autoincrements) {
                                    }
                                    else {
                                        if (value[1] != null) {
                                            if (value[1] instanceof Array) {
                                                for (var _c = 0, _d = value[1]; _c < _d.length; _c++) {
                                                    var m = _d[_c];
                                                    this.value.push(m);
                                                }
                                            }
                                            else {
                                                this.value.push(value[1]);
                                            }
                                        }
                                    }
                                    break;
                                case 1: //-> sin errores
                                    this.StateCode = 1;
                                    if (statement1 instanceof autoincrements) {
                                    }
                                    else {
                                        if (value[1] != null) {
                                            if (value[1] instanceof Array) {
                                                for (var _e = 0, _f = value[1]; _e < _f.length; _e++) {
                                                    var m = _f[_e];
                                                    this.value.push(m);
                                                }
                                            }
                                            else {
                                                this.value.push(value[1]);
                                            }
                                        }
                                    }
                                    break;
                                case 2: //-> sin errores, break
                                    internalState = 2;
                                    break;
                                case 3: //-> sin errores, continue
                                    internalState = 3;
                                    break;
                                case 4: //-> sin errores, return
                                    return [4, value[1]];
                            }
                            if (internalState == 3 || internalState == 2)
                                break;
                        }
                        if (internalState == 3)
                            continue;
                        if (internalState == 2)
                            state = false;
                        var post = this.postIterator.execute(tablasimbolo2);
                        if (post[0] < 0)
                            return [-1, 'Post Iteration For, Error, cannot execute the Post Condition'];
                    }
                    else {
                        state = false;
                    }
                }
            }
            return [1, this.value];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, we cannot find the error...\"}');
            return [-1, 'Unexpected Error, we cannot find the error...'];
        }
    };
    ForStatements1.prototype.grahp = function () {
        return "";
    };
    ForStatements1.prototype.traduction = function () {
        return "";
    };
    return ForStatements1;
}(statement));
//for tipo1 -> for(a;a<4;a++)
var ForStatements2 = /** @class */ (function (_super) {
    __extends(ForStatements2, _super);
    function ForStatements2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForStatements2.prototype.execute = function (tablasimbolo1) {
        try {
            this.value = [];
            var tablasimbolo_6 = new tablasimbolos(tablasimbolo1, false);
            var initial = tablasimbolo_6.get(this.valueInitial);
            if (initial != null) {
                var state = true;
                while (state) {
                    var internalState = 0;
                    var condicion = this.condicion.execute(tablasimbolo_6);
                    if (condicion[0] < 0)
                        return [-1, null];
                    if (condicion[1]) {
                        for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                            var statement1 = _a[_i];
                            var value = statement1.execute(tablasimbolo_6);
                            switch (value[0]) {
                                case -2: //-> error instanciar variable
                                    return [-2, null];
                                case -1: //-> error
                                    return [-1, null];
                                case 0: //-> finalizado
                                    this.StateCode = 0;
                                    if (value[1] != null) {
                                        if (value[1] instanceof Array) {
                                            for (var _b = 0, _c = value[1]; _b < _c.length; _b++) {
                                                var m = _c[_b];
                                                this.value.push(m);
                                            }
                                        }
                                        else {
                                            this.value.push(value[1]);
                                        }
                                    }
                                    break;
                                case 1: //-> sin errores
                                    this.StateCode = 1;
                                    if (value[1] != null) {
                                        if (value[1] instanceof Array) {
                                            for (var _d = 0, _e = value[1]; _d < _e.length; _d++) {
                                                var m = _e[_d];
                                                this.value.push(m);
                                            }
                                        }
                                        else {
                                            this.value.push(value[1]);
                                        }
                                    }
                                    break;
                                case 2: //-> sin errores, break
                                    internalState = 2;
                                    break;
                                case 3: //-> sin errores, continue
                                    internalState = 3;
                                    break;
                                case 4: //-> sin errores, return
                                    return [4, value[1]];
                            }
                            if (internalState == 3 || internalState == 2)
                                break;
                        }
                        if (internalState == 3)
                            continue;
                        if (internalState == 2)
                            break;
                        var post = this.postIterator.execute(tablasimbolo_6);
                        if (post[0] < 0)
                            return [-1, null];
                    }
                    else {
                        break;
                    }
                }
            }
            return [1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    ForStatements2.prototype.grahp = function () {
        return "";
    };
    ForStatements2.prototype.traduction = function () {
        return "";
    };
    return ForStatements2;
}(statement));
//for in -> for(let a in (ident|[]))
var ForStatements3 = /** @class */ (function (_super) {
    __extends(ForStatements3, _super);
    function ForStatements3() {
        var _this = _super.call(this) || this;
        _this.value = [];
        _this.body = [];
        _this.StateCode = -1;
        return _this;
    }
    ForStatements3.prototype.execute = function (tablasimbolo1) {
        var tablasimbolo = new tablasimbolos(tablasimbolo1, false);
        var tempBody = [];
        for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
            var btemp = _a[_i];
            tempBody.push(btemp);
        }
        try {
            this.value = [];
            var internalState = 0;
            tablasimbolo.insert(this.identificador, null, TypeSym.Variable, TypeValue.Object);
            for (var _b = 0, tempBody_5 = tempBody; _b < tempBody_5.length; _b++) {
                var statement1 = tempBody_5[_b];
                var value = statement1.execute(tablasimbolo);
                switch (value[0]) {
                    case -2: //-> error instanciar variable
                        return value;
                    case -1: //-> error
                        return value;
                    case 0: //-> finalizado
                        this.StateCode = 0;
                        if (statement1 instanceof autoincrements) {
                        }
                        else {
                            if (value[1] != null) {
                                if (value[1] instanceof Array) {
                                    for (var _c = 0, _d = value[1]; _c < _d.length; _c++) {
                                        var m = _d[_c];
                                        this.value.push(m);
                                    }
                                }
                                else {
                                    this.value.push(value[1]);
                                }
                            }
                        }
                        break;
                    case 1: //-> sin errores
                        this.StateCode = 1;
                        if (statement1 instanceof autoincrements) {
                        }
                        else {
                            if (value[1] != null) {
                                if (value[1] instanceof Array) {
                                    for (var _e = 0, _f = value[1]; _e < _f.length; _e++) {
                                        var m = _f[_e];
                                        this.value.push(m);
                                    }
                                }
                                else {
                                    this.value.push(value[1]);
                                }
                            }
                        }
                        break;
                    case 2: //-> sin errores, break
                        internalState = 2;
                        break;
                    case 3: //-> sin errores, continue
                        internalState = 3;
                        break;
                    case 4: //-> sin errores, return
                        return [4, value[1]];
                }
                if (internalState == 3 || internalState == 2)
                    break;
            }
            if (this.Expression instanceof expression) {
                var vals = this.Expression.execute(tablasimbolo);
                if (vals[0] > 0) {
                    if (vals[1] instanceof arrays) {
                        var kk = vals[1].getAll();
                        for (var pos in kk) {
                            tablasimbolo.update(this.identificador, pos);
                            if (internalState == 3)
                                continue;
                            if (internalState == 2)
                                break;
                        }
                    }
                }
            }
            else if (this.Expression instanceof arrays) {
                var valores = this.Expression.getAll();
                for (var post in valores) {
                    tablasimbolo.update(this.identificador, post);
                    for (var _g = 0, tempBody_6 = tempBody; _g < tempBody_6.length; _g++) {
                        var statement1 = tempBody_6[_g];
                        var value = statement1.execute(tablasimbolo);
                        switch (value[0]) {
                            case -2: //-> error instanciar variable
                                return value;
                            case -1: //-> error
                                return value;
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                if (statement1 instanceof autoincrements) {
                                }
                                else {
                                    if (value[1] != null) {
                                        if (value[1] instanceof Array) {
                                            for (var _h = 0, _j = value[1]; _h < _j.length; _h++) {
                                                var m = _j[_h];
                                                this.value.push(m);
                                            }
                                        }
                                        else {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                if (statement1 instanceof autoincrements) {
                                }
                                else {
                                    if (value[1] != null) {
                                        if (value[1] instanceof Array) {
                                            for (var _k = 0, _l = value[1]; _k < _l.length; _k++) {
                                                var m = _l[_k];
                                                this.value.push(m);
                                            }
                                        }
                                        else {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 2: //-> sin errores, break
                                internalState = 2;
                                break;
                            case 3: //-> sin errores, continue
                                internalState = 3;
                                break;
                            case 4: //-> sin errores, return
                                return [4, value[1]];
                        }
                        if (internalState == 3 || internalState == 2)
                            break;
                    }
                    if (internalState == 3)
                        continue;
                    if (internalState == 2)
                        break;
                }
            }
            if (this.StateCode >= 0)
                return [1, this.value];
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, Cannot applied iterators in For...in, because only Arrays is permited!.');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Cannot applied iterators in For...in, because only Arrays is permited!.\"}');
            return [-1, 'Cannot applied iterators in For...in, because only Arrays is permited!.'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, we cannot find the error...\"}');
            return [-1, 'Unexpected Error, we cannot find the error...'];
        }
    };
    ForStatements3.prototype.grahp = function () {
        return "";
    };
    ForStatements3.prototype.traduction = function () {
        return "";
    };
    return ForStatements3;
}(statement));
//for of -> for(let a of (ident|[]|String))
var ForStatements4 = /** @class */ (function (_super) {
    __extends(ForStatements4, _super);
    function ForStatements4() {
        var _this = _super.call(this) || this;
        _this.value = [];
        _this.StateCode = -1;
        return _this;
    }
    ForStatements4.prototype.execute = function (tablasimbolo1) {
        var tablasimbolo = new tablasimbolos(tablasimbolo1, false);
        try {
            this.value = [];
            var tempBody = [];
            for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                var btemp = _a[_i];
                tempBody.push(btemp);
            }
            var internalState = 0;
            tablasimbolo.insert(this.identificador, null, TypeSym.Variable, TypeValue.Object);
            if (this.Expression instanceof expression) {
                var vals = this.Expression.execute(tablasimbolo);
                if (vals[0] > 0) {
                    if (vals[1] instanceof arrays) {
                        var kk = vals[1].getAll();
                        for (var _b = 0, kk_1 = kk; _b < kk_1.length; _b++) {
                            var pos = kk_1[_b];
                            if (pos instanceof arrays) {
                                var km = pos.getAll();
                                for (var _c = 0, km_1 = km; _c < km_1.length; _c++) {
                                    var posi = km_1[_c];
                                    tablasimbolo.update(this.identificador, posi.execute(tablasimbolo)[1]);
                                    for (var _d = 0, tempBody_7 = tempBody; _d < tempBody_7.length; _d++) {
                                        var statement1 = tempBody_7[_d];
                                        var value = statement1.execute(tablasimbolo);
                                        switch (value[0]) {
                                            case -2: //-> error instanciar variable
                                                return value;
                                            case -1: //-> error
                                                return value;
                                            case 0: //-> finalizado
                                                this.StateCode = 0;
                                                if (statement1 instanceof autoincrements) {
                                                }
                                                else {
                                                    if (value[1] != null) {
                                                        if (value[1] instanceof Array) {
                                                            for (var _e = 0, _f = value[1]; _e < _f.length; _e++) {
                                                                var m = _f[_e];
                                                                this.value.push(m);
                                                            }
                                                        }
                                                        else {
                                                            this.value.push(value[1]);
                                                        }
                                                    }
                                                }
                                                break;
                                            case 1: //-> sin errores
                                                this.StateCode = 1;
                                                this.StateCode = 1;
                                                if (statement1 instanceof autoincrements) {
                                                }
                                                else {
                                                    if (value[1] != null) {
                                                        if (value[1] instanceof Array) {
                                                            for (var _g = 0, _h = value[1]; _g < _h.length; _g++) {
                                                                var m = _h[_g];
                                                                this.value.push(m);
                                                            }
                                                        }
                                                        else {
                                                            this.value.push(value[1]);
                                                        }
                                                    }
                                                }
                                                break;
                                            case 2: //-> sin errores, break
                                                internalState = 2;
                                                break;
                                            case 3: //-> sin errores, continue
                                                internalState = 3;
                                                break;
                                            case 4: //-> sin errores, return
                                                return [4, value[1]];
                                        }
                                        if (internalState == 3 || internalState == 2)
                                            break;
                                    }
                                    if (internalState == 3)
                                        continue;
                                    if (internalState == 2)
                                        break;
                                }
                            }
                            else {
                                tablasimbolo.update(this.identificador, pos.execute(tablasimbolo)[1]);
                                for (var _j = 0, tempBody_8 = tempBody; _j < tempBody_8.length; _j++) {
                                    var statement1 = tempBody_8[_j];
                                    var value = statement1.execute(tablasimbolo);
                                    switch (value[0]) {
                                        case -2: //-> error instanciar variable
                                            return value;
                                        case -1: //-> error
                                            return value;
                                        case 0: //-> finalizado
                                            this.StateCode = 0;
                                            if (statement1 instanceof autoincrements) {
                                            }
                                            else {
                                                if (value[1] != null) {
                                                    if (value[1] instanceof Array) {
                                                        for (var _k = 0, _l = value[1]; _k < _l.length; _k++) {
                                                            var m = _l[_k];
                                                            this.value.push(m);
                                                        }
                                                    }
                                                    else {
                                                        this.value.push(value[1]);
                                                    }
                                                }
                                            }
                                            break;
                                        case 1: //-> sin errores
                                            this.StateCode = 1;
                                            if (statement1 instanceof autoincrements) {
                                            }
                                            else {
                                                if (value[1] != null) {
                                                    if (value[1] instanceof Array) {
                                                        for (var _m = 0, _o = value[1]; _m < _o.length; _m++) {
                                                            var m = _o[_m];
                                                            this.value.push(m);
                                                        }
                                                    }
                                                    else {
                                                        this.value.push(value[1]);
                                                    }
                                                }
                                            }
                                            break;
                                        case 2: //-> sin errores, break
                                            internalState = 2;
                                            break;
                                        case 3: //-> sin errores, continue
                                            internalState = 3;
                                            break;
                                        case 4: //-> sin errores, return
                                            return [4, value[1]];
                                    }
                                    if (internalState == 3 || internalState == 2)
                                        break;
                                }
                                if (internalState == 3)
                                    continue;
                                if (internalState == 2)
                                    break;
                            }
                        }
                    }
                    else {
                        for (var _p = 0, _q = vals[1]; _p < _q.length; _p++) {
                            var pos = _q[_p];
                            tablasimbolo.update(this.identificador, pos);
                            for (var _r = 0, tempBody_9 = tempBody; _r < tempBody_9.length; _r++) {
                                var statement1 = tempBody_9[_r];
                                var value = statement1.execute(tablasimbolo);
                                switch (value[0]) {
                                    case -2: //-> error instanciar variable
                                        return value;
                                    case -1: //-> error
                                        return value;
                                    case 0: //-> finalizado
                                        this.StateCode = 0;
                                        if (statement1 instanceof autoincrements) {
                                        }
                                        else {
                                            if (value[1] != null) {
                                                if (value[1] instanceof Array) {
                                                    for (var _s = 0, _t = value[1]; _s < _t.length; _s++) {
                                                        var m = _t[_s];
                                                        this.value.push(m);
                                                    }
                                                }
                                                else {
                                                    this.value.push(value[1]);
                                                }
                                            }
                                        }
                                        break;
                                    case 1: //-> sin errores
                                        this.StateCode = 1;
                                        if (statement1 instanceof autoincrements) {
                                        }
                                        else {
                                            if (value[1] != null) {
                                                if (value[1] instanceof Array) {
                                                    for (var _u = 0, _v = value[1]; _u < _v.length; _u++) {
                                                        var m = _v[_u];
                                                        this.value.push(m);
                                                    }
                                                }
                                                else {
                                                    this.value.push(value[1]);
                                                }
                                            }
                                        }
                                        break;
                                    case 2: //-> sin errores, break
                                        internalState = 2;
                                        break;
                                    case 3: //-> sin errores, continue
                                        internalState = 3;
                                        break;
                                    case 4: //-> sin errores, return
                                        return [4, value[1]];
                                }
                                if (internalState == 3 || internalState == 2)
                                    break;
                            }
                            if (internalState == 3)
                                continue;
                            if (internalState == 2)
                                break;
                        }
                    }
                }
            }
            else if (this.Expression instanceof arrays) {
                var valores = this.Expression.getAll();
                for (var _w = 0, valores_1 = valores; _w < valores_1.length; _w++) {
                    var post = valores_1[_w];
                    tablasimbolo.update(this.identificador, post.execute(tablasimbolo)[1]);
                    for (var _x = 0, tempBody_10 = tempBody; _x < tempBody_10.length; _x++) {
                        var statement1 = tempBody_10[_x];
                        var value = statement1.execute(tablasimbolo);
                        switch (value[0]) {
                            case -2: //-> error instanciar variable
                                return value;
                            case -1: //-> error
                                return value;
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                if (statement1 instanceof autoincrements) {
                                }
                                else {
                                    if (value[1] != null) {
                                        if (value[1] instanceof Array) {
                                            for (var _y = 0, _z = value[1]; _y < _z.length; _y++) {
                                                var m = _z[_y];
                                                this.value.push(m);
                                            }
                                        }
                                        else {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                if (statement1 instanceof autoincrements) {
                                }
                                else {
                                    if (value[1] != null) {
                                        if (value[1] instanceof Array) {
                                            for (var _0 = 0, _1 = value[1]; _0 < _1.length; _0++) {
                                                var m = _1[_0];
                                                this.value.push(m);
                                            }
                                        }
                                        else {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 2: //-> sin errores, break
                                internalState = 2;
                                break;
                            case 3: //-> sin errores, continue
                                internalState = 3;
                                break;
                            case 4: //-> sin errores, return
                                return [4, value[1]];
                        }
                        if (internalState == 3 || internalState == 2)
                            break;
                    }
                    if (internalState == 3)
                        continue;
                    if (internalState == 2)
                        break;
                }
            }
            else if (this.Expression instanceof Strings) {
                var valores1 = this.Expression.execute();
                for (var _2 = 0, valores1_1 = valores1; _2 < valores1_1.length; _2++) {
                    var va = valores1_1[_2];
                    tablasimbolo.update(this.identificador, va);
                    for (var _3 = 0, tempBody_11 = tempBody; _3 < tempBody_11.length; _3++) {
                        var statement1 = tempBody_11[_3];
                        var value = statement1.execute(tablasimbolo);
                        switch (value[0]) {
                            case -2: //-> error instanciar variable
                                return value;
                            case -1: //-> error
                                return value;
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                if (statement1 instanceof autoincrements) {
                                }
                                else {
                                    if (value[1] != null) {
                                        if (value[1] instanceof Array) {
                                            for (var _4 = 0, _5 = value[1]; _4 < _5.length; _4++) {
                                                var m = _5[_4];
                                                this.value.push(m);
                                            }
                                        }
                                        else {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                if (statement1 instanceof autoincrements) {
                                }
                                else {
                                    if (value[1] != null) {
                                        if (value[1] instanceof Array) {
                                            for (var _6 = 0, _7 = value[1]; _6 < _7.length; _6++) {
                                                var m = _7[_6];
                                                this.value.push(m);
                                            }
                                        }
                                        else {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 2: //-> sin errores, break
                                internalState = 2;
                                break;
                            case 3: //-> sin errores, continue
                                internalState = 3;
                                break;
                            case 4: //-> sin errores, return
                                return [4, value[1]];
                        }
                        if (internalState == 3 || internalState == 2)
                            break;
                    }
                    if (internalState == 3)
                        continue;
                    if (internalState == 2)
                        break;
                }
            }
            if (this.StateCode >= 0)
                return [1, this.value];
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, We cannot applied the instructions, because For...Of only iterate Strings and Arrays...');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', We cannot applied the instructions, because For...Of only iterate Strings and Arrays...\"}');
            return [-1, 'We cannot applied the instructions, because For...Of only iterate Strings and Arrays...'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, we cannot find the error...\"}');
            return [-1, 'Unexpected Error, we cannot find the error...'];
        }
    };
    ForStatements4.prototype.grahp = function () {
        return "";
    };
    ForStatements4.prototype.traduction = function () {
        return "";
    };
    return ForStatements4;
}(statement));
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var Strings = /** @class */ (function (_super) {
    __extends(Strings, _super);
    function Strings() {
        var _this = _super.call(this) || this;
        _this.value = "";
        return _this;
    }
    Strings.prototype.execute = function () {
        return [1, this.value];
    };
    Strings.prototype.getValue = function () {
        return this.value;
    };
    Strings.prototype.grahp = function () {
        return "";
    };
    Strings.prototype.traduction = function () {
        return "";
    };
    return Strings;
}(statement));
var Numbers = /** @class */ (function (_super) {
    __extends(Numbers, _super);
    function Numbers() {
        var _this = _super.call(this) || this;
        _this.value = -1;
        return _this;
    }
    Numbers.prototype.execute = function () {
        return [1, this.value];
    };
    Numbers.prototype.getValue = function () {
        return this.value;
    };
    Numbers.prototype.grahp = function () {
        return "";
    };
    Numbers.prototype.traduction = function () {
        return "";
    };
    return Numbers;
}(statement));
var Booleans = /** @class */ (function (_super) {
    __extends(Booleans, _super);
    function Booleans() {
        var _this = _super.call(this) || this;
        _this.value = false;
        return _this;
    }
    Booleans.prototype.getValue = function () {
        return this.value;
    };
    Booleans.prototype.execute = function () {
        return [1, this.value];
    };
    Booleans.prototype.grahp = function () {
        return "";
    };
    Booleans.prototype.traduction = function () {
        return "";
    };
    return Booleans;
}(statement));
var Nulls = /** @class */ (function (_super) {
    __extends(Nulls, _super);
    function Nulls() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nulls.prototype.getValue = function () {
        return null;
    };
    Nulls.prototype.execute = function () {
        return [1, null];
    };
    Nulls.prototype.grahp = function () {
        return "";
    };
    Nulls.prototype.traduction = function () {
        return "";
    };
    return Nulls;
}(statement));
var Cadena3 = /** @class */ (function (_super) {
    __extends(Cadena3, _super);
    function Cadena3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cadena3.prototype.getValue = function () {
        return this.value;
    };
    Cadena3.prototype.execute = function () {
        return [1, ""];
    };
    Cadena3.prototype.grahp = function () {
        return "";
    };
    Cadena3.prototype.traduction = function () {
        return "";
    };
    return Cadena3;
}(statement));
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var NativeStatement = /** @class */ (function (_super) {
    __extends(NativeStatement, _super);
    function NativeStatement(typeS, instr) {
        var _this = _super.call(this) || this;
        _this.instruction = instr;
        _this.type = typeS;
        return _this;
    }
    NativeStatement.prototype.execute = function (tablasimbolo) {
        try {
            if (this.instruction == Native.console) {
                var resultado = '';
                for (var _i = 0, _a = this.Expression; _i < _a.length; _i++) {
                    var valu = _a[_i];
                    ////console.log(this.Expression)
                    ////console.log('console-> ',tablasimbolo)
                    if (this.Expression == null)
                        return [-1, null];
                    ////console.log(this.Expression);
                    ////console.log(valu);
                    var value = valu.execute(tablasimbolo);
                    ////console.log(value);
                    if (value[0] < 0)
                        return [-1, null];
                    //this.htmlYouWantToAdd = "<p><b>value[1]</b></p>";
                    if (value[1] == null) {
                        resultado += "null";
                    }
                    else {
                        ////console.log(1998, value[1])
                        if (value[1] instanceof arrays) {
                            try {
                                resultado += '[ ';
                                var a = 0;
                                for (var _b = 0, _c = value[1].getAll(); _b < _c.length; _b++) {
                                    var m = _c[_b];
                                    a++;
                                    if (m instanceof statement) {
                                        resultado += m.execute(tablasimbolo)[1];
                                    }
                                    else {
                                        resultado += m;
                                    }
                                    if (a < value[1].getAll().length)
                                        resultado += ' , ';
                                }
                                resultado += ' ]';
                            }
                            catch (e) {
                                resultado += value[1];
                            }
                        }
                        else if (value[1] instanceof types) {
                            ////console.log(value[1])
                            resultado += value[1].execute(tablasimbolo)[1];
                        }
                        else {
                            if (value[1].toString().includes('\n')) {
                                var vales = value[1].split('\n');
                                for (var _d = 0, vales_1 = vales; _d < vales_1.length; _d++) {
                                    var vale = vales_1[_d];
                                    outs.push('Linea: ' + this.linea + ', valor: ' + vale);
                                    output.push('{\"linea\":\"' + this.linea + '\", \"valor\":\"' + vale + '\"}');
                                }
                            }
                            else {
                                resultado += value[1];
                            }
                        }
                    }
                }
                outs.push('Linea: ' + this.linea + ', valor: ' + resultado);
                output.push('{\"linea\":\"' + this.linea + '\", \"valor\":\"' + resultado + '\"}');
                return [1, '{\"linea\":\"' + this.linea + '\", \"valor\":\"' + resultado + '\"}'];
            }
            else {
                ghs = '{ \"simbolos\":[';
                var m = 0;
                for (var _e = 0, _f = tablasimbolo.simbolos; _e < _f.length; _e++) {
                    var simbolo = _f[_e];
                    var string = '{';
                    string += '\"name\":\"' + simbolo.name + '\",';
                    string += '\"ambito\":\"' + simbolo.ambito + '\",';
                    string += '\"tipo\":\"' + TypeSym[simbolo.tipo] + '\",';
                    string += '\"type\":\"' + TypeValue[simbolo.tipoValue] + '\"';
                    string += '}';
                    m++;
                    if (m < tablasimbolo.simbolos.length)
                        string += ',';
                    ghs += string;
                }
                ghs += ']}';
                return [1, this.graph];
            }
        }
        catch (e) {
            ////console.log(e)
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction\"}');
            return [-1, null];
        }
    };
    NativeStatement.prototype.grahp = function () {
        return "";
    };
    NativeStatement.prototype.traduction = function () {
        return "";
    };
    return NativeStatement;
}(statement));
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var types = /** @class */ (function (_super) {
    __extends(types, _super);
    function types() {
        var _this = _super.call(this) || this;
        _this.niu = false;
        return _this;
    }
    types.prototype.execute = function (tablasimbolo) {
        ////console.log(this.atributos)
        var atrs = [];
        for (var _i = 0, _a = this.atributos; _i < _a.length; _i++) {
            var mm = _a[_i];
            mm.execute(tablasimbolo);
            atrs.push(mm);
        }
        this.atributos = atrs;
        return [1, this];
    };
    types.prototype.getValueAtributo = function (atributo) {
        ////console.log(this.atributos, atributo);
        for (var _i = 0, _a = this.atributos; _i < _a.length; _i++) {
            var atr = _a[_i];
            if (atr.name == atributo) {
                ////console.log(atr)
                return [1, atr];
            }
        }
        outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot get Atributte');
        output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot get the atributte\"}');
        return [-1, null];
    };
    types.prototype.getValuesAtributo1 = function (objeto, atributos, tablasimbolo) {
        try {
            var atr = atributos.pop();
            if (atributos.length > 0) {
                var atrsub0 = this.getValueAtributo(atr);
                if (atrsub0[0] > 0) {
                    if (atrsub0[1] instanceof atributo) {
                        if (atrsub0[1].value instanceof types) {
                            var atrsub = this.getValuesAtributo1(atrsub0[1].value, atributos, tablasimbolo);
                            if (atrsub[0] > 0) {
                                return [1, atrsub[1]];
                            }
                        }
                    }
                }
            }
            else {
                var atratr = objeto.getValueAtributo(atr);
                if (atratr[0] > 0) {
                    return [1, atratr[1]];
                }
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction\"}');
            return [-1, null];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction\"}');
            return [-1, null];
        }
    };
    types.prototype.getValuesAtributo = function (atributos, tablasimbolo) {
        try {
            /*
            let atributos = [];
            for(let a = (atributos1.length -1); a>0; a--)
            {
                atributos.push(atributos1[a]);
            }*/
            ////console.log(atributos)
            var atr = atributos.pop();
            if (atributos.length > 0) {
                var atrsub0 = this.getValueAtributo(atr);
                ////console.log(atrsub0)
                if (atrsub0[0] > 0) {
                    if (atrsub0[1] instanceof atributo) {
                        if (atrsub0[1].value instanceof types) {
                            var atrsub = this.getValuesAtributo1(atrsub0[1].value, atributos, tablasimbolo);
                            if (atrsub[0] > 0) {
                                return [1, atrsub[1]];
                            }
                        }
                    }
                }
            }
            else {
                var atratr = this.getValueAtributo(atr);
                ////console.log(atr, atratr)
                if (atratr[0] > 0) {
                    return [1, atratr[1]];
                }
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot get Attribute');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot get the atributte\"}');
            return [-1, null];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction\"}');
            return [-1, null];
        }
    };
    types.prototype.setValueAtributo11 = function (objeto, atributos, value) {
        try {
            var atr = atributos.pop();
            if (atributos.length > 0) {
                var atrsub0 = objeto.getValueAtributo(atr);
                ////console.log(atrsub0)
                if (atrsub0[0] > 0) {
                    if (atrsub0[1] instanceof atributo) {
                        if (atrsub0[1].value instanceof types) {
                            var atrsub = objeto.setValuesAtributo11(atrsub0[1].value, atributos, value);
                            if (atrsub[0] > 0) {
                                return objeto.setValueAtributo(atr, atrsub[1]);
                            }
                        }
                    }
                }
            }
            else {
                var atratr = this.setValueAtributo(atr, value);
                ////console.log(atr, atratr)
                if (atratr[0] > 0) {
                    return [1, atratr[1]];
                }
            }
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot set the atributte\"}');
            return [-1, null];
        }
    };
    types.prototype.setValueAtributo1 = function (atributos, value) {
        try {
            var atr = atributos.pop();
            if (atributos.length > 0) {
                var atrsub0 = this.getValueAtributo(atr);
                ////console.log(atrsub0)
                if (atrsub0[0] > 0) {
                    if (atrsub0[1] instanceof atributo) {
                        if (atrsub0[1].value instanceof types) {
                            var atrsub = atrsub0[1].value.setValueAtributo11(atrsub0[1].value, atributos, value);
                            if (atrsub[0] > 0) {
                                return this.setValueAtributo(atr, atrsub[1]);
                            }
                        }
                    }
                }
            }
            else {
                var atratr = this.setValueAtributo(atr, value);
                ////console.log(atr, atratr)
                if (atratr[0] > 0) {
                    return [1, atratr[1]];
                }
            }
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot set the atributte\"}');
            return [-1, null];
        }
    };
    types.prototype.setValueAtributo = function (atributo, value) {
        for (var _i = 0, _a = this.atributos; _i < _a.length; _i++) {
            var atr = _a[_i];
            if (atr.name == atributo) {
                atr.value = value;
                return [1, atr];
            }
        }
        outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
        output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot set the atributte\"}');
        return [-1, null];
    };
    types.prototype.grahp = function () {
        return "";
    };
    types.prototype.traduction = function () {
        return "";
    };
    return types;
}(statement));
var atributo = /** @class */ (function () {
    function atributo() {
    }
    atributo.prototype.execute = function (tablasimbolos) {
        var valors = tablasimbolos.get(this.tipo);
        if (valors[0] > 0) {
            this.value = valors[1];
        }
        ////console.log(this)
    };
    return atributo;
}());
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var declarations = /** @class */ (function (_super) {
    __extends(declarations, _super);
    function declarations() {
        var _this = _super.call(this) || this;
        _this.Expression = [];
        return _this;
    }
    declarations.prototype.execute = function (tablasimbolo) {
        try {
            ////console.log(this)
            if (this.tipo == TypeValue.type) {
                var declaracion = this.Expression[0];
                tablasimbolo.insert(declaracion.name, declaracion.Expression, TypeSym["class"], this.tipo);
            }
            else {
                for (var _i = 0, _a = this.Expression; _i < _a.length; _i++) {
                    var declaracion = _a[_i];
                    if (this.tipo == TypeValue.let) {
                        var declaration = declaracion;
                        declaration.tipoSim = TypeSym.let;
                        var value = declaration.execute(tablasimbolo);
                        switch (value[0]) {
                            case -2: //-> error instanciar variable
                                return value;
                            case -1: //-> error
                                return value;
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                this.value = value[1];
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                this.value = value[1];
                                break;
                            default:
                                return [-1, 'An Error was ocurred, we can\'t identified the error.'];
                        }
                    }
                    else if (this.tipo == TypeValue["var"]) {
                        var declaration = declaracion;
                        declaration.tipoSim = TypeSym["var"];
                        var value = declaration.execute(tablasimbolo);
                        switch (value[0]) {
                            case -2: //-> error instanciar variable
                                return value;
                            case -1: //-> error
                                return value;
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                this.value = value[1];
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                this.value = value[1];
                                break;
                            default:
                                return [-1, 'An Error was ocurred, we can\'t identified the error.'];
                        }
                    }
                    else if (this.tipo == TypeValue["const"]) {
                        var declaration = declaracion;
                        declaration.tipoSim = TypeSym["const"];
                        var value = declaration.execute(tablasimbolo);
                        switch (value[0]) {
                            case -2: //-> error instanciar variable
                                return value;
                            case -1: //-> error
                                return value;
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                this.value = value[1];
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                this.value = value[1];
                                break;
                            default:
                                return [-1, 'An Error was ocurred, we can\'t identified the error.'];
                        }
                    }
                    else {
                        var declaration = declaracion;
                        declaration.tipoSim = TypeSym.Variable;
                        var value = declaration.execute(tablasimbolo);
                        switch (value[0]) {
                            case -2: //-> error instanciar variable
                                return value;
                            case -1: //-> error
                                return value;
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                this.value = value[1];
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                this.value = value[1];
                                break;
                            default:
                                outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, we can\'t identified the error.');
                                output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', An Error was ocurred, we can\'t identified the error.\"}');
                                return [-1, 'An Error was ocurred, we can\'t identified the error.'];
                        }
                    }
                }
            }
            return [1, null];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    declarations.prototype.grahp = function () {
        return "";
    };
    declarations.prototype.traduction = function () {
        return "";
    };
    return declarations;
}(statement));
var declaration0 = /** @class */ (function (_super) {
    __extends(declaration0, _super);
    function declaration0() {
        var _this = _super.call(this) || this;
        _this.nameType = '';
        return _this;
    }
    declaration0.prototype.execute = function (tablasimbolo) {
        try {
            ////console.log(this);
            if (this.nameType != '') {
                var typer = tablasimbolo.getsym(this.nameType);
                ////console.log(typer);
                if (typer[0] > 0) {
                    if (typer[1] instanceof sym) {
                        var type = typer[1].getValue();
                        ////console.log(type);
                        if (type instanceof types && this.Expression instanceof types) {
                            ////console.log('validate');
                            ////console.log(this.Expression.atributos.length == type.atributos.length)
                            if (this.Expression.atributos.length == type.atributos.length) {
                                return tablasimbolo.insert(this.name, this.Expression, TypeSym["class"], this.tipo);
                            }
                        }
                    }
                }
            }
            else {
                var valor = this.Expression.execute(tablasimbolo);
                ////console.log(valor);
                if (valor[0] > 0) {
                    return tablasimbolo.insert(this.name, valor[1], this.tipoSim, this.tipo);
                }
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Error [declaration] Linea: ' + this.linea + ', cannot be execute the instruction\"}');
            return [-1, 'Error [declaration] Linea: ' + this.linea + ', cannot be execute the instruction'];
        }
        catch (e) {
            ////console.log(e)
            outs.push('Error: Ocurrio un error inesperado, Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction');
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Error [declaration] Linea: ' + this.linea + ', Unexpected Error, cannot be execute the instruction\"}');
            return [-2, 'Unexpected Error, cannot be execute the instruction'];
        }
    };
    declaration0.prototype.grahp = function () {
        return "";
    };
    declaration0.prototype.traduction = function () {
        return "";
    };
    return declaration0;
}(statement));
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var BreakStatements = /** @class */ (function (_super) {
    __extends(BreakStatements, _super);
    function BreakStatements() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BreakStatements.prototype.execute = function (tablasimbolo) {
        return [2, null];
    };
    BreakStatements.prototype.grahp = function () {
        return "";
    };
    BreakStatements.prototype.traduction = function () {
        return "";
    };
    return BreakStatements;
}(statement));
var ContinueStatements = /** @class */ (function (_super) {
    __extends(ContinueStatements, _super);
    function ContinueStatements() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContinueStatements.prototype.execute = function (tablasimbolo) {
        return [3, null];
    };
    ContinueStatements.prototype.grahp = function () {
        return "";
    };
    ContinueStatements.prototype.traduction = function () {
        return "";
    };
    return ContinueStatements;
}(statement));
var ReturnStatements = /** @class */ (function (_super) {
    __extends(ReturnStatements, _super);
    function ReturnStatements() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReturnStatements.prototype.execute = function (tablasimbolo) {
        try {
            var val = this.Expresion.execute(tablasimbolo);
            ////console.log(val)
            if (val[0] > 0)
                return [4, val[1]];
            return [-1, 'An error appears, in Return instructions, maybe you will be inspect the return expression...'];
        }
        catch (e) {
            return [-1, 'Unexpected Error, we cannot find the error'];
        }
    };
    ReturnStatements.prototype.grahp = function () {
        return "";
    };
    ReturnStatements.prototype.traduction = function () {
        return "";
    };
    return ReturnStatements;
}(statement));
/*
    UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
    JOSE WANNAN - 201612331 @2020
 */
var jsondataprueba = '';
var jsondata2 = '{"linea":"52","S":[{"linea":"1","statement":"declaration","type":[{"linea":"1","tipo":[{"linea":"1","tipo":"let"}],"size":[]}], "values":[{"linea":"1","statement":"variable","tipoExpresion":[],"name":"a","ValExpression":[{"linea":"1","operator":[{"linea":"1","v":"="}],"Expression":[{"linea":"1","statement":"arreglo","value":[{"linea":"1","tipo":"number", "value":"5"}]}]}]}]},\n' +
    '{"linea":"2","statement":"console","expression":[{"linea":"2","statement":"nativeArray", "name":"a" ,"hijo":[],"native":"length"}]},\n' +
    '{"linea":"3","statement":"console","expression":[{"linea":"3","statement":"nativeArray", "name":"a", "hijo":[],"native":"pop"}]},\n' +
    '{"linea":"4","statement":"nativeArray", "name":"a" ,"hijo":[],"native":"push","value":[{"linea":"4","statement":"arreglo","value":[{"linea":"4","tipo":"number", "value":"5"},\n' +
    '{"linea":"4","tipo":"number", "value":"6"}]}]},\n' +
    '{"linea":"5","statement":"console","expression":[{"linea":"5","statement":"nativeArray", "name":"a" ,"hijo":[],"native":"length"}]},\n' +
    '{"linea":"6","statement":"nativeArray", "name":"a" ,"hijo":[{"linea":"6","statement":"ArrayList","value":[{"linea":"6","statement":"MatrizPosition","value":[{"linea":"6","tipo":"number", "value":"0"}]}]}],"native":"push","value":[{"linea":"6","statement":"arreglo","value":[{"linea":"6","tipo":"number", "value":"5"},\n' +
    '{"linea":"6","tipo":"number", "value":"6"}]}]},\n' +
    '{"linea":"6","statement":""},\n' +
    '{"linea":"7","statement":"nativeArray", "name":"a", "hijo":[{"linea":"7","statement":"ArrayList","value":[{"linea":"7","statement":"MatrizPosition","value":[{"linea":"7","tipo":"number", "value":"0"}]}]}],"native":"pop"},\n' +
    '{"linea":"7","statement":""},\n' +
    '{"linea":"8","statement":"console","expression":[{"linea":"8","statement":"nativeArray", "name":"a" ,"hijo":[{"linea":"8","statement":"ArrayList","value":[{"linea":"8","statement":"MatrizPosition","value":[{"linea":"8","tipo":"number", "value":"0"}]}]}],"native":"length"}]},\n' +
    '{"linea":"14","statement":"declaration","type":[{"linea":"9","tipo":[{"linea":"9","tipo":"type"}],"size":[]}], "values":[{"linea":"14","statement":"variable","tipoExpresion":[],"name":"AVLNode","ValExpression":[{"linea":"14","operator":[{"linea":"9","v":"="}],"Expression":[{"linea":"14","statement":"typebody","values":[{"linea":"10","statement":"atributo","name":"left", "tipo":[{"linea":"10","tipo":"AVLNode"}],"valor":[]},\n' +
    '{"linea":"11","statement":"atributo","name":"right", "tipo":[{"linea":"11","tipo":"AVLNode"}],"valor":[]},\n' +
    '{"linea":"12","statement":"atributo","name":"height", "tipo":[{"linea":"12","tipo":"number"}],"valor":[]},\n' +
    '{"linea":"13","statement":"atributo","name":"value", "tipo":[{"linea":"13","tipo":"number"}],"valor":[]}]}]}]}]},\n' +
    '{"linea":"18","statement":"declaration","type":[{"linea":"16","tipo":[{"linea":"16","tipo":"type"}],"size":[]}], "values":[{"linea":"18","statement":"variable","tipoExpresion":[],"name":"AVLTree","ValExpression":[{"linea":"18","operator":[{"linea":"16","v":"="}],"Expression":[{"linea":"18","statement":"typebody","values":[{"linea":"17","statement":"atributo","name":"root", "tipo":[{"linea":"17","tipo":"AVLNode"}],"valor":[]}]}]}]}]},\n' +
    '{"linea":"21","statement":"declaration","type":[{"linea":"19","tipo":[{"linea":"19","tipo":"let"}],"size":[]}], "values":[{"linea":"21","statement":"variable","tipoExpresion":[{"linea":"19","tipo":[{"linea":"19","tipo":"AVLTree"}],"size":[]}],"name":"tree","ValExpression":[{"linea":"21","operator":[{"linea":"19","v":"="}],"Expression":[{"linea":"21","statement":"typebody","values":[{"linea":"20","statement":"atributo","name":"root", "tipo":[],"valor":[{"linea":"20","tipo":"null", "value":"null"}]}]}]}]}]},\n' +
    '{"linea":"22","statement":"declaration","type":[{"linea":"22","tipo":[{"linea":"22","tipo":"let"}],"size":[]}], "values":[{"linea":"22","statement":"variable","tipoExpresion":[],"name":"a1","ValExpression":[{"linea":"22","operator":[{"linea":"22","v":"="}],"Expression":[{"linea":"22","tipo":"number", "value":"5"}]}]}]},\n' +
    '{"linea":"23","statement":"asignation","variable":"a1","params":[],"ValExpression":[{"linea":"23","operator":[{"linea":"23","v":"+="}],"Expression":[{"linea":"23","tipo":"number", "value":"1005"}]}]},\n' +
    '{"linea":"24","statement":"declaration","type":[{"linea":"24","tipo":[{"linea":"24","tipo":"let"}],"size":[]}], "values":[{"linea":"24","statement":"variable","tipoExpresion":[],"name":"b","ValExpression":[{"linea":"24","operator":[{"linea":"24","v":"="}],"Expression":[{"linea":"24","statement":"arreglo","value":[{"linea":"24","tipo":"number", "value":"5"},\n' +
    '{"linea":"24","tipo":"number", "value":"6"}]}]}]}]},\n' +
    '{"linea":"25","statement":"asignation","variable":"b","params":[],"ValExpression":[{"linea":"25","operator":[{"linea":"25","v":"="}],"Expression":[{"linea":"25","statement":"arreglo","value":[{"linea":"25","tipo":"number", "value":"8"},\n' +
    '{"linea":"25","tipo":"number", "value":"9"},\n' +
    '{"linea":"25","tipo":"number", "value":"10"}]}]}]},\n' +
    '{"linea":"29","statement":"declaration","type":[{"linea":"26","tipo":[{"linea":"26","tipo":"type"}],"size":[]}], "values":[{"linea":"29","statement":"variable","tipoExpresion":[],"name":"c","ValExpression":[{"linea":"29","operator":[{"linea":"26","v":"="}],"Expression":[{"linea":"29","statement":"typebody","values":[{"linea":"28","statement":"atributo","name":"root", "tipo":[{"linea":"28","tipo":"number"}],"valor":[]}]}]}]}]},\n' +
    '{"linea":"34","statement":"declaration","type":[{"linea":"31","tipo":[{"linea":"31","tipo":"let"}],"size":[]}], "values":[{"linea":"34","statement":"variable","tipoExpresion":[{"linea":"31","tipo":[{"linea":"31","tipo":"c"}],"size":[]}],"name":"d","ValExpression":[{"linea":"34","operator":[{"linea":"31","v":"="}],"Expression":[{"linea":"34","statement":"typebody","values":[{"linea":"33","statement":"atributo","name":"root", "tipo":[],"valor":[{"linea":"33","tipo":"number", "value":"1509"}]}]}]}]}]},\n' +
    '{"linea":"35","statement":"asignation","variable":"d","params":[{"linea":"35","statement":"Object","value":"root"}],"ValExpression":[{"linea":"35","operator":[{"linea":"35","v":"="}],"Expression":[{"linea":"35","tipo":"number", "value":"1500"}]}]},\n' +
    '{"linea":"36","statement":"console","expression":[{"linea":"36","statement":"variable","value":"a1"}]},\n' +
    '{"linea":"37","statement":"console","expression":[{"linea":"37","statement":"variable","value":"b"}]},\n' +
    '{"linea":"38","statement":"console","expression":[{"linea":"38","statement":"callAtributo", "value":"d", "hijo":[{"linea":"38","statement":"Object","value":"root"}]}]},\n' +
    '{"linea":"39","statement":"declaration","type":[{"linea":"39","tipo":[{"linea":"39","tipo":"let"}],"size":[]}], "values":[{"linea":"39","statement":"variable","tipoExpresion":[],"name":"mensaje","ValExpression":[{"linea":"39","operator":[{"linea":"39","v":"="}],"Expression":[{"linea":"39","tipo":"string3", "value":"hola"}]}]}]},\n' +
    '{"linea":"51","statement":"switch","Expression":[{"linea":"40","statement":"variable","value":"mensaje"}],"values":[{"linea":"44","statement":"case","Expression":[{"linea":"42","tipo":"string3", "value":"hola"}],"body":[{"linea":"43","statement":"console","expression":[{"linea":"43","tipo":"string3", "value":"como estas?"}]},\n' +
    '{"linea":"44","statement":"break"}]},\n' +
    '{"linea":"47","statement":"case","Expression":[{"linea":"45","tipo":"string3", "value":"como estas"}],"body":[{"linea":"46","statement":"console","expression":[{"linea":"46","tipo":"string3", "value":"bien y tu que tal"}]},\n' +
    '{"linea":"47","statement":"break"}]},\n' +
    '{"linea":"50","statement":"default","Expression":[],"body":[{"linea":"49","statement":"console","expression":[{"linea":"49","tipo":"string3", "value":"no reconozco tu mensaje"}]},\n' +
    '{"linea":"50","statement":"break"}]}]},\n' +
    '{"linea":"52","statement":""}]}';
var instrucciones = [];
var tablasimbolo = new tablasimbolos();
var jsondata = '';
var erroresSemanticos = [];
var salida = '';
var lineas = 0;
var ts = '';
var ghs = '';
//generatinginformationExample();
////console.log(instrucciones)
//execute()
//console.log('UNIVERSIDAD DE SAN CARLOS DE GUATEMALA')
////console.log(outs);
function outghs() {
    //console.log('UNIVERSIDAD DE SAN CARLOS DE GUATEMALA')
}
function outlogs() {
    //console.log('UNIVERSIDAD DE SAN CARLOS DE GUATEMALA')
}
function getTs() {
    ts = '{ \"simbolos\":[';
    var m = 0;
    for (var _i = 0, _a = tablasimbolo.simbolos; _i < _a.length; _i++) {
        var simbolo = _a[_i];
        var string = '{';
        string += '\"name\":\"' + simbolo.name + '\",';
        string += '\"ambito\":\"' + simbolo.ambito + '\",';
        string += '\"tipo\":\"' + TypeSym[simbolo.tipo] + '\",';
        string += '\"type\":\"' + TypeValue[simbolo.tipoValue] + '\"';
        string += '}';
        m++;
        if (m < tablasimbolo.simbolos.length)
            string += ',';
        ts += string;
    }
    ts += ']}';
    ////console.log(ts);
}
function execute() {
    tablasimbolo = new tablasimbolos();
    output = [];
    outs = [];
    ghs = '';
    salida = '{\"salida\":[\n';
    if (erroresSemanticos.length == 0) {
        for (var _i = 0, instrucciones_1 = instrucciones; _i < instrucciones_1.length; _i++) {
            var value = instrucciones_1[_i];
            if (value instanceof functions) {
                ////console.log(value);
                value.execute(tablasimbolo);
            }
        }
        //getTs();
        ////console.log(tablasimbolo)
        for (var _a = 0, instrucciones_2 = instrucciones; _a < instrucciones_2.length; _a++) {
            var value = instrucciones_2[_a];
            if (value instanceof statement) {
                if (value instanceof functions) {
                }
                else {
                    var result = value.execute(tablasimbolo);
                    if (result[0] > 0) {
                        if (output.length > 0) {
                            for (var _b = 0, output_1 = output; _b < output_1.length; _b++) {
                                var resultadito = output_1[_b];
                                salida += resultadito + ',\n';
                            }
                            output = [];
                        }
                        /*
                        if(result[1] instanceof Array)
                        {
                            for(let resultadito of result[1])
                            {
                                salida += resultadito+',\n';
                            }
                        }
                        else {
                            if(value.type == TypeStatement.NativeStatement)
                            {
                                salida += result[1]+',\n';
                            }
                        }
                        */
                    }
                    else if (result[0] == 0) {
                        ////console.log("finish without error...");
                    }
                    else {
                        ////console.log(output);
                        for (var _c = 0, output_2 = output; _c < output_2.length; _c++) {
                            var a = output_2[_c];
                            outs.push(a);
                            salida += a + ',\n';
                        }
                        outs.push('Linea: ' + value.linea + ', valor: Ocurrio un error inesperado,' + result[1]);
                        salida += '{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Linea: ' + value.linea + ', ' + result[1] + '\"},\n';
                        ////console.log('finish with error...')
                        break;
                    }
                }
            }
        }
        for (var _d = 0, erroresSemanticos_1 = erroresSemanticos; _d < erroresSemanticos_1.length; _d++) {
            var val = erroresSemanticos_1[_d];
            salida += '{\"valor\":\"El codigo posee errores semanticos\", \"errores\":[' + val + ']}\n';
        }
    }
    else {
        for (var _e = 0, erroresSemanticos_2 = erroresSemanticos; _e < erroresSemanticos_2.length; _e++) {
            var val = erroresSemanticos_2[_e];
            salida += '{\"valor\":\"El codigo posee errores semanticos\", \"errores\":[' + val + ']}\n';
        }
    }
    salida += '{\"linea\":\"' + lineas + '\",\"valor\":\"finish executing...\"}\n]}';
    ////console.log(salida);
}
function generatinginformationExample() {
    erroresSemanticos = [];
    var statement = JSON.parse(jsondata2);
    lineas = Number(statement.linea);
    var S = statement.S;
    for (var _i = 0, S_1 = S; _i < S_1.length; _i++) {
        var statement_1 = S_1[_i];
        var stat = getStatement(statement_1);
        if (stat != null)
            instrucciones.push(stat);
    }
}
function generatinginformation(jsondata) {
    instrucciones = [];
    erroresSemanticos = [];
    salida = '';
    lineas = 0;
    var statement = JSON.parse(jsondata);
    lineas = Number(statement.linea);
    var S = statement.S;
    for (var _i = 0, S_2 = S; _i < S_2.length; _i++) {
        var statement_2 = S_2[_i];
        var stat = getStatement(statement_2);
        if (stat != null)
            instrucciones.push(stat);
    }
}
function getStatement(data) {
    switch (data.statement) {
        case "console":
            var console_1 = consoleStatement(data);
            if (console_1 != null)
                instrucciones.push(console_1);
            break;
        case "graph":
            var graph = grahpStatement(data);
            if (graph != null)
                instrucciones.push(graph);
            break;
        case "declaration":
            var declaration = declarationStatement(data);
            if (declaration != null)
                instrucciones.push(declaration);
            break;
        case "CallFunction":
            return getCallFunction1(data);
        case "asignation":
            return getAsignation(data);
        case "Argument":
            //no usado
            break;
        case "ArrayList":
            return getArrayList(data);
        case "Object":
            return getObject(data);
        case "MatrizPosition":
            return MatrizPosition(data);
        case "variable":
            var variable = getVariable(data);
            if (variable != null)
                instrucciones.push(variable);
            break;
        case "variableArray":
            //no usado
            break;
        case "funcion":
            return getFunction(data);
        case "continue":
            return getContinue();
        case "break":
            return getBreak();
        case "return":
            return getReturn(data);
        case "switch":
            return getSwitch(data);
        case "case":
            return getCases(data);
        case "default":
            return getDefault(data);
        case "if":
            return getIf(data);
        case "dowhile":
            return getDoWhile(data);
        case "for":
            return getFor1(data);
        case "forin":
            return getForIn(data);
        case "while":
            return getWhile(data);
        case "forof":
            return getForOf(data);
        case "parameter":
            return getParameter(data);
        case "array":
            //no usado
            break;
        case "atributo":
            //no usado
            break;
        case "typebody":
            return typeBody(data);
        case "arreglo":
            return getArreglo(data);
        case "callMatriz":
            return callMatriz(data);
        case "callAtributo":
            return callAtributo(data);
        case "callFuncion":
            return getCallFunction(data);
        case "nativeArray":
            return nativeMatriz(data);
        case "postincrement1":
            return getPostIncrement1(data);
        case "postdecrement1":
            return getPostdecrement1(data);
        case "predecrement1":
            return getPredecrement1(data);
        case "preincrement1":
            return getPreIncrement1(data);
        case "positivo":
            var numero1 = new Numbers();
            numero1.value = 1;
            numero1.tipoValue = TypeValue.Number;
            var sum = new ArichmeticExpression();
            sum.type = TypeStatement.ExpresionStatement;
            sum.linea = data.linea;
            sum.Function = ArichmeticExpr.multiplicacion;
            sum.Expression1 = getExpressiones(data.Expression1[0]);
            sum.Expression2 = numero1;
            return sum;
        case "negativo":
            var numero = new Numbers();
            numero.value = -1;
            numero.tipoValue = TypeValue.Number;
            var negar = new ArichmeticExpression();
            negar.type = TypeStatement.ExpresionStatement;
            negar.linea = data.linea;
            negar.Function = ArichmeticExpr.multiplicacion;
            negar.Expression1 = getExpressiones(data.Expression1[0]);
            negar.Expression2 = numero;
            return negar;
        case "logical":
            var not = new LogialExpression();
            not.type = TypeStatement.ExpresionStatement;
            not.linea = data.linea;
            not.Function = LogicalExpr.NOT;
            not.Expression1 = getExpressiones(data.Expression1[0]);
            not.Expression2 = null;
            return not;
        case "Aritmetic":
            return getArichmetic(data);
        case "Relational":
            return getRelational(data);
        case "Logical":
            return getLogical(data);
        case "ternario":
            return getTernario(data);
        default:
            break;
    }
    return null;
}
function getTipo(datas) {
    /*
    "tipoExpresion": [
            {
              "linea": "1",
              "tipo": [
                {
                  "linea": "1",
                  "tipo": "number"
                }
              ],
              "size": [
                {
                  "linea": "1",
                  "statement": "array",
                  "elementos": []
                },
                {
                  "linea": "1",
                  "statement": "array",
                  "elementos": []
                }
              ]
            }
          ]
     */
    try {
        var data = void 0;
        switch (datas[0].tipo[0].tipo) {
            case "string":
                data = TypeValue.String;
                break;
            case "number":
                data = TypeValue.Number;
                break;
            case "boolean":
                data = TypeValue.Boolean;
                break;
            case "void":
                data = TypeValue["void"];
                break;
            case "var":
                data = TypeValue["var"];
                break;
            case "const":
                data = TypeValue["const"];
                break;
            case "type":
                data = TypeValue.type;
                break;
            case "let":
                data = TypeValue.let;
                break;
            default:
                data = TypeValue.Object;
                break;
        }
        var size = Number(datas[0].size.length);
        return [data, size];
    }
    catch (e) {
        return [null, 0];
    }
}
function getDeclarations(data) {
    try {
        var declaras = [];
        var error = 0;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var decla = data_1[_i];
            var declarationes = new declaration0();
            declarationes.linea = Number(decla.linea);
            declarationes.name = decla.name;
            declarationes.type = TypeStatement.DeclarationStatement;
            if (decla.tipoExpresion.length > 0) {
                var resultado = getTipo(decla.tipoExpresion);
                if (resultado[0] == TypeValue.Object) {
                    declarationes.tipo = TypeValue.type;
                    if (decla.ValExpression.length > 0) {
                        var value = getExpressiones(decla.ValExpression[0].Expression[0]);
                        if (value instanceof types) {
                            declarationes.nameType = decla.tipoExpresion[0].tipo[0].tipo;
                            value.name = decla.name;
                            declarationes.Expression = value;
                        }
                    }
                }
                else {
                    declarationes.tipo = resultado[0];
                    if (decla.statement != 'variable')
                        declarationes.tipo = TypeValue.Array;
                    if (decla.ValExpression.length > 0) {
                        var value = getExpressiones(decla.ValExpression[0].Expression[0]);
                        if (value instanceof arrays) {
                            declarationes.Expression = value;
                            declarationes.tipo = TypeValue.Array;
                        }
                        else {
                            declarationes.Expression = value;
                            if (value instanceof Strings || value instanceof Numbers || value instanceof Booleans || value instanceof Nulls) {
                                if (declarationes.tipo == null)
                                    declarationes.tipo = value.tipoValue;
                            }
                            else if (value instanceof types) {
                                declarationes.tipo = TypeValue.type;
                            }
                        }
                    }
                    else {
                        if (decla.statement != 'variable') {
                            var Arreglito = new arrays();
                            Arreglito.tipoValue = TypeValue.Array;
                            Arreglito.values = [];
                            declarationes.Expression = Arreglito;
                        }
                        else {
                            var Nullable = new Nulls();
                            Nullable.tipoValue = TypeValue["null"];
                            declarationes.Expression = Nullable;
                        }
                    }
                }
            }
            else {
                if (decla.ValExpression[0].Expression[0].statement == 'typebody') {
                    declarationes.tipo = TypeValue.type;
                    if (decla.ValExpression.length > 0) {
                        var value = getExpressiones(decla.ValExpression[0].Expression[0]);
                        if (value instanceof types) {
                            value.name = decla.name;
                            declarationes.Expression = value;
                        }
                    }
                }
                else {
                    if (decla.statement != 'variable')
                        declarationes.tipo = TypeValue.Array;
                    if (decla.ValExpression.length > 0) {
                        var value = getExpressiones(decla.ValExpression[0].Expression[0]);
                        if (value instanceof arrays) {
                            declarationes.Expression = value;
                            declarationes.tipo = TypeValue.Array;
                        }
                        else {
                            declarationes.Expression = value;
                            if (value instanceof Strings || value instanceof Numbers || value instanceof Booleans || value instanceof Nulls) {
                                if (declarationes.tipo == null)
                                    declarationes.tipo = value.tipoValue;
                            }
                            else if (value instanceof types) {
                                declarationes.tipo = TypeValue.type;
                            }
                        }
                    }
                    else {
                        if (decla.statement != 'variable') {
                            var Arreglito = new arrays();
                            Arreglito.tipoValue = TypeValue.Array;
                            Arreglito.values = [];
                            declarationes.Expression = Arreglito;
                        }
                        else {
                            var Nullable = new Nulls();
                            Nullable.tipoValue = TypeValue["null"];
                            declarationes.Expression = Nullable;
                        }
                    }
                }
            }
            declaras.push(declarationes);
        }
        if (error == 0)
            return declaras;
        return [];
    }
    catch (e) {
        return [];
    }
}
function getTipo1(datas) {
    /*
    "type": [
        {
          "linea": "1",
          "tipo": [
            {
              "linea": "1",
              "tipo": "type"
            }
          ],
          "size": []
        }
      ],
     */
    try {
        var data = void 0;
        switch (datas[0].tipo[0].tipo) {
            case "string":
                data = TypeValue.String;
                break;
            case "number":
                data = TypeValue.Number;
                break;
            case "boolean":
                data = TypeValue.Boolean;
                break;
            case "void":
                data = TypeValue["void"];
                break;
            case "var":
                data = TypeValue["var"];
                break;
            case "const":
                data = TypeValue["const"];
                break;
            case "type":
                data = TypeValue.type;
                break;
            case "let":
                data = TypeValue.let;
                break;
            default:
                data = TypeValue.Object;
                break;
        }
        var size = Number(datas[0].size.length);
        return [data, size];
    }
    catch (e) {
        return [null, 0];
    }
}
function declarationStatement(data) {
    try {
        var declaration = new declarations();
        declaration.linea = Number(data.linea);
        declaration.type = TypeStatement.DeclarationStatement;
        declaration.Expression = getDeclarations(data.values);
        declaration.tipo = getTipo1(data.type)[0];
        return declaration;
    }
    catch (e) {
        return null;
    }
}
function consoleStatement(data) {
    try {
        var consola = new NativeStatement(TypeStatement.NativeStatement, Native.console);
        consola.Expression = [];
        consola.linea = Number(data.linea);
        for (var _i = 0, _a = data.expression; _i < _a.length; _i++) {
            var datos = _a[_i];
            var val = getExpressiones(datos);
            if (val != null)
                consola.Expression.push(val);
        }
        return consola;
    }
    catch (e) {
        return null;
    }
}
function grahpStatement(data) {
    try {
        var consola = new NativeStatement(TypeStatement.NativeStatement, Native.graph);
        consola.Expression = [];
        consola.linea = Number(data.linea);
        consola.graph = jsondata;
        return consola;
    }
    catch (e) {
        return null;
    }
}
function getVariable(data) {
    try {
        ////console.log(data);
        var variable = new expression();
        variable.type = TypeStatement.ExpresionStatement;
        variable.valueType = TypeValue.Object;
        variable.linea = Number(data.linea);
        variable.name = data.value;
        return variable;
    }
    catch (e) {
        return null;
    }
}
function getExpressiones(data) {
    try {
        if (data.hasOwnProperty("statement")) {
            switch (data.statement) {
                case "console":
                    return consoleStatement(data);
                case "graph":
                    return grahpStatement(data);
                case "declaration":
                    return declarationStatement(data);
                case "CallFunction":
                    return getCallFunction1(data);
                case "asignation":
                    return getAsignation(data);
                case "Argument":
                    //no usado
                    break;
                case "ArrayList":
                    return getArrayList(data);
                case "Object":
                    return getObject(data);
                case "MatrizPosition":
                    return MatrizPosition(data);
                case "variable":
                    return getVariable(data);
                case "variableArray":
                    //no usado
                    break;
                case "funcion":
                    return getFunction(data);
                case "continue":
                    return getContinue();
                case "break":
                    return getBreak();
                case "return":
                    return getReturn(data);
                case "switch":
                    return getSwitch(data);
                case "case":
                    return getCases(data);
                case "typebody":
                    return typeBody(data);
                case "arreglo":
                    return getArreglo(data);
                case "callMatriz":
                    return callMatriz(data);
                case "callAtributo":
                    return callAtributo(data);
                case "callFuncion":
                    return getCallFunction(data);
                case "nativeArray":
                    return nativeMatriz(data);
                case "default":
                    return getDefault(data);
                case "if":
                    return getIf(data);
                case "dowhile":
                    return getDoWhile(data);
                case "for":
                    return getFor1(data);
                case "forin":
                    return getForIn(data);
                case "while":
                    return getWhile(data);
                case "forof":
                    return getForOf(data);
                case "parameter":
                    return getParameter(data);
                case "array":
                    //no usado
                    break;
                case "atributo":
                    // no usado
                    break;
                case "postincrement1":
                    return getPostIncrement1(data);
                case "postdecrement1":
                    return getPostdecrement1(data);
                case "predecrement1":
                    return getPredecrement1(data);
                case "preincrement1":
                    return getPreIncrement1(data);
                case "positivo":
                    var numero1 = new Numbers();
                    numero1.value = 1;
                    numero1.tipoValue = TypeValue.Number;
                    var sum = new ArichmeticExpression();
                    sum.type = TypeStatement.ExpresionStatement;
                    sum.linea = data.linea;
                    sum.Function = ArichmeticExpr.multiplicacion;
                    sum.Expression1 = getExpressiones(data.Expression[0]);
                    sum.Expression2 = numero1;
                    return sum;
                case "negativo":
                    var numero = new Numbers();
                    numero.value = -1;
                    numero.tipoValue = TypeValue.Number;
                    var negar = new ArichmeticExpression();
                    negar.type = TypeStatement.ExpresionStatement;
                    negar.linea = data.linea;
                    negar.Function = ArichmeticExpr.multiplicacion;
                    negar.Expression1 = getExpressiones(data.Expression[0]);
                    negar.Expression2 = numero;
                    return negar;
                case "logical":
                    var not = new LogialExpression();
                    not.type = TypeStatement.ExpresionStatement;
                    not.linea = data.linea;
                    not.Function = LogicalExpr.NOT;
                    not.Expression1 = getExpressiones(data.Expression[0]);
                    not.Expression2 = null;
                    return not;
                case "Aritmetic":
                    return getArichmetic(data);
                case "Relational":
                    return getRelational(data);
                case "Logical":
                    return getLogical(data);
                case "ternario":
                    return getTernario(data);
            }
        }
        else if (data.hasOwnProperty("tipo")) {
            switch (data.tipo) {
                case "null":
                    var nullable = new Nulls();
                    nullable.tipoValue = TypeValue["null"];
                    return nullable;
                case "boolean":
                    var booleano = new Booleans();
                    booleano.tipoValue = TypeValue.Boolean;
                    booleano.type = null;
                    booleano.value = (data.value.toLowerCase() == "true");
                    return booleano;
                case "number":
                    var numeros = new Numbers();
                    numeros.tipoValue = TypeValue.Number;
                    numeros.type = null;
                    numeros.value = Number(data.value);
                    return numeros;
                case "string1":
                    var strings = new Strings();
                    strings.tipoValue = TypeValue.String;
                    strings.type = null;
                    strings.value = data.value.toString();
                    return strings;
                case "string2":
                    var strings2 = new Strings();
                    strings2.tipoValue = TypeValue.String;
                    strings2.type = null;
                    strings2.value = data.value.toString();
                    return strings2;
                case "string3":
                    var strings3 = new Strings();
                    strings3.tipoValue = TypeValue.String;
                    strings3.type = null;
                    strings3.value = data.value.toString();
                    return strings3;
            }
        }
        return null;
    }
    catch (e) {
        return null;
    }
}
function getObject(data) {
    try {
        return data.value.toString();
    }
    catch (e) {
        return null;
    }
}
function getArrayList(data) {
    /*
    "linea": "3",
              "statement": "ArrayList",
              "value": [
                {
                  "linea": "3",
                  "statement": "MatrizPosition",
                  "value": [
                    {
                      "linea": "3",
                      "tipo": "number",
                      "value": "0"
                    }
                  ]
                },
                {
                  "linea": "3",
                  "statement": "MatrizPosition",
                  "value": [
                    {
                      "linea": "3",
                      "tipo": "number",
                      "value": "1"
                    }
                  ]
     */
    try {
        var positions = [];
        var positionsTemp = [];
        for (var _i = 0, _a = data.value; _i < _a.length; _i++) {
            var datas = _a[_i];
            var k = getExpressiones(datas);
            if (k != null)
                positions.push(k);
        }
        for (var a = positions.length - 1; a >= 0; a--) {
            positionsTemp.push(positions[a]);
        }
        return positionsTemp;
    }
    catch (e) {
        return null;
    }
}
function getArichmetic(data) {
    try {
        switch (data.Aritmetic) {
            case '+':
                var suma = new ArichmeticExpression();
                suma.type = TypeStatement.ExpresionStatement;
                suma.linea = data.linea;
                suma.Function = ArichmeticExpr.suma;
                suma.Expression1 = getExpressiones(data.Expression1[0]);
                suma.Expression2 = getExpressiones(data.Expression2[0]);
                return suma;
            case '-':
                var resta = new ArichmeticExpression();
                resta.type = TypeStatement.ExpresionStatement;
                resta.linea = data.linea;
                resta.Function = ArichmeticExpr.resta;
                resta.Expression1 = getExpressiones(data.Expression1[0]);
                resta.Expression2 = getExpressiones(data.Expression2[0]);
                return resta;
            case '*':
                var operate = new ArichmeticExpression();
                operate.type = TypeStatement.ExpresionStatement;
                operate.linea = data.linea;
                operate.Function = ArichmeticExpr.multiplicacion;
                operate.Expression1 = getExpressiones(data.Expression1[0]);
                operate.Expression2 = getExpressiones(data.Expression2[0]);
                return operate;
            case '**':
                var poten = new ArichmeticExpression();
                poten.type = TypeStatement.ExpresionStatement;
                poten.linea = data.linea;
                poten.Function = ArichmeticExpr.potenciacion;
                poten.Expression1 = getExpressiones(data.Expression1[0]);
                poten.Expression2 = getExpressiones(data.Expression2[0]);
                return poten;
            case '/':
                var division = new ArichmeticExpression();
                division.type = TypeStatement.ExpresionStatement;
                division.linea = data.linea;
                division.Function = ArichmeticExpr.division;
                division.Expression1 = getExpressiones(data.Expression1[0]);
                division.Expression2 = getExpressiones(data.Expression2[0]);
                return division;
            case '%':
                var modulo = new ArichmeticExpression();
                modulo.type = TypeStatement.ExpresionStatement;
                modulo.linea = data.linea;
                modulo.Function = ArichmeticExpr.modulo;
                modulo.Expression1 = getExpressiones(data.Expression1[0]);
                modulo.Expression2 = getExpressiones(data.Expression2[0]);
                return modulo;
        }
        return null;
    }
    catch (e) {
        return null;
    }
}
function getLogical(data) {
    try {
        switch (data.Logical) {
            case '&&':
                var suma = new LogialExpression();
                suma.type = TypeStatement.ExpresionStatement;
                suma.linea = data.linea;
                suma.Function = LogicalExpr.Y;
                suma.Expression1 = getExpressiones(data.Expression1[0]);
                suma.Expression2 = getExpressiones(data.Expression2[0]);
                return suma;
            case '||':
                var resta = new LogialExpression();
                resta.type = TypeStatement.ExpresionStatement;
                resta.linea = data.linea;
                resta.Function = LogicalExpr.O;
                resta.Expression1 = getExpressiones(data.Expression1[0]);
                resta.Expression2 = getExpressiones(data.Expression2[0]);
                return resta;
        }
        return null;
    }
    catch (e) {
        return null;
    }
}
function getRelational(data) {
    try {
        switch (data.Relational) {
            case '>=':
                var suma = new RelationalExpression();
                suma.type = TypeStatement.ExpresionStatement;
                suma.linea = data.linea;
                suma.Function = RelationalExpr.MayorQue;
                suma.Expression1 = getExpressiones(data.Expression1[0]);
                suma.Expression2 = getExpressiones(data.Expression2[0]);
                return suma;
            case '<=':
                var resta = new RelationalExpression();
                resta.type = TypeStatement.ExpresionStatement;
                resta.linea = data.linea;
                resta.Function = RelationalExpr.MenorQue;
                resta.Expression1 = getExpressiones(data.Expression1[0]);
                resta.Expression2 = getExpressiones(data.Expression2[0]);
                return resta;
            case '>':
                var operate = new RelationalExpression();
                operate.type = TypeStatement.ExpresionStatement;
                operate.linea = data.linea;
                operate.Function = RelationalExpr.Mayor;
                operate.Expression1 = getExpressiones(data.Expression1[0]);
                operate.Expression2 = getExpressiones(data.Expression2[0]);
                return operate;
            case '<':
                var poten = new RelationalExpression();
                poten.type = TypeStatement.ExpresionStatement;
                poten.linea = data.linea;
                poten.Function = RelationalExpr.Menor;
                poten.Expression1 = getExpressiones(data.Expression1[0]);
                poten.Expression2 = getExpressiones(data.Expression2[0]);
                return poten;
            case '==':
                var division = new RelationalExpression();
                division.type = TypeStatement.ExpresionStatement;
                division.linea = data.linea;
                division.Function = RelationalExpr.Igual;
                division.Expression1 = getExpressiones(data.Expression1[0]);
                division.Expression2 = getExpressiones(data.Expression2[0]);
                return division;
            case '!=':
                var modulo = new RelationalExpression();
                modulo.type = TypeStatement.ExpresionStatement;
                modulo.linea = data.linea;
                modulo.Function = RelationalExpr.NoIgual;
                modulo.Expression1 = getExpressiones(data.Expression1[0]);
                modulo.Expression2 = getExpressiones(data.Expression2[0]);
                return modulo;
        }
        return null;
    }
    catch (e) {
        return null;
    }
}
function getPostIncrement1(data) {
    try {
        var atributos = [];
        var position = [];
        var autoin = new autoincrements();
        autoin.linea = Number(data.linea);
        var newExpr = new expression();
        newExpr.name = data.padre[0].value;
        newExpr.valueType = TypeValue.Object;
        newExpr.linea = Number(data.linea);
        newExpr.type = TypeStatement.ExpresionStatement;
        autoin.name = newExpr;
        autoin.isArr = false;
        autoin.firstArr = false;
        if (data.padre[0].hijo != "") {
            if (data.padre[0].hijo instanceof Array) {
                if (data.padre[0].hijo.length > 0) {
                    if (data.padre[0].hijo[0].statement == 'Object') {
                        autoin.firstArr = false;
                        var state = false;
                        for (var _i = 0, _a = data.padre[0].hijo; _i < _a.length; _i++) {
                            var hijos = _a[_i];
                            if (hijos.statement == 'Object') {
                                atributos.push(hijos.value);
                            }
                            else if (hijos.statement == 'ArrayList') {
                                autoin.isArr = true;
                                for (var _b = 0, _c = hijos.value; _b < _c.length; _b++) {
                                    var hijitos = _c[_b];
                                    if (hijitos.statement == 'MatrizPosition') {
                                        var m = getExpressiones(hijitos.value[0]);
                                        if (m != null)
                                            position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if (state)
                                break;
                        }
                    }
                    else {
                        autoin.isArr = true;
                        autoin.firstArr = true;
                        var state = false;
                        for (var _d = 0, _e = data.padre[0].hijo; _d < _e.length; _d++) {
                            var hijos = _e[_d];
                            if (hijos.statement == 'Object') {
                                atributos.push(hijos.value);
                                break;
                            }
                            else if (hijos.statement == 'ArrayList') {
                                autoin.isArr = true;
                                for (var _f = 0, _g = hijos.value; _f < _g.length; _f++) {
                                    var hijitos = _g[_f];
                                    if (hijitos.statement == 'MatrizPosition') {
                                        var m = getExpressiones(hijitos.value[0]);
                                        if (m != null)
                                            position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if (state)
                                break;
                        }
                    }
                }
            }
        }
        autoin.type = TypeStatement.ExpresionStatement;
        autoin.Assigment = increments.postincrement;
        autoin.atributo = atributos;
        autoin.position = position;
        return autoin;
    }
    catch (e) {
        return null;
    }
}
function getPreIncrement1(data) {
    try {
        var atributos = [];
        var position = [];
        var autoin = new autoincrements();
        autoin.linea = Number(data.linea);
        var newExpr = new expression();
        newExpr.name = data.padre[0].value;
        newExpr.valueType = TypeValue.Object;
        newExpr.linea = Number(data.linea);
        newExpr.type = TypeStatement.ExpresionStatement;
        autoin.name = newExpr;
        autoin.isArr = false;
        autoin.firstArr = false;
        if (data.padre[0].hijo != "") {
            if (data.padre[0].hijo instanceof Array) {
                if (data.padre[0].hijo.length > 0) {
                    if (data.padre[0].hijo[0].statement == 'Object') {
                        autoin.firstArr = false;
                        var state = false;
                        for (var _i = 0, _a = data.padre[0].hijo; _i < _a.length; _i++) {
                            var hijos = _a[_i];
                            if (hijos.statement == 'Object') {
                                atributos.push(hijos.value);
                            }
                            else if (hijos.statement == 'ArrayList') {
                                autoin.isArr = true;
                                for (var _b = 0, _c = hijos.value; _b < _c.length; _b++) {
                                    var hijitos = _c[_b];
                                    if (hijitos.statement == 'MatrizPosition') {
                                        var m = getExpressiones(hijitos.value[0]);
                                        if (m != null)
                                            position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if (state)
                                break;
                        }
                    }
                    else {
                        autoin.isArr = true;
                        autoin.firstArr = true;
                        var state = false;
                        for (var _d = 0, _e = data.padre[0].hijo; _d < _e.length; _d++) {
                            var hijos = _e[_d];
                            if (hijos.statement == 'Object') {
                                atributos.push(hijos.value);
                                break;
                            }
                            else if (hijos.statement == 'ArrayList') {
                                autoin.isArr = true;
                                for (var _f = 0, _g = hijos.value; _f < _g.length; _f++) {
                                    var hijitos = _g[_f];
                                    if (hijitos.statement == 'MatrizPosition') {
                                        var m = getExpressiones(hijitos.value[0]);
                                        if (m != null)
                                            position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if (state)
                                break;
                        }
                    }
                }
            }
        }
        autoin.type = TypeStatement.ExpresionStatement;
        autoin.Assigment = increments.preincreement;
        autoin.atributo = atributos;
        autoin.position = position;
        return autoin;
    }
    catch (e) {
        return null;
    }
}
function getPostdecrement1(data) {
    try {
        var atributos = [];
        var position = [];
        var autoin = new autoincrements();
        autoin.linea = Number(data.linea);
        var newExpr = new expression();
        newExpr.name = data.padre[0].value;
        newExpr.valueType = TypeValue.Object;
        newExpr.linea = Number(data.linea);
        newExpr.type = TypeStatement.ExpresionStatement;
        autoin.name = newExpr;
        autoin.isArr = false;
        autoin.firstArr = false;
        if (data.padre[0].hijo != "") {
            if (data.padre[0].hijo instanceof Array) {
                if (data.padre[0].hijo.length > 0) {
                    if (data.padre[0].hijo[0].statement == 'Object') {
                        autoin.firstArr = false;
                        var state = false;
                        for (var _i = 0, _a = data.padre[0].hijo; _i < _a.length; _i++) {
                            var hijos = _a[_i];
                            if (hijos.statement == 'Object') {
                                atributos.push(hijos.value);
                            }
                            else if (hijos.statement == 'ArrayList') {
                                autoin.isArr = true;
                                for (var _b = 0, _c = hijos.value; _b < _c.length; _b++) {
                                    var hijitos = _c[_b];
                                    if (hijitos.statement == 'MatrizPosition') {
                                        var m = getExpressiones(hijitos.value[0]);
                                        if (m != null)
                                            position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if (state)
                                break;
                        }
                    }
                    else {
                        autoin.isArr = true;
                        autoin.firstArr = true;
                        var state = false;
                        for (var _d = 0, _e = data.padre[0].hijo; _d < _e.length; _d++) {
                            var hijos = _e[_d];
                            if (hijos.statement == 'Object') {
                                atributos.push(hijos.value);
                                break;
                            }
                            else if (hijos.statement == 'ArrayList') {
                                autoin.isArr = true;
                                for (var _f = 0, _g = hijos.value; _f < _g.length; _f++) {
                                    var hijitos = _g[_f];
                                    if (hijitos.statement == 'MatrizPosition') {
                                        var m = getExpressiones(hijitos.value[0]);
                                        if (m != null)
                                            position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if (state)
                                break;
                        }
                    }
                }
            }
        }
        autoin.type = TypeStatement.ExpresionStatement;
        autoin.Assigment = increments.postdecrement;
        autoin.atributo = atributos;
        autoin.position = position;
        return autoin;
    }
    catch (e) {
        return null;
    }
}
function getPredecrement1(data) {
    try {
        var atributos = [];
        var position = [];
        var autoin = new autoincrements();
        autoin.linea = Number(data.linea);
        var newExpr = new expression();
        newExpr.name = data.padre[0].value;
        newExpr.valueType = TypeValue.Object;
        newExpr.linea = Number(data.linea);
        newExpr.type = TypeStatement.ExpresionStatement;
        autoin.name = newExpr;
        autoin.isArr = false;
        autoin.firstArr = false;
        if (data.padre[0].hijo != "") {
            if (data.padre[0].hijo instanceof Array) {
                if (data.padre[0].hijo.length > 0) {
                    if (data.padre[0].hijo[0].statement == 'Object') {
                        autoin.firstArr = false;
                        var state = false;
                        for (var _i = 0, _a = data.padre[0].hijo; _i < _a.length; _i++) {
                            var hijos = _a[_i];
                            if (hijos.statement == 'Object') {
                                atributos.push(hijos.value);
                            }
                            else if (hijos.statement == 'ArrayList') {
                                autoin.isArr = true;
                                for (var _b = 0, _c = hijos.value; _b < _c.length; _b++) {
                                    var hijitos = _c[_b];
                                    if (hijitos.statement == 'MatrizPosition') {
                                        var m = getExpressiones(hijitos.value[0]);
                                        if (m != null)
                                            position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if (state)
                                break;
                        }
                    }
                    else {
                        autoin.isArr = true;
                        autoin.firstArr = true;
                        var state = false;
                        for (var _d = 0, _e = data.padre[0].hijo; _d < _e.length; _d++) {
                            var hijos = _e[_d];
                            if (hijos.statement == 'Object') {
                                atributos.push(hijos.value);
                                break;
                            }
                            else if (hijos.statement == 'ArrayList') {
                                autoin.isArr = true;
                                for (var _f = 0, _g = hijos.value; _f < _g.length; _f++) {
                                    var hijitos = _g[_f];
                                    if (hijitos.statement == 'MatrizPosition') {
                                        var m = getExpressiones(hijitos.value[0]);
                                        if (m != null)
                                            position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if (state)
                                break;
                        }
                    }
                }
            }
        }
        autoin.type = TypeStatement.ExpresionStatement;
        autoin.Assigment = increments.predecrement;
        autoin.atributo = atributos;
        autoin.position = position;
        ////console.log(autoin)
        return autoin;
    }
    catch (e) {
        ////console.log(e);
        return null;
    }
}
function getArreglo(data) {
    /*

    "Expression": [
                {
                  "linea": "2",
                  "statement": "arreglo",
                  "value": [
                    {
                      "linea": "2",
                      "tipo": "number",
                      "value": "5"
                    },
                    {
                      "linea": "2",
                      "tipo": "number",
                      "value": "6"
                    },
                    {
                      "linea": "2",
                      "tipo": "number",
                      "value": "7"
                    },
                    {
                      "linea": "2",
                      "tipo": "number",
                      "value": "8"
                    }
                  ]
                }
              ]
              "Expression": [
                {
                  "linea": "1",
                  "statement": "arreglo",
                  "value": []
                }
              ]
            }
          ]
     */
    try {
        var Arreglito = new arrays();
        Arreglito.values = [];
        Arreglito.tipoValue = TypeValue.Array;
        if (data.value.length > 0) {
            for (var _i = 0, _a = data.value; _i < _a.length; _i++) {
                var datito = _a[_i];
                var datitos = getExpressiones(datito);
                if (datitos != null)
                    Arreglito.values.push(datitos);
            }
        }
        else {
            Arreglito.values = [];
            Arreglito.niu = true;
        }
        return Arreglito;
    }
    catch (e) {
        return null;
    }
}
function callAtributo(data) {
    try {
        if (data.hijo.length > 0) {
            if (data.hijo[0].statement == 'ArrayList') {
                return callMatriz1(data);
            }
            else {
                return callAtributo1(data);
            }
        }
    }
    catch (e) {
        return null;
    }
}
function callAtributo1(data) {
    try {
        /*
        "linea": "16",
          "statement": "callAtributo",
          "value": "tree",
          "hijo": [
            {
              "linea": "16",
              "statement": "Object",
              "value": "root"
            },
            {
              "statement": "Object",
              "value": "left"
            }
          ]
         */
        var mat = new expression();
        mat.linea = data.linea;
        mat.name = data.value;
        mat.position = [];
        mat.atributo = [];
        mat.farray = false;
        if (data.hijo.length > 0) {
            for (var _i = 0, _a = data.hijo; _i < _a.length; _i++) {
                var pos = _a[_i];
                var k = getExpressiones(pos);
                if (k != null) {
                    if (k instanceof Array) {
                        for (var _b = 0, k_1 = k; _b < k_1.length; _b++) {
                            var m = k_1[_b];
                            mat.position.push(m);
                        }
                    }
                    else {
                        mat.atributo.push(k);
                    }
                }
            }
        }
        var positionsTemp = [];
        for (var a = mat.atributo.length - 1; a >= 0; a--) {
            positionsTemp.push(mat.atributo[a]);
        }
        mat.atributo = positionsTemp;
        positionsTemp = [];
        for (var a = mat.position.length - 1; a >= 0; a--) {
            positionsTemp.push(mat.position[a]);
        }
        mat.position = positionsTemp;
        return mat;
    }
    catch (e) {
        return null;
    }
}
function MatrizPosition(data) {
    try {
        /*
        "linea": "3",
                  "statement": "MatrizPosition",
                  "value": [
                    {
                      "linea": "3",
                      "tipo": "number",
                      "value": "0"
                    }
                  ]
         */
        if (data.value.length > 0) {
            return getExpressiones(data.value[0]);
        }
    }
    catch (e) {
        return null;
    }
}
function callMatriz1(data) {
    /*
    "linea": "3",
          "statement": "callAtributo",
          "value": "a",
          "hijo": [
            {
              "linea": "3",
              "statement": "ArrayList",
              "value": [
                {
                  "linea": "3",
                  "statement": "MatrizPosition",
                  "value": [
                    {
                      "linea": "3",
                      "tipo": "number",
                      "value": "0"
                    }
                  ]
                },
                {
                  "linea": "3",
                  "statement": "MatrizPosition",
                  "value": [
                    {
                      "linea": "3",
                      "tipo": "number",
                      "value": "1"
                    }
                  ]
                }
              ]
            }
          ]
     */
    try {
        var mat = new expression();
        mat.linea = data.linea;
        mat.name = data.value;
        mat.position = [];
        mat.atributo = [];
        mat.farray = true;
        if (data.hijo.length > 0) {
            for (var _i = 0, _a = data.hijo; _i < _a.length; _i++) {
                var pos = _a[_i];
                var k = getExpressiones(pos);
                if (k != null) {
                    if (k instanceof Array) {
                        for (var _b = 0, k_2 = k; _b < k_2.length; _b++) {
                            var m = k_2[_b];
                            mat.position.push(m);
                        }
                    }
                    else {
                        mat.atributo.push(k);
                    }
                }
            }
        }
        var positionsTemp = [];
        for (var a = mat.atributo.length - 1; a >= 0; a--) {
            positionsTemp.push(mat.atributo[a]);
        }
        mat.atributo = positionsTemp;
        positionsTemp = [];
        for (var a = mat.position.length - 1; a >= 0; a--) {
            positionsTemp.push(mat.position[a]);
        }
        mat.position = positionsTemp;
        return mat;
    }
    catch (e) {
        return null;
    }
}
function callMatriz(data) {
    /*
    "linea": "1",
          "statement": "callMatriz",
          "name": "a",
          "padre": [],
          "posicion": [
            {
              "linea": "1",
              "tipo": "number",
              "value": "0"
            }
          ]
     */
    try {
        var mat = new expression();
        mat.linea = data.linea;
        if (data.padre.length == 0) {
            mat.name = data.name;
        }
        else {
            mat.Expresion = getExpressiones(data.padre[0]);
        }
        mat.position = [];
        for (var _i = 0, _a = data.posicion; _i < _a.length; _i++) {
            var pos = _a[_i];
            var m = getExpressiones(pos);
            if (m != null)
                mat.position.push(m);
        }
        var positionsTemp = [];
        for (var a = mat.position.length - 1; a >= 0; a--) {
            positionsTemp.push(mat.position[a]);
        }
        mat.position = positionsTemp;
        return mat;
    }
    catch (e) {
        return null;
    }
}
function nativeMatriz(data) {
    /*
    "linea": "2",
          "statement": "nativeArray",
          "name": "a",
          "hijo": [],
          "native": "length"

          "linea": "9",
          "statement": "nativeArray",
          "name": "a",
          "hijo": [
            {
              "linea": "9",
              "statement": "ArrayList",
              "value": [
                {
                  "linea": "9",
                  "statement": "MatrizPosition",
                  "value": [
                    {
                      "linea": "9",
                      "tipo": "number",
                      "value": "0"
                    }
                  ]
                }
              ]
            }
          ],
          "native": "length"
     */
    try {
        ////console.log(data)
        var mat = new expression();
        mat.position = [];
        mat.atributo = [];
        mat.name = data.name;
        mat.linea = data.linea;
        switch (data.native) {
            case "length":
                mat.ArrayType = NativeArray.Length;
                mat.position = [];
                if (data.hijo.length > 0) {
                    if (data.hijo[0].value.length > 0) {
                        for (var _i = 0, _a = data.hijo[0].value; _i < _a.length; _i++) {
                            var positions = _a[_i];
                            var k = getExpressiones(positions);
                            if (k != null)
                                mat.position.push(k);
                        }
                    }
                }
                break;
            case "pop":
                mat.ArrayType = NativeArray.Pop;
                mat.position = [];
                if (data.hijo.length > 0) {
                    if (data.hijo[0].value.length > 0) {
                        for (var _b = 0, _c = data.hijo[0].value; _b < _c.length; _b++) {
                            var positions = _c[_b];
                            var k = getExpressiones(positions);
                            if (k != null)
                                mat.position.push(k);
                        }
                    }
                }
                break;
            case "push":
                mat.ArrayType = NativeArray.Push;
                mat.position = [];
                if (data.hijo.length > 0) {
                    if (data.hijo[0].value.length > 0) {
                        for (var _d = 0, _e = data.hijo[0].value; _d < _e.length; _d++) {
                            var positions = _e[_d];
                            var k = getExpressiones(positions);
                            if (k != null)
                                mat.position.push(k);
                        }
                    }
                }
                mat.Expresion = null;
                if (data.value.length > 0) {
                    mat.Expresion = getExpressiones(data.value[0]);
                }
                break;
        }
        ////console.log(mat);
        return mat;
    }
    catch (e) {
        return null;
    }
}
function typeBody(data) {
    /*
    "linea": "9",
                  "statement": "typebody",
                  "values": [
                    {
                      "linea": "8",
                      "statement": "atributo",
                      "name": "root",
                      "valor": [
                        {
                          "linea": "8",
                          "tipo": "null",
                          "value": "null"
                        }
                      ]
                    }
                  ]
     */
    try {
        var typebo = new types();
        typebo.atributos = [];
        typebo.linea = data.linea;
        typebo.type = TypeStatement.DeclarationStatement;
        typebo.niu = true;
        if (data.values.length > 0) {
            for (var _i = 0, _a = data.values; _i < _a.length; _i++) {
                var datito = _a[_i];
                var k = getAtributo(datito);
                if (k != null)
                    typebo.atributos.push(k);
            }
        }
        return typebo;
    }
    catch (e) {
        return null;
    }
}
function getAtributo(data) {
    try {
        /*
        "linea": "8",
                      "statement": "atributo",
                      "name": "root",
                      "valor": [
                        {
                          "linea": "8",
                          "tipo": "null",
                          "value": "null"
                        }
         */
        ////console.log(data.valor)
        var atr = new atributo();
        atr.name = data.name;
        if (data.tipo.length > 0) {
            atr.tipo = data.tipo[0].tipo;
        }
        else {
            atr.value = getExpressiones(data.valor[0]);
        }
        return atr;
    }
    catch (e) {
        return null;
    }
}
function getTipoAssigment(data) {
    try {
        /*

                      "linea": "2",
                      "v": "+="
         */
        switch (data.v) {
            case "+=":
                return typeAssigment.suma;
            case "-=":
                return typeAssigment.resta;
            case "=":
                return typeAssigment.igual;
            case "*=":
                return typeAssigment.multiplicacion;
            case "/=":
                return typeAssigment.division;
            case "**=":
                return typeAssigment.potencia;
            case "%=":
                return typeAssigment.modulo;
            default:
                return typeAssigment.igual;
        }
    }
    catch (e) {
        return null;
    }
}
function getAsignation(data) {
    try {
        ////console.log(data);
        /*
        "linea": "2",
      "statement": "asignation",
      "variable": "a",
      "params": [],
      "ValExpression": [
        {
          "linea": "2",
          "operator": [
            {
              "linea": "2",
              "v": "+="
            }
          ],
          "Expression": [
            {
              "linea": "2",
              "tipo": "number",
              "value": "1005"
            }
          ]
        }
      ]

            "params": [
                    {
                      "linea": "18",
                      "statement": "ArrayList",
                      "value": [
                        {
                          "linea": "18",
                          "statement": "MatrizPosition",
                          "value": [
                            {
                              "linea": "18",
                              "tipo": "number",
                              "value": "0"
                            }
                          ]
                        }
                      ]
                    }


         */
        var as = new Asignation();
        as.linea = data.linea;
        as.name = data.variable;
        as.atributo = [];
        as.position = [];
        if (data.params.length > 0) {
            if (data.params[0].statement == 'ArrayList')
                as.isArr = true;
            for (var _i = 0, _a = data.params; _i < _a.length; _i++) {
                var params = _a[_i];
                var k = getExpressiones(params);
                if (k != null) {
                    if (k instanceof Array) {
                        for (var _b = 0, k_3 = k; _b < k_3.length; _b++) {
                            var m = k_3[_b];
                            as.position.push(m);
                        }
                    }
                    else {
                        as.atributo.push(k);
                    }
                }
            }
        }
        as.Assigment = getTipoAssigment(data.ValExpression[0].operator[0]);
        as.Expression = getExpressiones(data.ValExpression[0].Expression[0]);
        return as;
    }
    catch (e) {
        return null;
    }
}
function getIf(data) {
    try {
        /*
        "linea": "10",
      "statement": "if",
      "Expression": [
        {
          "linea": "3",
          "statement": "variable",
          "value": "a"
        }
      ],
      "body": [
        {
          "linea": "5",
          "statement": "console",
          "expression": [
            {
              "linea": "5",
              "tipo": "string3",
              "value": "true"
            }
          ]
        }
      ],
      "else": [
        {
          "linea": "9",
          "statement": "console",
          "expression": [
            {
              "linea": "9",
              "tipo": "string3",
              "value": "false"
            }
          ]
        }
      ]
         */
        var ifs = new IfStatement();
        ifs.linea = data.linea;
        var valExpression = getExpressiones(data.Expression[0]);
        if (valExpression != null)
            ifs.ValueExpression = valExpression;
        for (var _i = 0, _a = data.body; _i < _a.length; _i++) {
            var body = _a[_i];
            var k = getExpressiones(body);
            if (k != null)
                ifs.body.push(k);
        }
        for (var _b = 0, _c = data["else"]; _b < _c.length; _b++) {
            var body = _c[_b];
            var k = getExpressiones(body);
            if (k != null)
                ifs.bodyElse.push(k);
        }
        return ifs;
    }
    catch (e) {
        return null;
    }
}
function getTernario(data) {
    try {
        /*
        "linea": "11",
              "statement": "ternario",
              "valueExpression": [
                {
                  "linea": "11",
                  "statement": "Relational",
                  "Relational": "==",
                  "Expression1": [
                    {
                      "linea": "11",
                      "statement": "variable",
                      "value": "a"
                    }
                  ],
                  "Expression2": [
                    {
                      "linea": "11",
                      "tipo": "boolean",
                      "value": "true"
                    }
                  ]
                }
              ],
              "Expression1": [
                {
                  "linea": "11",
                  "tipo": "boolean",
                  "value": "false"
                }
              ],
              "Expression2": [
                {
                  "linea": "11",
                  "tipo": "boolean",
                  "value": "true"
                }
              ]
         */
        var terna = new OperatorTernario();
        terna.ValueExpression = getExpressiones(data.valueExpression[0]);
        terna.Expression1 = getExpressiones(data.Expression1[0]);
        terna.Expression2 = getExpressiones(data.Expression2[0]);
        terna.linea = data.linea;
        if (terna.ValueExpression == null)
            return null;
        return terna;
    }
    catch (e) {
        return null;
    }
}
function getWhile(data) {
    try {
        /*
       "linea": "8",
      "statement": "while",
      "body": [
        {
          "linea": "5",
          "statement": "postincrement1",
          "padre": [
            {
              "linea": "5",
              "statement": "variable",
              "value": "b",
              "hijo": []
            }
          ]
        },
        {
          "linea": "5",
          "statement": ""
        },
        {
          "linea": "6",
          "statement": "console",
          "expression": [
            {
              "linea": "6",
              "tipo": "string3",
              "value": "ciclo "
            },
            {
              "linea": "6",
              "statement": "variable",
              "value": "b"
            }
          ]
        },
        {
          "linea": "7",
          "statement": "if",
          "Expression": [
            {
              "linea": "7",
              "statement": "Relational",
              "Relational": ">",
              "Expression1": [
                {
                  "linea": "7",
                  "statement": "variable",
                  "value": "b"
                }
              ],
              "Expression2": [
                {
                  "linea": "7",
                  "tipo": "number",
                  "value": "5"
                }
              ]
            }
          ],
          "body": [
            {
              "linea": "7",
              "statement": "asignation",
              "variable": "a",
              "params": [],
              "ValExpression": [
                {
                  "linea": "7",
                  "operator": [
                    {
                      "linea": "7",
                      "v": "="
                    }
                  ],
                  "Expression": [
                    {
                      "linea": "7",
                      "tipo": "boolean",
                      "value": "false"
                    }
                  ]
                }
              ]
            }
          ],
          "else": []
        }
      ],
      "Expression": [
        {
          "linea": "3",
          "statement": "variable",
          "value": "a"
        }
      ]
         */
        var whiling = new WhileStatements();
        whiling.linea = data.linea;
        whiling.ValueExpression = getExpressiones(data.Expression[0]);
        for (var _i = 0, _a = data.body; _i < _a.length; _i++) {
            var body = _a[_i];
            var k = getExpressiones(body);
            if (k != null)
                whiling.body.push(k);
        }
        return whiling;
    }
    catch (e) {
        return null;
    }
}
function getInitial(data) {
    /*
    "ExpresionInitial": [
        {
          "linea": "1",
          "statement": "variable",
          "tipoExpresion": [],
          "tipo": [
            {
              "linea": "1",
              "tipo": "let"
            }
          ],
          "name": "a",
          "ValExpression": [
            {
              "linea": "1",
              "operator": [
                {
                  "linea": "1",
                  "v": "="
                }
              ],
              "Expression": [
                {
                  "linea": "1",
                  "tipo": "number",
                  "value": "0"
                }
              ]
            }
          ]
        }
      ]
     */
    try {
        var statements = new declarations();
        statements.linea = data.linea;
        statements.Expression = [];
        var declaration = new declaration0();
        declaration.linea = data.linea;
        declaration.name = data.name;
        declaration.Expression = getExpressiones(data.ValExpression[0].Expression[0]);
        switch (data.tipo[0]) {
            case "string":
                declaration.tipo = TypeValue.String;
                statements.tipo = TypeValue.String;
                break;
            case "number":
                declaration.tipo = TypeValue.Number;
                statements.tipo = TypeValue.Number;
                break;
            case "boolean":
                declaration.tipo = TypeValue.Boolean;
                statements.tipo = TypeValue.Boolean;
                break;
            case "void":
                declaration.tipo = TypeValue["void"];
                statements.tipo = TypeValue["void"];
                break;
            case "var":
                declaration.tipo = TypeValue["var"];
                statements.tipo = TypeValue["var"];
                break;
            case "const":
                declaration.tipo = TypeValue["const"];
                statements.tipo = TypeValue["const"];
                break;
            case "type":
                declaration.tipo = TypeValue.type;
                statements.tipo = TypeValue.type;
                break;
            case "let":
                declaration.tipo = TypeValue.let;
                statements.tipo = TypeValue.let;
                break;
            default:
                declaration.tipo = TypeValue.Object;
                statements.tipo = TypeValue.Object;
                break;
        }
        statements.Expression.push(declaration);
        return statements;
    }
    catch (e) {
        return null;
    }
}
function getFor1(data) {
    try {
        /*
        "linea": "4",
      "statement": "for",
      "ExpresionInitial": [
        {
          "linea": "1",
          "statement": "variable",
          "tipoExpresion": [],
          "tipo": [
            {
              "linea": "1",
              "tipo": "let"
            }
          ],
          "name": "a",
          "ValExpression": [
            {
              "linea": "1",
              "operator": [
                {
                  "linea": "1",
                  "v": "="
                }
              ],
              "Expression": [
                {
                  "linea": "1",
                  "tipo": "number",
                  "value": "0"
                }
              ]
            }
          ]
        }
      ],
      "Expressionvalue": [
        {
          "linea": "1",
          "statement": "Relational",
          "Relational": "<",
          "Expression1": [
            {
              "linea": "1",
              "statement": "variable",
              "value": "a"
            }
          ],
          "Expression2": [
            {
              "linea": "1",
              "tipo": "number",
              "value": "5"
            }
          ]
        }
      ],
      "ExpressionFinal": [
        {
          "linea": "1",
          "statement": "postincrement1",
          "padre": [
            {
              "linea": "1",
              "statement": "variable",
              "value": "a",
              "hijo": []
            }
          ]
        }
      ],
      "body": [
        {
          "linea": "3",
          "statement": "console",
          "expression": [
            {
              "linea": "3",
              "statement": "variable",
              "value": "a"
            }
          ]
        }
      ]
         */
        var foring = new ForStatements1();
        foring.linea = data.linea;
        foring.valueInitial = getInitial(data.ExpresionInitial[0]);
        foring.condicion = getExpressiones(data.Expressionvalue[0]);
        foring.postIterator = getExpressiones(data.ExpressionFinal[0]);
        for (var _i = 0, _a = data.body; _i < _a.length; _i++) {
            var body = _a[_i];
            var k = getExpressiones(body);
            if (k != null)
                foring.body.push(k);
        }
        return foring;
    }
    catch (e) {
        return null;
    }
}
function getForOf(data) {
    try {
        /*
        "linea": "5",
      "statement": "forof",
      "ExpresionInitial": [
        {
          "tipo": [
            {
              "linea": "2",
              "tipo": "let"
            }
          ],
          "name": "b"
        }
      ],
      "Expressionvalue": [
        {
          "linea": "2",
          "statement": "variable",
          "value": "a"
        }
      ],
      "body": [
        {
          "linea": "4",
          "statement": "console",
          "expression": [
            {
              "linea": "4",
              "statement": "variable",
              "value": "b"
            }
          ]
        }
      ]
         */
        var forof = new ForStatements4();
        forof.linea = data.linea;
        forof.type = TypeStatement.IterationStatement;
        forof.identificador = data.ExpresionInitial[0].name;
        forof.Expression = getExpressiones(data.Expressionvalue[0]);
        forof.body = [];
        for (var _i = 0, _a = data.body; _i < _a.length; _i++) {
            var body = _a[_i];
            var k = getExpressiones(body);
            if (k != null)
                forof.body.push(k);
        }
        return forof;
    }
    catch (e) {
        return null;
    }
}
function getForIn(data) {
    try {
        /*
        "linea": "5",
      "statement": "forin",
      "ExpresionInitial": [
        {
          "tipo": [
            {
              "linea": "2",
              "tipo": "let"
            }
          ],
          "name": "pos"
        }
      ],
      "Expressionvalue": [
        {
          "linea": "2",
          "statement": "arreglo",
          "value": [
            {
              "linea": "2",
              "statement": "arreglo",
              "value": [
                {
                  "linea": "2",
                  "tipo": "number",
                  "value": "5"
                },
                {
                  "linea": "2",
                  "tipo": "number",
                  "value": "6"
                }
              ]
            },
            {
              "linea": "2",
              "statement": "arreglo",
              "value": [
                {
                  "linea": "2",
                  "tipo": "number",
                  "value": "7"
                },
                {
                  "linea": "2",
                  "tipo": "number",
                  "value": "8"
                }
              ]
            },
            {
              "linea": "2",
              "statement": "arreglo",
              "value": [
                {
                  "linea": "2",
                  "tipo": "number",
                  "value": "9"
                },
                {
                  "linea": "2",
                  "tipo": "number",
                  "value": "10"
                }
              ]
            }
          ]
        }
      ],
      "body": [
        {
          "linea": "4",
          "statement": "console",
          "expression": [
            {
              "linea": "4",
              "statement": "variable",
              "value": "pos"
            }
          ]
        }
      ]
         */
        var forof = new ForStatements3();
        forof.linea = data.linea;
        forof.type = TypeStatement.IterationStatement;
        forof.identificador = data.ExpresionInitial[0].name;
        forof.Expression = getExpressiones(data.Expressionvalue[0]);
        forof.body = [];
        for (var _i = 0, _a = data.body; _i < _a.length; _i++) {
            var body = _a[_i];
            var k = getExpressiones(body);
            if (k != null)
                forof.body.push(k);
        }
        return forof;
    }
    catch (e) {
        return null;
    }
}
function getDoWhile(data) {
    try {
        /*
        "linea": "6",
      "statement": "dowhile",
      "body": [
        {
          "linea": "4",
          "statement": "console",
          "expression": [
            {
              "linea": "4",
              "statement": "variable",
              "value": "a"
            }
          ]
        },
        {
          "linea": "5",
          "statement": "postincrement1",
          "padre": [
            {
              "linea": "5",
              "statement": "variable",
              "value": "a",
              "hijo": []
            }
          ]
        }
      ],
      "Expression": [
        {
          "linea": "6",
          "statement": "Relational",
          "Relational": "<",
          "Expression1": [
            {
              "linea": "6",
              "statement": "variable",
              "value": "a"
            }
          ],
          "Expression2": [
            {
              "linea": "6",
              "tipo": "number",
              "value": "10"
            }
          ]
        }
      ]
         */
        var doit = new DoWhileStatements();
        doit.linea = data.linea;
        doit.ValueExpression = getExpressiones(data.Expression[0]);
        doit.body = [];
        for (var _i = 0, _a = data.body; _i < _a.length; _i++) {
            var body = _a[_i];
            var k = getExpressiones(body);
            if (k != null)
                doit.body.push(k);
        }
        doit.type = TypeStatement.IterationStatement;
        return doit;
    }
    catch (e) {
        return null;
    }
}
function getSwitch(data) {
    try {
        /*
        "linea": "13",
      "statement": "switch",
      "Expression": [
        {
          "linea": "2",
          "statement": "variable",
          "value": "mensaje"
        }
      ],
      "values": [
        {
          "linea": "6",
          "statement": "case",
          "Expression": [
            {
              "linea": "4",
              "tipo": "string3",
              "value": "hola"
            }
          ],
          "body": [
            {
              "linea": "5",
              "statement": "console",
              "expression": [
                {
                  "linea": "5",
                  "tipo": "string3",
                  "value": "como estas?"
                }
              ]
            },
            {
              "linea": "6",
              "statement": ""
            },
            {
              "linea": "6",
              "statement": ""
            }
          ]
        },
        {
          "linea": "12",
          "statement": "case",
          "Expression": [
            {
              "linea": "7",
              "tipo": "string3",
              "value": "como estas"
            }
          ],
          "body": [
            {
              "linea": "8",
              "statement": "console",
              "expression": [
                {
                  "linea": "8",
                  "tipo": "string3",
                  "value": "bien y tu que tal"
                }
              ]
            },
            {
              "linea": "9",
              "statement": ""
            },
            {
              "linea": "9",
              "statement": ""
            },
            {
              "linea": "10",
              "statement": ""
            },
            {
              "linea": "10",
              "statement": ""
            },
            {
              "linea": "11",
              "statement": "console",
              "expression": [
                {
                  "linea": "11",
                  "tipo": "string3",
                  "value": "no reconozco tu mensaje"
                }
              ]
            },
            {
              "linea": "12",
              "statement": ""
            },
            {
              "linea": "12",
              "statement": ""
            }
          ]
        }
      ]
         */
        var suitch = new SwitchStatement();
        suitch.linea = data.linea;
        suitch.val = getExpressiones(data.Expression[0]);
        for (var _i = 0, _a = data.values; _i < _a.length; _i++) {
            var caso = _a[_i];
            var cas = getExpressiones(caso);
            if (cas != null) {
                if (cas instanceof cases)
                    suitch.cases.push(cas);
                if (cas instanceof defaults)
                    suitch["default"] = cas;
            }
        }
        ////console.log(suitch)
        return suitch;
    }
    catch (e) {
        ////console.log(e)
        return null;
    }
}
function getCases(data) {
    try {
        /*
        "linea": "6",
          "statement": "case",
          "Expression": [
            {
              "linea": "4",
              "tipo": "string3",
              "value": "hola"
            }
          ],
          "body": [
            {
              "linea": "5",
              "statement": "console",
              "expression": [
                {
                  "linea": "5",
                  "tipo": "string3",
                  "value": "como estas?"
                }
              ]
            },
            {
              "linea": "6",
              "statement": ""
            },
            {
              "linea": "6",
              "statement": ""
            }
          ]
        },
         */
        var casesito = new cases();
        casesito.linea = data.linea;
        casesito.ValueExpression = getExpressiones(data.Expression[0]);
        for (var _i = 0, _a = data.body; _i < _a.length; _i++) {
            var body = _a[_i];
            var k = getExpressiones(body);
            if (k != null)
                casesito.body.push(k);
        }
        ////console.log(casesito)
        return casesito;
    }
    catch (e) {
        return null;
    }
}
function getDefault(data) {
    try {
        /*
        "linea": "12",
          "statement": "default",
          "Expression": [],
          "body": [
            {
              "linea": "11",
              "statement": "console",
              "expression": [
                {
                  "linea": "11",
                  "tipo": "string3",
                  "value": "no reconozco tu mensaje"
                }
              ]
            },
            {
              "linea": "12",
              "statement": ""
            },
            {
              "linea": "12",
              "statement": ""
            }
          ]
         */
        var defal = new defaults();
        defal.linea = data.linea;
        defal.body = [];
        for (var _i = 0, _a = data.body; _i < _a.length; _i++) {
            var body = _a[_i];
            var k = getExpressiones(body);
            if (k != null)
                defal.body.push(k);
        }
        ////console.log(defal)
        return defal;
    }
    catch (e) {
        ////console.log(e)
        return null;
    }
}
function getBreak() {
    return new BreakStatements();
}
function getContinue() {
    return new ContinueStatements();
}
function getReturn(data) {
    try {
        /*
        "linea": "3",
          "statement": "return",
          "Expression": [
            {
              "linea": "3",
              "tipo": "string3",
              "value": "hola"
            }
          ]
         */
        var retorno = new ReturnStatements();
        retorno.linea = data.linea;
        if (data.Expression.length > 0) {
            retorno.Expresion = getExpressiones(data.Expression[0]);
        }
        else {
            retorno.Expresion = new Nulls();
        }
        return retorno;
    }
    catch (e) {
        return null;
    }
}
function getCallFunction(data) {
    try {
        /*
        "linea": "11",
                  "statement": "callFuncion",
                  "padre": [
                    {
                      "linea": "11",
                      "statement": "variable",
                      "value": "b"
                    }
                  ],
                  "argumentos": [
                    {
                      "linea": "11",
                      "tipo": "string3",
                      "value": "hola"
                    }
                  ]
         */
        var calling = new expression();
        calling.linea = data.linea;
        calling.name = data.padre[0].value;
        calling.parameters = [];
        calling.isCallFunction = true;
        for (var _i = 0, _a = data.argumentos; _i < _a.length; _i++) {
            var parametro = _a[_i];
            var k = getExpressiones(parametro);
            if (k != null)
                calling.parameters.push(k);
        }
        return calling;
    }
    catch (e) {
        ////console.log(e);
        return null;
    }
}
function getCallFunction1(data) {
    try {
        /*
        "linea": "194",
      "statement": "CallFunction",
      "name": "sumarFilas",
      "parameters": [
        {
          "linea": "194",
          "statement": "variable",
          "value": "matrixA"
        }
      ]
         */
        var calling = new expression();
        calling.linea = data.linea;
        calling.name = data.name;
        calling.parameters = [];
        calling.isCallFunction = true;
        for (var _i = 0, _a = data.parameters; _i < _a.length; _i++) {
            var parametro = _a[_i];
            var k = getExpressiones(parametro);
            if (k != null)
                calling.parameters.push(k);
        }
        return calling;
    }
    catch (e) {
        ////console.log(e);
        return null;
    }
}
function getFunction(data) {
    try {
        /*
        "linea": "8",
      "statement": "funcion",
      "name": "b",
      "type": [],
      "params": [
        {
          "linea": "5",
          "statement": "parameter",
          "name": "mensaje",
          "tipo": [
            {
              "linea": "5",
              "tipo": [
                {
                  "linea": "5",
                  "tipo": "string"
                }
              ],
              "size": []
            }
          ]
        }
      ],
      "body": [
        {
          "linea": "7",
          "statement": "return",
          "Expression": [
            {
              "linea": "7",
              "statement": "Aritmetic",
              "Aritmetic": "+",
              "Expression1": [
                {
                  "linea": "7",
                  "tipo": "string3",
                  "value": "mms "
                }
              ],
              "Expression2": [
                {
                  "linea": "7",
                  "statement": "variable",
                  "value": "mensaje"
                }
              ]
            }
          ]
        }
      ]
         */
        var func = new functions();
        func.linea = data.linea;
        func.name = data.name;
        if (data.type.length > 0) {
            func.tipo = getTypeF(data.type[0]);
        }
        func.tipo = TypeValue.Object;
        func.type = TypeStatement.FunctionStatement;
        for (var _i = 0, _a = data.params; _i < _a.length; _i++) {
            var parametro = _a[_i];
            var k = getExpressiones(parametro);
            if (k != null)
                func.Parameters.push(k);
        }
        for (var _b = 0, _c = data.body; _b < _c.length; _b++) {
            var body = _c[_b];
            var k = getExpressiones(body);
            if (k != null)
                func.body.push(k);
        }
        return func;
    }
    catch (e) {
        ////console.log(e);
        return null;
    }
}
function getTypeF(data) {
    /*
    "type": [
        {
          "linea": "1",
          "tipo": [
            {
              "linea": "1",
              "tipo": "string"
            }
          ],
          "size": []
        }
      ],
     */
    if (data.size.length > 0)
        return TypeValue.Array;
    switch (data.tipo[0].tipo) {
        case "string":
            return TypeValue.String;
        case "number":
            return TypeValue.Number;
        case "boolean":
            return TypeValue.Boolean;
        case "void":
            return TypeValue["void"];
        default:
            return TypeValue.Object;
    }
}
function getParameter(data) {
    try {
        /*
        "linea": "5",
          "statement": "parameter",
          "name": "mensaje",
          "tipo": [
            {
              "linea": "5",
              "tipo": [
                {
                  "linea": "5",
                  "tipo": "string"
                }
              ],
              "size": []
            }
          ]
         */
        var parametrito = new Parameter();
        parametrito.linea = data.linea;
        parametrito.name = data.name;
        parametrito.tipo = getTypeF(data.tipo[0]);
        return parametrito;
    }
    catch (e) {
        return null;
    }
}
