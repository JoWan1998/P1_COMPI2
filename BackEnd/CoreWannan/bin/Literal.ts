/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */
///<reference path="Statements.ts"/>
class Strings extends statement
{
    StateCode: number;
    type: TypeStatement;
    value: string;

    execute(): any {
        return [1,this.value];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

class Numbers extends statement
{
    StateCode: number;
    type: TypeStatement;
    value: number;

    execute(): any {
        return [1,this.value];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}

class Booleans extends statement
{
    StateCode: number;
    type: TypeStatement;
    value: boolean;

    execute(): any {
        return [1,this.value];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
class Nulls extends statement
{
    StateCode: number;
    type: TypeStatement;

    execute(): any {
        return [1,null];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }
}
class Cadena3 extends statement
{
    StateCode: number;
    type: TypeStatement;
    value: any;

    execute(): any {
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}