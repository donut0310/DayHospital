var express = require('express');
var router = express.Router();


//DB 연결
var mysql = require('mysql');
var dbconfig = require('./config/dbconfig.js');
var pool = mysql.createPool(dbconfig);


router.post('/initPostlist', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let sql = "select * from postlist order by content_order desc limit 0,10";
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

router.post('/getImg', function(req, res, next){
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


router.post('/initPhoto', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let sql = "select * from img order by ID desc limit 0,6";
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
