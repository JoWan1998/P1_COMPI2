//  UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
//  JOSE ORLANDO WANNAN ESCOBAR - 2020
//  GRAMATICA RECURSIVIDAD POR LA IZQUIERDA


// ANALISIS LEXICO

%{
    var lexicos = [];
    var sintacticos = [];
%}

%lex
%options case-insensitive
%%
"//".*                          /* ignore comment*/
"/*"[^"*/"]* "*/"               /* ignore c-style comment*/
\s+                             /* skip whitespace */
\\r                              /* skip retorno de carro */
\\n                              /* skip salto linea */
\\t                              /* skip tabulacion */
"null"                          return 'NULLTOKEN'
"true"                          return 'TRUETOKEN'
"false"                         return 'FALSETOKEN'

"const"                         return 'CONST'
"let"                           return 'LET'
"var"                           return 'VAR'
"number"                        return 'NUMBERS'
"boolean"                       return 'BOOLEAN'
"string"                        return 'STRING'
"void"                          return 'VOID'
"type"                          return 'TYPE'

'console'                       return 'CONSOLE'
'log'                           return 'LOG'
'graficar_ts'                   return 'GRAHPTS'

"break"                         return 'BREAK'
"continue"                      return 'CONTINUE'
"default"                       return 'DEFAULT'
"case"                          return 'CASE'
"switch"                        return 'SWITCH'
"function"                      return 'FUNCTION'
"if"                            return 'IF'
"Do"                            return 'DO'
"While"                         return 'WHILE'
"else"                          return 'ELSE'
"for"                           return 'FOR'
"of"                            return 'OFTOKEN'
"in"                            return 'INTOKEN'
"return"                        return 'RETURN'

"Push"                          return 'PUSH'
"Pop"                           return 'POP'
"Length"                        return 'LENGTH'

"+="                            return '+='
"-="                            return '-='
"/="                            return '/='
"*="                            return '*='
"^="                            return '^='
"%="                            return '%='

"=="                            return 'EQQ'
"!="                            return 'NOEQQ'
">="                            return 'MAQ'
"<="                            return 'MIQ'
">"                             return '>'
"<"                             return '<'

"||"                            return 'OR'
"&&"                            return 'AND'
"!"                             return '!'

"++"                            return 'PLUSPLUS'
"--"                            return 'MINSMINS'
"**"                             return 'POTENCIA'

"+"                             return '+'
"-"                             return '-'
"*"                             return '*'
"/"                             return '/'
"%"                             return '%'


[a-zA-Z_\$][a-zA-Z0-9_\$]*      return 'IDENT'
[0-9]+("."[0-9]+)?\b            return 'NUMBER';
\"[^\"]*\"				              { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\`[^\`]*\`                      { yytext = yytext.substr(1,yyleng-2); return 'CADENA1'; }
\'[^\']*\'                      { yytext = yytext.substr(1,yyleng-2); return 'CADENA2'; }


'='                             return '='
';'                             return ';'
':'                             return ':'
','                             return ','
'.'                             return '.'
'('                             return '('
')'                             return ')'
'['                             return '['
']'                             return ']'
'{'                             return 'OPENBRACE'
'}'                             return 'CLOSEBRACE'
'?'                             return '?'

<<EOF>>                         return 'EOF';
.                               {
                                        console.error('Error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column+';');
                                        lexicos.push('{\"token\":\"' + yytext + '\", \"linea\": \"' + yylloc.first_line + '\", \"columna\": \"' + yylloc.first_column+'\"}');
                                }

/lex

// OPERATORS PRECEDENCE

%left '+' '-'
%left '*' '/'
%left POTENCIA
%left UMINUS


%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE

%start S

%%

// ANALISIS SINTACTICO

S
    : Source { $$ =[];  $$.push('{\"linea\":\"'+(yylineno+1)+'\",\"S\":['+$1+']}'); $$.push(lexicos); $$.push(sintacticos); return $$;}
    | EOF { $$ =[]; $$.push('{}'); $$.push(lexicos); $$.push(sintacticos); return $$;}
;

Source
    : Statement Source1
    {
         $$ = $1+',\n'+$2;
    }
;

Source1
    :  Statement
      {
        $$ = $1;
      }
    |  Statement Source1
      {
        $$ = $1+',\n'+$2;
      }
    |  EOF
      {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"\"}';
      }
;

Statement
    : Declaration_statements
      {
        $$ = $1;
      }
  /*  | Expr_statements
            {
              $$ = $1;
            }*/
    | Assignation_statements
      {
        $$ = $1;
      }
    | Function_statements
      {
        $$ = $1;
      }
    | Native_statements
      {
        $$ = $1;
      }
    | Block_statements
      {
        $$ = $1;
      }
    | If_statements
      {
        $$ = $1;
      }
    | Iteration_statements
      {
        $$ = $1;
      }
    | Return_statements
      {
        $$ = $1;
      }
    | Break_statements
      {
        $$ = $1;
      }
    | Continue_statements
      {
        $$ = $1;
      }
    | Switch_statements
      {
        $$ = $1;
      }
    | Empty_statements
      {
        $$ = $1;
      }
    | error
      {
        console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
        sintacticos.push('{\"token\":\"'+yytext+'\", \"linea\":\"'+this._$.first_line+'\", \"columna\":\"'+this._$.first_column+'\"}');
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"\"}';
      }
;


Native_statements
    : CONSOLE '.' LOG '(' Expr ')' ';'
      {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"console\","expression":['+$5+']}';
      }
    | GRAHPTS '(' ')' ';'
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"graph\","expression":[]}';
        }
    | CONSOLE '.' LOG '(' Expr ')'
         {
                $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"console\","expression":['+$5+']}';
         }
    | GRAHPTS '(' ')'
         {
                $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"graph\","expression":[]}';
         }
