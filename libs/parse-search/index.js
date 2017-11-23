'use strict';

module.exports = function (hook) {
  if (hook.params.query.q) {
    let query = {};
    query[hook.params.query.field] = 
      new RegExp(hook.params.query.q);

    delete hook.params.query['q'];
    delete hook.params.query['field'];

    Object.assign(hook.params.query, query);
  }
};
