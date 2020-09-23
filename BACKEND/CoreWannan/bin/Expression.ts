/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

///<reference path="Statements.ts"/>
///<reference path="Literal.ts"/>
///<reference path="FunctionStatements.ts"/>
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
                if(name!="")
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
            if(name!="")
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
                                    return val[1];
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
                            return resu[1];
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
            else if(this.atributo.length>0 && this.atributo.length>0)
            {

            }
            else if(this.atributo.length>0)
            {
                return this.getValueAtributo(tablasimbolo);
            }
            else if(this.position.length>0)
            {
                return this.getValuesArray(tablasimbolo);
            }
            else if(name!="")
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
                        return this.Expresion.execute(tablasimbolo);
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
        let data = this.getValue(tablasimbolo);
        if(data!=null)
        {
            if(data == '__jw__') return [1,null]
            return [1,data]
        }
        return [-1,null]
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
            if(izq[0]==1&&der[0]==1)
            {
                switch (this.Function)
                {
                    case ArichmeticExpr.suma:
                        this.value = izq[1] + der[1];
                        this.StateCode = 1;
                        break;
                    case ArichmeticExpr.resta:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof  Boolean)
                        {
                            this.value = izq[1] - der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.potenciacion:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof  Boolean)
                        {
                            this.value = izq[1] ^ der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.multiplicacion:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof  Boolean)
                        {
                            this.value = izq[1] * der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.modulo:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof  Boolean)
                        {
                            this.value = izq[1] % der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.negacion:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean )
                        {
                            this.value = -izq[1].toString();
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.division:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof  Boolean)
                        {
                            if(der[1]!=0)
                            {
                                this.value = izq[1] / der[1];
                                this.StateCode = 1;
                            }
                            else
                            {
                                this.value = izq[1] / der[1];
                                this.StateCode = -1;
                            }

                        }
                        break;
                }
            }
            return [this.StateCode,this.value];
        }
        catch (e) {

            return [this.StateCode,this.value];
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
            let izq = (this.Expression1!=null)?this.Expression1.execute(tablasimbolo):[-1,null];
            let der = (this.Expression2!=null)?this.Expression2.execute(tablasimbolo):[-1,null];
            if(izq[0]==1&&der[0]==1)
            {
                switch (this.Function)
                {
                    case LogicalExpr.Y:
                        if(izq[1] instanceof Boolean && der[1] instanceof Boolean)
                        {
                            this.value = izq[1] && der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case LogicalExpr.O:
                        if(izq[1] instanceof Boolean && der[1] instanceof Boolean)
                        {
                            this.value = izq[1] || der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case LogicalExpr.NOT:
                        if(izq[1] instanceof Boolean)
                        {
                            this.value = !izq[1];
                            this.StateCode = 1;
                        }
                        break;
                }
            }
            else if(izq[0]==1)
            {
                switch (this.Function)
                {
                    case LogicalExpr.NOT:
                        if(izq[1] instanceof Boolean)
                        {
                            this.value = !izq[1];
                            this.StateCode = 1;
                        }
                        break;
                }
            }
            return [this.StateCode,this.value];
        }
        catch (e) {

            return [this.StateCode,this.value];
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
            return [this.StateCode,this.value];
        }
        catch (e) {

            return [this.StateCode,this.value];
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

class autoincrements extends statement
{
    StateCode: number;
    type: TypeStatement;
    linea:number;
    name:string;
    atributo:string[];
    position:statement[];
    Expression:statement;
    Assigment:increments;
    isArr:boolean;
    value:any;


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
                        let simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0)
                        {
                            let simbolito:sym = simbolo[1];
                            if(simbolito.getValue() instanceof arrays)
                            {
                                let arrs:arrays = simbolito.getValue();
                                let result = this.operateArrAtr(arrs,tablasimbolo,this.position,this.atributo,value[1]);
                                if(result[0]>0)
                                {
                                    let m =  tablasimbolo.update(this.name,result[1]);
                                    if(m[0]>0) return [1,this.value]
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
                                let result = this.operateAtrArr(arrs,tablasimbolo,this.atributo,this.position,value[1]);
                                if(result[0]>0)
                                {
                                    let m =  tablasimbolo.update(this.name,result[1]);
                                    if(m[0]>0) return [1,this.value]
                                }
                            }
                        }
                    }
                }
            }
            else if(this.atributo.length>0)
            {
                let value = this.Expression.execute(tablasimbolo);
                if(value[0]==1)
                {
                    let value = this.Expression.execute(tablasimbolo);
                    if(value[0]==1)
                    {
                        let simbolo = tablasimbolo.getsym(this.name);
                        if(simbolo[0]>0)
                        {
                            let simbolito:sym = simbolo[1];
                            if(simbolito.getValue() instanceof types)
                            {
                                let atr:types = simbolito.getValue();
                                let val = this.operateAtr(atr,tablasimbolo,this.atributo,value[1]);
                                if(val[0]>0)
                                {
                                    let m =  tablasimbolo.update(this.name,atr);
                                    if(m[0]>0) return [1,this.value]
                                }
                            }
                        }
                    }
                }
            }
            else if(this.position.length>0)
            {
                let value = this.Expression.execute(tablasimbolo);
                if(value[0]==1)
                {
                    let value = this.Expression.execute(tablasimbolo);
                    if(value[0]==1)
                    {
                        let simbolo = tablasimbolo.getsym(this.name);
                        if (simbolo[0] > 0)
                        {
                            let simbolito:sym = simbolo[1];
                            if(simbolito.getValue() instanceof arrays)
                            {
                                let arrs:arrays = simbolito.getValue();
                                let m =  arrs.setValue(tablasimbolo,this.position,value[1]);
                                if(m[0]>0) return [1,this.value]
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
                            let oldvalue5 = tablasimbolo.get(this.name);
                            if(oldvalue5 != null)
                            {
                                let numero:Numbers = new Numbers();
                                numero.value = 1;
                                numero.tipoValue = TypeValue.Number;
                                let newvalue5 = new ArichmeticExpression();
                                newvalue5.Expression1 = oldvalue5;
                                newvalue5.Expression2 = numero;
                                newvalue5.Function = ArichmeticExpr.suma;
                                newvalue5.linea = this.linea
                                let val5 = newvalue5.execute(tablasimbolo);
                                if(val5[0]!=-1)
                                {
                                    let result5 = tablasimbolo.update(this.name,val5[1]);
                                    if(result5[0]>0) return[1,oldvalue5];
                                    return [-1,null];
                                }
                                else
                                {
                                    return [-1,null];
                                }
                            }
                            else
                            {
                                return [-2,null];
                            }
                        case increments.preincreement:
                            let oldvalue4 = tablasimbolo.get(this.name);
                            if(oldvalue4 != null)
                            {
                                let numero:Numbers = new Numbers();
                                numero.value = 1;
                                numero.tipoValue = TypeValue.Number;
                                let newvalue4 = new ArichmeticExpression();
                                newvalue4.Expression1 = oldvalue4;
                                newvalue4.Expression2 = numero;
                                newvalue4.Function = ArichmeticExpr.suma;
                                newvalue4.linea = this.linea
                                let val4 = newvalue4.execute(tablasimbolo);
                                if(val4[0]!=-1)
                                {
                                    let result5 = tablasimbolo.update(this.name,val4[1]);
                                    if(result5[0]>0) return[1,val4[1]];
                                    return [-1,null];
                                }
                                else
                                {
                                    return [-1,null];
                                }
                            }
                            else
                            {
                                return [-2,null];
                            }
                        case increments.postdecrement:
                            let oldvalue3 = tablasimbolo.get(this.name);
                            if(oldvalue3 != null)
                            {
                                let numero2:Numbers = new Numbers();
                                numero2.value = 1;
                                numero2.tipoValue = TypeValue.Number;
                                let newvalue3 = new ArichmeticExpression();
                                newvalue3.Expression1 = oldvalue3;
                                newvalue3.Expression2 = numero2;
                                newvalue3.Function = ArichmeticExpr.resta;
                                newvalue3.linea = this.linea
                                let val3 = newvalue3.execute(tablasimbolo);
                                if(val3[0]!=-1)
                                {
                                    let result5 = tablasimbolo.update(this.name,val3[1]);
                                    if(result5[0]>0) return[1,oldvalue3];
                                    return [-1,null];
                                }
                                else
                                {
                                    return [-1,null];
                                }
                            }
                            else
                            {
                                return [-2,null];
                            }
                        case increments.predecrement:
                            let oldvalue2 = tablasimbolo.get(this.name);
                            if(oldvalue2 != null)
                            {
                                let numero:Numbers = new Numbers();
                                numero.value = 1;
                                numero.tipoValue = TypeValue.Number;
                                let newvalue4 = new ArichmeticExpression();
                                newvalue4.Expression1 = oldvalue2;
                                newvalue4.Expression2 = numero;
                                newvalue4.Function = ArichmeticExpr.resta;
                                newvalue4.linea = this.linea
                                let val4 = newvalue4.execute(tablasimbolo);
                                if(val4[0]!=-1)
                                {
                                    let result5 = tablasimbolo.update(this.name,val4[1]);
                                    if(result5[0]>0) return[1,val4[1]];
                                    return [-1,null];
                                }
                                else
                                {
                                    return [-1,null];
                                }
                            }
                            else
                            {
                                return [-2,null];
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
