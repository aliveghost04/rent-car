'use strict';
const jwt = require('jsonwebtoken');

module.exports = (route, app, models) => {
  const Rent = models.model('Rent');
  const config = app.get('config');

  app.get(route, function (req, res, next) {
    let result = {};
    let promises = [];

    let rentDate = moment().startOf('day').toDate();
    let returnedDate = moment().startOf('day').toDate();

    // promises.push(Rent.find({
    //   $and: [{
    //     rentDate: {
    //       $gte: moment().startOf('day')
    //     },
    //     rentDate: {
    //       $lte: moment().endOf('day')
    //     }
    //   }]
    // }).count());
    promises.push(Promise.resolve(1));
    promises.push(Promise.resolve(1200));
    // promises.push(Rent.aggregate([{

    // }]));

    Promise
      .all(promises)
      .then(([rentQuantity, rentTotal]) => {
        result.total = rentTotal;
        result.quantity = rentQuantity;

        res.json(result);
      }).catch(next);
  });
};