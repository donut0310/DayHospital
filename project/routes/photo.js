var express = require('express');
var router = express.Router();

//DB 연결
var mysql = require('mysql');
var dbconfig = require('./config/dbconfig.js');
var pool = mysql.createPool(dbconfig);

router.get('/init', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var sql = "select * from img order by date desc limit 0,6";
            conn.query(sql, function(err,rows){
                if(err)throw err;
                else{
                    conn.release();
                    var output = {};
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
            var sql = "select * from img order by date desc";
            conn.query(sql, function(err,rows){
                if(err)throw err;
                else{
                    conn.release();
                    var output = {};
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
            var page_num = req.query.page_num;
            var sql = "select * from img order by date desc limit " + (page_num-1)*6 + ", 6";
            conn.query(sql, function(err,rows){
                if(err)throw err;
                else{
                    conn.release();
                    var output = {};
                    output['result'] = "success";
                    output['data'] = rows;
                    res.send(output);
            }
        });
     }
    });
});

router.get('/select_content_order', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{

            var id = req.query.id;
            
            var sql;
            if(parseInt(id) == 1){
                sql = 'select * from img where id between ' + parseInt(id) + ' and ' + (parseInt(id)+1);
                var params = id;
                
                conn.query(sql, params, function(err,rows){
                    if(err) throw err;
                    else{
                        conn.release();
                        var output = {};
                        output['result'] = "success";
                        output['data'] = rows;
                        res.send(output);
                    }        
                });
            }
            else{
                sql = 'select * from img where ID between ' + (parseInt(id) - 1) + ' and ' + (parseInt(id) + 1);
                var params = id;
                
                conn.query(sql, params, function(err,rows){
                    if(err) throw err;
                    else{
                        conn.release();
                        var output = {};
                        output['result'] = "success";
                        output['data'] = rows;
                        res.send(output);
                    }        
                });
            }
        
        }
    });
});
module.exports = router;