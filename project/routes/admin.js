const express = require('express');
const router = express.Router();


//DB 연결
const mysql = require('mysql');
const dbconfig = require('./config/dbconfig.js');
const con = mysql.createConnection(dbconfig);

router.get('/', function(req,res,next) {
    /*
        if login => /admin/notices

        else => /admin/sign_in
    */
    res.redirect('/admin/customer');
});

router.get('/prepost', function(req,res,next) { //우선순위 공지사항
    let page = req.query.page ? req.query.page : 1;
    con.query("SELECT * FROM prepostlist order by id desc", function(err,result,fields){
        if(err) throw err;
        res.render('admin/prepostlist/index.ejs',{
            preposts: result 
        });
    })
});

router.get('/prepost/:id', function(req,res,next) { //우선순위 공지사항 디테일 페이지
    const id = req.params.id;
  
    con.connect(function(err) {
        con.query("SELECT * FROM customer where id = ? order by id desc", id,  function (err, result, fields) {
          if (err) throw err;
          res.render('admin/prepostlist/detail.ejs', {
              preposts: result[0]
            }
          );
        });
      });
});

router.get('/prepost/:id', function(req,res,next) { //우선순위 공지사항 등록 페이지
    
    let id=req.params.id;
    let title = req.params.title;
    let content = req.params.content;
    let date = req.params.date;
    
    let DATA = [id,title,content,date];
    
    con.connect(function(err) {
        con.query("SELECT * FROM customer where id = ? order by id desc", id,  function (err, result, fields) {
          if (err) throw err;
          res.render('admin/prepostlist/register.ejs', {
              preposts: result[0]
            }
          );
        });
      });
});

router.get('/post', function(req,res,next) { // 공지사항
    res.render('./admin/index.ejs');
});

router.get('/meal', function(req,res,next) {
    res.render('./admin/index.ejs');
});

router.get('/photo', function(req,res,next){ // 갤러리
    res.render('./admin/photo/index.ejs');
});

router.get('/customer', function(req,res,next) { //문의 및 상담 요청시
    let page = req.query.page ? req.query.page : 1;
    
    con.query("SELECT * FROM customer order by id desc", function (err, result, fields) {
        if (err) throw err;
        res.render('admin/customer/index.ejs', {
            customers: result //프론트로 넘기는 인자
        });
    });
});

router.get('/customer/:id', function(req,res,next) { //문의및 상담 디테일 페이지

    const id = req.params.id;
  
    con.connect(function(err) {
        con.query("SELECT * FROM customer where id = ? order by id desc", id,  function (err, result, fields) {
          if (err) throw err;
          res.render('admin/customer/detail.ejs', {
              customer: result[0]
            }
          );
        });
      });
})

router.get('/consultings', function(req,res,next) {
    res.render('./admin/index.ejs');
});



// router.get('/postListInit', function(req, res, next){
//     pool.getConnection(function(err,conn){
//         if(err) throw err;
//         else{
//             let sql = "select * from postlist order by date desc limit 0,6";
//             conn.query(sql, function(err,rows){
//                 if(err)throw err;
//                 else{
//                     conn.release();
//                     let output = {};
//                     output['result'] = "success";
//                     output['data'] = rows;
//                     res.send(output);
//             }
//         });
//      }
//     });
// });

// router.get('/photoListInit', function(req, res, next){
//     pool.getConnection(function(err,conn){
//         if(err) throw err;
//         else{
//             let sql = "select * from img order by date desc limit 0,5";
//             conn.query(sql, function(err,rows){
//                 if(err)throw err;
//                 else{
//                     conn.release();
//                     let output = {};
//                     output['result'] = "success";
//                     output['data'] = rows;
//                     res.send(output);
//             }
//         });
//      }
//     });
// });
// router.get('/getImages', function(req, res, next){
//     pool.getConnection(function(err,conn){
//         if(err) throw err;
//         else{
//             let sql = "select * from img order by date desc";
//             conn.query(sql, function(err,rows){
//                 if(err)throw err;
//                 else{
//                     conn.release();
//                     let output = {};
//                     output['result'] = "success";
//                     output['data'] = rows;
//                     res.send(output);
//             }
//         });
//      }
//     });
// });

module.exports = router;
