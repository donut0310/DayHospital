var express = require('express');
var router = express.Router();
router.use(express.json());

//DB 연결
var mysql = require('mysql');
var dbconfig = require('./config/dbconfig.js');
var pool = mysql.createPool(dbconfig);

// 상담신청 고객정보
router.post('/init', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let sql = "select * from consulting order by ID desc limit 0,5";
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

// DB내 게시글 총 개수 반환
router.post('/get_dbCnts', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let sql = "select count(*) as cnt from consulting";
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

//버튼 생성
router.post('/createBtns', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let sql = "select * from consulting order by ID desc";
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

//페이지 개수 
router.post('/page_num', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let page_num = req.body.page_num;
       
            let sql = "select * from consulting order by ID desc limit " + (page_num-1)*5 + ", 5";
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

router.post('/insertData', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let uname = req.body.uname;
            let upw = req.body.upw;
            let utitle = req.body.utitle;
            let ucon = req.body.ucon;
            let uphone = req.body.uphone;
            let date = req.body.date;

            
            //쿼리문 작성 및 실행 할 query함수 선언
            let sql = "insert into consulting (USER_NAME, USER_PASSWORD, TITLE, CONTENT, USER_PHONE, DATE) values (?,?,?,?,?,?)";
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
router.post('/selectData', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let otn = req.body.value;
            let text;
            let sql;
            if(req.body.text == ''){
                sql = 'select * from consulting order by ID desc';
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
                sql = 'select * from consulting where TITLE like ?';
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
            }else{
                text = req.body.text + '%';
                sql = 'select * from consulting where USER_NAME like ?';
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

//페이지 번호에 따른 검색 데이터 반환
router.post('/selectData_page_num', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let page_num = req.body.page_num;
            let otn = req.body.value;
            let text;
            let sql;
            if(req.body.text == ''){
                sql = 'select * from consulting order by ID desc';
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
                sql = 'select * from consulting where TITLE like ? limit ' + (page_num-1)*5 + ', 5';
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
            else{
                text = req.body.text + '%';
                sql = 'select * from consulting where USER_NAME like ? limit ' + (page_num-1)*5 + ', 5';
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

router.post('/getPw', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            let id = req.body.id;
            let pw = req.body.pw;

            var params = [id];
            let sql = 'select USER_PASSWORD from consulting where ID = ?';
            conn.query(sql, params, function(err,rows){
                if(err) throw err;
                else{
                    conn.release();
                                 
                        let output = {};
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
            let id = req.body.id;

            var params = id;
            let sql = 'select USER_NAME, TITLE, CONTENT, USER_PHONE from consulting where ID = ?';
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



