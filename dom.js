// associates fields with their corresponding values
// (ideally, `FormData` should provide this functionality - but doesn't)
exports.serializeForm = function(node) {
	var selector = "input[name], textarea[name], select[name], button[name]";
	var fields = exports.query(node, selector);
	var data = new FormData(node);
	return fields.reduce(function(memo, field) {
		var name = field.getAttribute("name");
		memo[name] = data.getAll(name); // NB: `FormData` retains order
		return memo;
	}, {});
};

exports.createElement = function(tag, attribs, options) {
	if(!options && attribs && (attribs.text || attribs.parent)) { // no `attribs`; shift arguments -- XXX: unintuitive signature?
		options = attribs;
		attribs = null;
	}
	options = options || {};
	attribs = attribs || {};

	var node = document.createElement(tag);
	Object.keys(attribs).forEach(function(attr) {
		node.setAttribute(attr, attribs[attr]);
	});

	if(options.text) {
		node.textContent = options.text;
	}
	if(options.parent) {
		options.parent.appendChild(node);
	}
	return node;
};

exports.replaceNode = function(oldNode, newNode) {
	var container = oldNode.parentNode;
	container.insertBefore(newNode, oldNode);
	container.removeChild(oldNode);
};

exports.transferAttributes = function(source, target) {
	[].forEach.call(source.attributes, function(attr) {
		var name = attr.name;
		if(!target.getAttribute(name)) {
			target.setAttribute(name, attr.value);
		}
	});
};

exports.query = function(node, selector) {
	if(!selector) {
		selector = node;
		node = document;
	}
	var nodes = node.querySelectorAll(selector);
	return [].slice.call(nodes);
};
