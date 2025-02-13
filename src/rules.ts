import globalInputValidationNext from "./global-instance";
import isUrl from "is-url";
import {ValidatorFunction} from "./config";
import isString from "is-string";
import isEmail from "is-email";
import isNumber from "is-number";

export const required: ValidatorFunction = function (value, params, element) {
	debugger;
	if (element instanceof HTMLSelectElement) {
		let isDisabledOption = element.selectedOptions[0]?.hasAttribute("disabled");

		return !isDisabledOption && !!element.value;
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
};

globalInputValidationNext.addRule("required", required, "");

export function getLength(value: unknown, element: HTMLElement) {
	switch (element.nodeName.toLowerCase()) {
		case "select":
			return (element as HTMLSelectElement).selectedOptions.length;
	}

	if (Array.isArray(value) || isString(value)) {
		return value.length;
	}

	return 0;
}

export const isOptional: ValidatorFunction = function (value, params, element) {
	return !required(value, params, element);
};

export const minLength: ValidatorFunction = function (value, params, element: HTMLElement) {
	return isOptional(value, params, element) || params <= getLength(value, element);
};

globalInputValidationNext.addRule("minLength", minLength, "");

export const maxLength: ValidatorFunction = function (value, params, element: HTMLElement) {
	return isOptional(value, params, element) || getLength(value, element) <= params;
};

globalInputValidationNext.addRule("maxLength", maxLength, "");

export const email: ValidatorFunction = (value, params, element) => {
	return isOptional(value, params, element) || isEmail(value);
};

globalInputValidationNext.addRule("email", email, "");

export const url: ValidatorFunction = (value, params, element) => {
	return isOptional(value, params, element) || isUrl(value);
};

globalInputValidationNext.addRule("url", url, "");

export const digits: ValidatorFunction = (value, params, element) => {
	return isOptional(value, params, element) || /^\d+$/.test(value);
};

globalInputValidationNext.addRule("digits", digits, "");

export const min: ValidatorFunction = (value, params, element) => {
	return isOptional(value, params, element) || params <= value;
};

globalInputValidationNext.addRule("min", min, "");

export const max: ValidatorFunction = (value, params, element) => {
	return isOptional(value, params, element) || value <= params;
};

globalInputValidationNext.addRule("max", max, "");

export const range: ValidatorFunction = (value, params, element) => {
	return isOptional(value, params, element) || (params[0] <= +value && +value <= params[1]);
};

globalInputValidationNext.addRule("range", range, "");

export const number: ValidatorFunction = (value, params, element) => {
	return isOptional(value, params, element) || isNumber(value);
};

globalInputValidationNext.addRule("number", number, "");
