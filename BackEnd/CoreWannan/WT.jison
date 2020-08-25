//  UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
//  JOSE ORLANDO WANNAN ESCOBAR - 2020
//  GRAMATICA RECURSIVIDAD POR LA IZQUIERDA


// ANALISIS LEXICO
%lex
%options case-insensitive
%%
"//".*                          /* ignore comment*/
"/*".*                          /* ignore c-style comment*/
\s+                             /* skip whitespace */
\r                              /* skip retorno de carro */
\n                              /* skip salto linea */
\t                              /* skip tabulacion */
"null"                          return 'NULLTOKEN'
"true"                          return 'TRUETOKEN'
"false"                         return 'FALSETOKEN'

"const"                         return 'CONST'
"let"                           return 'LET'
"var"                           return 'VAR'
"number"                        return 'NUMBER'
"boolean"                       return 'BOOLEAN'
"string"                        return 'STRING'
"void"                          return 'VOID'
"type"                          return 'TYPE'

"case"                          return 'CASE'
"switch"                        return 'SWITCH'
"function"                      return 'FUNCTION'
"if"                            return 'IF'
"Do"                            return 'DO'
"While"                         return 'WHILE'
"else"                          return 'ELSE'
"for"                           return 'FOR'
"of"                            return 'OF'
"in"                            return 'IN'

"Push"                          return 'PUSH'
"Pop"                           return 'POP'
"Length"                        return 'LENGTH'


[a-zA-Z_\$][a-zA-Z0-9_\$]*      return 'IDENT'
[0-9]+("."[0-9]+)?\b            return 'NUMBER';
\"[^\"]*\"				        { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\´[^\´]*\´                      { yytext = yytext.substr(1,yyleng-2); return 'CADENA1'; }
\'[^\']*\'                      { yytext = yytext.substr(1,yyleng-2); return 'CADENA2'; }

'/'                             return '/'
'/='                            return 'DIVEQUAL'
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

<<EOF>>                         return 'EOF';
.                               { console.error('Error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column+';'); }

/lex

// OPERATORS PRECEDENCE

%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS


%nonassoc IF_WITHOUT_ELSE
%nonassoc ELSE

%start S

%%

// ANALISIS SINTACTICO

S
    : Source
    | EOF
;

Source
    : Statement Source1
;

Source1
    : Statement
    |  Statement Source1
    | EOF
;

Statement
    : Declaration_statements
    | Assignation_statements
    | Function_statements
    | Control_statements
    | Native_statements
    | Block_statements
    | Iteration_statements
    | Break_statements
    | Continue_statements
    | Switch_statements
    | Empty_statements
;

Empty_statements
    : ';'
;

Block_statements
    : OPENBRACE CLOSEBRACE
    | OPENBRACE Source CLOSEBRACE
;


Declaration_statements
    : TypeV IDENT '=' PrimExpresions ';'
    | TypeV IDENT '=' PrimExpresions error
;

Assignation_statements
    : IDENT '=' PrimExpresions ';'
    | IDENT '=' PrimExpresions error
;

Function_Expr
    : FUNCTION '(' ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION '(' ParameterList ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE Source1 CLOSEBRACE
;

Function_statements
    : FUNCTION IDENT '(' ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ')' ':' TypeV OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' ':' TypeV OPENBRACE Source1 CLOSEBRACE
;

If_statements
    : IF '(' Expr ')' Statement %prec IF_WITHOUT_ELSE
    | IF '(' Expr ')' Statement ELSE Statement
;
Iteration_statements
    : DO Statement WHILE '(' Expr ')' ';'
    | DO Statement WHILE '(' Expr ')' error
    | WHILE '(' Expr ')' Statement
    | FOR '(' ExprNoInOpt ';' ExprOpt ';' ExprOpt ')' Statement
    | FOR '(' VAR IDENT '=' ';' ExprOpt ';' ExprOpt ')' Statement
    | FOR '(' LeftHandSideExpr INTOKEN Expr ')' Statement
    | FOR '(' VAR IDENT INTOKEN Expr ')' Statement
    | FOR '(' VAR IDENT InitializerNoIn INTOKEN Expr ')' Statement
;

ExprOpt
    :
    | Expr
;

ExprNoInOpt
    :
    | ExprNoIn
;

Continue_statements
    : CONTINUE ';'
    | CONTINUE error
    | CONTINUE IDENT ';'
    | CONTINUE IDENT error
;

Break_statements
    : BREAK ';'
    | BREAK error
    | BREAK IDENT ';'
    | BREAK IDENT error
;

Return_statements
    : RETURN ';'
    | RETURN error
    | RETURN Expr ';'
    | RETURN Expr error
;

Switch_statements
    : SWITCH '(' Expr ')' CaseBlock
    ;

CaseBlock
    : OPENBRACE CaseClausesOpt CLOSEBRACE
    | OPENBRACE CaseClausesOpt DefaultClause CaseClausesOpt CLOSEBRACE
;

CaseClausesOpt
    :
    | CaseClauses
;

CaseClauses
    : CaseClause
    | CaseClauses CaseClause
;

CaseClause
    : CASE Expr ':'
    | CASE Expr ':' SourceElements
;

DefaultClause
    : DEFAULT ':'
    | DEFAULT ':' SourceElements
;

ParameterList
    : Parameters ',' ParameterList
    | Parameters
;


Parameters
    : Parameter
    | EOF
;

Parameter
    : IDENT ':' TypeV
    | IDENT
;

TypeV
    : STRING
    | NUMBER
    | BOOLEAN
    | VOID
    | VAR
    | LET
    | CONST
    | TYPE
;

PrimExpresions
    : Literal
    | IDENT
    | ArrayLiteral
    | NativeArray
    | Expr
;

ArrayLiteral
    : '[' ']'
    | '[' Elements ']'
;

Elements
    : Element Elements1
;

Elements1
    : ',' Element Elements1
    | EOF
;

Element
    : Literal
    | IDENT
    | Expr
;

NativeArray
    : IDENT '.' POP '(' Element ')'
    | IDENT '.' PUSH '(' ')'
    | IDENT '.' LENGTH
;

Literal
    : NULLTOKEN
    | TRUETOKEN
    | FALSETOKEN
    | NUMBER
    | CADENA
    | CADENA1
    | CADENA2
;

Expr
    : ArichmeticExpr
    | RelationalExpr
    | LogicalExpr
    | TernaryExpr
;
