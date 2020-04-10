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
            let sql = "select * from meal order by ID desc limit 0,5";
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
            let sql = "select * from meal order by ID desc";
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
            let sql = "select * from meal order by ID desc limit " + (page_num-1)*5 + ", 5";
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

router.get('/selectData', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let otn = req.query.value;
            let text;
            let sql;
            if(req.query.text == ''){
                sql = 'select * from meal order by ID desc';
                let params = text;
 
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
                text = req.query.text + '%';
                sql = 'select * from meal where TITLE like ?';
                let params = text;
 
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

router.get('/selectData_page_num', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let page_num = req.query.page_num;
            let value = req.query.value;
            let text;
            let sql;
            if(req.query.text == ''){
                sql = 'select * from meal order by ID desc';
                let params = text;
 
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
            else if(value == 0){
                text = req.query.text + '%';
                sql = 'select * from meal where TITLE like ? limit ' + (page_num-1)*5 + ', 5';
                let params = text;
 
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

router.get('/select_content_order', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{

            let id = req.query.id;

            let sql;
            if(parseInt(id) == 1){
                sql = 'select * from meal where ID between 1 and 2';
                let params = id;
                
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
            else{
                sql = 'select * from meal where ID between ' + (parseInt(id) - 1) + ' and ' + (parseInt(id) + 1);
                let params = id;
                
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
module.exports = router;


