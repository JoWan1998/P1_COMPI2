///<reference path="Statements.ts"/>
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

    execute(): any {
        let state = true;
        while(state) {
            let valInitial = this.ValueExpression.execute();
            if (valInitial[0] < 0) return [-1, null];
            if(!valInitial[1]) break;
            let internalState = 0;
            for(let statement0 of this.body)
            {
                let value = statement0.execute();
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

    execute(): any {
        let state = true;
        while(state) {
            let internalState = 0;
            for(let statement0 of this.body)
            {
                let value = statement0.execute();
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
            let valInitial = this.ValueExpression.execute();
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
class ForStatements extends statement
{
    StateCode: number;
    type: TypeStatement;

    execute(): any {
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}