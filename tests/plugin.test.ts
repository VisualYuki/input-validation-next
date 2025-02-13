import {describe, expect, test, vi} from "vitest";

import userEvent from "@testing-library/user-event";
const user = userEvent.setup();
//@ts-ignore
import "../src/locale/messages_ru";
import {defaultConfig} from "../src/config";
import {initPlugin} from "./utils";

function isThereError(input: HTMLInputElement) {
	return input.classList.contains(defaultConfig.inputElementErrorClass);
}

function findInput(name: string) {
	return document.querySelector(`[name="${name}"]`) as HTMLInputElement;
}

function getErrorText(input: HTMLElement) {
	return input.parentElement?.querySelector("." + defaultConfig.errorElementClass)?.textContent;
}

describe("form-1", () => {
	test("after focusout", async () => {
		initPlugin("form-1");

		const input = findInput("requiredInput");

		input.dispatchEvent(new Event("focusout"));
		expect(isThereError(input)).toBe(true);

		await user.type(input, "1");
		expect(isThereError(input)).toBe(false);
	});

	test("custom rule", async () => {
		globalInputValidationNext.addRule(
			"customRule",
			function (value: any) {
				return value === "qwe123";
			},
			"Должны быть цифры и буквы."
		);

		initPlugin("form-1", {
			rules: {
				customRuleInput: {
					customRule: true,
				},
			},
		});

		const input = findInput("customRuleInput");

		await user.type(input, "qwe12");
		expect(isThereError(input)).toBe(true);
		await user.type(input, "3");
		expect(isThereError(input)).toBe(false);
	});

	test("rule order: requied, min-length, custom rule", async () => {
		//@ts-ignore
		globalInputValidationNext.addRule(
			"customRule",
			function (value: any) {
				return value === "qwe123";
			},
			"qwe123"
		);

		let pluginInstance = initPlugin("form-1", {
			rules: {
				defaultAttrInput: {
					customRule: true,
				},
			},
		});

		const input = findInput("defaultAttrInput");

		pluginInstance?.validate();
		expect(getErrorText(input)).toBe("This field is required.");

		await user.type(input, "q");
		expect(getErrorText(input)).toBe("Please enter at least 4 characters.");

		await user.type(input, "we12");
		expect(getErrorText(input)).toBe("qwe123");

		await user.type(input, "3");
		expect(isThereError(input)).toBe(false);
	});

	test("custom error message in config", async () => {
		let pluginInstance = initPlugin("form-1", {
			rules: {
				defaultInput: {
					required: true,
					minLength: 4,
				},
			},
			messages: {
				defaultAttrInput: {
					required: "Required custom message for defaultAttrInput input",
				},
				defaultInput: {
					required: "Required custom message from message field of init",
					minLength: "minLegnth custom rule error text",
				},
			},
		});

		const input = findInput("defaultInput");
		pluginInstance?.validate();

		expect(getErrorText(input)).toBe("Required custom message from message field of init");

		await user.type(input, "123");
		pluginInstance?.validate();
		expect(isThereError(input)).toBe(true);
		expect(getErrorText(input)).toBe("minLegnth custom rule error text");

		await user.type(input, "4");
		pluginInstance?.validate();
		expect(isThereError(input)).toBe(false);

		const input2 = findInput("defaultAttrInput");
		expect(getErrorText(input2)).toBe("Required custom message for defaultAttrInput input");
	});

	test("test localization", async () => {
		//@ts-ignore
		globalInputValidationNext.setRuleMessages(messages_ru);

		initPlugin("form-1");

		const input = findInput("requiredInput");
		input.dispatchEvent(new Event("focusout"));

		expect(getErrorText(input)).toBe("Это поле обязательно.");
	});

	test("customize classes", async () => {
		let pluginInstance = initPlugin("form-1", {
			errorElementClass: "errorElementClass",
			errorElementTag: "label",
			inputElementClass: "inputElementClass",
			inputElementErrorClass: "inputElementErrorClass",
			inputElementSuccessClass: "inputElementSuccessClass",
		});

		pluginInstance?.validate();
		const input = findInput("requiredInput");
		let errorNode = input.parentElement?.querySelector(".errorElementClass");

		expect(errorNode).toBeTruthy();
		expect(errorNode?.tagName).toBe("LABEL");
		expect(input.classList.contains("inputElementClass")).toBe(true);
		expect(input.classList.contains("inputElementErrorClass")).toBe(true);
		expect(input.classList.contains("inputElementSuccessClass")).toBe(false);

		await user.type(input, "12");
		expect(input.classList.contains("inputElementClass")).toBe(true);
		expect(input.classList.contains("inputElementErrorClass")).toBe(false);
		expect(input.classList.contains("inputElementSuccessClass")).toBe(true);
		expect(input.parentElement?.querySelector(".errorElementClass")).toBeNull();
	});
});

