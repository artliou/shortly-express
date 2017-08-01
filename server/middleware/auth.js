const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  
  if (req.headers.cookies) {
    // return models.Users.get()
    //   .then(results => {
    //     console.log(results, 'results');
    //     req.session = {
    //       user: {
    //         username: results.username
    //       }
    //     };
    //       // console.log(req.session);
    //     res.status(201);
    console.log('divert');
    res.end();
    next();
      // });
  } else {
    return models.Sessions.create()
      .then( data => {
        // console.log('this?', data);
        return models.Sessions.get({id: data.insertId});
      })
      .then( results => {
        req.session = {
          userId: results.id,
          hash: results.hash
        };
        return req.session;
      })
      .then( (session) => {
        res.cookies = {
          'shortlyid': { value: session.hash }
        };
        // console.log(res.cookies);
        res.status(201);
        res.end();
        next();
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

