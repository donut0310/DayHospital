var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
    res.render('./index.html');
});

router.get('/popup',function(req, res, next){
    res.render('popup.html');
});

// centerintro htmls
router.get('/centerintro',function(req, res, next){
    res.render('./centerintro/centerintro.html');
});

router.get('/cen_target',function(req, res, next){
    res.render('./centerintro/cen_target.html');
});

router.get('/cen_target',function(req, res, next){
    res.render('./centerintro/cen_target.html');
});

router.get('/facility',function(req, res, next){
    res.render('./facility.html');
});

router.get('/enterin',function(req, res, next){
    res.render('./centerintro/enterin.html');
});

router.get('/mapin',function(req, res, next){
    res.render('./centerintro/mapin.html');
});

// ensurance htmls
router.get('/ensurance',function(req, res, next){
    res.render('./ensurance.html');
});

// programintro htmls
router.get('/programintro',function(req, res, next){
    res.render('./programintro/programintro.html');
});
router.get('/daycarein',function(req, res, next){
    res.render('./programintro/daycarein.html');
});
router.get('/plani',function(req, res, next){
    res.render('./programintro/plani.html');
});
router.get('/lifeproi',function(req, res, next){
    res.render('./programintro/lifeproi.html');
});
router.get('/cureservi',function(req, res, next){
    res.render('./programintro/cureservi.html');
});
router.get('/recogproi',function(req, res, next){
    res.render('./programintro/recogproi.html');
});
router.get('/careservi',function(req, res, next){
    res.render('./programintro/careservi.html');
});
router.get('/mentori',function(req, res, next){
    res.render('./programintro/mentori.html');
});

// pmpc htmls
router.get('/cus_meal_board',function(req, res, next){
    res.render('./pmpc/cus_meal_board.html');
});
router.get('/cus_meal_i',function(req, res, next){
    res.render('./pmpc/cus_meal_i.html');
});
router.get('/cus_pmpc_board',function(req, res, next){
    res.render('./pmpc/cus_pmpc_board.html');
});
router.get('/cus_pmpc',function(req, res, next){
    res.render('./pmpc/cus_pmpc.html');
});
router.get('/meal_i',function(req, res, next){
    res.render('./pmpc/meal_i.html');
});
router.get('/photo_board',function(req, res, next){
    res.render('./pmpc/photo_board.html');
});
router.get('/photo',function(req, res, next){
    res.render('../html/pmpc/photo.html');
});
router.get('/pmpc_board',function(req, res, next){
    res.render('./pmpc/pmpc_board.html');
});

// question htmls
router.get('/question',function(req, res, next){
    res.render('./question.html');
});
router.get('/consulting',function(req, res, next){
    res.render('./question/consulting.html');
});

// personal.html
router.get('/personal',function(req, res, next){
    res.render('./personal.html');
});

module.exports = router;