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
$ etl COMMAND
running command...
$ etl (-v|--version|version)
expr-taskcli/0.6.7 darwin-x64 node-v14.15.0
$ etl --help [COMMAND]
USAGE
  $ etl COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`etl datasource:delete NAME`](#etl-datasourcedelete-name)
* [`etl datasource:info ACTION NAME [SCHEMA] [TABLE]`](#etl-datasourceinfo-action-name-schema-table)
* [`etl datasource:list`](#etl-datasourcelist)
* [`etl datasource:new NAME TYPE URL`](#etl-datasourcenew-name-type-url)
* [`etl datasource:update OLDNAME NAME TYPE URL`](#etl-datasourceupdate-oldname-name-type-url)
* [`etl env:info`](#etl-envinfo)
* [`etl help [COMMAND]`](#etl-help-command)
* [`etl task:delete TASKID`](#etl-taskdelete-taskid)
* [`etl task:info TASKID`](#etl-taskinfo-taskid)
* [`etl task:list`](#etl-tasklist)
* [`etl task:run TASKID`](#etl-taskrun-taskid)
* [`etl task:stop TASKID`](#etl-taskstop-taskid)
* [`etl task:submit FILENAME`](#etl-tasksubmit-filename)
* [`etl task:update TASKID FILENAME`](#etl-taskupdate-taskid-filename)

## `etl datasource:delete NAME`

```
USAGE
  $ etl datasource:delete NAME
```

_See code: [src/commands/datasource/delete.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/datasource/delete.js)_

## `etl datasource:info ACTION NAME [SCHEMA] [TABLE]`

```
USAGE
  $ etl datasource:info ACTION NAME [SCHEMA] [TABLE]
```

_See code: [src/commands/datasource/info.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/datasource/info.js)_

## `etl datasource:list`

```
USAGE
  $ etl datasource:list
```

_See code: [src/commands/datasource/list.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/datasource/list.js)_

## `etl datasource:new NAME TYPE URL`

```
USAGE
  $ etl datasource:new NAME TYPE URL
```

_See code: [src/commands/datasource/new.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/datasource/new.js)_

## `etl datasource:update OLDNAME NAME TYPE URL`

```
USAGE
  $ etl datasource:update OLDNAME NAME TYPE URL
```

_See code: [src/commands/datasource/update.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/datasource/update.js)_

## `etl env:info`

```
USAGE
  $ etl env:info
```

_See code: [src/commands/env/info.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/env/info.js)_

## `etl help [COMMAND]`

display help for etl

```
USAGE
  $ etl help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `etl task:delete TASKID`

```
USAGE
  $ etl task:delete TASKID
```

_See code: [src/commands/task/delete.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/task/delete.js)_

## `etl task:info TASKID`

```
USAGE
  $ etl task:info TASKID
```

_See code: [src/commands/task/info.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/task/info.js)_

## `etl task:list`

```
USAGE
  $ etl task:list
```

_See code: [src/commands/task/list.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/task/list.js)_

## `etl task:run TASKID`

```
USAGE
  $ etl task:run TASKID
```

_See code: [src/commands/task/run.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/task/run.js)_

## `etl task:stop TASKID`

```
USAGE
  $ etl task:stop TASKID
```

_See code: [src/commands/task/stop.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/task/stop.js)_

## `etl task:submit FILENAME`

```
USAGE
  $ etl task:submit FILENAME
```

_See code: [src/commands/task/submit.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/task/submit.js)_

## `etl task:update TASKID FILENAME`

```
USAGE
  $ etl task:update TASKID FILENAME
```

_See code: [src/commands/task/update.js](https://github.com/yjhatfdu/taskcli/blob/v0.6.7/src/commands/task/update.js)_
<!-- commandsstop -->
