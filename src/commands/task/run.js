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
  wsc.on('httpResponse', (res,client) => {
    var list = []
    res.on('data',(t) => {
      list.push(t)
    })
    res.on('end',() => {
      const bfs = Buffer.concat(list).toString()
      const data = JSON.parse(bfs)

      if (res.statusCode!=200) {
        console.log("Code     => " + Color.Red(res.statusCode))
        console.log("Error    => " + Color.Red(data.Data.Main[0]))
        for (var i = 1; i < data.Data.Main.length; i++) {
          console.log("         => " + Color.Red(data.Data.Main[i]))
        }

        if (process.env['DEBUG']) {
          console.log("Stack    => " + Color.Blue(data.Data.Stack[0]))
          for(var i=1; i< data.Data.Stack.length; i++) {
            console.log("            " + Color.Blue(data.Data.Stack[i]))
          }
          console.log("Payload  => " + Color.Blue(data.Data.Payload))
        }
        process.exit(1)
      }
    })
  })
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