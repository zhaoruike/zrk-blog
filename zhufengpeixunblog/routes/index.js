var express = require('express');
var router = express.Router();
var model=require('../db/index.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data',function(req,res,next){
  model.article.find(function(err,doc){
    if(err){
      res.send('获取失败')
    }else{
      res.send(JSON.stringify(doc))
      console.log(doc)
    }
  })
});

module.exports = router;
