import globalInputValidationNext from "./global";

export class inputWrap {
	validators: string[] = [];
	configRule: ConfigRule;
	inputNode!: FormElements;

	constructor(input: FormElements, validators: ConfigRule) {
		let globalValidators = globalInputValidationNext.validators;

		input.getAttributeNames().forEach((inputAttrName) => {
			switch (inputAttrName) {
				case "required":
					validators["required"] = true;
					break;
				case "min-length":
					let attrValue = input.getAttribute(inputAttrName);

					if (attrValue) {
						validators["minLength"] = +attrValue;
					}

					break;
			}
		});

		if (validators instanceof Object) {
			for (const property in validators) {
				if (globalValidators.get(property)) {
					this.validators.push(property);
				}
			}
		}

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
					let errorNode = this.inputNode.parentElement?.querySelector(".input-validation-next__error");

					let errorMessage = globalInputValidationNext.messages.get(validatorName) as string;

					if (typeof validatorParam === "number") {
						errorMessage = errorMessage.replace("{0}", validatorParam.toString());
					} else if (Array.isArray(validatorParam)) {
						errorMessage = errorMessage.replace("{0}", validatorParam[0]);
						errorMessage = errorMessage.replace("{1}", validatorParam[1]);
					}

					if (errorNode) {
						errorNode.textContent = errorMessage;
					} else {
						let errorNode = document.createElement("p");
						errorNode.className = "input-validation-next__error";
						this.inputNode.parentElement?.appendChild(errorNode);
						errorNode.textContent = errorMessage;
					}

					return;
				}
			}

			return true;
		});

		if (isCorrectValidation) {
			this.inputNode.parentElement?.querySelector(".input-validation-next__error")?.remove();
		}

		return isCorrectValidation;
	}
}
