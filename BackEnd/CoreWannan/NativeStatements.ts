///<reference path="Statements.ts"/>
class NativeStatement extends statement
{
    StateCode: number;
    type: TypeStatement;
    instruction: Native;
    constructor(typeS:TypeStatement, instr: Native) {
        super();
        this.instruction = instr;
        this.type = typeS
    }

    execute(): any[2] {
        if(this.instruction == Native.console)
        {

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