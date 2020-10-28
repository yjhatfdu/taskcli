class Context {
  counter = 0;
  nodes = [];
  taskInfo = {};
  taskName = "";

  name(name) {
    this.taskName = name
  }

  column(...names) {
    return new ColumnNode(this, names)
  }

  const(...expressions) {
    return new ConstNode(this, expressions)
  }

  concat(...nodes) {
    return new ConcatNode(this, nodes)
  }

  dataSource(ds) {
    this.taskInfo["DataSourceName"] = ds;
    return this
  }

  //todo join option
  sourceTable(schema, table,) {
    if (this.taskInfo.SourceTable == null) {
      this.taskInfo.SourceTable = []
    }
    this.taskInfo.SourceTable.push({
      "Schema": schema,
      "Table": table
    })
    return this
  }

  primaryKeys(...keys) {
    this.taskInfo.PrimaryKeys = keys
    return this
  }

  fetchCount(count) {
    this.taskInfo.FetchCount = count
    return this
  }

  parallel(count) {
    this.taskInfo.Workers = count
    return this
  }

  outPrimaryKeys(...pks) {
    this.taskInfo.OutPrimaryKeys = pks
    return this
  }

  dbSink(dataSource, schema, table, upsert, autoTruncate = false) {
    if (this.taskInfo.Sinks == null) {
      this.taskInfo.Sinks = []
    }
    this.taskInfo.Sinks.push({
      Args: {
        "DataSource": dataSource,
        "Schema": schema,
        "Table": table,
        "Upsert": upsert,
        "TruncateBeforeStart": autoTruncate
      },
      Type: "db"
    })
    return this
  }

  empiSink(empiHost, worker, identifier) {
    if (this.taskInfo.Sinks == null) {
      this.taskInfo.Sinks = []
    }

    const args = {
      "Host": empiHost,
      "Worker": worker,
    }
    Object.keys(identifier).forEach(c => {
      args[c] = identifier[c]
    })
    this.taskInfo.Sinks.push({
      Args: args,
      Type: "empi"
    })
    return this
  }

  useOutPutAggregation(orderByColumn = "", desc = false, aggrType = "last") {
    this.taskInfo.OutputAggregation = {
      UseAggr: true,
      AggrType: "last",//目前只支持last
      OrderByColumn: orderByColumn,
      Desc: desc
    }
    return this
  }

  build() {
    let nodes = this.nodes.map(n => n.build());
    return {Graph: nodes.filter(x => !!x), Info: this.taskInfo, Name: this.taskName}
  }

  submit(host, port) {
    const data = JSON.stringify(this.build(), null, 2);
    console.log(data);
    const http = require('http');
    const req = http.request({
      method: "POST",
      hostname: host,
      port: port,
      path: "/task",
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      res.on('data', d => {
        process.stdout.write(d)
      })
    })
    req.on('error', error => {
      console.error(error)
    })
    req.write(data)
    req.end()
  }

  update(host, port, taskId) {
    const data = JSON.stringify(this.build(), null, 2);
    console.log(data);
    const http = require('http');
    const req = http.request({
      method: "PUT",
      hostname: host,
      port: port,
      path: "/task/" + taskId,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      res.on('data', d => {
        process.stdout.write(d)
      })
    })
    req.on('error', error => {
      console.error(error)
    })
    req.write(data)
    req.end()
  }
}

class Node {
  prev;
  next;
  ctx;
  type;
  index;
  fields;

  constructor(ctx, type, lastNode) {
    this.prev = [];
    this.next = [];
    this.ctx = ctx;
    this.type = type;
    this.index = ctx.counter++;
    ctx.nodes[this.index] = this;
    if (lastNode) {
      this.prev.push(lastNode);
      lastNode.next.push(this);
      this.fields = lastNode.fields
    }
  }

  pipe(f) {
    return f(this)
  }

  rename(...name) {
    name.forEach((n, i) => n === '-' ? true : this.fields[i] = n);
    return this;
  }

  field(...fieldName) {
    return new FieldNode(this.ctx, this, fieldName)
  }

  output(name) {
    new TargetNode(this.ctx, this, name)
  }

  filter(expr) {
    return new FilterNode(this.ctx, this, expr)
  }

  aggr(type, argsExprs, groupByExpr, orderByExpr, desc) {
    return new AggrNode(this.ctx, this, type, argsExprs, groupByExpr, orderByExpr, desc)
  }

  map(...expr) {
    return new MapNode(this.ctx, this, expr, null);
  }

  mapQuery(queryArgs) {
    return new MapNode(this.ctx, this, null, queryArgs)
  }

