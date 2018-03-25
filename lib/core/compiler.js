

export default function compiler(language, components = []) {
  
  // Prepare the pipeline.
  const pipeline = components.map(factory => factory(language));

  return function compile(input, opts = {}) {
    return pipeline.reduce((value, process) => process(value, opts), input);
  }
}
