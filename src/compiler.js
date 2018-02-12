

export default function compiler(language, pipelineFactory = []) {
  
  // Prepare the pipeline.
  const pipeline = pipelineFactory.map(factory => factory(language));

  return function compile(input, opts = {}) {
    return pipeline.reduce((value, process) => process(value, opts), input);
  }
}
