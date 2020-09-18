/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
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
var tablasimbolos = /** @class */ (function () {
    function tablasimbolos(tabla) {
        if (tabla == undefined) {
            this.simbolos = [];
            this.ambitoLevel = 0;
        }
        else {
            if (tabla instanceof tablasimbolos) {
                this.ambitoLevel = tabla.ambitoLevel + 1;
                this.simbolos = [];
                this.simbolos.push(tabla.simbolos);
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
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    tablasimbolos.prototype.update = function (name, new_value, atributo, posicion) {
        try {
            for (var _i = 0, _a = this.simbolos; _i < _a.length; _i++) {
                var simbolo = _a[_i];
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
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    //metodo el cual a diferencia de otros al no tener una ejecucion correcta devuelve null
    tablasimbolos.prototype.get = function (name, atributo, posicion) {
        try {
            for (var _i = 0, _a = this.simbolos; _i < _a.length; _i++) {
                var simbolo = _a[_i];
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
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    tablasimbolos.prototype.getsym = function (name) {
        for (var _i = 0, _a = this.simbolos; _i < _a.length; _i++) {
            var simbolo = _a[_i];
            if (simbolo instanceof sym) {
                if (simbolo.name == name) {
                    return [1, simbolo];
                }
            }
        }
        return [-1, null];
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
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
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
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    tablasimbolos.prototype.insert = function (name, value, tipo, tipovalue) {
        try {
            var state = false;
            for (var _i = 0, _a = this.simbolos; _i < _a.length; _i++) {
                var simbolo = _a[_i];
                if (simbolo instanceof sym) {
                    if (simbolo.name == name) {
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
            return [-2, null];
        }
        catch (e) {
            return [-1, null];
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
        if (atributo != undefined && position == undefined) {
            var valor = this.value;
            valor.setValueAtributo(atributo, new_value);
            this.value = valor;
        }
        else if (atributo == undefined && position != undefined) {
            var valor = this.value;
            valor.setValue(position, new_value);
            this.value = valor;
        }
        else {
            this.value = new_value;
            return [1, null];
        }
    };
    sym.prototype.getValue = function () {
        return this.value;
    };
    return sym;
}());
// @ts-ignore
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
var arrays = /** @class */ (function (_super) {
    __extends(arrays, _super);
    function arrays() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    arrays.prototype.execute = function () {
        return [1, this];
    };
    arrays.prototype.getValue = function (position, tablasimbolo) {
        try {
            var a = position.pop();
            var result = a.execute(tablasimbolo);
            if (result[0] > 0) {
                if (position.length > 0) {
                    return this.getValorA(position, this.values[result[1]], tablasimbolo);
                }
                else {
                    return [1, result[1]];
                }
            }
        }
        catch (e) {
            return [-1, null];
        }
    };
    arrays.prototype.getValorA = function (position, objeto, tablasimbolo) {
        try {
            var a = position.pop();
            var result = a.execute(tablasimbolo);
            if (result[0] > 0) {
                if (position.length > 0) {
                    return this.getValorA(position, objeto[result[1]], tablasimbolo);
                }
                else {
                    return [1, result[1]];
                }
            }
        }
        catch (e) {
            return [-1, null];
        }
    };
    arrays.prototype.getAll = function () {
        return this.values;
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
        return [-1, null];
    };
    arrays.prototype.setValue = function (tablasimbolo, position, value) {
        try {
            if (position instanceof Array) {
                if (value == null) {
                    var a = position.pop();
                    var result = a.execute(tablasimbolo);
                    if (result[0] > 0) {
                        if (position.length > 0) {
                            var tt = this.setValorA(tablasimbolo, this.values[result[1]], position, null);
                            if (tt[0] > 0) {
                                this.values[result[1]] = tt[1];
                                return [1, null];
                            }
                            else {
                                return [-1, null];
                            }
                        }
                        else {
                            this.values[result[1]] = this.val;
                            return [1, null];
                        }
                    }
                    else {
                        return [-1, null];
                    }
                }
                else {
                    if (value instanceof statement) {
                        var vals = value.execute(tablasimbolo);
                        if (vals[0] > 0) {
                            var a = position.pop();
                            var result = a.execute(tablasimbolo);
                            if (result[0] > 0) {
                                if (position.length > 0) {
                                    var tt = this.setValorA(tablasimbolo, this.values[result[1]], position, vals[1]);
                                    if (tt[0] > 0) {
                                        this.values[result[1]] = tt[1];
                                        return [1, null];
                                    }
                                    else {
                                        return [-1, null];
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
                            return [-1, null];
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
    arrays.prototype.setValorA = function (tablasimbolo, objeto, position, value) {
        try {
            if (objeto.length != undefined) {
                var vals = value.execute(tablasimbolo);
                if (vals[0] > 0) {
                    var a = position.pop();
                    var result = a.execute(tablasimbolo);
                    if (result[0] > 0) {
                        if (position.length > 0) {
                            var tt = this.setValorA(tablasimbolo, objeto[result[1]], position, vals[1]);
                            if (tt[0] > 0) {
                                objeto[result[1]] = tt[1];
                                return [1, objeto];
                            }
                            else {
                                return [-1, null];
                            }
                        }
                        else {
                            objeto[result[1]] == vals[1];
                            return [1, objeto];
                        }
                    }
                    else {
                        return [-1, null];
                    }
                }
                else {
                    return [-1, null];
                }
            }
            else {
                return [-1, null];
            }
        }
        catch (e) {
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
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    arrays.prototype.grahp = function () {
        return "";
    };
    arrays.prototype.traduction = function () {
        return "";
    };
    arrays.prototype.push = function (value) {
        try {
            this.values.push(value);
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
            if (this.atributo.length > 0 && this.position.length > 0) {
                var value = this.Expression.execute(tablasimbolo);
                if (value[0] == 1) {
                    if (this.isArr) {
                        //array with type in object
                        var simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0) {
                            var simbolito = simbolo[1];
                            if (simbolito.getValue() instanceof arrays) {
                                var arrs = simbolito.getValue();
                                var result = this.operateArrAtr(arrs, tablasimbolo, this.position, this.atributo, value[1]);
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
                                var result = this.operateAtrArr(arrs, tablasimbolo, this.atributo, this.position, value[1]);
                                if (result[0] > 0) {
                                    return tablasimbolo.update(this.name, result[1]);
                                }
                            }
                        }
                    }
                }
            }
            else if (this.atributo.length > 0) {
                var value = this.Expression.execute(tablasimbolo);
                if (value[0] == 1) {
                    var value_1 = this.Expression.execute(tablasimbolo);
                    if (value_1[0] == 1) {
                        var simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0) {
                            var simbolito = simbolo[1];
                            if (simbolito.getValue() instanceof types) {
                                var atr = simbolito.getValue();
                                var val = this.operateAtr(atr, tablasimbolo, this.atributo, value_1[1]);
                                if (val[0] > 0) {
                                    return tablasimbolo.update(this.name, atr);
                                }
                            }
                        }
                    }
                }
            }
            else if (this.position.length > 0) {
                var value = this.Expression.execute(tablasimbolo);
                if (value[0] == 1) {
                    var value_2 = this.Expression.execute(tablasimbolo);
                    if (value_2[0] == 1) {
                        var simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0) {
                            var simbolito = simbolo[1];
                            if (simbolito.getValue() instanceof arrays) {
                                var arrs = simbolito.getValue();
                                return arrs.setValue(tablasimbolo, this.position, value_2[1]);
                            }
                        }
                    }
                }
            }
            else {
                var value = this.Expression.execute(tablasimbolo);
                if (value[0] == 1) {
                    switch (this.Assigment) {
                        case typeAssigment.division:
                            var oldvalue5 = tablasimbolo.get(this.name);
                            if (oldvalue5 != null) {
                                var newvalue5 = new ArichmeticExpression();
                                newvalue5.Expression1 = oldvalue5;
                                newvalue5.Expression2 = value[1];
                                newvalue5.Function = ArichmeticExpr.division;
                                newvalue5.linea = this.linea;
                                var val5 = newvalue5.execute(tablasimbolo);
                                if (val5[0] != -1) {
                                    var result5 = tablasimbolo.update(this.name, val5[1]);
                                    if (result5 == 1)
                                        return [1, null];
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            }
                            else {
                                return [-2, null];
                            }
                        case typeAssigment.igual:
                            var val0 = this.Expression.execute(tablasimbolo);
                            if (val0[0] != -1) {
                                var result0 = tablasimbolo.update(this.name, val0[1]);
                                if (result0 == 1)
                                    return [1, null];
                                return [-1, null];
                            }
                            else {
                                return [-1, null];
                            }
                        case typeAssigment.modulo:
                            var oldvalue4 = tablasimbolo.get(this.name);
                            if (oldvalue4 != null) {
                                var newvalue4 = new ArichmeticExpression();
                                newvalue4.Expression1 = oldvalue4;
                                newvalue4.Expression2 = value[1];
                                newvalue4.Function = ArichmeticExpr.modulo;
                                newvalue4.linea = this.linea;
                                var val4 = newvalue4.execute(tablasimbolo);
                                if (val4[0] != -1) {
                                    var result4 = tablasimbolo.update(this.name, val4[1]);
                                    if (result4 == 1)
                                        return [1, null];
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            }
                            else {
                                return [-2, null];
                            }
                        case typeAssigment.multiplicacion:
                            var oldvalue3 = tablasimbolo.get(this.name);
                            if (oldvalue3 != null) {
                                var newvalue3 = new ArichmeticExpression();
                                newvalue3.Expression1 = oldvalue3;
                                newvalue3.Expression2 = value[1];
                                newvalue3.Function = ArichmeticExpr.multiplicacion;
                                newvalue3.linea = this.linea;
                                var val3 = newvalue3.execute(tablasimbolo);
                                if (val3[0] != -1) {
                                    var result3 = tablasimbolo.update(this.name, val3[1]);
                                    if (result3 == 1)
                                        return [1, null];
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            }
                            else {
                                return [-2, null];
                            }
                        case typeAssigment.potencia:
                            var oldvalue2 = tablasimbolo.get(this.name);
                            if (oldvalue2 != null) {
                                var newvalue2 = new ArichmeticExpression();
                                newvalue2.Expression1 = oldvalue2;
                                newvalue2.Expression2 = value[1];
                                newvalue2.Function = ArichmeticExpr.potenciacion;
                                newvalue2.linea = this.linea;
                                var val2 = newvalue2.execute(tablasimbolo);
                                if (val2[0] != -1) {
                                    var result2 = tablasimbolo.update(this.name, val2[1]);
                                    if (result2 == 1)
                                        return [1, null];
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            }
                            else {
                                return [-2, null];
                            }
                        case typeAssigment.resta:
                            var oldvalue1 = tablasimbolo.get(this.name);
                            if (oldvalue1 != null) {
                                var newvalue1 = new ArichmeticExpression();
                                newvalue1.Expression1 = oldvalue1;
                                newvalue1.Expression2 = value[1];
                                newvalue1.Function = ArichmeticExpr.resta;
                                newvalue1.linea = this.linea;
                                var val1 = newvalue1.execute(tablasimbolo);
                                if (val1[0] != -1) {
                                    var result1 = tablasimbolo.update(this.name, val1[1]);
                                    if (result1 == 1)
                                        return [1, null];
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            }
                            else {
                                return [-2, null];
                            }
                        case typeAssigment.suma:
                            var oldvalue = tablasimbolo.get(this.name);
                            if (oldvalue != null) {
                                var newvalue = new ArichmeticExpression();
                                newvalue.Expression1 = oldvalue;
                                newvalue.Expression2 = value[1];
                                newvalue.Function = ArichmeticExpr.suma;
                                newvalue.linea = this.linea;
                                var val = newvalue.execute(tablasimbolo);
                                if (val[0] != -1) {
                                    var result = tablasimbolo.update(this.name, val[1]);
                                    if (result == 1)
                                        return [1, null];
                                    return [-1, null];
                                }
                                else {
                                    return [-1, null];
                                }
                            }
                            else {
                                return [-2, null];
                            }
                    }
                }
            }
            return [-1, null];
        }
        catch (e) {
            return [-2, null];
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
            return [-1, null];
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
            return [-1, null];
        }
    };
    Asignation.prototype.operateAtr = function (objeto, tablasimbolo, atributos, value) {
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
                var atratr = objeto.setValueAtributo(atr, value);
                if (atratr[0] > 0) {
                    return [1, objeto];
                }
            }
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
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
            return [-1, null];
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
///<reference path="Statements.ts"/>
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var IfStatement = /** @class */ (function (_super) {
    __extends(IfStatement, _super);
    function IfStatement(Val, cuerpo, cuerpo2) {
        var _this = _super.call(this) || this;
        _this.body = cuerpo;
        _this.ValueExpression = Val;
        _this.bodyElse = cuerpo2;
        return _this;
    }
    IfStatement.prototype.execute = function (tablasimbolo) {
        var valInitial = this.ValueExpression.execute(tablasimbolo);
        if (valInitial[0] < 0)
            return [-1, null];
        if (valInitial[1]) {
            for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                var statement0 = _a[_i];
                var value = statement0.execute(tablasimbolo);
                switch (value[0]) {
                    case -2: //-> error instanciar variable
                        return [-2, null];
                    case -1: //-> error
                        return [-1, null];
                    case 0: //-> finalizado
                        this.StateCode = 0;
                        this.value = value[1];
                        break;
                    case 1: //-> sin errores
                        this.StateCode = 1;
                        this.value = value[1];
                        break;
                    case 2: //-> sin errores, break
                        return [2, null];
                    case 3: //-> sin errores, continue
                        return [3, null];
                    case 4: //-> sin errores, return
                        return [4, value[1]];
                }
            }
        }
        else {
            if (this.bodyElse != undefined) {
                for (var _b = 0, _c = this.bodyElse; _b < _c.length; _b++) {
                    var statement0 = _c[_b];
                    var value = statement0.execute(tablasimbolo);
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return [-2, null];
                        case -1: //-> error
                            return [-1, null];
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            this.value = value[1];
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            this.value = value[1];
                            break;
                        case 2: //-> sin errores, break
                            return [2, null];
                        case 3: //-> sin errores, continue
                            return [3, null];
                        case 4: //-> sin errores, return
                            return [4, value[1]];
                    }
                }
            }
        }
        return [this.StateCode, this.value];
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
    function OperatorTernario(Val, cuerpo1, cuerpo2) {
        var _this = _super.call(this) || this;
        _this.Expression1 = cuerpo1;
        _this.Expression2 = cuerpo2;
        _this.ValueExpression = Val;
        return _this;
    }
    OperatorTernario.prototype.execute = function (tablasimbolo) {
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
        _this.atributo = [];
        _this.position = [];
        _this.name = "";
        _this.ArrayType = null;
        _this.isCallFunction = false;
        _this.parameters = [];
        return _this;
    }
    expression.prototype.getValueAtributo = function (tablasimbolo) {
        //get all atributes
        try {
            if (this.atributo.length > 0) {
                if (name != "") {
                    var simbolo = tablasimbolo.getsym(this.name);
                    if (simbolo[0] > 0) {
                        if (simbolo[1] instanceof sym) {
                            var simbolito1 = simbolo[1];
                            if (simbolito1.getValue() instanceof types) {
                                var valors = simbolito1.getValue();
                                var val = valors.getValuesAtributo(this.atributo, tablasimbolo);
                                if (val[0] > 0) {
                                    return val[1];
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
    expression.prototype.getValuesArray = function (tablasimbolo) {
        //get all values array
        try {
            if (name != "") {
                var simbolo = tablasimbolo.getsym(this.name);
                if (simbolo[0] > 0) {
                    if (simbolo[1] instanceof sym) {
                        var simbolito1 = simbolo[1];
                        if (simbolito1.getValue() instanceof arrays) {
                            var valors = simbolito1.getValue();
                            if (this.position.length > 0) {
                                var val = valors.getValue(this.position, tablasimbolo);
                                if (val[0] > 0) {
                                    return val[1];
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
                    var valors = this.Expresion;
                    var val = valors.getValue(this.position, tablasimbolo);
                    if (val[0] > 0) {
                        return val[1];
                    }
                }
                else {
                    var valors = this.Expresion;
                    return valors.getAll();
                }
            }
            return null;
        }
        catch (e) {
            return null;
        }
    };
    expression.prototype.getValueCallFunction = function (tablasimbolo) {
        try {
            var val = tablasimbolo.getsym(this.name);
            if (val[0] > 0) {
                var func = val[1];
                var funcion = func.value;
                var res = funcion.executeV(tablasimbolo, this.parameters);
                if (res[0] > 0) {
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
        try {
            if (this.ArrayType != null) {
                switch (this.ArrayType) {
                    case NativeArray.Length:
                        var simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0) {
                            if (simbolo[1] instanceof sym) {
                                var simbolito1 = simbolo[1];
                                if (simbolito1.getValue() instanceof arrays) {
                                    var valors = simbolito1.getValue();
                                    if (this.position.length > 0) {
                                        var val1 = valors.getValue(this.position, tablasimbolo);
                                        if (val1[0] > 0) {
                                            if (val1[1] instanceof arrays) {
                                                var retorno = val1[1];
                                                return retorno.length();
                                            }
                                        }
                                    }
                                    else {
                                        return valors.length();
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
                                        var val1 = valors.getValue(this.position, tablasimbolo);
                                        if (val1[0] > 0) {
                                            if (val1[1] instanceof arrays) {
                                                var retorno = val1[1];
                                                var retorno1 = retorno.pop();
                                                if (retorno1[0] > 0) {
                                                    return retorno1[1];
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        var retorno = valors.pop();
                                        if (retorno[0] > 0) {
                                            return retorno[1];
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case NativeArray.Push:
                        var value = this.Expresion.execute(tablasimbolo);
                        if (value[0] > 0) {
                            var simbolo2 = tablasimbolo.getsym(this.name);
                            if (simbolo2[0] > 0) {
                                if (simbolo2[1] instanceof sym) {
                                    var simbolito1 = simbolo2[1];
                                    if (simbolito1.getValue() instanceof arrays) {
                                        var valors = simbolito1.getValue();
                                        if (this.position.length > 0) {
                                            var val1 = valors.getValue(this.position, tablasimbolo);
                                            if (val1[0] > 0) {
                                                if (val1[1] instanceof arrays) {
                                                    var retorno = val1[1];
                                                    var bb = retorno.push(value[1]);
                                                    if (bb[0] > 0) {
                                                        return retorno.length();
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            var bb = valors.push(value[1]);
                                            if (bb[0] > 0) {
                                                return valors.length();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                }
            }
            else if (this.atributo.length > 0) {
                return this.getValueAtributo(tablasimbolo);
            }
            else if (this.position.length > 0) {
                return this.getValuesArray(tablasimbolo);
            }
            else if (name != "") {
                if (this.isCallFunction) {
                    return this.getValueCallFunction(tablasimbolo);
                }
                else {
                    var simbolo = tablasimbolo.getsym(this.name);
                    if (simbolo[0] > 0) {
                        if (simbolo[1] instanceof sym) {
                            var simbolito1 = simbolo[1];
                            return simbolito1.getValue();
                        }
                    }
                }
            }
            else {
                switch (this.valueType) {
                    case TypeValue["null"]:
                        return "__jw__";
                    case TypeValue.Array:
                        if (this.Expresion instanceof arrays) {
                            return this.Expresion.getAll();
                        }
                        break;
                    case TypeValue.Boolean:
                        if (this.Expresion instanceof Booleans) {
                            return this.Expresion.getValue();
                        }
                        break;
                    case TypeValue["const"]:
                        return this.Expresion.execute(tablasimbolo);
                    case TypeValue.let:
                        return this.Expresion.execute(tablasimbolo);
                    case TypeValue.Number:
                        if (this.Expresion instanceof Numbers) {
                            return this.Expresion.getValue();
                        }
                        break;
                    case TypeValue.Object:
                        return this.Expresion.execute(tablasimbolo);
                    case TypeValue.String:
                        if (this.Expresion instanceof Strings) {
                            return this.Expresion.getValue();
                        }
                        break;
                    case TypeValue.type:
                        if (this.Expresion instanceof types) {
                            return this.Expresion;
                        }
                        break;
                    case TypeValue["var"]:
                        if (name != "") {
                            var simbolo = tablasimbolo.getsym(this.name);
                            if (simbolo[0] > 0) {
                                if (simbolo[1] instanceof sym) {
                                    var simbolito1 = simbolo[1];
                                    return simbolito1.getValue();
                                }
                            }
                        }
                        break;
                    case TypeValue["void"]:
                        return '__jw__';
                }
            }
            return null;
        }
        catch (e) {
            return null;
        }
    };
    expression.prototype.execute = function (tablasimbolo) {
        //get all data from all version of types
        var data = this.getValue(tablasimbolo);
        if (data != null) {
            if (data == '__jw__')
                return [1, null];
            return [1, data];
        }
        return [-1, null];
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
            if (izq[0] == 1 && der[0] == 1) {
                switch (this.Function) {
                    case ArichmeticExpr.suma:
                        this.value = izq[1] + der[1];
                        this.StateCode = 1;
                        break;
                    case ArichmeticExpr.resta:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof Boolean) {
                            this.value = izq[1] - der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.potenciacion:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof Boolean) {
                            this.value = izq[1] ^ der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.multiplicacion:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof Boolean) {
                            this.value = izq[1] * der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.modulo:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof Boolean) {
                            this.value = izq[1] % der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.negacion:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean) {
                            this.value = -izq[1].toString();
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.division:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof Boolean) {
                            if (der[1] != 0) {
                                this.value = izq[1] / der[1];
                                this.StateCode = 1;
                            }
                            else {
                                this.value = izq[1] / der[1];
                                this.StateCode = -1;
                            }
                        }
                        break;
                }
            }
            return [this.StateCode, this.value];
        }
        catch (e) {
            return [this.StateCode, this.value];
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
            var izq = (this.Expression1 != null) ? this.Expression1.execute(tablasimbolo) : [-1, null];
            var der = (this.Expression2 != null) ? this.Expression2.execute(tablasimbolo) : [-1, null];
            if (izq[0] == 1 && der[0] == 1) {
                switch (this.Function) {
                    case LogicalExpr.Y:
                        if (izq[1] instanceof Boolean && der[1] instanceof Boolean) {
                            this.value = izq[1] && der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case LogicalExpr.O:
                        if (izq[1] instanceof Boolean && der[1] instanceof Boolean) {
                            this.value = izq[1] || der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case LogicalExpr.NOT:
                        if (izq[1] instanceof Boolean) {
                            this.value = !izq[1];
                            this.StateCode = 1;
                        }
                        break;
                }
            }
            else if (izq[0] == 1) {
                switch (this.Function) {
                    case LogicalExpr.NOT:
                        if (izq[1] instanceof Boolean) {
                            this.value = !izq[1];
                            this.StateCode = 1;
                        }
                        break;
                }
            }
            return [this.StateCode, this.value];
        }
        catch (e) {
            return [this.StateCode, this.value];
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
            if (izq[0] == 1 && der[0] == 1) {
                switch (this.Function) {
                    case RelationalExpr.Igual:
                        this.value = izq[1] == der[1];
                        this.StateCode = 1;
                        break;
                    case RelationalExpr.Mayor:
                        this.value = izq[1] > der[1];
                        this.StateCode = 1;
                        break;
                    case RelationalExpr.MayorQue:
                        this.value = izq[1] >= der[1];
                        this.StateCode = 1;
                        break;
                    case RelationalExpr.Menor:
                        this.value = izq[1] < der[1];
                        this.StateCode = 1;
                        break;
                    case RelationalExpr.MenorQue:
                        this.value = izq[1] <= der[1];
                        this.StateCode = 1;
                        break;
                    case RelationalExpr.NoIgual:
                        this.value = izq[1] != der[1];
                        this.StateCode = 1;
                        break;
                }
            }
            return [this.StateCode, this.value];
        }
        catch (e) {
            return [this.StateCode, this.value];
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
///<reference path="Statements.ts"/>
///<reference path="Expression.ts"/>
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
        return _this;
    }
    functions.prototype.execute = function (tablasimbolo) {
        return tablasimbolo.insert(this.name, this, TypeSym.Funcion, this.tipo);
    };
    functions.prototype.executeV = function (tablasimbolo1, parameters) {
        try {
            var tablasimbolo_1 = new tablasimbolos(tablasimbolo1);
            if (this.Parameters.length == parameters.length) {
                for (var a = 0; a < this.Parameters.length; a++) {
                    var namev = this.Parameters[a].name;
                    if (parameters[a] instanceof expression) {
                        var value = parameters[a];
                        switch (this.Parameters[a].tipo) {
                            case TypeValue.String:
                                var valueS = value.execute(tablasimbolo_1);
                                if (valueS[0] > 0) {
                                    if (valueS[1] instanceof String) {
                                        tablasimbolo_1.insert(namev, valueS[1], TypeSym.Variable, TypeValue.String);
                                    }
                                    else {
                                        return [-1, null];
                                    }
                                }
                                else {
                                    return [-1, null];
                                }
                                break;
                            case TypeValue.Number:
                                var valueN = value.execute(tablasimbolo_1);
                                if (valueN[0] > 0) {
                                    if (valueN[1] instanceof Number) {
                                        tablasimbolo_1.insert(namev, valueN[1], TypeSym.Variable, TypeValue.Number);
                                    }
                                    else {
                                        return [-1, null];
                                    }
                                }
                                else {
                                    return [-1, null];
                                }
                                break;
                            case TypeValue.Boolean:
                                var valueB = value.execute(tablasimbolo_1);
                                if (valueB[0] > 0) {
                                    if (valueB[1] instanceof Boolean) {
                                        tablasimbolo_1.insert(namev, valueB[1], TypeSym.Variable, TypeValue.Boolean);
                                    }
                                    else {
                                        return [-1, null];
                                    }
                                }
                                else {
                                    return [-1, null];
                                }
                                break;
                            case TypeValue["var"]:
                                var valueV = tablasimbolo_1.getsym(value.name);
                                if (valueV[0] > 1) {
                                    var simbolo = valueV[1];
                                    tablasimbolo_1.insert(namev, simbolo.value, simbolo.tipo, simbolo.tipoValue);
                                }
                                else {
                                    return [-1, null];
                                }
                                break;
                            case TypeValue.type:
                                var valueT = value.execute(tablasimbolo_1);
                                if (valueT[0] > 0) {
                                    if (valueT[1] instanceof types) {
                                        tablasimbolo_1.insert(namev, valueT[1], TypeSym.Variable, TypeValue.type);
                                    }
                                    else {
                                        return [-1, null];
                                    }
                                }
                                else {
                                    return [-1, null];
                                }
                                break;
                            case TypeValue.Array:
                                var valueA = value.execute(tablasimbolo_1);
                                if (valueA[0] > 0) {
                                    if (valueA[1] instanceof arrays) {
                                        tablasimbolo_1.insert(namev, valueA[1], TypeSym.Variable, TypeValue.Array);
                                    }
                                    else {
                                        return [-1, null];
                                    }
                                }
                                else {
                                    return [-1, null];
                                }
                                break;
                            default:
                                return [-1, null];
                        }
                    }
                    else {
                        switch (this.Parameters[a].tipo) {
                            case TypeValue.String:
                                var valueS = parameters[a].execute(tablasimbolo_1);
                                if (valueS[0] > 0) {
                                    if (valueS[1] instanceof String) {
                                        tablasimbolo_1.insert(namev, valueS[1], TypeSym.Variable, TypeValue.String);
                                    }
                                    else {
                                        return [-1, null];
                                    }
                                }
                                else {
                                    return [-1, null];
                                }
                                break;
                            case TypeValue.Number:
                                var valueN = parameters[a].execute(tablasimbolo_1);
                                if (valueN[0] > 0) {
                                    if (valueN[1] instanceof Number) {
                                        tablasimbolo_1.insert(namev, valueN[1], TypeSym.Variable, TypeValue.Number);
                                    }
                                    else {
                                        return [-1, null];
                                    }
                                }
                                else {
                                    return [-1, null];
                                }
                                break;
                            case TypeValue.Boolean:
                                var valueB = parameters[a].execute(tablasimbolo_1);
                                if (valueB[0] > 0) {
                                    if (valueB[1] instanceof Boolean) {
                                        tablasimbolo_1.insert(namev, valueB[1], TypeSym.Variable, TypeValue.Boolean);
                                    }
                                    else {
                                        return [-1, null];
                                    }
                                }
                                else {
                                    return [-1, null];
                                }
                                break;
                            default:
                                return [-1, null];
                        }
                    }
                }
                for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                    var statement1 = _a[_i];
                    var value = statement1.execute(tablasimbolo_1);
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return [-2, null];
                        case -1: //-> error
                            return [-1, null];
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
                            if (value[1] == null) {
                                if (this.tipo == TypeValue["void"])
                                    return [4, null];
                                return [-1, null];
                            }
                            else if (value[1] instanceof Boolean) {
                                if (this.tipo == TypeValue.Boolean)
                                    return [4, value[1]];
                                return [-1, null];
                            }
                            else if (value[1] instanceof Number) {
                                if (this.tipo == TypeValue.Number)
                                    return [4, value[1]];
                                return [-1, null];
                            }
                            else if (value[1] instanceof String) {
                                if (this.tipo == TypeValue.String)
                                    return [4, value[1]];
                                return [-1, null];
                            }
                            else if (value[1] instanceof arrays) {
                                if (this.tipo == TypeValue.Array)
                                    return [4, value[1]];
                                return [-1, null];
                            }
                            else {
                                if (this.tipo == TypeValue["void"])
                                    return [-1, null];
                                return [1, value[1]];
                            }
                    }
                }
                return [1, null];
            }
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    functions.prototype.grahp = function () {
        return "";
    };
    functions.prototype.traduction = function () {
        return "";
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
///<reference path="Statements.ts"/>
///<reference path="Expression.ts"/>
///<reference path="Literal.ts"/>
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
var WhileStatements = /** @class */ (function (_super) {
    __extends(WhileStatements, _super);
    function WhileStatements(Value, cuerpo) {
        var _this = _super.call(this) || this;
        _this.ValueExpression = Value;
        _this.body = cuerpo;
        return _this;
    }
    WhileStatements.prototype.execute = function (tablasimbolo) {
        try {
            var state = true;
            while (state) {
                var valInitial = this.ValueExpression.execute(tablasimbolo);
                if (valInitial[0] < 0)
                    return [-1, null];
                if (!valInitial[1])
                    break;
                var internalState = 0;
                for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                    var statement0 = _a[_i];
                    var value = statement0.execute(tablasimbolo);
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return [-2, null];
                        case -1: //-> error
                            return [-1, null];
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            this.value = value[1];
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            this.value = value[1];
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
            return [1, null];
        }
        catch (e) {
            return [-1, null];
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
    function DoWhileStatements(Value, cuerpo) {
        var _this = _super.call(this) || this;
        _this.ValueExpression = Value;
        _this.body = cuerpo;
        return _this;
    }
    DoWhileStatements.prototype.execute = function (tablasimblolo) {
        try {
            var state = true;
            while (state) {
                var internalState = 0;
                for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                    var statement0 = _a[_i];
                    var value = statement0.execute(tablasimblolo);
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return [-2, null];
                        case -1: //-> error
                            return [-1, null];
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            this.value = value[1];
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            this.value = value[1];
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
                if (valInitial[0] < 0)
                    return [-1, null];
                if (!valInitial[1])
                    break;
            }
            return [1, null];
        }
        catch (e) {
            return [-1, null];
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForStatements1.prototype.execute = function (tablasimbolo) {
        try {
            var initial = this.valueInitial.execute(tablasimbolo);
            if (initial[0] > 0) {
                var state = true;
                while (state) {
                    var internalState = 0;
                    var condicion = this.condicion.execute(tablasimbolo);
                    if (condicion[0] < 0)
                        return [-1, null];
                    if (condicion[1]) {
                        for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                            var statement1 = _a[_i];
                            var value = statement1.execute(tablasimbolo);
                            switch (value[0]) {
                                case -2: //-> error instanciar variable
                                    return [-2, null];
                                case -1: //-> error
                                    return [-1, null];
                                case 0: //-> finalizado
                                    this.StateCode = 0;
                                    this.value = value[1];
                                    break;
                                case 1: //-> sin errores
                                    this.StateCode = 1;
                                    this.value = value[1];
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
                        var post = this.postIterator.execute(tablasimbolo);
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
    ForStatements2.prototype.execute = function (tablasimbolo) {
        try {
            var initial = tablasimbolo.get(this.valueInitial);
            if (initial != null) {
                var state = true;
                while (state) {
                    var internalState = 0;
                    var condicion = this.condicion.execute(tablasimbolo);
                    if (condicion[0] < 0)
                        return [-1, null];
                    if (condicion[1]) {
                        for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                            var statement1 = _a[_i];
                            var value = statement1.execute(tablasimbolo);
                            switch (value[0]) {
                                case -2: //-> error instanciar variable
                                    return [-2, null];
                                case -1: //-> error
                                    return [-1, null];
                                case 0: //-> finalizado
                                    this.StateCode = 0;
                                    this.value = value[1];
                                    break;
                                case 1: //-> sin errores
                                    this.StateCode = 1;
                                    this.value = value[1];
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
                        var post = this.postIterator.execute(tablasimbolo);
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForStatements3.prototype.execute = function (tablasimbolo) {
        try {
            var internalState = 0;
            tablasimbolo.insert(this.identificador, null, TypeSym.Variable, TypeValue.Number);
            if (this.Expression.type == TypeStatement.ExpresionStatement) {
                var vals = this.Expression;
                switch (vals.valueType) {
                    case TypeValue.Array:
                        var valores = vals.getValuesArray(tablasimbolo);
                        for (var post in valores) {
                            tablasimbolo.update(this.identificador, post);
                            for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                                var statement1 = _a[_i];
                                var value = statement1.execute(tablasimbolo);
                                switch (value[0]) {
                                    case -2: //-> error instanciar variable
                                        return [-2, null];
                                    case -1: //-> error
                                        return [-1, null];
                                    case 0: //-> finalizado
                                        this.StateCode = 0;
                                        this.value = value[1];
                                        break;
                                    case 1: //-> sin errores
                                        this.StateCode = 1;
                                        this.value = value[1];
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
                        break;
                    case TypeValue.Object:
                        if (vals.atributo == null && vals.position == null) {
                            var temp = tablasimbolo.get(vals.name.toString());
                            switch (temp.tipoValue) {
                                case TypeValue.Array:
                                    var valores_1 = temp.getValue().getAll();
                                    for (var post in valores_1) {
                                        tablasimbolo.update(this.identificador, post);
                                        for (var _b = 0, _c = this.body; _b < _c.length; _b++) {
                                            var statement1 = _c[_b];
                                            var value = statement1.execute(tablasimbolo);
                                            switch (value[0]) {
                                                case -2: //-> error instanciar variable
                                                    return [-2, null];
                                                case -1: //-> error
                                                    return [-1, null];
                                                case 0: //-> finalizado
                                                    this.StateCode = 0;
                                                    this.value = value[1];
                                                    break;
                                                case 1: //-> sin errores
                                                    this.StateCode = 1;
                                                    this.value = value[1];
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
                                    break;
                            }
                        }
                        break;
                    case TypeValue.type:
                        var vsl = vals.getValueAtributo(tablasimbolo);
                        for (var post in vsl) {
                            tablasimbolo.update(this.identificador, post);
                            for (var _d = 0, _e = this.body; _d < _e.length; _d++) {
                                var statement1 = _e[_d];
                                var value = statement1.execute(tablasimbolo);
                                switch (value[0]) {
                                    case -2: //-> error instanciar variable
                                        return [-2, null];
                                    case -1: //-> error
                                        return [-1, null];
                                    case 0: //-> finalizado
                                        this.StateCode = 0;
                                        this.value = value[1];
                                        break;
                                    case 1: //-> sin errores
                                        this.StateCode = 1;
                                        this.value = value[1];
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
                            break;
                        }
                }
                return [1, null];
            }
            return [1, null];
        }
        catch (e) {
            return [-1, null];
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForStatements4.prototype.execute = function (tablasimbol) {
        var tablasimbolo = new tablasimbolos(tablasimbol);
        try {
            var internalState = 0;
            tablasimbolo.insert(this.identificador, null, TypeSym.Variable, TypeValue.Object);
            if (this.Expression.type == TypeStatement.ExpresionStatement) {
                var vals = this.Expression;
                switch (vals.valueType) {
                    case TypeValue.Array:
                        var valores = vals.getValuesArray(tablasimbolo);
                        for (var _i = 0, valores_2 = valores; _i < valores_2.length; _i++) {
                            var post = valores_2[_i];
                            tablasimbolo.update(this.identificador, post);
                            for (var _a = 0, _b = this.body; _a < _b.length; _a++) {
                                var statement1 = _b[_a];
                                var value = statement1.execute(tablasimbolo);
                                switch (value[0]) {
                                    case -2: //-> error instanciar variable
                                        return [-2, null];
                                    case -1: //-> error
                                        return [-1, null];
                                    case 0: //-> finalizado
                                        this.StateCode = 0;
                                        this.value = value[1];
                                        break;
                                    case 1: //-> sin errores
                                        this.StateCode = 1;
                                        this.value = value[1];
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
                        break;
                    case TypeValue.String:
                        var valores1 = vals.getValue(tablasimbolo).toString();
                        for (var _c = 0, valores1_1 = valores1; _c < valores1_1.length; _c++) {
                            var va = valores1_1[_c];
                            tablasimbolo.update(this.identificador, va);
                            for (var _d = 0, _e = this.body; _d < _e.length; _d++) {
                                var statement1 = _e[_d];
                                var value = statement1.execute(tablasimbolo);
                                switch (value[0]) {
                                    case -2: //-> error instanciar variable
                                        return [-2, null];
                                    case -1: //-> error
                                        return [-1, null];
                                    case 0: //-> finalizado
                                        this.StateCode = 0;
                                        this.value = value[1];
                                        break;
                                    case 1: //-> sin errores
                                        this.StateCode = 1;
                                        this.value = value[1];
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
                        break;
                    case TypeValue.Object:
                        if (vals.atributo == null && vals.position == null) {
                            var temp = tablasimbolo.get(vals.name.toString());
                            switch (temp.tipoValue) {
                                case TypeValue.String:
                                    var valores1_3 = temp.value;
                                    for (var _f = 0, valores1_2 = valores1_3; _f < valores1_2.length; _f++) {
                                        var va = valores1_2[_f];
                                        tablasimbolo.update(this.identificador, va);
                                        for (var _g = 0, _h = this.body; _g < _h.length; _g++) {
                                            var statement1 = _h[_g];
                                            var value = statement1.execute(tablasimbolo);
                                            switch (value[0]) {
                                                case -2: //-> error instanciar variable
                                                    return [-2, null];
                                                case -1: //-> error
                                                    return [-1, null];
                                                case 0: //-> finalizado
                                                    this.StateCode = 0;
                                                    this.value = value[1];
                                                    break;
                                                case 1: //-> sin errores
                                                    this.StateCode = 1;
                                                    this.value = value[1];
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
                                    break;
                                case TypeValue.Array:
                                    var valores_4 = temp.getValue().getAll();
                                    for (var _j = 0, valores_3 = valores_4; _j < valores_3.length; _j++) {
                                        var post = valores_3[_j];
                                        tablasimbolo.update(this.identificador, post);
                                        for (var _k = 0, _l = this.body; _k < _l.length; _k++) {
                                            var statement1 = _l[_k];
                                            var value = statement1.execute(tablasimbolo);
                                            switch (value[0]) {
                                                case -2: //-> error instanciar variable
                                                    return [-2, null];
                                                case -1: //-> error
                                                    return [-1, null];
                                                case 0: //-> finalizado
                                                    this.StateCode = 0;
                                                    this.value = value[1];
                                                    break;
                                                case 1: //-> sin errores
                                                    this.StateCode = 1;
                                                    this.value = value[1];
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
                                    break;
                            }
                        }
                        break;
                    case TypeValue.type:
                        var vsl = vals.getValueAtributo(tablasimbolo);
                        for (var _m = 0, vsl_1 = vsl; _m < vsl_1.length; _m++) {
                            var post = vsl_1[_m];
                            tablasimbolo.update(this.identificador, post);
                            for (var _o = 0, _p = this.body; _o < _p.length; _o++) {
                                var statement1 = _p[_o];
                                var value = statement1.execute(tablasimbolo);
                                switch (value[0]) {
                                    case -2: //-> error instanciar variable
                                        return [-2, null];
                                    case -1: //-> error
                                        return [-1, null];
                                    case 0: //-> finalizado
                                        this.StateCode = 0;
                                        this.value = value[1];
                                        break;
                                    case 1: //-> sin errores
                                        this.StateCode = 1;
                                        this.value = value[1];
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
                            break;
                        }
                }
                return [1, null];
            }
            return [1, null];
        }
        catch (e) {
            return [-1, null];
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
///<reference path="Statements.ts"/>
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
///<reference path="Statements.ts"/>
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
                    if (this.Expression == null)
                        return [-1, null];
                    var value = valu.execute(tablasimbolo);
                    if (value[0] < 0)
                        return [-1, null];
                    //this.htmlYouWantToAdd = "<p><b>value[1]</b></p>";
                    resultado += value[1].toString();
                }
                return [1, '{\"linea\":\"' + this.linea + '\", \"valor\":\"' + resultado + '\"}'];
            }
            else {
                return [1, this.graph];
            }
        }
        catch (e) {
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
var types = /** @class */ (function (_super) {
    __extends(types, _super);
    function types() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    types.prototype.execute = function (tablasimbolo) {
        return [1, this];
    };
    types.prototype.getValueAtributo = function (atributo) {
        for (var _i = 0, _a = this.atributos; _i < _a.length; _i++) {
            var atr = _a[_i];
            if (atr.name == atributo) {
                return [1, atr];
            }
        }
        return [-1, null];
    };
    types.prototype.getValuesAtributo1 = function (objeto, atributos, tablasimbolo) {
        try {
            var atr = atributos.pop();
            if (atributos.length > 0) {
                var atrsub0 = this.getValueAtributo(atr);
                if (atrsub0[0] > 0) {
                    if (atrsub0[1] instanceof types) {
                        var atrsub = this.getValuesAtributo1(atrsub0[1], atributos, tablasimbolo);
                        if (atrsub[0] > 0) {
                            return [1, atrsub[1]];
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
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    types.prototype.getValuesAtributo = function (atributos, tablasimbolo) {
        try {
            var atr = atributos.pop();
            if (atributos.length > 0) {
                var atrsub0 = this.getValueAtributo(atr);
                if (atrsub0[0] > 0) {
                    if (atrsub0[1] instanceof types) {
                        var atrsub = this.getValuesAtributo1(atrsub0[1], atributos, tablasimbolo);
                        if (atrsub[0] > 0) {
                            return [1, atrsub[1]];
                        }
                    }
                }
            }
            else {
                var atratr = this.getValueAtributo(atr);
                if (atratr[0] > 0) {
                    return [1, atratr[1]];
                }
            }
            return [-1, null];
        }
        catch (e) {
            return [-1, null];
        }
    };
    types.prototype.setValueAtributo = function (atributo, value) {
        for (var _i = 0, _a = this.atributos; _i < _a.length; _i++) {
            var atr = _a[_i];
            if (atr.name == atributo) {
                atr.value = value;
                return [1, null];
            }
        }
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
    return atributo;
}());
///<reference path="Statements.ts"/>
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
                            return [-2, null];
                        case -1: //-> error
                            return [-1, null];
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            this.value = value[1];
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            this.value = value[1];
                            break;
                        default:
                            return [-1, null];
                    }
                }
                else if (this.tipo == TypeValue["var"]) {
                    var declaration = declaracion;
                    declaration.tipoSim = TypeSym["var"];
                    var value = declaration.execute(tablasimbolo);
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return [-2, null];
                        case -1: //-> error
                            return [-1, null];
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            this.value = value[1];
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            this.value = value[1];
                            break;
                        default:
                            return [-1, null];
                    }
                }
                else if (this.tipo == TypeValue["const"]) {
                    var declaration = declaracion;
                    declaration.tipoSim = TypeSym["const"];
                    var value = declaration.execute(tablasimbolo);
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return [-2, null];
                        case -1: //-> error
                            return [-1, null];
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            this.value = value[1];
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            this.value = value[1];
                            break;
                        default:
                            return [-1, null];
                    }
                }
                else {
                    var declaration = declaracion;
                    declaration.tipoSim = TypeSym.Variable;
                    if (declaration.tipo == this.tipo) {
                        var value = declaration.execute(tablasimbolo);
                        switch (value[0]) {
                            case -2: //-> error instanciar variable
                                return [-2, null];
                            case -1: //-> error
                                return [-1, null];
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                this.value = value[1];
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                this.value = value[1];
                                break;
                            default:
                                return [-1, null];
                        }
                    }
                }
            }
        }
        return [1, null];
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    declaration0.prototype.execute = function (tablasimbolo) {
        var valor = this.Expression.execute(tablasimbolo);
        if (valor[0] > 0) {
            return tablasimbolo.insert(this.name, valor[1], this.tipoSim, this.tipo);
        }
        return [-1, null];
    };
    declaration0.prototype.grahp = function () {
        return "";
    };
    declaration0.prototype.traduction = function () {
        return "";
    };
    return declaration0;
}(statement));
///<reference path="Statements.ts"/>
///<reference path="NativeStatements.ts"/>
///<reference path="DeclarationStatements.ts"/>
/*
    UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
    JOSE WANNAN - 201612331 @2020
 */
var jsondataprueba = '{"linea":"196","S":[{"linea":"1","statement":"declaration","type":[{"linea":"1","tipo":[{"linea":"1","tipo":"let"}],"size":[]}], "values":[{"linea":"1","statement":"variable","tipoExpresion":[{"linea":"1","tipo":[{"linea":"1","tipo":"number"}],"size":[{"linea":"1","statement":"array","elementos":[]},\n' +
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
var instrucciones = [];
var tablasimbolo = new tablasimbolos();
var jsondata = '';
var erroresSemanticos = '';
var salida = '';
var lineas = 0;
function execute() {
    salida = '{\"salida\":[\n';
    if (erroresSemanticos == '') {
        for (var _i = 0, instrucciones_1 = instrucciones; _i < instrucciones_1.length; _i++) {
            var value = instrucciones_1[_i];
            var result = value.execute(tablasimbolo);
            if (result[0] > 0) {
                if (value.type == TypeStatement.NativeStatement) {
                    salida += result[1] + ',\n';
                }
            }
            else if (result[0] == 0) {
                console.log("finish without error...");
            }
            else {
                salida += '{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"' + result[1] + '\"},\n';
                console.log('finish with error...');
                break;
            }
        }
    }
    else {
        salida += '{\"valor\":\"El codigo posee errores semanticos\", \"errores\":[' + erroresSemanticos + '}\n';
    }
    salida += '{\"linea\":\"' + lineas + '\",\"valor\":\"finish executing...\"}\n]}';
    console.log(salida);
}
function generatinginformationExample() {
    var statement = JSON.parse(jsondataprueba);
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
            break;
        case "asignation":
            break;
        case "Argument":
            break;
        case "ArrayList":
            break;
        case "Object":
            break;
        case "MatrizPosition":
            break;
        case "variable":
            var variable = getVariable(data);
            if (variable != null)
                instrucciones.push(variable);
            break;
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
        //console.log(data)
        var declaras = [];
        var error = 0;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var decla = data_1[_i];
            var declarationes = new declaration0();
            var resultado = getTipo(decla.tipoExpresion);
            var tipo = resultado[0];
            var tam = resultado[1];
            declarationes.tipo = tipo;
            declarationes.linea = Number(decla.linea);
            declarationes.type = null;
            declarationes.name = decla.name;
            var value = getExpressiones(decla.ValExpression[0].Expression[0]);
            if (value instanceof arrays) {
                if (value.size == tam) {
                    declarationes.Expression = value;
                    declarationes.tipo = TypeValue.Array;
                    declaras.push(declarationes);
                }
                else {
                    error++;
                    erroresSemanticos += '{\"valor\":\"MatrixError\",\"salida\":\"Linea:' + decla.linea + ', La matriz es mayor al tamaño declarado.\"},\n';
                }
            }
            else {
                declarationes.Expression = value;
                if (value instanceof Strings || value instanceof Numbers || value instanceof Booleans || value instanceof Nulls) {
                    declarationes.tipo = value.tipoValue;
                }
                else if (value instanceof types) {
                    declarationes.tipo = TypeValue.type;
                }
                declaras.push(declarationes);
            }
        }
        if (error == 0)
            return declaras;
        return [];
    }
    catch (e) {
        return [];
    }
}
function declarationStatement(data) {
    try {
        var declaration = new declarations();
        declaration.linea = Number(data.linea);
        declaration.type = TypeStatement.DeclarationStatement;
        declaration.Expression = getDeclarations(data.values);
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
        //console.log(data);
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
                    break;
                case "asignation":
                    break;
                case "Argument":
                    break;
                case "ArrayList":
                    break;
                case "Object":
                    break;
                case "MatrizPosition":
                    break;
                case "variable":
                    return getVariable(data);
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

module.exports.generate = function (jsondata) { generatinginformation(jsondata);};
module.exports.exec = function(){execute(); return salida;};
