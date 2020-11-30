const {Command} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

function connect(taskId, cb) {
  const ws = require("websocket");
  const wsc = new ws.client();
  wsc.on('connect', function (c) {
    cb()
    c.on('error', e => {
      console.log(Color.red(e));
      process.exit(1);
    });
    c.on('close', _ => process.exit(0));
    c.on('message', m => {
      const msg = JSON.parse(m.utf8Data);
      switch (msg.EType) {
        case 'start':
          console.log(Color.Blue("Start"))
          console.log()
          break
        case 'progress':
          console.log(`taskId:${taskId}\ttime:${msg.Args.totalTime} s\ttotal:${msg.Args.total}\tspeed:${msg.Args.rps} rps`)
          break
        case 'finish':
          console.log()
          console.log(Color.Blue("Finish"))
          process.exit(0)
          break
        case 'error':
          console.log(Color.Red(msg.Args.message))
          process.exit(0)
          break
        default: {
          // console.log(m.utf8Data)
        }
      }
    })
  });
  wsc.connect(`${process.env['TASK_API']}/task/${taskId}/events`)
}

class TaskCommand extends Command {
  static args = [
    {name: 'taskid', required: true},
  ]

  run(){
    const {args} = this.parse(TaskCommand)
  
    connect(args.taskid,()=>{
      Request('task/'+ args.taskid + '/run','POST',null,(one) => {
        console.log()
        console.log(Color.Blue('Requested'))
        console.log()
      })
    })
  }
}

module.exports = TaskCommand