;

Expr_statements
    : ExprNB ';'
        {
            $$ = $1;
        }
    | ExprNB
         {
                $$ = $1;
         }
;

Empty_statements
    : ';'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"\"}';
    }
;

Block_statements
    : OPENBRACE CLOSEBRACE
        {
           $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"\"}';
        }
    | OPENBRACE Source1 CLOSEBRACE
        {
            $$ = $2;
        }
;


Declaration_statements
    : Type ValStatementL ';'
        {
            $$ =  '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"declaration\",\"type\":['+$1+'], \"values\":['+$2+']}';
        }
    | Type ValStatementL
         {
                $$ =  '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"declaration\",\"type\":['+$1+'], \"values\":['+$2+']}';
         }
    | IDENT Arguments
        {
             $$ =  '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"CallFunction\",\"name\":\"'+$1+'\", \"parameters\":['+$2+']}';
        }

;

Assignation_statements
    : IDENT initialNo ';'
        {
            $$ =  '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"asignation\",\"variable\":\"'+$1+'\",\"params\":[],\"ValExpression\":['+$2+']}';
        }
    | IDENT initialNo
        {
           $$ =  '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"asignation\",\"variable\":\"'+$1+'\",\"params\":[],\"ValExpression\":['+$2+']}';
        }
    | Expr1_statements
    {
        $$ = $1;
    }

;
CallExprNoIn
    : CallExprNoIn Arguments
        {
            $$ = $1 + ',{\"statement\":\"Argument\",\"value\":['+$2+']}';
        }
    | CallExprNoIn ArrList
        {
            $$ = $1 + ',{\"statement\":\"ArrayList\",\"value\":['+$2+']}';
        }
    | CallExprNoIn '.' IDENT
        {
            $$ = $1 + ',{\"statement\":\"Object\",\"value\":\"'+$3+'\"}';
        }
    | '.' IDENT
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Object\",\"value\":\"'+$2+'\"}';
        }
    | ArrList
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"ArrayList\",\"value\":['+$1+']}';
        }
;
/*
Expr1_statements
    : IDENT  PLUSPLUS
    {
        var m = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$1+'\",\"hijo\":[]}';
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"postincrement1\",\"padre\":['+m+']}';
    }
    | IDENT  MINSMINS
    {
        var m = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$1+'\",\"hijo\":[]}';
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"postdecrement1\",\"padre\":['+m+']}';
    }
    | MINSMINS IDENT
    {
            var m = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$2+'\",\"hijo\":[]}';
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"predecrement1\",\"padre\":['+m+']}';
    }
    | PLUSPLUS IDENT
    {
            var m = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$2+'\",\"hijo\":[]}';
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"preincrement1\",\"padre\":['+m+']}';
    }
    | IDENT Expr1_statement PLUSPLUS
    {
            var m ='{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$1+'\", \"hijo\":['+$2+']}';
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"postincrement1\",\"padre\":['+m+']}';
    }
    | IDENT Expr1_statement MINSMINS
    {
                var m ='{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$1+'\", \"hijo\":['+$2+']}';
                $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"postdecrement1\",\"padre\":['+m+']}';
    }
    | MINSMINS IDENT Expr1_statement
    {
                    var m ='{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$2+'\", \"hijo\":['+$3+']}';
                    $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"predecrement1\",\"padre\":['+m+']}';
    }
    | PLUSPLUS IDENT Expr1_statement
    {
                    var m ='{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$2+'\", \"hijo\":['+$3+']}';
                    $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"preincrement1\",\"padre\":['+m+']}';
    }
;
*/
Expr1_statement
    : Expr1_statement ArrList
        {
            $$ = $1 + ',{\"statement\":\"ArrayList\",\"value\":['+$2+']}';
        }
    | Expr1_statement '.' IDENT
        {
            $$ = $1 + ',{\"statement\":\"Object\",\"value\":\"'+$3+'\"}';
        }
    | '.' IDENT
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Object\",\"value\":\"'+$2+'\"}';
        }
    | ArrList
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"ArrayList\",\"value\":['+$1+']}';
        }
