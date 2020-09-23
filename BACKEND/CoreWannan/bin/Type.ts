///<reference path="Statements.ts"/>
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

import ValueType = WebAssembly.ValueType;

class types extends statement
{
    StateCode: number;
    type: TypeStatement;
    atributos:atributo[];
    name:string;
    tipoValue:TypeValue;

    execute(tablasimbolo: tablasimbolos): any {
        return [1,this]
    }
    getValueAtributo(atributo:string)
    {
        for(let atr of this.atributos)
        {
            if(atr.name==atributo)
            {
                return [1,atr];
            }
        }
        return [-1,null];
    }

    getValuesAtributo1(objeto:types,atributos:string[],tablasimbolo:tablasimbolos)
    {
        try
        {
            let atr = atributos.pop();
            if(atributos.length>0)
            {
                let atrsub0 = this.getValueAtributo(atr);
                if(atrsub0[0]>0)
                {
                    if(atrsub0[1] instanceof types)
                    {
                        let atrsub = this.getValuesAtributo1(atrsub0[1],atributos,tablasimbolo);
                        if(atrsub[0]>0)
                        {
                            return [1,atrsub[1]]
                        }
                    }
                }
            }
            else
            {
                let atratr  = objeto.getValueAtributo(atr);
                if(atratr[0]>0)
                {
                    return [1,atratr[1]];
                }
            }
            return [-1,null]
        }
        catch (e)
        {
            return [-1,null];
        }
    }
    getValuesAtributo(atributos:string[],tablasimbolo:tablasimbolos)
    {
        try
        {
            let atr = atributos.pop();
            if(atributos.length>0)
            {
                let atrsub0 = this.getValueAtributo(atr);
                if(atrsub0[0]>0)
                {
                    if(atrsub0[1] instanceof types)
                    {
                        let atrsub = this.getValuesAtributo1(atrsub0[1],atributos,tablasimbolo);
                        if(atrsub[0]>0)
                        {
                            return [1,atrsub[1]]
                        }
                    }
                }
            }
            else
            {
                let atratr  = this.getValueAtributo(atr);
                if(atratr[0]>0)
                {
                    return [1,atratr[1]];
                }
            }
            return [-1,null]
        }
        catch (e)
        {
            return [-1,null];
        }
    }

    setValueAtributo(atributo:string,value?:any)
    {
        for(let atr of this.atributos)
        {
            if(atr.name==atributo)
            {
                atr.value = value;
                return [1,null]
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

class atributo
{
    name:string;
    value:any;
    tipo:TypeValue;
}
