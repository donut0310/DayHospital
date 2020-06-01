var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
    res.render('./index.html');
});

router.get('/robots.txt',function(req, res, next){
    res.render('./robots.txt');
});

router.get('/sitemap.xml',function(req, res, next){
    res.render('./sitemap.xml');
});

router.get('/rss.xml',function(req, res, next){
    res.render('./rss.xml');
});

router.get('/popup',function(req, res, next){
    res.render('popup.html');
});

// centerintro htmls
router.get('/centerintro',function(req, res, next){
    res.render('./centerintro/centerintro.html');
});

router.get('/rule',function(req, res, next){
    res.render('./centerintro/rule.html');
});

router.get('/facility',function(req, res, next){
    res.render('./centerintro/facility.html');
});

router.get('/enterin',function(req, res, next){
    res.render('./centerintro/enterin.html');
});

router.get('/mapin',function(req, res, next){
    res.render('./centerintro/mapin.html');
});

// ensurance htmls //이거 ensurance > insurance로 바꿨는데 이건 못건들였어요..
router.get('/insurance',function(req, res, next){
    res.render('./insurance/insurance.html');
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
router.get('/meal_board',function(req, res, next){
    res.render('./pmpc/meal_board.html');
});
router.get('/meal',function(req, res, next){
    res.render('./pmpc/meal.html');
});
router.get('/pmpc_board',function(req, res, next){
    res.render('./pmpc/pmpc_board.html');
});
router.get('/pmpc',function(req, res, next){
    res.render('./pmpc/pmpc.html');
});
router.get('/photo_board',function(req, res, next){
    res.render('./pmpc/photo_board.html');
});
router.get('/photo',function(req, res, next){
    res.render('./pmpc/photo.html');
});


// question htmls
router.get('/question',function(req, res, next){
    res.render('./question/question.html');
});
router.get('/consulting',function(req, res, next){
    res.render('./question/consulting.html');
});

// personal
router.get('/personal',function(req, res, next){
    res.render('./personal.html');
});

/*
// error 500
app.use(function(err, req, res, next) {
    res.status(500).render('./error500.html');
  });

// error 404
app.use(function(req, res, next){
    res.status(404),send('Sorry cant finde that!');
});
*/

router.get('/soccer', function(req,res,next){
    res.render('./soccer.html')
})

module.exports = router;