;



ArrList
    : Arr ArrList
        {
            $$ = $1 +',\n'+ $2
        }

    | Arr
        {
            $$ = $1;
        }
;

Arr
    : '[' Expr ']'
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"MatrizPosition\",\"value\":['+$2+']}';
        }
;


ValStatementL
    : ValStatement ',' ValStatementL
        {
            $$ = $1 +',\n'+$3;
        }
    | ValStatement
        {
            $$ = $1;
        }
;

ValStatement
    : IDENT ':' Type
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"tipoExpresion\":['+$3+'],\"name\":\"'+$1+'\",\"ValExpression\":[]}';
        }
    | IDENT
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"tipoExpresion\":[],\"name\":\"'+$1+'\",\"ValExpression\":[]}';
        }
    | IDENT ArrayList ':' Type
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variableArray\",\"tipoExpresion\":['+$4+'],\"name\":\"'+$1+'\",\"ValExpression\":[],\"ArrayLength\":['+$2+']}';
        }
    | IDENT  ':' Type ArrayList
            {
                $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variableArray\",\"tipoExpresion\":['+$4+'],\"name\":\"'+$1+'\",\"ValExpression\":[],\"ArrayLength\":['+$3+']}';
            }
    | IDENT ArrayList
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variableArray\",\"tipoExpresion\":[],\"name\":\"'+$1+'\",\"ValExpression\":[],\"ArrayLength\":['+$2+']}';
        }
    | IDENT ':' Type initialNo
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"tipoExpresion\":['+$3+'],\"name\":\"'+$1+'\",\"ValExpression\":['+$4+']}';
        }
    | IDENT  initialNo
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"tipoExpresion\":[],\"name\":\"'+$1+'\",\"ValExpression\":['+$2+']}';
        }
    | IDENT ArrayList ':' Type initialNo
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variableArray\",\"tipoExpresion\":['+$4+'],\"name\":\"'+$1+'\",\"ValExpression\":['+$5+'],\"ArrayLength\":['+$2+']}';
        }
    | IDENT  ':' Type ArrayList initialNo
            {
                $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variableArray\",\"tipoExpresion\":['+$4+'],\"name\":\"'+$1+'\",\"ValExpression\":['+$5+'],\"ArrayLength\":['+$3+']}';
            }
    | IDENT ArrayList initialNo
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variableArray\",\"tipoExpresion\":[],\"name\":\"'+$1+'\",\"ValExpression\":['+$3+'],\"ArrayLength\":['+$2+']}';
        }
;

ValStatement1
    : TypeV IDENT ':' Type initialNo
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"tipoExpresion\":['+$3+'],\"tipo\":['+$1+'],\"name\":\"'+$2+'\",\"ValExpression\":['+$5+']}';
        }
    | TypeV IDENT  initialNo
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"tipoExpresion\":[],\"tipo\":['+$1+'],\"name\":\"'+$2+'\",\"ValExpression\":['+$3+']}';
        }

;

initialNo
    : AssignmentOperator AssignmentExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"operator\":['+$1+'],\"Expression\":['+$2+']}';
    }
;

AssignmentOperator
    : '='
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"v\":\"'+$1+'\"}';
    }
    | '+='
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"v\":\"'+$1+'\"}';
    }
    | '-='
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"v\":\"'+$1+'\"}';
    }
    | '*='
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"v\":\"'+$1+'\"}';
    }
    | '/='
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"v\":\"'+$1+'\"}';
    }
    | '^='
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"v\":\"'+$1+'\"}';
    }
    | '%='
     {
         $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"v\":\"'+$1+'\"}';
     }
;

FunctionExpr
    : FUNCTION '(' ')' OPENBRACE Source1 CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"\",\"type\":[],\"params\":[],\"body\":['+$5+']}';
    }
    | FUNCTION '(' ParameterList ')' OPENBRACE Source1 CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"\",\"type\":[],\"params\":['+$3+'],\"body\":['+$6+']}';
    }
    | FUNCTION IDENT '(' ')' OPENBRACE Source1 CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":[],\"params\":[],\"body\":['+$6+']}';
    }
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE Source1 CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":[],\"params\":['+$4+'],\"body\":['+$7+']}';
    }
    | FUNCTION '(' ')' OPENBRACE  CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"\",\"type\":[],\"params\":[],\"body\":[]}';
    }
    | FUNCTION '(' ParameterList ')' OPENBRACE  CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"\",\"type\":[],\"params\":['+$3+'],\"body\":[]}';
    }
    | FUNCTION IDENT '(' ')' OPENBRACE  CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":[],\"params\":[],\"body\":[]}';
    }
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE  CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":[],\"params\":['+$4+'],\"body\":[]}';
    }
;

