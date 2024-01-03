import globalInputValidationNext from "./global";
import {consoleWarning} from "./utils";

export class InputWrap {
	validators: string[] = [];
	configRule: ConfigRule;
	inputNode!: FormElements;
	messages: TMessages = {};
	mergedConfig: localConfig;

	constructor(input: FormElements, validators: ConfigRule, messages: TMessages, mergedConfig: localConfig) {
		let globalValidators = globalInputValidationNext.validators;

		this.messages = messages;
		this.mergedConfig = mergedConfig;

		input.classList.add(this.mergedConfig.inputElementClass);

		// Get default rules via input attrs.
		input.getAttributeNames().forEach((inputAttrName) => {
			let attrValue;
			// типы не определены точно.
			switch (inputAttrName) {
				case "required":
					validators["required"] = true;

					break;
				case "min-length":
					attrValue = input.getAttribute(inputAttrName);

					if (attrValue) {
						validators["minLength"] = +attrValue;
					}

					break;
				case "max-length":
					attrValue = input.getAttribute(inputAttrName);

					if (attrValue) {
						validators["maxLength"] = +attrValue;
					}

					break;
			}
		});

		// Compare attr, object rules with existing rules.
		if (validators instanceof Object) {
			for (const property in validators) {
				if (globalValidators.get(property)) {
					this.validators.push(property);
				} else {
					consoleWarning(
						`rule '${property}' doesn't exist. [config.rules.${input.getAttribute("name")}.${property}]`
					);
				}

				switch (property) {
					case "required":
						if (typeof validators[property] !== "boolean") {
							consoleWarning(`required rule param '${property}' isn't boolean.`);
						}
				}
			}
		}

		// Sort rules by order; default attr, custom rules.
		this.validators.sort((firstValidator: string, secondValidator: string) => {
			let firstValidatorIndex = globalValidators.get(firstValidator)?.index as number;
			let secondValidatorIndex = globalValidators.get(secondValidator)?.index as number;

			if (firstValidatorIndex < secondValidatorIndex) {
				return -1;
			}

			return 1;
		});

		this.configRule = validators;
		this.inputNode = input;

		this.setInputValidation();
	}

	setInputValidation() {
		this.inputNode.addEventListener("focusout", () => {
			this.validate();
		});

		this.inputNode.addEventListener("input", () => {
			this.validate();
		});
	}

	public validate() {
		let inputValue = this.inputNode.value;
		let isCorrectValidation = true;
		let globalValidators = globalInputValidationNext.validators;

		this.validators.every((validatorName) => {
			let validatorParam = this.configRule[validatorName];

			if (!globalValidators.get(validatorName)?.["validator"](inputValue, validatorParam || null, this.inputNode)) {
				isCorrectValidation = false;

				if (!isCorrectValidation) {
					let errorNode: null | HTMLElement = (this.inputNode.parentElement as HTMLDivElement).querySelector(
						"." + this.mergedConfig.errorElementClass
					);

					this.inputNode.classList.remove(this.mergedConfig.inputElementSuccessClass);
					this.inputNode.classList.add(this.mergedConfig.inputElementErrorClass);

					let errorMessage;

					if (this.messages[validatorName]) {
						errorMessage = this.messages[validatorName];
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

					return;
				}
			}

			return true;
		});

		if (isCorrectValidation) {
			let errorNode: null | HTMLParagraphElement = (this.inputNode.parentElement as HTMLDivElement).querySelector(
				"." + this.mergedConfig.errorElementClass
			);

			if (errorNode && this.mergedConfig.errorElementClass === "validation-error-label") {
				errorNode.style.height = "0px";

				errorNode.addEventListener("transitionend", () => {
					errorNode?.remove();
				});
			} else {
				errorNode?.remove();
			}

			this.inputNode.classList.remove(this.mergedConfig.inputElementErrorClass);
			this.inputNode.classList.add(this.mergedConfig.inputElementSuccessClass);
		}

		return isCorrectValidation;
	}
}
