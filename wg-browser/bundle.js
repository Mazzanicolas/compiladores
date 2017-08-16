(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const nearley = require("nearley");
const grammar = require("./while.js");

// Create a Parser object from our grammar.
var parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));//deberia ser const

document.getElementById("demoBtn").onclick = function() {showResult()};
function showResult() {
  try {
    parser.feed(document.getElementById("fname").value);
    } catch(parseError) {
      document.getElementById("result").innerHTML +="<li class='list-group-item list-group-item-danger'><strong>Input Error</strong> check console for more details</li>";
        console.log("Error at character " + parseError.offset); // "Error at character 9"
    }

  if(typeof(parser.results[0][0])==='object'){
    document.getElementById("result").innerHTML +="<li class='list-group-item list-group-item-success'>"+ document.getElementById("fname").value+" = <strong>"+"{"+parser.results[0][0].elem.variable+" , "+parser.results[0][0].elem.valor+"}</strong><i> (object) </i></li>";
  }else{
    document.getElementById("result").innerHTML += "<li class='list-group-item list-group-item-success'>"+ document.getElementById("fname").value+" = <strong>"+ parser.results[0]+"</strong><i> ("+typeof(parser.results[0][0])+")</i></li>";
  }
  console.log(parser.results[0]);
  parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));//Encontrar otra formas
}
// <div class="alert alert-success" role="alert">...</div>
// <div class="alert alert-info" role="alert">...</div>
// <div class="alert alert-warning" role="alert">...</div>
// <div class="alert alert-danger" role="alert">...</div>

},{"./while.js":2,"nearley":4}],2:[function(require,module,exports){
// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

  const moo = require('moo');
  const lexer = moo.compile({
    WS: /[ \t]/,
    Num: /[0-9]+/,
    Else: /else/,
    If: /if/,
    Then: /then/,
    Skip: /skip/,
    While:/while/,
    Do: /do/,
    BexpT: /true/, //Si junto true y false, en el parser no puedo distinguirlos
    BexpF:/false/,
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
    Var: /[a-zA-Z][0-9a-zA-Z]*/,
    Otro: {match:/[^]/, lineBreaks: true}
    });

 var elem={variable:'',valor:''}; var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "result", "symbols": ["a"]},
    {"name": "result", "symbols": ["b"]},
    {"name": "result", "symbols": ["s"]},
    {"name": "a", "symbols": [(lexer.has("Num") ? {type: "Num"} : Num)], "postprocess": ([first]) =>  parseInt(first)},
    {"name": "a", "symbols": [(lexer.has("Var") ? {type: "Var"} : Var)], "postprocess": ([first]) => first.value},
    {"name": "a", "symbols": [(lexer.has("Num") ? {type: "Num"} : Num), (lexer.has("Plus") ? {type: "Plus"} : Plus), (lexer.has("Num") ? {type: "Num"} : Num)], "postprocess": ([first, _, second]) => parseInt(first) + parseInt(second)},
    {"name": "a", "symbols": [(lexer.has("Num") ? {type: "Num"} : Num), (lexer.has("Times") ? {type: "Times"} : Times), (lexer.has("Num") ? {type: "Num"} : Num)], "postprocess": ([first, _, second]) => parseInt(first) * parseInt(second)},
    {"name": "a", "symbols": [(lexer.has("Num") ? {type: "Num"} : Num), (lexer.has("Substract") ? {type: "Substract"} : Substract), (lexer.has("Num") ? {type: "Num"} : Num)], "postprocess": ([first, _, second]) => parseInt(first) - parseInt(second)},
    {"name": "b", "symbols": [(lexer.has("BexpT") ? {type: "BexpT"} : BexpT)], "postprocess": ([first]) => true},
    {"name": "b", "symbols": [(lexer.has("BexpF") ? {type: "BexpF"} : BexpF)], "postprocess": ([first]) => false},
    {"name": "b", "symbols": ["a", (lexer.has("Equal") ? {type: "Equal"} : Equal), "a"], "postprocess": ([first,,second]) => first==second},
    {"name": "b", "symbols": ["a", (lexer.has("LsOrEq") ? {type: "LsOrEq"} : LsOrEq), "a"], "postprocess": ([first,,second]) => first<=second},
    {"name": "b", "symbols": [(lexer.has("Not") ? {type: "Not"} : Not), "b"], "postprocess": ([first]) => !first},
    {"name": "b", "symbols": ["b", (lexer.has("And") ? {type: "And"} : And), "b"], "postprocess": ([first,,second]) => first && second},
    {"name": "s", "symbols": [(lexer.has("Var") ? {type: "Var"} : Var), (lexer.has("Assign") ? {type: "Assign"} : Assign), "value"], "postprocess": function(data, location, reject) { elem.variable = data[0].value; elem.valor= data[2][0].value; return { elem };}},
    {"name": "value", "symbols": [(lexer.has("Num") ? {type: "Num"} : Num)]},
    {"name": "value", "symbols": [(lexer.has("BexpT") ? {type: "BexpT"} : BexpT)]},
    {"name": "value", "symbols": [(lexer.has("BexpF") ? {type: "BexpF"} : BexpF)]},
    {"name": "value", "symbols": ["s"]}
]
  , ParserStart: "result"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

},{"moo":3}],3:[function(require,module,exports){
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory) /* global define */
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.moo = factory()
  }
}(this, function() {
  'use strict';

  var hasOwnProperty = Object.prototype.hasOwnProperty

  // polyfill assign(), so we support IE9+
  var assign = typeof Object.assign === 'function' ? Object.assign :
    // https://tc39.github.io/ecma262/#sec-object.assign
    function(target, sources) {
      if (target == null) {
        throw new TypeError('Target cannot be null or undefined');
      }
      target = Object(target)

      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]
        if (source == null) continue

        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key]
          }
        }
      }
      return target
    }

  var hasSticky = typeof new RegExp().sticky === 'boolean'

  /***************************************************************************/

  function isRegExp(o) { return o && o.constructor === RegExp }
  function isObject(o) { return o && typeof o === 'object' && o.constructor !== RegExp && !Array.isArray(o) }

  function reEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  function reGroups(s) {
    var re = new RegExp('|' + s)
    return re.exec('').length - 1
  }
  function reCapture(s) {
    return '(' + s + ')'
  }
  function reUnion(regexps) {
    var source =  regexps.map(function(s) {
      return "(?:" + s + ")"
    }).join('|')
    return "(?:" + source + ")"
  }

  function compareLength(a, b) {
    return b.length - a.length
  }

  function regexpOrLiteral(obj) {
    if (typeof obj === 'string') {
      return '(?:' + reEscape(obj) + ')'

    } else if (isRegExp(obj)) {
      // TODO: consider /u support
      if (obj.ignoreCase) { throw new Error('RegExp /i flag not allowed') }
      if (obj.global) { throw new Error('RegExp /g flag is implied') }
      if (obj.sticky) { throw new Error('RegExp /y flag is implied') }
      if (obj.multiline) { throw new Error('RegExp /m flag is implied') }
      return obj.source

    } else {
      throw new Error('not a pattern: ' + obj)
    }
  }

  function objectToRules(object) {
    var keys = Object.getOwnPropertyNames(object)
    var result = []
    for (var i=0; i<keys.length; i++) {
      var key = keys[i]
      var thing = object[key]
      var rules = Array.isArray(thing) ? thing : [thing]
      var match = []
      rules.forEach(function(rule) {
        if (isObject(rule)) {
          if (match.length) result.push(ruleOptions(key, match))
          result.push(ruleOptions(key, rule))
          match = []
        } else {
          match.push(rule)
        }
      })
      if (match.length) result.push(ruleOptions(key, match))
    }
    return result
  }

  function arrayToRules(array) {
    var result = []
    for (var i=0; i<array.length; i++) {
      var obj = array[i]
      if (!obj.name) {
        throw new Error('Rule has no name: ' + JSON.stringify(obj))
      }
      result.push(ruleOptions(obj.name, obj))
    }
    return result
  }

  function ruleOptions(name, obj) {
    if (typeof obj !== 'object' || Array.isArray(obj) || isRegExp(obj)) {
      obj = { match: obj }
    }

    // nb. error implies lineBreaks
    var options = assign({
      tokenType: name,
      lineBreaks: !!obj.error,
      pop: false,
      next: null,
      push: null,
      error: false,
      value: null,
      getType: null,
    }, obj)

    // convert to array
    var match = options.match
    options.match = Array.isArray(match) ? match : match ? [match] : []
    options.match.sort(function(a, b) {
      return isRegExp(a) && isRegExp(b) ? 0
           : isRegExp(b) ? -1 : isRegExp(a) ? +1 : b.length - a.length
    })
    if (options.keywords) {
      options.getType = keywordTransform(options.keywords)
    }
    return options
  }

  function compileRules(rules, hasStates) {
    rules = Array.isArray(rules) ? arrayToRules(rules) : objectToRules(rules)

    var errorRule = null
    var groups = []
    var parts = []
    for (var i=0; i<rules.length; i++) {
      var options = rules[i]

      if (options.error) {
        if (errorRule) {
          throw new Error("Multiple error rules not allowed: (for token '" + options.tokenType + "')")
        }
        errorRule = options
      }

      // skip rules with no match
      if (options.match.length === 0) {
        continue
      }
      groups.push(options)

      // convert to RegExp
      var pat = reUnion(options.match.map(regexpOrLiteral))

      // validate
      var regexp = new RegExp(pat)
      if (regexp.test("")) {
        throw new Error("RegExp matches empty string: " + regexp)
      }
      var groupCount = reGroups(pat)
      if (groupCount > 0) {
        throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: … ) instead")
      }
      if (!hasStates && (options.pop || options.push || options.next)) {
        throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.tokenType + "')")
      }

      // try and detect rules matching newlines
      if (!options.lineBreaks && regexp.test('\n')) {
        throw new Error('Rule should declare lineBreaks: ' + regexp)
      }

      // store regex
      parts.push(reCapture(pat))
    }

    var suffix = hasSticky ? '' : '|(?:)'
    var flags = hasSticky ? 'ym' : 'gm'
    var regexp = new RegExp(reUnion(parts) + suffix, flags)

    return {regexp: regexp, groups: groups, error: errorRule}
  }

  function compile(rules) {
    var result = compileRules(rules)
    return new Lexer({start: result}, 'start')
  }

  function compileStates(states, start) {
    var keys = Object.getOwnPropertyNames(states)
    if (!start) start = keys[0]

    var map = Object.create(null)
    for (var i=0; i<keys.length; i++) {
      var key = keys[i]
      map[key] = compileRules(states[key], true)
    }

    for (var i=0; i<keys.length; i++) {
      var groups = map[keys[i]].groups
      for (var j=0; j<groups.length; j++) {
        var g = groups[j]
        var state = g && (g.push || g.next)
        if (state && !map[state]) {
          throw new Error("Missing state '" + state + "' (in token '" + g.tokenType + "' of state '" + keys[i] + "')")
        }
        if (g && g.pop && +g.pop !== 1) {
          throw new Error("pop must be 1 (in token '" + g.tokenType + "' of state '" + keys[i] + "')")
        }
      }
    }

    return new Lexer(map, start)
  }

  function keywordTransform(map) {
    var reverseMap = Object.create(null)
    var byLength = Object.create(null)
    var types = Object.getOwnPropertyNames(map)
    for (var i=0; i<types.length; i++) {
      var tokenType = types[i]
      var item = map[tokenType]
      var keywordList = Array.isArray(item) ? item : [item]
      keywordList.forEach(function(keyword) {
        (byLength[keyword.length] = byLength[keyword.length] || []).push(keyword)
        reverseMap[keyword] = tokenType
      })
    }

    // fast string lookup
    // https://jsperf.com/string-lookups
    function str(x) { return JSON.stringify(x) }
    var source = ''
    source += '(function(value) {\n'
    source += 'switch (value.length) {\n'
    for (var length in byLength) {
      var keywords = byLength[length]
      source += 'case ' + length + ':\n'
      source += 'switch (value) {\n'
      keywords.forEach(function(keyword) {
        var tokenType = reverseMap[keyword]
        if (typeof tokenType !== 'string') {
          throw new Error('keyword type must be string: ' + name)
        }
        source += 'case ' + str(keyword) + ': return ' + str(tokenType) + '\n'
      })
      source += '}\n'
    }
    source += '}\n'
    source += '})'
    return eval(source) // getType
  }

  /***************************************************************************/

  var Lexer = function(states, state) {
    this.startState = state
    this.states = states
    this.buffer = ''
    this.stack = []
    this.reset()
  }

  Lexer.prototype.reset = function(data, info) {
    this.buffer = data || ''
    this.index = 0
    this.line = info ? info.line : 1
    this.col = info ? info.col : 1
    this.setState(info ? info.state : this.startState)
    return this
  }

  Lexer.prototype.save = function() {
    return {
      line: this.line,
      col: this.col,
      state: this.state,
    }
  }

  Lexer.prototype.setState = function(state) {
    if (!state || this.state === state) return
    this.state = state
    var info = this.states[state]
    this.groups = info.groups
    this.error = info.error || {lineBreaks: true, shouldThrow: true}
    this.re = info.regexp
  }

  Lexer.prototype.popState = function() {
    this.setState(this.stack.pop())
  }

  Lexer.prototype.pushState = function(state) {
    this.stack.push(this.state)
    this.setState(state)
  }

  Lexer.prototype._eat = hasSticky ? function(re) { // assume re is /y
    return re.exec(this.buffer)
  } : function(re) { // assume re is /g
    var match = re.exec(this.buffer)
    // will always match, since we used the |(?:) trick
    if (match[0].length === 0) {
      return null
    }
    return match
  }

  Lexer.prototype._getGroup = function(match) {
    if (match === null) {
      return -1
    }

    var groupCount = this.groups.length
    for (var i = 0; i < groupCount; i++) {
      if (match[i + 1] !== undefined) {
        return i
      }
    }
    throw new Error('oops')
  }

  function tokenToString() {
    return this.value
  }

  Lexer.prototype.next = function() {
    var re = this.re
    var buffer = this.buffer

    var index = re.lastIndex = this.index
    if (index === buffer.length) {
      return // EOF
    }

    var match = this._eat(re)
    var i = this._getGroup(match)

    var group, text
    if (i === -1) {
      group = this.error

      // consume rest of buffer
      text = buffer.slice(index)

    } else {
      text = match[0]
      group = this.groups[i]
    }

    // count line breaks
    var lineBreaks = 0
    if (group.lineBreaks) {
      var matchNL = /\n/g
      var nl = 1
      if (text === '\n') {
        lineBreaks = 1
      } else {
        while (matchNL.exec(text)) { lineBreaks++; nl = matchNL.lastIndex }
      }
    }

    var token = {
      type: (group.getType && group.getType(text)) || group.tokenType,
      value: (group.value && group.value(text)) || text,
      text: text,
      toString: tokenToString,
      offset: index,
      lineBreaks: lineBreaks,
      line: this.line,
      col: this.col,
    }
    // nb. adding more props to token object will make V8 sad!

    var size = text.length
    this.index += size
    this.line += lineBreaks
    if (lineBreaks !== 0) {
      this.col = size - nl + 1
    } else {
      this.col += size
    }
    // throw, if no rule with {error: true}
    if (group.shouldThrow) {
      throw new Error(this.formatError(token, "invalid syntax"))
    }

    if (group.pop) this.popState()
    else if (group.push) this.pushState(group.push)
    else if (group.next) this.setState(group.next)
    return token
  }

  if (typeof Symbol !== 'undefined' && Symbol.iterator) {
    var LexerIterator = function(lexer) {
      this.lexer = lexer
    }

    LexerIterator.prototype.next = function() {
      var token = this.lexer.next()
      return {value: token, done: !token}
    }

    LexerIterator.prototype[Symbol.iterator] = function() {
      return this
    }

    Lexer.prototype[Symbol.iterator] = function() {
      return new LexerIterator(this)
    }
  }

  Lexer.prototype.formatError = function(token, message) {
    var value = token.value
    var index = token.offset
    var eol = token.lineBreaks ? value.indexOf('\n') : value.length
    var start = Math.max(0, index - token.col + 1)
    var firstLine = this.buffer.substring(start, index + eol)
    message += " at line " + token.line + " col " + token.col + ":\n\n"
    message += "  " + firstLine + "\n"
    message += "  " + Array(token.col).join(" ") + "^"
    return message
  }

  Lexer.prototype.clone = function() {
    return new Lexer(this.states, this.state)
  }

  Lexer.prototype.has = function(tokenType) {
    for (var s in this.states) {
      var groups = this.states[s].groups
      for (var i=0; i<groups.length; i++) {
        var group = groups[i]
        if (group.tokenType === tokenType) return true
        if (group.keywords) {
          for (var k in group.keywords) {
            if (group.keywords[k].tokenType === tokenType) return true
          }
        }
      }
    }
    return false
  }


  return {
    compile: compile,
    states: compileStates,
    error: Object.freeze({error: true}),
  }

}))

},{}],4:[function(require,module,exports){
(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.nearley = factory();
    }
}(this, function() {

function Rule(name, symbols, postprocess) {
    this.id = ++Rule.highestId;
    this.name = name;
    this.symbols = symbols;        // a list of literal | regex class | nonterminal
    this.postprocess = postprocess;
    return this;
}
Rule.highestId = 0;

Rule.prototype.toString = function(withCursorAt) {
    function stringifySymbolSequence (e) {
        return e.literal ? JSON.stringify(e.literal) :
               e.type ? '%' + e.type : e.toString();
    }
    var symbolSequence = (typeof withCursorAt === "undefined")
                         ? this.symbols.map(stringifySymbolSequence).join(' ')
                         : (   this.symbols.slice(0, withCursorAt).map(stringifySymbolSequence).join(' ')
                             + " ● "
                             + this.symbols.slice(withCursorAt).map(stringifySymbolSequence).join(' ')     );
    return this.name + " → " + symbolSequence;
}


// a State is a rule at a position from a given starting point in the input stream (reference)
function State(rule, dot, reference, wantedBy) {
    this.rule = rule;
    this.dot = dot;
    this.reference = reference;
    this.data = [];
    this.wantedBy = wantedBy;
    this.isComplete = this.dot === rule.symbols.length;
}

State.prototype.toString = function() {
    return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
};

State.prototype.nextState = function(child) {
    var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
    state.left = this;
    state.right = child;
    if (state.isComplete) {
        state.data = state.build();
    }
    return state;
};

State.prototype.build = function() {
    var children = [];
    var node = this;
    do {
        children.push(node.right.data);
        node = node.left;
    } while (node.left);
    children.reverse();
    return children;
};

State.prototype.finish = function() {
    if (this.rule.postprocess) {
        this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
    }
};


function Column(grammar, index) {
    this.grammar = grammar;
    this.index = index;
    this.states = [];
    this.wants = {}; // states indexed by the non-terminal they expect
    this.scannable = []; // list of states that expect a token
    this.completed = {}; // states that are nullable
}


Column.prototype.process = function(nextColumn) {
    var states = this.states;
    var wants = this.wants;
    var completed = this.completed;

    for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
        var state = states[w];

        if (state.isComplete) {
            state.finish();
            if (state.data !== Parser.fail) {
                // complete
                var wantedBy = state.wantedBy;
                for (var i = wantedBy.length; i--; ) { // this line is hot
                    var left = wantedBy[i];
                    this.complete(left, state);
                }

                // special-case nullables
                if (state.reference === this.index) {
                    // make sure future predictors of this rule get completed.
                    var exp = state.rule.name;
                    (this.completed[exp] = this.completed[exp] || []).push(state);
                }
            }

        } else {
            // queue scannable states
            var exp = state.rule.symbols[state.dot];
            if (typeof exp !== 'string') {
                this.scannable.push(state);
                continue;
            }

            // predict
            if (wants[exp]) {
                wants[exp].push(state);

                if (completed.hasOwnProperty(exp)) {
                    var nulls = completed[exp];
                    for (var i = 0; i < nulls.length; i++) {
                        var right = nulls[i];
                        this.complete(state, right);
                    }
                }
            } else {
                wants[exp] = [state];
                this.predict(exp);
            }
        }
    }
}

Column.prototype.predict = function(exp) {
    var rules = this.grammar.byName[exp] || [];

    for (var i = 0; i < rules.length; i++) {
        var r = rules[i];
        var wantedBy = this.wants[exp];
        var s = new State(r, 0, this.index, wantedBy);
        this.states.push(s);
    }
}

Column.prototype.complete = function(left, right) {
    var inp = right.rule.name;
    if (left.rule.symbols[left.dot] === inp) {
        var copy = left.nextState(right);
        this.states.push(copy);
    }
}


function Grammar(rules, start) {
    this.rules = rules;
    this.start = start || this.rules[0].name;
    var byName = this.byName = {};
    this.rules.forEach(function(rule) {
        if (!byName.hasOwnProperty(rule.name)) {
            byName[rule.name] = [];
        }
        byName[rule.name].push(rule);
    });
}

// So we can allow passing (rules, start) directly to Parser for backwards compatibility
Grammar.fromCompiled = function(rules, start) {
    var lexer = rules.Lexer;
    if (rules.ParserStart) {
      start = rules.ParserStart;
      rules = rules.ParserRules;
    }
    var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
    var g = new Grammar(rules, start);
    g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
    return g;
}


function StreamLexer() {
  this.reset("");
}

StreamLexer.prototype.reset = function(data, state) {
    this.buffer = data;
    this.index = 0;
    this.line = state ? state.line : 1;
    this.lastLineBreak = state ? -state.col : 0;
}

StreamLexer.prototype.next = function() {
    if (this.index < this.buffer.length) {
        var ch = this.buffer[this.index++];
        if (ch === '\n') {
          this.line += 1;
          this.lastLineBreak = this.index;
        }
        return {value: ch};
    }
}

StreamLexer.prototype.save = function() {
  return {
    line: this.line,
    col: this.index - this.lastLineBreak,
  }
}

StreamLexer.prototype.formatError = function(token, message) {
    // nb. this gets called after consuming the offending token,
    // so the culprit is index-1
    var buffer = this.buffer;
    if (typeof buffer === 'string') {
        var nextLineBreak = buffer.indexOf('\n', this.index);
        if (nextLineBreak === -1) nextLineBreak = buffer.length;
        var line = buffer.substring(this.lastLineBreak, nextLineBreak)
        var col = this.index - this.lastLineBreak;
        message += " at line " + this.line + " col " + col + ":\n\n";
        message += "  " + line + "\n"
        message += "  " + Array(col).join(" ") + "^"
        return message;
    } else {
        return message + " at index " + (this.index - 1);
    }
}


function Parser(rules, start, options) {
    if (rules instanceof Grammar) {
        var grammar = rules;
        var options = start;
    } else {
        var grammar = Grammar.fromCompiled(rules, start);
    }
    this.grammar = grammar;

    // Read options
    this.options = {
        keepHistory: false,
        lexer: grammar.lexer || new StreamLexer,
    };
    for (var key in (options || {})) {
        this.options[key] = options[key];
    }

    // Setup lexer
    this.lexer = this.options.lexer;
    this.lexerState = undefined;

    // Setup a table
    var column = new Column(grammar, 0);
    var table = this.table = [column];

    // I could be expecting anything.
    column.wants[grammar.start] = [];
    column.predict(grammar.start);
    // TODO what if start rule is nullable?
    column.process();
    this.current = 0; // token index
}

// create a reserved token for indicating a parse fail
Parser.fail = {};

Parser.prototype.feed = function(chunk) {
    var lexer = this.lexer;
    lexer.reset(chunk, this.lexerState);

    var token;
    while (token = lexer.next()) {
        // We add new states to table[current+1]
        var column = this.table[this.current];

        // GC unused states
        if (!this.options.keepHistory) {
            delete this.table[this.current - 1];
        }

        var n = this.current + 1;
        var nextColumn = new Column(this.grammar, n);
        this.table.push(nextColumn);

        // Advance all tokens that expect the symbol
        var literal = token.value;
        var value = lexer.constructor === StreamLexer ? token.value : token;
        var scannable = column.scannable;
        for (var w = scannable.length; w--; ) {
            var state = scannable[w];
            var expect = state.rule.symbols[state.dot];
            // Try to consume the token
            // either regex or literal
            if (expect.test ? expect.test(value) :
                expect.type ? expect.type === token.type
                            : expect.literal === literal) {
                // Add it
                var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                nextColumn.states.push(next);
            }
        }

        // Next, for each of the rules, we either
        // (a) complete it, and try to see if the reference row expected that
        //     rule
        // (b) predict the next nonterminal it expects by adding that
        //     nonterminal's start state
        // To prevent duplication, we also keep track of rules we have already
        // added

        nextColumn.process();

        // If needed, throw an error:
        if (nextColumn.states.length === 0) {
            // No states at all! This is not good.
            var message = this.lexer.formatError(token, "invalid syntax") + "\n";
            message += "Unexpected " + (token.type ? token.type + " token: " : "");
            message += JSON.stringify(token.value !== undefined ? token.value : token) + "\n";
            var err = new Error(message);
            err.offset = this.current;
            err.token = token;
            throw err;
        }

        // maybe save lexer state
        if (this.options.keepHistory) {
          column.lexerState = lexer.save()
        }

        this.current++;
    }
    if (column) {
      this.lexerState = lexer.save()
    }

    // Incrementally keep track of results
    this.results = this.finish();

    // Allow chaining, for whatever it's worth
    return this;
};

Parser.prototype.save = function() {
    var column = this.table[this.current];
    column.lexerState = this.lexerState;
    return column;
};

Parser.prototype.restore = function(column) {
    var index = column.index;
    this.current = index;
    this.table[index] = column;
    this.table.splice(index + 1);
    this.lexerState = column.lexerState;

    // Incrementally keep track of results
    this.results = this.finish();
};

// nb. deprecated: use save/restore instead!
Parser.prototype.rewind = function(index) {
    if (!this.options.keepHistory) {
        throw new Error('set option `keepHistory` to enable rewinding')
    }
    // nb. recall column (table) indicies fall between token indicies.
    //        col 0   --   token 0   --   col 1
    this.restore(this.table[index]);
};

Parser.prototype.finish = function() {
    // Return the possible parsings
    var considerations = [];
    var start = this.grammar.start;
    var column = this.table[this.table.length - 1]
    column.states.forEach(function (t) {
        if (t.rule.name === start
                && t.dot === t.rule.symbols.length
                && t.reference === 0
                && t.data !== Parser.fail) {
            considerations.push(t);
        }
    });
    return considerations.map(function(c) {return c.data; });
};

return {
    Parser: Parser,
    Grammar: Grammar,
    Rule: Rule,
};

}));

},{}]},{},[1]);
