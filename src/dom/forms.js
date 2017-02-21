/* eslint-env browser */
import { find } from "./";

// associates fields with their corresponding values
// (ideally, `FormData` should provide this functionality - but doesn't)
export function serializeForm(node) {
	let fields = find(node, "input[name], textarea[name], select[name], button[name]");
	let data = new FormData(node);
	return fields.reduce(function(memo, field) {
		let name = field.getAttribute("name");
		memo[name] = data.getAll(name); // NB: `FormData` retains order
		return memo;
	}, {});
};