Function_statements
    : FUNCTION IDENT '(' ')' OPENBRACE Source1 CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":[],\"params\":[],\"body\":['+$6+']}';
    }
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE Source1 CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":[],\"params\":['+$4+'],\"body\":['+$7+']}';
    }
    | FUNCTION IDENT '(' ')' ':' Type OPENBRACE Source1 CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":['+$6+'],\"params\":[],\"body\":['+$8+']}';
    }
    | FUNCTION IDENT '(' ParameterList ')' ':' Type OPENBRACE Source1 CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":['+$7+'],\"params\":['+$4+'],\"body\":['+$9+']}';
    }
    | FUNCTION IDENT '(' ')' OPENBRACE  CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":[],\"params\":[],\"body\":[]}';
    }
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE  CLOSEBRACE
    {
         $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":[],\"params\":['+$4+'],\"body\":[]}';
     }
    | FUNCTION IDENT '(' ')' ':' Type OPENBRACE  CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":['+$6+'],\"params\":[],\"body\":[]}';
    }
    | FUNCTION IDENT '(' ParameterList ')' ':' Type OPENBRACE  CLOSEBRACE
    {
         $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"funcion\",\"name\":\"'+$2+'\",\"type\":['+$7+'],\"params\":['+$4+'],\"body\":[]}';
    }
;

Continue_statements
    : CONTINUE ';'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"continue\"}';
    }
    | CONTINUE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"continue\"}';
    }
    /*
    | CONTINUE Expr ';'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"continue\", \"Expression\":['+$2+']}';
    }
    | CONTINUE Expr error
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"\"}';
    }*/
;

Break_statements
    : BREAK ';'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"break\"}';
    }
    | BREAK
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"break\"}';
    }
    /*
    | BREAK IDENT ';'
    | BREAK IDENT error
    */
;

Return_statements
    : RETURN ';'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"return\", \"Expression\":[]}';
    }
    | RETURN
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"return\", \"Expression\":[]}';
        }
    | RETURN Expr ';'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"return\", \"Expression\":['+$2+']}';
    }
    | RETURN Expr
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"return\", \"Expression\":['+$2+']}';
        }
;

Switch_statements
    : SWITCH '(' Expr ')' CaseBlock
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"switch\",\"Expression\":['+$3+'],\"values\":['+$5+']}';
    }
    ;

CaseBlock
    : OPENBRACE CaseClausesOpt CLOSEBRACE
    {
        $$ = $2;
    }
;

CaseClausesOpt
    :
    | CaseClauses1
    {
        $$ = $1;
    }
;

CaseClauses
    : CaseClause CaseClauses1
    {
        $$ = $1 +',\n'+ $2;
    }
;

CaseClauses1
    : CaseClause CaseClauses1
    {
        $$ = $1 +',\n'+$2;
    }
    | CaseClause
    {
        $$ = $1;
    }
;

CaseClause
    : CASE Expr ':'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"case\",\"Expression\":['+$2+'],\"body\":[]}';
    }
    | CASE Expr ':' Source1
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"case\",\"Expression\":['+$2+'],\"body\":['+$4+']}';
    }
    | DEFAULT ':'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"default\",\"Expression\":[],\"body\":[]}';
    }

    | DEFAULT ':' Source1
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"default\",\"Expression\":[],\"body\":['+$3+']}';
    }
;

DefaultClause
    : DEFAULT ':'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"default\",\"Expression\":[],\"body\":[]}';
    }

    | DEFAULT ':' Source1
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"default\",\"Expression\":[],\"body\":['+$3+']}';
    }
;

If_statements
    : IF '(' Expr ')' Statement %prec IF_WITHOUT_ELSE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"if\",\"Expression\":['+$3+'],\"body\":['+$5+'], \"else\":[]}';
    }
    | IF '(' Expr ')' Statement ELSE Statement
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"if\",\"Expression\":['+$3+'],\"body\":['+$5+'], \"else\":['+$7+']}';
    }
;
Iteration_statements
    : DO Statement WHILE '(' Expr ')' ';'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"dowhile\",\"body\":['+$2+'],\"Expression\":['+$5+']}';
    }
    | DO Statement WHILE '(' Expr ')'
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"dowhile\",\"body\":['+$2+'],\"Expression\":['+$5+']}';
        }
    | WHILE '(' Expr ')' Statement
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"while\",\"body\":['+$5+'],\"Expression\":['+$3+']}';
    }
  /*  | FOR '(' ExprNoInOpt ';' ExprOpt ';' ExprOpt ')' Statement
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"for\",\"ExpresionInitial\":['+$3+'],\"Expressionvalue\":['+$5+'],\"ExpressionFinal\":['+$7+'],\"body\":['+$9+']}';
    }*/
    | FOR '(' ValStatement1 ';' ExprOpt ';' ExprOpt ')' Statement
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"for\",\"ExpresionInitial\":['+$3+'],\"Expressionvalue\":['+$5+'],\"ExpressionFinal\":['+$7+'],\"body\":['+$9+']}';
    }
    | FOR '(' LeftHandSideExpr INTOKEN Expr ')' Statement
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"forin\",\"ExpresionInitial\":['+$3+'],\"Expressionvalue\":['+$5+'],\"body\":['+$7+']}';
    }
    | FOR '(' TypeV IDENT INTOKEN Expr ')' Statement
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"forin\",\"ExpresionInitial\":[{\"tipo\":['+$3+'],\"name\":\"'+$4+'\"}],\"Expressionvalue\":['+$6+'],\"body\":['+$8+']}';
    }
    | FOR '(' LeftHandSideExpr OFTOKEN Expr ')' Statement
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"forof\",\"ExpresionInitial\":['+$3+'],\"Expressionvalue\":['+$5+'],\"body\":['+$7+']}';
    }
    | FOR '(' TypeV IDENT OFTOKEN Expr ')' Statement
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"forof\",\"ExpresionInitial\":[{\"tipo\":['+$3+'],\"name\":\"'+$4+'\"}],\"Expressionvalue\":['+$6+'],\"body\":['+$8+']}';
    }
