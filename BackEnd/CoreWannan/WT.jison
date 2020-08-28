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
    :  Statement
    |  Statement Source1
    |  EOF
;

Statement
    : Declaration_statements
    | Expr_statements
    | Assignation_statements
    | Function_statements
    | Control_statements
    | Native_statements
    | Block_statements
    | If_statements
    | Iteration_statements
    | Return_statements
    | Break_statements
    | Continue_statements
    | Switch_statements
    | Empty_statements
;



Native_statements
    : CONSOLE '.' LOG '(' Expr ')' ';'
    | GRAHPTS '(' ')' ';'
    | CONSOLE '.' LOG '(' Expr ')' error
    | GRAHPTS '(' ')' error
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


Declaration_statements
    : Type ValStatementL ':' Type initialNo ';'
    | Type ValStatementL initialNo ';'
    | Type ValStatementL initialNo error
    | IDENT Arguments
;

Assignation_statements
    : IDENT CallExprNoIn initialNo ';'
    | IDENT CallExprNoIn initialNo error
    | IDENT initialNo ';'
    | IDENT initialNo error
;

CallExprNoIn
    : MemberExpr
    | CallExprNoIn Arguments
    | CallExprNoIn ArrList
    | CallExprNoIn '.' IDENT
    | CallExprNoIn '.' LENGTH
    | '.' IDENT
    | '.' LENGTH
    | ArrList
;

ArrList
    : Arr ArrList
    | Arr
;

Arr
    : '[' Expr ']'
;


ValStatementL
    : ValStatement ',' ValStatementL
    | ValStatement
;

ValStatement
    : IDENT
    | IDENT ArrayList
;

initialNo
    : AssignmentOperator AssignmentExpr
;

AssignmentOperator
    : '='
    | '+='
    | '-='
    | '*='
    | '/='
    | '^='
    | '%='
;

FunctionExpr
    : FUNCTION '(' ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION '(' ParameterList ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION '(' ')' OPENBRACE  CLOSEBRACE
    | FUNCTION '(' ParameterList ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ')' OPENBRACE  CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE  CLOSEBRACE
;

Function_statements
    : FUNCTION IDENT '(' ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ')' ':' Type OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' ':' Type OPENBRACE Source1 CLOSEBRACE
    | FUNCTION IDENT '(' ')' OPENBRACE  CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' OPENBRACE  CLOSEBRACE
    | FUNCTION IDENT '(' ')' ':' Type OPENBRACE  CLOSEBRACE
    | FUNCTION IDENT '(' ParameterList ')' ':' Type OPENBRACE  CLOSEBRACE
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

If_statements
    : IF '(' Expr ')' Statement %prec IF_WITHOUT_ELSE
    | IF '(' Expr ')' Statement ELSE Statement
;
Iteration_statements
    : DO Statement WHILE '(' Expr ')' ';'
    | DO Statement WHILE '(' Expr ')' error
    | WHILE '(' Expr ')' Statement
    | FOR '(' ExprNoInOpt ';' ExprOpt ';' ExprOpt ')' Statement
    | FOR '(' TypeV IDENT initialNo ';' ExprOpt ';' ExprOpt ')' Statement
    | FOR '(' LeftHandSideExpr INTOKEN Expr ')' Statement
    | FOR '(' TypeV IDENT INTOKEN Expr ')' Statement
    | FOR '(' TypeV IDENT initialNo INTOKEN Expr ')' Statement
;

ExprOpt
    :
    | Expr
    ;

ExprNoInOpt
    :
    | ExprNoIn
    ;

Expr
    : AssignmentExpr
    | Expr ',' AssignmentExpr
;

ExprNoIn
    : AssignmentExprNoIn
    | ExprNoIn ',' AssignmentExprNoIn
;

ExprNB
    : AssignmentExprNoBF
    | ExprNB ',' AssignmentExpr
;

ParameterList
    : Parameter ',' ParameterList
    | Parameter
;

Parameter
    : IDENT ':' Type
    | IDENT
