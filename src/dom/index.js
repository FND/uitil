export function find(node, selector) {
	let nodes = node.querySelectorAll(selector);
	return [].slice.call(nodes);
}

export function replaceNode(oldNode, ...newNodes) {
	let container = oldNode.parentNode;
	newNodes.forEach(node => {
		container.insertBefore(node, oldNode);
	});
	container.removeChild(oldNode);
}
