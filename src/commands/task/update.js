require("source-map").SourceMapConsumer;
const {Command} = require('@oclif/command');
const Request = require('../../utils/request');
const {Color} = require('../../utils/color');
const load = require('../../load');

class TaskCommand extends Command {
  static args = [
    {name: 'taskid'},
    {name: 'filename'},
  ]
  
  async run() {
    const {args} = this.parse(TaskCommand);
    const filename = args.filename;
    const data = await load(filename);
    Request('task/' + args.taskid, 'PUT', data, (one) => {
      console.log();
      console.log(`ID => ${Color.Blue(one.ID)} | Version => ${Color.Green(one.Version)}`);
      console.log()
    })
  }
}

module.exports = TaskCommand;
