const {Command} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

class TaskCommand extends Command {
  run(){
    Request('functions','GET',null,(list) => {
      for(var key in list) {
        var f = list[key]
        console.log(Color.Brown(f.Name + " =>"))
        for(var key2 in f.Overloading) {
          var one = f.Overloading[key2]
          console.log("  In(" + Color.Blue(one.Input) + ")   |   Out(" + Color.Blue(one.Output) + ")")
        }
        console.log()
      }
    })
  }
}

module.exports = TaskCommand
