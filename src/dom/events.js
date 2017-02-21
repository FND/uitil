/* eslint-env browser */

// generates custom events
// `emitter` is a DOM node
// `options` is passed through to `CustomEvent` (cf.
// https://developer.mozilla.org/en-US/docs/Web/API/Event/Event#Values)
export function dispatchEvent(emitter, name, payload, options = {}) {
	if(payload) {
		options.detail = payload;
	}
	let ev = new CustomEvent(name, options);
	emitter.dispatchEvent(ev);
}
