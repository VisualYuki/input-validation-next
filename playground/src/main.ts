import {InputValidationNext} from "../../src/index";

const mySymbol = Symbol("my-symbol");

let plugin = InputValidationNext(document.querySelector("form.test") as HTMLFormElement, {
	rules: {
		[mySymbol]: {
			required: true,
		},
	},
});
