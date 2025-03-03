import globalInputValidationNext from "./global-instance";
import {consoleWarning, getSelectorName} from "./utils";
import type {FormInput, OptionalAnyMessages} from "./common";
import {LocalConfig, type ConfigRule} from "./config";
import deepmerge from "deepmerge";

const globalValidators = globalInputValidationNext.validators;

class Listeners {
	formNode: HTMLFormElement;
	inputNode: FormInput;
	inputName: string = "";
	inputEvent: () => void;
	configRules: ConfigRule;

	constructor({
		formNode,
		inputNode,
		inputEvent,
		inputName,
		configRules,
	}: {
		formNode: HTMLFormElement;
		inputNode: FormInput;
		inputEvent: () => void;
		inputName: string;
		configRules: ConfigRule;
	}) {
		this.formNode = formNode;
		this.inputNode = inputNode;
		this.inputName = inputName;
		this.inputEvent = inputEvent;
		this.configRules = configRules;
	}

	update() {
		if (this.inputNode.getAttribute("type") === "radio") {
			this.formNode
				.querySelectorAll<HTMLInputElement>(`input${getSelectorName(this.inputName)}`)
				.forEach((element) => {
					element.addEventListener("input", this.inputEvent);
				});
		}

		this.inputNode.addEventListener("focusout", this.inputEvent);
		this.inputNode.addEventListener("input", this.inputEvent);

		for (const ruleName in this.configRules) {
			if (ruleName === "equalTo") {
				(this.formNode.querySelector(this.configRules[ruleName] as string) as HTMLInputElement).addEventListener(
					"input",
					this.inputEvent
				);
			}
		}
	}

	destroy() {
		this.inputNode.removeEventListener("focusout", this.inputEvent);
		this.inputNode.removeEventListener("input", this.inputEvent);

		if (this.inputNode.getAttribute("type") === "radio") {
			this.formNode
				.querySelectorAll<HTMLInputElement>(`input${getSelectorName(this.inputName)}`)
				.forEach((element) => {
					element.removeEventListener("input", this.inputEvent);
				});
		}

		for (const ruleName in this.configRules) {
			if (ruleName === "equalTo") {
				(this.formNode.querySelector(this.configRules[ruleName] as string) as HTMLInputElement).removeEventListener(
					"input",
					this.inputEvent
				);
			}
		}
	}
}

export class InputWrap {
	ruleNames: string[] = [];
	ruleMessages: OptionalAnyMessages;
	configRules: ConfigRule;
	inputNode: FormInput;
	errorNode: HTMLElement;
	mergedConfig: LocalConfig;
	needValidation: boolean = true;
	localValidators: Record<string, any> = {};

	isValid: boolean = false;
	invalidRule: string = "";
	invalidRuleMessage: string = "";
	inputName: string = "";
	formNode: HTMLFormElement;

	listeners: Listeners;

	private inputEvent = () => {
		this.validate();
	};

	constructor(inputNode: FormInput, formNode: HTMLFormElement, mergedConfig: LocalConfig) {
		this.inputNode = inputNode;
		this.inputName = this.inputNode.getAttribute("name") || "";

		this.formNode = formNode;

		this.configRules = mergedConfig.rules?.[this.inputName] || {};
		this.ruleMessages = mergedConfig.messages?.[this.inputName] || {};
		this.mergedConfig = mergedConfig;

		this.errorNode = document.createElement(this.mergedConfig.errorElementTag);
		this.errorNode.className = this.mergedConfig.errorElementClass;

		inputNode.classList.add(this.mergedConfig.inputElementClass);

		// Get default rules via input attrs.
		inputNode.getAttributeNames().forEach((inputAttrName) => {
			let attrValue;
			switch (inputAttrName) {
				case "required":
					this.configRules["required"] = true;

					break;
				case "min-length":
					attrValue = inputNode.getAttribute(inputAttrName);

					if (attrValue) {
						this.configRules["minLength"] = +attrValue;
					}

					break;
				case "max-length":
					attrValue = inputNode.getAttribute(inputAttrName);

					if (attrValue) {
						this.configRules["maxLength"] = +attrValue;
					}

					break;
			}
		});

		this.listeners = new Listeners({
			formNode: this.formNode,
			inputNode: this.inputNode,
			inputEvent: this.inputEvent,
			inputName: this.inputName,
			configRules: this.configRules,
		});

		this.initRules(this.configRules);
	}

