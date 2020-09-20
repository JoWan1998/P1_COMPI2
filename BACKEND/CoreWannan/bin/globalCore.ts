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

class tablasimbolos
{
    simbolos:any[];
    ambitoLevel:number;



    constructor(tabla?:any)
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
                this.simbolos.push(tabla.simbolos);
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
            return [-1,null];
        }
    }


    update(name:string,new_value:any,atributo?:string,posicion?:any):any
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
            return [-1,null];
        }
        catch (e)
        {
            return [-1,null];
        }

    }
    //metodo el cual a diferencia de otros al no tener una ejecucion correcta devuelve null
    get(name:string,atributo?:string,posicion?:any): any
    {
        try
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
            return [-1,null];
        }
        catch (e) {
            return [-1,null];
        }

    }
    getsym(name:string)
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
        return [-1,null]
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
            return [-1,null];
        }
        catch (e) {
            return [-1,null];
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
            return [-1,null];
        }
        catch (e) {
            return [-1,null];
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
                    if (simbolo.name == name)
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

            return [-2,null];

        }
        catch (e) {
            return [-1,null];
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
            return [-1,null]
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

    execute(tablasimbolo: tablasimbolos): any {
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
                        return [-2,null];
                    case -1: //-> error
                        return[-1,null];
                    case 0: //-> finalizado
                        state = 0;
                        this.value = value[1];
                        break;
                    case 1: //-> sin errores
                        state = 1;
                        this.value = value[1];
                        break;
                    case 2: //-> sin errores, break
                        return [2,null];
                    case 3: //-> sin errores, continue
                        return [3,null];
                    case 4: //-> sin errores, return
                        return [4,value[1]];
                    case 5:
                        state = 5;
                }
            }
        }
        if(state == 5) return this.default.execute(tablasimbolo);
        return [state,this.value]
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

    execute(tablasimbolo: tablasimbolos): any {
        let valInitial1:RelationalExpression = new RelationalExpression();
        valInitial1.type = TypeStatement.ExpresionStatement;
        valInitial1.Function = RelationalExpr.Igual;
        valInitial1.Expression1 = this.val;
        valInitial1.Expression2 = this.ValueExpression;

        let valInitial = valInitial1.execute(tablasimbolo);

        if(valInitial[0]<0) return [-1,null];
        if(valInitial[1])
        {
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
                        this.value = value[1];
                        break;
                    case 1: //-> sin errores
                        this.StateCode = 1;
                        this.value = value[1];
                        break;
                    case 2: //-> sin errores, break
                        return [2,null];
                    case 3: //-> sin errores, continue
                        return [3,null];
                    case 4: //-> sin errores, return
                        return [4,value[1]];
                }
            }
        }
        if(this.StateCode ==1 || this.StateCode == 0) return [1,this.value]
        return [5,null]
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

    execute(tablasimbolo: tablasimbolos): any {
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
                    this.value = value[1];
                    break;
                case 1: //-> sin errores
                    this.StateCode = 1;
                    this.value = value[1];
                    break;
                case 2: //-> sin errores, break
                    return [2,null];
                case 3: //-> sin errores, continue
                    return [3,null];
                case 4: //-> sin errores, return
                    return [4,value[1]];
            }
        }
        return [this.StateCode,this.value];
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
                            let atrs = arrs.getValue(this.position,tablasimbolo);
                            if(atrs instanceof types)
                            {
                                let valesito = atrs.getValuesAtributo(this.atributo,tablasimbolo)[1]
                                let numero:Numbers = new Numbers();
                                numero.value = Number(valesito);
                                numero.tipoValue = TypeValue.Number;
                                let result = this.operateArrAtr(arrs,tablasimbolo,this.position,this.atributo,numero);
                                if(result[0]>0)
                                {
                                    let m =  tablasimbolo.update(this.name.name,result[1]);
                                    if(m[0]>0) return [1,this.value]
                                }
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
                            let arrt = arrs.getValuesAtributo(this.atributo,tablasimbolo);
                            if(arrt instanceof arrays)
                            {
                                let valesito = arrt.getValue(this.position,tablasimbolo)[1]
                                let numero:Numbers = new Numbers();
                                numero.value = Number(valesito);
                                numero.tipoValue = TypeValue.Number;
                                let result = this.operateAtrArr(arrs,tablasimbolo,this.atributo,this.position,numero);
                                if(result[0]>0)
                                {
                                    let m =  tablasimbolo.update(this.name.name,result[1]);
                                    if(m[0]>0) return [1,this.value]
                                }
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
                        let valesito = atr.getValuesAtributo(this.atributo,tablasimbolo)[1];
                        let numero:Numbers = new Numbers();
                        numero.value = Number(valesito);
                        numero.tipoValue = TypeValue.Number;
                        let val = this.operateAtr(atr, tablasimbolo, this.atributo, numero);
                        if (val[0] > 0) {
                            let m = tablasimbolo.update(this.name.name, atr);
                            if (m[0] > 0) return [1, this.value]
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
                        let valesito = arrs.getValue(this.position,tablasimbolo)[1]
                        let numero:Numbers = new Numbers();
                        numero.value = Number(valesito);
                        numero.tipoValue = TypeValue.Number;
                        let m =  arrs.setValue(tablasimbolo,this.position,numero);
                        if(m[0]>0) return [1,this.value]
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
    name:expression;
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
                let value = this.Expression.execute(tablasimbolo);
                if(value[0]==1)
                {
                    if(this.isArr)
                    {
                        //array with type in object
                        let simbolo = tablasimbolo.getsym(this.name.name);
                        if (simbolo[0] > 0)
                        {
                            let simbolito:sym = simbolo[1];
                            if(simbolito.getValue() instanceof arrays)
                            {
                                let arrs:arrays = simbolito.getValue();
                                let result = this.operateArrAtr(arrs,tablasimbolo,this.position,this.atributo,value[1]);
                                if(result[0]>0)
                                {
                                    return tablasimbolo.update(this.name.name,result[1]);
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
                                let result = this.operateAtrArr(arrs,tablasimbolo,this.atributo,this.position,value[1]);
                                if(result[0]>0)
                                {
                                    return tablasimbolo.update(this.name.name,result[1]);
                                }
                            }
                        }
                    }
                }
            }
            else if(this.atributo.length>0)
            {
                let value = this.Expression.execute(tablasimbolo);
                if(value[0]>0)
                {
                    let simbolo = tablasimbolo.getsym(this.name.name);
                    if(simbolo[0]>0)
                    {
                        let simbolito:sym = simbolo[1];
                        if(simbolito.getValue() instanceof types)
                        {
                            let atr:types = simbolito.getValue();
                            let val = this.operateAtr(atr,tablasimbolo,this.atributo,value[1]);
                            if(val[0]>0)
                            {
                                return tablasimbolo.update(this.name.name,atr);
                            }
                        }
                    }
                }

            }
            else if(this.position.length>0)
            {
                let value = this.Expression.execute(tablasimbolo);
                if(value[0]>0)
                {
                    let simbolo = tablasimbolo.getsym(this.name.name);
                    if (simbolo[0] > 0)
                    {
                        let simbolito:sym = simbolo[1];
                        if(simbolito.getValue() instanceof arrays)
                        {
                            let arrs:arrays = simbolito.getValue();
                            return arrs.setValue(tablasimbolo,this.position,value[1]);
                        }
                    }
                }

            }
            else
            {
                let value = this.Expression.execute(tablasimbolo);
                if(value[0]==1)
                {
                    switch (this.Assigment)
                    {
                        case typeAssigment.division:

                            let newvalue5 = new ArichmeticExpression();
                            newvalue5.Expression1 = this.name;
                            newvalue5.Expression2 = value[1];
                            newvalue5.Function = ArichmeticExpr.division;
                            newvalue5.linea = this.linea
                            let val5 = newvalue5.execute(tablasimbolo);
                            if(val5[0]!=-1)
                            {
                                let result5 = tablasimbolo.update(this.name.name,val5[1]);
                                if(result5==1)return[1,null];
                                return [-1,null];
                            }
                            else
                            {
                                return [-1,null];
                            }
                        case typeAssigment.igual:
                            let val0 = this.Expression.execute(tablasimbolo);
                            if(val0[0]!=-1)
                            {
                                let result0 = tablasimbolo.update(this.name.name,val0[1]);
                                if(result0==1)return[1,null];
                                return [-1,null];
                            }
                            else
                            {
                                return [-1,null];
                            }
                        case typeAssigment.modulo:
                            let newvalue4 = new ArichmeticExpression();
                            newvalue4.Expression1 = this.name;
                            newvalue4.Expression2 = value[1];
                            newvalue4.Function = ArichmeticExpr.modulo;
                            newvalue4.linea = this.linea
                            let val4 = newvalue4.execute(tablasimbolo);
                            if(val4[0]!=-1)
                            {
                                let result4 = tablasimbolo.update(this.name.name,val4[1]);
                                if(result4==1)return[1,null];
                                return [-1,null];
                            }
                            else
                            {
                                return [-1,null];
                            }
                        case typeAssigment.multiplicacion:
                            let newvalue3 = new ArichmeticExpression();
                            newvalue3.Expression1 = this.name;
                            newvalue3.Expression2 = value[1];
                            newvalue3.Function = ArichmeticExpr.multiplicacion;
                            newvalue3.linea = this.linea
                            let val3 = newvalue3.execute(tablasimbolo);
                            if(val3[0]!=-1)
                            {
                                let result3 = tablasimbolo.update(this.name.name,val3[1]);
                                if(result3==1)return[1,null];
                                return [-1,null];
                            }
                            else
                            {
                                return [-1,null];
                            }
                        case typeAssigment.potencia:
                            let newvalue2 = new ArichmeticExpression();
                            newvalue2.Expression1 = this.name;
                            newvalue2.Expression2 = value[1];
                            newvalue2.Function = ArichmeticExpr.potenciacion;
                            newvalue2.linea = this.linea
                            let val2 = newvalue2.execute(tablasimbolo);
                            if(val2[0]!=-1)
                            {
                                let result2 = tablasimbolo.update(this.name.name,val2[1]);
                                if(result2==1)return[1,null];
                                return [-1,null];
                            }
                            else
                            {
                                return [-1,null];
                            }
                        case typeAssigment.resta:
                            let newvalue1 = new ArichmeticExpression();
                            newvalue1.Expression1 = this.name;
                            newvalue1.Expression2 = value[1];
                            newvalue1.Function = ArichmeticExpr.resta;
                            newvalue1.linea = this.linea
                            let val1 = newvalue1.execute(tablasimbolo);
                            if(val1[0]!=-1)
                            {
                                let result1 = tablasimbolo.update(this.name.name,val1[1]);
                                if(result1==1)return[1,null];
                                return [-1,null];
                            }
                            else
                            {
                                return [-1,null];
                            }
                        case typeAssigment.suma:
                            let newvalue = new ArichmeticExpression();
                            newvalue.Expression1 = this.name;
                            newvalue.Expression2 = value[1];
                            newvalue.Function = ArichmeticExpr.suma;
                            newvalue.linea = this.linea
                            let val = newvalue.execute(tablasimbolo);
                            if(val[0]!=-1)
                            {
                                let result = tablasimbolo.update(this.name.name,val[1]);
                                if(result==1)return[1,null];
                                return [-1,null];
                            }
                            else
                            {
                                return [-1,null];
                            }
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
                let atratr  = objeto.setValueAtributo(atr,value);
                if(atratr[0]>0)
                {
                    return [1,objeto];
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
class IfStatement extends statement
{
    StateCode: number;
    type: TypeStatement;
    value:any;
    linea:number;
    ValueExpression: statement;
    body:statement[];
    bodyElse:statement[];

    constructor(Val: statement, cuerpo: statement[], cuerpo2?:statement[]) {
        super();
        this.body =cuerpo;
        this.ValueExpression = Val;
        this.bodyElse = cuerpo2;
    }

    execute(tablasimbolo): any {
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
                        return [-2,null];
                    case -1: //-> error
                        return[-1,null];
                    case 0: //-> finalizado
                        this.StateCode = 0;
                        this.value = value[1];
                        break;
                    case 1: //-> sin errores
                        this.StateCode = 1;
                        this.value = value[1];
                        break;
                    case 2: //-> sin errores, break
                        return [2,null];
                    case 3: //-> sin errores, continue
                        return [3,null];
                    case 4: //-> sin errores, return
                        return [4,value[1]];
                }
            }
        }
        else
        {
            if(this.bodyElse != undefined)
            {
                for(let statement0 of this.bodyElse)
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
                            this.value = value[1];
                            break;
                        case 1: //-> sin errores
                            this.StateCode = 1;
                            this.value = value[1];
                            break;
                        case 2: //-> sin errores, break
                            return [2,null];
                        case 3: //-> sin errores, continue
                            return [3,null];
                        case 4: //-> sin errores, return
                            return [4,value[1]];
                    }
                }
            }
        }
        return [this.StateCode,this.value];
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

    constructor(Val: statement, cuerpo1: statement, cuerpo2: statement) {
        super();
        this.Expression1 = cuerpo1;
        this.Expression2 = cuerpo2;
        this.ValueExpression = Val;
    }

    execute(tablasimbolo): any {
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
    parameters:statement[];

    constructor()
    {
        super();
        this.atributo = [];
        this.position = [];
        this.name = "";
        this.ArrayType = null;
        this.isCallFunction = false;
        this.parameters = [];
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
                                    let result = val[1].execute(tablasimbolo);
                                    if(result[0]>0) return result[1];
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
                                        let val1 =  valors.getValue(this.position,tablasimbolo);
                                        if(val1[0]>0)
                                        {
                                            if(val1[1] instanceof arrays)
                                            {
                                                let retorno = <arrays> val1[1];
                                                let retorno1 = retorno.pop();
                                                if(retorno1[0]>0)
                                                {
                                                    return retorno1[1];
                                                }
                                            }
                                        }
                                    }
                                    else
                                    {
                                        let retorno =  valors.pop();
                                        if(retorno[0]>0)
                                        {
                                            return retorno[1];
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
                                            let val1 =  valors.getValue(this.position,tablasimbolo);
                                            if(val1[0]>0)
                                            {
                                                if(val1[1] instanceof arrays)
                                                {
                                                    let retorno = <arrays> val1[1];
                                                    let bb =  retorno.push(value[1]);
                                                    if(bb[0]>0)
                                                    {
                                                        return retorno.length();
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            let bb =  valors.push(value[1]);
                                            if(bb[0]>0)
                                            {
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

            return [-1,null];
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

            return [-1,null];
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
            return [-1,null];
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
///<reference path="Statements.ts"/>
///<reference path="Expression.ts"/>
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
    }

    execute(tablasimbolo: tablasimbolos): any
    {
        return tablasimbolo.insert(this.name,this,TypeSym.Funcion,this.tipo);
    }

    executeV(tablasimbolo1: tablasimbolos,parameters:statement[]): any
    {
        try
        {
            let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbolo1);
            if(this.Parameters.length == parameters.length)
            {
                for(var a = 0;a<this.Parameters.length;a++)
                {
                    let namev = this.Parameters[a].name;
                    if(parameters[a] instanceof  expression)
                    {
                        let value = <expression>parameters[a];
                        switch (this.Parameters[a].tipo)
                        {
                            case TypeValue.String:
                                let valueS = value.execute(tablasimbolo);
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
                                let valueN = value.execute(tablasimbolo);
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
                                let valueB = value.execute(tablasimbolo);
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
                            case TypeValue.var:
                                let valueV = tablasimbolo.getsym(value.name);
                                if(valueV[0]>1) {
                                    let simbolo =<sym> valueV[1];
                                    tablasimbolo.insert(namev,simbolo.value,simbolo.tipo,simbolo.tipoValue);
                                }
                                else
                                {
                                    return [-1,null]
                                }
                                break;
                            case TypeValue.type:
                                let valueT = value.execute(tablasimbolo);
                                if(valueT[0]>0) {

                                    if (valueT[1] instanceof types) {
                                        tablasimbolo.insert(namev, valueT[1], TypeSym.Variable, TypeValue.type);
                                    } else {
                                        return [-1, null]
                                    }
                                }
                                else
                                {
                                    return [-1,null]
                                }
                                break;
                            case TypeValue.Array:
                                let valueA = value.execute(tablasimbolo);
                                if(valueA[0]>0) {

                                    if (valueA[1] instanceof arrays) {
                                        tablasimbolo.insert(namev, valueA[1], TypeSym.Variable, TypeValue.Array);
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
                    }
                    else
                    {
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
                    }
                }
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
                            if(value[1] == null)
                            {
                                if(this.tipo == TypeValue.void) return[4,null];
                                return [-1,null];
                            }
                            else if(value[1] instanceof Boolean)
                            {
                                if(this.tipo == TypeValue.Boolean) return [4,value[1]]
                                return [-1,null]
                            }
                            else if(value[1] instanceof Number)
                            {
                                if(this.tipo == TypeValue.Number) return [4,value[1]]
                                return [-1,null]
                            }
                            else if(value[1] instanceof String)
                            {
                                if(this.tipo == TypeValue.String) return [4,value[1]]
                                return [-1,null]
                            }
                            else if(value[1] instanceof arrays)
                            {
                                if(this.tipo == TypeValue.Array) return [4,value[1]]
                                return [-1,null]
                            }
                            else
                            {
                                if(this.tipo == TypeValue.void) return [-1,null];
                                return [1,value[1]];
                            }
                    }
                }
                return [1,null]
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
///<reference path="Statements.ts"/>
///<reference path="Expression.ts"/>
///<reference path="Literal.ts"/>
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

    constructor(Value:statement,cuerpo:statement[]) {
        super();
        this.ValueExpression = Value;
        this.body = cuerpo;
    }

    execute(tablasimbolo): any {
        try
        {
            let state = true;
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
                            return [4,value[1]];
                    }
                    if(internalState==3 || internalState == 2) break;
                }
                if(internalState==3) continue;
                if(internalState==2) break;
            }
            return [1,null]
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

class DoWhileStatements extends statement
{
    StateCode: number;
    type: TypeStatement;
    ValueExpression: statement;
    body: statement[];
    value: any;
    linea:number;

    constructor(Value:statement,cuerpo:statement[]) {
        super();
        this.ValueExpression = Value;
        this.body = cuerpo;
    }

    execute(tablasimblolo): any {
        try
        {
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
            return [1,null]
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

    execute(tablasimbolo): any[2]
    {
        try
        {
            let initial = this.valueInitial.execute(tablasimbolo);
            if(initial[0]>0)
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

    execute(tablasimbolo): any[2]
    {
        try
        {
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

    execute(tablasimbolo): any[2]
    {
        try
        {
            let internalState = 0;
            tablasimbolo.insert(this.identificador,null,TypeSym.Variable, TypeValue.Number);
            if(this.Expression.type == TypeStatement.ExpresionStatement)
            {
                let vals = <expression> this.Expression;
                switch (vals.valueType)
                {
                    case TypeValue.Array:
                        let valores:any[] = vals.getValuesArray(tablasimbolo);
                        for(let post in valores)
                        {

                            tablasimbolo.update(this.identificador,post);
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
                                        return [4,value[1]];
                                }
                                if(internalState==3 || internalState == 2) break;

                            }
                            if(internalState==3) continue;
                            if(internalState==2) break;
                        }
                        break;
                    case TypeValue.Object:
                        if(vals.atributo==null && vals.position == null)
                        {
                            let temp:sym = tablasimbolo.get(vals.name.toString())
                            switch (temp.tipoValue)
                            {
                                case TypeValue.Array:
                                    let valores:any[] = temp.getValue().getAll();
                                    for(let post in valores)
                                    {
                                        tablasimbolo.update(this.identificador,post);
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
                                                    return [4,value[1]];
                                            }
                                            if(internalState==3 || internalState == 2) break;

                                        }
                                        if(internalState==3) continue;
                                        if(internalState==2) break;
                                    }
                                    break;
                            }
                        }
                        break;
                    case TypeValue.type:
                        let vsl = vals.getValueAtributo(tablasimbolo);
                        for (let post in vsl) {
                            tablasimbolo.update(this.identificador, post);
                            for (let statement1 of this.body) {
                                let value = statement1.execute(tablasimbolo);
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
                                if (internalState == 3 || internalState == 2) break;
                            }
                            break;
                        }
                }
                return [1,null];
            }
            return [1,null];
        }catch (e)
        {
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

    execute(tablasimbol): any[2]
    {
        let tablasimbolo:tablasimbolos = new tablasimbolos(tablasimbol);
        try
        {
            let internalState = 0;
            tablasimbolo.insert(this.identificador,null,TypeSym.Variable, TypeValue.Object);
            if(this.Expression.type == TypeStatement.ExpresionStatement)
            {
                let vals = <expression> this.Expression;
                switch (vals.valueType)
                {
                    case TypeValue.Array:
                        let valores:any[] = vals.getValuesArray(tablasimbolo);
                        for(let post of valores)
                        {
                            tablasimbolo.update(this.identificador,post);
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
                                        return [4,value[1]];
                                }
                                if(internalState==3 || internalState == 2) break;

                            }
                            if(internalState==3) continue;
                            if(internalState==2) break;
                        }
                        break;
                    case TypeValue.String:
                        let valores1 = vals.getValue(tablasimbolo).toString();
                        for(let va of valores1)
                        {
                            tablasimbolo.update(this.identificador,va);
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
                                        return [4,value[1]];
                                }
                                if(internalState==3 || internalState == 2) break;

                            }
                            if(internalState==3) continue;
                            if(internalState==2) break;
                        }
                        break;
                    case TypeValue.Object:
                        if(vals.atributo==null && vals.position == null)
                        {
                            let temp:sym = tablasimbolo.get(vals.name.toString())
                            switch (temp.tipoValue)
                            {
                                case TypeValue.String:
                                    let valores1 = temp.value;
                                    for(let va of valores1)
                                    {
                                        tablasimbolo.update(this.identificador,va);
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
                                                    return [4,value[1]];
                                            }
                                            if(internalState==3 || internalState == 2) break;

                                        }
                                        if(internalState==3) continue;
                                        if(internalState==2) break;
                                    }
                                    break;
                                case TypeValue.Array:
                                    let valores:any[] = temp.getValue().getAll();
                                    for(let post of valores)
                                    {
                                        tablasimbolo.update(this.identificador,post);
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
                                                    return [4,value[1]];
                                            }
                                            if(internalState==3 || internalState == 2) break;

                                        }
                                        if(internalState==3) continue;
                                        if(internalState==2) break;
                                    }
                                    break;
                            }
                        }
                        break;
                    case TypeValue.type:
                        let vsl = vals.getValueAtributo(tablasimbolo);
                        for (let post of vsl) {
                            tablasimbolo.update(this.identificador, post);
                            for (let statement1 of this.body) {
                                let value = statement1.execute(tablasimbolo);
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
                                if (internalState == 3 || internalState == 2) break;
                            }
                            break;
                        }
                }
                return [1,null];
            }
            return [1,null];
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
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
///<reference path="Statements.ts"/>
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
///<reference path="Statements.ts"/>
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
                        resultado += value[1].toString();
                    }
                }
                return [1,'{\"linea\":\"'+this.linea+'\", \"valor\":\"'+resultado+'\"}']
            }
            else
            {
                return [1,this.graph];
            }
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
///<reference path="Statements.ts"/>
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
    identificador:string;
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
    tipo:TypeValue;
}
///<reference path="Statements.ts"/>
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
                        console.log(declaracion);
                        let declaration = <declaration0> declaracion;
                        declaration.tipoSim = TypeSym.let;
                        let value = declaration.execute(tablasimbolo);
                        switch (value[0])
                        {
                            case -2: //-> error instanciar variable
                                return [-2,null];
                            case -1: //-> error
                                return[-1,null];
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                this.value = value[1];
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                this.value = value[1];
                                break;
                            default:
                                return [-1,null];
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
                                return [-2,null];
                            case -1: //-> error
                                return[-1,null];
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                this.value = value[1];
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                this.value = value[1];
                                break;
                            default:
                                return [-1,null];
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
                                return [-2,null];
                            case -1: //-> error
                                return[-1,null];
                            case 0: //-> finalizado
                                this.StateCode = 0;
                                this.value = value[1];
                                break;
                            case 1: //-> sin errores
                                this.StateCode = 1;
                                this.value = value[1];
                                break;
                            default:
                                return [-1,null];
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
                                    return [-2,null];
                                case -1: //-> error
                                    return[-1,null];
                                case 0: //-> finalizado
                                    this.StateCode = 0;
                                    this.value = value[1];
                                    break;
                                case 1: //-> sin errores
                                    this.StateCode = 1;
                                    this.value = value[1];
                                    break;
                                default:
                                    return [-1,null];
                            }
                    }
                }
            }

            return [1,null];
        }
        catch(e)
        {
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
class declaration0 extends statement
{
    StateCode: number;
    type: TypeStatement;
    linea:number;
    tipoSim:TypeSym;
    tipo:TypeValue;
    name:string;
    Expression:statement;

    execute(tablasimbolo: tablasimbolos): any
    {
        try
        {
            let valor = this.Expression.execute(tablasimbolo);
            if(valor[0]>0)
            {
                return tablasimbolo.insert(this.name,valor[1],this.tipoSim, this.tipo);

            }
            return [-1,null];
        }
        catch(e)
        {
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

let jsondata2 = '{"linea":"2","S":[{"linea":"1","statement":"declaration","type":[{"linea":"1","tipo":[{"linea":"1","tipo":"let"}],"size":[]}], "values":[{"linea":"1","statement":"variable","tipoExpresion":[],"name":"a","ValExpression":[{"linea":"1","operator":[{"linea":"1","v":"="}],"Expression":[{"linea":"1","statement":"arreglo","value":[{"linea":"1","tipo":"number", "value":"5"},\n' +
    '{"linea":"1","tipo":"number", "value":"6"},\n' +
    '{"linea":"1","tipo":"number", "value":"7"},\n' +
    '{"linea":"1","statement":"arreglo","value":[{"linea":"1","tipo":"number", "value":"5"},\n' +
    '{"linea":"1","tipo":"number", "value":"6"},\n' +
    '{"linea":"1","statement":"arreglo","value":[{"linea":"1","tipo":"number", "value":"8"},\n' +
    '{"linea":"1","tipo":"number", "value":"9"},\n' +
    '{"linea":"1","statement":"arreglo","value":[{"linea":"1","tipo":"number", "value":"8"},\n' +
    '{"linea":"1","statement":"arreglo","value":[{"linea":"1","tipo":"number", "value":"8"},\n' +
    '{"linea":"1","statement":"arreglo","value":[{"linea":"1","tipo":"number", "value":"8"}]}]}]}]}]},\n' +
    '{"linea":"1","tipo":"number", "value":"9"}]}]}]}]},\n' +
    '{"linea":"2","statement":"console","expression":[{"linea":"2","statement":"callMatriz", "padre":[{"linea":"2","statement":"callMatriz", "name":"a" ,"padre":[],"posicion":[{"linea":"2","tipo":"number", "value":"3"}]}],"posicion":[{"linea":"2","tipo":"number", "value":"1"}]},\n' +
    '{"linea":"2","tipo":"string3", "value":" - "},\n' +
    '{"linea":"2","statement":"callMatriz", "padre":[{"linea":"2","statement":"callMatriz", "padre":[{"linea":"2","statement":"callMatriz", "padre":[{"linea":"2","statement":"callMatriz", "padre":[{"linea":"2","statement":"callMatriz", "name":"a" ,"padre":[],"posicion":[{"linea":"2","tipo":"number", "value":"3"}]}],"posicion":[{"linea":"2","tipo":"number", "value":"2"}]}],"posicion":[{"linea":"2","tipo":"number", "value":"2"}]}],"posicion":[{"linea":"2","tipo":"number", "value":"1"}]}],"posicion":[{"linea":"2","tipo":"number", "value":"0"}]}]},\n' +
    '{"linea":"2","statement":""}]}'

let instrucciones: statement[] = [];
let tablasimbolo: tablasimbolos = new tablasimbolos();
let jsondata:string = '';
let erroresSemanticos:string = '';
let salida = '';
let lineas = 0;
generatinginformationExample();
execute()
function execute()
{
    tablasimbolo = new tablasimbolos();
    salida = '{\"salida\":[\n';
    if(erroresSemanticos=='')
    {
        for(let value of instrucciones)
        {
            if(value instanceof statement)
            {
                let result = value.execute(tablasimbolo);
                if(result[0]>0)
                {
                    if(value.type == TypeStatement.NativeStatement)
                    {
                        salida += result[1]+',\n';
                    }
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
function getStatement(data):statement
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
            let variable = getVariable(data);
            if(variable!=null) instrucciones.push(variable);
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
            break;
        case "arreglo":
            return getArreglo(data);
        case "callMatriz":
            return callMatriz(data);
        case "callAtributo":
        case "callFuncion":
            break;
        case "nativeArray":
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
function getDeclarations(data):statement[]
{
    try
    {
        //console.log(data)
        let declaras = [];
        let error = 0;
        for(let decla of data)
        {
            let declarationes:declaration0 = new declaration0();
            let resultado = getTipo(decla.tipoExpresion);
            declarationes.tipo = resultado[0];
            declarationes.linea = Number(decla.linea)
            declarationes.type = null
            declarationes.name = decla.name
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
function declarationStatement(data):statement
{
    try
    {
        let declaration:declarations = new declarations();
        declaration.linea = Number(data.linea);
        declaration.type = TypeStatement.DeclarationStatement;
        declaration.Expression = getDeclarations(data.values)
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
function getExpressiones(data):statement
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
                case "typebody":
                    break;
                case "arreglo":
                    return getArreglo(data);
                case "callMatriz":
                    return callMatriz(data);
                case "callAtributo":
                case "callFuncion":
                case "nativeArray":
                case "default":
                case "if":
                case "dowhile":
                case "for":
                case "forin":
                case "while":
                case "forof":
                case "parameter":
                    break;
                case "array":
                case "atributo":
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
        return autoin;
    }
    catch (e)
    {
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
