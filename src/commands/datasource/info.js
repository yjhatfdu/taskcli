const {Command} = require('@oclif/command')
const Request = require('../../utils/request')
const { Color } = require('../../utils/color')

const ping = (name) => {
  Request(`datasource/${name}`,'GET',null,(list) => {
    console.log(Color.Blue("Success"))
  })
}

const schemas = (name) => {
  Request(`datasource/${name}/schemas`,'GET',null,(list) => {
    for (let i = 0; i< list.length; i ++) {
      console.log(Color.Blue(list[i]))
    }
  })
}

const tables = (name, schema) => {
  Request(`datasource/${name}/schema/${schema}/tables`,'GET',null,(list) => {
    for (let i = 0; i< list.length; i ++) {
      console.log(Color.Blue(list[i].name))
    }
  })
}

const columns = (name, schema, table) => {
  Request(`datasource/${name}/schema/${schema}/table/${table}/columns`,'GET',null,(list) => {
    for (let i = 0; i< list.length; i ++) {
      console.log(Color.Blue(list[i].name))
    }
  })
}

class TaskCommand extends Command {
  static args = [
    {name: 'action', required: true, options: ['ping', 'schemas', 'tables','columns']},
    {name: 'name', required: true},
    {name: 'schema'},
    {name: 'table'},
  ];

  run(){
    const {args} = this.parse(TaskCommand);

    switch(args.action) {
      case "ping":
        ping(args.name)
        break;
      case "schemas":
        schemas(args.name)
        break;
      case "tables":
        tables(args.name, args.schema)
        break;
      case "columns":
        columns(args.name, args.schema, args.table)
        break;
    }
  }
}

module.exports = TaskCommand
