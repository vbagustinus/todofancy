const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/todo?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
// const mongoose = require('mongoose').connect('mongodb://localhost/todo');
const Task = require('../models/taskModel')
const ObjectId = require('mongodb').ObjectId
// const short = require('../middlewares/shortUrl')


const findAll = (req, res) => {
  // console.log(req.query.user_id);
  let id = req.query.user_id
  Task.find(
  {
    user_id: ObjectId(id)
  })
  .then(tasks => {
    console.log(tasks);
    res.send(
    {
      tasks
    })
  })
  .catch(err => res.status(500).send(err))
}

const create = (req, res) => {
  let input = req.body
  // console.log('))))))))))))))))))',input);
  Task.findOne(
  {
    title: input.title,
    user_id: ObjectId(input.user_id)
  })
  .then( result => {
    // console.log('=>>>>>>>',result);
    if(!result){
      let objTask = {
        title: input.title,
        remainder : input.time,
        user_id: ObjectId(input.user_id)
      }
      // console.log(objTask);
      Task.create(objTask)
      .then(newdataTask => {
        res.send(
        {
          msg: 'Success created',
          data: newdataTask
        })
      })
    } else {
      res.send(
      {
        msg: `You've made this task`
      })
    }
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

const updatefalse = (req, res) => {
  let id = ObjectId(req.params.id)
  // console.log('CEK STATUS',id);
  Task.findById(id)
  .then(dataTask => {
    console.log('ISI TASK UNTUK FALSE',dataTask);
    dataTask.status = false
    dataTask.save(function(err) {
      if (err) throw err;
      res.send(
      {
        msg: 'Task successfully updated!'
      });
    });
  })
  .catch(err => res.status(500).send(err))
}

const updatetrue = (req, res) => {
  let id = ObjectId(req.params.id)
  // console.log('CEK STATUS',id);
  Task.findById(id)
  .then(dataTask => {
    console.log('ISI TASK',dataTask);
    dataTask.status = true
    dataTask.save(function(err) {
      if (err) throw err;
      res.send(
      {
        msg: 'Task successfully updated!'
      });
    });
  })
  .catch(err => res.status(500).send(err))
}

const destroy = (req, res) => {
  let id = {_id : ObjectId(req.params.id)}
  Task.deleteOne(id)
  .then(dataTask => res.send(
  {
    msg: 'Successfully Delete',
    data: dataTask
  }))
  .catch(err => {
    console.log('KOK ERROR',err);
    res.status(500).send(err)
  })
}


module.exports = {
  findAll,
  create,
  updatetrue,
  updatefalse,
  destroy
};