;

ExprOpt
    :
    | Expr
    {
        $$ = $1;
    }
    ;

ExprNoInOpt
    :
    | ExprNoIn
    {
        $$ = $1;
    }
    ;

Expr
    : AssignmentExpr
    {
        $$ = $1;
    }
    | Expr ',' AssignmentExpr
    {
        $$ = $1 +',\n'+$3;
    }
;

ExprNoIn
    : AssignmentExprNoIn
    {
        $$ = $1;
    }
    | ExprNoIn ',' AssignmentExprNoIn
    {
        $$ = $1 +',\n'+$3;
    }
;

ExprNB
    : AssignmentExprNoBF
    {
        $$ = $1;
    }
    | ExprNB ',' AssignmentExprNoBF
    {
        $$ = $1 +',\n'+$3;
    }
;

ParameterList
    : Parameter ',' ParameterList
    {
        $$ = $1+',\n'+$3;
    }
    | Parameter
    {
        $$ = $1;
    }
;

Parameter
    : IDENT ':' Type
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"parameter\",\"name\":\"'+$1+'\",\"tipo\":['+$3+']}';
    }
    | IDENT
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"parameter\",\"name\":\"'+$1+'\",\"tipo\":[]}';
    }
;

TypeV
    : STRING
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"string\"}';
        }
    | NUMBERS
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"number\"}';
        }
    | BOOLEAN
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"boolean\"}';
        }
    | VOID
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"void\"}';
        }
    | VAR
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"var\"}';
        }
    | CONST
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"const\"}';
        }
    | TYPE
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"type\"}';
        }
    | IDENT
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"'+$1+'\"}';
        }
    | LET
        {
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"let\"}';
        }
;

Type
    : TypeV ArrayList
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":['+$1+'],\"size\":['+$2+']}';
    }
    | TypeV
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":['+$1+'],\"size\":[]}';
    }
;

ArrayList
    : Array ArrayList1
    {
        $$ = $1+',\n'+$2;
    }
    | Array
    {
        $$ =$1;
    }
;
ArrayList1
    : Array ArrayList1
    {
        $$ = $1+',\n'+$2;
    }
    | Array
    {
        $$ = $1;
    }
    | EOF
    {
       $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"\"}';
    }
;

Array
    : '[' ']'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"arreglo\",\"value\":[]}';
    }
;
/*
ArrayLiteral
    : Array
    {
        $$ = $1;
    }
    | '[' Elements ']'
    {
         $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"array\",\"elementos\":['+$2+']}';
    }
;*/

Elements
    : Element ',' Elements
    {
        $$ = $1+',\n'+$3;
    }
    | Element
    {
        $$ = $1;
    }
;

Element
    : Expr
    {
        $$ = $1;
    }
;

Literal
    : NULLTOKEN
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"null\", \"value\":\"null\"}';
    }
    | TRUETOKEN
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"boolean\", \"value\":\"'+$1+'\"}';
    }
    | FALSETOKEN
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"boolean\", \"value\":\"'+$1+'\"}';
    }
    | NUMBER
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"number\", \"value\":\"'+$1+'\"}';
    }
    | CADENA
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"string1\", \"value\":\"'+$1+'\"}';
    }
    | CADENA1
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"string2\", \"value\":\"'+$1+'\"}';
    }
    | CADENA2
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"tipo\":\"string3\", \"value\":\"'+$1+'\"}';
    }
;

Property
    : IDENT ':' AssignmentExpr
    {
       $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"atributo\",\"name\":\"'+$1+'\", \"tipo\":[],\"valor\":['+$3+']}';
    }
    |  IDENT ':' TypeV
           {
               $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"atributo\",\"name\":\"'+$1+'\", \"tipo\":['+$3+'],\"valor\":[]}';
           }
    | EOF
        {
           $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"\"}';
        }
    ;

PropertyList
    : Property
    {
        $$ = $1;
    }
    | Property ',' PropertyList
    {
        $$ = $1 +',\n'+$3
    }
    ;

