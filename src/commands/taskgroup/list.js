const {Command} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

class TaskCommand extends Command {
  run(){
    Request('taskgroups','GET',null,(list) => {
      console.log()
      for (let i = 0; i< list.length; i ++) {
        const text = `ID: => ${Color.Blue(list[i].ID)} | Name => ${Color.Brown(list[i].Name)}`
        console.log(text)
        console.log()
      }
    })
  }
}

module.exports = TaskCommand
