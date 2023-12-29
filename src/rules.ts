import globalInputValidationNext from "./global";

globalInputValidationNext.addValidator(
	"required",
	// @ts-ignore
	(value, params, element) => {
		if (element instanceof HTMLSelectElement) {
			let isDisabledOption = element.selectedOptions[0].hasAttribute("disabled");

			return !isDisabledOption;
		}

		return !!value;
	},
	""
);

globalInputValidationNext.addValidator(
	"minLength",
	(value, params) => {
		return params <= value.length;
	},
	""
);

globalInputValidationNext.addValidator(
	"maxLength",
	(value, params) => {
		return value.length <= params;
	},
	""
);

globalInputValidationNext.addValidator(
	"maxLength",
	(value, params) => {
		return value.length <= params;
	},
	""
);

globalInputValidationNext.addValidator(
	"digits",
	(value) => {
		return /^\d+$/.test(value);
	},
	""
);

globalInputValidationNext.addValidator(
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
