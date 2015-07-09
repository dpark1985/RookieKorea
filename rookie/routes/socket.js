exports.active = function(io, client, sessionStore){
	io.set('authorization', function(data, accept){ 
		if(data.headers.cookie){
			var cookies = parseCookie(data.headers.cookie);
			if(cookies.session){
				sessionStore.get(cookies.session, function(error, session){
					if(session && session.auth){
						data.userId = session.auth.userId;
						accept(null, true);
					} else{accept('ERROR', true);}
				});
			}
		} else{ accept('ERROR', false);};
	});

	io.sockets.on('connection', function(socket){ 
		var userId = socket.conn.request.userId;
		//onsole.log('socket============');
		//console.log(socket);
		//console.log(userId);
		//console.log(socket.id);
		client.lpush('sockets:' + userId, socket.id);

		socket.on('disconnect', function(){
			client.lrem('sockets:' + userId, 0, socket.id);
		})
	});

	io.sockets.sockets.emitTo = function(userId, code, message){ 
		client.lrange('sockets:' + userId, 0, -1, function(error, data){
			if(data){
				data.forEach(function(item){
					if(io.sockets.socket[item]){
						var output = getCode(code);
						output.message = message;

						io.sockets.sockets[item].emit('message', output);
					}
				});
			}
		});
	};
};