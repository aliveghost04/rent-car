'use strict';
const feathers = require('feathers');
const service = require('feathers-mongoose');
const userError = require('../libs/error')('user');
const parseSearch = require('../libs/parse-search');

module.exports = (route, app, models) => {
  const User = models.model('User');

  app.use(route, service({
    Model: User,
    paginate: {
      max: 100
    }
  }));

  app.service(route).hooks({
    before: {
      find: parseSearch,
      update: function (hook) {
        return User
          .findById(hook.id)
          .exec()
          .then(user => {
            if (user) {
              Object.assign(user, hook.data);
              return user.save();
            } else {
              return Promise.reject(new userError('not_found'));
            }
          })
          .then(user => {
            hook.result = user;
            return hook;
          })
      }
    }, after: {
      get: function (hook) {
        delete hook.result.password;
      }
    }
  });
};
