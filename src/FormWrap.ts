import {InputWrap} from "./InputWrap";
import {TMessages} from "./localization/messages_en";
import {consoleWarning} from "./utils";

export class FormWrap {
	private formElement: HTMLFormElement;
	private inputs: InputWrap[] = [];
	private userConfig: Config;

	constructor(formElement: HTMLFormElement, userConfig: Config) {
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
			if (this.userConfig.config?.disableFormSubmitEvent) {
				e.preventDefault();
			}

			this.validate();
		});

		// Add novalidate form attr
		if (!this.userConfig.config?.enableDefaultValidationForm) {
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

		if (isCorrectForm) {
			if (this.userConfig.debug) {
				if (typeof this.userConfig.submitHandler !== "function") {
					consoleWarning("not function");
				}
			}
			this.userConfig.submitHandler?.();
		}
	}
}
