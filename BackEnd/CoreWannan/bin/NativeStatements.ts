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
    Expression: statement;

    constructor(typeS:TypeStatement, instr: Native) {
        super();
        this.instruction = instr;
        this.type = typeS
    }

    execute(tablasimbolo): any[2] {
        if(this.instruction == Native.console)
        {
            if(this.Expression == null)return [-1,null];
            let value = this.Expression.execute(tablasimbolo);
            if(value[0]<0) return [-1,null];
            //this.htmlYouWantToAdd = "<p><b>value[1]</b></p>";
            this.StateCode = 1;
        }
        return [this.StateCode,null];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}