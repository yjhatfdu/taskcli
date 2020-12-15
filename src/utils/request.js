const http = require('http')
const { Color } = require('./color.js')

const Request = (path,method,data,cb) => {
  if (!process.env['TASK_API']) {
    return console.error("TASK_API 未配置")
  }

  const req = http.request(process.env['TASK_API'] + "/" + path, {
    method: method
  },(res) => {
    const list = [];
    res.on('data', (chunk) => {
      list.push(chunk)
    });
    res.on('end', () => {
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
        }
        process.exit(1)
      }

      cb(data.Data)
    });
    res.on('error', (e) => {
      return console.error(e)
    })
  })

  req.on('error', (e) => {
    return console.error(e)
  });

  if (data) {
    req.write(JSON.stringify(data))
  }

  req.end()
}

module.exports = Request
