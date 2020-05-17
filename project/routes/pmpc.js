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
            var sql = "select * from postlist order by ID desc limit 0,8";
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
            var sql = "select * from postlist order by ID desc";
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
            var sql = "select * from postlist order by ID desc limit " + (page_num-1)*8 + ", 8";
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

router.get('/selectData', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var otn = req.query.value;
            var text;
            var sql;
            if(req.query.text == ''){
                sql = 'select * from postlist order by ID desc';
                var params = text;
 
                conn.query(sql, params, function(err,rows){
                    if(err) throw err;
                    else{
                            conn.release();
                            var output = {};
                            output['result'] = "success";
                            output['data'] = 'init';
                            res.send(output);
                    }        
                });
            }
            else if(otn == 0){
                text = req.query.text + '%';
                sql = 'select * from postlist where TITLE like ?';
                var params = text;
 
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

router.get('/selectData_page_num', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var page_num = req.query.page_num;
            var otn = req.query.value;
            var text;
            var sql;
            if(req.query.text == ''){
                sql = 'select * from postlist order by ID desc';
                var params = text;
 
                conn.query(sql, params, function(err,rows){
                    if(err) throw err;
                    else{
                            conn.release();
                            var output = {};
                            output['result'] = "success";
                            output['data'] = 'init';
                            res.send(output);
                    }        
                });
            }
            else if(otn == 0){
                text = req.query.text + '%';
                sql = 'select * from postlist where TITLE like ? limit ' + (page_num-1)*8 + ', 8';
                var params = text;
 
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

router.get('/select_content_order', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{

            var id = req.query.id;

            var sql;
            if(parseInt(id) == 1){
                sql = 'select * from postlist where ID between 1 and 2';
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
                sql = 'select * from postlist where ID between ' + (parseInt(id) - 1) + ' and ' + (parseInt(id) + 1);
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

router.get('/preList', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            
            var sql = "select * from prepostlist order by ID desc limit 0," + "4";
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
module.exports = router;


