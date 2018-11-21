var express = require('express');
var router = express.Router();


// 使用  mongodb的mongoose
var mongoose = require('mongoose');//引用mongoose
var model = require('../models/model');//引用数据模型
var Demo = model.Demo;

// 数据库连接
mongoose.connect('mongodb://localhost/express_curb');



/* GET home page. */
//  首页 index.html
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'express curb ejs模板和html模板混用' });
  Demo.find(function(err,docs){
    res.render('index',{
      title:'express curb ejs模板和html模板混用',
      demos:docs
    });
  });
});

// 增加页面  跳转到增加页面  create.html
router.get('/create.html',function(req,res,next){
  // res.render('create',{ title: '添加一条数据'})
  Demo.find(function(err,docs){
    res.render('create',{
      title:'添加一条数据',
      demos:docs
    });
  });
});

// 增加页面  提交数据到数据库
router.post('/create.html',function(req,res,next){
  var demo = new Demo({
    uid:req.body.uid,
    title:req.body.title,
    content:req.body.content
  });

  console.log('===create===');

  demo.save(function(err,doc){
    console.log(doc);
    res.redirect('/');
  });
});


// 根据id删除对应的数据
router.get('/delete.html',function(req,res,next){
  var id = req.query.id;
  if(id && id != ''){
    console.log('===delete id = ' + id);
    Demo.findByIdAndRemove(id,function(err,docs){
      console.log(docs);
      res.redirect('/');
    });
  }
});


// 查询对应修改记录，并跳转到修改页面
router.get('/update.html',function(req,res,next){
  var id = req.query.id;
  if(id && id != ''){
    Demo.findById(id,function(err,docs){
      console.log('===findById(\" ' + id + ' \")===\n' + docs);
      res.render('update',{
        title:'修改数据',
        demo:docs
      });
    });
  }
});


// 修改数据
router.post('/update.html',function(req,res,next){
  var demo = {
    uid:req.body.uid,
    title:req.body.title,
    content:req.body.content
  };

  var id = req.body.id;
  if(id && id != ''){
    console.log('===update id = ' + id);
    Demo.findByIdAndUpdate(id,demo,function(err,docs){
      console.log(docs);
      res.redirect('/');
    });
  }
});


// 详情
router.get('/details.html',function(req,res,next){
  var id = req.query.id;
  if(id && id != ''){
    Demo.findById(id,function(err,docs){
      console.log('====findById(\"' + id + '\")===\n' + docs);
      res.render('details',{
        title:'详情页',
        demo:docs
      });
    });
  }
});


// 搜索
// router.get('/', function(req, res, next) {
//   Demo.find(function(err,docs){
//     res.render('index',{
//       title:'express curb ejs模板和html模板混用',
//       demos:docs
//     });
//   });
// });


module.exports = router;
