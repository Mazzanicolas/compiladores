#@preprocessor typescript
# _________________LEXER____________________nearleyc while.ne -o while.js
@include "lexer.ne"
@lexer lexer
@{% var elem={variable:'',valor:''}; %}
# _________________PARSER___________________nearley-test -i "" while.js
result -> a | b | s

a -> %Num {% ([first]) =>  parseInt(first) %}
    | %Var {% ([first]) => first %}
    | %Num %Plus %Num {% ([first, _, second]) => parseInt(first) + parseInt(second) %}
    | %Num %Times %Num {% ([first, _, second]) => parseInt(first) * parseInt(second) %}
    | %Num %Substract %Num {% ([first, _, second]) => parseInt(first) - parseInt(second) %}

b -> %BexpT {% ([first]) => true %}
    | %BexpF {% ([first]) => false %}
    | a %Equal a {% ([first,,second]) => first==second %}
    | a %LsOrEq a {% ([first,,second]) => first<=second %}
    | %Not b {% ([first]) => !first %}
    | b %And b {% ([first,,second]) => first && second %}

s -> %Var %Assign value {%function(data, location, reject) { elem.variable = data[0].value; elem.valor= data[2][0].value; return { elem };}%}

value -> %Num | %BexpT | %BexpF | s

# _________________PARSER___________________
