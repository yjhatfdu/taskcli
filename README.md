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
expr-taskcli/0.6.0 darwin-x64 node-v14.7.0
$ taskcli --help [COMMAND]
USAGE
  $ taskcli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`taskcli help [COMMAND]`](#taskcli-help-command)
* [`taskcli task:delete`](#taskcli-taskdelete)
* [`taskcli task:info`](#taskcli-taskinfo)
* [`taskcli task:list`](#taskcli-tasklist)
* [`taskcli task:run`](#taskcli-taskrun)
* [`taskcli task:stop`](#taskcli-taskstop)
* [`taskcli task:submit`](#taskcli-tasksubmit)
* [`taskcli task:update`](#taskcli-taskupdate)

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

## `taskcli task:delete`

```
USAGE
  $ taskcli task:delete

OPTIONS
  -t, --taskid=taskid  (required) task id to delete
```

_See code: [src/commands/task/delete.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.0/src/commands/task/delete.js)_

## `taskcli task:info`

```
USAGE
  $ taskcli task:info

OPTIONS
  -t, --taskid=taskid  (required) task id
```

_See code: [src/commands/task/info.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.0/src/commands/task/info.js)_

## `taskcli task:list`

```
USAGE
  $ taskcli task:list
```

_See code: [src/commands/task/list.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.0/src/commands/task/list.js)_

## `taskcli task:run`

```
USAGE
  $ taskcli task:run

OPTIONS
  -t, --taskid=taskid  (required) task id
```

_See code: [src/commands/task/run.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.0/src/commands/task/run.js)_

## `taskcli task:stop`

```
USAGE
  $ taskcli task:stop

OPTIONS
  -t, --taskid=taskid  (required) task id
```

_See code: [src/commands/task/stop.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.0/src/commands/task/stop.js)_

## `taskcli task:submit`

```
USAGE
  $ taskcli task:submit

OPTIONS
  -f, --filename=filename  (required) file to submit
```

_See code: [src/commands/task/submit.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.0/src/commands/task/submit.js)_

## `taskcli task:update`

```
USAGE
  $ taskcli task:update

OPTIONS
  -f, --filename=filename  (required) file to submit
  -t, --taskid=taskid      (required) task id to update
```

_See code: [src/commands/task/update.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.0/src/commands/task/update.js)_
<!-- commandsstop -->
