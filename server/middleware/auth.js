const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  
  Promise.resolve(req.cookies.shortlyid) 
    .then(hash => {
      if (!hash) {
        throw hash;
      }
      return models.Sessions.get({hash});
    })
    .tap(session => {
      if (!session) {
        throw session;
      }
    })
   .catch(() => {
     return models.Sessions.create()
      .then(data => {
        return models.Sessions.get({id: data.insertId});
      })
      .tap(session => {
        res.cookie('shortlyid', session.hash);
      });
   })
   .then(session => {
     req.session = session;
     next();
   }); 
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

