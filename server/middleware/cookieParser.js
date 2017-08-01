const parseCookies = (req, res, next) => {
  // console.log(req.headers, "Req");
  // console.log(req.headers.cookie, "POST FIRST");
  
  if (req.headers.cookie) {
    var cookie = req.headers.cookie.split('; ');
    // console.log(cookie);
    req.cookies = {
      shortlyid: cookie[0].slice(10).toString(),
    };
    if (cookie.length > 1) {
      req.cookies.otherCookie = cookie[1].slice(12).toString();
      req.cookies.anotherCookie = cookie[2].slice(14).toString();
    }
  }

  //console.log(req.cookies, 'Here!');  
  res.statusCode = 201;
  res.end();
  next();
};

module.exports = parseCookies;