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
            var sql = "select * from postlist order by content_order desc";
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

router.post('/insert', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var content_order = req.body.content_order;
            var topic = req.body.topic;
            var content = req.body.content;
            var date = req.body.date;

            console.log(content_order, topic,content,date);
            var params = [content_order, topic, content, date];

            var sql = "insert into postlist (content_order, title, content, date) values (?,?,?,?)";
            conn.query(sql, params, function(err,rows){
                if(err)throw err;
                else{
                    conn.release();
                    res.send("success");
            }
        });
     }
    });
});

router.post('/delete', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var topic = req.body.topic;
            var date = req.body.date;
            var params = [topic, date];
            var sql = "delete from postlist where title = ? and where date = ?";
            conn.query(sql, params, function(err,rows){
                if(err)throw err;
                else{
                    conn.release();
                    res.send("success");
            }
        });
     }
    });
});

router.post('/update', function(req, res, next){
    pool.getConnection(function(err,conn){
        if(err) throw err;
        else{
            var sql = "update list set";
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


