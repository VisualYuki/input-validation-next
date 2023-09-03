import {inputWrap} from "./inputWrap";

export class Core {
	private formElement!: HTMLFormElement;
	private inputs: inputWrap[] = [];
	private config: Config = {};

	constructor(formElement: HTMLFormElement | null, config: Config = {}) {
		if (!(formElement instanceof HTMLFormElement)) {
			console.warn(`root parameter is not form`);
			console.warn("root parameter: ", formElement);
			return;
		}

		this.formElement = formElement;
		this.config = config;
		this.init();
	}

	private init() {
		this.formElement
			.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("select, input, textarea")
			.forEach((input) => {
				let inputName: string = input.getAttribute("name") || "";
				let inputRules = this.config.rules?.[inputName] || "";

				if (inputRules) {
					this.inputs.push(new inputWrap(input, inputRules));
				}
			});

		this.formElement.addEventListener("submit", (e: SubmitEvent) => {
			e.preventDefault();

			this.inputs.forEach((inputWrap) => {
				inputWrap.validate();
			});

			//this.formElement.querySelectorAll("input[required]").forEach((item, idx) => {
			//	if (item.value) {
			//	} else {
			//		let errorNode = document.createElement("p");
			//		errorNode.textContent = "ошибка ввода";

			//		item.parentElement.appendChild(errorNode);
			//	}
			//});
		});
	}
}
