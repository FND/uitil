/* eslint-env browser */
import { find } from "./";

const FIELD_TAGS = ["input", "textarea", "select", "button"];

// required due to insufficient browser support for `FormData`
// NB: only supports a subset of form fields, notably excluding file inputs
export default class SimpleFormData {
	constructor(formNode) {
		this.form = formNode;
	}

	// associates fields with their corresponding values
	// (ideally, `FormData` should provide this functionality - but doesn't)
	serialize() {
		return this.fields.reduce(function(memo, field) {
			let name = field.getAttribute("name");
			if(!memo[name]) {
				memo[name] = [];
			}
			memo[name].push(field.value);
			return memo;
		}, {});
	}

	get fields() {
		let { form } = this;

		if(form.querySelector("input[type=file]:not(:disabled)")) {
			throw new Error("file inputs are unsupported");
		}

		let selectors = FIELD_TAGS.map(tag => `${tag}[name]:not(:disabled)`);
		return find(this.form, selectors.join(", "));
	}
}
