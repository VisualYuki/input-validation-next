import fs from "fs";
import path from "path";

import {describe, expect, test, vi} from "vitest";
import {InputValidationNext} from "../src/index";
import userEvent from "@testing-library/user-event";
const user = userEvent.setup();
import {messages_ru} from "../src/localization/messages_ru";
import {defaultConfig} from "../src/init";

function getFileContent(relPath) {
	return fs.readFileSync(path.join(__dirname, relPath), {encoding: "utf8"}).toString();
}

function isThereError(input: HTMLInputElement) {
	return input.classList.contains(defaultConfig.inputElementErrorClass);
}

function findInput(name: string) {
	return document.querySelector(`[name="${name}"]`) as HTMLInputElement;
}

function getErrorText(input: HTMLElement) {
	return input.parentElement?.querySelector("." + defaultConfig.errorElementClass)?.textContent;
}

function initPlugin(formId: string, config: any = {}) {
	document.body.innerHTML = getFileContent("../src/demo/index.html");
	let pluginInstance = InputValidationNext(document.getElementById(formId) as HTMLFormElement, config);

	return pluginInstance;
}

describe("form-1", () => {
	test("there is no form", () => {
		let pluginInstance = initPlugin("no-form-123");

		expect(pluginInstance).toBe(null);
	});

	test("after focusout", async () => {
		let pluginInstance = initPlugin("form-1");

		const input = findInput("requiredInput");

		input.dispatchEvent(new Event("focusout"));
		expect(isThereError(input)).toBe(true);

		await user.type(input, "1");
		expect(isThereError(input)).toBe(false);
	});

	test("custom rule", async () => {
		globalInputValidationNext.addRule(
			"customRule",
			function (value: any, element: any) {
				return value === "qwe123";
			},
			"Должны быть цифры и буквы."
		);
		let pluginInstance = initPlugin("form-1", {
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
		globalInputValidationNext.addRule(
			"customRule",
			function (value: any, element: any) {
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
		globalInputValidationNext.setRuleMessages(messages_ru);

		let pluginInstance = initPlugin("form-1");

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
	test("dfgdfg", async () => {
		function _invalidHandler() {}
		function _submitHandler() {}
		const invalidHandler = vi.fn(_invalidHandler);
		const submitHandler = vi.fn(_submitHandler);

		let pluginInstance = initPlugin("form-2", {
			invalidHandler: invalidHandler,
			submitHandler: submitHandler,
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

		const input5 = findInput("radio-input");
		input5.click();

		(document.querySelector("form#form-2")?.querySelector("button") as HTMLButtonElement).click();
		expect(pluginInstance?.isValidForm()).toBe(true);

		expect(invalidHandler).toHaveReturned();
		expect(submitHandler).toHaveReturned();
	});
});

//describe("should mock console.log", () => {
//	const consoleMock = vi.spyOn(console, "warn").mockImplementation(() => undefined);

//	afterAll(() => {
//		consoleMock.mockReset();
//	});

//	test("should log `sample output`", () => {
//		let pluginInstance = initPlugin("form-1", {});

//		//pluginInstance?.validate();

//		//console.log("hello1");

//		//console.log("sample output");
//		//expect(consoleMock).toHaveBeenCalledOnce();
//		expect(consoleMock).toHaveBeenLastCalledWith("hello");
//		//expect(consoleMock).toHaveBeenLastCalledWith("input-validation-next: field 'dsflsdf' doesn't exist in config");
//	});
//});
