import {InputWrap} from "./InputWrap";

export class FormWrap {
	private formElement: HTMLFormElement;
	private inputs: InputWrap[] = [];
	private mergedConfig: localConfig;
	private submitButton: HTMLInputElement | HTMLButtonElement | null;

	constructor(formElement: HTMLFormElement, mergedConfig: localConfig) {
		this.formElement = formElement;
		this.mergedConfig = mergedConfig;
		this.submitButton = this.formElement.querySelector("input[type='submit'], button[type='submit']");
		this.init();
	}

	private init() {
		// Create inputWrap from form
		this.formElement
			.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("select, input, textarea")
			.forEach((input) => {
				let inputWrap = new InputWrap(input, this.mergedConfig);

				if (inputWrap.needValidation) {
					this.inputs.push(inputWrap);
				}
			});

		// On submit form event, validate all inputs
		this.formElement.addEventListener("submit", (event: SubmitEvent) => {
			if (this.mergedConfig.disableFormSubmitEvent) {
				event.preventDefault();
			}

			let createCallbackConfig: () => handlerThis = () => {
				return {
					config: {
						...this.mergedConfig,
					},
					formElement: this.formElement,
					submitButton: this.submitButton,
					inputList: this.inputs.map((inputWrap) => {
						return inputWrap.inputNode;
					}),
					successList: this.inputs
						.filter((inputWrap) => inputWrap.isValid)
						.map((inputWrap) => {
							return inputWrap.inputNode;
						}),
					errorList: this.inputs
						.filter((inputWrap) => !inputWrap.isValid)
						.map((inputWrap) => {
							return {
								element: inputWrap.inputNode,
								message: inputWrap.invalidRuleMessage,
								rule: inputWrap.invalidRule,
							};
						}),
				};
			};

			let isCorrectForm = this.validate();

			if (isCorrectForm) {
				this.mergedConfig.submitHandler?.call(createCallbackConfig(), event);
			} else {
				event.preventDefault();
				this.mergedConfig.invalidHandler?.call(createCallbackConfig(), event);
			}
		});

		// Add novalidate form attr
		if (this.mergedConfig.enableDefaultValidationForm) {
			this.formElement.removeAttribute("novalidate");
		} else {
			this.formElement.setAttribute("novalidate", "");
		}
	}

	validate() {
		let isCorrectForm = true;

		this.inputs.forEach((inputWrap) => {
			let inputValidationCorrect = inputWrap.validate();

			if (!inputValidationCorrect) {
				isCorrectForm = false;
			}
		});

		if (!isCorrectForm && this.mergedConfig.onSubmitFocusInvalid) {
			(this.formElement.querySelector("." + this.mergedConfig.inputElementErrorClass) as HTMLElement).focus();
		}

		return isCorrectForm;
	}
}
