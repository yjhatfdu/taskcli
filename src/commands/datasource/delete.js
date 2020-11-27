const {Command} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

class TaskCommand extends Command {
  static args = [
    {name: 'name', required: true},
  ];

  run(){
    const {args} = this.parse(TaskCommand);
    Request('datasources','GET',null,(list) => {
      Request('datasource/' + args.name,'DELETE',null,() => {
        console.log(Color.Blue("Success"))
      })
    })
  }
}

module.exports = TaskCommand
