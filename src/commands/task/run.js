const {Command} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

function connect(taskId) {
  const ws = require("websocket");
  const wsc = new ws.client();
  wsc.on('connect', function (c) {
    c.on('error', e => {
      console.log(Color.red(e));
      process.exit(1);
    });
    c.on('close', _ => process.exit(0));
    c.on('message', m => {
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
        console.log(Color.Red(m.utf8Data))
        process.exit(0)
      }
    })
  });
  wsc.connect(`${process.env['TASK_API']}/task/${taskId}/events`)
}

class TaskCommand extends Command {
  static args = [
    {name: 'taskid'},
  ]

  run(){
    const {args} = this.parse(TaskCommand)
    Request('task/'+ args.taskid + '/run','POST',null,(one) => {
      console.log()
      console.log(Color.Blue('Success'))
      console.log()
      connect(args.taskid)
    })
  }
}

module.exports = TaskCommand