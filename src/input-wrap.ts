import globalInputValidationNext from "./global-instance";
import {consoleWarning} from "./utils";
import type {FormInput} from "./common";
import {MessagesAny, MessagesOptional, MessagesOptionalAny} from "./locale/messages_en";
import {LocalConfig, type ConfigRule} from "./config";
import deepmerge from "deepmerge";

let globalValidators = globalInputValidationNext.validators;

export class InputWrap {
	ruleNames: string[] = [];
	ruleMessages: MessagesAny;
	configRules: ConfigRule;
	inputNode!: FormInput;
	mergedConfig: LocalConfig;
	needValidation: boolean = true;
	localValidators: any = {};

	isValid: boolean = false;
	invalidRule: string = "";
	invalidRuleMessage: string = "";
	inputName: string = "";

	private inputEvent = () => {
		this.validate();
	};

	constructor(inputNode: FormInput, mergedConfig: LocalConfig) {
		this.inputNode = inputNode;
		this.inputName = this.inputNode.getAttribute("name") || "";

		this.configRules = mergedConfig.rules?.[this.inputName] || {};
		this.ruleMessages = mergedConfig.messages?.[this.inputName] || {};
		this.mergedConfig = mergedConfig;

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

		this.initRules(this.configRules);

		// Sort rules by order: default attr, custom rules.
		this.ruleNames.sort((firstValidator: string, secondValidator: string) => {
			let firstValidatorIndex = globalValidators.get(firstValidator)?.index as number;
			let secondValidatorIndex = globalValidators.get(secondValidator)?.index as number;

			if (firstValidatorIndex < secondValidatorIndex) {
				return -1;
			}

			return 1;
		});

		if (this.inputNode.getAttribute("type") === "radio") {
			document.querySelectorAll<HTMLInputElement>(`input[name='${this.inputName}']`).forEach((element) => {
				element.addEventListener("input", this.inputEvent);
			});
		}

		if (this.ruleNames.length === 0) {
			this.needValidation = false;
		} else {
			this.setLiseners();
		}
	}

	private setLiseners() {
		this.inputNode.addEventListener("focusout", this.inputEvent);
		this.inputNode.addEventListener("input", this.inputEvent);
	}

	private initRules = (configRules?: ConfigRule) => {
		for (const ruleName in configRules) {
			// TODO: надо ли удалить из глобального объекта валидатор, если перезапишем ex. maxLength
			if (typeof configRules[ruleName] === "function") {
				this.ruleNames.push(ruleName);
				this.localValidators[ruleName] = configRules[ruleName];
			} else if (globalValidators.get(ruleName)) {
				this.ruleNames.push(ruleName);
				this.configRules[ruleName] = configRules[ruleName];
			} else {
				consoleWarning(`rule param '${ruleName}' doesn't exist with value '${configRules[ruleName]}'`);
			}

			switch (ruleName) {
				case "required":
					if (typeof configRules[ruleName] !== "boolean") {
						consoleWarning(`rule param '${ruleName}' isn't boolean with value '${configRules[ruleName]}'`);
					}
					break;
				case "minLegnth":
				case "maxLegnth":
					if (typeof configRules[ruleName] !== "number") {
						consoleWarning(`rule param '${ruleName}' isn't number with value '${configRules[ruleName]}'`);
					}
					break;
			}
		}
	};

	// eslint-disable-next-line @typescript-eslint/ban-types
	//
	removeRules(rules?: Array<keyof MessagesOptionalAny | (string & {})>) {
		if (rules) {
			this.ruleNames = this.ruleNames.filter((ruleName) => (rules.includes(ruleName) ? false : true));
		} else {
			this.ruleNames = [];
		}
	}

	addRules(config: {rules?: ConfigRule; messages?: MessagesOptional}) {
		this.initRules(config.rules);

		if (config.messages) {
			this.ruleMessages = deepmerge(this.ruleMessages, config.messages);

			// for (let prop in config.messages) {
			// 	let ruleMessage = config.messages[prop as keyof typeof config.messages];

			// 	this.ruleMessages[prop] = ruleMessage;
			// }
		}
	}

	destroy() {
		this.inputNode.removeEventListener("focusout", this.inputEvent);
		this.inputNode.removeEventListener("input", this.inputEvent);
	}

	public validate(showErrors: boolean = true) {
		let inputValue = this.inputNode.value;
		let isCorrectValidation = true;

		this.ruleNames.every((validatorName) => {
			let validatorParam = this.configRules[validatorName];

			let invalidGlobalValidator = undefined;

			if (globalValidators.get(validatorName)) {
				debugger;
				invalidGlobalValidator = !globalValidators
					.get(validatorName)
					?.["validator"](inputValue, validatorParam || null, this.inputNode);
			}

			let invalidLocalValidator = undefined;

			if (this.localValidators[validatorName]) {
				invalidLocalValidator = !this.localValidators[validatorName](
					inputValue,
					validatorParam || null,
					this.inputNode
				);
			}

			if (invalidGlobalValidator || invalidLocalValidator) {
				isCorrectValidation = false;

				if (!isCorrectValidation && showErrors) {
					let errorNode: null | HTMLElement = (this.inputNode.parentElement as HTMLDivElement).querySelector(
						"." + this.mergedConfig.errorElementClass
					);

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

					if (errorNode) {
						errorNode.textContent = errorMessage;
					} else {
						errorNode = document.createElement(this.mergedConfig.errorElementTag);
						errorNode.className = this.mergedConfig.errorElementClass;
						(this.inputNode.parentElement as HTMLDivElement).appendChild(errorNode);
						errorNode.textContent = errorMessage;
					}

					errorNode.style.height = `${errorNode.scrollHeight}px`;

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

			if (showErrors) {
				let errorNode: null | HTMLParagraphElement = (this.inputNode.parentElement as HTMLDivElement).querySelector(
					"." + this.mergedConfig.errorElementClass
				);

				if (errorNode && this.mergedConfig.errorElementClass === "validation-error-label") {
					errorNode.style.height = "0px";

					//errorNode.addEventListener("transitionend", () => {
					//	debugger;
					//	errorNode?.remove();
					//});
				} else {
					errorNode?.remove();
				}

				this.inputNode.classList.remove(this.mergedConfig.inputElementErrorClass);
				this.inputNode.classList.add(this.mergedConfig.inputElementSuccessClass);
			}
		}

		return isCorrectValidation;
	}
}
