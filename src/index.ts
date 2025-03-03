import {init} from "./init.ts";
import globalInputValidationNext from "./global-instance";
import "./rules.ts";
import "./appendStyles";

window.globalInputValidationNext = globalInputValidationNext;
window.InputValidationNext = init;

export {init as InputValidationNext, globalInputValidationNext};
