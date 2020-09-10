/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

///<reference path="Statements.ts"/>
class expression extends statement
{
    StateCode: number;
    type: TypeStatement;
    valueType:TypeValue;
    Expresion: statement;
    linea:number;
    constructor() {
        super();
    }

    execute(tablasimbolo): any[2] {
        return (this.Expresion != null)?this.Expresion.execute(tablasimbolo):[-1,null];
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return (this.Expresion!=null)?this.Expresion.traduction():'';
    }

}
class ArichmeticExpression extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expression1: statement;
    Expression2: statement;
    Function: ArichmeticExpr;
    value:any;
    linea:number;

    execute(tablasimbolo): any[2]
    {
        this.StateCode = -1;
        this.value = null;
        try
        {
            let izq = (this.Expression1!=null)?this.Expression1.execute(tablasimbolo):[-1,null];
            let der = (this.Expression2!=null)?this.Expression2.execute(tablasimbolo):[-1,null];
            if(izq[0]==1&&der[0]==1)
            {
                switch (this.Function)
                {
                    case ArichmeticExpr.suma:
                        this.value = izq[1] + der[1];
                        this.StateCode = 1;
                        break;
                    case ArichmeticExpr.resta:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof  Boolean)
                        {
                            this.value = izq[1] - der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.potenciacion:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof  Boolean)
                        {
                            this.value = izq[1] ^ der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.multiplicacion:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof  Boolean)
                        {
                            this.value = izq[1] * der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.modulo:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof  Boolean)
                        {
                            this.value = izq[1] % der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.negacion:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean )
                        {
                            this.value = -izq[1].toString();
                            this.StateCode = 1;
                        }
                        break;
                    case ArichmeticExpr.division:
                        if (izq[1] instanceof Number || izq[1] instanceof Boolean &&
                            der[1] instanceof Number || der[1] instanceof  Boolean)
                        {
                            if(der[1]!=0)
                            {
                                this.value = izq[1] / der[1];
                                this.StateCode = 1;
                            }
                            else
                            {
                                this.value = izq[1] / der[1];
                                this.StateCode = -1;
                            }

                        }
                        break;
                }
            }
            return [this.StateCode,this.value];
        }
        catch (e) {

            return [this.StateCode,this.value];
        }

    }

    grahp(): string {
        return "";
    }

    traduction(): string
    {
        let izq = (this.Expression1!=null)?this.Expression1.traduction():'';
        let der = (this.Expression2!=null)?this.Expression2.traduction():'';
        switch (this.Function)
        {
            case ArichmeticExpr.division:
                return izq + '/' + der;
            case ArichmeticExpr.modulo:
                return izq + '%' + der;
            case ArichmeticExpr.multiplicacion:
                return izq + '*' + der;
            case ArichmeticExpr.negacion:
                return '-'+izq ;
            case ArichmeticExpr.potenciacion:
                return izq + '**' + der;
            case ArichmeticExpr.resta:
                return izq + '-' + der;
            case ArichmeticExpr.suma:
                return izq + '+' + der;
        }
    }

}
class LogialExpression extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expression1: statement;
    Expression2: statement;
    Function: LogicalExpr;
    linea:number;
    value:any;

    execute(tablasimbolo): any[2]
    {
        this.StateCode = -1;
        this.value = null;
        try
        {
            let izq = (this.Expression1!=null)?this.Expression1.execute(tablasimbolo):[-1,null];
            let der = (this.Expression2!=null)?this.Expression2.execute(tablasimbolo):[-1,null];
            if(izq[0]==1&&der[0]==1)
            {
                switch (this.Function)
                {
                    case LogicalExpr.Y:
                        if(izq[1] instanceof Boolean && der[1] instanceof Boolean)
                        {
                            this.value = izq[1] && der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case LogicalExpr.O:
                        if(izq[1] instanceof Boolean && der[1] instanceof Boolean)
                        {
                            this.value = izq[1] || der[1];
                            this.StateCode = 1;
                        }
                        break;
                    case LogicalExpr.NOT:
                        if(izq[1] instanceof Boolean)
                        {
                            this.value = !izq[1];
                            this.StateCode = 1;
                        }
                        break;
                }
            }
            else if(izq[0]==1)
            {
                switch (this.Function)
                {
                    case LogicalExpr.NOT:
                        if(izq[1] instanceof Boolean)
                        {
                            this.value = !izq[1];
                            this.StateCode = 1;
                        }
                        break;
                }
            }
            return [this.StateCode,this.value];
        }
        catch (e) {

            return [this.StateCode,this.value];
        }
    }

    grahp(): string {
        return "";
    }

    traduction(): string
    {
        let izq = (this.Expression1!=null)?this.Expression1.traduction():'';
        let der = (this.Expression2!=null)?this.Expression2.traduction():'';
        switch (this.Function)
        {
            case LogicalExpr.NOT:
                return '!' + der;
            case LogicalExpr.O:
                return izq + '||' + der;
            case LogicalExpr.Y:
                return izq + '&&' + der;
        }
    }

}
class RelationalExpression extends statement
{
    StateCode: number;
    type: TypeStatement;
    Expression1: statement;
    Expression2: statement;
    Function: RelationalExpr;
    value: any;
    linea:number;

    execute(tablasimbolo): any[2]
    {
        this.StateCode = -1;
        this.value = null;
        try
        {
            let izq = (this.Expression1!=null)?this.Expression1.execute(tablasimbolo):[1,null];
            let der = (this.Expression2!=null)?this.Expression2.execute(tablasimbolo):[1,null];
            if(izq[0]==1&&der[0]==1)
            {
                switch (this.Function)
                {
                    case RelationalExpr.Igual:
                        this.value = izq[1] == der[1];
                        this.StateCode = 1;
                        break;
                    case RelationalExpr.Mayor:
                        this.value = izq[1] > der[1];
                        this.StateCode = 1;
                        break;
                    case RelationalExpr.MayorQue:
                        this.value = izq[1] >= der[1];
                        this.StateCode = 1;
                        break;
                    case RelationalExpr.Menor:
                        this.value = izq[1] < der[1];
                        this.StateCode = 1;
                        break;
                    case RelationalExpr.MenorQue:
                        this.value = izq[1] <= der[1];
                        this.StateCode = 1;
                        break;
                    case RelationalExpr.NoIgual:
                        this.value = izq[1] != der[1];
                        this.StateCode = 1;
                        break;
                }
            }
            return [this.StateCode,this.value];
        }
        catch (e) {

            return [this.StateCode,this.value];
        }

    }

    grahp(): string
    {
        return '';

    }

    traduction(): string
    {
        let izq = (this.Expression1!=null)?this.Expression1.traduction():'';
        let der = (this.Expression2!=null)?this.Expression2.traduction():'';
        switch (this.Function)
        {
            case RelationalExpr.NoIgual:
                return izq +'!='+ der;
            case RelationalExpr.MenorQue:
                return izq +'<='+ der;
            case RelationalExpr.Menor:
                return izq +'<'+der;
            case RelationalExpr.MayorQue:
                return izq +'>='+der;
            case RelationalExpr.Mayor:
                return izq +'>'+der;
            case RelationalExpr.Igual:
                return izq +'=='+der;
        }
    }

}