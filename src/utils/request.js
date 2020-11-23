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
        console.log("Error    => " + Color.Red(data.Data.Main))
        console.log("File     => " + Color.Blue(data.Data.File))
        console.log("Payload  => " + Color.Blue(data.Data.Payload))
        return
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