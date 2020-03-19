const express = require('express');
const router = express.Router();
const url = require('url');
const fsWrapper = require('../fsWrapper');

/* GET users listing. */

router.post('/register', function(req, res) {
	if(fsWrapper.exitUser(req.body)!=true){
		res.writeHead(200,{
			'Content-Type':'application/json'
		})
		res.end(JSON.stringify('Sucessfull Register'));
	}else{
		res.writeHead(500, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify("Exit User or UserName already taken"));
	}

});
router.post('/login', function(req, res) {
	if(fsWrapper.loginUser(req.body)){
		res.writeHead(200,{
			'Content-Type':'application/json'
		})
		let user=req.body;
		res.end(JSON.stringify(user[0]));
	}else{
		res.writeHead(500, {
			'Content-Type': 'application/json'
		});
		res.end(JSON.stringify("Invalid UserName or Password"));

	}
});

router.post('/addImages',function(req,res){
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	fsWrapper.addingImage(req.body);
	res.end(JSON.stringify('Image Added Sucessfully'));

})


router.get('/load',function(req,res){
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	let images=fsWrapper.load([req.query.user]);
	res.end(JSON.stringify(images));

})

router.post('/store',function(req,res){
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	fsWrapper.profile(req.body);
	res.end(JSON.stringify('Profile Picture Changed'));
})

router.post('/remove',function(req,res){
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(fsWrapper.remove(req.body)));
})

router.post('/userPic',function(req,res){
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(fsWrapper.userPic(req.body)));
})

router.post('/userInfo',function(req,res){
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(fsWrapper.userInfo(req.body)));
})

router.post('/changemail',function(req,res){
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	fsWrapper.changeEmail(req.body)
	res.end(JSON.stringify('Email-Id Changed Sucessfully'));
})

router.post('/changepas',function(req,res){
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	fsWrapper.changePass(req.body)
	res.end(JSON.stringify('Password Changed Sucessfully'));
})

router.get('/getPassword',function(req,res){
	res.writeHead(200,{
		'Content-Type':'application/json'
	})
	res.end(JSON.stringify(fsWrapper.getPassword(req.query.email)));
})



module.exports = router;
