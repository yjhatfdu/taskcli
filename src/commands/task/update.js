const {Command, flags} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')
const compileTs = require("../../compile");
const requireFromString = require('require-from-string');
const fs = require('fs')
const path = require('path')

class TaskCommand extends Command {
  run(){
    const {flags} = this.parse(TaskCommand)
    const filename = flags.filename

    let fcontent = fs.readFileSync(filename).toString()
    if (filename.endsWith(".ts")) {
      const {code, errors} = compileTs(fcontent);
      if (errors.length !== 0) {
        console.error(errors.map(e => `${e.messageText}`).join('\n'))
        process.exit();
      }
      fcontent = code[0].text
    }

    const ctx = requireFromString(fcontent, {
      appendPaths: [path.resolve(__dirname, './../../../node_modules')],
    })
    const data = ctx.build()

    Request('task/'+ flags.taskid,'PUT',data,(one) => {
      const text = `ID => ${Color.Blue(one.ID)} | Version => ${Color.Green(one.Version)}`
      console.log()
      console.log(text)
      console.log()
    })
  }
}

TaskCommand.flags = {
  filename: flags.string({char: 'f', description: 'file to submit', required: true}),
  taskid: flags.integer({char: 't', description: 'task id to update', required: true}),
}

module.exports = TaskCommand