PrimaryExpr
    : PrimaryExprNoBrace
    {
        $$ = $1;
    }
    | OPENBRACE CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"typebody\",\"values\":[]}';
    }
    | OPENBRACE PropertyList CLOSEBRACE
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"typebody\",\"values\":['+$2+']}';
    }
;

PrimaryExprNoBrace
    : Literal
    {
        $$ = $1;
    }
    | ArrayLiteral
    {
        $$ = $1;
    }
    | IDENT
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$1+'\"}';
    }
    | '(' Expr ')'
    {
        $$ = $2;
    }
    | Expr1_statements
    {
        $$ = $1;
    }
;

Expr1_statements
    : IDENT Expr1_statement
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callAtributo\", \"value\":\"'+$1+'\", \"hijo\":['+$2+']}';
    }
    | IDENT  PLUSPLUS
    {
        var m = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$1+'\",\"hijo\":[]}';
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"postincrement1\",\"padre\":['+m+']}';
    }
    | IDENT  MINSMINS
    {
        var m = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$1+'\",\"hijo\":[]}';
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"postdecrement1\",\"padre\":['+m+']}';
    }
    | MINSMINS IDENT
    {
            var m = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$2+'\",\"hijo\":[]}';
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"predecrement1\",\"padre\":['+m+']}';
    }
    | PLUSPLUS IDENT
    {
            var m = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$2+'\",\"hijo\":[]}';
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"preincrement1\",\"padre\":['+m+']}';
    }
    | IDENT Expr1_statement PLUSPLUS
    {
            var m ='{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$1+'\", \"hijo\":['+$2+']}';
            $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"postincrement1\",\"padre\":['+m+']}';
    }
    | IDENT Expr1_statement MINSMINS
    {
                var m ='{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$1+'\", \"hijo\":['+$2+']}';
                $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"postdecrement1\",\"padre\":['+m+']}';
    }
    | MINSMINS IDENT Expr1_statement
    {
                    var m ='{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$2+'\", \"hijo\":['+$3+']}';
                    $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"predecrement1\",\"padre\":['+m+']}';
    }
    | PLUSPLUS IDENT Expr1_statement
    {
                    var m ='{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$2+'\", \"hijo\":['+$3+']}';
                    $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"preincrement1\",\"padre\":['+m+']}';
    }
    | IDENT '.' POP '(' ')'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"nativeArray\", \"name\":\"'+$1+'\", \"hijo\":[],\"native\":\"pop\"}';
    }
    | IDENT '.' LENGTH
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"nativeArray\", \"name\":\"'+$1+'\" ,\"hijo\":[],\"native\":\"length\"}';
    }
    | IDENT '.' PUSH '(' Expr ')'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"nativeArray\", \"name\":\"'+$1+'\" ,\"hijo\":[],\"native\":\"push\",\"value\":['+$5+']}';
    }
    | IDENT Expr1_statement '.' POP '(' ')'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"nativeArray\", \"name\":\"'+$1+'\", \"hijo\":['+$2+'],\"native\":\"pop\"}';
    }
    | IDENT Expr1_statement '.' LENGTH
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"nativeArray\", \"name\":\"'+$1+'\" ,\"hijo\":['+$2+'],\"native\":\"length\"}';
    }
    | IDENT Expr1_statement '.' PUSH '(' Expr ')'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"nativeArray\", \"name\":\"'+$1+'\" ,\"hijo\":['+$2+'],\"native\":\"push\",\"value\":['+$6+']}';
    }
    | IDENT Expr1_statement initialNo ';'
        {
             $$ =  '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"asignation\",\"variable\":\"'+$1+'\",\"params\":['+$2+'],\"ValExpression\":['+$3+']}';
        }
    | IDENT Expr1_statement initialNo
        {
            $$ =  '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"asignation\",\"variable\":\"'+$1+'\",\"params\":['+$2+'],\"ValExpression\":['+$3+']}';
        }
;

ArrayLiteral
    : '[' ']'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"arreglo\",\"value\":[]}';
    }
    | '[' ElementList ']'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"arreglo\",\"value\":['+$2+']}';
    }
/*
    | IDENT '[' ElementList ']'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callMatriz\", \"name\":\"'+$1+'\" ,\"padre\":[],\"posicion\":['+$3+']}';
    }

    | IDENT ArrayLiterals initialNo
    {
        $$ =  '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"asignation\",\"variable\":\"'+$1+'\",\"params\":['+$3+'],\"ValExpression\":['+$3+']}';
    }*/
;
ArrayLiterals
    : '[' ElementList ']' ArrayLiterals
    {
        $$ = $2 + ',' + $4;
    }
    | '[' ElementList ']'
    {
        $$ = $2;
    }
;

ElementList
    : AssignmentExpr
    {
        $$ = $1;
    }
    | ElementList ',' AssignmentExpr
    {
        $$ = $1 +',\n'+ $3;
    }
;


