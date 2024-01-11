import {FormWrap} from "./FormWrap";
import {consoleWarning, deepMerge} from "./utils";

/**
 * Public class for user.
 */
class Init {
	private formWrap: FormWrap;

	constructor(formElement: HTMLFormElement, userConfig: LocalConfig) {
		this.formWrap = new FormWrap(formElement, userConfig);
	}

	isValidForm() {
		return this.formWrap.validate(false);
	}

	validate() {
		this.formWrap.validate();
	}

	removeRules(
		input: FormInput,
		/* eslint-disable @typescript-eslint/ban-types */
		rules?: Array<keyof MessagesOptional | (string & {})>
	) {
		this.formWrap.removeRules(input, rules);
	}

	addRules(
		input: FormInput,
		rules: {
			rules?: ConfigRule;
			messages?: MessagesOptionalAny;
		}
	) {
		this.formWrap.addRules(input, rules);
	}
}

export let defaultConfig: LocalConfig = {
	submitHandler() {},
	invalidHandler() {},
	debug: true,
	inputElementClass: "validation-input",
	inputElementErrorClass: "validation-input_error",
	inputElementSuccessClass: "validation-input_success",
	errorElementClass: "validation-error-label",
	errorElementTag: "p",
	onSubmitFocusInvalid: true,
	rules: {},
	messages: {},
	enableDefaultValidationForm: false,
	disableFormSubmitEvent: false,
};

export function init(formElement: HTMLFormElement, userConfig: UserConfig = {}) {
	let clonedDefaultConfig = JSON.parse(JSON.stringify(defaultConfig));
	let mergedConfig: LocalConfig = deepMerge(clonedDefaultConfig, userConfig);

	if (mergedConfig.debug && !(formElement instanceof HTMLFormElement)) {
		consoleWarning("root parameter is not form");
		consoleWarning("root parameter type is " + formElement);

		return null;
	}

	if (mergedConfig.debug) {
		for (let prop in mergedConfig) {
			switch (prop) {
				case "submitHandler":
				case "invalidHandler":
					if (typeof mergedConfig.submitHandler !== "function") {
						consoleWarning(`field '${prop}' is not function`);
					}
					break;

				case "rules":
					if (typeof mergedConfig[prop] !== "object") {
						consoleWarning("field " + `'${prop}'` + " doesn't object type");
					}
					break;
				case "messages":
					if (typeof mergedConfig[prop] !== "object") {
						consoleWarning("field " + `'${prop}'` + " doesn't object type");
					}
					break;

				case "debug":
				case "onSubmitFocusInvalid":
				case "enableDefaultValidationForm":
				case "disableFormSubmitEvent":
					if (typeof mergedConfig[prop] !== "boolean") {
						consoleWarning("field " + `'${prop}'` + " doesn't boolean type");
					}
					break;
				case "inputElementClass":
				case "inputElementSuccessClass":
				case "errorElementTag":
				case "errorElementClass":
				case "inputElementErrorClass":
					if (typeof mergedConfig[prop] !== "string") {
						consoleWarning("field " + `'${prop}'` + " doesn't boolean type");
					}
					break;

				default:
					consoleWarning("field " + `'${prop}'` + " doesn't exist in config");
					delete mergedConfig[prop as keyof typeof mergedConfig];
			}
		}

		for (let prop in mergedConfig.rules) {
			if (!formElement.querySelector(`[name='${prop}']`)) {
				consoleWarning("input with name " + `'${prop}'` + " doesn't exist in the document.");
				delete mergedConfig.rules[prop];
			}
		}

		for (let prop in mergedConfig.messages) {
			if (!formElement.querySelector(`[name='${prop}']`)) {
				consoleWarning("input with name " + `'${prop}'` + " doesn't exist in the document.");
				delete mergedConfig.messages[prop];
			}
		}
	}

	return new Init(formElement, mergedConfig);
}
