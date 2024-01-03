import {InputWrap} from "./InputWrap";

export class FormWrap {
	private formElement: HTMLFormElement;
	private inputs: InputWrap[] = [];
	private mergedConfig: localConfig;

	constructor(formElement: HTMLFormElement, mergedConfig: localConfig) {
		this.formElement = formElement;
		this.mergedConfig = mergedConfig;
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

			let isCorrectForm = this.validate();

			if (isCorrectForm) {
				//this.mergedConfig.submitHandler?.();
				this.mergedConfig.submitHandler?.call(
					{
						config: {
							...this.mergedConfig,
						},
						// TODO: currentElements - инпуты в форме
						// currentForm
						// submitButton
						//
						formElement: "",
						inputList: "",
					},
					this.formElement,
					event
				);
			} else {
				event.preventDefault();
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
