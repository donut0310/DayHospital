const express = require('express');
const router = express.Router();

//DB 연결
const mysql = require('mysql');
const dbconfig = require('./config/dbconfig.js');
const con = mysql.createConnection(dbconfig);

const fs = require('fs'); // file System
const multer = require('multer');   
const upload = multer({dest :'../project/public/assets/uploads/' , limits :{fileSize : 10 * 1024 * 1024}});

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

router.post('/prepostlist',function(req,res,next){
    const title = req.body.title;
    const content = req.body.content;
    const datas = [title,content];
    
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

router.put('/prepostlist/:id',function(req,res,next){
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;

    con.connect(function(err) {
        con.query("update prepostlist set title = ?, content = ? where id = ?", [title, content, id],  function (err, result, fields) {
            if (err) throw err;
            res.redirect("/admin/prepostlist");
        });
      });
});

router.delete('/prepostlist/:id',function(req,res,next){
    const id = req.params.id;
    console.log('delete')
    con.connect(function(err) {
        con.query("delete FROM prepostlist where id = ?", id,  function (err, result, fields) {
            if (err) throw err;
            res.redirect("/admin/prepostlist");
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
});

router.post('/meal',upload.array('file_name',10), function(req,res,next){

    const file_name = req.files[0].filename;
    const title = req.body.title;
    const content = req.body.content;
    const date = req.body.date;
    const datas = [file_name,title,content,date];

    console.log(req.files[0].originalname);
    console.log(req.body.file_name);

    // fs.readFile(req.files.file_name.path, function(error, data){
    //     const filePath = __dirname + "\\files\\" + file_name;
    //     console.log(filePath);
    //     fs.writeFile(filePath, data, function(error){
    //         if(err) {
    //             throw err;
    //         } else{
    //             res.redirect("/admin/meal");
    //         }
    //     })
    // });

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

router.put('/postlist/:id',function(req,res,next){
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;

    con.connect(function(err) {
        con.query("update postlist set title = ?, content = ? where id = ?", [title, content, id],  function (err, result, fields) {
            if (err) throw err;
            res.redirect("/admin/postlist");
        });
      });
});

router.delete('/postlist/:id',function(req,res,next){
    const id = req.params.id;
    con.connect(function(err) {
        con.query("delete FROM postlist where id = ?", id,  function (err, result, fields) {
            if (err) throw err;
            res.redirect("/admin/postlist");
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
              consult : result[0]
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

router.get('/img/:id',function(req,res,next){
    const id = req.params.id;
  
    con.connect(function(err) {
        con.query("SELECT * FROM img where id = ? order by id desc", id,  function (err, result, fields) {
            
            if (err) throw err;
          res.render('admin/img/detail.ejs', {
              img : result[0]
            }
          );
        });
      });
});

router.get('/img/:id',function(req,res,next){
    const id = req.params.id;
  
    con.connect(function(err) {
        con.query("SELECT * FROM filename where id = ? order by id desc", id,  function (err, result, fields) {
            
            if (err) throw err;
          res.render('admin/img/detail.ejs', {
              filename : result[0]
            }
          );
        });
      });
});

router.post('/img', upload.array('file_name',10), function(req,res,next){
    // let file_name=[];

    // for (let i=0;i<req.files.length;i++){
    //     file_name.push(req.files[i].filename);
    // }
    let file_name = req.files[0].filename;
    for(let i=1;i<req.files.length;i++){
        file_name = file_name + "," + req.files[i].filename;
        console.log('hello world');
    }
    const title = req.body.title;
    const content = req.body.content;
    //const date = req.body.date;
    const datas = [file_name,title,content];

    console.log(file_name);
    
    // con.query("insert into filename(FILE_NAME) values(?)",file_name,function(err,rows){
    //     if(err) throw err;
    // });

    con.query("insert into img(file_name,TITLE, CONTENT, DATE) values(?,?,?,now())",datas,function(err,rows){
        if(err) throw err;
        res.redirect('/admin/img');
    });

});

// router.get('/prepostlist/:id',function(req,res,next){
//     const id = req.params.id;
  
//     con.connect(function(err) {
//         con.query("SELECT * FROM prepostlist where id = ? order by id desc", id,  function (err, result, fields) {
            
//             if (err) throw err;
//           res.render('admin/prepostlist/detail.ejs', {
//               prepost: result[0]
//             }
//           );
//         });
//       });
// });



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
