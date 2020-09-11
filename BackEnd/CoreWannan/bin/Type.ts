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
    identificador:string;
    tipoValue:TypeValue;

    execute(tablasimbolo: tablasimbolos): any {
    }
    getValueAtributo(atributo:string)
    {
        for(let atr of this.atributos)
        {
            if(atr.name==atributo)
            {
                return atr;
            }
        }
        return null;
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