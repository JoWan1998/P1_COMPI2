//  UNIVERSIDAD DE SAN CARLOS DE GUATEMALA
//  JOSE ORLANDO WANNAN ESCOBAR - 2020
//  GRAMATICA RECURSIVIDAD POR LA IZQUIERDA


// ANALISIS LEXICO
%lex
%options case-insensitive
%%
"//".*                          /* ignore comment*/
"/*"[^"*/"]* "*/"                         /* ignore c-style comment*/
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
"number"                        return 'NUMBER'
"boolean"                       return 'BOOLEAN'
"string"                        return 'STRING'
"void"                          return 'VOID'
"type"                          return 'TYPE'

'console'                       return 'CONSOLE'
'log'                           return 'LOG'
'graficar_ts'                   return 'GRAHPTS'

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

"Push"                          return 'PUSH'
"Pop"                           return 'POP'
"Length"                        return 'LENGTH'

"||"                            return 'OR'
"&&"                            return 'AND'
"!"                             return 'NOT'

"=="                            return 'EQQ'
"!="                            return 'NOEQQ'
">="                            return 'MAQ'
"<="                            return 'MIQ'
">"                             return 'MA'
"<"                             return 'MI'

"++"                            return "PLUSPLUS"
"--"                            return "MINSMINS"

"+"                             return '+'
"-"                             return '-'
"*"                             return '*'
"/"                             return '/'
"^"                             return "^"
"%"                             return "%"




[a-zA-Z_\$][a-zA-Z0-9_\$]*      return 'IDENT'
[0-9]+("."[0-9]+)?\b            return 'NUMBER';
\"[^\"]*\"				              { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\´[^\´]*\´                      { yytext = yytext.substr(1,yyleng-2); return 'CADENA1'; }
\'[^\']*\'                      { yytext = yytext.substr(1,yyleng-2); return 'CADENA2'; }


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
    | If_statements
    | Iteration_statements
    | Break_statements
    | Continue_statements
    | Switch_statements
    | Expr_statements
    | Empty_statements
;

SourceF
    :  StatementF
    |  StatementF SourceF
    | EOF
;

StatementF
    : Declaration_statements
    | Assignation_statements
    | Control_statements
    | Native_statements
    | Block_statementsF
    | If_statements
    | Iteration_statements
    | Break_statements
    | Continue_statements
    | Switch_statements
    | Expr_statements
    | Empty_statements
;

Native_statements
    : CONSOLE '.' LOG '(' Expr ')' ';'
    | GRAHPTS '(' ')' ';'
;

Expr_statements
    : ExprNB ';'
    | ExprNB error
;

Empty_statements
    : ';'
;

Block_statements
    : OPENBRACE CLOSEBRACE
    | OPENBRACE Source1 CLOSEBRACE
;
Block_statementsF
    : OPENBRACE CLOSEBRACE
    | OPENBRACE Source1 CLOSEBRACE
;

Declaration_statements
    : TypeV ValStatement ';'
    | TypeV ValStatement error
;

Assignation_statements
    : IDENT initialNo ';'
    | IDENT initialNo error
;

ValStatement
    : IDENT
    | IDENT initialNo
;

initialNo
    : '=' AssignmentExpr
;

Function_Expr
    : FUNCTION '(' ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION '(' ParameterList ')' OPENBRACE SourceF CLOSEBRACE
    | FUNCTION IDENT '(' ')' OPENBRACE SourceF CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE SourceF CLOSEBRACE
;

Function_statements
    : FUNCTION IDENT '(' ')' OPENBRACE SourceF CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE SourceF CLOSEBRACE
    | FUNCTION IDENT '(' ')' ':' TypeV OPENBRACE SourceF CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' ':' TypeV OPENBRACE SourceF CLOSEBRACE
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
    | FOR '(' ExprNo ';' ExprOpt ';' ExprOpt ')' Statement
    | FOR '(' LeftHandSideExpr INTOKEN Expr ')' Statement
    | FOR '(' VAR IDENT INTOKEN Expr ')' Statement
    | FOR '(' LeftHandSideExpr OFTOKEN Expr ')' Statement
    | FOR '(' VAR IDENT OFTOKEN Expr ')' Statement
;
ExprNo
    : TypeV IDENT initialNo
;

ExprOpt
    :
    | Expr
;

ExprNoInOpt
    :
    | ExprNoIn
;

ExprNoIn
    : AssignmentExprNoIn
;

AssignmentExprNoIn
    : ConditionalExpr
    | LeftHandSideExpr '=' AssignmentExprNoIn
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
    : Parameter ',' ParameterList
    | Parameter
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
    | IDENT
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
    : AssignmentExpr
;

ConditionalExpr
    : LORExpr
    | LORExpr '?' AssignmentExpr ':' AssignmentExpr
;

AssignmentExpr
    : ConditionalExpr
;

LORExpr
    : LANDExpr
    | LORExpr OR LANDExpr
;

LANDExpr
    : LNOTExpr
    | LANDExpr AND LNOTExpr
;

LNOTExpr
    : REQExpr
    | NOT REQExpr
;

REQExpr
    : RNOTQExpr
    | REQExpr EQQ RNOTQExpr
