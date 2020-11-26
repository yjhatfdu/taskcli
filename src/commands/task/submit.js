require("source-map").SourceMapConsumer;
const {Command} = require('@oclif/command');
const Request = require('../../utils/request');
const {Color} = require('../../utils/color');
const load = require('../../load');

class TaskCommand extends Command {
  static args = [
    {name: 'filename'},
  ];

  async run() {
    const {args} = this.parse(TaskCommand);
    const filename = args.filename;
    const data = await load(filename);
    console.log(JSON.stringify(data,null,2));
    Request('task', 'POST', data, (one) => {
      console.log();
      console.log(text);
      console.log()
    })
  }
}

module.exports = TaskCommand;