  summary(type, expr, ...args) {
    return new SummaryNode(this.ctx, this, type, expr, ...args)
  }

  build() {
    return {
      Index: this.index,
      NodeType: this.type,
      Pre: this.prev.map(n => n.index),
      Next: this.next.map(n => n.index),
      Id: "" + this.index,
    }
  }
}

class ColumnNode extends Node {
  names;

  constructor(ctx, names) {
    super(ctx, 'column', null);
    this.names = names.slice();
    this.fields = names.slice();
  }

  build() {
    let n = super.build();
    n.NodeArgs = JSON.stringify(this.names);
    return n
  }
}

class ConstNode extends Node {
  expressions;

  constructor(ctx, expressions) {
    super(ctx, 'const', null);
    this.expressions = expressions;
  }

  build() {
    let n = super.build();
    if (this.expressions) {
      n.HandlerType = 'expr';
      n.HandlerArgs = JSON.stringify(this.expressions)
    } else if (this.query) {
      n.HandlerType = 'query';
      n.HandlerArgs = JSON.stringify(this.query)
    }
    return n;
  }
}

class TargetNode extends Node {
  name;

  constructor(ctx, lastNode, name) {
    super(ctx, "output", lastNode);
    this.name = name;
  }

  build() {
    let n = super.build();
    n.NodeArgs = this.name;
    return n
  }
}

class MapNode extends Node {
  expressions;
  query;

  constructor(ctx, lastNode, expressions, query) {
    super(ctx, 'map', lastNode);
    this.expressions = expressions;
    this.query = query;
  }

  build() {
    let n = super.build();
    if (this.expressions) {
      n.HandlerType = 'expr';
      n.HandlerArgs = JSON.stringify(this.expressions)
    } else if (this.query) {
      n.HandlerType = 'query';
      n.HandlerArgs = JSON.stringify(this.query)
    }
    return n;
  }
}

function mapExpr(...expr) {
  return function (node) {
    return new MapNode(node.ctx, node, expr, null);
  }
}

function mapQuery(queryArgs) {
  return function (node) {
    return new MapNode(node.ctx, node, null, queryArgs);
  }
}

class FieldNode extends Node {
  fieldIndex = [];

  constructor(ctx, lastNode, fields) {
    super(ctx, 'field', lastNode);
    this.fields = fields;
    this.fieldIndex = fields.map(f => lastNode.fields.indexOf(f))
  }

  build() {
    let n = super.build();
    n.NodeArgs = JSON.stringify(this.fieldIndex);
    return n
  }
}

class ConcatNode extends Node {
  parentNodes;

  constructor(ctx, parentNodes) {
    super(ctx, 'concat', null);
    this.parentNodes = parentNodes;
    parentNodes.forEach(p => {
      p.next.push(this);
      this.prev.push(p);
    })
  }

  build() {
    let n = super.build();
    n.NodeType = 'map';
    n.HandlerType = 'empty';
    return n
  }
}

class FilterNode extends Node {
  expr;

  constructor(ctx, lastNode, expr) {
    super(ctx, "filter", lastNode);
    this.expr = expr;
  }

  build() {
    let n = super.build();
    n.NodeArgs = this.expr;
    return n
  }
}

const SummaryType = {
  count: "count", sum: "sum", notNullPercent: "notNullPercent", groupCount: "groupCount", histogram: "histogram"
}

class SummaryNode extends Node {
  expr;
  stype;
  args;

  constructor(ctx, lastNode, type, expr, ...args) {
    super(ctx, "summary", lastNode);
    this.expr = expr;
    this.stype = type;
    this.args = args
  }

  build() {
    let n = super.build();
    n.NodeArgs = JSON.stringify({expr: this.expr, type: this.stype, args: this.args})
    return n
  }
}

class AggrNode extends Node {
  aggType
  argsExpr
  groupByExpr
  orderByExpr
  desc

  constructor(ctx, lastNode, type, argsExpr, groupByExpr, orderByExpr, desc) {
    super(ctx, "aggr", lastNode);
    this.aggType = type
    this.argsExpr = argsExpr
    this.groupByExpr = groupByExpr
    this.orderByExpr = orderByExpr
    this.desc = desc
  }

  build() {
    let n = super.build();
    n.NodeArgs = JSON.stringify({
      AggType: this.aggType,
      AggArgsExpr: this.argsExpr,
      GroupByExpr: this.groupByExpr,
      OrderByExpr: this.orderByExpr,
      Desc: this.desc
    });
    return n
  }
}


module.exports = {Context, mapExpr, mapQuery, SummaryType};
