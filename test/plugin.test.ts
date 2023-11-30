var fs = require("fs");
var path = require("path");

import {describe, expect, test} from "vitest";
import {InputValidationNext} from "../src/index";
import userEvent from "@testing-library/user-event";
const user = userEvent.setup();

function getFileContent(relPath) {
	return fs.readFileSync(path.join(__dirname, relPath), {encoding: "utf8"}).toString();
}

function isThereError(input: HTMLInputElement) {
	let parentNode = input.parentElement;

	let errorNode = parentNode?.querySelector(".input-validation-next__error");
	let isThereParentErrorSelector = parentNode?.classList.contains("input-validation-next_error");

	return !!errorNode || isThereParentErrorSelector;
}

function findInput(name: string) {
	return document.querySelector(`input[name="${name}"]`) as HTMLInputElement;
}

function initPlugin(formId: string, config = {}) {
	document.body.innerHTML = getFileContent("../index.html");

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
		globalInputValidationNext.addValidator(
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
		globalInputValidationNext.addValidator(
			"customRule",
			function (value: any, element: any) {
				debugger;
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
		let isRequiredError = input.parentElement
			?.querySelector(".input-validation-next__error")
			?.textContent?.includes("This field is required.");
		expect(isRequiredError).toBe(true);
		await user.type(input, "q");
		let isMinLengthError = input.parentElement
			?.querySelector(".input-validation-next__error")
			?.textContent?.includes("Please enter at least");
		expect(isMinLengthError).toBe(true);
		await user.type(input, "we12");

		let isCustomRuleError = input.parentElement
			?.querySelector(".input-validation-next__error")
			?.textContent?.includes("qwe123");

		expect(isCustomRuleError).toBe(true);

		await user.type(input, "3");
		expect(isThereError(input)).toBe(false);
	});
});
