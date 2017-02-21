/* eslint-env browser */
import bindMethodContext from "../method_context";

// usage:
//
//    class MyElement extends CustomElement {
//      static get boundMethods () {
//        return ["myEventHandler", …];
//      }
//
//      …
//
//      myEventHandler (ev) {
//        …
//      }
//    }
//
// note, however, that event-handler methods usually do not need to be bound
// because they are invoked with the respective DOM node as execution context
// (i.e. `this`) anyway
export default class CustomElement extends HTMLElement {
	constructor(self) { // NB: `self` only required due to polyfill
		self = super(self);

		let { boundMethods } = self.constructor;
		if(boundMethods) {
			bindMethodContext(self, ...boundMethods);
		}

		return self;
	}
}
