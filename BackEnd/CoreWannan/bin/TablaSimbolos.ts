/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

///<reference path="Statements.ts"/>
///<reference path="Type.ts"/>
///<reference path="Array.ts"/>

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
                                return [1,sim.getValueAtributo(atributo)];
                            }
                            else if(simbolo.tipoValue == TypeValue.Array)
                            {
                                let sim:arrays = simbolo.getValue();
                                return [1,sim.getValue(posicion)];
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
    insert(name:string, value:any, tipo:TypeStatement, tipovalue:TypeValue)
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

    constructor(name: string, ambito:number,value:any,tipo:TypeStatement)
    {
        this.name = name;
        this.ambito = ambito;
        this.value = value;
    }
    update(new_value:any,atributo?:any,position?:any):any
    {
        if(atributo!=undefined && position == undefined)
        {
            let valor:types = this.value;
            valor.setValueAtributo(atributo,new_value);
            this.value = valor;
        }
        else if(atributo==undefined && position != undefined)
        {
            let valor:arrays = this.value;
            valor.setValue(position,new_value);
            this.value = valor;
        }
        else
        {
            this.value = new_value;
            return [1,null];
        }

    }
    getValue():any
    {
        return this.value;
    }
}