import globalInputValidationNext from "./global";

globalInputValidationNext.addValidator(
	"required",
	(value) => {
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
