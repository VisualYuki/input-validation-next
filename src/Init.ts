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
	config: {
		disableFormSubmitEvent: true,
		enableDefaultValidationForm: true,
	},
};

export function init(formElement: HTMLFormElement, userConfig: Config = {}) {
	let mergedConfig = deepMerge(defaultConfig, userConfig);

	if (!(formElement instanceof HTMLFormElement)) {
		consoleWarning("root parameter is not form");
		consoleWarning("root parameter type is " + formElement);

		return null;
	}

	if (mergedConfig.debug) {
		for (let prop in userConfig.rules) {
			if (!formElement.querySelector(`[name='${prop}']`)) {
				consoleWarning("input name " + `'${prop}'` + " doesn't exist in the document");
			}
		}

		for (let prop in userConfig) {
			if (!["debug", "rules", "submitHandler", "config", "messages"].includes(prop)) {
				consoleWarning("field " + `'${prop}'` + " doesn't exist in config");
			}
		}
	}

	return new Init(formElement, mergedConfig);
}
