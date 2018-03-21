
import Node from './node';

// Represents a specific parse state (x -> ab • cd from j)
class ParseState{
  constructor(x, ab, cd, j) {
    this.x = x;
    this.ab = ab;
    this.cd = cd;
    this.j = j;
  }

  toArray() {
    return [this.x, this.ab, this.cd, this.j];
  }
}

// The parser factory
export default function parser(lang) {
  
  // Normalise the language grammar rules
  lang.grammar.forEach(rule => {
    if (typeof rule.pattern === 'string') {
      rule.pattern = rule.pattern.split(/\s+/gmi);
    }
  });

  let stack = [];

  // The parse function that performs the parsing
  return function parse(tokens, opts = {}) {
    console.log('parsing...');
    // console.log('TOKENS');
    // console.dir(tokens, { depth: null });
    // console.log();
    
    // The eventual abstract syntax tree
    let ast = [];
      
    // By convention the first rule is also the start state
    let table = [[new ParseState(lang.grammar[0].type, [], lang.grammar[0].pattern, 0)]];

    // Add an ending token. 
    tokens.push({ type: 'END_OF_TOKENS' });

    tokens.forEach((token, index) => {
      table[index + 1] = [];
     
      for (let s = 0; s < table[index].length; s++) {
        let currentState = table[index][s], states = [];

        if ((states = computeClosures(currentState, index)).length) {
          states.forEach(state => addToTable(table, index, state));
        }

        if ((states = computeShifts(currentState, token)).length) {
          states.forEach(state => addToTable(table, index + 1, state));
        }

        if ((states = computeReductions(currentState, index, table, ast)).length) {
          states.forEach(state => addToTable(table, index, state));
        }
      }
    });

    let acceptingState = table[tokens.length - 1].filter(s => s.x === lang.grammar[0].type && !s.cd.length)[0];

    return stack[0];
  };

  // Extends (predicts) the set of possible productions
  function computeClosures(state, i) {
    // Pull in any rule that may be reduced next.
    if (state.cd.length) {
      return lang.grammar.filter(r => r.type === state.cd[0]).map(r => new ParseState(r.type, [], r.pattern, i));
    }
  
    return [];
  }

  // Checks the current terminal against any awaiting production
  // that has a terminal in the next check element.
  function computeShifts(state, token) {
    // If the next token we are looking for is actually current token
    if (state.cd.length && state.cd[0] === token.type) {

      if (!token._shifted) {
        stack.push(new Node(token.value, token.type));
        token._shifted = true
      }

      // create a new shifted parse state in the next chart position.
      return [new ParseState(state.x, state.ab.concat([token.type]), state.cd.slice(1), state.j)];
    }
  
    return [];
  }

  // Computes the reductions, that is looks back in the table for
  // productions that are now satisfied and brings them forwards.
  function computeReductions(state, i, table, ast) {
    // When we have reached the rhs of a rule.
    if (!state.cd.length) {
  
      stack = [new Node(null, state.x, stack)];

      // find the states from table[j] that expected to see this state rule
      let newStates = table[state.j]
        .filter(s => s.cd.length && s.cd[0] === state.x)
        .map(s => new ParseState(s.x, s.ab.concat([state.x]), s.cd.slice(1), s.j));

      return newStates;
    }
  
    return [];
  }

  // Adds the state to the table state set at position @index
  function addToTable(table, index, state) {
    let i = table[index].length;

    // Each row is a set, so we need to avoid duplicates
    while (i--) {
      if (JSON.stringify(table[index][i].toArray()) === JSON.stringify(state.toArray())) {
        return;
      }
    }
    
    table[index].push(state);
  }
};
 