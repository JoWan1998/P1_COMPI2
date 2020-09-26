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
            return [-1, null];
        }
        catch (e) {
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
            return [-1, 'We cannot find the object: ' + name];
        }
        catch (e) {
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
                            console.log(simbolo, this.ambitoLevel);
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
            return [-1, 'We cannot find the object: ' + name];
        }
        catch (e) {
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
            return [-1, 'We cannot find the object: ' + name];
        }
        catch (e) {
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
            return [-1, 'the object doesn\'t exists'];
        }
        catch (e) {
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
            return [-1, 'the object doesn\'t exists'];
        }
        catch (e) {
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
            return [-2, 'we can\'t locate the variable, it\'s probably the variable doesn\'t exists'];
        }
        catch (e) {
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
        return _this;
    }
    SwitchStatement.prototype.execute = function (tablasimbolo1) {
        var tablasimbolo = new tablasimbolos(tablasimbolo1, false);
        var state = 5;
        for (var _i = 0, _a = this.cases; _i < _a.length; _i++) {
            var statements = _a[_i];
            if (statements instanceof cases) {
                statements.val = this.val;
                var value = statements.execute(tablasimbolo);
                switch (value[0]) {
                    case -2: //-> error instanciar variable
                        return value;
                    case -1: //-> error
                        return value;
                    case 0: //-> finalizado
                        state = 0;
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
                        state = 1;
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
                        return [2, null];
                    case 3: //-> sin errores, continue
                        return [3, null];
                    case 4: //-> sin errores, return
                        return [4, value[1]];
                    case 5:
                        state = 5;
                }
            }
        }
        if (state == 5 && this["default"] != null)
            return this["default"].execute(tablasimbolo);
        return [state, this.value];
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    cases.prototype.execute = function (tablasimbolo) {
        var valInitial1 = new RelationalExpression();
        valInitial1.type = TypeStatement.ExpresionStatement;
        valInitial1.Function = RelationalExpr.Igual;
        valInitial1.Expression1 = this.val;
        valInitial1.Expression2 = this.ValueExpression;
        var valInitial = valInitial1.execute(tablasimbolo);
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
                        return [2, null];
                    case 3: //-> sin errores, continue
                        return [3, null];
                    case 4: //-> sin errores, return
                        return [4, value[1]];
                }
            }
        }
        if (this.StateCode == 1 || this.StateCode == 0)
            return [1, this.value];
        return [5, null];
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    defaults.prototype.execute = function (tablasimbolo) {
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
                    return [2, null];
                case 3: //-> sin errores, continue
                    return [3, null];
                case 4: //-> sin errores, return
                    return [4, value[1]];
            }
        }
        return [this.StateCode, this.value];
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
            return [-1, null];
        }
        catch (e) {
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
                    return [1, this.values[result[1]]];
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
                    return [1, objeto[result[1]]];
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
                                    var result = this.operateArrAtr(arrs, tablasimbolo, this.position, this.atributo, this.Expression);
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
                                    var result = this.operateAtrArr(arrs, tablasimbolo, this.atributo, this.position, this.Expression);
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
                    if (value[0] > 0) {
                        var simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0) {
                            var simbolito = simbolo[1];
                            if (simbolito.getValue() instanceof types) {
                                var atr = simbolito.getValue();
                                var val = this.operateAtr(atr, tablasimbolo, this.atributo, this.Expression);
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
                    var value = this.Expression.execute(tablasimbolo);
                    if (value[0] > 0) {
                        var simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0) {
                            var simbolito = simbolo[1];
                            if (simbolito.getValue() instanceof arrays) {
                                var arrs = simbolito.getValue();
                                var k = arrs.setValue(tablasimbolo, this.position, this.Expression);
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
                        var value = this.Expression.execute(tablasimbolo);
                        if (value[0] > 0) {
                            return tablasimbolo.update(this.name, value[1]);
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
            return [-1, 'cannot be aplied ' + typeAssigment[this.Assigment] + ', in the object'];
        }
        catch (e) {
            //console.log(e)
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
            //console.log(this);
            this.value = [];
            var tablasimbolo_1 = new tablasimbolos(tablasimbolo1, false);
            var valInitial = this.ValueExpression.execute(tablasimbolo_1);
            if (valInitial[0] < 0)
                return [-1, null];
            if (valInitial[1]) {
                for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                    var statement0 = _a[_i];
                    var value = statement0.execute(tablasimbolo_1);
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
                            return [2, null];
                        case 3: //-> sin errores, continue
                            return [3, null];
                        case 4: //-> sin errores, return
                            return [4, value[1]];
                    }
                }
            }
            else {
                if (this.bodyElse.length > 0) {
                    for (var _f = 0, _g = this.bodyElse; _f < _g.length; _f++) {
                        var statement0 = _g[_f];
                        var value = statement0.execute(tablasimbolo_1);
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
        }
        catch (e) {
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
        try {
            if (this.atributo.length > 0) {
                if (this.name != "") {
                    var simbolo = tablasimbolo.getsym(this.name);
                    if (simbolo[0] > 0) {
                        if (simbolo[1] instanceof sym) {
                            var simbolito1 = simbolo[1];
                            if (simbolito1.getValue() instanceof types) {
                                var valors = simbolito1.getValue();
                                var val = valors.getValuesAtributo(this.atributo, tablasimbolo);
                                if (val[0] > 0) {
                                    try {
                                        if (val[1].value instanceof Nulls) {
                                            return '__jw__';
                                        }
                                        else {
                                            var result = val[1].value.execute(tablasimbolo);
                                            if (result[0] > 0)
                                                return result[1];
                                        }
                                    }
                                    catch (e) {
                                        return val[1];
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
        try {
            if (this.atributo.length > 0) {
                if (this.name != "") {
                    var simbolo = tablasimbolo.getsym(this.name);
                    if (simbolo[0] > 0) {
                        if (simbolo[1] instanceof sym) {
                            var simbolito1 = simbolo[1];
                            if (simbolito1.getValue() instanceof types) {
                                var valors = simbolito1.getValue();
                                var val = valors.getValuesAtributo(this.atributo, tablasimbolo);
                                if (val[0] > 0) {
                                    try {
                                        if (val[1].value instanceof arrays) {
                                            var valors2 = val[1].value;
                                            if (this.position.length > 0) {
                                                var vae = valors2.getValue(this.position, tablasimbolo);
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
        //get all values array
        try {
            if (this.name != "") {
                var simbolo = tablasimbolo.getsym(this.name);
                if (simbolo[0] > 0) {
                    if (simbolo[1] instanceof sym) {
                        var simbolito1 = simbolo[1];
                        if (simbolito1.getValue() instanceof arrays) {
                            var valors = simbolito1.getValue();
                            if (this.position.length > 0) {
                                var val = valors.getValue(this.position, tablasimbolo);
                                if (val[0] > 0) {
                                    if (val[1] instanceof types) {
                                        var valors2 = val[1];
                                        var vae = valors2.getValuesAtributo(this.atributo, tablasimbolo);
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
                    var valors = this.Expresion;
                    var val = valors.execute(tablasimbolo);
                    if (val[0] > 0) {
                        var resu = val[1].getValue(this.position, tablasimbolo);
                        if (resu[0] > 0) {
                            var result = resu[1].execute(tablasimbolo);
                            if (result[0] > 0)
                                return result[1];
                        }
                    }
                }
                else {
                    var valors = this.Expresion;
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
        //get all values array
        try {
            if (this.name != "") {
                var simbolo = tablasimbolo.getsym(this.name);
                if (simbolo[0] > 0) {
                    if (simbolo[1] instanceof sym) {
                        var simbolito1 = simbolo[1];
                        if (simbolito1.getValue() instanceof arrays) {
                            var valors = simbolito1.getValue();
                            if (this.position.length > 0) {
                                var val = valors.getValue(this.position, tablasimbolo);
                                if (val[0] > 0) {
                                    try {
                                        var result = val[1].execute(tablasimbolo);
                                        if (result[0] > 0)
                                            return result[1];
                                    }
                                    catch (e) {
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
                    var valors = this.Expresion;
                    var val = valors.execute(tablasimbolo);
                    if (val[0] > 0) {
                        var resu = val[1].getValue(this.position, tablasimbolo);
                        if (resu[0] > 0) {
                            var result = resu[1].execute(tablasimbolo);
                            if (result[0] > 0)
                                return result[1];
                        }
                    }
                }
                else {
                    var valors = this.Expresion;
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
                                        var val1 = valors.getValue(positions, tablasimbolo);
                                        if (val1[0] > 0) {
                                            if (val1[1] instanceof arrays) {
                                                var retorno = val1[1];
                                                var retorno1 = retorno.pop();
                                                if (retorno1[0] > 0) {
                                                    var m = valors.setValue(tablasimbolo, this.position, retorno);
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
                        var value = this.Expresion.execute(tablasimbolo);
                        if (value[0] > 0) {
                            var simbolo2 = tablasimbolo.getsym(this.name);
                            if (simbolo2[0] > 0) {
                                if (simbolo2[1] instanceof sym) {
                                    var simbolito1 = simbolo2[1];
                                    if (simbolito1.getValue() instanceof arrays) {
                                        var valors = simbolito1.getValue();
                                        if (this.position.length > 0) {
                                            var val1 = valors.getValue(positions, tablasimbolo);
                                            if (val1[0] > 0) {
                                                if (val1[1] instanceof arrays) {
                                                    var retorno = val1[1];
                                                    var bb = retorno.push(this.Expresion);
                                                    if (bb[0] > 0) {
                                                        var m = valors.setValue(tablasimbolo, this.position, retorno);
                                                        console.log(valors);
                                                        if (m[0] > 0) {
                                                            var k = tablasimbolo.update(this.name, valors);
                                                            if (k[0] > 0)
                                                                return retorno.length();
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            var bb = valors.push(this.Expresion);
                                            //console.log(bb);
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
                        var simbolo = tablasimbolo.getsym(this.name);
                        return simbolo[1];
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
                }
            }
            return null;
        }
        catch (e) {
            //console.log(e)
            return null;
        }
    };
    expression.prototype.execute = function (tablasimbolo) {
        //get all data from all version of types
        try {
            var data = this.getValue(tablasimbolo);
            //console.log(data)
            if (data != null) {
                if (data == '__jw__')
                    return [1, null];
                return [1, data];
            }
            return [-1, 'We cant get the data'];
        }
        catch (e) {
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
            return [-1, null];
        }
        catch (e) {
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
            //console.log('F->'+this.Function);
            //console.log(this.Expression1);
            //console.log(this.Expression2);
            var izq = (this.Expression1 != null) ? this.Expression1.execute(tablasimbolo) : [-1, null];
            var der = (this.Expression2 != null) ? this.Expression2.execute(tablasimbolo) : [-1, null];
            //console.log(izq);
            //console.log(der);
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
            return [-1, null];
        }
        catch (e) {
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
            return [-1, null];
        }
        catch (e) {
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
        return _this;
    }
    functions.prototype.execute = function (tablasimbolo) {
        return tablasimbolo.insert(this.name, this, TypeSym.Funcion, this.tipo);
    };
    functions.prototype.executeV = function (tablasimbolo1, parameters) {
        try {
            var tablasimbolo_2 = new tablasimbolos(tablasimbolo1, true);
            if (this.Parameters.length == parameters.length) {
                for (var a = 0; a < this.Parameters.length; a++) {
                    var namev = this.Parameters[a].name;
                    if (parameters[a] instanceof expression) {
                        var value = parameters[a];
                        switch (this.Parameters[a].tipo) {
                            case TypeValue.String:
                                var valueS = value.execute(tablasimbolo_2);
                                if (valueS[0] > 0) {
                                    if (valueS[1] instanceof String) {
                                        tablasimbolo_2.insert(namev, valueS[1], TypeSym.Variable, TypeValue.String);
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
                                var valueN = value.execute(tablasimbolo_2);
                                if (valueN[0] > 0) {
                                    if (valueN[1] instanceof Number) {
                                        tablasimbolo_2.insert(namev, valueN[1], TypeSym.Variable, TypeValue.Number);
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
                                var valueB = value.execute(tablasimbolo_2);
                                if (valueB[0] > 0) {
                                    if (valueB[1] instanceof Boolean) {
                                        tablasimbolo_2.insert(namev, valueB[1], TypeSym.Variable, TypeValue.Boolean);
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
                                var valueV = tablasimbolo_2.getsym(value.name);
                                if (valueV[0] > 1) {
                                    var simbolo = valueV[1];
                                    tablasimbolo_2.insert(namev, simbolo.value, simbolo.tipo, simbolo.tipoValue);
                                }
                                else {
                                    return [-1, null];
                                }
                                break;
                            case TypeValue.type:
                                var valueT = value.execute(tablasimbolo_2);
                                if (valueT[0] > 0) {
                                    if (valueT[1] instanceof types) {
                                        tablasimbolo_2.insert(namev, valueT[1], TypeSym.Variable, TypeValue.type);
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
                                var valueA = value.execute(tablasimbolo_2);
                                if (valueA[0] > 0) {
                                    if (valueA[1] instanceof arrays) {
                                        tablasimbolo_2.insert(namev, valueA[1], TypeSym.Variable, TypeValue.Array);
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
                                var valueS = parameters[a].execute(tablasimbolo_2);
                                if (valueS[0] > 0) {
                                    if (valueS[1] instanceof String) {
                                        tablasimbolo_2.insert(namev, valueS[1], TypeSym.Variable, TypeValue.String);
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
                                var valueN = parameters[a].execute(tablasimbolo_2);
                                if (valueN[0] > 0) {
                                    if (valueN[1] instanceof Number) {
                                        tablasimbolo_2.insert(namev, valueN[1], TypeSym.Variable, TypeValue.Number);
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
                                var valueB = parameters[a].execute(tablasimbolo_2);
                                if (valueB[0] > 0) {
                                    if (valueB[1] instanceof Boolean) {
                                        tablasimbolo_2.insert(namev, valueB[1], TypeSym.Variable, TypeValue.Boolean);
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
                    var value = statement1.execute(tablasimbolo_2);
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
                            if (value[1] == null) {
                                if (this.tipo == TypeValue["void"])
                                    return [4, null];
                                return [-1, 'Error no se puede retornar el valor, no corresponde al siguiente tipo: ' + TypeValue[this.tipo]];
                            }
                            else if (value[1] instanceof Boolean) {
                                if (this.tipo == TypeValue.Boolean)
                                    return [4, value[1]];
                                return [-1, 'Error no se puede retornar el valor, no corresponde al siguiente tipo: ' + TypeValue[this.tipo]];
                            }
                            else if (value[1] instanceof Number) {
                                if (this.tipo == TypeValue.Number)
                                    return [4, value[1]];
                                return [-1, 'Error no se puede retornar el valor, no corresponde al siguiente tipo: ' + TypeValue[this.tipo]];
                            }
                            else if (value[1] instanceof String) {
                                if (this.tipo == TypeValue.String)
                                    return [4, value[1]];
                                return [-1, 'Error no se puede retornar el valor, no corresponde al siguiente tipo: ' + TypeValue[this.tipo]];
                            }
                            else if (value[1] instanceof arrays) {
                                if (this.tipo == TypeValue.Array)
                                    return [4, value[1]];
                                return [-1, 'Error no se puede retornar el valor, no corresponde al siguiente tipo: ' + TypeValue[this.tipo]];
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
            return [-1, 'Internal Error, Parameters length is not the same length, length: ' + this.Parameters.length + ", length_send: " + parameters.length];
        }
        catch (e) {
            return [-1, 'Unexpected Error, we cannot find a solution for this error'];
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
            var tablasimbolo_3 = new tablasimbolos(tablasimbolo1, false);
            while (state) {
                var valInitial = this.ValueExpression.execute(tablasimbolo_3);
                if (valInitial[0] < 0)
                    return [-1, null];
                if (!valInitial[1])
                    break;
                var internalState = 0;
                for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                    var statement0 = _a[_i];
                    var value = statement0.execute(tablasimbolo_3);
                    switch (value[0]) {
                        case -2: //-> error instanciar variable
                            return [-2, null];
                        case -1: //-> error
                            return [-1, null];
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
            //console.log(e);
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
            var tablasimblolo = new tablasimbolos(tablasimblolo1, false);
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
            return [1, this.value];
        }
        catch (e) {
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
            this.value = [];
            var tablasimbolo_4 = new tablasimbolos(tablasimbolo1, false);
            var initial = this.valueInitial.execute(tablasimbolo_4);
            if (initial[0] > 0) {
                var state = true;
                while (state) {
                    var internalState = 0;
                    var condicion = this.condicion.execute(tablasimbolo_4);
                    if (condicion[0] < 0)
                        return [-1, 'Condition Iteration For, Error, cannot execute the  Condition'];
                    if (condicion[1]) {
                        for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                            var statement1 = _a[_i];
                            var value = statement1.execute(tablasimbolo_4);
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
                                    if (statement1 instanceof autoincrements) {
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
                        var post = this.postIterator.execute(tablasimbolo_4);
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
            var tablasimbolo_5 = new tablasimbolos(tablasimbolo1, false);
            var initial = tablasimbolo_5.get(this.valueInitial);
            if (initial != null) {
                var state = true;
                while (state) {
                    var internalState = 0;
                    var condicion = this.condicion.execute(tablasimbolo_5);
                    if (condicion[0] < 0)
                        return [-1, null];
                    if (condicion[1]) {
                        for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                            var statement1 = _a[_i];
                            var value = statement1.execute(tablasimbolo_5);
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
                        var post = this.postIterator.execute(tablasimbolo_5);
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
        try {
            this.value = [];
            var internalState = 0;
            tablasimbolo.insert(this.identificador, null, TypeSym.Variable, TypeValue.Object);
            if (this.Expression instanceof expression) {
                var vals = this.Expression.execute(tablasimbolo);
                if (vals[0] > 0) {
                    if (vals[1] instanceof arrays) {
                        var kk = vals[1].getAll();
                        for (var pos in kk) {
                            tablasimbolo.update(this.identificador, pos);
                            for (var _i = 0, _a = this.body; _i < _a.length; _i++) {
                                var statement1 = _a[_i];
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
                                        if (statement1 instanceof autoincrements) {
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
                for (var post in valores) {
                    tablasimbolo.update(this.identificador, post);
                    for (var _f = 0, _g = this.body; _f < _g.length; _f++) {
                        var statement1 = _g[_f];
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
            return [-1, 'Cannot applied iterators in For...in, because only Arrays is permited!.'];
        }
        catch (e) {
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
            var internalState = 0;
            tablasimbolo.insert(this.identificador, null, TypeSym.Variable, TypeValue.Object);
            if (this.Expression instanceof expression) {
                var vals = this.Expression.execute(tablasimbolo);
                if (vals[0] > 0) {
                    if (vals[1] instanceof arrays) {
                        var kk = vals[1].getAll();
                        for (var _i = 0, kk_1 = kk; _i < kk_1.length; _i++) {
                            var pos = kk_1[_i];
                            if (pos instanceof arrays) {
                                var km = pos.getAll();
                                for (var _a = 0, km_1 = km; _a < km_1.length; _a++) {
                                    var posi = km_1[_a];
                                    tablasimbolo.update(this.identificador, posi.execute(tablasimbolo)[1]);
                                    for (var _b = 0, _c = this.body; _b < _c.length; _b++) {
                                        var statement1 = _c[_b];
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
                                            case 1: //-> sin errores
                                                this.StateCode = 1;
                                                this.StateCode = 1;
                                                if (statement1 instanceof autoincrements) {
                                                }
                                                else {
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
                                for (var _h = 0, _j = this.body; _h < _j.length; _h++) {
                                    var statement1 = _j[_h];
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
                            for (var _r = 0, _s = this.body; _r < _s.length; _r++) {
                                var statement1 = _s[_r];
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
                                                    for (var _t = 0, _u = value[1]; _t < _u.length; _t++) {
                                                        var m = _u[_t];
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
                                                    for (var _v = 0, _w = value[1]; _v < _w.length; _v++) {
                                                        var m = _w[_v];
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
                for (var _x = 0, valores_1 = valores; _x < valores_1.length; _x++) {
                    var post = valores_1[_x];
                    tablasimbolo.update(this.identificador, post.execute(tablasimbolo)[1]);
                    for (var _y = 0, _z = this.body; _y < _z.length; _y++) {
                        var statement1 = _z[_y];
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
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                if (statement1 instanceof autoincrements) {
                                }
                                else {
                                    if (value[1] != null) {
                                        if (value[1] instanceof Array) {
                                            for (var _2 = 0, _3 = value[1]; _2 < _3.length; _2++) {
                                                var m = _3[_2];
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
                for (var _4 = 0, valores1_1 = valores1; _4 < valores1_1.length; _4++) {
                    var va = valores1_1[_4];
                    tablasimbolo.update(this.identificador, va);
                    for (var _5 = 0, _6 = this.body; _5 < _6.length; _5++) {
                        var statement1 = _6[_5];
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
                                            for (var _7 = 0, _8 = value[1]; _7 < _8.length; _7++) {
                                                var m = _8[_7];
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
                                            for (var _9 = 0, _10 = value[1]; _9 < _10.length; _9++) {
                                                var m = _10[_9];
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
            return [-1, 'We cannot applied the instructions, because For...Of only iterate Strings and Arrays...'];
        }
        catch (e) {
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
                    //console.log(this.Expression)
                    //console.log(tablasimbolo)
                    if (this.Expression == null)
                        return [-1, null];
                    //console.log(this.Expression);
                    var value = valu.execute(tablasimbolo);
                    if (value[0] < 0)
                        return [-1, null];
                    //this.htmlYouWantToAdd = "<p><b>value[1]</b></p>";
                    if (value[1] == null) {
                        resultado += "null";
                    }
                    else {
                        if (value[1] instanceof arrays) {
                            try {
                                resultado += '[ ';
                                var a = 0;
                                for (var _b = 0, _c = value[1].getAll(); _b < _c.length; _b++) {
                                    var m = _c[_b];
                                    a++;
                                    resultado += m.execute(tablasimbolo)[1];
                                    if (a < value[1].getAll().length)
                                        resultado += ' , ';
                                }
                                resultado += ' ]';
                            }
                            catch (e) {
                                resultado += value[1];
                            }
                        }
                        else {
                            resultado += value[1];
                        }
                    }
                }
                return [1, '{\"linea\":\"' + this.linea + '\", \"valor\":\"' + resultado + '\"}'];
            }
            else {
                return [1, this.graph];
            }
        }
        catch (e) {
            console.log(e);
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
                                return [-1, 'An Error was ocurred, we can\'t identified the error.'];
                        }
                    }
                }
            }
            return [1, null];
        }
        catch (e) {
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
            //console.log(this);
            if (this.nameType != '') {
                var typer = tablasimbolo.getsym(this.nameType);
                //console.log(typer);
                if (typer[0] > 0) {
                    if (typer[1] instanceof sym) {
                        var type = typer[1].getValue();
                        //console.log(type);
                        if (type instanceof types && this.Expression instanceof types) {
                            //console.log('validate');
                            //console.log(this.Expression.atributos.length == type.atributos.length)
                            if (this.Expression.atributos.length == type.atributos.length) {
                                return tablasimbolo.insert(this.name, this.Expression, TypeSym["class"], this.tipo);
                            }
                        }
                    }
                }
            }
            else {
                var valor = this.Expression.execute(tablasimbolo);
                if (valor[0] > 0) {
                    return tablasimbolo.insert(this.name, valor[1], this.tipoSim, this.tipo);
                }
            }
            return [-1, 'Error, cannot be execute the instruction'];
        }
        catch (e) {
            //console.log(e)
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
var jsondata2 = '{"linea":"7","S":[{"linea":"1","statement":"declaration","type":[{"linea":"1","tipo":[{"linea":"1","tipo":"let"}],"size":[]}], "values":[{"linea":"1","statement":"variable","tipoExpresion":[],"name":"a","ValExpression":[{"linea":"1","operator":[{"linea":"1","v":"="}],"Expression":[{"linea":"1","tipo":"number", "value":"0"}]}]}]},\n' +
    '{"linea":"6","statement":"dowhile","body":[{"linea":"4","statement":"console","expression":[{"linea":"4","statement":"variable","value":"a"}]},\n' +
    '{"linea":"5","statement":"postincrement1","padre":[{"linea":"5","statement":"variable","value":"a","hijo":[]}]}],"Expression":[{"linea":"6","statement":"Relational","Relational":"<","Expression1":[{"linea":"6","statement":"variable","value":"a"}],"Expression2":[{"linea":"6","tipo":"number", "value":"10"}]}]},\n' +
    '{"linea":"7","statement":""}]}';
var instrucciones = [];
var tablasimbolo = new tablasimbolos();
var jsondata = '';
var erroresSemanticos = '';
var salida = '';
var lineas = 0;
var ts = '';
generatinginformationExample();
execute();
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
    console.log(ts);
}
function execute() {
    tablasimbolo = new tablasimbolos();
    salida = '{\"salida\":[\n';
    if (erroresSemanticos == '') {
        for (var _i = 0, instrucciones_1 = instrucciones; _i < instrucciones_1.length; _i++) {
            var value = instrucciones_1[_i];
            if (value instanceof functions) {
                value.execute(tablasimbolo);
            }
        }
        for (var _a = 0, instrucciones_2 = instrucciones; _a < instrucciones_2.length; _a++) {
            var value = instrucciones_2[_a];
            if (value instanceof statement) {
                var result = value.execute(tablasimbolo);
                if (result[0] > 0) {
                    if (result[1] instanceof Array) {
                        for (var _b = 0, _c = result[1]; _b < _c.length; _b++) {
                            var resultadito = _c[_b];
                            salida += resultadito + ',\n';
                        }
                    }
                    else {
                        if (value.type == TypeStatement.NativeStatement) {
                            salida += result[1] + ',\n';
                        }
                    }
                }
                else if (result[0] == 0) {
                    console.log("finish without error...");
                }
                else {
                    salida += '{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Linea: ' + value.linea + ', ' + result[1] + '\"},\n';
                    console.log('finish with error...');
                    break;
                }
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
    erroresSemanticos = '';
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
            break;
        case "asignation":
            return getAsignation(data);
        case "Argument":
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
            break;
        case "funcion":
        case "continue":
        case "break":
        case "return":
        case "switch":
        case "case":
        case "default":
            break;
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
            break;
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
                    return getAsignation(data);
                case "Argument":
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
                case "continue":
                case "break":
                case "return":
                case "switch":
                case "case":
                case "typebody":
                    return typeBody(data);
                case "arreglo":
                    return getArreglo(data);
                case "callMatriz":
                    return callMatriz(data);
                case "callAtributo":
                    return callAtributo(data);
                case "callFuncion":
                    break;
                case "nativeArray":
                    return nativeMatriz(data);
                case "default":
                    break;
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
                    break;
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
        for (var _i = 0, _a = data.value; _i < _a.length; _i++) {
            var datas = _a[_i];
            var k = getExpressiones(datas);
            if (k != null)
                positions.push(k);
        }
        return positions;
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
        console.log(autoin);
        return autoin;
    }
    catch (e) {
        console.log(e);
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
        var mat = new expression();
        switch (data.native) {
            case "length":
                mat.linea = data.linea;
                mat.ArrayType = NativeArray.Length;
                mat.name = 'a';
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
                mat.linea = data.linea;
                mat.ArrayType = NativeArray.Pop;
                mat.name = 'a';
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
                mat.linea = data.linea;
                mat.ArrayType = NativeArray.Push;
                mat.name = 'a';
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
        //console.log(data);
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
