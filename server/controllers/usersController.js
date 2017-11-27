const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/todo?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
// const mongoose = require('mongoose').connect('mongodb://localhost/todo');
const User = require('../models/userModel')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const findAll = (req, res) => {
  User.find()
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err))
}

const createfb = (req, res) => {
  return new Promise((resolve, reject) => {
    User.findOne(
    {
      username : req.id
    })
    .then( userfb => {
      if(!userfb){
        let obj = {
          name: req.name,
          username: req.id,
          password: 'defaultpassword',
          email : req.email
        }
        User.create(obj)
        .then( user => {
          if(user){
            jwt.sign(
            {
              id: user._id,
              name : user.name,
              username : user.username,
              email : user.email
            },
              process.env.SECRET_KEY,
              (err, token) => {
                // console.log('TOKEN', token);
                if(!err){
                  console.log(
                    token, `Welcome ${user.name}`, user._id
                  );
                  resolve(
                  {
                    token: token,
                    name : user.name,
                    user_id: user._id,
                    email : user.email
                  })
                } else {
                  reject(err)
                }
              })
          }
        })
      } else {
        jwt.sign(
        {
          id: userfb._id,
          name : userfb.name,
          username : userfb.username,
          email : userfb.email
        },
          process.env.SECRET_KEY,
          (err, token) => {
            // console.log('TOKEN', token);
            if(!err){
              console.log(
                token, `Welcome ${userfb.name}`, userfb._id
              );
              resolve(
              {
                token: token,
                name : userfb.name,
                user_id: userfb._id,
                email : userfb.email
              })
            } else {
              reject(err)
            }
          })
      }
    })
    .catch( err => {
      console.log(err);
      res.status(500).send(err)
    })
  });
}

const create = (req, res) => {
  const saltRounds = 10;
  // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.body.username);
  let input = req.body
    User.findOne({
        username: input.username
    })
    .then(user => {
      // console.log('STATUS', user);
      if(!user){
        bcrypt.hash(input.password, saltRounds).then(function(hash) {
          let obj = {
            name: input.name,
            username: input.username,
            password: hash,
            email : input.email
          }
          User.create(obj)
          .then( user => {
            res.send(
            {
              msg: 'Success created account',
              data: user
            })
          })
        });
      } else {
        res.send(
        {
          msg: 'Username already exists !!'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
}

const destroy = (req, res) => {
  let id = {_id: ObjectId(req.params.id)}
  User.deleteOne(id)
  .then(user => res.send(
  {
    msg : 'Data removed',
    data : user
  })
  )
  .catch(err => res.status(500).send(err))
}

const signin = (req, res) => {
  // console.log('MASUK LOGIN', req.body);
  let signin = req.body
  User.findOne(
  {
    username: signin.username
  })
  .then(user => {
    if(user){
      bcrypt.compare(signin.password, user.password)
      .then( result => {
        // console.log('<<<<<<<<',user);
        if(result){
          jwt.sign(
          {
            id: user._id,
            name : user.name,
            username : user.username,
            email : user.email
          },
            process.env.SECRET_KEY,
            (err, token) => {
              // console.log('TOKEN', token);
              if(!err){
                console.log(
                  token, `Welcome ${user.name}`, user._id
                );
                res.send(
                {
                  token: token,
                  name : user.name,
                  user_id: user._id,
                  email : user.email
                })
              } else {
                res.status(400).send(err)
              }
            })
        } else {
          res.send({msg: 'Wrong Password or username'})
        }
      });
    } else {
      res.send({msg: 'Wrong Password or username'})
    }
  })
  .catch(err => {
    res.status(500).send({msg: 'Wrong Password or username'})
  })
}

const updateEmail = (req , res) =>{
  let id = ObjectId(req.params.id)
  // console.log('CEK STATUS',req.body.email);
  User.findById(id)
  .then(dataUser => {
    dataUser.email = req.body.email
    dataUser.save(function(err, data) {
      if (err) throw err;
      res.send(
      {
        email : data,
        msg: 'Email successfully updated!'
      });
    });
  })
  .catch(err => res.status(500).send(err))
}
module.exports = {
  findAll,
  create,
  destroy,
  signin,
  createfb,
  updateEmail
};
