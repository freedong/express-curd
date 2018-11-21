var mongoose = require('mongoose');
var schema = mongoose.Schema;


var demoSchema = new schema({
  uid:String,
  title:String,
  content:String,
  createTime:{
    type:Date,
    default:Date.now
  }
});

exports.Demo = mongoose.model('demo',demoSchema,'demo');
