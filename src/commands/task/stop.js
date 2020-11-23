const {Command, flags} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

class TaskCommand extends Command {
  run(){
    const {flags} = this.parse(TaskCommand)
    
    Request('task/'+ flags.taskid + '/stop','POST',null,(one) => {
      console.log()
      console.log(Color.Blue('Success'))
      console.log()
    })
  }
}

TaskCommand.flags = {
  taskid: flags.integer({char: 't', description: 'task id', required: true}),
}

module.exports = TaskCommand