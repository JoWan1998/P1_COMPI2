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

    execute(tablasimbolo: tablasimbolos): any {
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}