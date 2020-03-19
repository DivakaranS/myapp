const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/web', function(req, res, next) {
	res.render('homepage', { title: 'MY WEBSITE' });
});



router.get('/dashboard', function(req, res, next) {
	res.render('dashboard', {user:req.query.user});
});

router.get('/profile', function(req, res, next) {
	res.render('profile', {user:req.query.user});
});


router.get('/forgetPassword', function(req, res, next) {
	res.render('forgetPas',{ title: 'MY WEBSITE' });
});


module.exports = router;
