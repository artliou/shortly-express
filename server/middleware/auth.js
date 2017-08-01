const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //if no req.cookies
  if (req.headers.cookie) {
    res.end();
  } else {
    return models.Sessions.create()
      .then( data => {
        return models.Sessions.get( {hash: data.hash} );
      })
      .then( hash => {
        console.log(hash);
        res.status(201);
        res.end();
        next();
      })
      .catch(err => {
        res.status(500).send(err);
      });
    //create a session
    
    // req needs session key, session is obj, hash is in obj
    // expect
    // var session = {
    //   session: "hash"
    // };
    res.statusCode = 200;
    res.end();
    next();
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

