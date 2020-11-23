const ts = require("typescript");
const fs = require('fs');
const path = require('path');
module.exports = function compileTs(code) {
  let outputs = [];
  let compilerHost = {
    getSourceFile: function (filename) {
      if (filename === "task.ts")
        return ts.createSourceFile(filename, code+"declare const module: any;\ndeclare function require(s:string):any;\nif(!module.exports){module.exports=require('expr_builder').defaultContext};", "esnext");
      let p = path.join(__dirname, "../", filename);
      if (fs.existsSync(p)) {
        return ts.createSourceFile(filename, fs.readFileSync(p).toString(), "esnext")
      }
      return undefined;
    },
    writeFile: function (name, text, writeByteOrderMark) {
      outputs.push({name: name, text: text, writeByteOrderMark: writeByteOrderMark});
    },
    getDefaultLibFileName: function () {
      return "node_modules/typescript/lib/lib.d.ts";
    },
    fileExists: function (f) {
      return  fs.existsSync(path.join(__dirname, "../", f));
    },
    useCaseSensitiveFileNames: function () {
      return false;
    },
    getCanonicalFileName: function (filename) {
      return filename;
    },
    getCurrentDirectory: function () {
      return "";
    },
    getNewLine: function () {
      return "\n";
    }
  };
  let p = ts.createProgram(["task.ts"], {
    target:"esnext",
    module:"commonjs"
  }, compilerHost);
  let emitResult = p.emit();
  let allDiagnostics = ts
    .getPreEmitDiagnostics(p)
    .concat(emitResult.diagnostics)
  return {
    code: outputs,
    errors: allDiagnostics
  }
}
