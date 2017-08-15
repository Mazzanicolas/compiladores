@{%
  const moo = require('moo');
  const lexer = moo.compile({
      WS: /[ \t]/,
      Num: /[0-9]+/,
      FNum: /[0-9]*[.][0-9]+/,
      BexpT: /true/, //Si junto true y false, en el parser no puedo distinguirlos
      BexpF:/false/,
      If: /if/,
      Else: /else/,
      Then: /then/,
      Skip: /skip/,
      While: /while/,
      Do: /do/,
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
      Var: /[a-zA-Z][0-9a-zA-Z]*/,
      Otro: {match:/[^]/, lineBreaks: true}
  });
%}
