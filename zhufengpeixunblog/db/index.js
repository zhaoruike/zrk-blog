/**
 * Created by zrk on 2016/11/1.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
//models = require('./models');
var settings = require('../setting');
mongoose.connect(settings.url);
var userModel = mongoose.model('User', new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
}));
var articleModel = mongoose.model('Article', new Schema({
    user: String,
    title: String,
    text: String,
    createAt: {
      type: Date,
      default: Date.now()
    }
  }))
  ;
global.Model = function (modelName) {
  return mongoose.model(modelName);
};

var model = {
  user: userModel,
  article: articleModel
};
module.exports = model;