	private initRules = (configRules?: ConfigRule) => {
		for (const ruleName in configRules) {
			if (typeof configRules[ruleName] === "function") {
				this.ruleNames.push(ruleName);
				this.localValidators[ruleName] = configRules[ruleName];
			} else if (globalValidators.get(ruleName)) {
				this.ruleNames.push(ruleName);
				this.configRules[ruleName] = configRules[ruleName];
			} else {
				consoleWarning(`rule param '${ruleName}' doesn't exist with value '${configRules[ruleName]}'`);
			}

			// switch (ruleName) {
			// 	case "required":
			// 		if (typeof configRules[ruleName] !== "boolean") {
			// 			consoleWarning(`rule param '${ruleName}' isn't boolean with value '${configRules[ruleName]}'`);
			// 		}
			// 		break;
			// 	case "minLegnth":
			// 	case "maxLegnth":
			// 		if (typeof configRules[ruleName] !== "number") {
			// 			consoleWarning(`rule param '${ruleName}' isn't number with value '${configRules[ruleName]}'`);
			// 		}
			// 		break;
			// }
		}

		// Sort rules by order: default attr, custom rules.
		this.ruleNames.sort((firstValidator: string, secondValidator: string) => {
			const firstValidatorIndex = (globalValidators.get(firstValidator)?.index as number) || Number.MAX_VALUE;
			const secondValidatorIndex = (globalValidators.get(secondValidator)?.index as number) || Number.MAX_VALUE;

			if (firstValidatorIndex < secondValidatorIndex) {
				return -1;
			}

			return 1;
		});

		if (this.ruleNames.length === 0) {
			this.needValidation = false;
			this.listeners.destroy();
		} else {
			this.listeners.update();
		}
	};

	removeRules(rules?: Array<keyof OptionalAnyMessages>) {
		if (rules) {
			this.ruleNames = this.ruleNames.filter((ruleName) => (rules.includes(ruleName) ? false : true));
		} else {
			this.ruleNames = [];
		}
	}

	addRules(config: {rules?: ConfigRule; messages?: OptionalAnyMessages}) {
		this.initRules(config.rules);

		this.listeners.update();

		if (config.messages) {
			this.ruleMessages = deepmerge(this.ruleMessages, config.messages);
		}
	}

	destroy() {
		this.listeners.destroy();

		this.errorNode?.remove();
		this.inputNode.classList.remove(
			...[
				this.mergedConfig.inputElementErrorClass,
				this.mergedConfig.inputElementSuccessClass,
				this.mergedConfig.inputElementClass,
			]
		);
	}

	public validate(showErrors: boolean = true) {
		const inputValue = this.inputNode.value;
		let isCorrectValidation = true;

		this.ruleNames.every((validatorName) => {
			const validatorParam = this.configRules[validatorName] as any;
			let isCorrect = undefined;

			if (this.localValidators[validatorName]) {
				isCorrect = this.localValidators[validatorName](inputValue, validatorParam || null, this.inputNode);
			} else if (globalValidators.get(validatorName)) {
				isCorrect = globalValidators
					.get(validatorName)
					?.["validator"](inputValue, validatorParam || null, this.inputNode);
			}

			if (!isCorrect) {
				isCorrectValidation = false;

				if (showErrors) {
					this.inputNode.classList.remove(this.mergedConfig.inputElementSuccessClass);
					this.inputNode.classList.add(this.mergedConfig.inputElementErrorClass);

					let errorMessage;

					if (this.ruleMessages[validatorName]) {
						errorMessage = this.ruleMessages[validatorName];
					} else {
						errorMessage = globalInputValidationNext.messages.get(validatorName) as string;
					}

					if (typeof validatorParam === "number") {
						errorMessage = errorMessage.replace("{0}", validatorParam.toString());
					} else if (Array.isArray(validatorParam)) {
						errorMessage = errorMessage.replace("{0}", validatorParam[0]);
						errorMessage = errorMessage.replace("{1}", validatorParam[1]);
					}

					if (!document.body.contains(this.errorNode)) {
						(this.inputNode.parentElement as HTMLElement).appendChild(this.errorNode);
					}

					this.errorNode.textContent = errorMessage;

					this.errorNode.style.height = `${this.errorNode.scrollHeight}px`;

					this.invalidRule = validatorName;
					this.invalidRuleMessage = errorMessage;

					return;
				}
			}

			return true;
		});

		if (isCorrectValidation) {
			this.isValid = true;
			this.invalidRule = "";
			this.invalidRuleMessage = "";
			if (this.errorNode) {
				this.errorNode.textContent = "";
			}

			if (showErrors) {
				if (this.errorNode && this.mergedConfig.errorElementClass === "validation-error-label") {
					this.errorNode.style.height = "0px";
				} else {
					this.errorNode?.remove();
				}

				this.inputNode.classList.remove(this.mergedConfig.inputElementErrorClass);
				this.inputNode.classList.add(this.mergedConfig.inputElementSuccessClass);
			}
		}

		return isCorrectValidation;
	}
}