;

TypeV
    : STRING
    | NUMBER
    | BOOLEAN
    | VOID
    | VAR
    | CONST
    | TYPE
    | IDENT
    | LET
;

Type
    : TypeV ArrayList
    | TypeV
;

ArrayList
    : Array ArrayList1
;
ArrayList1
    : Array ArrayList1
    | Array
    | EOF
;

Array
    : '[' ']'
;

ArrayLiteral
    : Array
    | '[' Elements ']'
;

Elements
    : Element ',' Elements
    | Element
;

Element
    : Expr
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

Property
    : IDENT ':' AssignmentExpr
    | STRING ':' AssignmentExpr
    | NUMBER ':' AssignmentExpr
    ;

PropertyList
    : Property
    | PropertyList ',' Property
    ;

PrimaryExpr
    : PrimaryExprNoBrace
    | OPENBRACE CLOSEBRACE
    | OPENBRACE PropertyList CLOSEBRACE
    | OPENBRACE PropertyList ',' CLOSEBRACE
;

PrimaryExprNoBrace
    : Literal
    | ArrayLiteral
    | IDENT
    | '(' Expr ')'
;

ArrayLiteral
    : '[' ']'
    | '[' ElementList ']'
;

ElementList
    : AssignmentExpr
    | ElementList ',' AssignmentExpr
;


MemberExpr
    : PrimaryExpr
    | FunctionExpr
    | MemberExpr '[' Expr ']'
    | MemberExpr '.' IDENT
;

MemberExprNoBF
    : PrimaryExprNoBrace
    | MemberExprNoBF '[' Expr ']'
    | MemberExprNoBF '.' IDENT
    ;


CallExpr
    : IDENT
    | MemberExpr Arguments
    | CallExpr Arguments
    | CallExpr '[' Expr ']'
    | CallExpr '.' IDENT
    | CallExpr '.' POP '(' Element ')'
    | CallExpr '.' PUSH '(' ')'
    | CallExpr '.' LENGTH
    ;

CallExprNoBF
    : IDENT
    | MemberExprNoBF Arguments
    | CallExprNoBF Arguments
    | CallExprNoBF '[' Expr ']'
    | CallExprNoBF '.' IDENT
    | CallExprNoBF '.' POP '(' Element ')'
    | CallExprNoBF '.' PUSH '(' ')'
    | CallExprNoBF '.' LENGTH
    ;

Arguments
    : '(' ')'
    | '(' ArgumentList ')'
    ;

ArgumentList
    : AssignmentExpr
    | ArgumentList ',' AssignmentExpr
    ;

LeftHandSideExpr
    : MemberExpr
    | CallExpr
    ;

LeftHandSideExprNoBF
    : MemberExpr
    | CallExprNoBF
    ;

PostfixExpr
    : LeftHandSideExpr
    | LeftHandSideExpr PLUSPLUS
    | LeftHandSideExpr MINSMINS
    ;

PostfixExprNoBF
    : LeftHandSideExprNoBF
    | LeftHandSideExprNoBF PLUSPLUS
    | LeftHandSideExprNoBF MINSMINS
    ;

UnaryExprCommon
    : PLUSPLUS UnaryExpr
    | MINSMINS UnaryExpr
    | '+' UnaryExpr
    | '-' UnaryExpr
    | '~' UnaryExpr
    | '!' UnaryExpr
    ;

UnaryExpr
    : PostfixExpr
    | UnaryExprCommon
    ;

UnaryExprNoBF
    : PostfixExprNoBF
    | UnaryExprCommon
    ;

MultiplicativeExpr
    : UnaryExpr
    | MultiplicativeExpr '*' UnaryExpr
    | MultiplicativeExpr '/' UnaryExpr
    | MultiplicativeExpr '^' UnaryExpr
    | MultiplicativeExpr '%' UnaryExpr
    ;

