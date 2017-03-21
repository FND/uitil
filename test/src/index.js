import { serializeForm } from "../../src/dom/forms";

let form = document.querySelector("form");
form.addEventListener("submit", ev => {
	ev.preventDefault();
	serialize();
});
serialize();

function serialize() {
	let qs = serializeForm(form);
	console.log(qs); // eslint-disable-line
}
