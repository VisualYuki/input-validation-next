import {inputWrap} from "./InputWrap";

export class FormWrap {
	private formElement: HTMLFormElement;
	private inputs: inputWrap[] = [];
	private userConfig: Config = {};

	constructor(formElement: HTMLFormElement, userConfig: Config = {}) {
		this.formElement = formElement;
		this.userConfig = userConfig;
		this.init();
	}

	private init() {
		// Create input wraps from form
		this.formElement
			.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("select, input, textarea")
			.forEach((input) => {
				let inputName: string = input.getAttribute("name") || "";
				let inputRules = this.userConfig.rules?.[inputName] || {};

				if (inputRules) {
					input.parentElement?.classList.add("input-validation-next");
					input.classList.add("input-validation-next__input");

					this.inputs.push(new inputWrap(input, inputRules));
				}
			});

		// On submit form event, validate all inputs
		this.formElement.addEventListener("submit", (e: SubmitEvent) => {
			e.preventDefault();

			this.inputs.forEach((inputWrap) => {
				inputWrap.validate();
			});
		});
	}

	validate() {
		this.inputs.forEach((inputWrap) => {
			inputWrap.validate();
		});
	}
}
