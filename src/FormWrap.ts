import {InputWrap} from "./InputWrap";
import {TMessages} from "./localization/messages_en";

export class FormWrap {
	private formElement: HTMLFormElement;
	private inputs: InputWrap[] = [];
	private userConfig: Config = {};

	constructor(formElement: HTMLFormElement, userConfig: Config = {}) {
		this.formElement = formElement;
		this.userConfig = userConfig;
		this.init();
	}

	private init() {
		// Create inputWrap from form
		this.formElement
			.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("select, input, textarea")
			.forEach((input) => {
				let inputName: string = input.getAttribute("name") || "";
				let inputRules = this.userConfig.rules?.[inputName] || {};

				let inputMessages: TMessages = this.userConfig.messages?.[inputName] || {};

				if (inputRules) {
					input.parentElement?.classList.add("input-validation-next");
					input.classList.add("input-validation-next__input");

					this.inputs.push(new InputWrap(input, inputRules, inputMessages));
				}
			});

		// On submit form event, validate all inputs
		this.formElement.addEventListener("submit", (e: SubmitEvent) => {
			e.preventDefault();

			this.inputs.forEach((inputWrap) => {
				inputWrap.validate();
			});
		});

		// Add novalidate form attr
		if (!this.userConfig.config?.enableDefaultValidationForm) {
			this.formElement.setAttribute("novalidate", "");
		}
	}

	validate() {
		this.inputs.forEach((inputWrap) => {
			inputWrap.validate();
		});
	}
}
