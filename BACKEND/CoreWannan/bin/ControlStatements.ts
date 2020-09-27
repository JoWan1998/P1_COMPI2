///<reference path="Statements.ts"/>
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA

class IfStatement extends statement
{
    StateCode: number;
    type: TypeStatement;
    value:any;
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
*/
