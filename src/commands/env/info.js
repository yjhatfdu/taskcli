const {Command} = require('@oclif/command')
const { Color } = require('../../utils/color')

class TaskCommand extends Command {
  run(){
    console.log("API   => " + Color.Blue(process.env["TASK_API"]))
    console.log("DEBUG => " + (process.env["DEBUG"]?Color.Blue("true"):Color.Red("false")))
  }
}

module.exports = TaskCommand