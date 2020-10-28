const {Command, flags} = require('@oclif/command')
const fs = require('fs')
const requireFromString = require('require-from-string');
const axios = require('axios')

class UpdateCommand extends Command {
  async run() {
    const {flags} = this.parse(UpdateCommand)
    const filename = flags.filename
    let fcontent = fs.readFileSync(filename).toString()
    const ctx = requireFromString(fcontent)
    // console.log(fcontent)
    const data = ctx.build()
    axios({method: 'PUT', url: process.env['TASK_API'] + '/task/' + flags.taskid, data})
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log(`taskId: ${res.data.Id} Version: ${res.data.Version}`)
        } else {
          console.error(res.data.error)
        }
      }, err => {
        console.error(err.response.data.error);
      }).catch(err => console.log(err.toString()))
  }
}

UpdateCommand.description = `update task
...
Extra documentation goes here
`

UpdateCommand.flags = {
  filename: flags.string({char: 'f', description: 'file to submit'}),
  taskid: flags.integer({char: 't', description: 'task id to update'}),
}

module.exports = UpdateCommand
