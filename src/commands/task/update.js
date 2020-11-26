const {Command} = require('@oclif/command');
const Request = require('../../utils/request');
const {Color} = require('../../utils/color');
const compileTs = require("../../compile");
const requireFromString = require('require-from-string');
const fs = require('fs');
const path = require('path');

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
      const text = `ID => ${Color.Blue(one.ID)} | Version => ${Color.Green(one.Version)}`;
      console.log();
      console.log(text);
      console.log()
    })
  }
}

module.exports = TaskCommand;