MemberExpr
    : PrimaryExpr
    {
        $$ = $1;
    }
    | FunctionExpr
    {
        $$ = $1;
    }
    | MemberExpr '[' Expr ']'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callMatriz\", \"padre\":['+$1+'],\"posicion\":['+$3+']}';
    }
    | MemberExpr '.' IDENT
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callAtributo\", \"padre\":['+$1+'],\"atributo\":\"'+$3+'\"}';
    }
;

MemberExprNoBF
    : PrimaryExprNoBrace
    {
        $$ = $1;
    }
    | MemberExprNoBF '[' Expr ']'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callMatriz\", \"padre\":['+$1+'],\"posicion\":['+$3+']}';
    }
    | MemberExprNoBF '.' IDENT
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callAtributo\", \"padre\":['+$1+'],\"atributo\":\"'+$3+'\"}';
    }
    ;



CallExpr
    : IDENT
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$1+'\"}';
    }
    | CallExpr Arguments
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callFuncion\",\"padre\":['+$1+'],\"argumentos\":['+$2+']}';
    }
    | CallExpr '[' Expr ']'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callMatriz\", \"padre\":['+$1+'],\"posicion\":['+$3+']}';
    }
    | CallExpr '.' IDENT
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callAtributo\", \"padre\":['+$1+'],\"atributo\":\"'+$3+'\"}';
    }

    ;

CallExprNoBF
    : IDENT
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"variable\",\"value\":\"'+$1+'\"}';
    }
    | CallExprNoBF Arguments
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callFuncion\",\"padre\":['+$1+'],\"argumentos\":['+$2+']}';
    }
    | CallExprNoBF '[' Expr ']'
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callMatriz\", \"padre\":['+$1+'],\"posicion\":['+$3+']}';
    }
    | CallExprNoBF '.' IDENT
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"callAtributo\", \"padre\":['+$1+'],\"atributo\":\"'+$3+'\"}';
    }
    ;

Arguments
    : '(' ')'
    {
        $$ = '';
    }
    | '(' ArgumentList ')'
    {
        $$ = $2;
    }
    ;

ArgumentList
    : AssignmentExpr
    {
        $$ = $1;
    }
    | ArgumentList ',' AssignmentExpr
    {
        $$ = $1 +',\n'+ $3;
    }
    ;

LeftHandSideExpr
    : MemberExpr
    {
        $$ = $1;
    }
    | CallExpr
    {
        $$ = $1;
    }
    ;

LeftHandSideExprNoBF
    : MemberExpr
    {
        $$ =$1;
    }
    | CallExprNoBF
    {
        $$ = $1;
    }
    ;

PostfixExpr
    : LeftHandSideExpr
    {
        $$ = $1;
    }
    ;

PostfixExprNoBF
    : LeftHandSideExprNoBF
    {
        $$ = $1;
    }
    ;

UnaryExprCommon
    : '+' UnaryExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"positivo\",\"Expression\":['+$2+']}';
    }
    | '-' UnaryExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"negativo\",\"Expression\":['+$2+']}';
    }
    | '!' UnaryExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"logical\",\"logical\":\"not\",\"Expression\":['+$2+']}';
    }
    ;

UnaryExpr
    : PostfixExpr
    {
        $$ = $1;
    }
    | UnaryExprCommon
    {
        $$ = $1;
    }
    ;

UnaryExprNoBF
    : PostfixExprNoBF
    {
        $$ = $1;
    }
    | UnaryExprCommon
    {
        $$ = $1;
    }
    ;

