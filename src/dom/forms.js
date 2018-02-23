/* eslint-env browser */
import { find } from "./";
import { httpRequest } from "./http";

export function submit(form, { cors } = {}) {
	let { method } = form;
	method = method ? method.toUpperCase() : "GET";
	let uri = form.action;
	let payload = serializeForm(form);

	let headers, body;
	if(method === "GET") {
		if(uri.indexOf("?") !== -1) {
			throw new Error("query strings are invalid within `GET` forms' action");
		}
		uri = [uri, payload].join("?");
	} else {
		headers = {
			"Content-Type": "application/x-www-form-urlencoded"
		};
		body = payload;
	}
	return httpRequest(method, uri, headers, body, { cors });
}

// stringify form data as `application/x-www-form-urlencoded`
// required due to insufficient browser support for `FormData`
// NB: only supports a subset of form fields, notably excluding buttons and file inputs
export function serializeForm(form) {
	let selector = ["input", "textarea", "select"].
		map(tag => `${tag}[name]:not(:disabled)`).join(", ");
	let radios = {};
	return find(form, selector).reduce((params, node) => {
		let { name } = node;
		let value;
		switch(node.nodeName.toLowerCase()) {
		case "textarea":
			value = node.value;
			break;
		case "select":
			value = node.multiple ?
				find(node, "option:checked").map(opt => opt.value) :
				node.value;
			break;
		case "input":
			switch(node.type) {
			case "file":
				console.warn("ignoring unsupported file-input field");
				break;
			case "checkbox":
				if(node.checked) {
					value = node.value;
				}
				break;
			case "radio":
				if(!radios[name]) {
					value = form.
						querySelector(`input[type=radio][name=${name}]:checked`).
						value;
					radios[name] = true;
				}
				break;
			default:
				value = node.value;
				break;
			}
			break;
		}

		if(value !== undefined) {
			let values = value || [""];
			if(!values.pop) {
				values = [values];
			}
			values.forEach(value => {
				let param = [name, value].map(encodeURIComponent).join("=");
				params.push(param);
			});
		}
		return params;
	}, []).join("&");
}
