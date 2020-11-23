const {Command, flags} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

function connect(taskId) {
  const ws = require("websocket");
  const wsc = new ws.client();
  wsc.on('connect', function (c) {
    c.on('error', e => {
      console.error(e);
      process.exit(1);
    });
    c.on('close', _ => process.exit(0));
    c.on('message', m => {
      // console.log(m);
      const msg = JSON.parse(m.utf8Data);
      switch (msg.EType) {
        case 'progress': {
          console.log(`taskId:${taskId}\ttime:${msg.Args.totalTime} s\ttotal:${msg.Args.total}\tspeed:${msg.Args.rps} rps`)
          break
        }
        default: {
          // console.log(m.utf8Data)
        }
      }
      if (msg.EType === "finish" || msg.EType === "error") {
        console.log(m.utf8Data)
        process.exit(0)
      }
    })
  });
  wsc.connect(`${process.env['TASK_API']}/task/${taskId}/events`)
}

class TaskCommand extends Command {
  run(){
    const {flags} = this.parse(TaskCommand)
    
    Request('task/'+ flags.taskid + '/run','POST',null,(one) => {
      console.log()
      console.log(Color.Blue('Success'))
      console.log()
      connect(flags.taskid)
    })
  }
}

TaskCommand.flags = {
  taskid: flags.integer({char: 't', description: 'task id', required: true}),
}

module.exports = TaskCommand