describe("form-2", () => {
	test("rules, config", async () => {
		function _invalidHandler() {}
		function _submitHandler() {}
		const invalidHandler = vi.fn(_invalidHandler);
		const submitHandler = vi.fn(_submitHandler);

		let pluginInstance = initPlugin("form-2", {
			invalidHandler: invalidHandler,
			submitHandler: submitHandler,
			rules: {
				textarea: {
					range: [5, 15],
				},
			},
		});

		const input = findInput("requiredInput2");

		pluginInstance?.addRules(input, {
			rules: {
				minLength: 4,
			},
			messages: {
				minLength: "custom error",
			},
		});

		expect(pluginInstance?.isValidForm()).toBe(false);
		expect(getErrorText(input)).toBeFalsy();

		(document.querySelector("form#form-2")?.querySelector("button") as HTMLButtonElement).click();

		await user.type(input, "1");
		expect(getErrorText(input)).toBe("custom error");
		await user.type(input, "234");
		expect(isThereError(input)).toBe(false);

		const input2 = findInput("dropdownSelect");
		pluginInstance?.removeRules(input2, ["required"]);

		const input3 = findInput("checkboxInput");
		pluginInstance?.removeRules(input3);

		const input4 = findInput("textarea");
		await user.type(input4, "1");
		expect(isThereError(input4)).toBe(true);
		await user.type(input4, "5");
		expect(isThereError(input4)).toBe(false);

		const input5 = findInput("radio-input");
		input5.click();

		(document.querySelector("form#form-2")?.querySelector("button") as HTMLButtonElement).click();
		expect(pluginInstance?.isValidForm()).toBe(true);

		expect(invalidHandler).toHaveReturned();
		expect(submitHandler).toHaveReturned();
	});
});

describe("full covarage", () => {
	test("only for results", async () => {
		let pluginInstance = initPlugin("form-2", {
			enableDefaultValidationForm: true,
			//@ts-ignore
			submitHandler: 12,
			//@ts-ignore
			rules: "no object",
			//@ts-ignore
			messages: "no object",
			//@ts-ignore
			debug: 12,
			//@ts-ignore
			inputElementClass: 12,
			"invalid prop config": "1212",
		});

		const input = findInput("requiredInput2");

		pluginInstance?.removeRules(input, ["dfdf"]);

		pluginInstance?.destroy();
	});

	test("only for results", async () => {
		initPlugin("form-2", {
			rules: {
				"no name input": {
					required: true,
				},
			},
			messages: {
				"no name input 2": "fdgdfg",
			},
		});
	});

	test("disableFormSubmitEvent: true", async () => {
		initPlugin("form-2", {
			disableFormSubmitEvent: true,
		});

		let _formSubmitEventCallback = () => {
			console.log("submit");
		};

		const market = {
			_formSubmitEventCallback,
		};

		const buySpy = vi.spyOn(market, "_formSubmitEventCallback");
		expect(buySpy).not.toHaveBeenCalled();

		document.querySelector("#form-2")?.addEventListener("submit", market._formSubmitEventCallback);

		(document.querySelector("form#form-2")?.querySelector("button") as HTMLButtonElement).click();

		expect(buySpy).not.toHaveBeenCalled();
	});

	test("disableFormSubmitEvent: false", async () => {
		initPlugin("form-2", {
			disableFormSubmitEvent: false,
		});

		let _formSubmitEventCallback = () => {
			console.log("submit");
		};

		const market = {
			_formSubmitEventCallback,
		};

		const buySpy = vi.spyOn(market, "_formSubmitEventCallback");
		expect(buySpy).not.toHaveBeenCalled();

		document.querySelector("#form-2")?.addEventListener("submit", market._formSubmitEventCallback);

		(document.querySelector("form#form-2")?.querySelector("button") as HTMLButtonElement).click();

		expect(buySpy).toHaveBeenCalled();
	});

	test("inline custom rule", async () => {
		let form2 = initPlugin("form-2", {
			rules: {
				requiredInput2: {
					custom: (value: string) => {
						return value === "qwe123";
					},
				},
			},
			messages: {
				requiredInput2: {
					custom: "custom error message for inline rule",
				},
			},
		});

		const input = findInput("requiredInput2");

		await user.type(input, "qwe12");

		expect(isThereError(input)).toBe(true);

		expect(getErrorText(input)).toBe("custom error message for inline rule");

		await user.type(input, "3");

		form2?.validate();

		expect(isThereError(input)).toBe(false);
	});
});
