// const {Command} = require('@oclif/command')
// const Request = require('../../utils/request')
// const { Color } = require('../../utils/color')

// class TaskCommand extends Command {
//   static args = [
//     {name: 'name', required: true},
//     {name: 'type', required: true, options: ['postgres', 'oracle', 'sqlserver'],},
//     {name: 'url', required: true},
//   ];

//   run(){
//     const {args} = this.parse(TaskCommand);
//     var req = {
//       SourceType: args.type,
//       URL: args.url,
//       Name: args.name,
//     }

//     Request('datasource','Post',req,() => {
//       console.log(Color.Blue("Success"))
//     })
//   }
// }

// module.exports = TaskCommand
