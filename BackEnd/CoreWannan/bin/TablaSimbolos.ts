/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

///<reference path="Statements.ts"/>

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


    update(name:string,new_value:any):number
    {
        try
        {
            for(let simbolo of this.simbolos)
            {
                if (simbolo instanceof sym)
                {
                    if (simbolo.name == name)
                    {
                        simbolo.update(new_value);
                        return 1;
                    }
                }
            }
        }
        catch (e)
        {
            return -1;
        }

    }
    //metodo el cual a diferencia de otros al no tener una ejecucion correcta devuelve null
    get(name:string): any
    {
        try
        {
            for(let simbolo of this.simbolos)
            {
                if (simbolo instanceof sym)
                {
                    if (simbolo.name == name)
                    {
                        return simbolo.getValue();
                    }
                }
            }
            return null;
        }
        catch (e) {
            return null;
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
                        return simbolo.tipo;
                    }
                }
            }
            return null;
        }
        catch (e) {
            return null;
        }
    }
    insert(name:string, value:any, tipo:TypeStatement)
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
                        if(simbolo.ambito == this.ambitoLevel) state = true;
                        break;
                    }
                }
            }
            if(!state) this.simbolos.push(new sym(name,this.ambitoLevel,value,tipo));
        }
        catch (e) {
            return -1;
        }
    }

}
class sym
{
    name:string;
    ambito:number;
    tipo:TypeSym;
    value:any;

    constructor(name: string, ambito:number,value:any,tipo:TypeStatement)
    {
        this.name = name;
        this.ambito = ambito;
        this.value = value;
    }
    update(new_value:any)
    {
        this.value = new_value;
    }
    getValue():any
    {
        return this.value;
    }
}