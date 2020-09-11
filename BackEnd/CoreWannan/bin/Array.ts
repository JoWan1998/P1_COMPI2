///<reference path="Statements.ts"/>
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

    execute(): any
    {

    }

    getValue(position:any[])
    {
        //fix get array
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

    setValue(position:any,value?:any)
    {
        //fix array -> position
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
            return [1,this.values.length]
        }
        catch (e) {
            return [-1,null]
        }
    }

}
