'use strict';

module.exports = function (hook) {
  if (hook.params.query.q && hook.params.query.field) {
    let query = {};
    query[hook.params.query.field] = 
      new RegExp(hook.params.query.q, 'ig');

    Object.assign(hook.params.query, query);
  }

  delete hook.params.query['q'];
  delete hook.params.query['field'];
};
