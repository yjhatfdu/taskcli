const SourceMapConsumer = require("source-map").SourceMapConsumer;
const compileTs = require("./compile");
const requireFromString = require('require-from-string');
const fs = require('fs');
const path = require('path');

module.exports=async function load(filename) {
  let fcontent = fs.readFileSync(filename).toString();
  let sourceMap;
  let tsSource;
  if (filename.endsWith(".ts")) {
    tsSource = fcontent;
    const {code, errors, sourcemap} = compileTs(fcontent);
    sourceMap = sourcemap;
    if (errors.length !== 0) {
      console.error(errors.map(e => `${e.messageText}`).join('\n'));
      process.exit();
    }
    fcontent = code
  }

  const ctx = requireFromString(fcontent, {
    appendPaths: [path.resolve(__dirname, './../../../node_modules')],
  });
  let data;
  if (tsSource) {
    const codes = tsSource.split(/\n/g);
    let smc = await new SourceMapConsumer(sourceMap);
    data = ctx.build((line, pos) => {
      let ret = smc.originalPositionFor({line: line, column: pos});
      return [ret.line, ret.column, `${filename}:${ret.line}:${ret.column}\n` + codes[ret.line - 1] + '\n' + ' '.repeat(ret.column) + '^']
    });
    smc.destroy();
  } else {
    const codes = fcontent.split(/\n/g);
    data = ctx.build((line, pos) => {
      return [line, pos, codes[line - 1]]
    });
  }
  return data
};
