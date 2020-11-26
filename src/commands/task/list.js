const {Command} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

class TaskCommand extends Command {
  run(){
    Request('tasks','GET',null,(list) => {
      console.log()
      for (let i = 0; i< list.length; i ++) {
        const text = `ID => ${Color.Blue(list[i].Id)} | Version => ${Color.Green(list[i].Version)} | Name => ${Color.Brown(list[i].Name)} State => ${list[i].State}`
        console.log(text)
        console.log()
      }
    })
  }
}

module.exports = TaskCommand