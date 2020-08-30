///<reference path="Statements.ts"/>
class expression extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expresion: statement;
    Function: Expression;
    constructor() {
        super();
    }

    execute(): any[2] {
        return [this.StateCode,null];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class ArichmeticExpression extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expression: statement;
    Function: ArichmeticExpr;

    execute(): any[2] {
        return [this.StateCode,null]
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class LogialExpression extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expression: statement;
    Function: LogicalExpr;

    execute(): any[2] {
        return [this.StateCode,null]
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class RelationalExpression extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expression: statement;
    Function: RelationalExpr;

    execute(): any[2] {
        return [this.StateCode,null]
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}