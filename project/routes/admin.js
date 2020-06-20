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
    res.redirect('/admin/prepostlist');
});

router.get('/prepostlist',function(req,res,next){
    let page = req.query.page ? req.query.page : 1;
    
    con.query("SELECT * FROM prepostlist order by id desc", function (err, result, fields) {
        if (err) throw err;
        res.render('admin/prepostlist/index.ejs', {
            preposts: result
        });
    
    });
});

router.get('/prepostlist/register',function(req,res,next){
    res.render('admin/prepostlist/register.ejs');
  
})

router.post('/prepostlist/register',function(req,res,next){
    //const id = req.body.name;
    const title = req.body.title;
    const content = req.body.content;
    const date = req.body.date;
    const datas = [name,title,content];
    
    con.query("insert into prepostlist(TITLE, CONTENT, DATE) values(?,?,now())",datas,function(err,rows){
        if(err) throw err;
        res.redirect('/admin/prepostlist');
    });
});

router.get('/prepostlist/:id',function(req,res,next){
    const id = req.params.id;
  
    con.connect(function(err) {
        con.query("SELECT * FROM prepostlist where id = ? order by id desc", id,  function (err, result, fields) {
            
            if (err) throw err;
          res.render('admin/prepostlist/detail.ejs', {
              prepost: result[0]
            }
          );
        });
      });
});


router.get('/meal', function(req,res,next) {
    let page = req.query.page ? req.query.page : 1;
    
    con.query("SELECT * FROM meal order by id desc", function (err, result, fields) {
        if (err) throw err;
        res.render('admin/meal/index.ejs', {
            meals: result
        });
    
    });
});

router.get('/meal/register',function(req,res,next){
    res.render('admin/meal/register.ejs');
  
})

router.post('/meal',function(req,res,next){
    const file_name = req.body.file_name;
    const title = req.body.title;
    const content = req.body.content;
    const date = req.body.date;
    const datas = [file_name,title,content,date];
    
    con.query("insert into meal(FILE_NAME, TITLE, CONTENT, DATE) values(?,?,?,now())",datas,function(err,rows){
        if(err) throw err;
        res.redirect('/admin/meal');
    });
});

router.get('/meal/:id',function(req,res,next){
    const id = req.params.id;
  
    con.connect(function(err) {
        con.query("SELECT * FROM meal where id = ? order by id desc", id,  function (err, result, fields) {
            
            if (err) throw err;
          res.render('admin/meal/detail.ejs', {
              meal : result[0]
            }
          );
        });
      });
});

router.get('/postlist', function(req,res,next) {
    let page = req.query.page ? req.query.page : 1;
    
    con.query("SELECT * FROM postlist order by id desc", function (err, result, fields) {
        if (err) throw err;
        res.render('admin/postlist/index.ejs', {
            posts: result
        });
    
    });
});

router.get('/postlist/register',function(req,res,next){
    res.render('admin/postlist/register.ejs');
  
})

router.post('/postlist',function(req,res,next){
    const title = req.body.title;
    const content = req.body.content;
    const datas = [title,content];
    
    con.query("insert into postlist(TITLE, CONTENT, DATE) values(?,?,now())",datas,function(err,rows){
        if(err) throw err;
        res.redirect('/admin/postlist');
    });
});

router.get('/postlist/:id',function(req,res,next){
    const id = req.params.id;
  
    con.connect(function(err) {
        con.query("SELECT * FROM postlist where id = ? order by id desc", id,  function (err, result, fields) {
            
            if (err) throw err;
          res.render('admin/postlist/detail.ejs', {
              post: result[0]
            }
          );
        });
      });
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

router.get('/consulting', function(req,res,next) {
    let page = req.query.page ? req.query.page : 1;
    
    con.query("SELECT * FROM consulting order by id desc", function (err, result, fields) {
        if (err) throw err;
        res.render('admin/consulting/index.ejs', {
            consults: result
        });
    
    });
});

router.get('/consulting/:id', function(req,res,next) {

    const id = req.params.id;
  
    con.connect(function(err) {
        con.query("SELECT * FROM consulting where id = ? order by id desc", id,  function (err, result, fields) {
          if (err) throw err;
          res.render('admin/consulting/detail.ejs', {
              consult: result[0]
            }
          );
        });
      });
})


router.get('/img',function(req,res,next){
    let page = req.query.page ? req.query.page : 1;
    
    con.query("SELECT * FROM img order by id desc", function (err, result, fields) {
        if (err) throw err;
        res.render('admin/img/index.ejs', {
            imgs: result
        });
    
    });
});

router.get('/img/register',function(req,res,next){
    res.render('admin/img/register.ejs');
  
})

router.post('/img',function(req,res,next){
    const title = req.body.title;
    const content = req.body.content;
    const date = req.body.date;
    const datas = [name,title,content];
    
    con.query("insert into prepostlist(TITLE, CONTENT, DATE) values(?,?,now())",datas,function(err,rows){
        if(err) throw err;
        res.redirect('/admin/prepostlist');
    });
});

router.get('/prepostlist/:id',function(req,res,next){
    const id = req.params.id;
  
    con.connect(function(err) {
        con.query("SELECT * FROM prepostlist where id = ? order by id desc", id,  function (err, result, fields) {
            
            if (err) throw err;
          res.render('admin/prepostlist/detail.ejs', {
              prepost: result[0]
            }
          );
        });
      });
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
