/**
 * Created by zrk on 2016/10/31.
 */
var express = require('express');
var router = express.Router();
var model = require('../db/index.js');

router.get('/add', function (req, res, next) {
  var user = req.cookies.token;
  if(!user){
    return res.redirect('/user/login');
  }
  res.render('article/add', {title: '增加用户'});
});

router.post('/add', function (req, res, next) {
  var text = req.body;
  var fail = {code: 1, message: '发表失败'};
  var success = {code: 0, message: '发表成功'};
  var user = req.cookies.token;

  text.user = user;
  new model.article(text).save(function (err, doc) {
    if (err) {
      res.send(JSON.stringify(fail));
    } else {
      res.send(JSON.stringify(success));
    }
  })
});
module.exports = router;