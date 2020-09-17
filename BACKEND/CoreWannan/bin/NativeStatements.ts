/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
///<reference path="Statements.ts"/>
class NativeStatement extends statement
{
    StateCode: number;
    type: TypeStatement;
    instruction: Native;
    linea:number;
    Expression: statement[];
    graph:string;

    constructor(typeS:TypeStatement, instr: Native) {
        super();
        this.instruction = instr;
        this.type = typeS
    }

    execute(tablasimbolo): any[2] {
        try
        {
            if(this.instruction == Native.console)
            {
                let resultado = '';
                for(let valu of this.Expression)
                {
                    if(this.Expression == null)return [-1,null];
                    let value = valu.execute(tablasimbolo);
                    if(value[0]<0) return [-1,null];
                    //this.htmlYouWantToAdd = "<p><b>value[1]</b></p>";
                    resultado += value[1].toString();
                    this.StateCode = 1;
                }
                if(this.StateCode==1)
                {
                    //this.htmlYouWantToAdd = "<p><b>value[1]</b></p>";
                }
            }
            return [this.StateCode,null];
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
