import {init} from "./init";
import globalInputValidationNext from "./globInstance";
import "./rules.ts";
import "./styles.scss";

window.globalInputValidationNext = globalInputValidationNext;
export {init as InputValidationNext, globalInputValidationNext};
