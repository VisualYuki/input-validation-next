import {InputWrap} from "./InputWrap";
import {TMessages} from "./localization/messages_en";

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
				let inputName: string = input.getAttribute("name") || "";
				let inputRules = this.mergedConfig.rules?.[inputName] || {};

				let inputMessages: TMessages = this.mergedConfig.messages?.[inputName] || {};
				let inputWrap = new InputWrap(input, inputRules, inputMessages, this.mergedConfig);

				this.inputs.push(inputWrap);
			});

		// On submit form event, validate all inputs
		this.formElement.addEventListener("submit", (e: SubmitEvent) => {
			if (this.mergedConfig.config?.disableFormSubmitEvent) {
				e.preventDefault();
			}

			let isCorrectForm = this.validate();

			if (!isCorrectForm) {
				e.preventDefault();
			} else {
				this.mergedConfig.submitHandler?.();
				//this.mergedConfig.submitHandler?.call({}, this.formElement, event);
			}
		});

		// Add novalidate form attr
		if (this.mergedConfig.config?.enableDefaultValidationForm) {
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

		return isCorrectForm;
	}
}
