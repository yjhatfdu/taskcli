const {Command, flags} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

class TaskCommand extends Command {
  run(){
    const {flags} = this.parse(TaskCommand)
    
    Request('task/'+ flags.taskid,'GET',null,(one) => {
      const text = `ID => ${Color.Blue(one.Id)} | Version => ${Color.Green(one.Version)} | Name => ${Color.Brown(one.Name)} State => ${one.State} Err => ${Color.Red(one.Err)}`
      console.log()
      console.log(text)
      console.log()
    })
  }
}

TaskCommand.flags = {
  taskid: flags.integer({char: 't', description: 'task id', required: true}),
}

module.exports = TaskCommand