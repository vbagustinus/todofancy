var jwt = require('jsonwebtoken');

let isLogin = (req, res, next) =>{
  let token = req.body.headers
  console.log('==========================', token);
  // verify a token symmetric
  // jwt.verify(token, 'estehpurun', function(err, decoded) {
  //   if(!err){
  //     req.decoded = decoded
  //     next()
  //   } else {
  //     console.log(err)
  //   }
  // });
}

module.exports = {
  isLogin
}
