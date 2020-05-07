let express = require('express');
let router = express.Router();

//DB 연결
let mysql = require('mysql');
let dbconfig = require('./config/dbconfig.js');
let pool = mysql.createPool(dbconfig);

router.get('/init', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let sql = "select * from img order by ID desc limit 0,8";
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

router.get('/createBtns', function(req, res, next){
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

router.get('/page_num', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let page_num = req.query.page_num;
            let sql = "select * from img order by ID desc limit " + (page_num-1)*8 + ", 8";
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


