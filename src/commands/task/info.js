const {Command} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

class TaskCommand extends Command {
  static args = [
    {name: 'taskid', required: true},
  ]

  run(){
    const {args} = this.parse(TaskCommand)
    
    Request('task/'+ args.taskid,'GET',null,(one) => {
      const text = `ID => ${Color.Blue(one.Id)} | Version => ${Color.Green(one.Version)} | Name => ${Color.Brown(one.Name)} State => ${one.State} Err => ${Color.Red(one.Err)}`
      console.log()
      console.log(text)
      console.log()
    })
  }
}

module.exports = TaskCommand