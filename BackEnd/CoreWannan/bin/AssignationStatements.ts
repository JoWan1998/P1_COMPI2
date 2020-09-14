///<reference path="Statements.ts"/>
///<reference path="Expression.ts"/>
/*
        UNIVERSIDAD DE SAN CARLOS DE GUATEMALA - 2020
        JOSE ORLANDO WANNAN ESCOBAR - 201612331
        GUATEMALA
 */

class Asignation extends statement
{
    StateCode: number;
    type: TypeStatement;
    linea:number;
    name:string;
    Expression:statement;
    Assigment:typeAssigment;

    execute(tablasimbolo): any[2] {
        let value = this.Expression.execute(tablasimbolo);
        if(value[0]==1)
        {
            switch (this.Assigment)
            {
                case typeAssigment.division:
                    let oldvalue5 = tablasimbolo.get(this.name);

                    if(oldvalue5 != null)
                    {
                        let newvalue5 = new ArichmeticExpression();
                        newvalue5.Expression1 = oldvalue5;
                        newvalue5.Expression2 = value[1];
                        newvalue5.Function = ArichmeticExpr.division;
                        newvalue5.linea = this.linea
                        let val5 = newvalue5.execute(tablasimbolo);
                        if(val5[0]!=-1)
                        {
                            let result5 = tablasimbolo.update(this.name,val5[1]);
                            if(result5==1)return[1,null];
                            return [-1,null];
                        }
                        else
                        {
                            return [-1,null];
                        }
                    }
                    else
                    {
                        return [-2,null];
                    }
                case typeAssigment.igual:
                    let val0 = this.Expression.execute(tablasimbolo);
                    if(val0[0]!=-1)
                    {
                        let result0 = tablasimbolo.update(this.name,val0[1]);
                        if(result0==1)return[1,null];
                        return [-1,null];
                    }
                    else
                    {
                        return [-1,null];
                    }
                case typeAssigment.modulo:
                    let oldvalue4 = tablasimbolo.get(this.name);
                    if(oldvalue4 != null)
                    {
                        let newvalue4 = new ArichmeticExpression();
                        newvalue4.Expression1 = oldvalue4;
                        newvalue4.Expression2 = value[1];
                        newvalue4.Function = ArichmeticExpr.modulo;
                        newvalue4.linea = this.linea
                        let val4 = newvalue4.execute(tablasimbolo);
                        if(val4[0]!=-1)
                        {
                            let result4 = tablasimbolo.update(this.name,val4[1]);
                            if(result4==1)return[1,null];
                            return [-1,null];
                        }
                        else
                        {
                            return [-1,null];
                        }
                    }
                    else
                    {
                        return [-2,null];
                    }
                case typeAssigment.multiplicacion:
                    let oldvalue3 = tablasimbolo.get(this.name);
                    if(oldvalue3 != null)
                    {
                        let newvalue3 = new ArichmeticExpression();
                        newvalue3.Expression1 = oldvalue3;
                        newvalue3.Expression2 = value[1];
                        newvalue3.Function = ArichmeticExpr.multiplicacion;
                        newvalue3.linea = this.linea
                        let val3 = newvalue3.execute(tablasimbolo);
                        if(val3[0]!=-1)
                        {
                            let result3 = tablasimbolo.update(this.name,val3[1]);
                            if(result3==1)return[1,null];
                            return [-1,null];
                        }
                        else
                        {
                            return [-1,null];
                        }
                    }
                    else
                    {
                        return [-2,null];
                    }
                case typeAssigment.potencia:
                    let oldvalue2 = tablasimbolo.get(this.name);
                    if(oldvalue2 != null)
                    {
                        let newvalue2 = new ArichmeticExpression();
                        newvalue2.Expression1 = oldvalue2;
                        newvalue2.Expression2 = value[1];
                        newvalue2.Function = ArichmeticExpr.potenciacion;
                        newvalue2.linea = this.linea
                        let val2 = newvalue2.execute(tablasimbolo);
                        if(val2[0]!=-1)
                        {
                            let result2 = tablasimbolo.update(this.name,val2[1]);
                            if(result2==1)return[1,null];
                            return [-1,null];
                        }
                        else
                        {
                            return [-1,null];
                        }
                    }
                    else
                    {
                        return [-2,null];
                    }
                case typeAssigment.resta:
                    let oldvalue1 = tablasimbolo.get(this.name);
                    if(oldvalue1 != null)
                    {
                        let newvalue1 = new ArichmeticExpression();
                        newvalue1.Expression1 = oldvalue1;
                        newvalue1.Expression2 = value[1];
                        newvalue1.Function = ArichmeticExpr.resta;
                        newvalue1.linea = this.linea
                        let val1 = newvalue1.execute(tablasimbolo);
                        if(val1[0]!=-1)
                        {
                            let result1 = tablasimbolo.update(this.name,val1[1]);
                            if(result1==1)return[1,null];
                            return [-1,null];
                        }
                        else
                        {
                            return [-1,null];
                        }
                    }
                    else
                    {
                        return [-2,null];
                    }
                case typeAssigment.suma:
                    let oldvalue = tablasimbolo.get(this.name);
                    if(oldvalue != null)
                    {
                        let newvalue = new ArichmeticExpression();
                        newvalue.Expression1 = oldvalue;
                        newvalue.Expression2 = value[1];
                        newvalue.Function = ArichmeticExpr.suma;
                        newvalue.linea = this.linea
                        let val = newvalue.execute(tablasimbolo);
                        if(val[0]!=-1)
                        {
                            let result = tablasimbolo.update(this.name,val[1]);
                            if(result==1)return[1,null];
                            return [-1,null];
                        }
                        else
                        {
                            return [-1,null];
                        }
                    }
                    else
                    {
                        return [-2,null];
                    }
            }
        }
    }

    grahp(): string {
        return "";
    }

    traduction(): string {
        return "";
    }

}