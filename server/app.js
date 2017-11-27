// require libraries
const app = require('express')();
const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require('cors')

// require routes
const index = require('./routes/index');
const users = require('./routes/users');
const login = require('./routes/login');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// routes
app.use('/login', login);
app.use('/', index);
app.use('/register', users);

app.listen(process.env.PORT || '3000',(err) => {
  if(!err){
    console.log('Jalan di port 3000');
  } else {
    console.log(err);
  }
})
