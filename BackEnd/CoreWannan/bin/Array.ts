///<reference path="Statements.ts"/>
class arrays extends statement
{
    StateCode: number;
    type: TypeStatement;
    values:any[];

    execute(): any
    {

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
