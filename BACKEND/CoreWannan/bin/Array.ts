///<reference path="Statements.ts"/>
///<reference path="Expression.ts"/>
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
class arrays extends statement
{
    StateCode: number;
    type: TypeStatement;
    tipoValue:TypeValue;
    values:any[];
    val:any;
    size:number;

    execute(): any
    {
        return [1,this];
    }

    getValue(position:any[],tablasimbolo:tablasimbolos)
    {
        try {
            let a:expression = position.pop();
            let result = a.execute(tablasimbolo);
            if(result[0]>0)
            {
                if(position.length>0)
                {
                    return this.getValorA(position,this.values[result[1]],tablasimbolo);
                }
                else
                {
                    return [1,result[1]]
                }
            }
        }
        catch (e) {
            return [-1,null]
        }
    }
    getValorA(position:any[],objeto,tablasimbolo:tablasimbolos)
    {
        try {
            let a:expression = position.pop();
            let result = a.execute(tablasimbolo);
            if(result[0]>0)
            {
                if(position.length>0)
                {
                    return this.getValorA(position,objeto[result[1]],tablasimbolo);
                }
                else
                {
                    return [1,result[1]]
                }
            }
        }
        catch (e) {
            return [-1,null]
        }
    }
    getAll()
    {
        return this.values;
    }

    get(position:number)
    {
        let a = 0;
        for(let value of this.values)
        {
            if(a==position)
            {
                return [1,value];
            }
            a++;
        }
        return [-1,null]
    }

    setValue(tablasimbolo:tablasimbolos,position:any[],value?:statement):any
    {
        try {
            if(position instanceof Array)
            {

                if(value == null)
                {
                    let a:expression = position.pop();
                    let result = a.execute(tablasimbolo);
                    if(result[0]>0)
                    {
                        if(position.length>0)
                        {
                            let tt = this.setValorA(tablasimbolo,this.values[result[1]],position,null);
                            if(tt[0]>0)
                            {
                                this.values[result[1]] = tt[1];
                                return [1,null];
                            }
                            else
                            {
                                return [-1,null];
                            }
                        }
                        else
                        {
                            this.values[result[1]] = this.val;
                            return [1,null];
                        }
                    }
                    else
                    {
                        return [-1,null]
                    }
                }
                else
                {
                    if(value instanceof  statement)
                    {
                        let vals = value.execute(tablasimbolo);
                        if(vals[0]>0)
                        {
                            let a:expression = position.pop();
                            let result = a.execute(tablasimbolo);
                            if(result[0]>0)
                            {
                                if(position.length>0)
                                {
                                    let tt = this.setValorA(tablasimbolo,this.values[result[1]],position,vals[1]);
                                    if(tt[0]>0)
                                    {
                                        this.values[result[1]] = tt[1];
                                        return [1,null];
                                    }
                                    else
                                    {
                                        return [-1,null];
                                    }
                                }
                                else
                                {
                                    this.values[result[1]] = vals[1];
                                    return [1,null];
                                }
                            }
                            else
                            {
                                return [-1,null]
                            }
                        }
                        else
                        {
                            return [-1,null]
                        }
                    }

                }
            }
            return [-1,null]

        }
        catch (e) {
            return[-1,null]
        }
    }

    setValorA(tablasimbolo:tablasimbolos,objeto,position:any,value):any
    {
        try {

            if(objeto.length != undefined)
            {
                let vals = value.execute(tablasimbolo);
                if(vals[0]>0)
                {
                    var a = <expression> position.pop();
                    let result = a.execute(tablasimbolo);
                    if(result[0]>0)
                    {

                        if(position.length>0)
                        {
                            let tt = this.setValorA(tablasimbolo,objeto[result[1]],position,vals[1]);
                            if(tt[0]>0)
                            {
                                objeto[result[1]] = tt[1];
                                return [1,objeto];
                            }
                            else
                            {
                                return [-1,null];
                            }
                        }
                        else
                        {
                            objeto[result[1]] == vals[1];
                            return [1,objeto];
                        }
                    }
                    else
                    {
                        return [-1,null]
                    }
                }
                else
                {
                    return [-1,null]
                }
            }
            else
            {
                return [-1,null]
            }

        }
        catch (e) {
            return [-1,null]
        }
    }

    set(position:number,value?:any)
    {
        try
        {
            for(var a=0; a<this.values.length;a++)
            {
                if(a==position)
                {
                    this.values[a] = value;
                    return [1,null];
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

    push(value:any):any
    {
        try {
            this.values.push(value);
        }
        catch (e) {
            return [-1,null];
        }
    }
    pop():any
    {
        try {
            return [1,this.values.pop()];
        }
        catch (e) {
            return [-1,null]
        }
    }
    length():any
    {
        try {
            return this.values.length;
        }
        catch (e) {
            return -1
        }
    }

}
