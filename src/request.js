const http = require('http')

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

      if (res.statusCode!=200) {
        return console.error("Response Code => %s | Info => %s", res.statusCode, bfs)
      }

      const data = JSON.parse(bfs)
      cb(data)
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