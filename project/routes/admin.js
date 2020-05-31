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

router.get('/prepost', function(req,res,next) {
    res.render('./admin/index.ejs');
});
router.get('/meal', function(req,res,next) {
    res.render('./admin/index.ejs');
});

router.get('/post', function(req,res,next) {
    res.render('./admin/index.ejs');
});

router.get('/customer', function(req,res,next) {
    let page = req.query.page ? req.query.page : 1;
    
    con.query("SELECT * FROM customer order by id desc", function (err, result, fields) {
        if (err) throw err;
        res.render('admin/customer/index.ejs', {
            customers: result
        });
    });
});

router.get('/customer/:id', function(req,res,next) {

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
