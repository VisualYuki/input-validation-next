import {init} from "./init";
import globalInputValidationNext from "./globInstance";
import "./rules.ts";
import "./appendStyles";

window.globalInputValidationNext = globalInputValidationNext;
window.InputValidationNext = init;

export {init as InputValidationNext, globalInputValidationNext};
