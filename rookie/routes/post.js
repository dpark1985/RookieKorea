exports.active = function(app, db, sockets){
	app.get('/posts', function(req, res){
		db.teams.find(function(error, posts){
			res.json(posts);
		});
	})
};