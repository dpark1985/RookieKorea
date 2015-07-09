exports.active = function(app, db, fs){
	app.get('/challenge', function(req, res, next) {
		isLogin(req, res, function(user){
			res.render('challenge');
		}, function(){
			res.redirect('/login');
		});		
	});
	app.post('/challenge', function(req, res, next){
		if(done==true){
		    console.log(req.files);
	  	}
		db.teams.insert({
		  	eventName : req.body.eventName,
		  	eventSummary : req.body.eventSummary,
		  	eventImg : req.files.eventImg.name,
		  	eventCreated : Date(),
		  	eventStartDate : req.body.challengeStart,
		  	eventEndDate : req.body.challengeEnd,
		  	regiStartDate : req.body.regiStart,
		  	regiEndDate : req.body.regiEnd,
		  	eventAddr : req.body.eventAddr,
		  	contactInfo: {
		  		p1 : {
		  			name : req.body.contactName1,
		  			phone : req.body.contactPhone1
		  		},
		  		p2 : {
		  			name : req.body.contactName2,
		  			phone : req.body.contactPhone2
		  		},
		  		p3 : {
		  			name : req.body.contactName3,
		  			phone : req.body.contactPhone3
		  		},
		  		p4 : {
		  			name : req.body.contactName4,
		  			phone : req.body.contactPhone4
		  		}
		  	}
		}, function(err, post){
		  	if(err){
		        res.render('error', {
		            message: err.message,
		            error: err
		        });
		  	}else{
		  		res.redirect('/');
		  	}
		});		
	});
};