MultiplicativeExpr
    : UnaryExpr
    {
        $$ = $1;
    }
    | MultiplicativeExpr '*' UnaryExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | MultiplicativeExpr '/' UnaryExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | MultiplicativeExpr POTENCIA UnaryExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | MultiplicativeExpr '%' UnaryExpr
    {
         $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

MultiplicativeExprNoBF
    : UnaryExprNoBF
    {
        $$ = $1;
    }
    | MultiplicativeExprNoBF '*' UnaryExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | MultiplicativeExprNoBF '/' UnaryExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | MultiplicativeExprNoBF POTENCIA UnaryExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | MultiplicativeExprNoBF '%' UnaryExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

AdicionExpr
    : MultiplicativeExpr
    {
        $$ = $1;
    }
    | AdicionExpr '+' MultiplicativeExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | AdicionExpr '-' MultiplicativeExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

AdicionExprNoBF
    : MultiplicativeExprNoBF
    {
        $$ = $1;
    }
    | AdicionExprNoBF '+' MultiplicativeExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | AdicionExprNoBF '-' MultiplicativeExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Aritmetic\",\"Aritmetic\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

RelacionalExpr
    : AdicionExpr
    {
        $$ = $1;
    }
    | RelacionalExpr '<' AdicionExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | RelacionalExpr '>' AdicionExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

RelacionalExprNoIn
    : AdicionExpr
    {
        $$ = $1;
    }
    | RelacionalExprNoIn '<' AdicionExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | RelacionalExprNoIn '>' AdicionExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

RelacionalExprNoBF
    : AdicionExprNoBF
    {
        $$ = $1;
    }
    | RelacionalExprNoBF '<' AdicionExprNoBF
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | RelacionalExprNoBF '>' AdicionExprNoBF
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

IgualdadExpr
    : RelacionalExpr
    {
        $$ = $1;
    }
    | IgualdadExpr EQQ RelacionalExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | IgualdadExpr NOEQQ RelacionalExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | IgualdadExpr MAQ RelacionalExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | IgualdadExpr MIQ RelacionalExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

IgualdadExprNoIn
    : RelacionalExprNoIn
    {
        $$=$1;
    }
    | IgualdadExprNoIn EQQ RelacionalExprNoIn
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | IgualdadExprNoIn NOEQQ RelacionalExprNoIn
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | IgualdadExprNoIn MAQ RelacionalExprNoIn
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | IgualdadExprNoIn MIQ RelacionalExprNoIn
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

IgualdadExprNoBF
    : RelacionalExprNoBF
    {
        $$ = $1;
    }
    | IgualdadExprNoBF EQQ RelacionalExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | IgualdadExprNoBF NOEQQ RelacionalExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | IgualdadExprNoBF MAQ RelacionalExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    | IgualdadExprNoBF MIQ RelacionalExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Relational\",\"Relational\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;


LogicaYYExpr
    : IgualdadExpr
    {
        $$ = $1;
    }
    | LogicaYYExpr AND IgualdadExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Logical\",\"Logical\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

LogicaYYExprNoIn
    : IgualdadExprNoIn
    {
        $$ = $1;
    }
    | LogicaYYExprNoIn AND IgualdadExprNoIn
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Logical\",\"Logical\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

LogicaYYExprNoBF
    : IgualdadExprNoBF
    {
        $$ =$1;
    }
    | LogicaYYExprNoBF AND IgualdadExprNoBF
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Logical\",\"Logical\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

LogicaOOExpr
    : LogicaYYExpr
    {
        $$ = $1;
    }
    | LogicaOOExpr OR LogicaYYExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Logical\",\"Logical\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

LogicaOOExprNoIn
    : LogicaYYExprNoIn
    {
        $$ =$1;
    }
    | LogicaOOExprNoIn OR LogicaYYExprNoIn
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Logical\",\"Logical\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

LogicaOOExprNoBF
    : LogicaYYExprNoBF
    {
        $$ = $1;
    }
    | LogicaOOExprNoBF OR LogicaYYExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"Logical\",\"Logical\":\"'+$2+'\",\"Expression1\":['+$1+'],\"Expression2\":['+$3+']}';
    }
    ;

CondicionTernariaExpr
    : LogicaOOExpr
    {
        $$ = $1;
    }
    | LogicaOOExpr '?' AssignmentExpr ':' AssignmentExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"ternario\",\"valueExpression\":['+$1+'],\"Expression1\":['+$3+'],\"Expression2\":['+$5+']}';
    }
    ;

CondicionTernariaExprNoIn
    : LogicaOOExprNoIn
    {
        $$ =$1;
    }
    | LogicaOOExprNoIn '?' AssignmentExprNoIn ':' AssignmentExprNoIn
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"ternario\",\"valueExpression\":['+$1+'],\"Expression1\":['+$3+'],\"Expression2\":['+$5+']}';
    }
    ;

CondicionTernariaExprNoBF
    : LogicaOOExprNoBF
    {
        $$ =$1;
    }
   /* | LogicaOOExprNoBF '?' AssignmentExpr ':' AssignmentExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"ternario\",\"valueExpression\":['+$1+'],\"Expression1\":['+$3+'],\"Expression2\":['+$5+']}';
    }*/
    ;

AssignmentExpr
    : CondicionTernariaExpr
    {
        $$ =$1;
    }
 /*   | LeftHandSideExpr AssignmentOperator AssignmentExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"asignation\",\"name\":['+$1+'],\"operator\":['+$2+'],\"Expression\":['+$3+']}';
    }*/
    ;

AssignmentExprNoIn
    : CondicionTernariaExprNoIn
    {
        $$ =$1;
    }
 /*   | LeftHandSideExpr AssignmentOperator AssignmentExprNoIn
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"asignation\",\"name\":['+$1+'],\"operator\":['+$2+'],\"Expression\":['+$3+']}';
    }*/
    ;

AssignmentExprNoBF
    : CondicionTernariaExprNoBF
    {
        $$=$1;
    }
 /*   | LeftHandSideExprNoBF AssignmentOperator AssignmentExpr
    {
        $$ = '{\"linea\":\"'+(yylineno+1)+'\",\"statement\":\"asignation\",\"name\":['+$1+'],\"operator\":['+$2+'],\"Expression\":['+$3+']}';
    }*/
    ;