MultiplicativeExprNoBF
    : UnaryExprNoBF
    | MultiplicativeExprNoBF '*' UnaryExpr
    | MultiplicativeExprNoBF '/' UnaryExpr
    | MultiplicativeExprNoBF '^' UnaryExpr
    | MultiplicativeExprNoBF '%' UnaryExpr
    ;

AdicionExpr
    : MultiplicativeExpr
    | AdicionExpr '+' MultiplicativeExpr
    | AdicionExpr '-' MultiplicativeExpr
    ;

AdicionExprNoBF
    : MultiplicativeExprNoBF
    | AdicionExprNoBF '+' MultiplicativeExpr
    | AdicionExprNoBF '-' MultiplicativeExpr
    ;

RelacionalExpr
    : AdicionExpr
    | RelacionalExpr '<' AdicionExpr
    | RelacionalExpr '>' AdicionExpr
    ;

RelacionalExprNoIn
    : AdicionExpr
    | RelacionalExprNoIn '<' AdicionExpr
    | RelacionalExprNoIn '>' AdicionExpr
    ;

RelacionalExprNoBF
    : AdicionExprNoBF
    | RelacionalExprNoBF '<' AdicionExprNoBF
    | RelacionalExprNoBF '>' AdicionExprNoBF
    ;

IgualdadExpr
    : RelacionalExpr
    | IgualdadExpr EQQ RelacionalExpr
    | IgualdadExpr NOEQQ RelacionalExpr
    | IgualdadExpr MAQ RelacionalExpr
    | IgualdadExpr MIQ RelacionalExpr
    ;

IgualdadExprNoIn
    : RelacionalExprNoIn
    | IgualdadExprNoIn EQQ RelacionalExprNoIn
    | IgualdadExprNoIn NOEQQ RelacionalExprNoIn
    | IgualdadExprNoIn MAQ RelacionalExprNoIn
    | IgualdadExprNoIn MIQ RelacionalExprNoIn
    ;

IgualdadExprNoBF
    : RelacionalExprNoBF
    | IgualdadExprNoBF EQQ RelacionalExpr
    | IgualdadExprNoBF NOEQQ RelacionalExpr
    | IgualdadExprNoBF MAQ RelacionalExpr
    | IgualdadExprNoBF MIQ RelacionalExpr
    ;


LogicaYYExpr
    : IgualdadExpr
    | LogicaYYExpr AND IgualdadExpr
    ;

LogicaYYExprNoIn
    : IgualdadExprNoIn
    | LogicaYYExprNoIn AND IgualdadExprNoIn
    ;

LogicaYYExprNoBF
    : IgualdadExprNoBF
    | LogicaYYExprNoBF AND IgualdadExprNoBF
    ;

LogicaOOExpr
    : LogicaYYExpr
    | LogicaOOExpr OR LogicaYYExpr
    ;

LogicaOOExprNoIn
    : LogicaYYExprNoIn
    | LogicaOOExprNoIn OR LogicaYYExprNoIn
    ;

LogicaOOExprNoBF
    : LogicaYYExprNoBF
    | LogicaOOExprNoBF OR LogicaYYExpr
    ;

CondicionTernariaExpr
    : LogicaOOExpr
    | LogicaOOExpr '?' AssignmentExpr ':' AssignmentExpr
    ;

CondicionTernariaExprNoIn
    : LogicaOOExprNoIn
    | LogicaOOExprNoIn '?' AssignmentExprNoIn ':' AssignmentExprNoIn
    ;

CondicionTernariaExprNoBF
    : LogicaOOExprNoBF
    | LogicaOOExprNoBF '?' AssignmentExpr ':' AssignmentExpr
    ;

AssignmentExpr
    : CondicionTernariaExpr
    | LeftHandSideExpr AssignmentOperator AssignmentExpr
    ;

AssignmentExprNoIn
    : CondicionTernariaExprNoIn
    | LeftHandSideExpr AssignmentOperator AssignmentExprNoIn
    ;

AssignmentExprNoBF
    : CondicionTernariaExprNoBF
    | LeftHandSideExprNoBF AssignmentOperator AssignmentExpr
    ;
