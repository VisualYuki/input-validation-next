import globalInputValidationNext from "./globInstance";
import isUrl from "is-url";

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

		if (element.getAttribute("type") === "radio") {
			const radioElements = document.querySelectorAll<HTMLInputElement>(
				`input[name='${element.getAttribute("name")}']`
			);

			let isValid = false;

			radioElements.forEach((element) => {
				if (element.checked) {
					isValid = true;
				}
			});

			return isValid;
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
	"email",
	(value) => {
		// eslint-disable-next-line no-useless-escape
		return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
			value
		);
	},
	""
);

globalInputValidationNext.addRule(
	"url",
	(value) => {
		return isUrl(value);
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
	"min",
	(value, params) => {
		return params <= value;
	},
	""
);

globalInputValidationNext.addRule(
	"max",
	(value, params) => {
		return value <= params;
	},
	""
);

globalInputValidationNext.addRule(
	"date",
	(value) => {
		return !/Invalid|NaN/.test(new Date(value).toString());
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

//globalInputValidationNext.addRule(
//	"number",
//	(value) => {
//		return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
//	},
//	""
//);
