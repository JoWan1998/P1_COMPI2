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

    constructor() {
        super();
        this.value = "";
    }
    execute(): any {
        return [1,this.value];
    }
    getValue()
    {
        return this.value;
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

    constructor() {
        super();
        this.value = -1;
    }

    execute(): any {
        return [1, this.value];
    }

    getValue()
    {
        return this.value;
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

    constructor() {
        super();
        this.value = false;
    }
    getValue()
    {
        return this.value;
    }
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

    getValue()
    {
        return null;
    }

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

    getValue()
    {
        return this.value;
    }

    execute(): any {
        return[1,""];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}
