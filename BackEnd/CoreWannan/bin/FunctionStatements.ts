///<reference path="Statements.ts"/>
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

class functions extends statement
{
    StateCode: number;
    type: TypeStatement;
    name:string;
    tipo:TypeValue;
    body:statement[];
    value:any;

    execute(tablasimbolo: tablasimbolos): any
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

                    break;
                case 3: //-> sin errores, continue

                    break;
                case 4: //-> sin errores, return
                    if(value[1] == null)
                    {
                        if(this.tipo == TypeValue.void) return[4,null];
                        return [-1,null];
                    }
                    else if(value[1] as Boolean)
                    {
                        if(this.tipo == TypeValue.Boolean) return [4,value[1]]
                        return [-1,null]
                    }
                    else if(value[1] as Number)
                    {
                        if(this.tipo == TypeValue.Number) return [4,value[1]]
                        return [-1,null]
                    }
                    else if(value[1] as String)
                    {
                        if(this.tipo == TypeValue.String) return [4,value[1]]
                        return [-1,null]
                    }
                    else if(value[1] as arrays)
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
        return [1,null];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}