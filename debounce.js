// adapted from StuffJS <https://github.com/bengillies/stuff-js>
module.exports = function(delay, ctx, fn) {
	if(fn === undefined) { // shift arguments
		fn = ctx;
		ctx = null;
	}

	var timer;
	return function() {
		var args = arguments;
		if(timer) {
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(function() {
			fn.apply(ctx, args);
			timer = null;
		}, delay);
	};
};
