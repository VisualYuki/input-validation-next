import globalInputValidationNext from "./globInstance";
import {consoleWarning} from "./utils";
import type {ConfigRule, FormInput, LocalConfig} from "./common";
import {MessagesAny, MessagesOptional, MessagesOptionalAny} from "./localization/messages_en";

let globalValidators = globalInputValidationNext.validators;

export class InputWrap {
	inputRulesNames: string[] = [];
	inputRulesMessages: MessagesAny;
	inputConfigRules: ConfigRule;
	inputNode!: FormInput;
	mergedConfig: LocalConfig;
	needValidation: boolean = true;
	localValidators: any = {};

	isValid: boolean = false;
	invalidRule: string = "";
	invalidRuleMessage: string = "";
	inputName: string = "";

	constructor(input: FormInput, mergedConfig: LocalConfig) {
		this.inputNode = input;
		this.inputName = this.inputNode.getAttribute("name") || "";

		this.inputConfigRules = mergedConfig.rules?.[this.inputName] || {};
		this.inputRulesMessages = mergedConfig.messages?.[this.inputName] || {};
		this.mergedConfig = mergedConfig;

		input.classList.add(this.mergedConfig.inputElementClass);

		// Get default rules via input attrs.
		input.getAttributeNames().forEach((inputAttrName) => {
			let attrValue;
			// типы не определены точно.
			switch (inputAttrName) {
				case "required":
					this.inputConfigRules["required"] = true;

					break;
				case "min-length":
					attrValue = input.getAttribute(inputAttrName);

					if (attrValue) {
						this.inputConfigRules["minLength"] = +attrValue;
					}

					break;
				case "max-length":
					attrValue = input.getAttribute(inputAttrName);

					if (attrValue) {
						this.inputConfigRules["maxLength"] = +attrValue;
					}

					break;
			}
		});

		this.initRules(this.inputConfigRules);

		// Sort rules by order; default attr, custom rules.
		this.inputRulesNames.sort((firstValidator: string, secondValidator: string) => {
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

		if (this.inputRulesNames.length === 0) {
			this.needValidation = false;
		} else {
			this.setInputValidationEvents();
		}
	}

	private initRules = (inputConfigRules?: ConfigRule) => {
		for (const property in inputConfigRules) {
			if (globalValidators.get(property)) {
				this.inputRulesNames.push(property);
				this.inputConfigRules[property] = inputConfigRules[property];
			} else if (typeof inputConfigRules[property] === "function") {
				this.inputRulesNames.push(property);
				this.localValidators[property] = inputConfigRules[property];
			} else {
				consoleWarning(`rule param '${property}' doesn't exist with value '${inputConfigRules[property]}'`);
			}

			switch (property) {
				case "required":
					if (typeof inputConfigRules[property] !== "boolean") {
						consoleWarning(`rule param '${property}' isn't boolean with value '${inputConfigRules[property]}'`);
					}
					break;
				case "minLegnth":
				case "maxLegnth":
					if (typeof inputConfigRules[property] !== "number") {
						consoleWarning(`rule param '${property}' isn't number with value '${inputConfigRules[property]}'`);
					}
					break;
			}
		}
	};

	// eslint-disable-next-line @typescript-eslint/ban-types
	removeRules(rules?: Array<keyof MessagesOptionalAny | (string & {})>) {
		if (rules) {
			this.inputRulesNames = this.inputRulesNames.filter((ruleName) => {
				if (rules.includes(ruleName)) {
					return false;
				}

				return true;
			});
		} else {
			this.inputRulesNames = [];
		}
	}

	addRules(config: {rules?: ConfigRule; messages?: MessagesOptional}) {
		this.initRules(config.rules);

		if (config.messages) {
			for (let prop in config.messages) {
				let ruleMessage = config.messages[prop as keyof typeof config.messages];

				this.inputRulesMessages[prop] = ruleMessage;
			}
		}
	}

	inputEvent = () => {
		this.validate();
	};

	setInputValidationEvents() {
		this.inputNode.addEventListener("focusout", this.inputEvent);

		this.inputNode.addEventListener("input", this.inputEvent);
	}

	destroy() {
		this.inputNode.removeEventListener("focusout", this.inputEvent);
		this.inputNode.removeEventListener("input", this.inputEvent);
	}

	public validate(showErrors: boolean = true) {
		let inputValue = this.inputNode.value;
		let isCorrectValidation = true;

		this.inputRulesNames.every((validatorName) => {
			let validatorParam = this.inputConfigRules[validatorName];

			let invalidGlobalValidator = undefined;

			if (globalValidators.get(validatorName)) {
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

					if (this.inputRulesMessages[validatorName]) {
						errorMessage = this.inputRulesMessages[validatorName];
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
