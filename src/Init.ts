import {FormWrap} from "./form-wrap.ts";
import {consoleWarning, getSelectorName} from "./utils.ts";
import type {FormInput, MessagesOptional, OptionalAnyMessages} from "./common";
import mergeDeep from "deepmerge";
import {defaultConfig, type UserConfig, ConfigRule, LocalConfig} from "./config.ts";

/**
 * Public class for user.
 */
class Init {
	formWrap: FormWrap;

	constructor(formElement: HTMLFormElement, userConfig: LocalConfig) {
		this.formWrap = new FormWrap(formElement, userConfig);
	}

	isValidForm() {
		return this.formWrap.validate(false);
	}

	validate() {
		this.formWrap.validate();
	}

	removeRules(input: FormInput, rules?: Array<keyof MessagesOptional | (string & {})>) {
		this.formWrap.removeRules(input, rules);
	}

	addRules(
		input: FormInput,
		rules: {
			rules?: ConfigRule;
			messages?: OptionalAnyMessages;
		}
	) {
		this.formWrap.addRules(input, rules);
	}

	destroy() {
		this.formWrap.destroy();
	}
}

export function init(formElement: HTMLFormElement | HTMLElement | null, userConfig: UserConfig = {}) {
	const mergedConfig: LocalConfig = mergeDeep(defaultConfig, userConfig);

	if (!(formElement instanceof HTMLFormElement)) {
		return null;
	} else {
		if (formElement["input-validation-next"]) {
			return formElement["input-validation-next"] as Init;
		}
	}

	if (mergedConfig.debug) {
		if (!(formElement instanceof HTMLFormElement)) {
			consoleWarning("root parameter is not form");
			consoleWarning("root parameter type is " + formElement);

			return null;
		}

		for (const prop in mergedConfig) {
			switch (prop) {
				case "submitHandler":
				case "invalidHandler":
					if (typeof mergedConfig.submitHandler !== "function") {
						consoleWarning(`field '${prop}' is not function type`);
					}
					break;

				case "rules":
				case "messages":
					if (typeof mergedConfig[prop] !== "object") {
						consoleWarning("field " + `'${prop}'` + " is not object type");
						mergedConfig[prop] = {};
					}
					break;

				case "debug":
				case "onSubmitFocusInvalid":
				case "enableDefaultValidationForm":
				case "disableFormSubmitEvent":
					if (typeof mergedConfig[prop] !== "boolean") {
						consoleWarning("field " + `'${prop}'` + " is not boolean type");
					}
					break;

				case "inputElementClass":
				case "inputElementSuccessClass":
				case "errorElementTag":
				case "errorElementClass":
				case "inputElementErrorClass":
					if (typeof mergedConfig[prop] !== "string") {
						consoleWarning("field " + `'${prop}'` + " is not string type");
					}
					break;

				default:
					consoleWarning("field " + `'${prop}'` + " doesn't exist in config");
					delete mergedConfig[prop as keyof typeof mergedConfig];
			}
		}

		for (const prop in mergedConfig.rules) {
			if (!formElement.querySelector(getSelectorName(prop))) {
				consoleWarning("input with name " + `'${prop}'` + " doesn't exist in the document.");
				delete mergedConfig.rules[prop];
			}
		}

		for (const prop in mergedConfig.messages) {
			if (!formElement.querySelector(getSelectorName(prop))) {
				consoleWarning("input with name " + `'${prop}'` + " doesn't exist in the document.");
				delete mergedConfig.messages[prop];
			}
		}
	}

	return (formElement["input-validation-next"] = new Init(formElement as HTMLFormElement, mergedConfig));
}
