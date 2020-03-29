var express = require('express');
var router = express.Router();

//DB 연결
var mysql = require('mysql');
var dbconfig = require('./config/dbconfig.js');
var pool = mysql.createPool(dbconfig);

router.post('/getImg', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let pageNum = req.body.pageNum;
            let sql = "select * from img order by ID desc limit " + (pageNum-1)*3 + ",3";
            conn.query(sql, function(err,rows){
                if(err)throw err;
                else{
                    conn.release();
                    let output = {};
                    output['result'] = "success";
                    output['data'] = rows;
                    res.send(output);
            }
        });
     }
    });
});

router.post('/createBtns', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let sql = "select * from img order by ID desc";
            conn.query(sql, function(err,rows){
                if(err)throw err;
                else{
                    conn.release();
                    let output = {};
                    output['result'] = "success";
                    output['data'] = rows;
                    res.send(output);
            }
        });
     }
    });
});

router.post('/page_num', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let pageNum = req.body.pageNum;
       
            let sql = "select * from img order by ID desc limit " + (pageNum-1)*3 + ", 3";
            conn.query(sql, function(err,rows){
                if(err)throw err;
                else{
                    conn.release();
                    let output = {};
                    output['result'] = "success";
                    output['data'] = rows;
                    res.send(output);
            }
        });
     }
    });
});
module.exports = router;