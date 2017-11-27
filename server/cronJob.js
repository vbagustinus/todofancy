const cron = require('node-cron');
const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/todo?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
// const mongoose = require('mongoose').connect('mongodb://localhost/todo');
const Task = require('./models/taskModel')
const User = require('./models/userModel')
const ObjectId = require('mongodb').ObjectId
const sendEmail = require('./helper/sendEmail');

cron.schedule('0 6 * * *', function(){
  Task.find({})
  .populate('user_id')
  .then(dataTask =>{
    dataTask.map(task => {
      let time = new Date()
      let yourTime = new Date(task.remainder)
      if(task.remainder && task.user_id.email){
        if(time.getMonth() === yourTime.getMonth()){
          if(yourTime.getDate() - time.getDate() <= 1){
            sendEmail(task)
            let id = {_id : ObjectId(task._id)}
            Task.deleteOne(id)
            .then(dataTask => res.send(
            {
              msg: 'Successfully Delete after send email'
            }))
            .catch(err => {
              console.log('KOK ERROR',err);
              res.status(500).send(err)
            })
          }
        }
      }
    })
  })
  .catch(err=>{
    console.log(err);
  })
});
