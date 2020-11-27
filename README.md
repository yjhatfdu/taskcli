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
expr-taskcli/0.6.6 darwin-x64 node-v14.7.0
$ taskcli --help [COMMAND]
USAGE
  $ taskcli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`taskcli help [COMMAND]`](#taskcli-help-command)
* [`taskcli task:delete [TASKID]`](#taskcli-taskdelete-taskid)
* [`taskcli task:info [TASKID]`](#taskcli-taskinfo-taskid)
* [`taskcli task:list`](#taskcli-tasklist)
* [`taskcli task:run [TASKID]`](#taskcli-taskrun-taskid)
* [`taskcli task:stop [TASKID]`](#taskcli-taskstop-taskid)
* [`taskcli task:submit [FILENAME]`](#taskcli-tasksubmit-filename)
* [`taskcli task:update [TASKID] [FILENAME]`](#taskcli-taskupdate-taskid-filename)
* [`taskcli env:info`](#taskcli-envinfo)

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

## `taskcli task:delete [TASKID]`

```
USAGE
  $ taskcli task:delete [TASKID]
```

_See code: [src/commands/task/delete.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.6/src/commands/task/delete.js)_

## `taskcli task:info [TASKID]`

```
USAGE
  $ taskcli task:info [TASKID]
```

_See code: [src/commands/task/info.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.6/src/commands/task/info.js)_

## `taskcli task:list`

```
USAGE
  $ taskcli task:list
```

_See code: [src/commands/task/list.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.6/src/commands/task/list.js)_

## `taskcli task:run [TASKID]`

```
USAGE
  $ taskcli task:run [TASKID]
```

_See code: [src/commands/task/run.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.6/src/commands/task/run.js)_

## `taskcli task:stop [TASKID]`

```
USAGE
  $ taskcli task:stop [TASKID]
```

_See code: [src/commands/task/stop.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.6/src/commands/task/stop.js)_

## `taskcli task:submit [FILENAME]`

```
USAGE
  $ taskcli task:submit [FILENAME]
```

_See code: [src/commands/task/submit.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.6/src/commands/task/submit.js)_

## `taskcli task:update [TASKID] [FILENAME]`

```
USAGE
  $ taskcli task:update [TASKID] [FILENAME]
```

_See code: [src/commands/task/update.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.6/src/commands/task/update.js)_

## `taskcli env:info`

```
USAGE
  $ taskcli env:info
```

_See code: [src/commands/env/info.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.6/src/commands/env/info.js)_
<!-- commandsstop -->
