import {inputWrap} from "./inputWrap";

/**
 * Main class for user.
 */
export class Core {
	private formElement!: HTMLFormElement;
	private inputs: inputWrap[] = [];
	private userConfig: Config = {};

	constructor(formElement: HTMLFormElement, userConfig: Config = {}) {
		if (!(formElement instanceof HTMLFormElement)) {
			console.warn(`root parameter is not form`);
			console.warn("root parameter: ", formElement);
			return;
		}

		this.formElement = formElement;
		this.userConfig = userConfig;
		this.init();
	}

	private init() {
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

		this.formElement.addEventListener("submit", (e: SubmitEvent) => {
			e.preventDefault();

			this.inputs.forEach((inputWrap) => {
				inputWrap.validate();
			});
		});
	}
}
