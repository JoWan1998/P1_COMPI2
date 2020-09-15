/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

///<reference path="Statements.ts"/>
///<reference path="Literal.ts"/>
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
                    let valors =  <arrays> this.Expresion;
                    let val =  valors.getValue(this.position,tablasimbolo);
                    if(val[0]>0)
                    {
                        return val[1];
                    }
                }
                else
                {
                    let valors =  <arrays> this.Expresion;
                    return valors.getAll();
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
                    case TypeValue.let:
                    case TypeValue.Number:
                        if(this.Expresion instanceof Numbers)
                        {
                            return this.Expresion.getValue();
                        }
                        break;
                    case TypeValue.Object:
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