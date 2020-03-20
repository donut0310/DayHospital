var express = require('express');
var router = express.Router();

//DB 연결
var mysql = require('mysql');
var dbconfig = require('./config/dbconfig.js');
var pool = mysql.createPool(dbconfig);

router.post('/init', function(req, res, next){
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

router.post('/createBtns', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let sql = "select * from postlist order by content_order desc";
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
            let page_num = req.body.page_num;
       
            let sql = "select * from postlist order by content_order desc limit " + (page_num-1)*10 + ", 10";
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

router.post('/selectData', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let otn = req.body.value;
            let text;
            let sql;
            if(req.body.text == ''){
                sql = 'select * from postlist order by content_order desc';
                var params = text;
 
                conn.query(sql, params, function(err,rows){
                    if(err) throw err;
                    else{
                            conn.release();
                            let output = {};
                            output['result'] = "success";
                            output['data'] = 'init';
                            res.send(output);
                    }        
                });
            }
            else if(otn == 0){
                text = req.body.text + '%';
                sql = 'select * from postlist where TITLE like ?';
                var params = text;
 
                conn.query(sql, params, function(err,rows){
                    if(err) throw err;
                    else{
                            conn.release();
                            let output = {};
                            output['result'] = "success";
                            output['data'] = rows;
                            res.send(output);
                    }        
                });
            }
        }
    });
});

router.post('/selectData_page_num', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let page_num = req.body.page_num;
            let otn = req.body.value;
            let text;
            let sql;
            if(req.body.text == ''){
                sql = 'select * from postlist order by content_order desc';
                var params = text;
 
                conn.query(sql, params, function(err,rows){
                    if(err) throw err;
                    else{
                            conn.release();
                            let output = {};
                            output['result'] = "success";
                            output['data'] = 'init';
                            res.send(output);
                    }        
                });
            }
            else if(otn == 0){
                text = req.body.text + '%';
                sql = 'select * from postlist where TITLE like ? limit ' + (page_num-1)*10 + ', 10';
                var params = text;
 
                conn.query(sql, params, function(err,rows){
                    if(err) throw err;
                    else{
                            conn.release();
                            let output = {};
                            output['result'] = "success";
                            output['data'] = rows;
                            res.send(output);
                    }        
                });
            }
        }
    });
});

router.post('/select_content_order', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let content_order = req.body.content_order;
            let sql;
            sql = 'select * from postlist where content_order = ?';
            var params = content_order;
 
            conn.query(sql, params, function(err,rows){
                if(err) throw err;
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


