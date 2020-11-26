const {Command, flags} = require('@oclif/command');
const Request = require('../../utils/request');
const {Color} = require('../../utils/color');
const compileTs = require("../../compile");
const requireFromString = require('require-from-string');
const fs = require('fs');
const path = require('path');

class TaskCommand extends Command {
  async run() {
    const {flags} = this.parse(TaskCommand);
    const filename = flags.filename;
    const data = await load(filename);
    Request('task/' + flags.taskid, 'PUT', data, (one) => {
      const text = `ID => ${Color.Blue(one.ID)} | Version => ${Color.Green(one.Version)}`;
      console.log();
      console.log(text);
      console.log()
    })
  }
}

TaskCommand.flags = {
  filename: flags.string({char: 'f', description: 'file to submit', required: true}),
  taskid: flags.integer({char: 't', description: 'task id to update', required: true}),
};

module.exports = TaskCommand;
