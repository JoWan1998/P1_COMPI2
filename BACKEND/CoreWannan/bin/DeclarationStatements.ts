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
    name:string;
    Expression:statement[];
    constructor() {
        super();
        this.Expression = [];
    }

    execute(tablasimbolo: tablasimbolos): any
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
                    if(declaration.tipo == this.tipo)
                    {
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

    execute(tablasimbolo: tablasimbolos): any
    {
        try
        {
            if(this.nameType!='')
            {
                let typer = tablasimbolo.getsym(this.nameType);
                if(typer[0]>0)
                {
                    if(typer[1] instanceof sym)
                    {
                        let type = typer[1].getValue();
                        if(type instanceof types && this.Expression instanceof types)
                        {
                            if(this.Expression.atributos.length == type.atributos.length)
                            {
                                tablasimbolo.insert(this.name,this.Expression,TypeSym.class,this.tipo);
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
