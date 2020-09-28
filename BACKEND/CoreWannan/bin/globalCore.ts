/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

let output = [];
let outs = [];
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
            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Its impossible to the machine locate the sym.token\"}')
            return [-1,null];
        }
        catch (e)
        {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:'+name)
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
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
                        //console.log(simbolo.ambito)
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
            //console.log(ambitoglob, ambitoloc)
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

            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [UPDATE] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
            return [-1,'We cannot find the object: '+name];
        }
        catch (e)
        {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:'+name)
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [UPDATE] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
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
            //console.log(ambitoglob)
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

            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GET] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
            return [-1,'We cannot find the object: '+name];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:'+name)
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GET] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
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
            //console.log(ambitoglob,ambitoloc)
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

            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETSYM] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
            return [-1,'We cannot find the object: '+name];
        }
        catch (e)
        {
            //console.log(e);
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:'+name)
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETSYM] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
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
            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETTYPE] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
            return [-1,'the object doesn\'t exists'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:'+name)
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETTYPE] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
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
            //output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETTYPEVALUE] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
            return [-1,'the object doesn\'t exists'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:'+name)
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [GETTYPEVALUE] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
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

            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:'+name+', because its aleready defined')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Its impossible to the machine insert the sym.token, because its aleready defined\"}')
            erroresSemanticos.push('You cant set this sym.token, the object its already exists.')
            return [-2,'we can\'t locate the variable, it\'s probably the variable exists'];

        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Its impossible to the machine locate the sym.token, sym:'+name)
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" [INSERT] Its impossible to the machine locate the sym.token, sym:'+name+'\"}')
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
            outs.push('Error: Ocurrio un error inesperado, Its imposible defined or get the sym.token')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  its imposible defined or get the sym.token\"}')

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
                        //console.log('SW->', this.val.execute(tablasimbolo))
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
                                if(statements instanceof autoincrements)
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
                                return [0,this.value]
                            case 1: //-> sin errores
                                state = 1;
                                if(statements instanceof autoincrements)
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
                                return [1,this.value]
                            case 2: //-> sin errores, break
                                return [1,this.value];
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
                        return [1,null];
                    case 3: //-> sin errores, continue
                        return [3,null];
                    case 4: //-> sin errores, return
                        return [4,value[1]];
                }
            }
            return [1,this.value]
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')

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
            this.StateCode = -1;
            let valInitial = valInitial1.execute(tablasimbolo);
            //console.log('CS->', this.ValueExpression.execute(tablasimbolo));
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
                            this.StateCode = 1;
                            break;
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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')

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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')

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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')

            return [-1,null]
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')

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
    niu:boolean;

    constructor() {
        super();
        this.niu = false;
    }

    execute(): any
    {
        return [1,this];
    }

    getValue(position:any[],tablasimbolo:tablasimbolos)
    {

        try {
            if(position.length>0)
            {
                let a:expression = position.pop();
                let result = a.execute(tablasimbolo);
                //console.log('R', result);
                if(result[0]>0)
                {
                    result[1] = Math.round(result[1])
                    //console.log(result[1])
                    if(position.length>0)
                    {
                        //console.log('m1->>', position.length,' pos: '+result[1])
                        //console.log(this.values, '->>>>>', this.values[result[1]])
                        if(this.values[result[1]] instanceof arrays) return this.getValorA(position,this.values[result[1]].getAll(),tablasimbolo);
                    }
                    else
                    {
                        //console.log('pos: ',result[1], 'value: ',this.values[result[1]], ' values: ',this.values[result[1]].getAll());
                        return [1,this.values[result[1]]]
                    }
                }
            }

            erroresSemanticos.push('Linea: '+this.linea+', EL objeto al que apunta no es un arreglo')
            return [-1, 'EL objeto al que apunta no es un arreglo']

        }
        catch (e) {
            //console.log(e)
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')
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
                result[1] = Math.round(result[1])
                if(position.length>0)
                {
                    //console.log('m2->>', position.length, 'pos: '+result[1])
                    //console.log(objeto, '->>>>>', objeto[result[1]])
                    if(objeto[result[1]] instanceof arrays) return this.getValorA(position,objeto[result[1]].getAll(),tablasimbolo);
                }
                else
                {
                    //console.log(objeto[result[1]])
                    return [1,objeto[result[1]]]

                }
            }
            erroresSemanticos.push('Linea: '+this.linea+', EL objeto al que apunta no es un arreglo')
            return [-1, 'EL objeto al que apunta no es un arreglo']
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')
            return [-1,null]
        }
    }
    getAll()
    {
        return this.values;
    }
    get1(position:number)
    {
        let a = 0;
        for(let value of this.values)
        {
            if(a==position)
            {
                //console.log(value);
                return value
            }
            a++;
        }
        return null
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
        outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
        output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')
        return [-1,null]
    }

    setValue(tablasimbolo:tablasimbolos,position:any[],value?:statement):any
    {
        try {
            //console.log(101,value);
            if(position.length>0)
            {
                    if(value == null)
                    {

                        let a:expression = position.pop();
                        let result = a.execute(tablasimbolo);
                        //console.log(a);
                        if(result[0]>0)
                        {
                            result[1] = Math.round(result[1])
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
                                    erroresSemanticos.push('Linea: '+this.linea+', Bad Exposure.... in Arrays')
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
                            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
                            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')
                            return [-1,null]
                        }
                    }
                    else
                    {
                        if(value instanceof  statement)
                        {
                            let vals = value.execute(tablasimbolo);
                            //console.log(11,vals)
                            if(vals[0]>0)
                            {
                                let a:expression = position.pop();
                                let result = a.execute(tablasimbolo);
                                //console.log('Pos: ',result)
                                if(result[0]>0)
                                {
                                    result[1] = Math.round(result[1])
                                    if(position.length>0)
                                    {
                                        if(this.values[result[1]] instanceof arrays)
                                        {
                                            let tt = this.setValorA(tablasimbolo,this.values[result[1]].getAll(),position,value);
                                            if(tt[0]>0)
                                            {
                                                this.values[result[1]].values = tt[1];
                                                return [1,null];
                                            }
                                            else
                                            {
                                                return [-1,null];
                                            }
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

                                outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
                                return [-1,'Value cannot be executed']
                            }
                        }
                    }
            }

            erroresSemanticos.push('Linea: '+this.linea+', No puedes asignar a una matriz una posicion no existente, por favor verifica tu declaracion')
            return [-1,null]

        }
        catch (e) {
            //console.log(e);
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
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
                    //console.log('Pos: ',result)
                    if(result[0]>0)
                    {
                        result[1] = Math.round(result[1])
                        if(position.length>0)
                        {
                            if(objeto[result[1]] instanceof arrays)
                            {
                                let tt = this.setValorA(tablasimbolo,objeto[result[1]].getAll(),position,vals[1]);
                                if(tt[0]>0)
                                {
                                    objeto[result[1]].values = tt[1];
                                    return [1,objeto];
                                }
                                else
                                {
                                    erroresSemanticos.push('Linea: '+this.linea+', Bad Exposure... in Arrays')

                                    return [-1,null];
                                }
                            }

                        }
                        else
                        {
                            objeto[result[1]] = vals[1];
                            //console.log(objeto)
                            return [1,objeto];
                        }
                    }
                    else
                    {
                        erroresSemanticos.push('Linea: '+this.linea+', Bad Exposure... in Arrays')
                        return [-1,null]
                    }
                }
                else
                {
                    erroresSemanticos.push('Linea: '+this.linea+', Bad Exposure... in Arrays')
                    return [-1,null]
                }
            }
            else
            {
                erroresSemanticos.push('Linea: '+this.linea+', Bad Exposure... in Arrays')
                return [-1,null]
            }

        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')
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
            erroresSemanticos.push('Linea: '+this.linea+', Bad position, Array cant get this position')
            return [-1,null];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')
            return [-1,null]
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

    push1(values:any, positions:statement[],tablasimbolos)
    {
        try {
            let value = values.execute(tablasimbolos);
            if(value[0]>0)
            {
                if(positions.length>0)
                {
                    //console.log(positions)
                    let a = positions.pop();
                    let result = a.execute(tablasimbolos);
                    //console.log(result[1], this.values)
                    if(result[0]>0)
                    {
                        result[1] = Math.round(result[1])
                        if(this.values[result[1]] instanceof arrays)
                        {
                            let k= this.push2(this.values[result[1]],value[1],positions,tablasimbolos)
                            if(k!=null)
                            {
                                this.values[result[1]] = k;
                                return [1,null];
                            }
                        }
                    }
                }
                else
                {
                    this.values.push(value);
                    //console.log(this.values)
                    return [1,null];
                }
            }

            return [-2,null];
        }
        catch (e) {
            return [-1,null];
        }

    }
    push2(objeto, value:any, positions:statement[],tablasimbolos)
    {
        try
        {
            //console.log(objeto)
            if(positions.length>0)
            {
                let a = positions.pop();
                let result = a.execute(tablasimbolos);
                if(result[0]>0)
                {
                    result[1] = Math.round(result[1])
                    if(objeto[result[1]] instanceof arrays)
                    {
                        let k= this.push2(objeto[result[1]],value,positions,tablasimbolos)
                        if(k!=null)
                        {
                            objeto[result[1]] = k;
                            return objeto
                        }
                    }
                }
            }
            else
            {

                objeto.values.push(value)
                //console.log(objeto)
                return objeto
            }
            return objeto
        }
        catch (e) {
            return null
        }
    }
    push(value:any):any
    {
        //console.log(this.values);
        try {
            this.values.push(value);
            //console.log(this.values);
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
            //console.log(this.name, this)
            let positions = []
            for(let pos of this.position)
            {
                positions.push(pos);
            }
            let atributos = []
            for(let pos of this.atributo)
            {
                atributos.push(pos);
            }
            //console.log(this.Expression)
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
                                    let result = this.operateArrAtr(arrs,tablasimbolo,positions,atributos,this.Expression);
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
                                    let result = this.operateAtrArr(arrs,tablasimbolo,atributos,positions,this.Expression);
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
                    //console.log(this.Expression);
                    if(value[0]>0)
                    {
                        let simbolo = tablasimbolo.getsym(this.name);
                        if(simbolo[0]>0)
                        {
                            let simbolito:sym = simbolo[1];
                            if(simbolito.getValue() instanceof types)
                            {
                                let atr:types = simbolito.getValue();
                                //console.log(atr);
                                let val = this.operateAtr(atr,tablasimbolo,atributos,value[1]);
                                //console.log(val[1]);
                                if(val[0]>0)
                                {
                                    return tablasimbolo.update(this.name,val[1]);
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
                    //console.log(this.Expression)
                    let value = this.Expression.execute(tablasimbolo);
                    if (value[0] > 0) {
                        let simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0) {
                            let simbolito: sym = simbolo[1];
                            if (simbolito.getValue() instanceof arrays) {
                                let arrs: arrays = simbolito.getValue();
                                //console.log(arrs);
                                let k = arrs.setValue(tablasimbolo, positions, this.Expression);
                                //console.log(k)
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

            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be aplied '+typeAssigment[this.Assigment]+', in the object')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',cannot be aplied '+typeAssigment[this.Assigment]+', in the object\"}')

            return [-1, 'cannot be aplied '+typeAssigment[this.Assigment]+', in the object']
        }
        catch (e) {
            //console.log(e)
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')

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
                //console.log(objeto);
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
            outs.push('Salida: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
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
                    //console.log(value)
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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')

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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')

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
        this.Expresion = null;
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
        try {
            if(this.atributo.length>0)
            {
                if(this.name!="")
                {
                    let simbolo = tablasimbolo.getsym(this.name);
                    //console.log(simbolo)
                    if (simbolo[0] > 0)
                    {
                        if(simbolo[1] instanceof sym)
                        {
                            let simbolito1:sym = simbolo[1];
                            //console.log(simbolito1)
                            if(simbolito1.getValue() instanceof types)
                            {
                                let valors =  <types> simbolito1.getValue();
                                let val =  valors.getValuesAtributo(atributos,tablasimbolo);
                                //console.log(val);
                                if(val[0]>0)
                                {
                                    //console.log(val[1])
                                    if(val[1].value instanceof statement)
                                    {
                                        if(val[1].value instanceof Nulls)
                                        {
                                            return '__jw__'
                                        }
                                        else
                                        {
                                            let result = val[1].value.execute(tablasimbolo);
                                            //console.log(result)
                                            if(result[0]>0) return result[1];
                                        }
                                    }
                                    else
                                    {
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
    }

    getValueAtributoArray(tablasimbolo:tablasimbolos):any
    {
        //get all atributes
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
                                let val =  valors.getValuesAtributo(atributos,tablasimbolo);
                                if(val[0]>0)
                                {
                                    try
                                    {
                                        if(val[1].value instanceof arrays)
                                        {
                                            let valors2 = <arrays> val[1].value;
                                            if(this.position.length>0)
                                            {
                                                let vae =  valors2.getValue(positions,tablasimbolo);
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
        let Expression = this.Expresion;
        //get all values array
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
                                let val =  valors.getValue(positions,tablasimbolo);
                                if(val[0]>0)
                                {
                                    if(val[1] instanceof types)
                                    {
                                        let valors2 = <types> val[1];
                                        let vae =  valors2.getValuesAtributo(atributos,tablasimbolo);
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
                    let valors =  <expression> Expression;
                    let val =  valors.execute(tablasimbolo);
                    if(val[0]>0)
                    {
                        let resu = (<arrays>val[1]).getValue(positions,tablasimbolo);
                        if(resu[0]>0)
                        {
                            let result = resu[1].execute(tablasimbolo);
                            if(result[0]>0) return result[1];
                        }
                    }
                }
                else
                {
                    let valors =  <expression> Expression;
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
        let Expression = this.Expresion
        //get all values array
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
        //console.log(positions)
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
                            //console.log(simbolito1)
                            let valors =  <arrays> simbolito1.getValue();
                            if(this.position.length>0)
                            {
                                let val =  valors.getValue(positions,tablasimbolo);
                                if(val[0]>0)
                                {
                                     if(val[1] instanceof statement)
                                        {
                                            let result = val[1].execute(tablasimbolo);
                                            //console.log(result)
                                            if(result[0]>0) return result[1];
                                        }
                                        else
                                        {
                                            //console.log(val[1])
                                            return val[1]
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
                    let valors =  <expression> Expression;
                    let val =  valors.execute(tablasimbolo);
                    if(val[0]>0)
                    {
                        let resu = (<arrays>val[1]).getValue(positions,tablasimbolo);
                        if(resu[0]>0)
                        {
                            let result = resu[1].execute(tablasimbolo);
                            if(result[0]>0) return result[1];
                        }
                    }
                }
                else
                {
                    let valors =  <expression> Expression;
                    let val =  valors.execute(tablasimbolo);
                    if(val[0]>0)
                    {
                        return (<arrays>val[1]).getAll();
                    }
                }
            }
            return null;
        }catch (e) {
            console.log(e);
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
                //console.log(funcion);
                let res = funcion.executeV(tablasimbolo,this.parameters);
                //console.log(res);
                if(res[0]>0)
                {
                    if(res[1] == null) return '__jw__'
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
        //console.log(this.position)
        let Expression = this.Expresion;
        this.Expresion = null;
        this.Expresion = Expression
        let positions = [];
        let atributos = [];
        for(let pos of this.position)
        {
            positions.push(pos)
        }
        let temp = [];
        for(let tempo of positions)
        {
            temp.push(tempo);
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
                            //console.log(simbolo)
                            if(simbolo[1] instanceof sym)
                            {
                                let simbolito1:sym = simbolo[1];
                                if(simbolito1.getValue() instanceof arrays)
                                {
                                    let valors =  <arrays> simbolito1.getValue();
                                    //console.log(valors);
                                    if(this.position.length>0)
                                    {
                                        let val1 =  valors.getValue(temp,tablasimbolo);
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
                                        //console.log(valors.values.length)
                                        return valors.values.length
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
                                                    let m = valors.setValue(tablasimbolo,temp,retorno);
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

                                let simbolo2 = tablasimbolo.getsym(this.name);
                                //console.log(simbolo2);
                                //console.log('Ambito ---- ', tablasimbolo.ambitoLevel)
                                //console.log(this.position, this.name, value[1]);
                                if (simbolo2[0] > 0)
                                {
                                    if(simbolo2[1] instanceof sym)
                                    {
                                        let simbolito1:sym = simbolo2[1];
                                        //console.log(simbolito1.getValue())
                                        if(simbolito1.getValue() instanceof arrays)
                                        {
                                            let valors =  <arrays> simbolito1.getValue();

                                            if(this.position.length>0)
                                            {
                                                        let bb = valors.push1(this.Expresion,temp,tablasimbolo);
                                                        if(bb[0]>0)
                                                        {
                                                            let k = tablasimbolo.update(this.name,valors)
                                                            if(k[0]>0) return valors.length()+1;
                                                        }

                                            }
                                            else
                                            {
                                                let value = Expression.execute(tablasimbolo);
                                                //console.log('Ambito ---- ', tablasimbolo.ambitoLevel)
                                                //console.log(this.position, this.name, value[1]);
                                                if(value[0]>0) {
                                                    if (value[1] instanceof arrays) {
                                                        if (value[1].niu) {
                                                            value[1].values = [];
                                                            let bb = valors.push(value[1]);
                                                            if (bb[0] > 0) {
                                                                let k = tablasimbolo.update(this.name, valors)
                                                                if (k[0] > 0) return valors.length() + 1;
                                                            }
                                                        } else {
                                                            let bb = valors.push(value[1]);
                                                            if (bb[0] > 0) {
                                                                let k = tablasimbolo.update(this.name, valors)
                                                                if (k[0] > 0) return valors.length() + 1;
                                                            }
                                                        }

                                                    } else {
                                                        let bb = valors.push(value[1]);
                                                        if (bb[0] > 0) {
                                                            let k = tablasimbolo.update(this.name, valors)
                                                            if (k[0] > 0) return valors.length() + 1;
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
                    //console.log(simbolo);
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
                //console.log(this);
                switch (this.valueType)
                {
                    case TypeValue.null:
                        return "__jw__";
                    case TypeValue.Array:
                        if(Expression instanceof arrays)
                        {
                            return Expression.getAll();
                        }
                        break;
                    case TypeValue.Boolean:
                        if(Expression instanceof Booleans)
                        {
                            return Expression.getValue();
                        }
                        break;
                    case TypeValue.const:
                        return Expression.execute(tablasimbolo);
                    case TypeValue.let:
                        return Expression.execute(tablasimbolo);
                    case TypeValue.Number:
                        if(Expression instanceof Numbers)
                        {
                            return Expression.getValue();
                        }
                        break;
                    case TypeValue.Object:
                        let simbolo = tablasimbolo.getsym(this.name);
                        return simbolo[1];

                    case TypeValue.String:
                        if(Expression instanceof Strings)
                        {
                            return Expression.getValue();
                        }
                        break;
                    case TypeValue.type:
                        if(Expression instanceof  types)
                        {
                            return <types> Expression;
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
                    default:
                        let simbolo0 = tablasimbolo.getsym(this.name);
                        //console.log(simbolo0)
                        if (simbolo0[0] > 0)
                        {
                            if(simbolo0[1] instanceof sym)
                            {
                                let simbolito1:sym = simbolo0[1];
                                return simbolito1.getValue();
                            }
                        }

                }
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction\"}')
            return null;
        }
        catch (e) {
            //console.log(e)
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction\"}')

            return null;
        }
    }


    execute(tablasimbolo): any[2] {
        //get all data from all version of types
        try
        {
            let data = this.getValue(tablasimbolo);
            //console.log(this.name)
            if(data!=null)
            {
                if(data == '__jw__') return [1,null]
                return [1,data]
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, We cant get the data')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',We cant get the data\"}')

            return [-1,'We cant get the data']
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+',Unexpected Error, cannot be execute the instruction\"}')

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
            //console.log(izq, der)
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
                        //console.log(izq[1]%der[1])
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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, An Lost Expression cant result')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', An Lost Expression cant result\"}')
            return [-1,'Arichmetic Exception not defined values...'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction\"}')
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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, An Lost Expression cant result')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', An Lost Expression cant result\"}')

            return [-1,null];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction\"}')

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
            //console.log(izq, this.Expression2)
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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, An Lost Expression cant result')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', An Lost Expression cant result\"}')

            return [-1,null];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, we cannot find the error...\"}')

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
            let tempBody = [];
            for(let btemp of this.body)
            {
                tempBody.push(btemp);
            }
            //console.log(this.name)
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

                for(let statement1 of tempBody)
                {
                    //console.log(this.name, tablasimbolo);
                    let value = statement1.execute(tablasimbolo);
                    //console.log(this.name, value, statement1); //-> [4,5] -> value = [4,5] -> value = [4,5]
                    //console.log('----------------------------------')
                    //console.log(this.name, tablasimbolo)
                    //console.log(value)
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
                        case 2: //-> sin errores, break
                            break;
                        case 3: //-> sin errores, continue
                            break;
                        case 4: //-> sin errores, return
                            this.actualizarTs(tablasimbolo1,tablasimbolo,parameters)
                            //console.log(value);
                            return [4,value[1]];
                    }
                }
                this.actualizarTs(tablasimbolo1,tablasimbolo,parameters)
                return [1,null]
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, Internal Error, Parameters length is not the same length, length: '+this.Parameters.length+', length_send: '+parameters.length)
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Internal Error, Parameters length is not the same length, length: '+this.Parameters.length+', length_send: '+parameters.length+'"}')
            return [-1,'Internal Error, Parameters length is not the same length, length: '+this.Parameters.length+", length_send: "+parameters.length];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, we cannot find the error...\"}')
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
                    let value = <expression> finder;
                    if(value.name!='' && value.isCallFunction == false)
                    {
                        let simbol = tablasimbolos1.getsym(value.name)
                        if(simbol[0]>0)
                        {
                            let valor = <sym> simbol[1];
                            let insert = tablasimbolos.update(value.name,valor.getValue());
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
            let tempBody = [];
            for(let btemp of this.body)
            {
                tempBody.push(btemp);
            }

            while(state) {

                let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1,false)
                let valInitial = this.ValueExpression.execute(tablasimbolo);
                if (valInitial[0] < 0) return [-1, null];
                if(!valInitial[1]) break;
                let internalState = 0;

                for(let statement0 of tempBody)
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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, we cannot find the error...\"}')
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
            //let tablasimblolo:tablasimbolos = new tablasimbolos(tablasimblolo1,false)
            let state = true;

            let tempBody = [];
            for(let btemp of this.body)
            {
                tempBody.push(btemp);
            }
            while(state) {
                let tablasimblolo:tablasimbolos = new tablasimbolos(tablasimblolo1,false)
                let internalState = 0;
                for(let statement0 of tempBody)
                {
                    let value = statement0.execute(tablasimblolo);
                    //console.log(value, statement0);
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
                //console.log(valInitial)
                if (valInitial[0] < 0) return [-1, null];
                if(!valInitial[1]) break;
            }
            return [1,this.value]
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, we cannot find the error...\"}')
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
            //this.value = []
            //console.log(this.body)

            //let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1,false)
            let tablasimbolo2:tablasimbolos = new tablasimbolos(tablasimbolo1,false)
            let initial = this.valueInitial.execute(tablasimbolo2);
            let tempBody = [];
            for(let btemp of this.body)
            {
                tempBody.push(btemp);
            }
            if(initial[0]>0)
            {
                //console.log(tablasimbolo)

                let state = true;
                while(state)
                {

                    let internalState = 0;
                    let condicion = this.condicion.execute(tablasimbolo2);
                    //console.log(condicion)
                    if(condicion[0]<0) return [-1,'Condition Iteration For, Error, cannot execute the  Condition']

                    if(condicion[1])
                    {
                        let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo2,false)
                        //console.log(condicion[1])
                        for(let statement1 of tempBody)
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
                        let post = this.postIterator.execute(tablasimbolo2);
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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, we cannot find the error...\"}')
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
        let tempBody = [];
        for(let btemp of this.body)
        {
            tempBody.push(btemp);
        }
        try
        {
            this.value = []
            let internalState = 0;
            tablasimbolo.insert(this.identificador,null,TypeSym.Variable, TypeValue.Object);
            for(let statement1 of tempBody)
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
                    for(let statement1 of tempBody)
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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, Cannot applied iterators in For...in, because only Arrays is permited!.')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Cannot applied iterators in For...in, because only Arrays is permited!.\"}')

            return [-1,'Cannot applied iterators in For...in, because only Arrays is permited!.']

        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, we cannot find the error...\"}')

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
            let tempBody = [];
            for(let btemp of this.body)
            {
                tempBody.push(btemp);
            }
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

                                    for(let statement1 of tempBody)
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

                                for(let statement1 of tempBody)
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
                            for(let statement1 of tempBody)
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
                    for(let statement1 of tempBody)
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
                    for(let statement1 of tempBody)
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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, We cannot applied the instructions, because For...Of only iterate Strings and Arrays...')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', We cannot applied the instructions, because For...Of only iterate Strings and Arrays...\"}')

            return [-1,'We cannot applied the instructions, because For...Of only iterate Strings and Arrays...'];
        }
        catch (e) {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, we cannot find the error...\"}')

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
                    //console.log('console-> ',tablasimbolo)

                    if(this.Expression == null) return [-1,null];
                    //console.log(this.Expression);
                    //console.log(valu);
                    let value = valu.execute(tablasimbolo);
                    //console.log(value);
                    if(value[0]<0) return [-1,null];
                    //this.htmlYouWantToAdd = "<p><b>value[1]</b></p>";
                    if(value[1] == null)
                    {
                        resultado += "null";
                    }
                    else
                    {
                        //console.log(1998, value[1])
                        if(value[1] instanceof  arrays)
                        {
                            try
                            {
                                resultado += '[ '
                                let a = 0;
                                for(let m of value[1].getAll())
                                {
                                    a++;
                                    if(m instanceof statement)
                                    {
                                        resultado += m.execute(tablasimbolo)[1];
                                    }
                                    else
                                    {
                                        resultado += m;
                                    }

                                    if(a < value[1].getAll().length ) resultado += ' , '
                                }
                                resultado += ' ]';

                            }
                            catch (e) {
                                resultado += value[1];

                            }

                        }
                        else if(value[1] instanceof types)
                        {
                            //console.log(value[1])
                            resultado += value[1].execute(tablasimbolo)[1];
                        }
                        else
                        {


                                if(value[1].toString().includes('\n'))
                                {
                                    let vales = value[1].split('\n')
                                    for(let vale of vales)
                                    {
                                        outs.push('Linea: '+this.linea+', valor: '+vale)
                                        output.push('{\"linea\":\"'+this.linea+'\", \"valor\":\"'+vale+'\"}')
                                    }
                                }
                                else
                                {
                                    resultado += value[1];
                                }

                        }

                    }
                }
                outs.push('Linea: '+this.linea+', valor: '+resultado)
                output.push('{\"linea\":\"'+this.linea+'\", \"valor\":\"'+resultado+'\"}')
                return [1,'{\"linea\":\"'+this.linea+'\", \"valor\":\"'+resultado+'\"}']
            }
            else
            {
                ghs = '{ \"simbolos\":['
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
                    ghs += string
                }
                ghs += ']}'
                return [1,this.graph];
            }
        }
        catch (e) {
            //console.log(e)
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction\"}')
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
        //console.log(this.atributos)
        return [1,this]
    }
    getValueAtributo(atributo:string)
    {
        for(let atr of this.atributos)
        {
            if(atr.name==atributo)
            {
                //console.log(atr)
                return [1,atr];
            }
        }
        outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot get Atributte')
        output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot get the atributte\"}')

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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction\"}')

            return [-1,null]
        }
        catch (e)
        {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction\"}')

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
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot get Attribute')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot get the atributte\"}')

            return [-1,null]
        }
        catch (e)
        {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction\"}')

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
        outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
        output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot set the atributte\"}')

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

    execute(tablasimbolos)
    {

    }
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
            //console.log(this)
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
                                    outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, we can\'t identified the error.')
                                    output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', An Error was ocurred, we can\'t identified the error.\"}')
                                    return [-1,'An Error was ocurred, we can\'t identified the error.'];
                            }
                    }
                }
            }

            return [1,null];
        }
        catch(e)
        {
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\"  Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction\"}')

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
                //console.log(valor);
                if(valor[0]>0)
                {
                    return tablasimbolo.insert(this.name,valor[1],this.tipoSim, this.tipo);
                }
            }
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Error [declaration] Linea: '+this.linea+', cannot be execute the instruction\"}')
            return [-1,'Error [declaration] Linea: '+this.linea+', cannot be execute the instruction']
        }
        catch (e) {
            //console.log(e)
            outs.push('Error: Ocurrio un error inesperado, Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction')
            output.push('{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Error [declaration] Linea: '+this.linea+', Unexpected Error, cannot be execute the instruction\"}')
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
            //console.log(val)
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

let jsondata2 =  '{"linea":"170","S":[{"linea":"6","statement":"declaration","type":[{"linea":"1","tipo":[{"linea":"1","tipo":"type"}],"size":[]}], "values":[{"linea":"6","statement":"variable","tipoExpresion":[],"name":"AVLNode","ValExpression":[{"linea":"6","operator":[{"linea":"1","v":"="}],"Expression":[{"linea":"6","statement":"typebody","values":[{"linea":"2","statement":"atributo","name":"left", "tipo":[{"linea":"2","tipo":"AVLNode"}],"valor":[]},\n' +
    '{"linea":"3","statement":"atributo","name":"right", "tipo":[{"linea":"3","tipo":"AVLNode"}],"valor":[]},\n' +
    '{"linea":"4","statement":"atributo","name":"height", "tipo":[{"linea":"4","tipo":"number"}],"valor":[]},\n' +
    '{"linea":"5","statement":"atributo","name":"value", "tipo":[{"linea":"5","tipo":"number"}],"valor":[]}]}]}]}]},\n' +
    '{"linea":"10","statement":"declaration","type":[{"linea":"8","tipo":[{"linea":"8","tipo":"type"}],"size":[]}], "values":[{"linea":"10","statement":"variable","tipoExpresion":[],"name":"AVLTree","ValExpression":[{"linea":"10","operator":[{"linea":"8","v":"="}],"Expression":[{"linea":"10","statement":"typebody","values":[{"linea":"9","statement":"atributo","name":"root", "tipo":[{"linea":"9","tipo":"AVLNode"}],"valor":[]}]}]}]}]},\n' +
    '{"linea":"17","statement":"funcion","name":"height","type":[{"linea":"12","tipo":[{"linea":"12","tipo":"number"}],"size":[]}],"params":[{"linea":"12","statement":"parameter","name":"n","tipo":[{"linea":"12","tipo":[{"linea":"12","tipo":"AVLNode"}],"size":[]}]}],"body":[{"linea":"15","statement":"if","Expression":[{"linea":"13","statement":"Relational","Relational":"==","Expression1":[{"linea":"13","statement":"variable","value":"n"}],"Expression2":[{"linea":"13","tipo":"null", "value":"null"}]}],"body":[{"linea":"14","statement":"return", "Expression":[{"linea":"14","tipo":"number", "value":"0"}]}], "else":[]},\n' +
    '{"linea":"16","statement":"return", "Expression":[{"linea":"16","statement":"callAtributo", "value":"n", "hijo":[{"linea":"16","statement":"Object","value":"height"}]}]}]},\n' +
    '{"linea":"72","statement":"funcion","name":"insert","type":[{"linea":"19","tipo":[{"linea":"19","tipo":"AVLNode"}],"size":[]}],"params":[{"linea":"19","statement":"parameter","name":"node","tipo":[{"linea":"19","tipo":[{"linea":"19","tipo":"AVLNode"}],"size":[]}]},\n' +
    '{"linea":"19","statement":"parameter","name":"value","tipo":[{"linea":"19","tipo":[{"linea":"19","tipo":"number"}],"size":[]}]}],"body":[{"linea":"29","statement":"if","Expression":[{"linea":"21","statement":"Relational","Relational":"==","Expression1":[{"linea":"21","statement":"variable","value":"node"}],"Expression2":[{"linea":"21","tipo":"null", "value":"null"}]}],"body":[{"linea":"27","statement":"asignation","variable":"node","params":[],"ValExpression":[{"linea":"27","operator":[{"linea":"22","v":"="}],"Expression":[{"linea":"27","statement":"typebody","values":[{"linea":"23","statement":"atributo","name":"left", "tipo":[],"valor":[{"linea":"23","tipo":"null", "value":"null"}]},\n' +
    '{"linea":"24","statement":"atributo","name":"right", "tipo":[],"valor":[{"linea":"24","tipo":"null", "value":"null"}]},\n' +
    '{"linea":"25","statement":"atributo","name":"height", "tipo":[{"linea":"25","tipo":"number"}],"valor":[]},\n' +
    '{"linea":"26","statement":"atributo","name":"value", "tipo":[{"linea":"26","tipo":"value"}],"valor":[]}]}]}]},\n' +
    '{"linea":"28","statement":"return", "Expression":[{"linea":"28","statement":"variable","value":"node"}]}], "else":[]},\n' +
    '{"linea":"35","statement":"if","Expression":[{"linea":"31","statement":"Relational","Relational":"<","Expression1":[{"linea":"31","statement":"variable","value":"value"}],"Expression2":[{"linea":"31","statement":"callAtributo", "value":"node", "hijo":[{"linea":"31","statement":"Object","value":"value"}]}]}],"body":[{"linea":"32","statement":"asignation","variable":"node","params":[{"linea":"32","statement":"Object","value":"left"}],"ValExpression":[{"linea":"32","operator":[{"linea":"32","v":"="}],"Expression":[{"linea":"32","statement":"callFuncion","padre":[{"linea":"32","statement":"variable","value":"insert"}],"argumentos":[{"linea":"32","statement":"callAtributo", "value":"node", "hijo":[{"linea":"32","statement":"Object","value":"left"}]},\n' +
    '{"linea":"32","statement":"variable","value":"value"}]}]}]}], "else":[{"linea":"34","statement":"asignation","variable":"node","params":[{"linea":"34","statement":"Object","value":"right"}],"ValExpression":[{"linea":"34","operator":[{"linea":"34","v":"="}],"Expression":[{"linea":"34","statement":"callFuncion","padre":[{"linea":"34","statement":"variable","value":"insert"}],"argumentos":[{"linea":"34","statement":"callAtributo", "value":"node", "hijo":[{"linea":"34","statement":"Object","value":"right"}]},\n' +
    '{"linea":"34","statement":"variable","value":"value"}]}]}]}]},\n' +
    '{"linea":"42","statement":"if","Expression":[{"linea":"38","statement":"Relational","Relational":">","Expression1":[{"linea":"38","statement":"callFuncion","padre":[{"linea":"38","statement":"variable","value":"height"}],"argumentos":[{"linea":"38","statement":"callAtributo", "value":"node", "hijo":[{"linea":"38","statement":"Object","value":"left"}]}]}],"Expression2":[{"linea":"38","statement":"callFuncion","padre":[{"linea":"38","statement":"variable","value":"height"}],"argumentos":[{"linea":"38","statement":"callAtributo", "value":"node", "hijo":[{"linea":"38","statement":"Object","value":"right"}]}]}]}],"body":[{"linea":"39","statement":"asignation","variable":"node","params":[{"linea":"39","statement":"Object","value":"height"}],"ValExpression":[{"linea":"39","operator":[{"linea":"39","v":"="}],"Expression":[{"linea":"39","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"39","statement":"callFuncion","padre":[{"linea":"39","statement":"variable","value":"height"}],"argumentos":[{"linea":"39","statement":"callAtributo", "value":"node", "hijo":[{"linea":"39","statement":"Object","value":"left"}]}]}],"Expression2":[{"linea":"39","tipo":"number", "value":"1"}]}]}]}], "else":[{"linea":"41","statement":"asignation","variable":"node","params":[{"linea":"41","statement":"Object","value":"height"}],"ValExpression":[{"linea":"41","operator":[{"linea":"41","v":"="}],"Expression":[{"linea":"41","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"41","statement":"callFuncion","padre":[{"linea":"41","statement":"variable","value":"height"}],"argumentos":[{"linea":"41","statement":"callAtributo", "value":"node", "hijo":[{"linea":"41","statement":"Object","value":"right"}]}]}],"Expression2":[{"linea":"41","tipo":"number", "value":"1"}]}]}]}]},\n' +
    '{"linea":"45","statement":"declaration","type":[{"linea":"45","tipo":[{"linea":"45","tipo":"let"}],"size":[]}], "values":[{"linea":"45","statement":"variable","tipoExpresion":[],"name":"balance","ValExpression":[{"linea":"45","operator":[{"linea":"45","v":"="}],"Expression":[{"linea":"45","statement":"callFuncion","padre":[{"linea":"45","statement":"variable","value":"getBalance"}],"argumentos":[{"linea":"45","statement":"variable","value":"node"}]}]}]}]},\n' +
    '{"linea":"51","statement":"if","Expression":[{"linea":"49","statement":"Logical","Logical":"&&","Expression1":[{"linea":"49","statement":"Relational","Relational":">","Expression1":[{"linea":"49","statement":"variable","value":"balance"}],"Expression2":[{"linea":"49","tipo":"number", "value":"1"}]}],"Expression2":[{"linea":"49","statement":"Relational","Relational":"<","Expression1":[{"linea":"49","statement":"variable","value":"value"}],"Expression2":[{"linea":"49","statement":"callAtributo", "value":"node", "hijo":[{"linea":"49","statement":"Object","value":"left"},{"statement":"Object","value":"value"}]}]}]}],"body":[{"linea":"50","statement":"return", "Expression":[{"linea":"50","statement":"callFuncion","padre":[{"linea":"50","statement":"variable","value":"rightRotate"}],"argumentos":[{"linea":"50","statement":"variable","value":"node"}]}]}], "else":[]},\n' +
    '{"linea":"56","statement":"if","Expression":[{"linea":"54","statement":"Logical","Logical":"&&","Expression1":[{"linea":"54","statement":"Relational","Relational":"<","Expression1":[{"linea":"54","statement":"variable","value":"balance"}],"Expression2":[{"linea":"54","statement":"negativo","Expression":[{"linea":"54","tipo":"number", "value":"1"}]}]}],"Expression2":[{"linea":"54","statement":"Relational","Relational":">","Expression1":[{"linea":"54","statement":"variable","value":"value"}],"Expression2":[{"linea":"54","statement":"callAtributo", "value":"node", "hijo":[{"linea":"54","statement":"Object","value":"right"},{"statement":"Object","value":"value"}]}]}]}],"body":[{"linea":"55","statement":"return", "Expression":[{"linea":"55","statement":"callFuncion","padre":[{"linea":"55","statement":"variable","value":"leftRotate"}],"argumentos":[{"linea":"55","statement":"variable","value":"node"}]}]}], "else":[]},\n' +
    '{"linea":"62","statement":"if","Expression":[{"linea":"59","statement":"Logical","Logical":"&&","Expression1":[{"linea":"59","statement":"Relational","Relational":">","Expression1":[{"linea":"59","statement":"variable","value":"balance"}],"Expression2":[{"linea":"59","tipo":"number", "value":"1"}]}],"Expression2":[{"linea":"59","statement":"Relational","Relational":">","Expression1":[{"linea":"59","statement":"variable","value":"value"}],"Expression2":[{"linea":"59","statement":"callAtributo", "value":"node", "hijo":[{"linea":"59","statement":"Object","value":"left"},{"statement":"Object","value":"value"}]}]}]}],"body":[{"linea":"60","statement":"asignation","variable":"node","params":[{"linea":"60","statement":"Object","value":"left"}],"ValExpression":[{"linea":"60","operator":[{"linea":"60","v":"="}],"Expression":[{"linea":"60","statement":"callFuncion","padre":[{"linea":"60","statement":"variable","value":"leftRotate"}],"argumentos":[{"linea":"60","statement":"callAtributo", "value":"node", "hijo":[{"linea":"60","statement":"Object","value":"left"}]}]}]}]},\n' +
    '{"linea":"61","statement":"return", "Expression":[{"linea":"61","statement":"callFuncion","padre":[{"linea":"61","statement":"variable","value":"rightRotate"}],"argumentos":[{"linea":"61","statement":"variable","value":"node"}]}]}], "else":[]},\n' +
    '{"linea":"68","statement":"if","Expression":[{"linea":"65","statement":"Logical","Logical":"&&","Expression1":[{"linea":"65","statement":"Relational","Relational":"<","Expression1":[{"linea":"65","statement":"variable","value":"balance"}],"Expression2":[{"linea":"65","statement":"negativo","Expression":[{"linea":"65","tipo":"number", "value":"1"}]}]}],"Expression2":[{"linea":"65","statement":"Relational","Relational":"<","Expression1":[{"linea":"65","statement":"variable","value":"value"}],"Expression2":[{"linea":"65","statement":"callAtributo", "value":"node", "hijo":[{"linea":"65","statement":"Object","value":"right"},{"statement":"Object","value":"value"}]}]}]}],"body":[{"linea":"66","statement":"asignation","variable":"node","params":[{"linea":"66","statement":"Object","value":"right"}],"ValExpression":[{"linea":"66","operator":[{"linea":"66","v":"="}],"Expression":[{"linea":"66","statement":"callFuncion","padre":[{"linea":"66","statement":"variable","value":"rightRotate"}],"argumentos":[{"linea":"66","statement":"callAtributo", "value":"node", "hijo":[{"linea":"66","statement":"Object","value":"right"}]}]}]}]},\n' +
    '{"linea":"67","statement":"return", "Expression":[{"linea":"67","statement":"callFuncion","padre":[{"linea":"67","statement":"variable","value":"leftRotate"}],"argumentos":[{"linea":"67","statement":"variable","value":"node"}]}]}], "else":[]},\n' +
    '{"linea":"71","statement":"return", "Expression":[{"linea":"71","statement":"variable","value":"node"}]}]},\n' +
    '{"linea":"97","statement":"funcion","name":"rightRotate","type":[{"linea":"74","tipo":[{"linea":"74","tipo":"AVLNode"}],"size":[]}],"params":[{"linea":"74","statement":"parameter","name":"y","tipo":[{"linea":"74","tipo":[{"linea":"74","tipo":"AVLNode"}],"size":[]}]}],"body":[{"linea":"75","statement":"declaration","type":[{"linea":"75","tipo":[{"linea":"75","tipo":"let"}],"size":[]}], "values":[{"linea":"75","statement":"variable","tipoExpresion":[{"linea":"75","tipo":[{"linea":"75","tipo":"AVLNode"}],"size":[]}],"name":"x","ValExpression":[{"linea":"75","operator":[{"linea":"75","v":"="}],"Expression":[{"linea":"75","statement":"callAtributo", "value":"y", "hijo":[{"linea":"75","statement":"Object","value":"left"}]}]}]}]},\n' +
    '{"linea":"76","statement":"declaration","type":[{"linea":"76","tipo":[{"linea":"76","tipo":"let"}],"size":[]}], "values":[{"linea":"76","statement":"variable","tipoExpresion":[{"linea":"76","tipo":[{"linea":"76","tipo":"AVLNode"}],"size":[]}],"name":"T2","ValExpression":[{"linea":"76","operator":[{"linea":"76","v":"="}],"Expression":[{"linea":"76","statement":"callAtributo", "value":"x", "hijo":[{"linea":"76","statement":"Object","value":"right"}]}]}]}]},\n' +
    '{"linea":"79","statement":"asignation","variable":"x","params":[{"linea":"79","statement":"Object","value":"right"}],"ValExpression":[{"linea":"79","operator":[{"linea":"79","v":"="}],"Expression":[{"linea":"79","statement":"variable","value":"y"}]}]},\n' +
    '{"linea":"80","statement":"asignation","variable":"y","params":[{"linea":"80","statement":"Object","value":"left"}],"ValExpression":[{"linea":"80","operator":[{"linea":"80","v":"="}],"Expression":[{"linea":"80","statement":"variable","value":"T2"}]}]},\n' +
    '{"linea":"87","statement":"if","Expression":[{"linea":"83","statement":"Relational","Relational":">","Expression1":[{"linea":"83","statement":"callFuncion","padre":[{"linea":"83","statement":"variable","value":"height"}],"argumentos":[{"linea":"83","statement":"callAtributo", "value":"y", "hijo":[{"linea":"83","statement":"Object","value":"left"}]}]}],"Expression2":[{"linea":"83","statement":"callFuncion","padre":[{"linea":"83","statement":"variable","value":"height"}],"argumentos":[{"linea":"83","statement":"callAtributo", "value":"y", "hijo":[{"linea":"83","statement":"Object","value":"right"}]}]}]}],"body":[{"linea":"84","statement":"asignation","variable":"y","params":[{"linea":"84","statement":"Object","value":"height"}],"ValExpression":[{"linea":"84","operator":[{"linea":"84","v":"="}],"Expression":[{"linea":"84","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"84","statement":"callFuncion","padre":[{"linea":"84","statement":"variable","value":"height"}],"argumentos":[{"linea":"84","statement":"callAtributo", "value":"y", "hijo":[{"linea":"84","statement":"Object","value":"left"}]}]}],"Expression2":[{"linea":"84","tipo":"number", "value":"1"}]}]}]}], "else":[{"linea":"86","statement":"asignation","variable":"y","params":[{"linea":"86","statement":"Object","value":"height"}],"ValExpression":[{"linea":"86","operator":[{"linea":"86","v":"="}],"Expression":[{"linea":"86","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"86","statement":"callFuncion","padre":[{"linea":"86","statement":"variable","value":"height"}],"argumentos":[{"linea":"86","statement":"callAtributo", "value":"y", "hijo":[{"linea":"86","statement":"Object","value":"right"}]}]}],"Expression2":[{"linea":"86","tipo":"number", "value":"1"}]}]}]}]},\n' +
    '{"linea":"93","statement":"if","Expression":[{"linea":"89","statement":"Relational","Relational":">","Expression1":[{"linea":"89","statement":"callFuncion","padre":[{"linea":"89","statement":"variable","value":"height"}],"argumentos":[{"linea":"89","statement":"callAtributo", "value":"x", "hijo":[{"linea":"89","statement":"Object","value":"left"}]}]}],"Expression2":[{"linea":"89","statement":"callFuncion","padre":[{"linea":"89","statement":"variable","value":"height"}],"argumentos":[{"linea":"89","statement":"callAtributo", "value":"x", "hijo":[{"linea":"89","statement":"Object","value":"right"}]}]}]}],"body":[{"linea":"90","statement":"asignation","variable":"x","params":[{"linea":"90","statement":"Object","value":"height"}],"ValExpression":[{"linea":"90","operator":[{"linea":"90","v":"="}],"Expression":[{"linea":"90","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"90","statement":"callFuncion","padre":[{"linea":"90","statement":"variable","value":"height"}],"argumentos":[{"linea":"90","statement":"callAtributo", "value":"x", "hijo":[{"linea":"90","statement":"Object","value":"left"}]}]}],"Expression2":[{"linea":"90","tipo":"number", "value":"1"}]}]}]}], "else":[{"linea":"92","statement":"asignation","variable":"x","params":[{"linea":"92","statement":"Object","value":"height"}],"ValExpression":[{"linea":"92","operator":[{"linea":"92","v":"="}],"Expression":[{"linea":"92","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"92","statement":"callFuncion","padre":[{"linea":"92","statement":"variable","value":"height"}],"argumentos":[{"linea":"92","statement":"callAtributo", "value":"x", "hijo":[{"linea":"92","statement":"Object","value":"right"}]}]}],"Expression2":[{"linea":"92","tipo":"number", "value":"1"}]}]}]}]},\n' +
    '{"linea":"96","statement":"return", "Expression":[{"linea":"96","statement":"variable","value":"x"}]}]},\n' +
    '{"linea":"121","statement":"funcion","name":"leftRotate","type":[{"linea":"99","tipo":[{"linea":"99","tipo":"AVLNode"}],"size":[]}],"params":[{"linea":"99","statement":"parameter","name":"x","tipo":[{"linea":"99","tipo":[{"linea":"99","tipo":"AVLNode"}],"size":[]}]}],"body":[{"linea":"100","statement":"declaration","type":[{"linea":"100","tipo":[{"linea":"100","tipo":"let"}],"size":[]}], "values":[{"linea":"100","statement":"variable","tipoExpresion":[{"linea":"100","tipo":[{"linea":"100","tipo":"AVLNode"}],"size":[]}],"name":"y","ValExpression":[{"linea":"100","operator":[{"linea":"100","v":"="}],"Expression":[{"linea":"100","statement":"callAtributo", "value":"x", "hijo":[{"linea":"100","statement":"Object","value":"right"}]}]}]}]},\n' +
    '{"linea":"101","statement":"declaration","type":[{"linea":"101","tipo":[{"linea":"101","tipo":"let"}],"size":[]}], "values":[{"linea":"101","statement":"variable","tipoExpresion":[{"linea":"101","tipo":[{"linea":"101","tipo":"AVLNode"}],"size":[]}],"name":"T2","ValExpression":[{"linea":"101","operator":[{"linea":"101","v":"="}],"Expression":[{"linea":"101","statement":"callAtributo", "value":"y", "hijo":[{"linea":"101","statement":"Object","value":"left"}]}]}]}]},\n' +
    '{"linea":"104","statement":"asignation","variable":"y","params":[{"linea":"104","statement":"Object","value":"left"}],"ValExpression":[{"linea":"104","operator":[{"linea":"104","v":"="}],"Expression":[{"linea":"104","statement":"variable","value":"x"}]}]},\n' +
    '{"linea":"105","statement":"asignation","variable":"x","params":[{"linea":"105","statement":"Object","value":"right"}],"ValExpression":[{"linea":"105","operator":[{"linea":"105","v":"="}],"Expression":[{"linea":"105","statement":"variable","value":"T2"}]}]},\n' +
    '{"linea":"112","statement":"if","Expression":[{"linea":"108","statement":"Relational","Relational":">","Expression1":[{"linea":"108","statement":"callFuncion","padre":[{"linea":"108","statement":"variable","value":"height"}],"argumentos":[{"linea":"108","statement":"callAtributo", "value":"x", "hijo":[{"linea":"108","statement":"Object","value":"left"}]}]}],"Expression2":[{"linea":"108","statement":"callFuncion","padre":[{"linea":"108","statement":"variable","value":"height"}],"argumentos":[{"linea":"108","statement":"callAtributo", "value":"x", "hijo":[{"linea":"108","statement":"Object","value":"right"}]}]}]}],"body":[{"linea":"109","statement":"asignation","variable":"x","params":[{"linea":"109","statement":"Object","value":"height"}],"ValExpression":[{"linea":"109","operator":[{"linea":"109","v":"="}],"Expression":[{"linea":"109","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"109","statement":"callFuncion","padre":[{"linea":"109","statement":"variable","value":"height"}],"argumentos":[{"linea":"109","statement":"callAtributo", "value":"x", "hijo":[{"linea":"109","statement":"Object","value":"left"}]}]}],"Expression2":[{"linea":"109","tipo":"number", "value":"1"}]}]}]}], "else":[{"linea":"111","statement":"asignation","variable":"x","params":[{"linea":"111","statement":"Object","value":"height"}],"ValExpression":[{"linea":"111","operator":[{"linea":"111","v":"="}],"Expression":[{"linea":"111","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"111","statement":"callFuncion","padre":[{"linea":"111","statement":"variable","value":"height"}],"argumentos":[{"linea":"111","statement":"callAtributo", "value":"x", "hijo":[{"linea":"111","statement":"Object","value":"right"}]}]}],"Expression2":[{"linea":"111","tipo":"number", "value":"1"}]}]}]}]},\n' +
    '{"linea":"118","statement":"if","Expression":[{"linea":"114","statement":"Relational","Relational":">","Expression1":[{"linea":"114","statement":"callFuncion","padre":[{"linea":"114","statement":"variable","value":"height"}],"argumentos":[{"linea":"114","statement":"callAtributo", "value":"y", "hijo":[{"linea":"114","statement":"Object","value":"left"}]}]}],"Expression2":[{"linea":"114","statement":"callFuncion","padre":[{"linea":"114","statement":"variable","value":"height"}],"argumentos":[{"linea":"114","statement":"callAtributo", "value":"y", "hijo":[{"linea":"114","statement":"Object","value":"right"}]}]}]}],"body":[{"linea":"115","statement":"asignation","variable":"y","params":[{"linea":"115","statement":"Object","value":"height"}],"ValExpression":[{"linea":"115","operator":[{"linea":"115","v":"="}],"Expression":[{"linea":"115","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"115","statement":"callFuncion","padre":[{"linea":"115","statement":"variable","value":"height"}],"argumentos":[{"linea":"115","statement":"callAtributo", "value":"y", "hijo":[{"linea":"115","statement":"Object","value":"left"}]}]}],"Expression2":[{"linea":"115","tipo":"number", "value":"1"}]}]}]}], "else":[{"linea":"117","statement":"asignation","variable":"y","params":[{"linea":"117","statement":"Object","value":"height"}],"ValExpression":[{"linea":"117","operator":[{"linea":"117","v":"="}],"Expression":[{"linea":"117","statement":"Aritmetic","Aritmetic":"+","Expression1":[{"linea":"117","statement":"callFuncion","padre":[{"linea":"117","statement":"variable","value":"height"}],"argumentos":[{"linea":"117","statement":"callAtributo", "value":"y", "hijo":[{"linea":"117","statement":"Object","value":"right"}]}]}],"Expression2":[{"linea":"117","tipo":"number", "value":"1"}]}]}]}]},\n' +
    '{"linea":"120","statement":"return", "Expression":[{"linea":"120","statement":"variable","value":"y"}]}]},\n' +
    '{"linea":"129","statement":"funcion","name":"getBalance","type":[{"linea":"124","tipo":[{"linea":"124","tipo":"number"}],"size":[]}],"params":[{"linea":"124","statement":"parameter","name":"N","tipo":[{"linea":"124","tipo":[{"linea":"124","tipo":"AVLNode"}],"size":[]}]}],"body":[{"linea":"127","statement":"if","Expression":[{"linea":"125","statement":"Relational","Relational":"==","Expression1":[{"linea":"125","statement":"variable","value":"N"}],"Expression2":[{"linea":"125","tipo":"null", "value":"null"}]}],"body":[{"linea":"126","statement":"return", "Expression":[{"linea":"126","tipo":"number", "value":"0"}]}], "else":[]},\n' +
    '{"linea":"128","statement":"return", "Expression":[{"linea":"128","statement":"Aritmetic","Aritmetic":"-","Expression1":[{"linea":"128","statement":"callFuncion","padre":[{"linea":"128","statement":"variable","value":"height"}],"argumentos":[{"linea":"128","statement":"callAtributo", "value":"N", "hijo":[{"linea":"128","statement":"Object","value":"left"}]}]}],"Expression2":[{"linea":"128","statement":"callFuncion","padre":[{"linea":"128","statement":"variable","value":"height"}],"argumentos":[{"linea":"128","statement":"callAtributo", "value":"N", "hijo":[{"linea":"128","statement":"Object","value":"right"}]}]}]}]}]},\n' +
    '{"linea":"137","statement":"funcion","name":"preOrder","type":[{"linea":"131","tipo":[{"linea":"131","tipo":"void"}],"size":[]}],"params":[{"linea":"131","statement":"parameter","name":"root","tipo":[{"linea":"131","tipo":[{"linea":"131","tipo":"AVLNode"}],"size":[]}]}],"body":[{"linea":"136","statement":"if","Expression":[{"linea":"132","statement":"Relational","Relational":"!=","Expression1":[{"linea":"132","statement":"variable","value":"root"}],"Expression2":[{"linea":"132","tipo":"null", "value":"null"}]}],"body":[{"linea":"133","statement":"CallFunction","name":"preOrder", "parameters":[{"linea":"133","statement":"callAtributo", "value":"root", "hijo":[{"linea":"133","statement":"Object","value":"left"}]}]},\n' +
    '{"linea":"133","statement":""},\n' +
    '{"linea":"134","statement":"console","expression":[{"linea":"134","statement":"callAtributo", "value":"root", "hijo":[{"linea":"134","statement":"Object","value":"value"}]}]},\n' +
    '{"linea":"135","statement":"CallFunction","name":"preOrder", "parameters":[{"linea":"135","statement":"callAtributo", "value":"root", "hijo":[{"linea":"135","statement":"Object","value":"right"}]}]},\n' +
    '{"linea":"135","statement":""}], "else":[]}]},\n' +
    '{"linea":"153","statement":"funcion","name":"getDot","type":[{"linea":"139","tipo":[{"linea":"139","tipo":"string"}],"size":[]}],"params":[{"linea":"139","statement":"parameter","name":"root","tipo":[{"linea":"139","tipo":[{"linea":"139","tipo":"AVLNode"}],"size":[]}]}],"body":[{"linea":"151","statement":"if","Expression":[{"linea":"140","statement":"Relational","Relational":"!=","Expression1":[{"linea":"140","statement":"variable","value":"root"}],"Expression2":[{"linea":"140","tipo":"null", "value":"null"}]}],"body":[{"linea":"141","statement":"declaration","type":[{"linea":"141","tipo":[{"linea":"141","tipo":"let"}],"size":[]}], "values":[{"linea":"141","statement":"variable","tipoExpresion":[],"name":"ret","ValExpression":[{"linea":"141","operator":[{"linea":"141","v":"="}],"Expression":[{"linea":"141","tipo":"string2", "value":"${root.value}\\n"}]}]}]},\n' +
    '{"linea":"142","statement":"declaration","type":[{"linea":"142","tipo":[{"linea":"142","tipo":"let"}],"size":[]}], "values":[{"linea":"142","statement":"variable","tipoExpresion":[],"name":"tmp","ValExpression":[{"linea":"142","operator":[{"linea":"142","v":"="}],"Expression":[{"linea":"142","statement":"callFuncion","padre":[{"linea":"142","statement":"variable","value":"getDot"}],"argumentos":[{"linea":"142","statement":"callAtributo", "value":"root", "hijo":[{"linea":"142","statement":"Object","value":"left"}]}]}]}]}]},\n' +
    '{"linea":"145","statement":"if","Expression":[{"linea":"143","statement":"Relational","Relational":"!=","Expression1":[{"linea":"143","statement":"variable","value":"tmp"}],"Expression2":[{"linea":"143","tipo":"null", "value":"null"}]}],"body":[{"linea":"144","statement":"asignation","variable":"ret","params":[],"ValExpression":[{"linea":"144","operator":[{"linea":"144","v":"+="}],"Expression":[{"linea":"144","tipo":"string2", "value":"${root.value} -> ${tmp}"}]}]}], "else":[]},\n' +
    '{"linea":"146","statement":"asignation","variable":"tmp","params":[],"ValExpression":[{"linea":"146","operator":[{"linea":"146","v":"="}],"Expression":[{"linea":"146","statement":"callFuncion","padre":[{"linea":"146","statement":"variable","value":"getDot"}],"argumentos":[{"linea":"146","statement":"callAtributo", "value":"root", "hijo":[{"linea":"146","statement":"Object","value":"right"}]}]}]}]},\n' +
    '{"linea":"149","statement":"if","Expression":[{"linea":"147","statement":"Relational","Relational":"!=","Expression1":[{"linea":"147","statement":"variable","value":"tmp"}],"Expression2":[{"linea":"147","tipo":"null", "value":"null"}]}],"body":[{"linea":"148","statement":"asignation","variable":"ret","params":[],"ValExpression":[{"linea":"148","operator":[{"linea":"148","v":"+="}],"Expression":[{"linea":"148","tipo":"string2", "value":"${root.value} -> ${tmp}"}]}]}], "else":[]},\n' +
    '{"linea":"150","statement":"return", "Expression":[{"linea":"150","statement":"variable","value":"ret"}]}], "else":[]},\n' +
    '{"linea":"152","statement":"return", "Expression":[{"linea":"152","tipo":"null", "value":"null"}]}]},\n' +
    '{"linea":"157","statement":"declaration","type":[{"linea":"155","tipo":[{"linea":"155","tipo":"let"}],"size":[]}], "values":[{"linea":"157","statement":"variable","tipoExpresion":[{"linea":"155","tipo":[{"linea":"155","tipo":"AVLTree"}],"size":[]}],"name":"tree","ValExpression":[{"linea":"157","operator":[{"linea":"155","v":"="}],"Expression":[{"linea":"157","statement":"typebody","values":[{"linea":"156","statement":"atributo","name":"root", "tipo":[],"valor":[{"linea":"156","tipo":"null", "value":"null"}]}]}]}]}]},\n' +
    '{"linea":"159","statement":"asignation","variable":"tree","params":[{"linea":"159","statement":"Object","value":"root"}],"ValExpression":[{"linea":"159","operator":[{"linea":"159","v":"="}],"Expression":[{"linea":"159","statement":"callFuncion","padre":[{"linea":"159","statement":"variable","value":"insert"}],"argumentos":[{"linea":"159","statement":"callAtributo", "value":"tree", "hijo":[{"linea":"159","statement":"Object","value":"root"}]},\n' +
    '{"linea":"159","tipo":"number", "value":"19"}]}]}]},\n' +
    '{"linea":"160","statement":"asignation","variable":"tree","params":[{"linea":"160","statement":"Object","value":"root"}],"ValExpression":[{"linea":"160","operator":[{"linea":"160","v":"="}],"Expression":[{"linea":"160","statement":"callFuncion","padre":[{"linea":"160","statement":"variable","value":"insert"}],"argumentos":[{"linea":"160","statement":"callAtributo", "value":"tree", "hijo":[{"linea":"160","statement":"Object","value":"root"}]},\n' +
    '{"linea":"160","tipo":"number", "value":"29"}]}]}]},\n' +
    '{"linea":"161","statement":"asignation","variable":"tree","params":[{"linea":"161","statement":"Object","value":"root"}],"ValExpression":[{"linea":"161","operator":[{"linea":"161","v":"="}],"Expression":[{"linea":"161","statement":"callFuncion","padre":[{"linea":"161","statement":"variable","value":"insert"}],"argumentos":[{"linea":"161","statement":"callAtributo", "value":"tree", "hijo":[{"linea":"161","statement":"Object","value":"root"}]},\n' +
    '{"linea":"161","tipo":"number", "value":"99"}]}]}]},\n' +
    '{"linea":"162","statement":"asignation","variable":"tree","params":[{"linea":"162","statement":"Object","value":"root"}],"ValExpression":[{"linea":"162","operator":[{"linea":"162","v":"="}],"Expression":[{"linea":"162","statement":"callFuncion","padre":[{"linea":"162","statement":"variable","value":"insert"}],"argumentos":[{"linea":"162","statement":"callAtributo", "value":"tree", "hijo":[{"linea":"162","statement":"Object","value":"root"}]},\n' +
    '{"linea":"162","tipo":"number", "value":"9"}]}]}]},\n' +
    '{"linea":"163","statement":"asignation","variable":"tree","params":[{"linea":"163","statement":"Object","value":"root"}],"ValExpression":[{"linea":"163","operator":[{"linea":"163","v":"="}],"Expression":[{"linea":"163","statement":"callFuncion","padre":[{"linea":"163","statement":"variable","value":"insert"}],"argumentos":[{"linea":"163","statement":"callAtributo", "value":"tree", "hijo":[{"linea":"163","statement":"Object","value":"root"}]},\n' +
    '{"linea":"163","tipo":"number", "value":"2"}]}]}]},\n' +
    '{"linea":"164","statement":"asignation","variable":"tree","params":[{"linea":"164","statement":"Object","value":"root"}],"ValExpression":[{"linea":"164","operator":[{"linea":"164","v":"="}],"Expression":[{"linea":"164","statement":"callFuncion","padre":[{"linea":"164","statement":"variable","value":"insert"}],"argumentos":[{"linea":"164","statement":"callAtributo", "value":"tree", "hijo":[{"linea":"164","statement":"Object","value":"root"}]},\n' +
    '{"linea":"164","tipo":"number", "value":"32"}]}]}]},\n' +
    '{"linea":"165","statement":"asignation","variable":"tree","params":[{"linea":"165","statement":"Object","value":"root"}],"ValExpression":[{"linea":"165","operator":[{"linea":"165","v":"="}],"Expression":[{"linea":"165","statement":"callFuncion","padre":[{"linea":"165","statement":"variable","value":"insert"}],"argumentos":[{"linea":"165","statement":"callAtributo", "value":"tree", "hijo":[{"linea":"165","statement":"Object","value":"root"}]},\n' +
    '{"linea":"165","tipo":"number", "value":"4"}]}]}]},\n' +
    '{"linea":"166","statement":"asignation","variable":"tree","params":[{"linea":"166","statement":"Object","value":"root"}],"ValExpression":[{"linea":"166","operator":[{"linea":"166","v":"="}],"Expression":[{"linea":"166","statement":"callFuncion","padre":[{"linea":"166","statement":"variable","value":"insert"}],"argumentos":[{"linea":"166","statement":"callAtributo", "value":"tree", "hijo":[{"linea":"166","statement":"Object","value":"root"}]},\n' +
    '{"linea":"166","tipo":"number", "value":"0"}]}]}]},\n' +
    '{"linea":"167","statement":"asignation","variable":"tree","params":[{"linea":"167","statement":"Object","value":"root"}],"ValExpression":[{"linea":"167","operator":[{"linea":"167","v":"="}],"Expression":[{"linea":"167","statement":"callFuncion","padre":[{"linea":"167","statement":"variable","value":"insert"}],"argumentos":[{"linea":"167","statement":"callAtributo", "value":"tree", "hijo":[{"linea":"167","statement":"Object","value":"root"}]},\n' +
    '{"linea":"167","tipo":"number", "value":"1"}]}]}]},\n' +
    '{"linea":"168","statement":"CallFunction","name":"preOrder", "parameters":[{"linea":"168","statement":"callAtributo", "value":"tree", "hijo":[{"linea":"168","statement":"Object","value":"root"}]}]},\n' +
    '{"linea":"168","statement":""},\n' +
    '{"linea":"170","statement":""}]}'

let instrucciones: statement[] = [];
let tablasimbolo: tablasimbolos = new tablasimbolos();
let jsondata:string = '';
let erroresSemanticos:string[] = [];
let salida = '';
let lineas = 0;
let ts = '';
let ghs = '';


generatinginformationExample();
//console.log(instrucciones)
execute()
console.log('UNIVERSIDAD DE SAN CARLOS DE GUATEMALA')
//console.log(outs);
function outghs()
{
    console.log('UNIVERSIDAD DE SAN CARLOS DE GUATEMALA')
}
function outlogs()
{
    console.log('UNIVERSIDAD DE SAN CARLOS DE GUATEMALA')
}
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
    //console.log(ts);
}
function execute()
{
    tablasimbolo = new tablasimbolos();
    output = [];
    outs = [];
    ghs = '';
    salida = '{\"salida\":[\n';
    if(erroresSemanticos.length == 0)
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
                        //console.log(output);
                        for(let a of output)
                        {
                            outs.push(a);
                            salida += a + ',\n';
                        }
                        outs.push('Linea: '+value.linea+', valor: Ocurrio un error inesperado,'+result[1])
                        salida += '{\"valor\":\"Ocurrio un error inesperado\",\"salida\":\" Linea: '+value.linea+', '+result[1]+'\"},\n';
                        console.log('finish with error...')
                        break;
                    }
                }
            }
        }
        for(let val of erroresSemanticos)
        {
            salida += '{\"valor\":\"El codigo posee errores semanticos\", \"errores\":['+val+']}\n';
        }
    }
    else
    {
        for(let val of erroresSemanticos)
        {
            salida += '{\"valor\":\"El codigo posee errores semanticos\", \"errores\":['+val+']}\n';
        }
    }
    salida += '{\"linea\":\"'+lineas+'\",\"valor\":\"finish executing...\"}\n]}';
    console.log(salida);
}
function generatinginformationExample()
{
    erroresSemanticos = [];
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
    erroresSemanticos = [];
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
        let positionsTemp = [];
        for(let datas of data.value)
        {
            let k = getExpressiones(datas);
            if(k!=null) positions.push(k);
        }
        for(let a = positions.length-1;a>=0;a--)
        {
            positionsTemp.push(positions[a]);
        }
        return positionsTemp;
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
        else
        {
            Arreglito.values = [];
            Arreglito.niu = true;
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
        //console.log(data)
        let mat:expression = new expression()
        mat.position = [];
        mat.atributo = [];
        mat.name = data.name;
        mat.linea = data.linea;
        switch (data.native)
        {
            case "length":

                mat.ArrayType = NativeArray.Length;

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
                mat.ArrayType = NativeArray.Pop;
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

                mat.ArrayType = NativeArray.Push;
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
        //console.log(mat);
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
        console.log(data.valor)
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
