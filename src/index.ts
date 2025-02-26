function sum(a: number, b: number) {
	return a + b;
}

let i = sum(1, 2);

import {init} from "./init";
import globalInputValidationNext from "./global-instance";
import "./rules.ts";
import "./appendStyles";

window.globalInputValidationNext = globalInputValidationNext;
window.InputValidationNext = init;

export {init as InputValidationNext, globalInputValidationNext};
