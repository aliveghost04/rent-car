'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = (route, app, models) => {
  const Rent = models.model('Rent');
  const config = app.get('config');

  app.get(route, function (req, res, next) {
    let query = {};
    console.log(req.query);
    if (req.query.from) {
      query.rentDate = { 
        $gte: moment(req.query.from).startOf('day')
      };
    }

    if (req.query.to) {
      query.returnedDate = {
        $lte: moment(req.query.to).endOf('day')
      }
    }

    if (req.params.type) {
      query['vehicle.vehicleType._id'] = models.Types.ObjectId(req.params.type);
    }

    console.log(query);
    Rent
      .find(query)
      .exec()
      .then(rents => {
        res.json(rents);
      })
      .catch(next);
  });
};