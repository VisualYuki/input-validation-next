import globalInputValidationNext from "./global";
//import {consoleWarning} from "./utils";

globalInputValidationNext.addRule(
	"required",
	// @ts-ignore
	(value, params, element) => {
		if (element instanceof HTMLSelectElement) {
			let isDisabledOption = element.selectedOptions[0].hasAttribute("disabled");

			return !isDisabledOption;
		}

		if (element.getAttribute("type") === "checkbox") {
			return (element as HTMLInputElement).checked;
		}

		return !!value;
	},
	""
);

globalInputValidationNext.addRule(
	"minLength",
	(value, params) => {
		return params <= value.length;
	},
	""
);

globalInputValidationNext.addRule(
	"maxLength",
	(value, params) => {
		return value.length <= params;
	},
	""
);

globalInputValidationNext.addRule(
	"maxLength",
	(value, params) => {
		return value.length <= params;
	},
	""
);

globalInputValidationNext.addRule(
	"digits",
	(value) => {
		return /^\d+$/.test(value);
	},
	""
);

globalInputValidationNext.addRule(
	"range",
	(value, params) => {
		if (params[0] <= +value && +value <= params[1]) {
			return true;
		} else {
			return false;
		}
	},
	""
);
