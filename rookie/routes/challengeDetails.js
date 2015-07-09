exports.active = function(app, db){
	app.get('/challenge/:id', function(req, res){
		db.teams.findOne({
			_id: db.ObjectId(req.param('id'))
		}, function(error, posts){
			res.json(posts);
		});
	})
};