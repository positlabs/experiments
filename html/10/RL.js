var RL = (function() {

	var rl = {};

	var initialized = false;

	var socket;

	var init = function() {
		var port = 7001;
	    // var serverUrl = 'http://ec2-54-218-0-72.us-west-2.compute.amazonaws.com:' + port;
	    var serverUrl = 'http://' + location.host + ':' + port;

	    if(!io) {
	    	console.error("RL Fatal: socket.io not found!");
	    	return;
	    }

	    try {
	    	socket = io.connect(serverUrl);
	    } catch(e) {
	    	console.error("RL Fatal: socket.io not found!");
	    	return;
	    }
	}

	var wrap = function(m) {
		var w = {};

		w.message = m;

		return w;
	}

	rl.log = function(message) {
		if(!initialized) init();
		socket.emit("log", wrap(message));
	}

	rl.warn = function(message) {
		if(!initialized) init();
		socket.emit("warn", wrap(message));
	}

	rl.error = function(message) {
		if(!initialized) init();
		socket.emit("error", wrap(message));
	}

	return rl;

})();