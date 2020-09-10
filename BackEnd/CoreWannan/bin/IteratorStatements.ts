///<reference path="Statements.ts"/>
///<reference path="Expression.ts"/>
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

    constructor(Value:statement,cuerpo:statement[]) {
        super();
        this.ValueExpression = Value;
        this.body = cuerpo;
    }

    execute(tablasimbolo): any {
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

    constructor(Value:statement,cuerpo:statement[]) {
        super();
        this.ValueExpression = Value;
        this.body = cuerpo;
    }

    execute(tablasimblolo): any {
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

    execute(tablasimbolo): any[2]
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
        return [-1,null];
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

    execute(tablasimbolo): any[2]
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
        return [-1,null];
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

    execute(tablasimbolo): any[2]
    {
        if(this.Expression.type == TypeStatement.ExpresionStatement)
        {
            let vals = <expression> this.Expression;
            switch (vals.valueType)
            {
                case TypeValue.Array:

                case TypeValue.variable:
            }
            return [-1,null];
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