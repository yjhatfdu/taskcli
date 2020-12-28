const {Command} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

class TaskCommand extends Command {
  static args = [
    {name: 'groupname', required: true},
  ];

  run(){
    const {args} = this.parse(TaskCommand);
    Request('taskgroup','POST',{Name: args.groupname},(id) => {
      console.log(Color.Blue(`ID => ${id}`));
    })
  }
}

module.exports = TaskCommand
