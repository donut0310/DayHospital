var express = require('express');
var router = express.Router();
router.use(express.json());

//DB 연결
var mysql = require('mysql');
var dbconfig = require('./config/dbconfig.js');
var pool = mysql.createPool(dbconfig);

// 상담신청 고객정보
router.get('/init', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var sql = "select * from customer order by ID desc limit 0,5";
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

//버튼 생성
router.get('/createBtns', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var sql = "select * from customer order by ID desc";
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

//페이지 개수 
router.get('/page_num', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var page_num = req.query.page_num;
       
            var sql = "select * from customer order by ID desc limit " + (page_num-1)*5 + ", 5";
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

router.post('/insertData', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var uname = req.body.uname;
            var upw = req.body.upw;
            var utitle = req.body.utitle;
            var ucon = req.body.ucon;
            var uphone = req.body.uphone;
            var date = req.body.date;

            
            //쿼리문 작성 및 실행 할 query함수 선언
            var sql = "insert into customer (USER_NAME, USER_PASSWORD, TITLE, CONTENT, USER_PHONE, DATE) values (?,?,?,?,?,?)";
            var params = [uname, upw, utitle, ucon, uphone, date];
            conn.query(sql, params, function(err,rows){
                if(err) throw err;
                else{
                conn.release();
                res.send("success");
            }
        });
     }
    });
});

//검색 데이터 반환
router.get('/selectData', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var otn = req.query.value;
            var text;
            var sql;
            if(req.query.text == ''){
                sql = 'select * from customer order by ID desc';
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
                sql = 'select * from customer where TITLE like ?';
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
            }else{
                text = req.query.text + '%';
                sql = 'select * from customer where USER_NAME like ?';
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

//페이지 번호에 따른 검색 데이터 반환
router.get('/selectData_page_num', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var page_num = req.query.page_num;
            var otn = req.query.value;
            var text;
            var sql;
            if(req.query.text == ''){
                sql = 'select * from customer order by ID desc';
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
                sql = 'select * from customer where TITLE like ? limit ' + (page_num-1)*5 + ', 5';
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
            else{
                text = req.query.text + '%';
                sql = 'select * from customer where USER_NAME like ? limit ' + (page_num-1)*5 + ', 5';
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

router.post('/getPw', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var id = req.body.id;
            var pw = req.body.pw;

            var params = [id];
            var sql = 'select USER_PASSWORD from customer where ID = ?';
            conn.query(sql, params, function(err,rows){
                if(err) throw err;
                else{
                    conn.release();
                                 
                        var output = {};
                        output['result'] = "success";
                        if(rows[0].USER_PASSWORD == pw)output['data'] = 'correct'
                        else output['data'] = 'incorrect'
                        res.send(output);
                }        
            });
        }
    });
});

router.post('/getData', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var id = req.body.id;

            var params = id;
            var sql = 'select USER_NAME, TITLE, CONTENT, USER_PHONE from customer where ID = ?';
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
    });
});
module.exports = router;



