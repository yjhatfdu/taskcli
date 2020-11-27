const {Command} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

class TaskCommand extends Command {
  run(){
    Request('datasources','GET',null,(list) => {
      console.log()
      for (let i = 0; i< list.length; i ++) {
        const text = `SourceType: => ${Color.Blue(list[i].SourceType)} | URL => ${Color.Green(list[i].URL)} | Name => ${Color.Brown(list[i].Name)}`
        console.log(text)
        console.log()
      }
    })
  }
}

module.exports = TaskCommand
