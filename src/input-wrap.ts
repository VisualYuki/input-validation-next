import globalInputValidationNext from "./global-instance";
import {consoleWarning, getSelectorName} from "./utils";
import type {FormInput, MessagesOptionalAny} from "./common";
import {LocalConfig, type ConfigRule} from "./config";
import deepmerge from "deepmerge";

let globalValidators = globalInputValidationNext.validators;

export class InputWrap {
	ruleNames: string[] = [];
	ruleMessages: MessagesOptionalAny;
	configRules: ConfigRule;
	inputNode: FormInput;
	errorNode: HTMLElement;
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

		this.initRules(this.configRules);

		// Sort rules by order: default attr, custom rules.
		this.ruleNames.sort((firstValidator: string, secondValidator: string) => {
			let firstValidatorIndex = (globalValidators.get(firstValidator)?.index as number) || Number.MAX_VALUE;
			let secondValidatorIndex = (globalValidators.get(secondValidator)?.index as number) || Number.MAX_VALUE;

			if (firstValidatorIndex < secondValidatorIndex) {
				return -1;
			}

			return 1;
		});

		if (this.inputNode.getAttribute("type") === "radio") {
			document.querySelectorAll<HTMLInputElement>(`input${getSelectorName(this.inputName)}`).forEach((element) => {
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
	};

	// eslint-disable-next-line @typescript-eslint/ban-types
	removeRules(rules?: Array<keyof MessagesOptionalAny>) {
		if (rules) {
			this.ruleNames = this.ruleNames.filter((ruleName) => (rules.includes(ruleName) ? false : true));
		} else {
			this.ruleNames = [];
		}
	}

	addRules(config: {rules?: ConfigRule; messages?: MessagesOptionalAny}) {
		this.initRules(config.rules);

		if (config.messages) {
			this.ruleMessages = deepmerge(this.ruleMessages, config.messages);
		}
	}

	destroy() {
		this.inputNode.removeEventListener("focusout", this.inputEvent);
		this.inputNode.removeEventListener("input", this.inputEvent);
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
		let inputValue = this.inputNode.value;
		let isCorrectValidation = true;

		this.ruleNames.every((validatorName) => {
			let validatorParam = this.configRules[validatorName] as any;
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
