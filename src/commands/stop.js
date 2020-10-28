const {Command, flags} = require('@oclif/command')
const axios = require('axios')

class StopCommand extends Command {
  async run() {
    const {flags} = this.parse(StopCommand)
    axios({method: 'POST', url: process.env['TASK_API'] + '/task/' + flags.taskid + '/stop'})
      .then(res => {
        if (res.status === 200) {
          console.log("stopped")
        } else {
          console.error(res.data.error)
        }
      }, err => {
        console.error(err.response.data.error);
      })
  }
}

StopCommand.description = `stop task
...
Extra documentation goes here
`

StopCommand.flags = {
  taskid: flags.integer({char: 't', description: 'task id to stop'}),
}

module.exports = StopCommand
