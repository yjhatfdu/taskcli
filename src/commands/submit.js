const {Command, flags} = require('@oclif/command')
const fs = require('fs')
const requireFromString = require('require-from-string');
const axios = require('axios')
const path=require('path')
class SubmitCommand extends Command {
  async run() {
    const {flags} = this.parse(SubmitCommand)
    const filename = flags.filename
    let fcontent = fs.readFileSync(filename).toString()
    const ctx = requireFromString(fcontent, {
      appendPaths: [path.resolve(__dirname,'./../../node_modules')],
    })
    // console.log(fcontent)
    const data = ctx.build()
    axios({method: 'POST', url: process.env['TASK_API'] + '/task', data})
      .then(res => {
        if (res.status === 200) {
          console.log(`taskId: ${res.data.Id} Version: ${res.data.Version}`)
        } else {
          console.error(res.data)
        }
      }, err => {
        console.error(err.response || err.toString());
      }).catch(err => console.log(err.toString()))
  }
}

SubmitCommand.description = `submit task
...
Extra documentation goes here
`

SubmitCommand.flags = {
  filename: flags.string({char: 'f', description: 'file to submit'}),
}

module.exports = SubmitCommand
