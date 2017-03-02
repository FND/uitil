// NB: not necessary when using ES6 spread syntax: `[...nodes].map(…)`
export function find(node, selector) {
	let nodes = node.querySelectorAll(selector);
	return [].slice.call(nodes);
}

export function prependChild(node, container) {
	container.insertBefore(node, container.firstChild);
}

export function replaceNode(oldNode, ...newNodes) {
	let container = oldNode.parentNode;
	newNodes.forEach(node => {
		container.insertBefore(node, oldNode);
	});
	container.removeChild(oldNode);
}
