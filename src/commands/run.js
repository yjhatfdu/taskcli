const {Command, flags} = require('@oclif/command')
const axios = require('axios')

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

class RunCommand extends Command {
  async run() {
    const {flags} = this.parse(RunCommand)
    axios({method: 'POST', url: process.env['TASK_API'] + '/task/' + flags.taskid + '/run'})
      .then(res => {
        if (res.status === 204) {
          console.log("started");
          if (!flags.background) {
            connect(flags.taskid)
          }
        } else {
          console.error(res.data.error)
        }
      }, err => {
        console.error(err.response.data);
      })
  }
}

RunCommand.description = `run task
...
Extra documentation goes here
`

RunCommand.flags = {
  taskid: flags.integer({char: 't', description: 'task id to run'}),
  background: flags.boolean({char: "d", description: 'run in background'})
}

module.exports = RunCommand
