var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
    res.render('Daycare.html');
});

router.get('/cen_target',function(req, res, next){
    res.render('cen_target.html');
});

module.exports = router;