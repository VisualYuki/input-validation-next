import {FormWrap} from "./FormWrap";
import deepMerge from "lodash.merge";
import {consoleWarning} from "./utils";

/**
 * Public class for user.
 */
class Init {
	private formWrap!: FormWrap;

	constructor(formElement: HTMLFormElement, userConfig: localConfig) {
		this.formWrap = new FormWrap(formElement, userConfig);
	}

	validate() {
		return this.formWrap.validate();
	}
}

export let defaultConfig: localConfig = {
	submitHandler() {},
	debug: true,
	inputElementClass: "validation-input",
	inputElementErrorClass: "validation-input_error",
	inputElementSuccessClass: "validation-input_success",
	errorElementClass: "validation-error-label",
	errorElementTag: "p",
	onSubmitFocusInvalid: true,
	//onFocusCleanup: false,
	rules: {},
	messages: {},
	enableDefaultValidationForm: false,
	disableFormSubmitEvent: false,
};

export function init(formElement: HTMLFormElement, userConfig: UserConfig = {}) {
	let clonedDefaultConfig = JSON.parse(JSON.stringify(defaultConfig));
	let mergedConfig: localConfig = deepMerge(clonedDefaultConfig, userConfig);

	if (mergedConfig.debug && !(formElement instanceof HTMLFormElement)) {
		consoleWarning("root parameter is not form");
		consoleWarning("root parameter type is " + formElement);

		return null;
	}

	if (mergedConfig.debug) {
		for (let prop in userConfig) {
			switch (prop) {
				case "submitHandler":
					if (typeof mergedConfig.submitHandler !== "function") {
						consoleWarning("submitHandler option is not function");
					}
					break;

				case "rules":
					if (typeof userConfig[prop] !== "object") {
						consoleWarning("field " + `'${prop}'` + " doesn't object type");
					}
					break;
				case "messages":
					if (typeof userConfig[prop] !== "object") {
						consoleWarning("field " + `'${prop}'` + " doesn't object type");
					}
					break;

				case "debug":
				case "onSubmitFocusInvalid":
				case "enableDefaultValidationForm":
				case "disableFormSubmitEvent":
					if (typeof userConfig[prop] !== "boolean") {
						consoleWarning("field " + `'${prop}'` + " doesn't boolean type");
					}
					break;
				case "inputElementClass":
				case "inputElementSuccessClass":
				case "errorElementTag":
				case "errorElementClass":
				case "inputElementErrorClass":
					if (typeof userConfig[prop] !== "string") {
						consoleWarning("field " + `'${prop}'` + " doesn't boolean type");
					}
					break;

				default:
					consoleWarning("field " + `'${prop}'` + " doesn't exist in config");
			}
		}

		for (let prop in userConfig.rules) {
			if (!formElement.querySelector(`[name='${prop}']`)) {
				consoleWarning("input name " + `'${prop}'` + " doesn't exist in the document. [config.rules]");
				delete userConfig.rules[prop];
			}
		}

		for (let prop in userConfig.messages) {
			if (!formElement.querySelector(`[name='${prop}']`)) {
				consoleWarning("input name " + `'${prop}'` + " doesn't exist in the document. [config.messages]");
				delete userConfig.messages[prop];
			}
		}
	}

	return new Init(formElement, mergedConfig);
}
