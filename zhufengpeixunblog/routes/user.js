/**
 * Created by zrk on 2016/10/31.
 */

var express = require('express');
var router = express.Router();
var model = require('../db/index.js');

router.get('/reg/', function (req, res, next) {
  res.render('user/reg', {title: '用户注册'});
});

router.post('/reg', function (req, res, next) {
  //res.send({message:req.body.username});

  var user = req.body;
  delete user.repassword;
  var already = {
    code: 2,
    message: '用户已经存在'
  };
  model.user.find({username: user.username}, function (err, doc) {
    if (doc.length != 0) {
      res.send(JSON.stringify(already))
    } else {
      new model.user(user).save(function (err, doc) {
        var fail = {
          code: 1,
          message: '注册失败'
        };
        var success = {
          code: 0,
          message: '注册成功'
        }
        if (err) {
          res.send(
            JSON.stringify(fail)
          )
        } else {
          res.send(
            JSON.stringify(success)
          )
        }
      })
    }
  });
});

router.get('/login', function (req, res, next) {
  res.render('user/login', {title: '用户登录'});
});

router.post('/login', function (req, res, next) {
  var user = req.body;

  var no = {
    code: 1,
    message: '用户不存在'
  };
  var secret_no = {
    code: 2,
    message: '密码不正确'
  };
  var yes = {
    code: 0,
    message: '登录成功'
  };
  model.user.find({username: user.username}, function (err, doc) {
    if (doc.length == 0) {
      res.send(JSON.stringify(no))
      return;
    }
    if (doc.length == 1) {
      if (doc[0].password === user.password) {
        res.cookie('token',doc[0].username);
        res.send(JSON.stringify(yes));
      } else {
        res.send(JSON.stringify(secret_no))

      }
    }
  })
});

router.get('/logout', function (req, res) {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;