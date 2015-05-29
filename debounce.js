// adapted from StuffJS (https://github.com/bengillies/stuff-js)
module.exports = function(delay, fn) {
	var timer;
	return function() {
		var self = this;
		var args = arguments;
		if(timer) {
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(function() {
			fn.apply(self, args);
			timer = null;
		}, delay);
	};
};
