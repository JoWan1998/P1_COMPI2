/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

let output = [];
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

class tablasimbolos
{
    simbolos:any[];
    ambitoLevel:number;



    constructor(tabla?:any,CF:boolean = false)
    {
        if(tabla==undefined)
        {
            this.simbolos = [];
            this.ambitoLevel = 0;
        }
        else
        {
            if(tabla instanceof tablasimbolos)
            {
                this.ambitoLevel = tabla.ambitoLevel + 1;
                this.simbolos = [];
                for(let tablas of tabla.simbolos)
                {
                    if(CF)
                    {
                        if(tablas.ambito == 0) this.simbolos.push(tablas);
                    }
                    else
                    {
                        this.simbolos.push(tablas);
                    }

                }
            }

        }

    }
    updateo(name:string,new_value:any)
    {
        try
        {
            for(let simbolo of this.simbolos)
            {
                if (simbolo instanceof sym)
                {
                    if (simbolo.name == name)
                    {
                        if(simbolo.tipoValue == TypeValue.type)
                        {
                            return simbolo.update(new_value,undefined,undefined);
                        }
                    }
                }
            }
            return [-1,null];
        }
        catch (e)
        {
            return [-2,'Unexpected Error, cannot get information of the variable']
        }
    }


    update(name:string,new_value:any,atributo?:string,posicion?:any):any
    {
        try
        {
            let ambitoglob = true;
            let ambitoloc = false;
            for(let simbolo of this.simbolos) {
                if (simbolo instanceof sym) {
                    if (simbolo.name == name) {
                        if(simbolo.ambito == this.ambitoLevel && this.ambitoLevel>0 && simbolo.ambito >0)
                        {
                            ambitoglob = false;
                            ambitoloc = true;
                        }
                        else if(simbolo.ambito < this.ambitoLevel && this.ambitoLevel>0 && simbolo.ambito >0)
                        {
                            ambitoglob = false;

                        }
                    }
                }
            }
            if(ambitoglob)
            {
                for(let simbolo of this.simbolos)
                {
                    if (simbolo instanceof sym)
                    {
                        if (simbolo.name == name)
                        {
                            if(simbolo.tipoValue == TypeValue.type)
                            {
                                return simbolo.update(new_value,atributo,undefined);
                            }
                            else if(simbolo.tipoValue == TypeValue.Array)
                            {
                                return simbolo.update(new_value,undefined,posicion);
                            }
                            else
                            {
                                return simbolo.update(new_value,undefined,undefined);
                            }
                        }
                    }
                }
            }
            else
            {
                if(ambitoloc)
                {
                    for(let simbolo of this.simbolos)
                    {
                        if (simbolo instanceof sym)
                        {
                            if (simbolo.name == name)
                            {
                                if(simbolo.ambito == this.ambitoLevel)
                                {
                                    if(simbolo.tipoValue == TypeValue.type)
                                    {
                                        return simbolo.update(new_value,atributo,undefined);
                                    }
                                    else if(simbolo.tipoValue == TypeValue.Array)
                                    {
                                        return simbolo.update(new_value,undefined,posicion);
                                    }
                                    else
                                    {
                                        return simbolo.update(new_value,undefined,undefined);
                                    }
                                }
                            }
                        }
                    }
                }
                else
                {
                    for(let simbolo of this.simbolos)
                    {
                        if (simbolo instanceof sym)
                        {
                            if (simbolo.name == name)
                            {
                                if(simbolo.ambito < this.ambitoLevel && simbolo.ambito >0)
                                {
                                    if(simbolo.tipoValue == TypeValue.type)
                                    {
                                        return simbolo.update(new_value,atributo,undefined);
                                    }
                                    else if(simbolo.tipoValue == TypeValue.Array)
                                    {
                                        return simbolo.update(new_value,undefined,posicion);
                                    }
                                    else
                                    {
                                        return simbolo.update(new_value,undefined,undefined);
                                    }
                                }
                            }
                        }
                    }

                }
            }

            return [-1,'We cannot find the object: '+name];
        }
        catch (e)
        {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }

    }
    //metodo el cual a diferencia de otros al no tener una ejecucion correcta devuelve null
    get(name:string,atributo?:string,posicion?:any): any
    {
        try
        {
            let ambitoglob = true;
            let ambitoloc = false;
            for(let simbolo of this.simbolos) {
                if (simbolo instanceof sym) {
                    if (simbolo.name == name) {
                        if(simbolo.ambito == this.ambitoLevel && this.ambitoLevel>0 && simbolo.ambito >0)
                        {
                            ambitoglob = false;
                            ambitoloc = true;
                        }
                        else if(simbolo.ambito < this.ambitoLevel && this.ambitoLevel>0 && simbolo.ambito >0)
                        {
                            ambitoglob = false;

                        }
                    }
                }
            }

            if(ambitoglob)
            {
                for(let simbolo of this.simbolos)
                {
                    if (simbolo instanceof sym)
                    {
                        if (simbolo.name == name)
                        {
                            if(simbolo.tipo == TypeSym.Variable)
                            {
                                if(simbolo.tipoValue == TypeValue.type)
                                {
                                    let sim:types = simbolo.getValue();
                                    return sim.getValueAtributo(atributo);
                                }
                                else if(simbolo.tipoValue == TypeValue.Array)
                                {
                                    let sim:arrays = simbolo.getValue();
                                    return sim.getValue(posicion,this);
                                }
                                else
                                {
                                    return [1,simbolo.getValue()];
                                }
                            }

                        }
                    }
                }
            }
            else
            {
                if(ambitoloc)
                {
                    for(let simbolo of this.simbolos)
                    {
                        if (simbolo instanceof sym)
                        {
                            //console.log(simbolo, this.ambitoLevel)
                            if (simbolo.name == name && simbolo.ambito == this.ambitoLevel)
                            {
                                if(simbolo.tipo == TypeSym.Variable)
                                {
                                    if(simbolo.tipoValue == TypeValue.type)
                                    {
                                        let sim:types = simbolo.getValue();
                                        return sim.getValueAtributo(atributo);
                                    }
                                    else if(simbolo.tipoValue == TypeValue.Array)
                                    {
                                        let sim:arrays = simbolo.getValue();
                                        return sim.getValue(posicion,this);
                                    }
                                    else
                                    {
                                        return [1,simbolo.getValue()];
                                    }
                                }

                            }
                        }
                    }
                }
                else
                {
                    for(let simbolo of this.simbolos)
                    {
                        if (simbolo instanceof sym)
                        {
                            if( simbolo.name == name && simbolo.ambito < this.ambitoLevel && simbolo.ambito > 0)
                            {
                                if(simbolo.tipo == TypeSym.Variable)
                                {
                                    if(simbolo.tipoValue == TypeValue.type)
                                    {
                                        let sim:types = simbolo.getValue();
                                        return sim.getValueAtributo(atributo);
                                    }
                                    else if(simbolo.tipoValue == TypeValue.Array)
                                    {
                                        let sim:arrays = simbolo.getValue();
                                        return sim.getValue(posicion,this);
                                    }
                                    else
                                    {
                                        return [1,simbolo.getValue()];
                                    }
                                }

                            }
                        }
                    }
                }
            }

            return [-1,'We cannot find the object: '+name];
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }

    }
    getsym(name:string)
    {
        try
        {
            let ambitoglob = true;
            let ambitoloc = false;
            for(let simbolo of this.simbolos) {
                if (simbolo instanceof sym) {
                    if (simbolo.name == name) {
                        if(simbolo.ambito == this.ambitoLevel && this.ambitoLevel>0 && simbolo.ambito >0)
                        {
                            ambitoglob = false;
                            ambitoloc = true;
                        }
                        else if(simbolo.ambito < this.ambitoLevel && this.ambitoLevel>0 && simbolo.ambito >0)
                        {
                            ambitoglob = false;

                        }
                    }
                }
            }
            if(ambitoglob)
            {
                for(let simbolo of this.simbolos)
                {
                    if (simbolo instanceof sym)
                    {
                        if (simbolo.name == name)
                        {
                            return[1,simbolo]
                        }
                    }
                }
            }
            else
            {
                if(ambitoloc)
                {
                    for(let simbolo of this.simbolos)
                    {
                        if (simbolo instanceof sym)
                        {
                            if (simbolo.name == name && simbolo.ambito == this.ambitoLevel)
                            {
                                return[1,simbolo]
                            }
                        }
                    }
                }
                else
                {
                    for(let simbolo of this.simbolos)
                    {
                        if (simbolo instanceof sym)
                        {
                            if( simbolo.name == name && simbolo.ambito < this.ambitoLevel && simbolo.ambito > 0)
                            {
                                return [1,simbolo]
                            }
                        }
                    }
                }
            }

            return [-1,'We cannot find the object: '+name];
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }
    }
    getType(name:string)
    {
        try
        {
            for(let simbolo of this.simbolos)
            {
                if (simbolo instanceof sym)
                {
                    if (simbolo.name == name)
                    {
                        return [1,simbolo.tipo];
                    }
                }
            }
            return [-1,'the object doesn\'t exists'];
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }
    }

    getTypeValue(name:string)
    {
        try
        {
            for(let simbolo of this.simbolos)
            {
                if (simbolo instanceof sym)
                {
                    if (simbolo.name == name)
                    {
                        return [1,simbolo.tipoValue];
                    }
                }
            }
            return [-1,'the object doesn\'t exists'];
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }

    }
    insert(name:string, value:any, tipo:TypeSym, tipovalue:TypeValue)
    {
        try
        {
            let state:Boolean = false;
            for(let simbolo of this.simbolos)
            {
                if (simbolo instanceof sym)
                {
                    if (simbolo.name == name && simbolo.ambito == this.ambitoLevel)
                    {
                        state = true;
                        break;
                    }
                }
            }
            if(!state)
            {
                let simbolo = new sym(name,this.ambitoLevel,value,tipo);
                simbolo.tipoValue = tipovalue;
                this.simbolos.push(simbolo);
                return [1,null];
            }

            return [-2,'we can\'t locate the variable, it\'s probably the variable doesn\'t exists'];

        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }
    }

}

class sym
{
    name:string;
    ambito:number;
    tipo:TypeSym;
    tipoValue:TypeValue;
    value:any;
    clase:TypeValue;

    constructor(name: string, ambito:number,value:any,tipo:TypeSym)
    {
        this.name = name;
        this.ambito = ambito;
        this.value = value;
        this.tipo = tipo;
    }
    update(new_value:any,atributo?:any,position?:any):any
    {
        try
        {
            if(atributo!=undefined && position == undefined)
            {
                let valor:types = this.value;
                valor.setValueAtributo(atributo,new_value);
                this.value = valor;
                return [1,null];
            }
            else if(atributo==undefined && position != undefined)
            {
                let valor:arrays = this.value;
                valor.setValue(position,new_value);
                this.value = valor;
                return [1,null];
            }
            else
            {
                this.value = new_value;
                return [1,null];
            }
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }


    }
    getValue():any
    {
        return this.value;

    }
}

abstract class statement
{
    abstract type: TypeStatement;
    abstract StateCode: number;
    abstract linea:number;
    abstract execute(tablasimbolo:tablasimbolos): any[2];
    abstract traduction():string;
    abstract grahp():string;
}
enum TypeSym
{
    Variable,
    Funcion,
    class,
    const,
    let,
    var
}
enum TypeStatement
{
    NativeStatement,
    ControlStatement,
    IterationStatement,
    ExpresionStatement,
    FunctionStatement,
    DeclarationStatement,
    AssignationStatement,
    ReturnStatement,
    BreakStatement,
    ContinueStatement,
    SwichtStatement
}
enum Iteration
{
    DoWhile,
    While,
    For
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
    Array,
    type,
    Boolean,
    void,
    let,
    var,
    const,
    null
}
enum NativeArray
{
    Nothing,
    Push,
    Pop,
    Length
}
enum typeAssigment
{
    igual,
    suma,
    resta,
    multiplicacion,
    potencia,
    modulo,
    division
}
enum increments
{
    postincrement,
    postdecrement,
    preincreement,
    predecrement

}

class SwitchStatement extends statement
{
    StateCode: number;
    linea: number;
    type: TypeStatement;
    cases:statement[];
    val:statement;
    default:statement;
    value:any;
    constructor() {
        super();
        this.cases = [];
        this.default = null;
        this.value = [];
    }

