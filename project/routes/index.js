var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
    res.render('./index');
});

router.get('/popup',function(req, res, next){
    res.render('popup');
});

// centerintro htmls
router.get('/centerintro',function(req, res, next){
    res.render('./centerintro/centerintro');
});

router.get('/cen_target',function(req, res, next){
    res.render('./centerintro/cen_target');
});

router.get('/cen_target',function(req, res, next){
    res.render('./centerintro/cen_target');
});

router.get('/facility',function(req, res, next){
    res.render('./facility');
});

router.get('/enterin',function(req, res, next){
    res.render('./centerintro/enterin');
});

router.get('/mapin',function(req, res, next){
    res.render('./centerintro/mapin');
});

// ensurance htmls
router.get('/ensurance',function(req, res, next){
    res.render('./ensurance');
});

// programintro htmls
router.get('/programintro',function(req, res, next){
    res.render('./programintro/programintro');
});
router.get('/daycarein',function(req, res, next){
    res.render('./programintro/daycarein');
});
router.get('/plani',function(req, res, next){
    res.render('./programintro/plani');
});
router.get('/lifeproi',function(req, res, next){
    res.render('./programintro/lifeproi');
});
router.get('/cureservi',function(req, res, next){
    res.render('./programintro/cureservi');
});
router.get('/recogproi',function(req, res, next){
    res.render('./programintro/recogproi');
});
router.get('/careservi',function(req, res, next){
    res.render('./programintro/careservi');
});
router.get('/mentori',function(req, res, next){
    res.render('./programintro/mentori');
});

// pmpc htmls
router.get('/cus_meal_board',function(req, res, next){
    res.render('./pmpc/cus_meal_board');
});
router.get('/cus_meal_i',function(req, res, next){
    res.render('./pmpc/cus_meal_i');
});
router.get('/cus_pmpc_board',function(req, res, next){
    res.render('./pmpc/cus_pmpc_board');
});
router.get('/pmpc',function(req, res, next){
    res.render('./pmpc/pmpc');
});
router.get('/meal_i',function(req, res, next){
    res.render('./pmpc/meal_i');
});
router.get('/photo_board',function(req, res, next){
    res.render('./pmpc/photo_board');
});
router.get('/photo',function(req, res, next){
    res.render('./pmpc/photo');
});
router.get('/pmpc_board',function(req, res, next){
    res.render('./pmpc/pmpc_board');
});

// question htmls
router.get('/question',function(req, res, next){
    res.render('./question/question');
});
router.get('/consulting',function(req, res, next){
    res.render('./question/consulting');
});

// personal
router.get('/personal',function(req, res, next){
    res.render('./personal');
});

module.exports = router;