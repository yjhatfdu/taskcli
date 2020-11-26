const {Command} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

class TaskCommand extends Command {
  static args = [
    {name: 'taskid'},
  ]

  run(){
    const {args} = this.parse(TaskCommand)
    
    Request('task/'+ args.taskid + '/stop','POST',null,(one) => {
      console.log()
      console.log(Color.Blue('Success'))
      console.log()
    })
  }
}

module.exports = TaskCommand