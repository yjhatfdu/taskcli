const {Command, flags} = require('@oclif/command')
const Request = require('../request')
const { Color,Foreground } = require('../color')
const fs = require('fs')

class TaskCommand extends Command {
  run(){
    const {flags} = this.parse(TaskCommand)
    if (flags.List) {this.list(flags)}
    if (flags.Create) {this.create(flags)}
    if (flags.Retrieve) {this.retrieve(flags)}
    if (flags.Update) {this.update(flags)}
    if (flags.Delete) {this.delete(flags)}
  }

  list(flags){
    Request('tasks','GET',null,(list) => {
      console.log()
      for (let i = 0; i< list.length; i ++) {
        const text = `ID => ${Color.Blue(list[i].Id)} | Version => ${Color.Green(list[i].Version)} | Name => ${Color.Brown(list[i].Name)} State => ${list[i].State}`
        console.log(text)
        console.log()
      }
    })
  }

  create(flags){
    if (!flags.file) {
      return console.error("请指定task file")
    }

    const ctx = require(flags.file)
    const data = ctx.build()

    Request('task','POST',data,(one) => {
      const text = `ID => ${Color.Blue(one.Id)} | Version => ${Color.Green(one.Version)}`
      console.log()
      console.log(text)
      console.log()
    })
  }

  retrieve(flags){
    if (!flags.id) {
      return console.error("请指定task id")
    }
    Request('task/'+ flags.id,'GET',null,(one) => {
      const text = `ID => ${Color.Blue(one.Id)} | Version => ${Color.Green(one.Version)} | Name => ${Color.Brown(one.Name)} State => ${one.State} Err => ${Color.Red(one.Err)}`
      console.log()
      console.log(text)
      console.log()
    })
  }

  update(flags){
    if (!flags.id) {
      return console.error("请指定task id")
    }
    if (!flags.file) {
      return console.error("请指定task file")
    }
    
    const ctx = require(flags.file)
    const data = ctx.build()
    
    Request('task/'+ flags.id,'PUT',data,(one) => {
      const text = `ID => ${Color.Blue(one.Id)} | Version => ${Color.Green(one.Version)}`
      console.log()
      console.log(text)
      console.log()
    })
  }

  delete(flags){
    if (!flags.id) {
      return console.error("请指定task id")
    }
    Request('task/'+ flags.id,'DELETE',null,(one) => {
      console.log()
      console.log(Color.Blue('Success'))
      console.log()
    })
  }
}

TaskCommand.description = `task actions [CRUD/List]
...
Extra documentation goes here
`

TaskCommand.flags = {
  List: flags.boolean({char: "l", description: 'List Tasks', exclusive: ['Create','Retrieve','Update','Delete']}),
  Create: flags.boolean({char: "c", description: 'Create Task', exclusive: ['list','Retrieve','Update','Delete']}),
  Retrieve: flags.boolean({char: "r", description: 'Retrieve Task', exclusive: ['list','Create','Update','Delete']}),
  Update: flags.boolean({char: "u", description: 'Update Task', exclusive: ['list','Create','Retrieve','Delete']}),
  Delete: flags.boolean({char: "d", description: 'Delete Task', exclusive: ['list','Create','Retrieve','Update']}),
  id: flags.integer({char: "i", description: 'Task ID'}),
  file: flags.string({char: "f", description: 'Task File'}),
}

module.exports = TaskCommand