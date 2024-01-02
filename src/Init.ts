import {FormWrap} from "./FormWrap";
import deepMerge from "lodash.merge";
import {consoleWarning} from "./utils";

/**
 * Public class for user.
 */
class Init {
	private formWrap!: FormWrap;

	constructor(formElement: HTMLFormElement, userConfig: Config) {
		this.formWrap = new FormWrap(formElement, userConfig);
	}

	validate() {
		this.formWrap.validate();
	}
}

let defaultConfig: Config = {
	debug: true,
	errorClass: "input-validation-next__error",
	config: {
		disableFormSubmitEvent: false,
		enableDefaultValidationForm: false,
	},
};

export function init(formElement: HTMLFormElement, userConfig: Config = {}) {
	let mergedConfig = deepMerge(defaultConfig, userConfig);

	if (mergedConfig.debug && !(formElement instanceof HTMLFormElement)) {
		consoleWarning("root parameter is not form");
		consoleWarning("root parameter type is " + formElement);

		return null;
	}

	if (mergedConfig.debug) {
		for (let prop in userConfig) {
			switch (prop) {
				case "debug":
					if (typeof userConfig[prop] !== "boolean") {
						consoleWarning("field " + `'${prop}'` + " doesn't boolean type");
					}
					break;
				case "submitHandler":
					if (typeof mergedConfig.submitHandler !== "function") {
						consoleWarning("submitHandler option is not function");
					}
					break;
				case "errorClass":
					if (typeof userConfig[prop] !== "string") {
						consoleWarning("field " + `'${prop}'` + " doesn't string type");
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
				case "config":
					if (typeof userConfig[prop] !== "object") {
						consoleWarning("field " + `'${prop}'` + " doesn't object type");
					}
					break;
				default:
					consoleWarning("field " + `'${prop}'` + " doesn't exist in config");
			}
		}

		for (let prop in userConfig.rules) {
			if (!formElement.querySelector(`[name='${prop}']`)) {
				consoleWarning("input name " + `'${prop}'` + " doesn't exist in the document");
			}
		}
	}

	return new Init(formElement, mergedConfig);
}
