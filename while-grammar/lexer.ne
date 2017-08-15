@{%
  const moo = require('moo');
  const lexer = moo.compile({
    WS: /[ \t]/,
    Num: /[0-9]+/,
    Var: {match: /[a-zA-Z][0-9a-zA-Z]*/, keywords: {
       Else: 'else',
       If:'if',
       Then: 'then',
       Skip: 'skip',
       While:'while',
       Do: 'do',
       BexpT: 'true', //Si junto true y false, en el parser no puedo distinguirlos
       BexpF:'false',
     }},
    FNum: /[0-9]*[.][0-9]+/,
    LsOrEq: /<=/,
    Equal: /=/,
    Assign: /:=/,
    Plus: /\+/,
    Times: /\*/,
    Lesser: /</,
    Not: /¬/,
    And: /\^/,
    Substract: /-/,
    LBracket: /\(/,
    RBracket: /\)/,
    Otro: {match:/[^]/, lineBreaks: true}
    });
%}
