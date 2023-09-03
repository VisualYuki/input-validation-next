import globalInputValidationNext from "./global";

export class inputWrap {
	validators: String[] = [];
	inputNode!: FormElements;

	constructor(input: FormElements, validators: ConfigRule | String) {
		let inputName: string = input.getAttribute("name") || "";
		let globalValidators = globalInputValidationNext.getValidators();

		if (validators instanceof Object) {
			for (const property in validators) {
				if (globalValidators.get(property)) {
					this.validators.push(property);
				}
			}
		}

		this.inputNode = input;

		//if (rules instanceof String) {
		//}

		//item.addEventListener("input", (e) => {
		//	console.log(inputName);
		//});
	}

	public validate() {
		let inputValue = this.inputNode.value;
		let isCorrectValidation = true;
		let globalValidators = globalInputValidationNext.getValidators();

		this.validators.forEach((validatorName) => {
			debugger;
			if (!globalValidators.get(validatorName)?.["validator"](inputValue)) {
				isCorrectValidation = false;
			}
		});

		if (!isCorrectValidation) {
			let errorNode = document.createElement("p");
			errorNode.textContent = "ошибка ввода";

			this.inputNode.parentElement?.appendChild(errorNode);
		}

		return isCorrectValidation;
	}
}
