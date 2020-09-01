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

    execute(): any[2] {
        if(this.instruction == Native.console)
        {
            let value = this.Expression.execute();
            if(value[1]==0) this.StateCode = 0;

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