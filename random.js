// returns a random integer within given bounds (both inclusive)
// cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
exports.randomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
