
import Token from '../types/token';

// The scanner factory
export default function scanner(lang) {

  // Normalise the language vocabulary terminals
  lang.vocabulary.forEach(terminal => {
    if (terminal.pattern.source[0] !== '^') {
      terminal.pattern = new RegExp('^' + terminal.pattern.source, terminal.pattern.flags);
    }
  });

  // The scan function that performs the tokenization
  return function scan(input = '', opts = {}) {
    let tokens = [], prev = null;

    while (input.length) {
      let match = null;

      for (let i = 0, N = lang.vocabulary.length; i < N; i++) {
        let terminal  = lang.vocabulary[i];

        if ((match = terminal.pattern.exec(input))) {
          let value = match[match.length - 1];
          let transform = terminal.transform || function(v){return v;};
          
          if (prev && prev.greedy && prev.type === terminal.type) {
            tokens[tokens.length - 1].value += transform(value);
            input = input.substring(match[0].length);
            break;
          }

          tokens.push(new Token(transform(value), terminal.flatten? value : terminal.type));
          input = input.substring(match[0].length);
          prev = terminal;
          break;
        }
      }
      
      if (!match) {
        input = input.substring(1);
      }
    }

    return tokens;
  };
}
