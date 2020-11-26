require("source-map").SourceMapConsumer;
const {Command, flags} = require('@oclif/command');
const Request = require('../../utils/request');
const {Color} = require('../../utils/color');
const load = require('../../load');

class TaskCommand extends Command {
  async run() {
    const {flags} = this.parse(TaskCommand);
    const filename = flags.filename;
    const data = await load(filename);
    Request('task', 'POST', data, (one) => {
      const text = `ID => ${Color.Blue(one.ID)} | Version => ${Color.Green(one.Version)}`;
      console.log();
      console.log(text);
      console.log()
    })
  }
}

TaskCommand.flags = {
  filename: flags.string({char: 'f', description: 'file to submit', required: true}),
};

module.exports = TaskCommand;
