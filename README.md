taskcli
=======



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/expr-taskcli.svg)](https://npmjs.org/package/expr-taskcli)
[![Downloads/week](https://img.shields.io/npm/dw/expr-taskcli.svg)](https://npmjs.org/package/expr-taskcli)
[![License](https://img.shields.io/npm/l/expr-taskcli.svg)](https://github.com/yjhatfdu/taskcli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g expr-taskcli
$ taskcli COMMAND
running command...
$ taskcli (-v|--version|version)
expr-taskcli/0.4.2 darwin-x64 node-v14.7.0
$ taskcli --help [COMMAND]
USAGE
  $ taskcli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`taskcli help [COMMAND]`](#taskcli-help-command)
* [`taskcli run`](#taskcli-run)
* [`taskcli stop`](#taskcli-stop)
* [`taskcli submit`](#taskcli-submit)
* [`taskcli task`](#taskcli-task)
* [`taskcli update`](#taskcli-update)

## `taskcli help [COMMAND]`

display help for taskcli

```
USAGE
  $ taskcli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `taskcli run`

run task

```
USAGE
  $ taskcli run

OPTIONS
  -d, --background     run in background
  -t, --taskid=taskid  task id to run

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/run.js](https://github.com/yjhatfdu/taskcli/blob/v0.4.2/src/commands/run.js)_

## `taskcli stop`

stop task

```
USAGE
  $ taskcli stop

OPTIONS
  -t, --taskid=taskid  task id to stop

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/stop.js](https://github.com/yjhatfdu/taskcli/blob/v0.4.2/src/commands/stop.js)_

## `taskcli submit`

submit task

```
USAGE
  $ taskcli submit

OPTIONS
  -f, --filename=filename  file to submit

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/submit.js](https://github.com/yjhatfdu/taskcli/blob/v0.4.2/src/commands/submit.js)_

## `taskcli task`

task actions [CRUD/List]

```
USAGE
  $ taskcli task

OPTIONS
  -c, --Create     Create Task
  -d, --Delete     Delete Task
  -f, --file=file  Task File
  -i, --id=id      Task ID
  -l, --List       List Tasks
  -r, --Retrieve   Retrieve Task
  -u, --Update     Update Task

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/task.js](https://github.com/yjhatfdu/taskcli/blob/v0.4.2/src/commands/task.js)_

## `taskcli update`

update task

```
USAGE
  $ taskcli update

OPTIONS
  -f, --filename=filename  file to submit
  -t, --taskid=taskid      task id to update

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/update.js](https://github.com/yjhatfdu/taskcli/blob/v0.4.2/src/commands/update.js)_
<!-- commandsstop -->