;

RNOTQExpr
    : RMAYEQExpr
    | RNOTQExpr NOEQQ RMAYEQExpr
;

RMAYEQExpr
    : RMINEQExpr
    | RMAYEQExpr MAQ RMINEQExpr
;

RMINEQExpr
    : RMAYExpr
    | RMINEQExpr MIQ RMAYExpr
;

RMAYExpr
    : RMINExpr
    | RMAYExpr MA RMINExpr
;

RMINExpr
    : AADDExpr
    | RMINExpr MI AADDExpr
;

AADDExpr
    : AADDExpr '+' AMULTExpr
    | AADDExpr '-' AMULTExpr
    | AMULTExpr
;

AMULTExpr
    : AMULTExpr '*' APOTExpr
    | AMULTExpr '/' APOTExpr
    | APOTExpr
;

APOTExpr
    : APOTExpr '^' UnaryExpr
    | APOTExpr '%' UnaryExpr
    | UnaryExpr
;

UnaryExpr
    : UnaryExprC
    | PostFixExpr
;

UnaryExprC
    : '-' UnaryExpr
    | PLUSPLUS UnaryExpr
    | MINSMINS UnaryExpr
;

PostFixExpr
    : LeftHandSideExpr
    | LeftHandSideExpr PLUSPLUS
    | LeftHandSideExpr MINSMINS
;

LeftHandSideExpr
    : MemberExpr
    | CallExpr
;

MemberExpr
    : PrimaryExpr
    | FunctionExpr
    | MemberExpr '[' Expr ']'
    | MemberExpr '.' IDENT
;

CallExpr
    : MemberExpr Arguments
    | CallExpr Arguments
    | CallExpr '[' Expr ']'
    | CallExpr '.' IDENT
;

Arguments
    : '(' ')'
    | '(' ArgumentList ')'
    ;

ArgumentList
    : AssignmentExpr
    | ArgumentList ',' AssignmentExpr
;

PrimaryExpr
    : PrimaryExprNoBrace
    | OPENBRACE CLOSEBRACE
    | OPENBRACE PropertyList CLOSEBRACE
    | OPENBRACE PropertyList ',' CLOSEBRACE
    ;

PrimaryExprNoBrace
    : Expr
    | Literal
    | ArrayLiteral
    | NativeArray
    | IDENT
    | '(' Expr ')'
;

Property
    : IDENT ':' AssignmentExpr
    | IDENT IDENT '(' ')' OPENBRACE FunctionBody CLOSEBRACE
    | IDENT IDENT '(' FormalParameterList ')' OPENBRACE FunctionBody CLOSEBRACE
;

PropertyList
    : Property
    | PropertyList ',' Property
;


ExprNB
    : AssignmentExprNB
;

ConditionalExprNB
    : LORExprNB
    | LORExprNB '?' AssignmentExprNB ':' AssignmentExprNB
;

AssignmentExprNB
    : ConditionalExprNB
;

LORExprNB
    : LANDExprNB
    | LORExprNB OR LANDExprNB
;

LANDExprNB
    : LNOTExprNB
    | LANDExprNB AND LNOTExprNB
;

LNOTExprNB
    : REQExprNB
    | NOT REQExprNB
;

REQExprNB
    : RNOTQExprNB
    | REQExprNB EQQ RNOTQExprNB
;

RNOTQExprNB
    : RMAYEQExprNB
    | RNOTQExprNB NOEQQ RMAYEQExprNB
;

RMAYEQExprNB
    : RMINEQExprNB
    | RMAYEQExprNB MAQ RMINEQExprNB
;

RMINEQExprNB
    : RMAYExprNB
    | RMINEQExprNB MIQ RMAYExprNB
;

RMAYExprNB
    : RMINExprNB
    | RMAYExprNB MA RMINExprNB
;

RMINExprNB
    : AADDExprNB
    | RMINExprNB MI AADDExprNB
;

AADDExprNB
    : AADDExprNB '+' AMULTExprNB
    | AADDExprNB '-' AMULTExprNB
    | AMULTExprNB
;

AMULTExprNB
    : AMULTExprNB '*' APOTExprNB
    | AMULTExprNB '/' APOTExprNB
    | APOTExprNB
;

APOTExprNB
    : APOTExprNB '^' UnaryExprNB
    | APOTExprNB '%' UnaryExprNB
    | UnaryExprNB
;

UnaryExprNB
    : UnaryExprNBC
    | PostFixExprNB
;

UnaryExprNBC
    : '-' UnaryExprNB
    | PLUSPLUS UnaryExprNB
    | MINSMINS UnaryExprNB
;

PostFixExprNB
    : LeftHandSideExprNB
    | LeftHandSideExprNB PLUSPLUS
    | LeftHandSideExprNB MINSMINS
;

LeftHandSideExprNB
    : MemberExprNB
    | CallExprNB
;

MemberExprNB
    : PrimaryExprNoBrace
    | MemberExprNB '[' Expr ']'
    | MemberExprNB '.' IDENT
;

CallExprNB
    : MemberExprNB Arguments
    | CallExprNB Arguments
    | CallExprNB '[' Expr ']'
    | CallExprNB '.' IDENT
;