    execute(tablasimbolo1: tablasimbolos): any {
        try
        {
            this.value = [];
            //console.log(this);
            let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1,false);
            let state = 5;
            for(let statements of this.cases)
            {
                if(statements instanceof cases)
                {

                        statements.val = this.val;
                        let value = statements.execute(tablasimbolo);
                        switch (value[0])
                        {
                            case -2: //-> error instanciar variable
                                return value
                            case -1: //-> error
                                return value
                            case 0: //-> finalizado
                                state = 0;
                                if(value[1] != null)
                                {
                                    if(value[1] instanceof Array)
                                    {
                                        for(let m of value[1])
                                        {
                                            this.value.push(m);
                                        }
                                    }
                                    else
                                    {
                                        this.value.push(value[1]);
                                    }
                                }
                                break;
                            case 1: //-> sin errores
                                state = 1;
                                if(value[1] != null)
                                {
                                    if(value[1] instanceof Array)
                                    {
                                        for(let m of value[1])
                                        {
                                            this.value.push(m);
                                        }
                                    }
                                    else
                                    {
                                        this.value.push(value[1]);
                                    }
                                }
                                break;
                            case 2: //-> sin errores, break

                                return [2,this.value];
                            case 3: //-> sin errores, continue
                                return [3,this.value];
                            case 4: //-> sin errores, return
                                return [4,value[1]];
                            case 5:
                                state = 5;
                                break;
                        }
                }
            }
            if(state == 5 && this.default != null)
            {
                let value = this.default.execute(tablasimbolo);
                switch (value[0])
                {
                    case -2: //-> error instanciar variable
                        return value
                    case -1: //-> error
                        return value
                    case 0: //-> finalizado
                        state = 0;
                        if(value[1] != null)
                        {
                            if(value[1] instanceof Array)
                            {
                                for(let m of value[1])
                                {
                                    this.value.push(m);
                                }
                            }
                            else
                            {
                                this.value.push(value[1]);
                            }
                        }
                        break;
                    case 1: //-> sin errores
                        state = 1;
                        if(value[1] != null)
                        {
                            if(value[1] instanceof Array)
                            {
                                for(let m of value[1])
                                {
                                    this.value.push(m);
                                }
                            }
                            else
                            {
                                this.value.push(value[1]);
                            }
                        }
                        break;
                    case 2: //-> sin errores, break
                        return [2,null];
                    case 3: //-> sin errores, continue
                        return [3,null];
                    case 4: //-> sin errores, return
                        return [4,value[1]];
                }
            }
            return [state,this.value]
        }
        catch (e) {
            return [-1, 'Unexpected error, we cannot find the error...']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class cases extends statement
{
    StateCode: number;
    linea: number;
    type: TypeStatement;
    value:any;
    val:statement;
    ValueExpression: statement;
    body:statement[];
    constructor() {
        super();
        this.val = null;
        this.ValueExpression = null;
        this.body = [];
        this.value = [];
    }

    execute(tablasimbolo: tablasimbolos): any {
        try
        {
            this.value = []
            let valInitial1:RelationalExpression = new RelationalExpression();
            valInitial1.type = TypeStatement.ExpresionStatement;
            valInitial1.Function = RelationalExpr.Igual;
            valInitial1.Expression1 = this.val;
            valInitial1.Expression2 = this.ValueExpression;

            let valInitial = valInitial1.execute(tablasimbolo);
            //console.log(valInitial);
            if(valInitial[0]<0) return [-1,null];
            if(valInitial[1])
            {
                for(let statement0 of this.body)
                {
                    let value = statement0.execute(tablasimbolo);
                    //console.log(value);
                    switch (value[0])
                    {
                        case -2: //-> error instanciar variable
                            return value
                        case -1: //-> error
                            return value
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            if(value[1] != null)
                            {
                                if(value[1] instanceof Array)
                                {
                                    for(let m of value[1])
                                    {
                                        this.value.push(m);
                                    }
                                }
                                else
                                {
                                    this.value.push(value[1]);
                                }
                            }
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            if(value[1] != null)
                            {
                                if(value[1] instanceof Array)
                                {
                                    for(let m of value[1])
                                    {
                                        this.value.push(m);
                                    }
                                }
                                else
                                {
                                    this.value.push(value[1]);
                                }
                            }
                            break;
                        case 2: //-> sin errores, break
                            return [2,this.value];
                        case 3: //-> sin errores, continue
                            return [3,this.value];
                        case 4: //-> sin errores, return
                            return [4,value[1]];
                    }
                }
            }
            if(this.StateCode ==1 || this.StateCode == 0) return [1,this.value]
            return [5,null]
        }
        catch (e) {
            //console.log(e);
            return [-1, 'Unexpected Error, we cannot find the error...']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class defaults extends statement
{
    StateCode: number;
    linea: number;
    type: TypeStatement;
    value:any;
    body:statement[];

    constructor() {
        super();
        this.body = [];
        this.value = [];
    }

    execute(tablasimbolo: tablasimbolos): any {
        try
        {
            this.value = [];
            for(let statement0 of this.body)
            {
                let value = statement0.execute(tablasimbolo);
                switch (value[0])
                {
                    case -2: //-> error instanciar variable
                        return value
                    case -1: //-> error
                        return value
                    case 0: //-> finalizado
                        this.StateCode = 0;
                        if(value[1] != null)
                        {
                            if(value[1] instanceof Array)
                            {
                                for(let m of value[1])
                                {
                                    this.value.push(m);
                                }
                            }
                            else
                            {
                                this.value.push(value[1]);
                            }
                        }
                        break;
                    case 1: //-> sin errores
                        this.StateCode = 1;
                        if(value[1] != null)
                        {
                            if(value[1] instanceof Array)
                            {
                                for(let m of value[1])
                                {
                                    this.value.push(m);
                                }
                            }
                            else
                            {
                                this.value.push(value[1]);
                            }
                        }
                        break;
                    case 2: //-> sin errores, break
                        return [2,this.value];
                    case 3: //-> sin errores, continue
                        return [3,this.value];
                    case 4: //-> sin errores, return
                        return [4,value[1]];
                }
            }
            return [1,this.value];
        }
        catch (e) {
            return [-1,'Unexpected Error, we cannot find the error']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class autoincrements extends statement
{
    StateCode: number;
    type: TypeStatement;
    linea:number;
    name:expression;
    atributo:string[];
    position:statement[];
    Assigment:increments;
    isArr:boolean;
    value:any;
    firstArr: boolean;


    execute(tablasimbolo): any[2] {
        try
        {
            let positions:any = [];
            for(let valss of this.position)
            {
                positions.push(valss);
            }
            let atributos:any = [];
            for(let valss of this.atributo)
            {
                atributos.push(valss);
            }
            if(this.atributo.length>0 && this.position.length>0)
            {
                if(this.isArr&&this.firstArr)
                {
                    //array with type in object
                    let simbolo = tablasimbolo.getsym(this.name.name);
                    if (simbolo[0] > 0)
                    {
                        let simbolito:sym = simbolo[1];
                        if(simbolito.getValue() instanceof arrays)
                        {
                            let arrs:arrays = simbolito.getValue();
                            let atrs = arrs.getValue(positions,tablasimbolo);
                            if(atrs instanceof types)
                            {
                                let valesito = atrs.getValuesAtributo(atributos,tablasimbolo)[1]
                                let newvalue = new ArichmeticExpression();
                                let old = valesito;
                                switch (this.Assigment)
                                {
                                    case increments.postincrement:
                                        let numero:Numbers = new Numbers();
                                        numero.value = 1;
                                        numero.tipoValue = TypeValue.Number;
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero;
                                        newvalue.Function = ArichmeticExpr.suma;
                                        newvalue.linea = this.linea
                                        let val5 = newvalue.execute(tablasimbolo);
                                        if(val5[0]>0)
                                        {
                                            let numero:Numbers = new Numbers();
                                            numero.value = Number(val5[1]);
                                            numero.tipoValue = TypeValue.Number;
                                            let m =  this.operateArrAtr(arrs,tablasimbolo,this.position,this.atributo,numero)
                                            if(m[0]>0)
                                            {
                                                let k = tablasimbolo.update(this.name.name,m[1])
                                                if(k[0]>0) return [1,valesito]
                                            }
                                            return [-1,null]
                                        }
                                        else
                                        {
                                            return [-1,null];
                                        }
                                    case increments.preincreement:
                                        let numero1:Numbers = new Numbers();
                                        numero1.value = 1;
                                        numero1.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo)
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero1;
                                        newvalue.Function = ArichmeticExpr.suma;
                                        newvalue.linea = this.linea
                                        let val4 = newvalue.execute(tablasimbolo);
                                        if(val4[0]>0)
                                        {
                                            let numero:Numbers = new Numbers();
                                            numero.value = Number(val4[1]);
                                            numero.tipoValue = TypeValue.Number;
                                            let m =  this.operateArrAtr(arrs,tablasimbolo,this.position,this.atributo,numero)
                                            if(m[0]>0)
                                            {
                                                let k = tablasimbolo.update(this.name.name,m[1])
                                                if(k[0]>0) return [1,numero]
                                            }
                                            return [-1,null]
                                        }
                                        else
                                        {
                                            return [-1,null];
                                        }
                                    case increments.postdecrement:
                                        let numero2:Numbers = new Numbers();
                                        numero2.value = 1;
                                        numero2.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo)
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero2;
                                        newvalue.Function = ArichmeticExpr.resta;
                                        newvalue.linea = this.linea
                                        let val3 = newvalue.execute(tablasimbolo);
                                        if(val3[0]>0)
                                        {
                                            let numero:Numbers = new Numbers();
                                            numero.value = Number(val3[1]);
                                            numero.tipoValue = TypeValue.Number;
                                            let m =  this.operateArrAtr(arrs,tablasimbolo,this.position,this.atributo,numero)
                                            if(m[0]>0)
                                            {
                                                let k = tablasimbolo.update(this.name.name,m[1])
                                                if(k[0]>0) return [1,valesito]
                                            }
                                            return [-1,null]
                                        }
                                        else
                                        {
                                            return [-1,null];
                                        }
                                    case increments.predecrement:
                                        let numero3:Numbers = new Numbers();
                                        numero3.value = 1;
                                        numero3.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo)
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero3;
                                        newvalue.Function = ArichmeticExpr.resta;
                                        newvalue.linea = this.linea
                                        let val2 = newvalue.execute(tablasimbolo);
                                        if(val2[0]>0)
                                        {
                                            let numero:Numbers = new Numbers();
                                            numero.value = Number(val2[1]);
                                            numero.tipoValue = TypeValue.Number;
                                            let m =  this.operateArrAtr(arrs,tablasimbolo,this.position,this.atributo,numero)
                                            if(m[0]>0)
                                            {
                                                let k = tablasimbolo.update(this.name.name,m[1])
                                                if(k[0]>0) return [1,numero]
                                            }
                                            return [-1,null]
                                        }
                                        else
                                        {
                                            return [-1,null];
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
                else
                {
                    //type with array
                    let simbolo = tablasimbolo.getsym(this.name.name);
                    if (simbolo[0] > 0)
                    {
                        let simbolito:sym = simbolo[1];
                        if(simbolito.getValue() instanceof types)
                        {
                            let arrs:types = simbolito.getValue();
                            let arrt = arrs.getValuesAtributo(atributos,tablasimbolo);
                            if(arrt instanceof arrays)
                            {
                                let valesito = arrt.getValue(positions,tablasimbolo)[1]
                                let newvalue = new ArichmeticExpression();
                                let old = valesito;
                                switch (this.Assigment)
                                {
                                    case increments.postincrement:
                                        let numero:Numbers = new Numbers();
                                        numero.value = 1;
                                        numero.tipoValue = TypeValue.Number;
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero;
                                        newvalue.Function = ArichmeticExpr.suma;
                                        newvalue.linea = this.linea
                                        let val5 = newvalue.execute(tablasimbolo);
                                        if(val5[0]>0)
                                        {
                                            let numero:Numbers = new Numbers();
                                            numero.value = Number(val5[1]);
                                            numero.tipoValue = TypeValue.Number;
                                            let m =  this.operateAtrArr(arrs,tablasimbolo,this.atributo,this.position,numero);
                                            if(m[0]>0)
                                            {
                                                let k = tablasimbolo.update(this.name.name,m[1])
                                                if(k[0]>0) return [1,valesito]
                                            }
                                            return [-1,null]
                                        }
                                        else
                                        {
                                            return [-1,null];
                                        }
                                    case increments.preincreement:
                                        let numero1:Numbers = new Numbers();
                                        numero1.value = 1;
                                        numero1.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo)
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero1;
                                        newvalue.Function = ArichmeticExpr.suma;
                                        newvalue.linea = this.linea
                                        let val4 = newvalue.execute(tablasimbolo);
                                        if(val4[0]>0)
                                        {
                                            let numero:Numbers = new Numbers();
                                            numero.value = Number(val4[1]);
                                            numero.tipoValue = TypeValue.Number;
                                            let m =  this.operateAtrArr(arrs,tablasimbolo,this.atributo,this.position,numero);
                                            if(m[0]>0)
                                            {
                                                let k = tablasimbolo.update(this.name.name,m[1])
                                                if(k[0]>0) return [1,numero]
                                            }
                                            return [-1,null]
                                        }
                                        else
                                        {
                                            return [-1,null];
                                        }
                                    case increments.postdecrement:
                                        let numero2:Numbers = new Numbers();
                                        numero2.value = 1;
                                        numero2.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo)
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero2;
                                        newvalue.Function = ArichmeticExpr.resta;
                                        newvalue.linea = this.linea
                                        let val3 = newvalue.execute(tablasimbolo);
                                        if(val3[0]>0)
                                        {
                                            let numero:Numbers = new Numbers();
                                            numero.value = Number(val3[1]);
                                            numero.tipoValue = TypeValue.Number;
                                            let m =  this.operateAtrArr(arrs,tablasimbolo,this.atributo,this.position,numero);
                                            if(m[0]>0)
                                            {
                                                let k = tablasimbolo.update(this.name.name,m[1])
                                                if(k[0]>0) return [1,valesito]
                                            }
                                            return [-1,null]
                                        }
                                        else
                                        {
                                            return [-1,null];
                                        }
                                    case increments.predecrement:
                                        let numero3:Numbers = new Numbers();
                                        numero3.value = 1;
                                        numero3.tipoValue = TypeValue.Number;
                                        old = this.name.execute(tablasimbolo)
                                        newvalue.Expression1 = this.name;
                                        newvalue.Expression2 = numero3;
                                        newvalue.Function = ArichmeticExpr.resta;
                                        newvalue.linea = this.linea
                                        let val2 = newvalue.execute(tablasimbolo);
                                        if(val2[0]>0)
                                        {
                                            let numero:Numbers = new Numbers();
                                            numero.value = Number(val2[1]);
                                            numero.tipoValue = TypeValue.Number;
                                            let m =  this.operateAtrArr(arrs,tablasimbolo,this.atributo,this.position,numero);
                                            if(m[0]>0)
                                            {
                                                let k = tablasimbolo.update(this.name.name,m[1])
                                                if(k[0]>0) return [1,numero]
                                            }
                                            return [-1,null]
                                        }
                                        else
                                        {
                                            return [-1,null];
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
            else if(this.atributo.length>0)
            {

                let simbolo = tablasimbolo.getsym(this.name.name);
                if (simbolo[0] > 0) {
                    let simbolito: sym = simbolo[1];
                    if (simbolito.getValue() instanceof types) {
                        let atr: types = simbolito.getValue();
                        let valesito = atr.getValuesAtributo(atributos,tablasimbolo)[1];

                        let newvalue = new ArichmeticExpression();
                        let old = valesito;
                        switch (this.Assigment)
                        {
                            case increments.postincrement:
                                let numero:Numbers = new Numbers();
                                numero.value = 1;
                                numero.tipoValue = TypeValue.Number;
                                newvalue.Expression1 = this.name;
                                newvalue.Expression2 = numero;
                                newvalue.Function = ArichmeticExpr.suma;
                                newvalue.linea = this.linea
                                let val5 = newvalue.execute(tablasimbolo);
                                if(val5[0]>0)
                                {
                                    let numero:Numbers = new Numbers();
                                    numero.value = Number(val5[1]);
                                    numero.tipoValue = TypeValue.Number;
                                    let m =  this.operateAtr(atr, tablasimbolo, this.atributo, numero);
                                    if(m[0]>0)
                                    {
                                        let k = tablasimbolo.update(this.name.name,atr)
                                        if(k[0]>0) return [1,valesito]
                                    }
                                    return [-1,null]
                                }
                                else
                                {
                                    return [-1,null];
                                }
                            case increments.preincreement:
                                let numero1:Numbers = new Numbers();
                                numero1.value = 1;
                                numero1.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo)
                                newvalue.Expression1 = this.name;
                                newvalue.Expression2 = numero1;
                                newvalue.Function = ArichmeticExpr.suma;
                                newvalue.linea = this.linea
                                let val4 = newvalue.execute(tablasimbolo);
                                if(val4[0]>0)
                                {
                                    let numero:Numbers = new Numbers();
                                    numero.value = Number(val4[1]);
                                    numero.tipoValue = TypeValue.Number;
                                    let m =  this.operateAtr(atr, tablasimbolo, this.atributo, numero);
                                    if(m[0]>0)
                                    {
                                        let k = tablasimbolo.update(this.name.name,atr)
                                        if(k[0]>0) return [1,numero]
                                    }
                                    return [-1,null]
                                }
                                else
                                {
                                    return [-1,null];
                                }
                            case increments.postdecrement:
                                let numero2:Numbers = new Numbers();
                                numero2.value = 1;
                                numero2.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo)
                                newvalue.Expression1 = this.name;
                                newvalue.Expression2 = numero2;
                                newvalue.Function = ArichmeticExpr.resta;
                                newvalue.linea = this.linea
                                let val3 = newvalue.execute(tablasimbolo);
                                if(val3[0]>0)
                                {
                                    let numero:Numbers = new Numbers();
                                    numero.value = Number(val3[1]);
                                    numero.tipoValue = TypeValue.Number;
                                    let m =  this.operateAtr(atr, tablasimbolo, this.atributo, numero);
                                    if(m[0]>0)
                                    {
                                        let k = tablasimbolo.update(this.name.name,atr)
                                        if(k[0]>0) return [1,valesito]
                                    }
                                    return [-1,null]
                                }
                                else
                                {
                                    return [-1,null];
                                }
                            case increments.predecrement:
                                let numero3:Numbers = new Numbers();
                                numero3.value = 1;
                                numero3.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo)
                                newvalue.Expression1 = this.name;
                                newvalue.Expression2 = numero3;
                                newvalue.Function = ArichmeticExpr.resta;
                                newvalue.linea = this.linea
                                let val2 = newvalue.execute(tablasimbolo);
                                if(val2[0]>0)
                                {
                                    let numero:Numbers = new Numbers();
                                    numero.value = Number(val2[1]);
                                    numero.tipoValue = TypeValue.Number;
                                    let m =  this.operateAtr(atr, tablasimbolo, this.atributo, numero);
                                    if(m[0]>0)
                                    {
                                        let k = tablasimbolo.update(this.name.name,atr)
                                        if(k[0]>0) return [1,numero]
                                    }
                                    return [-1,null]
                                }
                                else
                                {
                                    return [-1,null];
                                }
                        }
                    }
                }
            }
            else if(this.position.length>0)
            {
                let simbolo = tablasimbolo.getsym(this.name.name);
                if (simbolo[0] > 0)
                {
                    let simbolito:sym = simbolo[1];
                    if(simbolito.getValue() instanceof arrays)
                    {
                        let arrs:arrays = simbolito.getValue();
                        let valesito = arrs.getValue(positions,tablasimbolo)[1]
                        let newvalue = new ArichmeticExpression();
                        let old = valesito;
                        switch (this.Assigment)
                        {
                            case increments.postincrement:
                                let numero:Numbers = new Numbers();
                                numero.value = 1;
                                numero.tipoValue = TypeValue.Number;
                                newvalue.Expression1 = valesito;
                                newvalue.Expression2 = numero;
                                newvalue.Function = ArichmeticExpr.suma;
                                newvalue.linea = this.linea
                                let val5 = newvalue.execute(tablasimbolo);
                                if(val5[0]>0)
                                {
                                    let numero:Numbers = new Numbers();
                                    numero.value = Number(val5[1]);
                                    numero.tipoValue = TypeValue.Number;
                                    let m =  arrs.setValue(tablasimbolo,this.position,numero);
                                    if(m[0]>0)
                                    {
                                        let k = tablasimbolo.update(this.name.name,arrs)
                                        if(k[0]>0) return [1,valesito]
                                    }
                                    return [-1,null]
                                }
                                else
                                {
                                    return [-1,null];
                                }
                            case increments.preincreement:
                                let numero1:Numbers = new Numbers();
                                numero1.value = 1;
                                numero1.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo)
                                newvalue.Expression1 = valesito;
                                newvalue.Expression2 = numero1;
                                newvalue.Function = ArichmeticExpr.suma;
                                newvalue.linea = this.linea
                                let val4 = newvalue.execute(tablasimbolo);
                                if(val4[0]>0)
                                {
                                    let numero:Numbers = new Numbers();
                                    numero.value = Number(val4[1]);
                                    numero.tipoValue = TypeValue.Number;
                                    let m =  arrs.setValue(tablasimbolo,this.position,numero);
                                    if(m[0]>0)
                                    {
                                        let k = tablasimbolo.update(this.name.name,arrs)
                                        if(k[0]>0) return [1,numero]
                                    }
                                    return [-1,null]
                                }
                                else
                                {
                                    return [-1,null];
                                }
                            case increments.postdecrement:
                                let numero2:Numbers = new Numbers();
                                numero2.value = 1;
                                numero2.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo)
                                newvalue.Expression1 = valesito;
                                newvalue.Expression2 = numero2;
                                newvalue.Function = ArichmeticExpr.resta;
                                newvalue.linea = this.linea
                                let val3 = newvalue.execute(tablasimbolo);
                                if(val3[0]>0)
                                {
                                    let numero:Numbers = new Numbers();
                                    numero.value = Number(val3[1]);
                                    numero.tipoValue = TypeValue.Number;
                                    let m =  arrs.setValue(tablasimbolo,this.position,numero);
                                    if(m[0]>0)
                                    {
                                        let k = tablasimbolo.update(this.name.name,arrs)
                                        if(k[0]>0) return [1,valesito]
                                    }
                                    return [-1,null]
                                }
                                else
                                {
                                    return [-1,null];
                                }
                            case increments.predecrement:
                                let numero3:Numbers = new Numbers();
                                numero3.value = 1;
                                numero3.tipoValue = TypeValue.Number;
                                old = this.name.execute(tablasimbolo)
                                newvalue.Expression1 = valesito;
                                newvalue.Expression2 = numero3;
                                newvalue.Function = ArichmeticExpr.resta;
                                newvalue.linea = this.linea
                                let val2 = newvalue.execute(tablasimbolo);
                                if(val2[0]>0)
                                {
                                    let numero:Numbers = new Numbers();
                                    numero.value = Number(val2[1]);
                                    numero.tipoValue = TypeValue.Number;
                                    let m =  arrs.setValue(tablasimbolo,this.position,numero);
                                    if(m[0]>0)
                                    {
                                        let k = tablasimbolo.update(this.name.name,arrs)
                                        if(k[0]>0) return [1,numero]
                                    }
                                    return [-1,null]
                                }
                                else
                                {
                                    return [-1,null];
                                }
                                }

                    }
                }
            }
            else
            {

                switch (this.Assigment)
                {
                    case increments.postincrement:
                            let numero:Numbers = new Numbers();
                            numero.value = 1;
                            numero.tipoValue = TypeValue.Number;
                            let old = this.name.execute(tablasimbolo)
                            let newvalue5 = new ArichmeticExpression();
                            newvalue5.Expression1 = this.name;
                            newvalue5.Expression2 = numero;
                            newvalue5.Function = ArichmeticExpr.suma;
                            newvalue5.linea = this.linea
                            let val5 = newvalue5.execute(tablasimbolo);
                            if(val5[0]>0)
                            {
                                let result5 = tablasimbolo.update(this.name.name,val5[1]);
                                if(result5[0]>0) return[1,old[1]];
                                return [-1,null];
                            }
                            else
                            {
                                return [-1,null];
                            }
                    case increments.preincreement:
                        let numero1:Numbers = new Numbers();
                        numero1.value = 1;
                        numero1.tipoValue = TypeValue.Number;
                        let old1 = this.name.execute(tablasimbolo)
                        let newvalue4 = new ArichmeticExpression();
                        newvalue4.Expression1 = this.name;
                        newvalue4.Expression2 = numero1;
                        newvalue4.Function = ArichmeticExpr.suma;
                        newvalue4.linea = this.linea
                        let val4 = newvalue4.execute(tablasimbolo);
                        if(val4[0]>0)
                        {
                            let result5 = tablasimbolo.update(this.name.name,val4[1]);
                            if(result5[0]>0) return[1,val4[1]];
                            return [-1,null];
                        }
                        else
                        {
                            return [-1,null];
                        }
                    case increments.postdecrement:
                        let numero2:Numbers = new Numbers();
                        numero2.value = 1;
                        numero2.tipoValue = TypeValue.Number;
                        let old2 = this.name.execute(tablasimbolo)
                        let newvalue3 = new ArichmeticExpression();
                        newvalue3.Expression1 = this.name;
                        newvalue3.Expression2 = numero2;
                        newvalue3.Function = ArichmeticExpr.resta;
                        newvalue3.linea = this.linea
                        let val3 = newvalue3.execute(tablasimbolo);
                        if(val3[0]>0)
                        {
                            let result5 = tablasimbolo.update(this.name.name,val3[1]);
                            if(result5[0]>0) return[1,old2[1]];
                            return [-1,null];
                        }
                        else
                        {
                            return [-1,null];
                        }
                    case increments.predecrement:
                        let numero3:Numbers = new Numbers();
                        numero3.value = 1;
                        numero3.tipoValue = TypeValue.Number;
                        let old3 = this.name.execute(tablasimbolo)
                        let newvalue2 = new ArichmeticExpression();
                        newvalue2.Expression1 = this.name;
                        newvalue2.Expression2 = numero3;
                        newvalue2.Function = ArichmeticExpr.resta;
                        newvalue2.linea = this.linea
                        let val2 = newvalue2.execute(tablasimbolo);
                        if(val2[0]>0)
                        {
                            let result5 = tablasimbolo.update(this.name.name,val2[1]);
                            if(result5[0]>0) return[1,val2[1]];
                            return [-1,null];
                        }
                        else
                        {
                            return [-1,null];
                        }
                }
            }
            return [-1,null]
        }
        catch (e) {
            return [-2,null]
        }

    }

    operateArrAtr(objeto:arrays,tablasimbolo:tablasimbolos,position:statement[],atributos:string[],value:any)
    {
        try
        {
            let tp = position.pop();
            if(tp instanceof statement)
            {
                let tpr = tp.execute(tablasimbolo);
                if(tpr[0]>0)
                {
                    if(tpr[1] instanceof Number)
                    {
                        if(position.length>0)
                        {
                            let arr = objeto.get(Number(tpr[1]));
                            if(arr[0]>0)
                            {
                                let arrsub = this.operateArrAtr(arr[1],tablasimbolo,position,atributos,value);
                                if(arrsub[0]>0)
                                {
                                    let result = objeto.set(Number(tpr[1]),arrsub[1]);
                                    if(result[0]>0)
                                    {
                                        return [1,objeto];
                                    }
                                }
                            }
                        }
                        else
                        {

                            let arr0 = objeto.get(Number(tpr[1]));
                            if(arr0[0]>0)
                            {
                                if(arr0[1] instanceof types)
                                {
                                    let arr = this.operateAtr(arr0[1],tablasimbolo,atributos,value);
                                    if(arr[0]>0)
                                    {
                                        let resultf = objeto.set(Number(tpr[1]),arr[1]);
                                        if(resultf[0]>0)
                                        {
                                            return [1,objeto];
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
            return [-1,null]
        }
        catch (e) {
            return [-1,null]
        }
    }

    operateAtrArr(objeto:types,tablasimbolo:tablasimbolos,atributos:string[],position:statement[],value:any):any
    {
        try
        {
            let atr = atributos.pop();
            if(atributos.length>0)
            {
                let atrsub0 = objeto.getValueAtributo(atr);
                if(atrsub0[0]>0)
                {
                    if(atrsub0[1] instanceof types)
                    {
                        let atrsub = this.operateAtrArr(atrsub0[1],tablasimbolo,atributos,position,value);
                        if(atrsub[0]>0)
                        {
                            let rsult = objeto.setValueAtributo(atr,atrsub[1]);
                            if(rsult[0]>0)
                            {
                                return [1,objeto];
                            }
                        }
                    }
                }
            }
            else
            {
                let arrs = objeto.getValueAtributo(atr);
                if(arrs[0]>0)
                {
                    if(arrs[1] instanceof arrays)
                    {
                        let atrs = this.operateArr(arrs[1],tablasimbolo,position,value);
                        if(atrs[0]>0)
                        {
                            let atratr  = objeto.setValueAtributo(atr,atrs[1]);
                            if(atratr[0]>0)
                            {
                                return [1,objeto];
                            }
                        }
                    }
                }
            }
            return [-1,null]
        }
        catch (e) {
            return [-1, null]
        }
    }

    operateAtr(objeto:types,tablasimbolo:tablasimbolos,atributos:string[],value:any):any
    {
        try
        {
            let atr = atributos.pop();
            if(atributos.length>0)
            {
                let atrsub0 = objeto.getValueAtributo(atr);
                if(atrsub0[0]>0)
                {
                    if(atrsub0[1] instanceof types)
                    {
                        let atrsub = this.operateAtr(atrsub0[1],tablasimbolo,atributos,value);
                        if(atrsub[0]>0)
                        {
                            let rsult = objeto.setValueAtributo(atr,atrsub[1]);
                            if(rsult[0]>0)
                            {
                                return [1,objeto];
                            }
                        }
                    }
                }
            }
            else
            {
                /*
                let atratr  = objeto.setValueAtributo(atr,value);
                if(atratr[0]>0)
                {
                    return [1,objeto];
                }
                */
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
                        let val0 = arichmetic.execute(tablasimbolo);
                        if(val0[0]!=-1)
                        {
                            let arr0 = objeto.setValueAtributo(atr,val0[1]);
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
                            let arr0 = objeto.setValueAtributo(atr,val1[1]);
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
                            let arr0 = objeto.setValueAtributo(atr,val2[1]);
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
                            let arr0 = objeto.setValueAtributo(atr,val3[1]);
                            this.value = val3[1];
                            if(arr0[0]>0) return[1,objeto];
                            return [-1,null];
                        }
                        else
                        {
                            return [-1,null];
                        }
                }
            }
            return [-1,null]
        }
        catch (e) {
            return [-1, null]
        }
    }

    operateArr(objeto:arrays,tablasimbolo:tablasimbolos,position:statement[],value:any):any
    {
        try
        {
            let tp = position.pop();
            if(tp instanceof statement)
            {
                let tpr = tp.execute(tablasimbolo);
                if(tpr[0]>0)
                {
                    if(tpr[1] instanceof Number)
                    {
                        if(position.length>0)
                        {
                            let arr = objeto.get(Number(tpr[1]));
                            if(arr[0]>0)
                            {
                                let arrsub = this.operateArr(arr[1],tablasimbolo,position,value);
                                if(arrsub[0]>0)
                                {
                                    let result = objeto.set(Number(tpr[1]),arrsub[1]);
                                    if(result[0]>0)
                                    {
                                        return [1,objeto];
                                    }
                                }
                            }
                        }
                        else
                        {
                            /*
                            let arr = objeto.set(Number(tpr[1]),value);
                            if(arr[0]>0)
                            {
                                return [1,objeto];
                            }
                            */

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
                                    let val0 = arichmetic.execute(tablasimbolo);
                                    if(val0[0]!=-1)
                                    {
                                        let arr0 = objeto.set(Number(tpr[1]),val0[1]);
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
                                        let arr0 = objeto.set(Number(tpr[1]),val1[1]);
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
                                        let arr0 = objeto.set(Number(tpr[1]),val2[1]);
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
                                        let arr0 = objeto.set(Number(tpr[1]),val3[1]);
                                        this.value = val3[1];
                                        if(arr0[0]>0) return[1,objeto];
                                        return [-1,null];
                                    }
                                    else
                                    {
                                        return [-1,null];
                                    }
                            }
                        }
                    }
                }
            }
            return [-1,null]
        }
        catch (e) {
            return [-1,null]
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class arrays extends statement
{
    StateCode: number;
    type: TypeStatement;
    tipoValue:TypeValue;
    values:any[];
    val:any;
    size:number;

    execute(): any
    {
        return [1,this];
    }

    getValue(position:any[],tablasimbolo:tablasimbolos)
    {
        try {
            let a:expression = position.pop();
            let result = a.execute(tablasimbolo);
            if(result[0]>0)
            {
                if(position.length>0)
                {
                    return this.getValorA(position,this.values[result[1]],tablasimbolo);
                }
                else
                {
                    return [1,this.values[result[1]]]
                }
            }
        }
        catch (e) {
            return [-1,null]
        }
    }
    getValorA(position:any[],objeto,tablasimbolo:tablasimbolos)
    {
        try {
            let a:expression = position.pop();
            let result = a.execute(tablasimbolo);
            if(result[0]>0)
            {
                if(position.length>0)
                {
                    return this.getValorA(position,objeto[result[1]],tablasimbolo);
                }
                else
                {
                    return [1,objeto[result[1]]]
                }
            }
        }
        catch (e) {
            return [-1,null]
        }
    }
    getAll()
    {
        return this.values;
    }

    get(position:number)
    {
        let a = 0;
        for(let value of this.values)
        {
            if(a==position)
            {
                return [1,value];
            }
            a++;
        }
        return [-1,null]
    }

    setValue(tablasimbolo:tablasimbolos,position:any[],value?:statement):any
    {
        try {
            if(position instanceof Array)
            {
                if(value == null)
                {
                    let a:expression = position.pop();
                    let result = a.execute(tablasimbolo);
                    if(result[0]>0)
                    {
                        if(position.length>0)
                        {
                            let tt = this.setValorA(tablasimbolo,this.values[result[1]],position,null);
                            if(tt[0]>0)
                            {
                                this.values[result[1]] = tt[1];
                                return [1,null];
                            }
                            else
                            {
                                return [-1,null];
                            }
                        }
                        else
                        {
                            this.values[result[1]] = this.val;
                            return [1,null];
                        }
                    }
                    else
                    {
                        return [-1,null]
                    }
                }
                else
                {
                    if(value instanceof  statement)
                    {
                        let vals = value.execute(tablasimbolo);
                        if(vals[0]>0)
                        {
                            let a:expression = position.pop();
                            let result = a.execute(tablasimbolo);
                            if(result[0]>0)
                            {
                                if(position.length>0)
                                {
                                    let tt = this.setValorA(tablasimbolo,this.values[result[1]],position,vals[1]);
                                    if(tt[0]>0)
                                    {
                                        this.values[result[1]] = tt[1];
                                        return [1,null];
                                    }
                                    else
                                    {
                                        return [-1,null];
                                    }
                                }
                                else
                                {
                                    this.values[result[1]] = vals[1];
                                    return [1,null];
                                }
                            }
                            else
                            {
                                return [-1,null]
                            }
                        }
                        else
                        {
                            return [-1,null]
                        }
                    }

                }
            }
            return [-1,null]

        }
        catch (e) {
            return[-1,null]
        }
    }

    setValorA(tablasimbolo:tablasimbolos,objeto,position:any,value):any
    {
        try {

            if(objeto.length != undefined)
            {
                let vals = value.execute(tablasimbolo);
                if(vals[0]>0)
                {
                    var a = <expression> position.pop();
                    let result = a.execute(tablasimbolo);
                    if(result[0]>0)
                    {

                        if(position.length>0)
                        {
                            let tt = this.setValorA(tablasimbolo,objeto[result[1]],position,vals[1]);
                            if(tt[0]>0)
                            {
                                objeto[result[1]] = tt[1];
                                return [1,objeto];
                            }
                            else
                            {
                                return [-1,null];
                            }
                        }
                        else
                        {
                            objeto[result[1]] == vals[1];
                            return [1,objeto];
                        }
                    }
                    else
                    {
                        return [-1,null]
                    }
                }
                else
                {
                    return [-1,null]
                }
            }
            else
            {
                return [-1,null]
            }

        }
        catch (e) {
            return [-1,null]
        }
    }

    set(position:number,value?:any)
    {
        try
        {
            for(var a=0; a<this.values.length;a++)
            {
                if(a==position)
                {
                    this.values[a] = value;
                    return [1,null];
                }
            }

            return [-1,null];
        }
        catch (e) {
            return [-1,null]
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

    push(value:any):any
    {
        try {
            this.values.push(value);
            return [1,null]
        }
        catch (e) {
            return [-1,null];
        }
    }
    pop():any
    {
        try {
            return [1,this.values.pop()];
        }
        catch (e) {
            return [-1,null]
        }
    }
    length():any
    {
        try {
            return this.values.length;
        }
        catch (e) {
            return -1
        }
    }

    linea: number;

}

/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

class Asignation extends statement
{
    StateCode: number;
    type: TypeStatement;
    linea:number;
    name:string;
    atributo:string[];
    position:statement[];
    Expression:statement;
    Assigment:typeAssigment;
    isArr:boolean;

    constructor() {
        super();
        this.atributo = [];
        this.position = [];
        this.isArr = false;
    }

    execute(tablasimbolo): any[2] {
        try
        {
            if(this.atributo.length>0 && this.position.length>0)
            {
                if(this.Assigment == typeAssigment.igual)
                {
                    let value = this.Expression.execute(tablasimbolo);
                    if(value[0]>0)
                    {
                        if(this.isArr)
                        {
                            //array with type in object
                            let simbolo = tablasimbolo.getsym(this.name);
                            if (simbolo[0] > 0)
                            {
                                let simbolito:sym = simbolo[1];
                                if(simbolito.getValue() instanceof arrays)
                                {
                                    let arrs:arrays = simbolito.getValue();
                                    let result = this.operateArrAtr(arrs,tablasimbolo,this.position,this.atributo,this.Expression);
                                    if(result[0]>0)
                                    {
                                        return tablasimbolo.update(this.name,result[1]);
                                    }
                                }
                            }

                        }
                        else
                        {
                            //type with array
                            let simbolo = tablasimbolo.getsym(this.name);
                            if (simbolo[0] > 0)
                            {
                                let simbolito:sym = simbolo[1];
                                if(simbolito.getValue() instanceof types)
                                {
                                    let arrs:types = simbolito.getValue();
                                    let result = this.operateAtrArr(arrs,tablasimbolo,this.atributo,this.position,this.Expression);
                                    if(result[0]>0)
                                    {
                                        return tablasimbolo.update(this.name,result[1]);
                                    }
                                }
                            }
                        }
                    }

                    return [-2,'We cannot apply the instruction, the object does not have the attribute or the position']
                }
                return [-1, 'cannot be aplied '+typeAssigment[this.Assigment]+', in the object']

            }
            else if(this.atributo.length>0)
            {
                if(this.Assigment == typeAssigment.igual)
                {
                    let value = this.Expression.execute(tablasimbolo);
                    if(value[0]>0)
                    {
                        let simbolo = tablasimbolo.getsym(this.name);
                        if(simbolo[0]>0)
                        {
                            let simbolito:sym = simbolo[1];
                            if(simbolito.getValue() instanceof types)
                            {
                                let atr:types = simbolito.getValue();
                                let val = this.operateAtr(atr,tablasimbolo,this.atributo,this.Expression);
                                if(val[0]>0)
                                {
                                    return tablasimbolo.update(this.name,atr);
                                }
                            }
                        }
                    }
                    return [-2,'We cannot apply the instruction, the object does not have the attribute']
                }
                return [-1, 'cannot be aplied '+typeAssigment[this.Assigment]+', in the object']

            }
            else if(this.position.length>0)
            {
                if(this.Assigment == typeAssigment.igual) {
                    let value = this.Expression.execute(tablasimbolo);
                    if (value[0] > 0) {
                        let simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0) {
                            let simbolito: sym = simbolo[1];
                            if (simbolito.getValue() instanceof arrays) {
                                let arrs: arrays = simbolito.getValue();
                                let k = arrs.setValue(tablasimbolo, this.position, this.Expression);
                                if (k[0] > 0) return tablasimbolo.update(this.name, arrs);

                            }
                        }
                    }
                    return [-2,'We cannot apply the instruction, the object does not have the position']
                }
                return [-1, 'cannot be aplied '+typeAssigment[this.Assigment]+', in the object']
            }
            else
            {

                    let newvalue = new ArichmeticExpression();
                    let valant:expression = new expression();
                    valant.name = this.name;
                    valant.linea = this.linea;
                    valant.type = TypeStatement.ExpresionStatement;
                    newvalue.Expression1 = valant;
                    switch (this.Assigment)
                    {
                        case typeAssigment.division:

                            newvalue.Expression2 = this.Expression;
                            newvalue.Function = ArichmeticExpr.division;
                            newvalue.linea = this.linea
                            let val5 = newvalue.execute(tablasimbolo);
                            if(val5[0]>0)
                            {
                                return tablasimbolo.update(this.name,val5[1]);
                            }
                            break;
                        case typeAssigment.igual:
                            let value = this.Expression.execute(tablasimbolo);
                            if(value[0]>0) {
                                return tablasimbolo.update(this.name, value[1]);
                            }
                            break;
                        case typeAssigment.modulo:
                            newvalue.Expression2 = this.Expression;
                            newvalue.Function = ArichmeticExpr.modulo;
                            newvalue.linea = this.linea
                            let val4 = newvalue.execute(tablasimbolo);
                            if(val4[0]>0)
                            {
                                return tablasimbolo.update(this.name,val4[1]);
                            }
                            break;
                        case typeAssigment.multiplicacion:
                            newvalue.Expression2 = this.Expression;
                            newvalue.Function = ArichmeticExpr.multiplicacion;
                            newvalue.linea = this.linea
                            let val3 = newvalue.execute(tablasimbolo);
                            if(val3[0]>0)
                            {
                                return tablasimbolo.update(this.name,val3[1]);
                            }
                            break;
                        case typeAssigment.potencia:
                            newvalue.Expression2 = this.Expression;
                            newvalue.Function = ArichmeticExpr.potenciacion;
                            newvalue.linea = this.linea
                            let val2 = newvalue.execute(tablasimbolo);
                            if(val2[0]>0)
                            {
                                return tablasimbolo.update(this.name,val2[1]);
                            }
                            break;
                        case typeAssigment.resta:
                            newvalue.Expression2 = this.Expression;
                            newvalue.Function = ArichmeticExpr.resta;
                            newvalue.linea = this.linea
                            let val1 = newvalue.execute(tablasimbolo);
                            if(val1[0]>0)
                            {
                                return tablasimbolo.update(this.name,val1[1]);
                            }
                            break;
                        case typeAssigment.suma:
                            newvalue.Expression2 = this.Expression;
                            newvalue.Function = ArichmeticExpr.suma;
                            newvalue.linea = this.linea
                            let val = newvalue.execute(tablasimbolo);
                            if(val[0]>0)
                            {
                                return  tablasimbolo.update(this.name,val[1]);
                            }
                            break;
                }
            }

            return [-1, 'cannot be aplied '+typeAssigment[this.Assigment]+', in the object']
        }
        catch (e) {
            //console.log(e)
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }

    }

    operateArrAtr(objeto:arrays,tablasimbolo:tablasimbolos,position:statement[],atributos:string[],value:any)
    {
        try
        {
            let tp = position.pop();
            if(tp instanceof statement)
            {
                let tpr = tp.execute(tablasimbolo);
                if(tpr[0]>0)
                {
                    if(tpr[1] instanceof Number)
                    {
                        if(position.length>0)
                        {
                            let arr = objeto.get(Number(tpr[1]));
                            if(arr[0]>0)
                            {
                                let arrsub = this.operateArrAtr(arr[1],tablasimbolo,position,atributos,value);
                                if(arrsub[0]>0)
                                {
                                    let result = objeto.set(Number(tpr[1]),arrsub[1]);
                                    if(result[0]>0)
                                    {
                                        return [1,objeto];
                                    }
                                }
                            }
                        }
                        else
                        {
                            let arr0 = objeto.get(Number(tpr[1]));
                            if(arr0[0]>0)
                            {
                                if(arr0[1] instanceof types)
                                {
                                    let arr = this.operateAtr(arr0[1],tablasimbolo,atributos,value);
                                    if(arr[0]>0)
                                    {
                                        let resultf = objeto.set(Number(tpr[1]),arr[1]);
                                        if(resultf[0]>0)
                                        {
                                            return [1,objeto];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return [-1,null]
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }
    }

    operateAtrArr(objeto:types,tablasimbolo:tablasimbolos,atributos:string[],position:statement[],value:any):any
    {
        try
        {
            let atr = atributos.pop();
            if(atributos.length>0)
            {
                let atrsub0 = objeto.getValueAtributo(atr);
                if(atrsub0[0]>0)
                {
                    if(atrsub0[1] instanceof types)
                    {
                        let atrsub = this.operateAtrArr(atrsub0[1],tablasimbolo,atributos,position,value);
                        if(atrsub[0]>0)
                        {
                            let rsult = objeto.setValueAtributo(atr,atrsub[1]);
                            if(rsult[0]>0)
                            {
                                return [1,objeto];
                            }
                        }
                    }
                }
            }
            else
            {
                let arrs = objeto.getValueAtributo(atr);
                if(arrs[0]>0)
                {
                    if(arrs[1] instanceof arrays)
                    {
                        let atrs = this.operateArr(arrs[1],tablasimbolo,position,value);
                        if(atrs[0]>0)
                        {
                            let atratr  = objeto.setValueAtributo(atr,atrs[1]);
                            if(atratr[0]>0)
                            {
                                return [1,objeto];
                            }
                        }
                    }
                }
            }
            return [-1,null]
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }
    }

    operateAtr(objeto:types,tablasimbolo:tablasimbolos,atributos:string[],value:any):any
    {
        try
        {
            let atr = atributos.pop();
            if(atributos.length>0)
            {
                let atrsub0 = objeto.getValueAtributo(atr);
                if(atrsub0[0]>0)
                {
                    if(atrsub0[1] instanceof types)
                    {
                        let atrsub = this.operateAtr(atrsub0[1],tablasimbolo,atributos,value);
                        if(atrsub[0]>0)
                        {
                            let rsult = objeto.setValueAtributo(atr,atrsub[1]);
                            if(rsult[0]>0)
                            {
                                return [1,objeto];
                            }
                        }
                    }
                }
            }
            else
            {
                let atratr  = objeto.setValueAtributo(atr,value);
                if(atratr[0]>0)
                {
                    return [1,objeto];
                }
            }
            return [-1,null]
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }
    }

    operateArr(objeto:arrays,tablasimbolo:tablasimbolos,position:statement[],value:any):any
    {
        try
        {
            let tp = position.pop();
            if(tp instanceof statement)
            {
                let tpr = tp.execute(tablasimbolo);
                if(tpr[0]>0)
                {
                    if(tpr[1] instanceof Number)
                    {
                        if(position.length>0)
                        {
                            let arr = objeto.get(Number(tpr[1]));
                            if(arr[0]>0)
                            {
                                let arrsub = this.operateArr(arr[1],tablasimbolo,position,value);
                                if(arrsub[0]>0)
                                {
                                    let result = objeto.set(Number(tpr[1]),arrsub[1]);
                                    if(result[0]>0)
                                    {
                                        return [1,objeto];
                                    }
                                }
                            }
                        }
                        else
                        {
                            let arr = objeto.set(Number(tpr[1]),value);
                            if(arr[0]>0)
                            {
                                return [1,objeto];
                            }
                        }
                    }
                }
            }
            return [-1,null]
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }

    }


    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
class IfStatement extends statement
{
    StateCode: number;
    type: TypeStatement;
    value:any;
    linea:number;
    ValueExpression: statement;
    body:statement[];
    bodyElse:statement[];

    constructor() {
        super();
        this.body =[];
        this.bodyElse = [];
        this.value = [];
    }

    execute(tablasimbolo1): any {
        try
        {
            //console.log(this);
            this.value = []
            let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1,false);
            let valInitial = this.ValueExpression.execute(tablasimbolo);
            if(valInitial[0]<0) return [-1,null];
            if(valInitial[1])
            {
                for(let statement0 of this.body)
                {
                    let value = statement0.execute(tablasimbolo);
                    switch (value[0])
                    {
                        case -2: //-> error instanciar variable
                            return value
                        case -1: //-> error
                            return value
                        case 0: //-> finalizado
                            this.StateCode = 0
                            if(statement0 instanceof autoincrements)
                            {

                            }
                            else
                            {
                                if(value[1] != null)
                                {
                                    if(value[1] instanceof Array)
                                    {
                                        for(let m of value[1])
                                        {
                                            this.value.push(m);
                                        }
                                    }
                                    else
                                    {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            if(statement0 instanceof autoincrements)
                            {

                            }
                            else
                            {
                                if(value[1] != null)
                                {
                                    if(value[1] instanceof Array)
                                    {
                                        for(let m of value[1])
                                        {
                                            this.value.push(m);
                                        }
                                    }
                                    else
                                    {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            break;
                        case 2: //-> sin errores, break
                            return [2,this.value];
                        case 3: //-> sin errores, continue
                            return [3,this.value];
                        case 4: //-> sin errores, return
                            return [4,value[1]];
                    }
                }
            }
            else
            {
                if(this.bodyElse.length > 0)
                {
                    for(let statement0 of this.bodyElse)
                    {
                        let value = statement0.execute(tablasimbolo);
                        switch (value[0])
                        {
                            case -2: //-> error instanciar variable
                                return value
                            case -1: //-> error
                                return value
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                if(statement0 instanceof autoincrements)
                                {

                                }
                                else
                                {
                                    if(value[1] != null)
                                    {
                                        if(value[1] instanceof Array)
                                        {
                                            for(let m of value[1])
                                            {
                                                this.value.push(m);
                                            }
                                        }
                                        else
                                        {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                if(statement0 instanceof autoincrements)
                                {

                                }
                                else
                                {
                                    if(value[1] != null)
                                    {
                                        if(value[1] instanceof Array)
                                        {
                                            for(let m of value[1])
                                            {
                                                this.value.push(m);
                                            }
                                        }
                                        else
                                        {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 2: //-> sin errores, break
                                return [2,this.value];
                            case 3: //-> sin errores, continue
                                return [3,this.value];
                            case 4: //-> sin errores, return
                                return [4,value[1]];
                        }
                    }
                }
            }
            return [this.StateCode,this.value]
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class OperatorTernario extends statement
{
    StateCode: number;
    type: TypeStatement;
    ValueExpression: statement;
    value:any;
    linea:number;
    Expression1:statement;
    Expression2:statement;

    constructor() {
        super();
        this.Expression1 = null;
        this.Expression2 = null;
        this.ValueExpression = null;
    }

    execute(tablasimbolo): any {
        try
        {
            let valInitial = this.ValueExpression.execute(tablasimbolo);
            if(valInitial[0]<0) return [-1,null];
            if(valInitial[1])
            {
                let val1 = this.Expression1.execute(tablasimbolo);
                if(val1[1]<0) return [-1,null];
                this.StateCode = 1;
                this.value = val1[1];
            }
            else
            {
                let val2 = this.Expression2.execute(tablasimbolo);
                if(val2[1]<0) return [-1,null];
                this.StateCode = 1;
                this.value = val2[1];
            }
            return [this.StateCode,this.value];
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }
}
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

class expression extends statement
{
    StateCode: number;
    type: TypeStatement;
    valueType:TypeValue;
    Expresion: statement;
    name:string;
    linea:number;
    ArrayType:NativeArray;
    position:statement[];
    atributo:string[];
    isCallFunction:boolean;
    parameters:any[];
    farray:boolean;

    constructor()
    {
        super();
        this.atributo = [];
        this.position = [];
        this.name = "";
        this.ArrayType = null;
        this.isCallFunction = false;
        this.parameters = [];
        this.farray = false;
    }

    getValueAtributo(tablasimbolo:tablasimbolos):any
    {
        //get all atributes
        try {
            if(this.atributo.length>0)
            {
                if(this.name!="")
                {
                    let simbolo = tablasimbolo.getsym(this.name);
                    if (simbolo[0] > 0)
                    {
                        if(simbolo[1] instanceof sym)
                        {
                            let simbolito1:sym = simbolo[1];
                            if(simbolito1.getValue() instanceof types)
                            {
                                let valors =  <types> simbolito1.getValue();
                                let val =  valors.getValuesAtributo(this.atributo,tablasimbolo);
                                if(val[0]>0)
                                {
                                    try
                                    {
                                        if(val[1].value instanceof Nulls)
                                        {
                                            return '__jw__'
                                        }
                                        else
                                        {
                                            let result = val[1].value.execute(tablasimbolo);
                                            if(result[0]>0) return result[1];
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
    }

    getValueAtributoArray(tablasimbolo:tablasimbolos):any
    {
        //get all atributes
        try {

            if(this.atributo.length>0)
            {
                if(this.name!="")
                {
                    let simbolo = tablasimbolo.getsym(this.name);
                    if (simbolo[0] > 0)
                    {
                        if(simbolo[1] instanceof sym)
                        {
                            let simbolito1:sym = simbolo[1];
                            if(simbolito1.getValue() instanceof types)
                            {
                                let valors =  <types> simbolito1.getValue();
                                let val =  valors.getValuesAtributo(this.atributo,tablasimbolo);
                                if(val[0]>0)
                                {
                                    try
                                    {
                                        if(val[1].value instanceof arrays)
                                        {
                                            let valors2 = <arrays> val[1].value;
                                            if(this.position.length>0)
                                            {
                                                let vae =  valors2.getValue(this.position,tablasimbolo);
                                                if(vae[0]>0)
                                                {
                                                    try
                                                    {
                                                        let result = vae[1].execute(tablasimbolo);
                                                        if(result[0]>0) return result[1];
                                                    }
                                                    catch (e) {
                                                        return val[1];
                                                    }

                                                }
                                            }
                                            else
                                            {
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
    }

    getValuesArrayAtributo(tablasimbolo:tablasimbolos):any
    {
        //get all values array
        try {
            if(this.name!="")
            {
                let simbolo = tablasimbolo.getsym(this.name);
                if (simbolo[0] > 0)
                {
                    if(simbolo[1] instanceof sym)
                    {
                        let simbolito1:sym = simbolo[1];
                        if(simbolito1.getValue() instanceof arrays)
                        {
                            let valors =  <arrays> simbolito1.getValue();
                            if(this.position.length>0)
                            {
                                let val =  valors.getValue(this.position,tablasimbolo);
                                if(val[0]>0)
                                {
                                    if(val[1] instanceof types)
                                    {
                                        let valors2 = <types> val[1];
                                        let vae =  valors2.getValuesAtributo(this.atributo,tablasimbolo);
                                        if(vae[0]>0)
                                        {
                                            try
                                            {
                                                if(vae[1].value instanceof Nulls)
                                                {
                                                    return '__jw__'
                                                }
                                                else
                                                {
                                                    let result = vae[1].value.execute(tablasimbolo);
                                                    if(result[0]>0) return result[1];
                                                }

                                            }
                                            catch (e) {
                                                return null;
                                            }
                                        }
                                    }


                                }
                            }
                            else
                            {
                                return valors.getAll();
                            }

                        }
                    }
                }
            }
            else
            {
                if(this.position.length>0)
                {
                    let valors =  <expression> this.Expresion;
                    let val =  valors.execute(tablasimbolo);
                    if(val[0]>0)
                    {
                        let resu = (<arrays>val[1]).getValue(this.position,tablasimbolo);
                        if(resu[0]>0)
                        {
                            let result = resu[1].execute(tablasimbolo);
                            if(result[0]>0) return result[1];
                        }
                    }
                }
                else
                {
                    let valors =  <expression> this.Expresion;
                    let val =  valors.execute(tablasimbolo);
                    if(val[0]>0)
                    {
                        return (<arrays>val[1]).getAll();
                    }
                }
            }
            return null;
        }catch (e) {
            return null;
        }

    }

    getValuesArray(tablasimbolo:tablasimbolos):any
    {
        //get all values array
        try {
            if(this.name!="")
            {
                let simbolo = tablasimbolo.getsym(this.name);
                if (simbolo[0] > 0)
                {
                    if(simbolo[1] instanceof sym)
                    {
                        let simbolito1:sym = simbolo[1];
                        if(simbolito1.getValue() instanceof arrays)
                        {
                            let valors =  <arrays> simbolito1.getValue();
                            if(this.position.length>0)
                            {
                                let val =  valors.getValue(this.position,tablasimbolo);
                                if(val[0]>0)
                                {
                                    try
                                    {
                                        let result = val[1].execute(tablasimbolo);
                                        if(result[0]>0) return result[1];
                                    }
                                    catch (e) {
                                        return val[1];
                                    }

                                }
                            }
                            else
                            {
                                return valors.getAll();
                            }

                        }
                    }
                }
            }
            else
            {
                if(this.position.length>0)
                {
                    let valors =  <expression> this.Expresion;
                    let val =  valors.execute(tablasimbolo);
                    if(val[0]>0)
                    {
                        let resu = (<arrays>val[1]).getValue(this.position,tablasimbolo);
                        if(resu[0]>0)
                        {
                            let result = resu[1].execute(tablasimbolo);
                            if(result[0]>0) return result[1];
                        }
                    }
                }
                else
                {
                    let valors =  <expression> this.Expresion;
                    let val =  valors.execute(tablasimbolo);
                    if(val[0]>0)
                    {
                        return (<arrays>val[1]).getAll();
                    }
                }
            }
            return null;
        }catch (e) {
            return null;
        }

    }

    getValueCallFunction(tablasimbolo:tablasimbolos):any
    {
        try
        {
            let val = tablasimbolo.getsym(this.name);
            if(val[0]>0)
            {
                let func = <sym> val[1];
                let funcion = <functions> func.value;
                //console.log(this.parameters)
                let res = funcion.executeV(tablasimbolo,this.parameters);
                if(res[0]>0)
                {
                    return res[1];
                }
            }
            return null;
        }
        catch (e) {
            return null;
        }

    }

    getValue(tablasimbolo:tablasimbolos):any
    {
        //get data in especific
        //console.log(this)
        let positions = [];
        let atributos = [];
        for(let pos of this.position)
        {
            positions.push(pos)
        }
        for(let atr of this.atributo)
        {
            atributos.push(atr);
        }
        try
        {
            if(this.ArrayType!=null)
            {
                switch (this.ArrayType)
                {
                    case NativeArray.Length:
                        let simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0)
                        {
                            if(simbolo[1] instanceof sym)
                            {
                                let simbolito1:sym = simbolo[1];
                                if(simbolito1.getValue() instanceof arrays)
                                {
                                    let valors =  <arrays> simbolito1.getValue();

                                    if(this.position.length>0)
                                    {
                                        let val1 =  valors.getValue(this.position,tablasimbolo);
                                        if(val1[0]>0)
                                        {
                                            if(val1[1] instanceof arrays)
                                            {
                                                let retorno = <arrays> val1[1];
                                                return retorno.length();
                                            }
                                        }
                                    }
                                    else
                                    {

                                        return valors.length();
                                    }
                                }
                            }
                        }
                        break;
                    case NativeArray.Pop:
                        let simbolo1  = tablasimbolo.getsym(this.name);
                        if (simbolo1 [0] > 0)
                        {
                            if(simbolo1 [1] instanceof sym)
                            {
                                let simbolito1:sym = simbolo1 [1];
                                if(simbolito1.getValue() instanceof arrays)
                                {
                                    let valors =  <arrays> simbolito1.getValue();
                                    if(this.position.length>0)
                                    {
                                        let val1 =  valors.getValue(positions,tablasimbolo);
                                        if(val1[0]>0)
                                        {
                                            if(val1[1] instanceof arrays)
                                            {
                                                let retorno = <arrays> val1[1];
                                                let retorno1 = retorno.pop();
                                                if(retorno1[0]>0)
                                                {
                                                    let m = valors.setValue(tablasimbolo,this.position,retorno);
                                                    if(m[0]>0)
                                                    {
                                                        let k = tablasimbolo.update(this.name,valors);
                                                        if(k[0]>0) return retorno1[1].execute(tablasimbolo)[1]
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else
                                    {
                                        let retorno =  valors.pop();
                                        if(retorno[0]>0)
                                        {
                                            let k = tablasimbolo.update(this.name, valors)
                                            if(k[0]>0)  return retorno[1].execute(tablasimbolo)[1]
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case NativeArray.Push:
                        let value = this.Expresion.execute(tablasimbolo);
                        if(value[0]>0)
                        {
                            let simbolo2 = tablasimbolo.getsym(this.name);
                            if (simbolo2[0] > 0)
                            {
                                if(simbolo2[1] instanceof sym)
                                {
                                    let simbolito1:sym = simbolo2[1];
                                    if(simbolito1.getValue() instanceof arrays)
                                    {
                                        let valors =  <arrays> simbolito1.getValue();
                                        if(this.position.length>0)
                                        {
                                            let val1 =  valors.getValue(positions,tablasimbolo);
                                            if(val1[0]>0)
                                            {
                                                if(val1[1] instanceof arrays)
                                                {
                                                    let retorno = <arrays> val1[1];
                                                    let bb =  retorno.push(this.Expresion);
                                                    if(bb[0]>0)
                                                    {
                                                        let m = valors.setValue(tablasimbolo,this.position,retorno);
                                                        //console.log(valors)
                                                        if(m[0]>0)
                                                        {
                                                            let k = tablasimbolo.update(this.name,valors);
                                                            if(k[0]>0) return retorno.length();
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            let bb =  valors.push(this.Expresion);
                                            //console.log(bb);
                                            if(bb[0]>0)
                                            {
                                                let k = tablasimbolo.update(this.name,valors)
                                                if(k[0]>0) return valors.length()+1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                }
            }
            else if(this.atributo.length>0 && this.position.length>0)
            {

                if(this.farray)
                {
                    return this.getValuesArrayAtributo(tablasimbolo);
                }
                else
                {
                    return this.getValueAtributoArray(tablasimbolo);
                }
            }
            else if(this.atributo.length>0)
            {
                return this.getValueAtributo(tablasimbolo);
            }
            else if(this.position.length>0)
            {
                return this.getValuesArray(tablasimbolo);
            }
            else if(this.name!="")
            {
                if(this.isCallFunction)
                {
                    return this.getValueCallFunction(tablasimbolo);
                }
                else
                {
                    let simbolo = tablasimbolo.getsym(this.name);
                    if (simbolo[0] > 0)
                    {
                        if(simbolo[1] instanceof sym)
                        {
                            let simbolito1:sym = simbolo[1];
                            if(simbolito1.getValue()==null) return '__jw__'
                            return simbolito1.getValue();
                        }
                    }
                }

            }
            else
            {
                switch (this.valueType)
                {
                    case TypeValue.null:
                        return "__jw__";
                    case TypeValue.Array:
                        if(this.Expresion instanceof arrays)
                        {
                            return this.Expresion.getAll();
                        }
                        break;
                    case TypeValue.Boolean:
                        if(this.Expresion instanceof Booleans)
                        {
                            return this.Expresion.getValue();
                        }
                        break;
                    case TypeValue.const:
                        return this.Expresion.execute(tablasimbolo);
                    case TypeValue.let:
                        return this.Expresion.execute(tablasimbolo);
                    case TypeValue.Number:
                        if(this.Expresion instanceof Numbers)
                        {
                            return this.Expresion.getValue();
                        }
                        break;
                    case TypeValue.Object:
                        let simbolo = tablasimbolo.getsym(this.name);
                        return simbolo[1];

                    case TypeValue.String:
                        if(this.Expresion instanceof Strings)
                        {
                            return this.Expresion.getValue();
                        }
                        break;
                    case TypeValue.type:
                        if(this.Expresion instanceof  types)
                        {
                            return <types> this.Expresion;
                        }
                        break;
                    case TypeValue.var:
                        if(name!="")
                        {
                            let simbolo = tablasimbolo.getsym(this.name);
                            if (simbolo[0] > 0)
                            {
                                if(simbolo[1] instanceof sym)
                                {
                                    let simbolito1:sym = simbolo[1];
                                    return simbolito1.getValue();
                                }
                            }
                        }
                        break;
                    case TypeValue.void:
                        return '__jw__';

                }
            }
            return null;
        }
        catch (e) {
            //console.log(e)
            return null;
        }
    }


    execute(tablasimbolo): any[2] {
        //get all data from all version of types
        try
        {
            let data = this.getValue(tablasimbolo);
            //console.log(data)
            if(data!=null)
            {
                if(data == '__jw__') return [1,null]
                return [1,data]
            }
            return [-1,'We cant get the data']
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return (this.Expresion!=null)?this.Expresion.traduction():'';
    }

}
class ArichmeticExpression extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expression1: statement;
    Expression2: statement;
    Function: ArichmeticExpr;
    value:any;
    linea:number;

    execute(tablasimbolo): any[2]
    {
        this.StateCode = -1;
        this.value = null;
        try
        {
            let izq = (this.Expression1!=null)?this.Expression1.execute(tablasimbolo):[-1,null];
            let der = (this.Expression2!=null)?this.Expression2.execute(tablasimbolo):[-1,null];
            if(izq[0]>0&&der[0]>0)
            {
                switch (this.Function)
                {
                    case ArichmeticExpr.suma:
                        return [1,izq[1] + der[1]]
                    case ArichmeticExpr.resta:
                            return[1,izq[1]-der[1]]
                    case ArichmeticExpr.potenciacion:
                        return [1,izq[1] ** der[1]];
                    case ArichmeticExpr.multiplicacion:
                        return [1,izq[1] * der[1]]
                    case ArichmeticExpr.modulo:
                        return [1,izq[1] % der[1]]
                    case ArichmeticExpr.negacion:
                        return [1, -izq[1]]
                    case ArichmeticExpr.division:
                            if(der[1]!=0)
                            {
                                return [1,izq[1] / der[1]]
                            }
                            else
                            {
                                return [1,izq[1] / der[1]]
                            }
                }
            }
            return [-1,null];
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string
    {
        let izq = (this.Expression1!=null)?this.Expression1.traduction():'';
        let der = (this.Expression2!=null)?this.Expression2.traduction():'';
        switch (this.Function)
        {
            case ArichmeticExpr.division:
                return izq + '/' + der;
            case ArichmeticExpr.modulo:
                return izq + '%' + der;
            case ArichmeticExpr.multiplicacion:
                return izq + '*' + der;
            case ArichmeticExpr.negacion:
                return '-'+izq ;
            case ArichmeticExpr.potenciacion:
                return izq + '**' + der;
            case ArichmeticExpr.resta:
                return izq + '-' + der;
            case ArichmeticExpr.suma:
                return izq + '+' + der;
        }
    }

}
class LogialExpression extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expression1: statement;
    Expression2: statement;
    Function: LogicalExpr;
    linea:number;
    value:any;

    execute(tablasimbolo): any[2]
    {
        this.StateCode = -1;
        this.value = null;
        try
        {
            //console.log('F->'+this.Function);
            //console.log(this.Expression1);
            //console.log(this.Expression2);
            let izq = (this.Expression1!=null)?this.Expression1.execute(tablasimbolo):[-1,null];
            let der = (this.Expression2!=null)?this.Expression2.execute(tablasimbolo):[-1,null];
            //console.log(izq);
            //console.log(der);
            if(izq[0]>0&&der[0]>0)
            {
                switch (this.Function)
                {
                    case LogicalExpr.Y:
                        return [1,izq[1] && der[1]]
                    case LogicalExpr.O:
                            return [1,izq[1] || der[1]]
                    case LogicalExpr.NOT:
                        return [1,!izq[1]];
                }
            }
            else if(izq[0]>0)
            {
                switch (this.Function)
                {
                    case LogicalExpr.NOT:
                            return [1,!izq[1]];
                }
            }
            return [-1,null];
        }
        catch (e) {

            return [-2,'Unexpected Error, cannot be execute the instruction']
        }
    }

    grahp(): string {
        return "";
    }

    traduction(): string
    {
        let izq = (this.Expression1!=null)?this.Expression1.traduction():'';
        let der = (this.Expression2!=null)?this.Expression2.traduction():'';
        switch (this.Function)
        {
            case LogicalExpr.NOT:
                return '!' + der;
            case LogicalExpr.O:
                return izq + '||' + der;
            case LogicalExpr.Y:
                return izq + '&&' + der;
        }
    }

}
class RelationalExpression extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expression1: statement;
    Expression2: statement;
    Function: RelationalExpr;
    value: any;
    linea:number;

    execute(tablasimbolo): any[2]
    {
        this.StateCode = -1;
        this.value = null;
        try
        {
            let izq = (this.Expression1!=null)?this.Expression1.execute(tablasimbolo):[1,null];
            let der = (this.Expression2!=null)?this.Expression2.execute(tablasimbolo):[1,null];
            if(izq[0]==1&&der[0]==1)
            {
                switch (this.Function)
                {
                    case RelationalExpr.Igual:
                        return [1,izq[1] == der[1]]
                    case RelationalExpr.Mayor:
                        return [1,izq[1] > der[1]]
                    case RelationalExpr.MayorQue:
                        return [1, izq[1] >= der[1]]
                    case RelationalExpr.Menor:
                        return [1,izq[1] < der[1]]
                    case RelationalExpr.MenorQue:
                        return [1, izq[1] <= der[1]]
                    case RelationalExpr.NoIgual:
                        return [1, izq[1] != der[1]]
                }
            }
            return [-1,null];
        }
        catch (e) {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }

    }

    grahp(): string
    {
        return '';

    }

    traduction(): string
    {
        let izq = (this.Expression1!=null)?this.Expression1.traduction():'';
        let der = (this.Expression2!=null)?this.Expression2.traduction():'';
        switch (this.Function)
        {
            case RelationalExpr.NoIgual:
                return izq +'!='+ der;
            case RelationalExpr.MenorQue:
                return izq +'<='+ der;
            case RelationalExpr.Menor:
                return izq +'<'+der;
            case RelationalExpr.MayorQue:
                return izq +'>='+der;
            case RelationalExpr.Mayor:
                return izq +'>'+der;
            case RelationalExpr.Igual:
                return izq +'=='+der;
        }
    }

}
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
class functions extends statement
{
    StateCode: number;
    type: TypeStatement;
    linea:number;
    name:string;
    tipo:TypeValue;
    body:statement[];
    Parameters:Parameter[];
    value:any;

    constructor() {
        super();
        this.Parameters = [];
        this.body = [];
    }

    execute(tablasimbolo: tablasimbolos): any
    {
        return tablasimbolo.insert(this.name,this,TypeSym.Funcion,this.tipo);
    }

    executeV(tablasimbolo1: tablasimbolos,parameters:any[]): any
    {
        try
        {
            //console.log(this)
            let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1,true);
            //console.log(this.Parameters.length == parameters.length)
            if(this.Parameters.length == parameters.length)
            {
                for(var a = 0;a<this.Parameters.length;a++)
                {
                    let namev = this.Parameters[a].name;
                    //console.log(namev)
                    if(parameters[a] instanceof  expression)
                    {
                        let value = <expression>parameters[a];
                        let valueS = value.execute(tablasimbolo1);
                        if(valueS[0]>0) {
                            tablasimbolo.insert(namev, valueS[1], TypeSym.Variable, this.Parameters[a].tipo);
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
                    else
                    {
                        if(parameters[a] instanceof  Strings || parameters[a] instanceof  arrays || parameters[a] instanceof  types || parameters[a] instanceof Numbers || parameters[a] instanceof  Booleans || parameters[a] instanceof  Nulls)
                        {
                            let valueS = parameters[a].execute()
                            if(valueS[0]>0) {
                                tablasimbolo.insert(namev, valueS[1], TypeSym.Variable, this.Parameters[a].tipo);
                            }
                        }
                        else
                        {
                            let valueS = parameters[a].execute(tablasimbolo1)
                            if(valueS[0]>0) {
                                tablasimbolo.insert(namev, valueS[1], TypeSym.Variable, this.Parameters[a].tipo);
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
                //console.log(tablasimbolo)

                for(let statement1 of this.body)
                {
                    //console.log(tablasimbolo);
                    let value = statement1.execute(tablasimbolo);
                    //console.log(value);
                    switch (value[0])
                    {
                        case -2: //-> error instanciar variable
                            return value
                        case -1: //-> error
                            return value
                        case 0: //-> finalizado
                            this.actualizarTs(tablasimbolo1,tablasimbolo,parameters)
                            this.StateCode = 0;
                            this.value = value[1];
                            break;
                        case 1: //-> sin errores
                            this.actualizarTs(tablasimbolo1,tablasimbolo,parameters)
                            this.StateCode = 1;
                            this.value = value[1];
                            break;
                        case 2: //-> sin errores, break
                            this.actualizarTs(tablasimbolo1,tablasimbolo,parameters)
                            break;
                        case 3: //-> sin errores, continue
                            this.actualizarTs(tablasimbolo1,tablasimbolo,parameters)
                            break;
                        case 4: //-> sin errores, return
                            this.actualizarTs(tablasimbolo1,tablasimbolo,parameters)
                            //console.log(value);
                            return [4,value[1]];
                    }
                }
                return [1,null]
            }
            return [-1,'Internal Error, Parameters length is not the same length, length: '+this.Parameters.length+", length_send: "+parameters.length];
        }
        catch (e) {
            return [-1,'Unexpected Error, we cannot find a solution for this error']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }
    actualizarTs(tablasimbolos,tablasimbolos1,paramsCall)
    {
        try
        {
            for(let finder of paramsCall)
            {
                if(finder instanceof  expression)
                {
                    let value = <expression>finder;
                    if(value.name!='' && value.isCallFunction == false)
                    {
                        let simbol = tablasimbolos1.getsym(value.name)
                        if(simbol[0]>0)
                        {
                            let valor = <sym> simbol[1];
                            let insert = tablasimbolos.update(value.name,valor.getValue());
                            console.log(insert)
                        }
                    }

                }
            }
        }
        catch (e) {

        }
    }

}
class Parameter extends statement
{
    StateCode: number;
    type: TypeStatement;
    name:string;
    tipo:TypeValue;
    linea:number;

    execute(tablasimbolo: tablasimbolos): any {
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

class WhileStatements extends statement
{
    StateCode: number;
    type: TypeStatement;
    ValueExpression: statement;
    body: statement[];
    value: any;
    linea:number;

    constructor() {
        super();
        this.ValueExpression = null;
        this.body = [];
        this.value = [];
    }

    execute(tablasimbolo1): any {
        try
        {
            this.value = [];
            let state = true;
            let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1,false)
            while(state) {
                let valInitial = this.ValueExpression.execute(tablasimbolo);
                if (valInitial[0] < 0) return [-1, null];
                if(!valInitial[1]) break;
                let internalState = 0;
                for(let statement0 of this.body)
                {
                    let value = statement0.execute(tablasimbolo);

                    switch (value[0])
                    {
                        case -2: //-> error instanciar variable
                            return [-2,null];
                        case -1: //-> error
                            return[-1,null];
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            if(statement0 instanceof autoincrements)
                            {

                            }
                            else
                            {
                                if(value[1] != null)
                                {
                                    if(value[1] instanceof Array)
                                    {
                                        for(let m of value[1])
                                        {
                                            this.value.push(m);
                                        }
                                    }
                                    else
                                    {
                                        this.value.push(value[1]);
                                    }
                                }
                            }
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            this.StateCode = 1;
                            if(statement0 instanceof autoincrements)
                            {

                            }
                            else
                            {
                                if(value[1] != null)
                                {
                                    if(value[1] instanceof Array)
                                    {
                                        for(let m of value[1])
                                        {
                                            this.value.push(m);
                                        }
                                    }
                                    else
                                    {
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
                            return [4,value[1]];
                    }
                    if(internalState==3 || internalState == 2) break;
                }
                if(internalState==3) continue;
                if(internalState==2) break;

            }
            return [1,this.value]
        }
        catch (e) {
            //console.log(e);
            return [-1,'Unexpected Error, we cannot find the error...']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

class DoWhileStatements extends statement
{
    StateCode: number;
    type: TypeStatement;
    ValueExpression: statement;
    body: statement[];
    value: any;
    linea:number;

    constructor() {
        super();
        this.ValueExpression = null;
        this.body = [];
        this.value = []
    }

    execute(tablasimblolo1): any {
        try
        {
            this.value = [];
            let tablasimblolo:tablasimbolos = new tablasimbolos(tablasimblolo1,false)
            let state = true;
            while(state) {
                let internalState = 0;
                for(let statement0 of this.body)
                {
                    let value = statement0.execute(tablasimblolo);
                    switch (value[0])
                    {
                        case -2: //-> error instanciar variable
                            return [-2,null];
                        case -1: //-> error
                            return[-1,null];
                        case 0: //-> finalizado
                            this.StateCode = 0;
                            if(statement0 instanceof autoincrements)
                            {

                            }
                            else
                            {
                                if(value[1] != null)
                                {
                                    if(value[1] instanceof Array)
                                    {
                                        for(let m of value[1])
                                        {
                                            this.value.push(m);
                                        }
                                    }
                                    else
                                    {
                                        this.value.push(value[1]);
                                    }
                                }
                            }

                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            this.StateCode = 1;
                            if(statement0 instanceof autoincrements)
                            {

                            }
                            else
                            {
                                if(value[1] != null)
                                {
                                    if(value[1] instanceof Array)
                                    {
                                        for(let m of value[1])
                                        {
                                            this.value.push(m);
                                        }
                                    }
                                    else
                                    {
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
                            return [4,value[1]];
                    }
                    if(internalState==3 || internalState == 2) break;
                }
                if(internalState==3) continue;
                if(internalState==2) break;
                let valInitial = this.ValueExpression.execute(tablasimblolo);
                if (valInitial[0] < 0) return [-1, null];
                if(!valInitial[1]) break;
            }
            return [1,this.value]
        }
        catch (e) {
            return [-1,'Unexpected Error, we cannot find the error...']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

//for normal -> for(var a =0;a<4;a++)
class ForStatements1 extends statement
{
    StateCode: number;
    type: TypeStatement;
    condicion:statement;
    postIterator:statement;
    valueInitial:statement;
    body:statement[];
    value: any;
    linea:number;

    constructor() {
        super();
        this.body = [];
        this.condicion = null;
        this.valueInitial = null;
        this.postIterator = null;
        this.value = [];
    }

    execute(tablasimbolo1): any[2]
    {
        try
        {
            this.value = []
            let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1,false)

            let initial = this.valueInitial.execute(tablasimbolo);
            if(initial[0]>0)
            {
                let state = true;
                while(state)
                {
                    let internalState = 0;
                    let condicion = this.condicion.execute(tablasimbolo);
                    if(condicion[0]<0) return [-1,'Condition Iteration For, Error, cannot execute the  Condition']
                    if(condicion[1])
                    {
                        for(let statement1 of this.body)
                        {
                            let value = statement1.execute(tablasimbolo);
                            switch (value[0])
                            {
                                case -2: //-> error instanciar variable
                                    return value;
                                case -1: //-> error
                                    return value
                                case 0: //-> finalizado
                                    this.StateCode = 0;
                                    if(statement1 instanceof autoincrements)
                                    {

                                    }
                                    else
                                    {
                                        if(value[1] != null)
                                        {
                                            if(value[1] instanceof Array)
                                            {
                                                for(let m of value[1])
                                                {
                                                    this.value.push(m);
                                                }
                                            }
                                            else
                                            {
                                                this.value.push(value[1]);
                                            }
                                        }
                                    }
                                    break;
                                case 1: //-> sin errores
                                    this.StateCode = 1;
                                    if(statement1 instanceof autoincrements)
                                    {

                                    }
                                    else
                                    {
                                        if(value[1] != null)
                                        {
                                            if(value[1] instanceof Array)
                                            {
                                                for(let m of value[1])
                                                {
                                                    this.value.push(m);
                                                }
                                            }
                                            else
                                            {
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
                                    return [4,value[1]];
                            }
                            if(internalState==3 || internalState == 2) break;

                        }
                        if(internalState==3) continue;
                        if(internalState==2) state = false;
                        let post = this.postIterator.execute(tablasimbolo);
                        if (post[0] < 0) return [-1,'Post Iteration For, Error, cannot execute the Post Condition']
                    }
                    else
                    {
                        state = false;
                    }
                }
            }
            return [1,this.value];
        }
        catch (e) {
            return [-1,'Unexpected Error, we cannot find the error...']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

//for tipo1 -> for(a;a<4;a++)
class ForStatements2 extends statement
{
    StateCode: number;
    type: TypeStatement;
    condicion:statement;
    postIterator:statement;
    valueInitial:string;
    body:statement[];
    value: any;
    linea:number;

    execute(tablasimbolo1): any[2]
    {
        try
        {
            this.value = []
            let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1,false)
            let initial = tablasimbolo.get(this.valueInitial);
            if(initial!=null)
            {
                let state = true;
                while(state)
                {
                    let internalState = 0;
                    let condicion = this.condicion.execute(tablasimbolo);
                    if(condicion[0]<0) return [-1,null]
                    if(condicion[1])
                    {
                        for(let statement1 of this.body)
                        {
                            let value = statement1.execute(tablasimbolo);
                            switch (value[0])
                            {
                                case -2: //-> error instanciar variable
                                    return [-2,null];
                                case -1: //-> error
                                    return[-1,null];
                                case 0: //-> finalizado
                                    this.StateCode = 0;
                                    if(value[1] != null)
                                    {
                                        if(value[1] instanceof Array)
                                        {
                                            for(let m of value[1])
                                            {
                                                this.value.push(m);
                                            }
                                        }
                                        else
                                        {
                                            this.value.push(value[1]);
                                        }
                                    }
                                    break;
                                case 1: //-> sin errores
                                    this.StateCode = 1;
                                    if(value[1] != null)
                                    {
                                        if(value[1] instanceof Array)
                                        {
                                            for(let m of value[1])
                                            {
                                                this.value.push(m);
                                            }
                                        }
                                        else
                                        {
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
                                    return [4,value[1]];
                            }
                            if(internalState==3 || internalState == 2) break;

                        }
                        if(internalState==3) continue;
                        if(internalState==2) break;
                        let post = this.postIterator.execute(tablasimbolo);
                        if (post[0] < 0) return [-1, null];
                    }
                    else
                    {
                        break;
                    }
                }
            }
            return [1,null];
        }
        catch (e)
        {
            return [-1,null];
        }
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

//for in -> for(let a in (ident|[]))
class ForStatements3 extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expression:statement;
    identificador:string;
    body:statement[];
    value: any;
    linea:number;

    constructor() {
        super();
        this.value = [];
        this.body = [];
        this.StateCode = -1;
    }

    execute(tablasimbolo1): any[2]
    {
        let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1,false)
        try
        {
            this.value = []
            let internalState = 0;
            tablasimbolo.insert(this.identificador,null,TypeSym.Variable, TypeValue.Object);
            if(this.Expression instanceof expression)
            {
                let vals = this.Expression.execute(tablasimbolo)
                if(vals[0]>0)
                {
                    if(vals[1] instanceof arrays)
                    {
                        let kk:any[] = vals[1].getAll();

                        for(let pos in kk)
                        {
                            tablasimbolo.update(this.identificador,pos);
                            for(let statement1 of this.body)
                            {
                                let value = statement1.execute(tablasimbolo);
                                switch (value[0])
                                {
                                    case -2: //-> error instanciar variable
                                        return value
                                    case -1: //-> error
                                        return value
                                    case 0: //-> finalizado
                                        this.StateCode = 0;
                                        if(statement1 instanceof autoincrements)
                                        {

                                        }
                                        else
                                        {
                                            if(value[1] != null)
                                            {
                                                if(value[1] instanceof Array)
                                                {
                                                    for(let m of value[1])
                                                    {
                                                        this.value.push(m);
                                                    }
                                                }
                                                else
                                                {
                                                    this.value.push(value[1]);
                                                }
                                            }
                                        }
                                        break;
                                    case 1: //-> sin errores
                                        this.StateCode = 1;
                                        if(statement1 instanceof autoincrements)
                                        {

                                        }
                                        else
                                        {
                                            if(value[1] != null)
                                            {
                                                if(value[1] instanceof Array)
                                                {
                                                    for(let m of value[1])
                                                    {
                                                        this.value.push(m);
                                                    }
                                                }
                                                else
                                                {
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
                                        return [4,value[1]];
                                }
                                if(internalState==3 || internalState == 2) break;

                            }
                            if(internalState==3) continue;
                            if(internalState==2) break;
                        }


                    }
                }
            }
            else if(this.Expression instanceof arrays)
            {
                let valores:any[] = this.Expression.getAll();
                for(let post in valores)
                {
                    tablasimbolo.update(this.identificador,post);
                    for(let statement1 of this.body)
                    {
                        let value = statement1.execute(tablasimbolo);
                        switch (value[0])
                        {
                            case -2: //-> error instanciar variable
                                return value
                            case -1: //-> error
                                return value
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                if(statement1 instanceof autoincrements)
                                {

                                }
                                else
                                {
                                    if(value[1] != null)
                                    {
                                        if(value[1] instanceof Array)
                                        {
                                            for(let m of value[1])
                                            {
                                                this.value.push(m);
                                            }
                                        }
                                        else
                                        {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                if(statement1 instanceof autoincrements)
                                {

                                }
                                else
                                {
                                    if(value[1] != null)
                                    {
                                        if(value[1] instanceof Array)
                                        {
                                            for(let m of value[1])
                                            {
                                                this.value.push(m);
                                            }
                                        }
                                        else
                                        {
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
                                return [4,value[1]];
                        }
                        if(internalState==3 || internalState == 2) break;

                    }
                    if(internalState==3) continue;
                    if(internalState==2) break;
                }

            }
            if(this.StateCode>=0) return [1,this.value];
            return [-1,'Cannot applied iterators in For...in, because only Arrays is permited!.']

        }
        catch (e) {
            return [-1,'Unexpected Error, we cannot find the error...']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

//for of -> for(let a of (ident|[]|String))
class ForStatements4 extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expression:statement;
    identificador:string;
    body:statement[];
    value: any;
    linea:number;

    constructor() {
        super();
        this.value = [];
        this.StateCode = -1;
    }
    execute(tablasimbolo1): any[2]
    {
        let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1,false)
        try
        {
            this.value = []
            let internalState = 0;
            tablasimbolo.insert(this.identificador,null,TypeSym.Variable, TypeValue.Object);
            if(this.Expression instanceof expression)
            {
                let vals = this.Expression.execute(tablasimbolo)
                if(vals[0]>0)
                {
                    if(vals[1] instanceof arrays)
                    {
                        let kk = vals[1].getAll();

                        for(let pos of kk)
                        {
                            if(pos instanceof arrays)
                            {
                                let km = pos.getAll();
                                for(let posi of km)
                                {
                                    tablasimbolo.update(this.identificador,posi.execute(tablasimbolo)[1]);

                                    for(let statement1 of this.body)
                                    {
                                        let value = statement1.execute(tablasimbolo);
                                        switch (value[0])
                                        {
                                            case -2: //-> error instanciar variable
                                                return value
                                            case -1: //-> error
                                                return value
                                            case 0: //-> finalizado
                                                this.StateCode = 0;
                                                if(statement1 instanceof autoincrements)
                                                {

                                                }
                                                else
                                                {
                                                    if(value[1] != null)
                                                    {
                                                        if(value[1] instanceof Array)
                                                        {
                                                            for(let m of value[1])
                                                            {
                                                                this.value.push(m);
                                                            }
                                                        }
                                                        else
                                                        {
                                                            this.value.push(value[1]);
                                                        }
                                                    }
                                                }
                                                break;
                                            case 1: //-> sin errores
                                                this.StateCode = 1;
                                                this.StateCode = 1;
                                                if(statement1 instanceof autoincrements)
                                                {

                                                }
                                                else
                                                {
                                                    if(value[1] != null)
                                                    {
                                                        if(value[1] instanceof Array)
                                                        {
                                                            for(let m of value[1])
                                                            {
                                                                this.value.push(m);
                                                            }
                                                        }
                                                        else
                                                        {
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
                                                return [4,value[1]];
                                        }
                                        if(internalState==3 || internalState == 2) break;

                                    }
                                    if(internalState==3) continue;
                                    if(internalState==2) break;
                                }
                            }
                            else
                            {
                                tablasimbolo.update(this.identificador,pos.execute(tablasimbolo)[1]);

                                for(let statement1 of this.body)
                                {
                                    let value = statement1.execute(tablasimbolo);
                                    switch (value[0])
                                    {
                                        case -2: //-> error instanciar variable
                                            return value
                                        case -1: //-> error
                                            return value
                                        case 0: //-> finalizado
                                            this.StateCode = 0;
                                            if(statement1 instanceof autoincrements)
                                            {

                                            }
                                            else
                                            {
                                                if(value[1] != null)
                                                {
                                                    if(value[1] instanceof Array)
                                                    {
                                                        for(let m of value[1])
                                                        {
                                                            this.value.push(m);
                                                        }
                                                    }
                                                    else
                                                    {
                                                        this.value.push(value[1]);
                                                    }
                                                }
                                            }
                                            break;
                                        case 1: //-> sin errores
                                            this.StateCode = 1;
                                            if(statement1 instanceof autoincrements)
                                            {

                                            }
                                            else
                                            {
                                                if(value[1] != null)
                                                {
                                                    if(value[1] instanceof Array)
                                                    {
                                                        for(let m of value[1])
                                                        {
                                                            this.value.push(m);
                                                        }
                                                    }
                                                    else
                                                    {
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
                                            return [4,value[1]];
                                    }
                                    if(internalState==3 || internalState == 2) break;

                                }
                                if(internalState==3) continue;
                                if(internalState==2) break;
                            }

                        }
                    }
                    else
                    {
                        for(let pos of vals[1])
                        {
                            tablasimbolo.update(this.identificador,pos);
                            for(let statement1 of this.body)
                            {
                                let value = statement1.execute(tablasimbolo);
                                switch (value[0])
                                {
                                    case -2: //-> error instanciar variable
                                        return value
                                    case -1: //-> error
                                        return value
                                    case 0: //-> finalizado
                                        this.StateCode = 0;
                                        if(statement1 instanceof autoincrements)
                                        {

                                        }
                                        else
                                        {
                                            if(value[1] != null)
                                            {
                                                if(value[1] instanceof Array)
                                                {
                                                    for(let m of value[1])
                                                    {
                                                        this.value.push(m);
                                                    }
                                                }
                                                else
                                                {
                                                    this.value.push(value[1]);
                                                }
                                            }
                                        }
                                        break;
                                    case 1: //-> sin errores
                                        this.StateCode = 1;
                                        if(statement1 instanceof autoincrements)
                                        {

                                        }
                                        else
                                        {
                                            if(value[1] != null)
                                            {
                                                if(value[1] instanceof Array)
                                                {
                                                    for(let m of value[1])
                                                    {
                                                        this.value.push(m);
                                                    }
                                                }
                                                else
                                                {
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
                                        return [4,value[1]];
                                }
                                if(internalState==3 || internalState == 2) break;

                            }
                            if(internalState==3) continue;
                            if(internalState==2) break;
                        }

                    }
                }
            }
            else if(this.Expression instanceof arrays)
            {
                let valores:any[] = this.Expression.getAll();
                for(let post of valores)
                {
                    tablasimbolo.update(this.identificador,post.execute(tablasimbolo)[1]);
                    for(let statement1 of this.body)
                    {
                        let value = statement1.execute(tablasimbolo);
                        switch (value[0])
                        {
                            case -2: //-> error instanciar variable
                                return value
                            case -1: //-> error
                                return value
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                if(statement1 instanceof autoincrements)
                                {

                                }
                                else
                                {
                                    if(value[1] != null)
                                    {
                                        if(value[1] instanceof Array)
                                        {
                                            for(let m of value[1])
                                            {
                                                this.value.push(m);
                                            }
                                        }
                                        else
                                        {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                if(statement1 instanceof autoincrements)
                                {

                                }
                                else
                                {
                                    if(value[1] != null)
                                    {
                                        if(value[1] instanceof Array)
                                        {
                                            for(let m of value[1])
                                            {
                                                this.value.push(m);
                                            }
                                        }
                                        else
                                        {
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
                                return [4,value[1]];
                        }
                        if(internalState==3 || internalState == 2) break;

                    }
                    if(internalState==3) continue;
                    if(internalState==2) break;
                }

            }
            else if(this.Expression instanceof Strings)
            {
                let valores1 = this.Expression.execute();
                for(let va of valores1)
                {
                    tablasimbolo.update(this.identificador,va);
                    for(let statement1 of this.body)
                    {
                        let value = statement1.execute(tablasimbolo);
                        switch (value[0])
                        {
                            case -2: //-> error instanciar variable
                                return value
                            case -1: //-> error
                                return value
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                if(statement1 instanceof autoincrements)
                                {

                                }
                                else
                                {
                                    if(value[1] != null)
                                    {
                                        if(value[1] instanceof Array)
                                        {
                                            for(let m of value[1])
                                            {
                                                this.value.push(m);
                                            }
                                        }
                                        else
                                        {
                                            this.value.push(value[1]);
                                        }
                                    }
                                }
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                if(statement1 instanceof autoincrements)
                                {

                                }
                                else
                                {
                                    if(value[1] != null)
                                    {
                                        if(value[1] instanceof Array)
                                        {
                                            for(let m of value[1])
                                            {
                                                this.value.push(m);
                                            }
                                        }
                                        else
                                        {
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
                                return [4,value[1]];
                        }
                        if(internalState==3 || internalState == 2) break;

                    }
                    if(internalState==3) continue;
                    if(internalState==2) break;
                }

            }
            if(this.StateCode>=0) return [1,this.value];
            return [-1,'We cannot applied the instructions, because For...Of only iterate Strings and Arrays...'];
        }
        catch (e) {
            return [-1,'Unexpected Error, we cannot find the error...']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
class Strings extends statement
{
    StateCode: number;
    type: TypeStatement;
    value: string;
    tipoValue:TypeValue;
    linea:number;

    constructor() {
        super();
        this.value = "";
    }
    execute(): any {
        return [1,this.value];
    }
    getValue()
    {
        return this.value;
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

class Numbers extends statement
{
    StateCode: number;
    type: TypeStatement;
    value: number;
    tipoValue:TypeValue;
    linea:number;

    constructor() {
        super();
        this.value = -1;
    }

    execute(): any {
        return [1, this.value];
    }

    getValue()
    {
        return this.value;
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

class Booleans extends statement
{
    StateCode: number;
    type: TypeStatement;
    value: boolean;
    tipoValue:TypeValue;
    linea:number;

    constructor() {
        super();
        this.value = false;
    }
    getValue()
    {
        return this.value;
    }
    execute(): any {
        return [1,this.value];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class Nulls extends statement
{
    StateCode: number;
    type: TypeStatement;
    tipoValue:TypeValue;
    linea:number;

    getValue()
    {
        return null;
    }

    execute(): any {
        return [1,null];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }
}
class Cadena3 extends statement
{
    StateCode: number;
    type: TypeStatement;
    tipoValue:TypeValue;
    value: any;
    linea:number;

    getValue()
    {
        return this.value;
    }

    execute(): any {
        return[1,""];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
class NativeStatement extends statement
{
    StateCode: number;
    type: TypeStatement;
    instruction: Native;
    linea:number;
    Expression: statement[];
    graph:string;

    constructor(typeS:TypeStatement, instr: Native) {
        super();
        this.instruction = instr;
        this.type = typeS
    }

    execute(tablasimbolo): any[2] {
        try
        {
            if(this.instruction == Native.console)
            {
                let resultado = '';

                for(let valu of this.Expression)
                {
                    //console.log(this.Expression)
                    //console.log(tablasimbolo)

                    if(this.Expression == null) return [-1,null];
                    //console.log(this.Expression);
                    let value = valu.execute(tablasimbolo);
                    if(value[0]<0) return [-1,null];
                    //this.htmlYouWantToAdd = "<p><b>value[1]</b></p>";
                    if(value[1] == null)
                    {
                        resultado += "null";
                    }
                    else
                    {
                        if(value[1] instanceof  arrays)
                        {
                            try
                            {
                                resultado += '[ '
                                let a = 0;
                                for(let m of value[1].getAll())
                                {
                                    a++;
                                    resultado += m.execute(tablasimbolo)[1];
                                    if(a < value[1].getAll().length ) resultado += ' , '
                                }
                                resultado += ' ]';
                            }
                            catch (e) {
                                resultado += value[1];
                            }

                        }
                        else
                        {
                            resultado += value[1]
                        }

                    }
                }
                output.push('{\"linea\":\"'+this.linea+'\", \"valor\":\"'+resultado+'\"}')
                return [1,'{\"linea\":\"'+this.linea+'\", \"valor\":\"'+resultado+'\"}']
            }
            else
            {
                return [1,this.graph];
            }
        }
        catch (e) {
            //console.log(e)
            return [-1,null]
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

class types extends statement
{
    StateCode: number;
    type: TypeStatement;
    atributos:atributo[];
    name:string;
    tipoValue:TypeValue;
    linea:number;

    execute(tablasimbolo: tablasimbolos): any {
        return [1,this]
    }
    getValueAtributo(atributo:string)
    {
        for(let atr of this.atributos)
        {
            if(atr.name==atributo)
            {
                return [1,atr];
            }
        }
        return [-1,null];
    }

    getValuesAtributo1(objeto:types,atributos:string[],tablasimbolo:tablasimbolos)
    {
        try
        {
            let atr = atributos.pop();
            if(atributos.length>0)
            {
                let atrsub0 = this.getValueAtributo(atr);
                if(atrsub0[0]>0)
                {
                    if(atrsub0[1] instanceof types)
                    {
                        let atrsub = this.getValuesAtributo1(atrsub0[1],atributos,tablasimbolo);
                        if(atrsub[0]>0)
                        {
                            return [1,atrsub[1]]
                        }
                    }
                }
            }
            else
            {
                let atratr  = objeto.getValueAtributo(atr);
                if(atratr[0]>0)
                {
                    return [1,atratr[1]];
                }
            }
            return [-1,null]
        }
        catch (e)
        {
            return [-1,null];
        }
    }
    getValuesAtributo(atributos:string[],tablasimbolo:tablasimbolos)
    {
        try
        {
            let atr = atributos.pop();
            if(atributos.length>0)
            {
                let atrsub0 = this.getValueAtributo(atr);
                if(atrsub0[0]>0)
                {
                    if(atrsub0[1] instanceof types)
                    {
                        let atrsub = this.getValuesAtributo1(atrsub0[1],atributos,tablasimbolo);
                        if(atrsub[0]>0)
                        {
                            return [1,atrsub[1]]
                        }
                    }
                }
            }
            else
            {
                let atratr  = this.getValueAtributo(atr);
                if(atratr[0]>0)
                {
                    return [1,atratr[1]];
                }
            }
            return [-1,null]
        }
        catch (e)
        {
            return [-1,null];
        }
    }

    setValueAtributo(atributo:string,value?:any)
    {
        for(let atr of this.atributos)
        {
            if(atr.name==atributo)
            {
                atr.value = value;
                return [1,null]
            }
        }
        return [-1,null];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

class atributo
{
    name:string;
    value:any;
    tipo:string;
    tipe:TypeValue;
}
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

class declarations extends statement
{
    StateCode: number;
    type: TypeStatement;
    linea:number;
    tipo:TypeValue;
    value:any;
    Expression:statement[];
    constructor() {
        super();
        this.Expression = [];
    }

    execute(tablasimbolo: tablasimbolos): any
    {
        try
        {
            if(this.tipo == TypeValue.type)
            {
                let declaracion = <declaration0> this.Expression[0];
                tablasimbolo.insert(declaracion.name,declaracion.Expression,TypeSym.class,this.tipo);

            }
            else
            {
                for(let declaracion of this.Expression)
                {
                    if(this.tipo == TypeValue.let)
                    {
                        let declaration = <declaration0> declaracion;
                        declaration.tipoSim = TypeSym.let;
                        let value = declaration.execute(tablasimbolo);
                        switch (value[0])
                        {
                            case -2: //-> error instanciar variable
                                return value
                            case -1: //-> error
                                return value
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                this.value = value[1];
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                this.value = value[1];
                                break;
                            default:
                                return [-1,'An Error was ocurred, we can\'t identified the error.'];
                        }
                    }
                    else if(this.tipo == TypeValue.var)
                    {
                        let declaration = <declaration0> declaracion;
                        declaration.tipoSim = TypeSym.var;
                        let value = declaration.execute(tablasimbolo);
                        switch (value[0])
                        {
                            case -2: //-> error instanciar variable
                                return value
                            case -1: //-> error
                                return value
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                this.value = value[1];
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                this.value = value[1];
                                break;
                            default:
                                return [-1,'An Error was ocurred, we can\'t identified the error.'];
                        }
                    }
                    else if(this.tipo == TypeValue.const)
                    {
                        let declaration = <declaration0> declaracion;
                        declaration.tipoSim = TypeSym.const;
                        let value = declaration.execute(tablasimbolo);
                        switch (value[0])
                        {
                            case -2: //-> error instanciar variable
                                return value
                            case -1: //-> error
                                return value
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                this.value = value[1];
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                this.value = value[1];
                                break;
                            default:
                                return [-1,'An Error was ocurred, we can\'t identified the error.'];
                        }
                    }
                    else
                    {
                        let declaration = <declaration0> declaracion;
                        declaration.tipoSim = TypeSym.Variable;
                        let value = declaration.execute(tablasimbolo);
                            switch (value[0])
                            {
                                case -2: //-> error instanciar variable
                                    return value
                                case -1: //-> error
                                    return value
                                case 0: //-> finalizado
                                    this.StateCode = 0;
                                    this.value = value[1];
                                    break;
                                case 1: //-> sin errores
                                    this.StateCode = 1;
                                    this.value = value[1];
                                    break;
                                default:
                                    return [-1,'An Error was ocurred, we can\'t identified the error.'];
                            }
                    }
                }
            }

            return [1,null];
        }
        catch(e)
        {
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class declaration0 extends statement
{
    StateCode: number;
    type: TypeStatement;
    linea:number;
    tipoSim:TypeSym;
    tipo:TypeValue;
    name:string;
    Expression:statement;
    nameType:string;
    constructor() {
        super();
        this.nameType = '';
    }

    execute(tablasimbolo: tablasimbolos): any
    {
        try
        {
            //console.log(this);
            if(this.nameType!='')
            {
                let typer = tablasimbolo.getsym(this.nameType);
                //console.log(typer);
                if(typer[0]>0)
                {
                    if(typer[1] instanceof sym)
                    {
                        let type = typer[1].getValue();
                        //console.log(type);
                        if(type instanceof types && this.Expression instanceof types)
                        {
                            //console.log('validate');
                            //console.log(this.Expression.atributos.length == type.atributos.length)
                            if(this.Expression.atributos.length == type.atributos.length)
                            {
                                return tablasimbolo.insert(this.name,this.Expression,TypeSym.class,this.tipo);
                            }
                        }
                    }
                }
            }
            else {
                let valor = this.Expression.execute(tablasimbolo);
                if(valor[0]>0)
                {
                    return tablasimbolo.insert(this.name,valor[1],this.tipoSim, this.tipo);
                }
            }
            return [-1,'Error, cannot be execute the instruction']
        }
        catch (e) {
            //console.log(e)
            return [-2,'Unexpected Error, cannot be execute the instruction']
        }
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

class BreakStatements extends statement
{
    StateCode: number;
    linea: number;
    type: TypeStatement;

    execute(tablasimbolo: tablasimbolos): any {
        return [2,null];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class ContinueStatements extends statement
{
    StateCode: number;
    linea: number;
    type: TypeStatement;

    execute(tablasimbolo: tablasimbolos): any {
        return [3,null];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class ReturnStatements extends statement
{
    StateCode: number;
    linea: number;
    type: TypeStatement;
    Expresion:statement;

    execute(tablasimbolo: tablasimbolos): any {
        try
        {
            let val = this.Expresion.execute(tablasimbolo);
            if(val[0]>0) return [4,val[1]];
            return [-1, 'An error appears, in Return instructions, maybe you will be inspect the return expression...']
        }
        catch (e) {
            return [-1, 'Unexpected Error, we cannot find the error']
        }
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
/*
    UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
    JOSE WANNAN - 201612331 @2020
 */
let jsondataprueba = ''

let jsondata2 =  '{"linea":"196","S":[{"linea":"1","statement":"declaration","type":[{"linea":"1","tipo":[{"linea":"1","tipo":"let"}],"size":[]}], "values":[{"linea":"1","statement":"variable","tipoExpresion":[{"linea":"1","tipo":[{"linea":"1","tipo":"number"}],"size":[{"linea":"1","statement":"arreglo","value":[]},\n' +
    '{"linea":"1","statement":"arreglo","value":[]}]}],"name":"matrixA","ValExpression":[{"linea":"1","operator":[{"linea":"1","v":"="}],"Expression":[{"linea":"1","statement":"arreglo","value":[]}]}]}]},\n' +
    '{"linea":"2","statement":"declaration","type":[{"linea":"2","tipo":[{"linea":"2","tipo":"let"}],"size":[]}], "values":[{"linea":"2","statement":"variable","tipoExpresion":[{"linea":"2","tipo":[{"linea":"2","tipo":"number"}],"size":[{"linea":"2","statement":"arreglo","value":[]},\n' +
    '{"linea":"2","statement":"arreglo","value":[]}]}],"name":"matrixB","ValExpression":[{"linea":"2","operator":[{"linea":"2","v":"="}],"Expression":[{"linea":"2","statement":"arreglo","value":[]}]}]}]},\n' +
    '{"linea":"3","statement":"declaration","type":[{"linea":"3","tipo":[{"linea":"3","tipo":"let"}],"size":[]}], "values":[{"linea":"3","statement":"variable","tipoExpresion":[{"linea":"3","tipo":[{"linea":"3","tipo":"number"}],"size":[{"linea":"3","statement":"arreglo","value":[]},\n' +
    '{"linea":"3","statement":"arreglo","value":[]}]}],"name":"matrixR","ValExpression":[{"linea":"3","operator":[{"linea":"3","v":"="}],"Expression":[{"linea":"3","statement":"arreglo","value":[]}]}]}]},\n' +
    '{"linea":"4","statement":"declaration","type":[{"linea":"4","tipo":[{"linea":"4","tipo":"const"}],"size":[]}], "values":[{"linea":"4","statement":"variable","tipoExpresion":[],"name":"min","ValExpression":[{"linea":"4","operator":[{"linea":"4","v":"="}],"Expression":[{"linea":"4","tipo":"number", "value":"0"}]}]}]},\n' +
    '{"linea":"5","statement":"declaration","type":[{"linea":"5","tipo":[{"linea":"5","tipo":"const"}],"size":[]}], "values":[{"linea":"5","statement":"variable","tipoExpresion":[],"name":"max","ValExpression":[{"linea":"5","operator":[{"linea":"5","v":"="}],"Expression":[{"linea":"5","tipo":"number", "value":"4"}]}]}]},\n' +
    '{"linea":"18","statement":"funcion","name":"llenado","type":[{"linea":"7","tipo":[{"linea":"7","tipo":"void"}],"size":[]}],"params":[{"linea":"7","statement":"parameter","name":"matrix1","tipo":[{"linea":"7","tipo":[{"linea":"7","tipo":"number"}],"size":[{"linea":"7","statement":"arreglo","value":[]},\n' +
    '{"linea":"7","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"7","statement":"parameter","name":"matrix2","tipo":[{"linea":"7","tipo":[{"linea":"7","tipo":"number"}],"size":[{"linea":"7","statement":"arreglo","value":[]},\n' +
    '{"linea":"7","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"7","statement":"parameter","name":"matrix3","tipo":[{"linea":"7","tipo":[{"linea":"7","tipo":"number"}],"size":[{"linea":"7","statement":"arreglo","value":[]},\n' +
    '{"linea":"7","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"17","statement":"for","ExpresionInitial":[{"linea":"8","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"8","tipo":"let"}],"name":"i","ValExpression":[{"linea":"8","operator":[{"linea":"8","v":"="}],"Expression":[{"linea":"8","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"8","statement":"Relational","Relational":"<","Expression1":[{"linea":"8","statement":"variable","value":"i"}],"Expression2":[{"linea":"8","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"8","statement":"postincrement1","padre":[{"linea":"8","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"9","statement":"asignation","variable":"matrix1","params":[{"linea":"9","statement":"ArrayList","value":[{"linea":"9","statement":"MatrizPosition","value":[{"linea":"9","statement":"variable","value":"i"}]}]}],"ValExpression":[{"linea":"9","operator":[{"linea":"9","v":"="}],"Expression":[{"linea":"9","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"10","statement":"asignation","variable":"matrix2","params":[{"linea":"10","statement":"ArrayList","value":[{"linea":"10","statement":"MatrizPosition","value":[{"linea":"10","statement":"variable","value":"i"}]}]}],"ValExpression":[{"linea":"10","operator":[{"linea":"10","v":"="}],"Expression":[{"linea":"10","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"11","statement":"asignation","variable":"matrix3","params":[{"linea":"11","statement":"ArrayList","value":[{"linea":"11","statement":"MatrizPosition","value":[{"linea":"11","statement":"variable","value":"i"}]}]}],"ValExpression":[{"linea":"11","operator":[{"linea":"11","v":"="}],"Expression":[{"linea":"11","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"16","statement":"for","ExpresionInitial":[{"linea":"12","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"12","tipo":"let"}],"name":"j","ValExpression":[{"linea":"12","operator":[{"linea":"12","v":"="}],"Expression":[{"linea":"12","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"12","statement":"Relational","Relational":"<","Expression1":[{"linea":"12","statement":"variable","value":"j"}],"Expression2":[{"linea":"12","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"12","statement":"postincrement1","padre":[{"linea":"12","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"13","statement":"asignation","variable":"matrix1","params":[{"linea":"13","statement":"ArrayList","value":[{"linea":"13","statement":"MatrizPosition","value":[{"linea":"13","statement":"variable","value":"i"}]},\n' +
    '{"linea":"13","statement":"MatrizPosition","value":[{"linea":"13","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"13","operator":[{"linea":"13","v":"="}],"Expression":[{"linea":"13","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"13","statement":"Aritmetic","Aritmetic":"*","Expression1":[{"linea":"13","statement":"variable","value":"j"}],"Expression2":[{"linea":"13","tipo":"number", "value":"3"}]}],"Expression2":[{"linea":"13","statement":"variable","value":"i"}]}]}]},\n' +
    '{"linea":"14","statement":"asignation","variable":"matrix2","params":[{"linea":"14","statement":"ArrayList","value":[{"linea":"14","statement":"MatrizPosition","value":[{"linea":"14","statement":"variable","value":"i"}]},\n' +
    '{"linea":"14","statement":"MatrizPosition","value":[{"linea":"14","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"14","operator":[{"linea":"14","v":"="}],"Expression":[{"linea":"14","statement":"Aritmetic","Aritmetic":"-","Expression1":[{"linea":"14","statement":"Aritmetic","Aritmetic":"**","Expression1":[{"linea":"14","statement":"variable","value":"i"}],"Expression2":[{"linea":"14","tipo":"number", "value":"3"}]}],"Expression2":[{"linea":"14","statement":"Aritmetic","Aritmetic":"**","Expression1":[{"linea":"14","statement":"variable","value":"j"}],"Expression2":[{"linea":"14","tipo":"number", "value":"2"}]}]}]}]},\n' +
    '{"linea":"15","statement":"asignation","variable":"matrix3","params":[{"linea":"15","statement":"ArrayList","value":[{"linea":"15","statement":"MatrizPosition","value":[{"linea":"15","statement":"variable","value":"i"}]},\n' +
    '{"linea":"15","statement":"MatrizPosition","value":[{"linea":"15","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"15","operator":[{"linea":"15","v":"="}],"Expression":[{"linea":"15","tipo":"number", "value":"0"}]}]}]}]}]},\n' +
    '{"linea":"28","statement":"funcion","name":"print","type":[{"linea":"20","tipo":[{"linea":"20","tipo":"void"}],"size":[]}],"params":[{"linea":"20","statement":"parameter","name":"matrix","tipo":[{"linea":"20","tipo":[{"linea":"20","tipo":"number"}],"size":[{"linea":"20","statement":"arreglo","value":[]},\n' +
    '{"linea":"20","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"27","statement":"for","ExpresionInitial":[{"linea":"21","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"21","tipo":"let"}],"name":"i","ValExpression":[{"linea":"21","operator":[{"linea":"21","v":"="}],"Expression":[{"linea":"21","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"21","statement":"Relational","Relational":"<","Expression1":[{"linea":"21","statement":"variable","value":"i"}],"Expression2":[{"linea":"21","statement":"nativeArray", "name":"matrix" ,"hijo":[],"native":"length"}]}],"ExpressionFinal":[{"linea":"21","statement":"postincrement1","padre":[{"linea":"21","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"22","statement":"declaration","type":[{"linea":"22","tipo":[{"linea":"22","tipo":"let"}],"size":[]}], "values":[{"linea":"22","statement":"variable","tipoExpresion":[],"name":"salida","ValExpression":[{"linea":"22","operator":[{"linea":"22","v":"="}],"Expression":[{"linea":"22","tipo":"string3", "value":""}]}]}]},\n' +
    '{"linea":"25","statement":"for","ExpresionInitial":[{"linea":"23","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"23","tipo":"let"}],"name":"j","ValExpression":[{"linea":"23","operator":[{"linea":"23","v":"="}],"Expression":[{"linea":"23","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"23","statement":"Relational","Relational":"<","Expression1":[{"linea":"23","statement":"variable","value":"j"}],"Expression2":[{"linea":"23","statement":"nativeArray", "name":"matrix" ,"hijo":[{"linea":"23","statement":"ArrayList","value":[{"linea":"23","statement":"MatrizPosition","value":[{"linea":"23","statement":"variable","value":"i"}]}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"23","statement":"postincrement1","padre":[{"linea":"23","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"24","statement":"asignation","variable":"salida","params":[],"ValExpression":[{"linea":"24","operator":[{"linea":"24","v":"="}],"Expression":[{"linea":"24","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"24","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"24","statement":"variable","value":"salida"}],"Expression2":[{"linea":"24","tipo":"string1", "value":"\\t|\\t"}]}],"Expression2":[{"linea":"24","statement":"callAtributo", "value":"matrix", "hijo":[{"linea":"24","statement":"ArrayList","value":[{"linea":"24","statement":"MatrizPosition","value":[{"linea":"24","statement":"variable","value":"i"}]},\n' +
    '{"linea":"24","statement":"MatrizPosition","value":[{"linea":"24","statement":"variable","value":"j"}]}]}]}]}]}]}]},\n' +
    '{"linea":"26","statement":"console","expression":[{"linea":"26","statement":"variable","value":"salida"}]}]}]},\n' +
    '{"linea":"36","statement":"funcion","name":"suma","type":[],"params":[{"linea":"30","statement":"parameter","name":"matrix1","tipo":[{"linea":"30","tipo":[{"linea":"30","tipo":"number"}],"size":[{"linea":"30","statement":"arreglo","value":[]},\n' +
    '{"linea":"30","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"30","statement":"parameter","name":"matrix2","tipo":[{"linea":"30","tipo":[{"linea":"30","tipo":"number"}],"size":[{"linea":"30","statement":"arreglo","value":[]},\n' +
    '{"linea":"30","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"30","statement":"parameter","name":"matrixR","tipo":[{"linea":"30","tipo":[{"linea":"30","tipo":"number"}],"size":[{"linea":"30","statement":"arreglo","value":[]},\n' +
    '{"linea":"30","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"35","statement":"for","ExpresionInitial":[{"linea":"31","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"31","tipo":"let"}],"name":"i","ValExpression":[{"linea":"31","operator":[{"linea":"31","v":"="}],"Expression":[{"linea":"31","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"31","statement":"Relational","Relational":"<","Expression1":[{"linea":"31","statement":"variable","value":"i"}],"Expression2":[{"linea":"31","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"31","statement":"postincrement1","padre":[{"linea":"31","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"34","statement":"for","ExpresionInitial":[{"linea":"32","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"32","tipo":"let"}],"name":"j","ValExpression":[{"linea":"32","operator":[{"linea":"32","v":"="}],"Expression":[{"linea":"32","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"32","statement":"Relational","Relational":"<","Expression1":[{"linea":"32","statement":"variable","value":"j"}],"Expression2":[{"linea":"32","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"32","statement":"postincrement1","padre":[{"linea":"32","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"33","statement":"asignation","variable":"matrixR","params":[{"linea":"33","statement":"ArrayList","value":[{"linea":"33","statement":"MatrizPosition","value":[{"linea":"33","statement":"variable","value":"i"}]},\n' +
    '{"linea":"33","statement":"MatrizPosition","value":[{"linea":"33","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"33","operator":[{"linea":"33","v":"="}],"Expression":[{"linea":"33","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"33","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"33","statement":"ArrayList","value":[{"linea":"33","statement":"MatrizPosition","value":[{"linea":"33","statement":"variable","value":"i"}]},\n' +
    '{"linea":"33","statement":"MatrizPosition","value":[{"linea":"33","statement":"variable","value":"j"}]}]}]}],"Expression2":[{"linea":"33","statement":"callAtributo", "value":"matrix2", "hijo":[{"linea":"33","statement":"ArrayList","value":[{"linea":"33","statement":"MatrizPosition","value":[{"linea":"33","statement":"variable","value":"i"}]},\n' +
    '{"linea":"33","statement":"MatrizPosition","value":[{"linea":"33","statement":"variable","value":"j"}]}]}]}]}]}]}]}]}]},\n' +
    '{"linea":"50","statement":"funcion","name":"sumarFilas","type":[{"linea":"38","tipo":[{"linea":"38","tipo":"void"}],"size":[]}],"params":[{"linea":"38","statement":"parameter","name":"matrix","tipo":[{"linea":"38","tipo":[{"linea":"38","tipo":"number"}],"size":[{"linea":"38","statement":"arreglo","value":[]},\n' +
    '{"linea":"38","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"39","statement":"declaration","type":[{"linea":"39","tipo":[{"linea":"39","tipo":"let"}],"size":[]}], "values":[{"linea":"39","statement":"variable","tipoExpresion":[],"name":"contador","ValExpression":[{"linea":"39","operator":[{"linea":"39","v":"="}],"Expression":[{"linea":"39","tipo":"number", "value":"0"}]}]}]},\n' +
    '{"linea":"40","statement":"console","expression":[{"linea":"40","tipo":"string1", "value":"\\t\\t\\t\\t\\t\\t\\t\\t\\t\\tR"}]},\n' +
    '{"linea":"49","statement":"for","ExpresionInitial":[{"linea":"41","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"41","tipo":"let"}],"name":"i","ValExpression":[{"linea":"41","operator":[{"linea":"41","v":"="}],"Expression":[{"linea":"41","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"41","statement":"Relational","Relational":"<","Expression1":[{"linea":"41","statement":"variable","value":"i"}],"Expression2":[{"linea":"41","statement":"nativeArray", "name":"matrix" ,"hijo":[],"native":"length"}]}],"ExpressionFinal":[{"linea":"41","statement":"postincrement1","padre":[{"linea":"41","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"42","statement":"asignation","variable":"contador","params":[],"ValExpression":[{"linea":"42","operator":[{"linea":"42","v":"="}],"Expression":[{"linea":"42","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"43","statement":"declaration","type":[{"linea":"43","tipo":[{"linea":"43","tipo":"let"}],"size":[]}], "values":[{"linea":"43","statement":"variable","tipoExpresion":[],"name":"salida","ValExpression":[{"linea":"43","operator":[{"linea":"43","v":"="}],"Expression":[{"linea":"43","tipo":"string3", "value":""}]}]}]},\n' +
    '{"linea":"47","statement":"for","ExpresionInitial":[{"linea":"44","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"44","tipo":"let"}],"name":"j","ValExpression":[{"linea":"44","operator":[{"linea":"44","v":"="}],"Expression":[{"linea":"44","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"44","statement":"Relational","Relational":"<","Expression1":[{"linea":"44","statement":"variable","value":"j"}],"Expression2":[{"linea":"44","statement":"nativeArray", "name":"matrix" ,"hijo":[{"linea":"44","statement":"ArrayList","value":[{"linea":"44","statement":"MatrizPosition","value":[{"linea":"44","statement":"variable","value":"i"}]}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"44","statement":"postincrement1","padre":[{"linea":"44","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"45","statement":"asignation","variable":"contador","params":[],"ValExpression":[{"linea":"45","operator":[{"linea":"45","v":"="}],"Expression":[{"linea":"45","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"45","statement":"variable","value":"contador"}],"Expression2":[{"linea":"45","statement":"callAtributo", "value":"matrix", "hijo":[{"linea":"45","statement":"ArrayList","value":[{"linea":"45","statement":"MatrizPosition","value":[{"linea":"45","statement":"variable","value":"i"}]},\n' +
    '{"linea":"45","statement":"MatrizPosition","value":[{"linea":"45","statement":"variable","value":"j"}]}]}]}]}]}]},\n' +
    '{"linea":"46","statement":"asignation","variable":"salida","params":[],"ValExpression":[{"linea":"46","operator":[{"linea":"46","v":"="}],"Expression":[{"linea":"46","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"46","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"46","statement":"variable","value":"salida"}],"Expression2":[{"linea":"46","tipo":"string1", "value":"\\t|\\t"}]}],"Expression2":[{"linea":"46","statement":"callAtributo", "value":"matrix", "hijo":[{"linea":"46","statement":"ArrayList","value":[{"linea":"46","statement":"MatrizPosition","value":[{"linea":"46","statement":"variable","value":"i"}]},\n' +
    '{"linea":"46","statement":"MatrizPosition","value":[{"linea":"46","statement":"variable","value":"j"}]}]}]}]}]}]}]},\n' +
    '{"linea":"48","statement":"console","expression":[{"linea":"48","statement":"variable","value":"salida"},\n' +
    '{"linea":"48","tipo":"string1", "value":"\\t|\\t"},\n' +
    '{"linea":"48","statement":"variable","value":"contador"}]}]}]},\n' +
    '{"linea":"63","statement":"funcion","name":"sumarColumnas","type":[{"linea":"52","tipo":[{"linea":"52","tipo":"void"}],"size":[]}],"params":[{"linea":"52","statement":"parameter","name":"matrix","tipo":[{"linea":"52","tipo":[{"linea":"52","tipo":"number"}],"size":[{"linea":"52","statement":"arreglo","value":[]},\n' +
    '{"linea":"52","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"53","statement":"declaration","type":[{"linea":"53","tipo":[{"linea":"53","tipo":"let"}],"size":[]}], "values":[{"linea":"53","statement":"variable","tipoExpresion":[],"name":"contador","ValExpression":[{"linea":"53","operator":[{"linea":"53","v":"="}],"Expression":[{"linea":"53","tipo":"number", "value":"0"}]}]}]},\n' +
    '{"linea":"54","statement":"declaration","type":[{"linea":"54","tipo":[{"linea":"54","tipo":"let"}],"size":[]}], "values":[{"linea":"54","statement":"variable","tipoExpresion":[],"name":"salida","ValExpression":[{"linea":"54","operator":[{"linea":"54","v":"="}],"Expression":[{"linea":"54","tipo":"string3", "value":"R"}]}]}]},\n' +
    '{"linea":"61","statement":"for","ExpresionInitial":[{"linea":"55","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"55","tipo":"let"}],"name":"i","ValExpression":[{"linea":"55","operator":[{"linea":"55","v":"="}],"Expression":[{"linea":"55","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"55","statement":"Relational","Relational":"<","Expression1":[{"linea":"55","statement":"variable","value":"i"}],"Expression2":[{"linea":"55","statement":"nativeArray", "name":"matrix" ,"hijo":[],"native":"length"}]}],"ExpressionFinal":[{"linea":"55","statement":"postincrement1","padre":[{"linea":"55","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"56","statement":"asignation","variable":"contador","params":[],"ValExpression":[{"linea":"56","operator":[{"linea":"56","v":"="}],"Expression":[{"linea":"56","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"59","statement":"for","ExpresionInitial":[{"linea":"57","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"57","tipo":"let"}],"name":"j","ValExpression":[{"linea":"57","operator":[{"linea":"57","v":"="}],"Expression":[{"linea":"57","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"57","statement":"Relational","Relational":"<","Expression1":[{"linea":"57","statement":"variable","value":"j"}],"Expression2":[{"linea":"57","statement":"nativeArray", "name":"matrix" ,"hijo":[{"linea":"57","statement":"ArrayList","value":[{"linea":"57","statement":"MatrizPosition","value":[{"linea":"57","statement":"variable","value":"i"}]}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"57","statement":"postincrement1","padre":[{"linea":"57","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"58","statement":"asignation","variable":"contador","params":[],"ValExpression":[{"linea":"58","operator":[{"linea":"58","v":"="}],"Expression":[{"linea":"58","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"58","statement":"variable","value":"contador"}],"Expression2":[{"linea":"58","statement":"callAtributo", "value":"matrix", "hijo":[{"linea":"58","statement":"ArrayList","value":[{"linea":"58","statement":"MatrizPosition","value":[{"linea":"58","statement":"variable","value":"j"}]},\n' +
    '{"linea":"58","statement":"MatrizPosition","value":[{"linea":"58","statement":"variable","value":"i"}]}]}]}]}]}]}]},\n' +
    '{"linea":"60","statement":"asignation","variable":"salida","params":[],"ValExpression":[{"linea":"60","operator":[{"linea":"60","v":"="}],"Expression":[{"linea":"60","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"60","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"60","statement":"variable","value":"salida"}],"Expression2":[{"linea":"60","tipo":"string1", "value":"\\t|\\t"}]}],"Expression2":[{"linea":"60","statement":"variable","value":"contador"}]}]}]}]},\n' +
    '{"linea":"62","statement":"console","expression":[{"linea":"62","statement":"variable","value":"salida"}]}]},\n' +
    '{"linea":"72","statement":"funcion","name":"resta","type":[],"params":[{"linea":"66","statement":"parameter","name":"matrix1","tipo":[{"linea":"66","tipo":[{"linea":"66","tipo":"number"}],"size":[{"linea":"66","statement":"arreglo","value":[]},\n' +
    '{"linea":"66","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"66","statement":"parameter","name":"matrix2","tipo":[{"linea":"66","tipo":[{"linea":"66","tipo":"number"}],"size":[{"linea":"66","statement":"arreglo","value":[]},\n' +
    '{"linea":"66","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"66","statement":"parameter","name":"matrixR","tipo":[{"linea":"66","tipo":[{"linea":"66","tipo":"number"}],"size":[{"linea":"66","statement":"arreglo","value":[]},\n' +
    '{"linea":"66","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"71","statement":"for","ExpresionInitial":[{"linea":"67","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"67","tipo":"let"}],"name":"i","ValExpression":[{"linea":"67","operator":[{"linea":"67","v":"="}],"Expression":[{"linea":"67","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"67","statement":"Relational","Relational":"<","Expression1":[{"linea":"67","statement":"variable","value":"i"}],"Expression2":[{"linea":"67","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"67","statement":"postincrement1","padre":[{"linea":"67","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"70","statement":"for","ExpresionInitial":[{"linea":"68","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"68","tipo":"let"}],"name":"j","ValExpression":[{"linea":"68","operator":[{"linea":"68","v":"="}],"Expression":[{"linea":"68","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"68","statement":"Relational","Relational":"<","Expression1":[{"linea":"68","statement":"variable","value":"j"}],"Expression2":[{"linea":"68","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"68","statement":"postincrement1","padre":[{"linea":"68","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"69","statement":"asignation","variable":"matrixR","params":[{"linea":"69","statement":"ArrayList","value":[{"linea":"69","statement":"MatrizPosition","value":[{"linea":"69","statement":"variable","value":"i"}]},\n' +
    '{"linea":"69","statement":"MatrizPosition","value":[{"linea":"69","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"69","operator":[{"linea":"69","v":"="}],"Expression":[{"linea":"69","statement":"Aritmetic","Aritmetic":"-","Expression1":[{"linea":"69","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"69","statement":"ArrayList","value":[{"linea":"69","statement":"MatrizPosition","value":[{"linea":"69","statement":"variable","value":"i"}]},\n' +
    '{"linea":"69","statement":"MatrizPosition","value":[{"linea":"69","statement":"variable","value":"j"}]}]}]}],"Expression2":[{"linea":"69","statement":"callAtributo", "value":"matrix2", "hijo":[{"linea":"69","statement":"ArrayList","value":[{"linea":"69","statement":"MatrizPosition","value":[{"linea":"69","statement":"variable","value":"i"}]},\n' +
    '{"linea":"69","statement":"MatrizPosition","value":[{"linea":"69","statement":"variable","value":"j"}]}]}]}]}]}]}]}]}]},\n' +
    '{"linea":"83","statement":"funcion","name":"multiplicar","type":[],"params":[{"linea":"75","statement":"parameter","name":"matrix1","tipo":[{"linea":"75","tipo":[{"linea":"75","tipo":"number"}],"size":[{"linea":"75","statement":"arreglo","value":[]},\n' +
    '{"linea":"75","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"75","statement":"parameter","name":"matrix2","tipo":[{"linea":"75","tipo":[{"linea":"75","tipo":"number"}],"size":[{"linea":"75","statement":"arreglo","value":[]},\n' +
    '{"linea":"75","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"75","statement":"parameter","name":"matrixR","tipo":[{"linea":"75","tipo":[{"linea":"75","tipo":"number"}],"size":[{"linea":"75","statement":"arreglo","value":[]},\n' +
    '{"linea":"75","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"82","statement":"for","ExpresionInitial":[{"linea":"76","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"76","tipo":"let"}],"name":"i","ValExpression":[{"linea":"76","operator":[{"linea":"76","v":"="}],"Expression":[{"linea":"76","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"76","statement":"Relational","Relational":"<","Expression1":[{"linea":"76","statement":"variable","value":"i"}],"Expression2":[{"linea":"76","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"76","statement":"postincrement1","padre":[{"linea":"76","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"81","statement":"for","ExpresionInitial":[{"linea":"77","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"77","tipo":"let"}],"name":"j","ValExpression":[{"linea":"77","operator":[{"linea":"77","v":"="}],"Expression":[{"linea":"77","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"77","statement":"Relational","Relational":"<","Expression1":[{"linea":"77","statement":"variable","value":"j"}],"Expression2":[{"linea":"77","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"77","statement":"postincrement1","padre":[{"linea":"77","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"80","statement":"for","ExpresionInitial":[{"linea":"78","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"78","tipo":"let"}],"name":"k","ValExpression":[{"linea":"78","operator":[{"linea":"78","v":"="}],"Expression":[{"linea":"78","statement":"variable","value":"min"}]}]}],"Expressionvalue":[{"linea":"78","statement":"Relational","Relational":"<","Expression1":[{"linea":"78","statement":"variable","value":"k"}],"Expression2":[{"linea":"78","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"78","statement":"postincrement1","padre":[{"linea":"78","statement":"variable","value":"k","hijo":[]}]}],"body":[{"linea":"79","statement":"asignation","variable":"matrixR","params":[{"linea":"79","statement":"ArrayList","value":[{"linea":"79","statement":"MatrizPosition","value":[{"linea":"79","statement":"variable","value":"i"}]},\n' +
    '{"linea":"79","statement":"MatrizPosition","value":[{"linea":"79","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"79","operator":[{"linea":"79","v":"="}],"Expression":[{"linea":"79","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"79","statement":"callAtributo", "value":"matrixR", "hijo":[{"linea":"79","statement":"ArrayList","value":[{"linea":"79","statement":"MatrizPosition","value":[{"linea":"79","statement":"variable","value":"i"}]},\n' +
    '{"linea":"79","statement":"MatrizPosition","value":[{"linea":"79","statement":"variable","value":"j"}]}]}]}],"Expression2":[{"linea":"79","statement":"Aritmetic","Aritmetic":"*","Expression1":[{"linea":"79","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"79","statement":"ArrayList","value":[{"linea":"79","statement":"MatrizPosition","value":[{"linea":"79","statement":"variable","value":"i"}]},\n' +
    '{"linea":"79","statement":"MatrizPosition","value":[{"linea":"79","statement":"variable","value":"k"}]}]}]}],"Expression2":[{"linea":"79","statement":"callAtributo", "value":"matrix2", "hijo":[{"linea":"79","statement":"ArrayList","value":[{"linea":"79","statement":"MatrizPosition","value":[{"linea":"79","statement":"variable","value":"k"}]},\n' +
    '{"linea":"79","statement":"MatrizPosition","value":[{"linea":"79","statement":"variable","value":"j"}]}]}]}]}]}]}]}]}]}]}]},\n' +
    '{"linea":"98","statement":"funcion","name":"transpuesta","type":[],"params":[{"linea":"85","statement":"parameter","name":"matrix1","tipo":[{"linea":"85","tipo":[{"linea":"85","tipo":"number"}],"size":[{"linea":"85","statement":"arreglo","value":[]},\n' +
    '{"linea":"85","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"86","statement":"declaration","type":[{"linea":"86","tipo":[{"linea":"86","tipo":"const"}],"size":[]}], "values":[{"linea":"86","statement":"variable","tipoExpresion":[{"linea":"86","tipo":[{"linea":"86","tipo":"number"}],"size":[{"linea":"86","statement":"arreglo","value":[]},\n' +
    '{"linea":"86","statement":"arreglo","value":[]}]}],"name":"matrixAux","ValExpression":[{"linea":"86","operator":[{"linea":"86","v":"="}],"Expression":[{"linea":"86","statement":"arreglo","value":[]}]}]}]},\n' +
    '{"linea":"92","statement":"for","ExpresionInitial":[{"linea":"87","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"87","tipo":"let"}],"name":"i","ValExpression":[{"linea":"87","operator":[{"linea":"87","v":"="}],"Expression":[{"linea":"87","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"87","statement":"Relational","Relational":"<","Expression1":[{"linea":"87","statement":"variable","value":"i"}],"Expression2":[{"linea":"87","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"87","statement":"postincrement1","padre":[{"linea":"87","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"88","statement":"asignation","variable":"matrixAux","params":[{"linea":"88","statement":"ArrayList","value":[{"linea":"88","statement":"MatrizPosition","value":[{"linea":"88","statement":"variable","value":"i"}]}]}],"ValExpression":[{"linea":"88","operator":[{"linea":"88","v":"="}],"Expression":[{"linea":"88","statement":"arreglo","value":[]}]}]},\n' +
    '{"linea":"91","statement":"for","ExpresionInitial":[{"linea":"89","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"89","tipo":"let"}],"name":"j","ValExpression":[{"linea":"89","operator":[{"linea":"89","v":"="}],"Expression":[{"linea":"89","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"89","statement":"Relational","Relational":"<","Expression1":[{"linea":"89","statement":"variable","value":"j"}],"Expression2":[{"linea":"89","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"89","statement":"postincrement1","padre":[{"linea":"89","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"90","statement":"asignation","variable":"matrixAux","params":[{"linea":"90","statement":"ArrayList","value":[{"linea":"90","statement":"MatrizPosition","value":[{"linea":"90","statement":"variable","value":"i"}]},\n' +
    '{"linea":"90","statement":"MatrizPosition","value":[{"linea":"90","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"90","operator":[{"linea":"90","v":"="}],"Expression":[{"linea":"90","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"90","statement":"ArrayList","value":[{"linea":"90","statement":"MatrizPosition","value":[{"linea":"90","statement":"variable","value":"j"}]},\n' +
    '{"linea":"90","statement":"MatrizPosition","value":[{"linea":"90","statement":"variable","value":"i"}]}]}]}]}]}]}]},\n' +
    '{"linea":"97","statement":"for","ExpresionInitial":[{"linea":"93","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"93","tipo":"let"}],"name":"i","ValExpression":[{"linea":"93","operator":[{"linea":"93","v":"="}],"Expression":[{"linea":"93","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"93","statement":"Relational","Relational":"<","Expression1":[{"linea":"93","statement":"variable","value":"i"}],"Expression2":[{"linea":"93","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"93","statement":"postincrement1","padre":[{"linea":"93","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"96","statement":"for","ExpresionInitial":[{"linea":"94","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"94","tipo":"let"}],"name":"j","ValExpression":[{"linea":"94","operator":[{"linea":"94","v":"="}],"Expression":[{"linea":"94","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"94","statement":"Relational","Relational":"<","Expression1":[{"linea":"94","statement":"variable","value":"j"}],"Expression2":[{"linea":"94","statement":"variable","value":"max"}]}],"ExpressionFinal":[{"linea":"94","statement":"postincrement1","padre":[{"linea":"94","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"95","statement":"asignation","variable":"matrix1","params":[{"linea":"95","statement":"ArrayList","value":[{"linea":"95","statement":"MatrizPosition","value":[{"linea":"95","statement":"variable","value":"i"}]},\n' +
    '{"linea":"95","statement":"MatrizPosition","value":[{"linea":"95","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"95","operator":[{"linea":"95","v":"="}],"Expression":[{"linea":"95","statement":"callAtributo", "value":"matrixAux", "hijo":[{"linea":"95","statement":"ArrayList","value":[{"linea":"95","statement":"MatrizPosition","value":[{"linea":"95","statement":"variable","value":"i"}]},\n' +
    '{"linea":"95","statement":"MatrizPosition","value":[{"linea":"95","statement":"variable","value":"j"}]}]}]}]}]}]}]}]},\n' +
    '{"linea":"114","statement":"funcion","name":"minValue","type":[{"linea":"100","tipo":[{"linea":"100","tipo":"number"}],"size":[]}],"params":[{"linea":"100","statement":"parameter","name":"matrix1","tipo":[{"linea":"100","tipo":[{"linea":"100","tipo":"number"}],"size":[{"linea":"100","statement":"arreglo","value":[]},\n' +
    '{"linea":"100","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"102","statement":"declaration","type":[{"linea":"102","tipo":[{"linea":"102","tipo":"let"}],"size":[]}], "values":[{"linea":"102","statement":"variable","tipoExpresion":[],"name":"iAux","ValExpression":[{"linea":"102","operator":[{"linea":"102","v":"="}],"Expression":[{"linea":"102","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"102","statement":"variable","tipoExpresion":[],"name":"jAux","ValExpression":[{"linea":"102","operator":[{"linea":"102","v":"="}],"Expression":[{"linea":"102","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"102","statement":"variable","tipoExpresion":[],"name":"temp","ValExpression":[{"linea":"102","operator":[{"linea":"102","v":"="}],"Expression":[{"linea":"102","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"102","statement":"ArrayList","value":[{"linea":"102","statement":"MatrizPosition","value":[{"linea":"102","statement":"variable","value":"min"}]},\n' +
    '{"linea":"102","statement":"MatrizPosition","value":[{"linea":"102","statement":"variable","value":"min"}]}]}]}]}]}]},\n' +
    '{"linea":"111","statement":"for","ExpresionInitial":[{"linea":"103","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"103","tipo":"let"}],"name":"i","ValExpression":[{"linea":"103","operator":[{"linea":"103","v":"="}],"Expression":[{"linea":"103","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"103","statement":"Relational","Relational":"<","Expression1":[{"linea":"103","statement":"variable","value":"i"}],"Expression2":[{"linea":"103","statement":"nativeArray", "name":"matrix1" ,"hijo":[],"native":"length"}]}],"ExpressionFinal":[{"linea":"103","statement":"postincrement1","padre":[{"linea":"103","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"110","statement":"for","ExpresionInitial":[{"linea":"104","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"104","tipo":"let"}],"name":"j","ValExpression":[{"linea":"104","operator":[{"linea":"104","v":"="}],"Expression":[{"linea":"104","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"104","statement":"Relational","Relational":"<","Expression1":[{"linea":"104","statement":"variable","value":"j"}],"Expression2":[{"linea":"104","statement":"nativeArray", "name":"matrix1" ,"hijo":[{"linea":"104","statement":"ArrayList","value":[{"linea":"104","statement":"MatrizPosition","value":[{"linea":"104","statement":"variable","value":"i"}]}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"104","statement":"postincrement1","padre":[{"linea":"104","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"109","statement":"if","Expression":[{"linea":"105","statement":"Relational","Relational":"<","Expression1":[{"linea":"105","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"105","statement":"ArrayList","value":[{"linea":"105","statement":"MatrizPosition","value":[{"linea":"105","statement":"variable","value":"i"}]},\n' +
    '{"linea":"105","statement":"MatrizPosition","value":[{"linea":"105","statement":"variable","value":"j"}]}]}]}],"Expression2":[{"linea":"105","statement":"variable","value":"temp"}]}],"body":[{"linea":"106","statement":"asignation","variable":"temp","params":[],"ValExpression":[{"linea":"106","operator":[{"linea":"106","v":"="}],"Expression":[{"linea":"106","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"106","statement":"ArrayList","value":[{"linea":"106","statement":"MatrizPosition","value":[{"linea":"106","statement":"variable","value":"i"}]},\n' +
    '{"linea":"106","statement":"MatrizPosition","value":[{"linea":"106","statement":"variable","value":"j"}]}]}]}]}]},\n' +
    '{"linea":"107","statement":"asignation","variable":"iAux","params":[],"ValExpression":[{"linea":"107","operator":[{"linea":"107","v":"="}],"Expression":[{"linea":"107","statement":"variable","value":"i"}]}]},\n' +
    '{"linea":"108","statement":"asignation","variable":"jAux","params":[],"ValExpression":[{"linea":"108","operator":[{"linea":"108","v":"="}],"Expression":[{"linea":"108","statement":"variable","value":"j"}]}]}], "else":[]}]}]},\n' +
    '{"linea":"112","statement":"console","expression":[{"linea":"112","tipo":"string1", "value":"Min -> ["},\n' +
    '{"linea":"112","statement":"variable","value":"iAux"},\n' +
    '{"linea":"112","tipo":"string1", "value":","},\n' +
    '{"linea":"112","statement":"variable","value":"jAux"},\n' +
    '{"linea":"112","tipo":"string1", "value":"] = "},\n' +
    '{"linea":"112","statement":"variable","value":"temp"}]},\n' +
    '{"linea":"113","statement":"return", "Expression":[{"linea":"113","statement":"variable","value":"temp"}]}]},\n' +
    '{"linea":"129","statement":"funcion","name":"maxValue","type":[{"linea":"116","tipo":[{"linea":"116","tipo":"number"}],"size":[]}],"params":[{"linea":"116","statement":"parameter","name":"matrix1","tipo":[{"linea":"116","tipo":[{"linea":"116","tipo":"number"}],"size":[{"linea":"116","statement":"arreglo","value":[]},\n' +
    '{"linea":"116","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"117","statement":"declaration","type":[{"linea":"117","tipo":[{"linea":"117","tipo":"let"}],"size":[]}], "values":[{"linea":"117","statement":"variable","tipoExpresion":[],"name":"iAux","ValExpression":[{"linea":"117","operator":[{"linea":"117","v":"="}],"Expression":[{"linea":"117","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"117","statement":"variable","tipoExpresion":[],"name":"jAux","ValExpression":[{"linea":"117","operator":[{"linea":"117","v":"="}],"Expression":[{"linea":"117","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"117","statement":"variable","tipoExpresion":[],"name":"temp","ValExpression":[{"linea":"117","operator":[{"linea":"117","v":"="}],"Expression":[{"linea":"117","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"117","statement":"ArrayList","value":[{"linea":"117","statement":"MatrizPosition","value":[{"linea":"117","statement":"variable","value":"min"}]},\n' +
    '{"linea":"117","statement":"MatrizPosition","value":[{"linea":"117","statement":"variable","value":"min"}]}]}]}]}]}]},\n' +
    '{"linea":"126","statement":"for","ExpresionInitial":[{"linea":"118","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"118","tipo":"let"}],"name":"i","ValExpression":[{"linea":"118","operator":[{"linea":"118","v":"="}],"Expression":[{"linea":"118","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"118","statement":"Relational","Relational":"<","Expression1":[{"linea":"118","statement":"variable","value":"i"}],"Expression2":[{"linea":"118","statement":"nativeArray", "name":"matrix1" ,"hijo":[],"native":"length"}]}],"ExpressionFinal":[{"linea":"118","statement":"postincrement1","padre":[{"linea":"118","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"125","statement":"for","ExpresionInitial":[{"linea":"119","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"119","tipo":"let"}],"name":"j","ValExpression":[{"linea":"119","operator":[{"linea":"119","v":"="}],"Expression":[{"linea":"119","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"119","statement":"Relational","Relational":"<","Expression1":[{"linea":"119","statement":"variable","value":"j"}],"Expression2":[{"linea":"119","statement":"nativeArray", "name":"matrix1" ,"hijo":[{"linea":"119","statement":"ArrayList","value":[{"linea":"119","statement":"MatrizPosition","value":[{"linea":"119","statement":"variable","value":"i"}]}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"119","statement":"postincrement1","padre":[{"linea":"119","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"124","statement":"if","Expression":[{"linea":"120","statement":"Relational","Relational":">","Expression1":[{"linea":"120","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"120","statement":"ArrayList","value":[{"linea":"120","statement":"MatrizPosition","value":[{"linea":"120","statement":"variable","value":"i"}]},\n' +
    '{"linea":"120","statement":"MatrizPosition","value":[{"linea":"120","statement":"variable","value":"j"}]}]}]}],"Expression2":[{"linea":"120","statement":"variable","value":"temp"}]}],"body":[{"linea":"121","statement":"asignation","variable":"temp","params":[],"ValExpression":[{"linea":"121","operator":[{"linea":"121","v":"="}],"Expression":[{"linea":"121","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"121","statement":"ArrayList","value":[{"linea":"121","statement":"MatrizPosition","value":[{"linea":"121","statement":"variable","value":"i"}]},\n' +
    '{"linea":"121","statement":"MatrizPosition","value":[{"linea":"121","statement":"variable","value":"j"}]}]}]}]}]},\n' +
    '{"linea":"122","statement":"asignation","variable":"iAux","params":[],"ValExpression":[{"linea":"122","operator":[{"linea":"122","v":"="}],"Expression":[{"linea":"122","statement":"variable","value":"i"}]}]},\n' +
    '{"linea":"123","statement":"asignation","variable":"jAux","params":[],"ValExpression":[{"linea":"123","operator":[{"linea":"123","v":"="}],"Expression":[{"linea":"123","statement":"variable","value":"j"}]}]}], "else":[]}]}]},\n' +
    '{"linea":"127","statement":"console","expression":[{"linea":"127","tipo":"string1", "value":"Max -> ["},\n' +
    '{"linea":"127","statement":"variable","value":"iAux"},\n' +
    '{"linea":"127","tipo":"string1", "value":","},\n' +
    '{"linea":"127","statement":"variable","value":"jAux"},\n' +
    '{"linea":"127","tipo":"string1", "value":"] = "},\n' +
    '{"linea":"127","statement":"variable","value":"temp"}]},\n' +
    '{"linea":"128","statement":"return", "Expression":[{"linea":"128","statement":"variable","value":"temp"}]}]},\n' +
    '{"linea":"146","statement":"funcion","name":"ordenar","type":[],"params":[{"linea":"131","statement":"parameter","name":"matrix1","tipo":[{"linea":"131","tipo":[{"linea":"131","tipo":"number"}],"size":[{"linea":"131","statement":"arreglo","value":[]},\n' +
    '{"linea":"131","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"132","statement":"declaration","type":[{"linea":"132","tipo":[{"linea":"132","tipo":"let"}],"size":[]}], "values":[{"linea":"132","statement":"variable","tipoExpresion":[],"name":"aux","ValExpression":[{"linea":"132","operator":[{"linea":"132","v":"="}],"Expression":[{"linea":"132","tipo":"number", "value":"0"}]}]}]},\n' +
    '{"linea":"145","statement":"for","ExpresionInitial":[{"linea":"133","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"133","tipo":"let"}],"name":"i","ValExpression":[{"linea":"133","operator":[{"linea":"133","v":"="}],"Expression":[{"linea":"133","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"133","statement":"Relational","Relational":"<","Expression1":[{"linea":"133","statement":"variable","value":"i"}],"Expression2":[{"linea":"133","statement":"nativeArray", "name":"matrix1" ,"hijo":[],"native":"length"}]}],"ExpressionFinal":[{"linea":"133","statement":"postincrement1","padre":[{"linea":"133","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"144","statement":"for","ExpresionInitial":[{"linea":"134","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"134","tipo":"let"}],"name":"j","ValExpression":[{"linea":"134","operator":[{"linea":"134","v":"="}],"Expression":[{"linea":"134","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"134","statement":"Relational","Relational":"<","Expression1":[{"linea":"134","statement":"variable","value":"j"}],"Expression2":[{"linea":"134","statement":"nativeArray", "name":"matrix1" ,"hijo":[{"linea":"134","statement":"ArrayList","value":[{"linea":"134","statement":"MatrizPosition","value":[{"linea":"134","statement":"variable","value":"i"}]}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"134","statement":"postincrement1","padre":[{"linea":"134","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"143","statement":"for","ExpresionInitial":[{"linea":"135","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"135","tipo":"let"}],"name":"k","ValExpression":[{"linea":"135","operator":[{"linea":"135","v":"="}],"Expression":[{"linea":"135","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"135","statement":"Relational","Relational":"<=","Expression1":[{"linea":"135","statement":"variable","value":"k"}],"Expression2":[{"linea":"135","statement":"variable","value":"i"}]}],"ExpressionFinal":[{"linea":"135","statement":"postincrement1","padre":[{"linea":"135","statement":"variable","value":"k","hijo":[]}]}],"body":[{"linea":"142","statement":"for","ExpresionInitial":[{"linea":"136","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"136","tipo":"let"}],"name":"l","ValExpression":[{"linea":"136","operator":[{"linea":"136","v":"="}],"Expression":[{"linea":"136","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"136","statement":"Relational","Relational":"<=","Expression1":[{"linea":"136","statement":"variable","value":"l"}],"Expression2":[{"linea":"136","statement":"variable","value":"j"}]}],"ExpressionFinal":[{"linea":"136","statement":"postincrement1","padre":[{"linea":"136","statement":"variable","value":"l","hijo":[]}]}],"body":[{"linea":"141","statement":"if","Expression":[{"linea":"137","statement":"Relational","Relational":"<","Expression1":[{"linea":"137","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"137","statement":"ArrayList","value":[{"linea":"137","statement":"MatrizPosition","value":[{"linea":"137","statement":"variable","value":"i"}]},\n' +
    '{"linea":"137","statement":"MatrizPosition","value":[{"linea":"137","statement":"variable","value":"j"}]}]}]}],"Expression2":[{"linea":"137","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"137","statement":"ArrayList","value":[{"linea":"137","statement":"MatrizPosition","value":[{"linea":"137","statement":"variable","value":"k"}]},\n' +
    '{"linea":"137","statement":"MatrizPosition","value":[{"linea":"137","statement":"variable","value":"l"}]}]}]}]}],"body":[{"linea":"138","statement":"asignation","variable":"aux","params":[],"ValExpression":[{"linea":"138","operator":[{"linea":"138","v":"="}],"Expression":[{"linea":"138","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"138","statement":"ArrayList","value":[{"linea":"138","statement":"MatrizPosition","value":[{"linea":"138","statement":"variable","value":"i"}]},\n' +
    '{"linea":"138","statement":"MatrizPosition","value":[{"linea":"138","statement":"variable","value":"j"}]}]}]}]}]},\n' +
    '{"linea":"139","statement":"asignation","variable":"matrix1","params":[{"linea":"139","statement":"ArrayList","value":[{"linea":"139","statement":"MatrizPosition","value":[{"linea":"139","statement":"variable","value":"i"}]},\n' +
    '{"linea":"139","statement":"MatrizPosition","value":[{"linea":"139","statement":"variable","value":"j"}]}]}],"ValExpression":[{"linea":"139","operator":[{"linea":"139","v":"="}],"Expression":[{"linea":"139","statement":"callAtributo", "value":"matrix1", "hijo":[{"linea":"139","statement":"ArrayList","value":[{"linea":"139","statement":"MatrizPosition","value":[{"linea":"139","statement":"variable","value":"k"}]},\n' +
    '{"linea":"139","statement":"MatrizPosition","value":[{"linea":"139","statement":"variable","value":"l"}]}]}]}]}]},\n' +
    '{"linea":"140","statement":"asignation","variable":"matrix1","params":[{"linea":"140","statement":"ArrayList","value":[{"linea":"140","statement":"MatrizPosition","value":[{"linea":"140","statement":"variable","value":"k"}]},\n' +
    '{"linea":"140","statement":"MatrizPosition","value":[{"linea":"140","statement":"variable","value":"l"}]}]}],"ValExpression":[{"linea":"140","operator":[{"linea":"140","v":"="}],"Expression":[{"linea":"140","statement":"variable","value":"aux"}]}]}], "else":[]}]}]}]}]}]},\n' +
    '{"linea":"154","statement":"funcion","name":"clearMat","type":[],"params":[{"linea":"148","statement":"parameter","name":"matrix","tipo":[{"linea":"148","tipo":[{"linea":"148","tipo":"number"}],"size":[{"linea":"148","statement":"arreglo","value":[]},\n' +
    '{"linea":"148","statement":"arreglo","value":[]}]}]}],"body":[{"linea":"153","statement":"for","ExpresionInitial":[{"linea":"149","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"149","tipo":"let"}],"name":"i","ValExpression":[{"linea":"149","operator":[{"linea":"149","v":"="}],"Expression":[{"linea":"149","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"149","statement":"Relational","Relational":"<","Expression1":[{"linea":"149","statement":"variable","value":"i"}],"Expression2":[{"linea":"149","statement":"nativeArray", "name":"matrix" ,"hijo":[],"native":"length"}]}],"ExpressionFinal":[{"linea":"149","statement":"postincrement1","padre":[{"linea":"149","statement":"variable","value":"i","hijo":[]}]}],"body":[{"linea":"152","statement":"for","ExpresionInitial":[{"linea":"150","statement":"variable","tipoExpresion":[],"tipo":[{"linea":"150","tipo":"let"}],"name":"j","ValExpression":[{"linea":"150","operator":[{"linea":"150","v":"="}],"Expression":[{"linea":"150","tipo":"number", "value":"0"}]}]}],"Expressionvalue":[{"linea":"150","statement":"Relational","Relational":"<","Expression1":[{"linea":"150","statement":"variable","value":"j"}],"Expression2":[{"linea":"150","statement":"nativeArray", "name":"matrix" ,"hijo":[{"linea":"150","statement":"ArrayList","value":[{"linea":"150","statement":"MatrizPosition","value":[{"linea":"150","statement":"variable","value":"i"}]}]}],"native":"length"}]}],"ExpressionFinal":[{"linea":"150","statement":"postincrement1","padre":[{"linea":"150","statement":"variable","value":"j","hijo":[]}]}],"body":[{"linea":"151","statement":"asignation","variable":"matrix","params":[{"linea":"151","statement":"ArrayList","value":[{"linea":"151","statement":"MatrizPosition","value":[{"linea":"151","statement":"variable","value":"i"}]},\n' +
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
    '{"linea":"196","statement":""}]}'

let instrucciones: statement[] = [];
let tablasimbolo: tablasimbolos = new tablasimbolos();
let jsondata:string = '';
let erroresSemanticos:string = '';
let salida = '';
let lineas = 0;

let ts = '';
generatinginformationExample();
//console.log(instrucciones)
execute()
function getTs()
{

    ts = '{ \"simbolos\":['
    let m = 0
    for(let simbolo of tablasimbolo.simbolos)
    {
        let string = '{';
        string += '\"name\":\"'+simbolo.name+'\",'
        string += '\"ambito\":\"'+simbolo.ambito+'\",'
        string += '\"tipo\":\"'+TypeSym[simbolo.tipo]+'\",'
        string += '\"type\":\"'+TypeValue[simbolo.tipoValue]+'\"'
        string += '}'
        m++
        if(m<tablasimbolo.simbolos.length) string += ','
        ts += string
    }
    ts += ']}'
    console.log(ts);
}
function execute()
{
    tablasimbolo = new tablasimbolos();
    output = [];
    salida = '{\"salida\":[\n';
    if(erroresSemanticos=='')
    {
        for(let value of instrucciones)
        {
            if(value instanceof functions)
            {
                //console.log(value);
                value.execute(tablasimbolo);
            }
        }
        //getTs();
        //console.log(tablasimbolo)
        for(let value of instrucciones)
        {
            if(value instanceof statement)
            {
                if(value instanceof functions)
                {

                }
                else
                {
                    let result = value.execute(tablasimbolo);
                    if(result[0]>0)
                    {
                        if(output.length>0)
                        {
                            for(let resultadito of output)
                            {
                                salida += resultadito+',\n';
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
                    else if(result[0]==0)
                    {
                        console.log("finish without error...");
                    }
                    else
                    {
                        salida += '{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Linea: '+value.linea+', '+result[1]+'\"},\n';
                        console.log('finish with error...')
                        break;
                    }
                }
            }
        }
    }
    else
    {
        salida += '{\"valor\":\"El codigo posee errores semanticos\", \"errores\":['+erroresSemanticos+'}\n';
    }
    salida += '{\"linea\":\"'+lineas+'\",\"valor\":\"finish executing...\"}\n]}';
    console.log(salida);
}
function generatinginformationExample()
{

    let statement = JSON.parse(jsondata2);
    lineas = Number(statement.linea);
    let S = statement.S;
    for(let statement of S)
    {
        let stat = getStatement(statement);
        if(stat!=null) instrucciones.push(stat);
    }
}
function generatinginformation(jsondata)
{
    instrucciones = [];
    erroresSemanticos = '';
    salida = '';
    lineas = 0;
    let statement = JSON.parse(jsondata);
    lineas = Number(statement.linea);
    let S = statement.S;
    for(let statement of S)
    {
        let stat = getStatement(statement);
        if(stat!=null) instrucciones.push(stat);
    }
}
function getStatement(data):any
{
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
            return getCallFunction1(data)
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
            let variable = getVariable(data);
            if(variable!=null) instrucciones.push(variable);
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
            return getForOf(data)
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
            return getPreIncrement1(data)
        case "positivo":
            let numero1:Numbers = new Numbers();
            numero1.value = 1;
            numero1.tipoValue = TypeValue.Number;
            let sum:ArichmeticExpression = new ArichmeticExpression();
            sum.type = TypeStatement.ExpresionStatement;
            sum.linea = data.linea;
            sum.Function = ArichmeticExpr.multiplicacion;
            sum.Expression1 = getExpressiones(data.Expression1[0]);
            sum.Expression2 = numero1;
            return sum;
        case "negativo":
            let numero:Numbers = new Numbers();
            numero.value = -1;
            numero.tipoValue = TypeValue.Number;
            let negar:ArichmeticExpression = new ArichmeticExpression();
            negar.type = TypeStatement.ExpresionStatement;
            negar.linea = data.linea;
            negar.Function = ArichmeticExpr.multiplicacion;
            negar.Expression1 = getExpressiones(data.Expression1[0]);
            negar.Expression2 = numero;
            return negar;
        case "logical":
            let not:LogialExpression = new LogialExpression();
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
function getTipo(datas):any
{
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
    try
    {
        let data:TypeValue
        switch (datas[0].tipo[0].tipo)
        {
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
                data = TypeValue.void;
                break;
            case "var":
                data = TypeValue.var;
                break;
            case "const":
                data = TypeValue.const;
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
        let size = Number(datas[0].size.length)
        return [data,size];
    }
    catch (e) {
        return [null,0];
    }
}
function getDeclarations(data):statement[]
{
    try
    {


        let declaras = [];
        let error = 0;
        for(let decla of data)
        {
            let declarationes:declaration0 = new declaration0();
            declarationes.linea = Number(decla.linea)
            declarationes.name = decla.name
            declarationes.type = TypeStatement.DeclarationStatement
            if(decla.tipoExpresion.length>0)
            {
                let resultado = getTipo(decla.tipoExpresion);
                if(resultado[0] == TypeValue.Object)
                {
                    declarationes.tipo = TypeValue.type;
                    if(decla.ValExpression.length>0) {
                        let value = getExpressiones(decla.ValExpression[0].Expression[0])
                        if(value instanceof types)
                        {
                            declarationes.nameType = decla.tipoExpresion[0].tipo[0].tipo;
                            value.name = decla.name;
                            declarationes.Expression = value;
                        }

                    }
                }
                else
                {
                    declarationes.tipo = resultado[0];
                    if(decla.statement != 'variable') declarationes.tipo = TypeValue.Array
                    if(decla.ValExpression.length>0) {
                        let value = getExpressiones(decla.ValExpression[0].Expression[0])

                        if (value instanceof arrays) {
                            declarationes.Expression = value;
                            declarationes.tipo = TypeValue.Array;
                        } else {
                            declarationes.Expression = value;
                            if (value instanceof Strings || value instanceof Numbers || value instanceof Booleans || value instanceof Nulls) {
                                if(declarationes.tipo == null ) declarationes.tipo = value.tipoValue;
                            } else if (value instanceof types) {
                                declarationes.tipo = TypeValue.type;
                            }
                        }
                    }
                    else
                    {
                        if(decla.statement != 'variable')
                        {
                            let Arreglito:arrays = new arrays();
                            Arreglito.tipoValue = TypeValue.Array;
                            Arreglito.values = [];
                            declarationes.Expression = Arreglito;
                        }
                        else {
                            let Nullable:Nulls = new Nulls();
                            Nullable.tipoValue = TypeValue.null;
                            declarationes.Expression = Nullable;
                        }

                    }

                }
            }
            else
            {
                if(decla.ValExpression[0].Expression[0].statement=='typebody')
                {
                    declarationes.tipo = TypeValue.type;
                    if(decla.ValExpression.length>0) {
                        let value = getExpressiones(decla.ValExpression[0].Expression[0])
                        if(value instanceof types)
                        {
                            value.name = decla.name;
                            declarationes.Expression = value;
                        }

                    }
                }
                else
                {
                    if(decla.statement != 'variable') declarationes.tipo = TypeValue.Array
                    if(decla.ValExpression.length>0) {
                        let value = getExpressiones(decla.ValExpression[0].Expression[0])

                        if (value instanceof arrays) {
                            declarationes.Expression = value;
                            declarationes.tipo = TypeValue.Array;
                        } else {
                            declarationes.Expression = value;
                            if (value instanceof Strings || value instanceof Numbers || value instanceof Booleans || value instanceof Nulls) {
                                if(declarationes.tipo == null ) declarationes.tipo = value.tipoValue;
                            } else if (value instanceof types) {
                                declarationes.tipo = TypeValue.type;
                            }
                        }
                    }
                    else
                    {
                        if(decla.statement != 'variable')
                        {
                            let Arreglito:arrays = new arrays();
                            Arreglito.tipoValue = TypeValue.Array;
                            Arreglito.values = [];
                            declarationes.Expression = Arreglito;
                        }
                        else {
                            let Nullable:Nulls = new Nulls();
                            Nullable.tipoValue = TypeValue.null;
                            declarationes.Expression = Nullable;
                        }

                    }
                }

            }
            declaras.push(declarationes);

        }
        if(error==0) return declaras
        return [];
    }
    catch (e)
    {
        return [];
    }
}
function getTipo1(datas):any
{
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
    try
    {
        let data:TypeValue;
        switch (datas[0].tipo[0].tipo)
        {
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
                data = TypeValue.void;
                break;
            case "var":
                data = TypeValue.var;
                break;
            case "const":
                data = TypeValue.const;
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
        let size = Number(datas[0].size.length)
        return [data,size];
    }
    catch (e) {
        return [null,0];
    }
}
function declarationStatement(data):statement
{
    try
    {
        let declaration:declarations = new declarations();
        declaration.linea = Number(data.linea);
        declaration.type = TypeStatement.DeclarationStatement;
        declaration.Expression = getDeclarations(data.values)
        declaration.tipo = getTipo1(data.type)[0]

        return declaration;
    }
    catch (e) {
        return null;
    }
}
function consoleStatement(data):statement
{
    try
    {
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
function grahpStatement(data):statement
{
    try
    {
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
function getVariable(data):statement
{
    try
    {
        //console.log(data);
        let variable:expression = new expression();
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
function getExpressiones(data):any
{
    try
    {
        if(data.hasOwnProperty("statement"))
        {
            switch (data.statement)
            {
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
                    return getPreIncrement1(data)
                case "positivo":
                    let numero1:Numbers = new Numbers();
                    numero1.value = 1;
                    numero1.tipoValue = TypeValue.Number;
                    let sum:ArichmeticExpression = new ArichmeticExpression();
                    sum.type = TypeStatement.ExpresionStatement;
                    sum.linea = data.linea;
                    sum.Function = ArichmeticExpr.multiplicacion;
                    sum.Expression1 = getExpressiones(data.Expression[0]);
                    sum.Expression2 = numero1;
                    return sum;
                case "negativo":
                    let numero:Numbers = new Numbers();
                    numero.value = -1;
                    numero.tipoValue = TypeValue.Number;
                    let negar:ArichmeticExpression = new ArichmeticExpression();
                    negar.type = TypeStatement.ExpresionStatement;
                    negar.linea = data.linea;
                    negar.Function = ArichmeticExpr.multiplicacion;
                    negar.Expression1 = getExpressiones(data.Expression[0]);
                    negar.Expression2 = numero;
                    return negar;
                case "logical":
                    let not:LogialExpression = new LogialExpression();
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
                    let strings3:Strings = new Strings();
                    strings3.tipoValue = TypeValue.String;
                    strings3.type = null;
                    strings3.value = data.value.toString();
                    return strings3;
            }
        }
        return null;
    }catch (e)
    {
        return null;
    }
}
function getObject(data):string
{
    try {
        return data.value.toString();
    }
    catch (e) {
        return null;
    }
}
function getArrayList(data):any
{
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
    try
    {

        let positions = [];
        for(let datas of data.value)
        {
            let k = getExpressiones(datas);
            if(k!=null) positions.push(k);
        }
        return positions;
    }
    catch (e) {
        return null;
    }
}
function getArichmetic(data):statement
{
    try
    {
        switch (data.Aritmetic)
        {
            case '+':
                let suma:ArichmeticExpression = new ArichmeticExpression();
                suma.type = TypeStatement.ExpresionStatement;
                suma.linea = data.linea;
                suma.Function = ArichmeticExpr.suma;
                suma.Expression1 = getExpressiones(data.Expression1[0]);
                suma.Expression2 = getExpressiones(data.Expression2[0]);
                return suma;
            case '-':
                let resta:ArichmeticExpression = new ArichmeticExpression();
                resta.type = TypeStatement.ExpresionStatement;
                resta.linea = data.linea;
                resta.Function = ArichmeticExpr.resta;
                resta.Expression1 = getExpressiones(data.Expression1[0]);
                resta.Expression2 = getExpressiones(data.Expression2[0]);
                return resta;
            case '*':
                let operate:ArichmeticExpression = new ArichmeticExpression();
                operate.type = TypeStatement.ExpresionStatement;
                operate.linea = data.linea;
                operate.Function = ArichmeticExpr.multiplicacion;
                operate.Expression1 = getExpressiones(data.Expression1[0]);
                operate.Expression2 = getExpressiones(data.Expression2[0]);
                return operate;
            case '**':
                let poten:ArichmeticExpression = new ArichmeticExpression();
                poten.type = TypeStatement.ExpresionStatement;
                poten.linea = data.linea;
                poten.Function = ArichmeticExpr.potenciacion;
                poten.Expression1 = getExpressiones(data.Expression1[0]);
                poten.Expression2 = getExpressiones(data.Expression2[0]);
                return poten;
            case '/':
                let division:ArichmeticExpression = new ArichmeticExpression();
                division.type = TypeStatement.ExpresionStatement;
                division.linea = data.linea;
                division.Function = ArichmeticExpr.division;
                division.Expression1 = getExpressiones(data.Expression1[0]);
                division.Expression2 = getExpressiones(data.Expression2[0]);
                return division;
            case '%':
                let modulo:ArichmeticExpression = new ArichmeticExpression();
                modulo.type = TypeStatement.ExpresionStatement;
                modulo.linea = data.linea;
                modulo.Function = ArichmeticExpr.modulo
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
function getLogical(data):statement
{
    try
    {
        switch (data.Logical)
        {
            case '&&':
                let suma:LogialExpression = new LogialExpression();
                suma.type = TypeStatement.ExpresionStatement;
                suma.linea = data.linea;
                suma.Function = LogicalExpr.Y;
                suma.Expression1 = getExpressiones(data.Expression1[0]);
                suma.Expression2 = getExpressiones(data.Expression2[0]);
                return suma;
            case '||':
                let resta:LogialExpression = new LogialExpression();
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
function getRelational(data):statement
{
    try
    {
        switch (data.Relational)
        {
            case '>=':
                let suma:RelationalExpression = new RelationalExpression();
                suma.type = TypeStatement.ExpresionStatement;
                suma.linea = data.linea;
                suma.Function = RelationalExpr.MayorQue;
                suma.Expression1 = getExpressiones(data.Expression1[0]);
                suma.Expression2 = getExpressiones(data.Expression2[0]);
                return suma;
            case '<=':
                let resta:RelationalExpression = new RelationalExpression();
                resta.type = TypeStatement.ExpresionStatement;
                resta.linea = data.linea;
                resta.Function = RelationalExpr.MenorQue
                resta.Expression1 = getExpressiones(data.Expression1[0]);
                resta.Expression2 = getExpressiones(data.Expression2[0]);
                return resta;
            case '>':
                let operate:RelationalExpression = new RelationalExpression();
                operate.type = TypeStatement.ExpresionStatement;
                operate.linea = data.linea;
                operate.Function = RelationalExpr.Mayor
                operate.Expression1 = getExpressiones(data.Expression1[0]);
                operate.Expression2 = getExpressiones(data.Expression2[0]);
                return operate;
            case '<':
                let poten:RelationalExpression = new RelationalExpression();
                poten.type = TypeStatement.ExpresionStatement;
                poten.linea = data.linea;
                poten.Function = RelationalExpr.Menor;
                poten.Expression1 = getExpressiones(data.Expression1[0]);
                poten.Expression2 = getExpressiones(data.Expression2[0]);
                return poten;
            case '==':
                let division:RelationalExpression = new RelationalExpression();
                division.type = TypeStatement.ExpresionStatement;
                division.linea = data.linea;
                division.Function = RelationalExpr.Igual
                division.Expression1 = getExpressiones(data.Expression1[0]);
                division.Expression2 = getExpressiones(data.Expression2[0]);
                return division;
            case '!=':
                let modulo:RelationalExpression = new RelationalExpression();
                modulo.type = TypeStatement.ExpresionStatement;
                modulo.linea = data.linea;
                modulo.Function = RelationalExpr.NoIgual
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
function getPostIncrement1(data):statement
{
    try
    {
        let atributos = [];
        let position  = [];
        let autoin:autoincrements = new autoincrements();
        autoin.linea = Number(data.linea);
        let newExpr:expression = new expression();
        newExpr.name = data.padre[0].value;
        newExpr.valueType = TypeValue.Object;
        newExpr.linea = Number(data.linea);
        newExpr.type = TypeStatement.ExpresionStatement;
        autoin.name = newExpr;
        autoin.isArr = false;
        autoin.firstArr = false;
        if(data.padre[0].hijo!="")
        {
            if(data.padre[0].hijo instanceof Array)
            {
                if(data.padre[0].hijo.length > 0)
                {
                    if(data.padre[0].hijo[0].statement == 'Object')
                    {
                        autoin.firstArr = false;
                        let state = false
                        for(let hijos of data.padre[0].hijo)
                        {
                            if(hijos.statement == 'Object')
                            {
                                atributos.push(hijos.value)
                            }
                            else if (hijos.statement == 'ArrayList')
                            {
                                autoin.isArr = true;
                                for(let hijitos of hijos.value)
                                {
                                    if(hijitos.statement == 'MatrizPosition')
                                    {
                                        let m = getExpressiones(hijitos.value[0]);
                                        if(m!=null) position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if(state) break;
                        }
                    }
                    else{
                        autoin.isArr = true;
                        autoin.firstArr = true;
                        let state = false
                        for(let hijos of data.padre[0].hijo)
                        {
                            if(hijos.statement == 'Object')
                            {
                                atributos.push(hijos.value)
                                break;
                            }
                            else if (hijos.statement == 'ArrayList')
                            {
                                autoin.isArr = true;
                                for(let hijitos of hijos.value)
                                {
                                    if(hijitos.statement == 'MatrizPosition')
                                    {
                                        let m = getExpressiones(hijitos.value[0]);
                                        if(m!=null) position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if(state) break;
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
    catch (e)
    {
        return null;
    }
}
function getPreIncrement1(data):statement
{
    try
    {
        let atributos = [];
        let position  = [];
        let autoin:autoincrements = new autoincrements();
        autoin.linea = Number(data.linea);
        let newExpr:expression = new expression();
        newExpr.name = data.padre[0].value;
        newExpr.valueType = TypeValue.Object;
        newExpr.linea = Number(data.linea);
        newExpr.type = TypeStatement.ExpresionStatement;
        autoin.name = newExpr;
        autoin.isArr = false;
        autoin.firstArr = false;
        if(data.padre[0].hijo!="")
        {
            if(data.padre[0].hijo instanceof Array)
            {
                if(data.padre[0].hijo.length > 0)
                {
                    if(data.padre[0].hijo[0].statement == 'Object')
                    {
                        autoin.firstArr = false;
                        let state = false
                        for(let hijos of data.padre[0].hijo)
                        {
                            if(hijos.statement == 'Object')
                            {
                                atributos.push(hijos.value)
                            }
                            else if (hijos.statement == 'ArrayList')
                            {
                                autoin.isArr = true;
                                for(let hijitos of hijos.value)
                                {
                                    if(hijitos.statement == 'MatrizPosition')
                                    {
                                        let m = getExpressiones(hijitos.value[0]);
                                        if(m!=null) position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if(state) break;
                        }
                    }
                    else{
                        autoin.isArr = true;
                        autoin.firstArr = true;
                        let state = false
                        for(let hijos of data.padre[0].hijo)
                        {
                            if(hijos.statement == 'Object')
                            {
                                atributos.push(hijos.value)
                                break;
                            }
                            else if (hijos.statement == 'ArrayList')
                            {
                                autoin.isArr = true;
                                for(let hijitos of hijos.value)
                                {
                                    if(hijitos.statement == 'MatrizPosition')
                                    {
                                        let m = getExpressiones(hijitos.value[0]);
                                        if(m!=null) position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if(state) break;
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
    catch (e)
    {
        return null;
    }
}
function getPostdecrement1(data):statement
{
    try
    {
        let atributos = [];
        let position  = [];
        let autoin:autoincrements = new autoincrements();
        autoin.linea = Number(data.linea);
        let newExpr:expression = new expression();
        newExpr.name = data.padre[0].value;
        newExpr.valueType = TypeValue.Object;
        newExpr.linea = Number(data.linea);
        newExpr.type = TypeStatement.ExpresionStatement;
        autoin.name = newExpr;
        autoin.isArr = false;
        autoin.firstArr = false;
        if(data.padre[0].hijo!="")
        {
            if(data.padre[0].hijo instanceof Array)
            {
                if(data.padre[0].hijo.length > 0)
                {
                    if(data.padre[0].hijo[0].statement == 'Object')
                    {
                        autoin.firstArr = false;
                        let state = false
                        for(let hijos of data.padre[0].hijo)
                        {
                            if(hijos.statement == 'Object')
                            {
                                atributos.push(hijos.value)
                            }
                            else if (hijos.statement == 'ArrayList')
                            {
                                autoin.isArr = true;
                                for(let hijitos of hijos.value)
                                {
                                    if(hijitos.statement == 'MatrizPosition')
                                    {
                                        let m = getExpressiones(hijitos.value[0]);
                                        if(m!=null) position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if(state) break;
                        }
                    }
                    else{
                        autoin.isArr = true;
                        autoin.firstArr = true;
                        let state = false
                        for(let hijos of data.padre[0].hijo)
                        {
                            if(hijos.statement == 'Object')
                            {
                                atributos.push(hijos.value)
                                break;
                            }
                            else if (hijos.statement == 'ArrayList')
                            {
                                autoin.isArr = true;
                                for(let hijitos of hijos.value)
                                {
                                    if(hijitos.statement == 'MatrizPosition')
                                    {
                                        let m = getExpressiones(hijitos.value[0]);
                                        if(m!=null) position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if(state) break;
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
    catch (e)
    {
        return null;
    }
}
function getPredecrement1(data):statement
{
    try
    {
        let atributos = [];
        let position  = [];
        let autoin:autoincrements = new autoincrements();
        autoin.linea = Number(data.linea);
        let newExpr:expression = new expression();
        newExpr.name = data.padre[0].value;
        newExpr.valueType = TypeValue.Object;
        newExpr.linea = Number(data.linea);
        newExpr.type = TypeStatement.ExpresionStatement;
        autoin.name = newExpr;
        autoin.isArr = false;
        autoin.firstArr = false;
        if(data.padre[0].hijo!="")
        {
            if(data.padre[0].hijo instanceof Array)
            {
                if(data.padre[0].hijo.length > 0)
                {
                    if(data.padre[0].hijo[0].statement == 'Object')
                    {
                        autoin.firstArr = false;
                        let state = false
                        for(let hijos of data.padre[0].hijo)
                        {
                            if(hijos.statement == 'Object')
                            {
                                atributos.push(hijos.value)
                            }
                            else if (hijos.statement == 'ArrayList')
                            {
                                autoin.isArr = true;
                                for(let hijitos of hijos.value)
                                {
                                    if(hijitos.statement == 'MatrizPosition')
                                    {
                                        let m = getExpressiones(hijitos.value[0]);
                                        if(m!=null) position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if(state) break;
                        }
                    }
                    else{
                        autoin.isArr = true;
                        autoin.firstArr = true;
                        let state = false
                        for(let hijos of data.padre[0].hijo)
                        {
                            if(hijos.statement == 'Object')
                            {
                                atributos.push(hijos.value)
                                break;
                            }
                            else if (hijos.statement == 'ArrayList')
                            {
                                autoin.isArr = true;
                                for(let hijitos of hijos.value)
                                {
                                    if(hijitos.statement == 'MatrizPosition')
                                    {
                                        let m = getExpressiones(hijitos.value[0]);
                                        if(m!=null) position.push(m);
                                    }
                                    else {
                                        state = true;
                                        break;
                                    }
                                }
                            }
                            if(state) break;
                        }

                    }
                }

            }
        }
        autoin.type = TypeStatement.ExpresionStatement;
        autoin.Assigment = increments.predecrement;
        autoin.atributo = atributos;
        autoin.position = position;
        //console.log(autoin)
        return autoin;
    }
    catch (e)
    {
        //console.log(e);
        return null;
    }
}
function getArreglo(data):statement
{
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
    try
    {
        let Arreglito:arrays = new arrays();
        Arreglito.values = [];
        Arreglito.tipoValue = TypeValue.Array;
        if(data.value.length>0)
        {
            for(let datito of data.value)
            {
                let datitos = getExpressiones(datito);
                if(datitos!=null) Arreglito.values.push(datitos);
            }
        }
        return Arreglito

    }
    catch (e) {
        return null
    }
}
function callAtributo(data):statement
{
    try {
        if(data.hijo.length>0)
        {

            if(data.hijo[0].statement == 'ArrayList')
            {
                return callMatriz1(data);
            }
            else
            {
                return callAtributo1(data);
            }

        }
    }
    catch (e) {
        return null;
    }
}
function callAtributo1(data):statement
{
    try
    {
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
        let mat:expression = new expression()
        mat.linea = data.linea;
        mat.name = data.value;
        mat.position = [];
        mat.atributo = [];
        mat.farray = false;

        if(data.hijo.length>0)
        {
                for(let pos of data.hijo)
                {
                    let k = getExpressiones(pos);
                    if(k!=null)
                    {
                        if(k instanceof Array)
                        {
                            for(let m of k)
                            {
                                mat.position.push(m);
                            }

                        }
                        else
                        {
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
function MatrizPosition(data):statement
{
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
        if(data.value.length>0)
        {
            return getExpressiones(data.value[0]);
        }
    }
    catch (e) {
        return null;
    }
}
function callMatriz1(data):statement
{
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
    try
    {
        let mat:expression = new expression()
        mat.linea = data.linea;
        mat.name = data.value;
        mat.position = [];
        mat.atributo = [];
        mat.farray = true;

        if(data.hijo.length>0)
        {
                for(let pos of data.hijo)
                {
                    let k = getExpressiones(pos);
                    if(k!=null)
                    {
                        if(k instanceof Array)
                        {
                            for(let m of k)
                            {
                                mat.position.push(m);
                            }

                        }
                        else
                        {
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
function callMatriz(data):statement
{
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
    try
    {
        let mat:expression = new expression()
        mat.linea = data.linea;
        if(data.padre.length==0)
        {
            mat.name = data.name;
        }
        else
        {
            mat.Expresion = getExpressiones(data.padre[0]);
        }
        mat.position = [];
        for(let pos of data.posicion)
        {
            let m = getExpressiones(pos);
            if(m!=null) mat.position.push(m);
        }
        return mat;
    }
    catch (e) {
        return null;
    }
}
function nativeMatriz(data):statement
{
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
    try
    {
        let mat:expression = new expression()
        switch (data.native)
        {
            case "length":

                mat.linea = data.linea;
                mat.ArrayType = NativeArray.Length;
                mat.name = 'a';
                mat.position = [];
                if(data.hijo.length>0)
                {
                    if(data.hijo[0].value.length>0)
                    {
                        for(let positions of data.hijo[0].value)
                        {
                            let k = getExpressiones(positions);
                            if(k!=null) mat.position.push(k);
                        }
                    }
                }
                break;
            case "pop":
                mat.linea = data.linea;
                mat.ArrayType = NativeArray.Pop;
                mat.name = 'a';
                mat.position = [];
                if(data.hijo.length>0)
                {
                    if(data.hijo[0].value.length>0)
                    {
                        for(let positions of data.hijo[0].value)
                        {
                            let k = getExpressiones(positions);
                            if(k!=null) mat.position.push(k);
                        }
                    }
                }
                break;
            case "push":
                mat.linea = data.linea;
                mat.ArrayType = NativeArray.Push;
                mat.name = 'a';
                mat.position = [];
                if(data.hijo.length>0)
                {
                    if(data.hijo[0].value.length>0)
                    {
                        for(let positions of data.hijo[0].value)
                        {
                            let k = getExpressiones(positions);
                            if(k!=null) mat.position.push(k);
                        }
                    }
                }
                mat.Expresion = null;
                if(data.value.length>0)
                {
                    mat.Expresion = getExpressiones(data.value[0])
                }
                break;

        }
        return mat;

    }
    catch (e) {
        return null;
    }
}
function typeBody(data):statement
{
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
    try
    {
        let typebo = new types();
        typebo.atributos = [];
        typebo.linea = data.linea;
        typebo.type = TypeStatement.DeclarationStatement;
        if(data.values.length>0)
        {
            for(let datito of data.values)
            {
                let k = getAtributo(datito);
                if(k!=null) typebo.atributos.push(k);
            }
        }
        return typebo;
    }
    catch (e) {
        return null;
    }
}
function getAtributo(data):atributo
{
    try
    {
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
        let atr:atributo = new atributo();
        atr.name = data.name;
        if(data.tipo.length>0)
        {
            atr.tipo = data.tipo[0].tipo;
        }
        else
        {
            atr.value = getExpressiones(data.valor[0]);
        }
        return atr;
    }
    catch (e) {
        return null;
    }
}
function getTipoAssigment(data):typeAssigment
{
    try
    {
        /*

                      "linea": "2",
                      "v": "+="
         */
        switch (data.v)
        {
            case "+=":
                return typeAssigment.suma
            case "-=":
                return typeAssigment.resta
            case "=":
                return typeAssigment.igual
            case "*=":
                return typeAssigment.multiplicacion
            case "/=":
                return typeAssigment.division
            case "**=":
                return typeAssigment.potencia
            case "%=":
                return typeAssigment.modulo
            default:
                return typeAssigment.igual
        }
    }
    catch (e) {
        return null;
    }
}
function getAsignation(data):statement
{
    try
    {
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
        let as:Asignation = new Asignation();
        as.linea = data.linea;
        as.name = data.variable;
        as.atributo = [];
        as.position = [];
        if(data.params.length>0)
        {
            if(data.params[0].statement == 'ArrayList')as.isArr = true;
            for(let params of data.params)
            {
                let k = getExpressiones(params);
                if(k!=null)
                {
                    if(k instanceof Array)
                    {
                        for(let m of k)
                        {
                            as.position.push(m);
                        }

                    }
                    else
                    {
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
function getIf(data):statement
{
    try
    {
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

        let ifs:IfStatement = new IfStatement();
        ifs.linea = data.linea;
        let valExpression = getExpressiones(data.Expression[0]);
        if(valExpression!=null) ifs.ValueExpression = valExpression;
        for(let body of data.body)
        {
            let k = getExpressiones(body);
            if(k!=null) ifs.body.push(k);
        }
        for(let body of data.else)
        {
            let k = getExpressiones(body);
            if(k!=null) ifs.bodyElse.push(k);
        }
        return ifs;

    }
    catch (e) {
        return null;
    }
}
function getTernario(data):statement
{
    try
    {
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
        let terna:OperatorTernario = new OperatorTernario();
        terna.ValueExpression = getExpressiones(data.valueExpression[0]);
        terna.Expression1 = getExpressiones(data.Expression1[0])
        terna.Expression2 = getExpressiones(data.Expression2[0])
        terna.linea = data.linea
        if(terna.ValueExpression==null) return null
        return terna
    }
    catch (e) {
        return null;
    }
}
function getWhile(data):statement
{
    try
    {
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

        let whiling:WhileStatements = new WhileStatements();
        whiling.linea = data.linea;
        whiling.ValueExpression = getExpressiones(data.Expression[0])
        for(let body of data.body)
        {
            let k = getExpressiones(body);
            if (k!=null)whiling.body.push(k)
        }
        return whiling;

    }
    catch (e) {
        return null;
    }
}
function getInitial(data):statement
{
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
    try
    {
        let statements:declarations = new declarations();
        statements.linea = data.linea;
        statements.Expression = [];
        let declaration:declaration0 = new declaration0();
        declaration.linea = data.linea;
        declaration.name = data.name;
        declaration.Expression = getExpressiones(data.ValExpression[0].Expression[0])
        switch (data.tipo[0])
        {
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
                declaration.tipo = TypeValue.void;
                statements.tipo = TypeValue.void;
                break;
            case "var":
                declaration.tipo = TypeValue.var;
                statements.tipo = TypeValue.var;
                break;
            case "const":
                declaration.tipo = TypeValue.const;
                statements.tipo = TypeValue.const;
                break;
            case "type":
                declaration.tipo = TypeValue.type;
                statements.tipo = TypeValue.type;
                break;
            case "let":
                declaration.tipo = TypeValue.let;
                statements.tipo = TypeValue.let
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
function getFor1(data):statement
{
    try
    {
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
        let foring:ForStatements1 = new ForStatements1();
        foring.linea = data.linea;
        foring.valueInitial = getInitial(data.ExpresionInitial[0]);
        foring.condicion = getExpressiones(data.Expressionvalue[0])
        foring.postIterator = getExpressiones(data.ExpressionFinal[0])
        for(let body of data.body)
        {
            let k = getExpressiones(body);
            if(k!=null) foring.body.push(k);
        }
        return foring;

    }
    catch (e) {
        return null;
    }
}
function getForOf(data):statement
{
    try
    {
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
        let forof:ForStatements4 = new ForStatements4();
        forof.linea = data.linea;
        forof.type = TypeStatement.IterationStatement;
        forof.identificador = data.ExpresionInitial[0].name;
        forof.Expression = getExpressiones(data.Expressionvalue[0])
        forof.body = [];
        for(let body of data.body)
        {
            let k = getExpressiones(body)
            if(k!=null) forof.body.push(k);
        }
        return forof;

    }
    catch (e) {
        return null;
    }
}
function getForIn(data):statement
{
    try
    {
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
        let forof:ForStatements3 = new ForStatements3();
        forof.linea = data.linea;
        forof.type = TypeStatement.IterationStatement;
        forof.identificador = data.ExpresionInitial[0].name;
        forof.Expression = getExpressiones(data.Expressionvalue[0])
        forof.body = [];
        for(let body of data.body)
        {
            let k = getExpressiones(body)
            if(k!=null) forof.body.push(k);
        }
        return forof;

    }
    catch (e) {
        return null;
    }
}
function getDoWhile(data):statement
{
    try
    {
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

        let doit:DoWhileStatements = new DoWhileStatements();
        doit.linea = data.linea;
        doit.ValueExpression = getExpressiones(data.Expression[0])
        doit.body = [];
        for(let body of data.body)
        {
            let k = getExpressiones(body);
            if(k!=null) doit.body.push(k);
        }
        doit.type = TypeStatement.IterationStatement;
        return doit;

    }
    catch (e) {
        return null
    }
}
function getSwitch(data):statement
{
    try
    {
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
        let suitch:SwitchStatement = new SwitchStatement();
        suitch.linea = data.linea;
        suitch.val = getExpressiones(data.Expression[0])
        for(let caso of data.values)
        {
            let cas = getExpressiones(caso);
            if(cas!=null)
            {
                if(cas instanceof cases) suitch.cases.push(cas);
                if(cas instanceof defaults) suitch.default = cas;
            }
        }
        //console.log(suitch)
        return suitch;
    }
    catch (e) {
        //console.log(e)
        return null;
    }
}
function getCases(data):statement
{
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
        let casesito:cases = new cases();
        casesito.linea = data.linea;
        casesito.ValueExpression = getExpressiones(data.Expression[0])
        for(let body of data.body)
        {
            let k = getExpressiones(body);
            if(k!=null) casesito.body.push(k);
        }
        //console.log(casesito)
        return casesito;
    }
    catch (e) {
        return null;
    }
}
function getDefault(data):statement
{
    try
    {
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
        let defal:defaults = new defaults();
        defal.linea = data.linea;
        defal.body = [];
        for(let body of data.body)
        {
            let k = getExpressiones(body)
            if(k!=null) defal.body.push(k);
        }
        //console.log(defal)
        return defal;
    }
    catch (e) {
        //console.log(e)
        return null;
    }
}
function getBreak():statement
{
    return new BreakStatements();
}
function getContinue():statement
{
    return new ContinueStatements();
}
function getReturn(data):statement
{
    try
    {
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
        let retorno:ReturnStatements = new ReturnStatements();
        retorno.linea = data.linea;
        if(data.Expression.length >0 )
        {
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
function getCallFunction(data):statement
{
    try
    {
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
        let calling:expression = new expression();
        calling.linea = data.linea;
        calling.name = data.padre[0].value;
        calling.parameters = [];
        calling.isCallFunction = true;
        for(let parametro of data.argumentos)
        {
            let k = getExpressiones(parametro);
            if(k!=null) calling.parameters.push(k);
        }
        return calling;
    }
    catch (e) {
        //console.log(e);
        return null;
    }
}
function getCallFunction1(data):statement
{
    try
    {
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
        let calling:expression = new expression();
        calling.linea = data.linea;
        calling.name = data.name;
        calling.parameters = [];
        calling.isCallFunction = true;
        for(let parametro of data.parameters)
        {
            let k = getExpressiones(parametro);
            if(k!=null) calling.parameters.push(k);
        }
        return calling;
    }
    catch (e) {
        //console.log(e);
        return null;
    }
}
function getFunction(data):statement
{
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

        let func:functions = new functions();
        func.linea = data.linea;
        func.name = data.name;
        if(data.type.length>0)
        {
            func.tipo = getTypeF(data.type[0]);
        }
        func.tipo = TypeValue.Object;
        func.type = TypeStatement.FunctionStatement;
        for(let parametro of data.params)
        {
            let k = getExpressiones(parametro);
            if(k!=null) func.Parameters.push(k);
        }
        for(let body of data.body)
        {
            let k = getExpressiones(body);
            if(k!=null) func.body.push(k);
        }
        return func;
    }
    catch (e) {
        //console.log(e);
        return null;
    }
}
function getTypeF(data):TypeValue
{
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
    if(data.size.length>0) return TypeValue.Array;
    switch(data.tipo[0].tipo)
    {
        case "string":
            return TypeValue.String
        case "number":
            return TypeValue.Number
        case "boolean":
            return TypeValue.Boolean;
        case "void":
            return TypeValue.void;
        default:
            return TypeValue.Object;

    }
}
function getParameter(data):statement
{
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
        let parametrito:Parameter = new Parameter();
        parametrito.linea = data.linea;
        parametrito.name = data.name;
        parametrito.tipo = getTypeF(data.tipo[0])
        return parametrito;
    }
    catch (e) {
        return null;
    }
}
