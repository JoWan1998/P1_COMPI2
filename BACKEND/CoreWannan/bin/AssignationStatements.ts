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
    name:expression;
    atributo:string[];
    position:statement[];
    Expression:statement;
    Assigment:typeAssigment;
    isArr:boolean;

    constructor() {
        super();
        this.atributo = [];
        this.position = [];
        this.isArr = false;
    }

    execute(tablasimbolo): any[2] {
        try
        {
            if(this.atributo.length>0 && this.position.length>0)
            {
                let value = this.Expression.execute(tablasimbolo);
                if(value[0]==1)
                {
                    if(this.isArr)
                    {
                        //array with type in object
                        let simbolo = tablasimbolo.getsym(this.name.getValue(tablasimbolo));
                        if (simbolo[0] > 0)
                        {
                            let simbolito:sym = simbolo[1];
                            if(simbolito.getValue() instanceof arrays)
                            {
                                let arrs:arrays = simbolito.getValue();
                                let result = this.operateArrAtr(arrs,tablasimbolo,this.position,this.atributo,value[1]);
                                if(result[0]>0)
                                {
                                    return tablasimbolo.update(this.name,result[1]);
                                }
                            }
                        }

                    }
                    else
                    {
                        //type with array
                        let simbolo = tablasimbolo.getsym(this.name.getValue(tablasimbolo));
                        if (simbolo[0] > 0)
                        {
                            let simbolito:sym = simbolo[1];
                            if(simbolito.getValue() instanceof types)
                            {
                                let arrs:types = simbolito.getValue();
                                let result = this.operateAtrArr(arrs,tablasimbolo,this.atributo,this.position,value[1]);
                                if(result[0]>0)
                                {
                                    return tablasimbolo.update(this.name,result[1]);
                                }
                            }
                        }
                    }
                }
            }
            else if(this.atributo.length>0)
            {
                let value = this.Expression.execute(tablasimbolo);
                    if(value[0]>0)
                    {
                        let simbolo = tablasimbolo.getsym(this.name.getValue(tablasimbolo));
                        if(simbolo[0]>0)
                        {
                            let simbolito:sym = simbolo[1];
                            if(simbolito.getValue() instanceof types)
                            {
                                let atr:types = simbolito.getValue();
                                let val = this.operateAtr(atr,tablasimbolo,this.atributo,value[1]);
                                if(val[0]>0)
                                {
                                    return tablasimbolo.update(this.name,atr);
                                }
                            }
                        }
                    }

            }
            else if(this.position.length>0)
            {
                let value = this.Expression.execute(tablasimbolo);
                    if(value[0]>0)
                    {
                        let simbolo = tablasimbolo.getsym(this.name.getValue(tablasimbolo));
                        if (simbolo[0] > 0)
                        {
                            let simbolito:sym = simbolo[1];
                            if(simbolito.getValue() instanceof arrays)
                            {
                                let arrs:arrays = simbolito.getValue();
                                return arrs.setValue(tablasimbolo,this.position,value[1]);
                            }
                        }
                    }

            }
            else
            {
                let value = this.Expression.execute(tablasimbolo);
                if(value[0]==1)
                {
                    switch (this.Assigment)
                    {
                        case typeAssigment.division:

                                let newvalue5 = new ArichmeticExpression();
                                newvalue5.Expression1 = this.name;
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
                        case typeAssigment.igual:
                            let val0 = this.Expression.execute(tablasimbolo);
                            if(val0[0]!=-1)
                            {
                                let result0 = tablasimbolo.update(this.name.getValue(tablasimbolo),val0[1]);
                                if(result0==1)return[1,null];
                                return [-1,null];
                            }
                            else
                            {
                                return [-1,null];
                            }
                        case typeAssigment.modulo:
                                let newvalue4 = new ArichmeticExpression();
                            newvalue4.Expression1 = this.name;
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
                        case typeAssigment.multiplicacion:
                            let newvalue3 = new ArichmeticExpression();
                            newvalue3.Expression1 = this.name;
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
                        case typeAssigment.potencia:
                            let newvalue2 = new ArichmeticExpression();
                            newvalue2.Expression1 = this.name;
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
                        case typeAssigment.resta:
                            let newvalue1 = new ArichmeticExpression();
                            newvalue1.Expression1 = this.name;
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
                        case typeAssigment.suma:
                            let newvalue = new ArichmeticExpression();
                            newvalue.Expression1 = this.name;
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
                }
            }

            return [-1,null]
        }
        catch (e) {
            return [-2,null]
        }

    }

    operateArrAtr(objeto:arrays,tablasimbolo:tablasimbolos,position:statement[],atributos:string[],value:any)
    {
        try
        {
            let tp = position.pop();
            if(tp instanceof statement)
            {
                let tpr = tp.execute(tablasimbolo);
                if(tpr[0]>0)
                {
                    if(tpr[1] instanceof Number)
                    {
                        if(position.length>0)
                        {
                            let arr = objeto.get(Number(tpr[1]));
                            if(arr[0]>0)
                            {
                                let arrsub = this.operateArrAtr(arr[1],tablasimbolo,position,atributos,value);
                                if(arrsub[0]>0)
                                {
                                    let result = objeto.set(Number(tpr[1]),arrsub[1]);
                                    if(result[0]>0)
                                    {
                                        return [1,objeto];
                                    }
                                }
                            }
                        }
                        else
                        {
                            let arr0 = objeto.get(Number(tpr[1]));
                            if(arr0[0]>0)
                            {
                                if(arr0[1] instanceof types)
                                {
                                    let arr = this.operateAtr(arr0[1],tablasimbolo,atributos,value);
                                    if(arr[0]>0)
                                    {
                                        let resultf = objeto.set(Number(tpr[1]),arr[1]);
                                        if(resultf[0]>0)
                                        {
                                            return [1,objeto];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return [-1,null]
        }
        catch (e) {
            return [-1,null]
        }
    }

    operateAtrArr(objeto:types,tablasimbolo:tablasimbolos,atributos:string[],position:statement[],value:any):any
    {
        try
        {
            let atr = atributos.pop();
            if(atributos.length>0)
            {
                let atrsub0 = objeto.getValueAtributo(atr);
                if(atrsub0[0]>0)
                {
                    if(atrsub0[1] instanceof types)
                    {
                        let atrsub = this.operateAtrArr(atrsub0[1],tablasimbolo,atributos,position,value);
                        if(atrsub[0]>0)
                        {
                            let rsult = objeto.setValueAtributo(atr,atrsub[1]);
                            if(rsult[0]>0)
                            {
                                return [1,objeto];
                            }
                        }
                    }
                }
            }
            else
            {
                let arrs = objeto.getValueAtributo(atr);
                if(arrs[0]>0)
                {
                    if(arrs[1] instanceof arrays)
                    {
                        let atrs = this.operateArr(arrs[1],tablasimbolo,position,value);
                        if(atrs[0]>0)
                        {
                            let atratr  = objeto.setValueAtributo(atr,atrs[1]);
                            if(atratr[0]>0)
                            {
                                return [1,objeto];
                            }
                        }
                    }
                }
            }
            return [-1,null]
        }
        catch (e) {
            return [-1, null]
        }
    }

    operateAtr(objeto:types,tablasimbolo:tablasimbolos,atributos:string[],value:any):any
    {
        try
        {
            let atr = atributos.pop();
            if(atributos.length>0)
            {
                let atrsub0 = objeto.getValueAtributo(atr);
                if(atrsub0[0]>0)
                {
                    if(atrsub0[1] instanceof types)
                    {
                        let atrsub = this.operateAtr(atrsub0[1],tablasimbolo,atributos,value);
                        if(atrsub[0]>0)
                        {
                            let rsult = objeto.setValueAtributo(atr,atrsub[1]);
                            if(rsult[0]>0)
                            {
                                return [1,objeto];
                            }
                        }
                    }
                }
            }
            else
            {
                let atratr  = objeto.setValueAtributo(atr,value);
                if(atratr[0]>0)
                {
                    return [1,objeto];
                }
            }
            return [-1,null]
        }
        catch (e) {
            return [-1, null]
        }
    }

    operateArr(objeto:arrays,tablasimbolo:tablasimbolos,position:statement[],value:any):any
    {
        try
        {
            let tp = position.pop();
            if(tp instanceof statement)
            {
                let tpr = tp.execute(tablasimbolo);
                if(tpr[0]>0)
                {
                    if(tpr[1] instanceof Number)
                    {
                        if(position.length>0)
                        {
                            let arr = objeto.get(Number(tpr[1]));
                            if(arr[0]>0)
                            {
                                let arrsub = this.operateArr(arr[1],tablasimbolo,position,value);
                                if(arrsub[0]>0)
                                {
                                    let result = objeto.set(Number(tpr[1]),arrsub[1]);
                                    if(result[0]>0)
                                    {
                                        return [1,objeto];
                                    }
                                }
                            }
                        }
                        else
                        {
                            let arr = objeto.set(Number(tpr[1]),value);
                            if(arr[0]>0)
                            {
                                return [1,objeto];
                            }
                        }
                    }
                }
            }
            return [-1,null]
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
