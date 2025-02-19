import {describe, expect, test, vi} from "vitest";
import {initPlugin} from "./utils";
import {InputValidationNext} from "@/index";

describe("invalid inputs", async () => {
	const consoleWarnMock = vi.spyOn(console, "warn");

	test("there is no form", () => {
		const pluginInstance = InputValidationNext(document.querySelector(".non-existing-form"), {
			submitHandler: () => {
				console.log("hello");
			},
		});

		expect(pluginInstance).toBe(null);
	});

	test("invalid config prop type", () => {
		const pluginInstance = initPlugin("form-1", {
			//@ts-ignore
			disableFormSubmitEvent: 12,
			//@ts-ignore
			rules: 12,
			//@ts-ignore
			submitHandler: 12,
			//@ts-ignore
			inputElementClass: 12,
		});

		expect(consoleWarnMock).toHaveBeenCalledWith(
			"input-validation-next: field 'disableFormSubmitEvent' is not boolean type"
		);
		expect(consoleWarnMock).toHaveBeenCalledWith("input-validation-next: field 'rules' is not object type");
		expect(consoleWarnMock).toHaveBeenCalledWith("input-validation-next: field 'submitHandler' is not function type");
		expect(consoleWarnMock).toHaveBeenCalledWith(
			"input-validation-next: field 'inputElementClass' is not string type"
		);
		expect(pluginInstance).not.toBe(null);
	});

	test("invalid rules, messages", async () => {
		initPlugin("form-1", {
			rules: {
				"non-existing-rule-input": {
					customRule: true,
				},
			},
			messages: {
				"non-existing-message-input": {
					customRule: "some message",
				},
			},
		});

		expect(consoleWarnMock).toHaveBeenCalledWith(
			"input-validation-next: input with name 'non-existing-rule-input' doesn't exist in the document."
		);

		expect(consoleWarnMock).toHaveBeenCalledWith(
			"input-validation-next: input with name 'non-existing-message-input' doesn't exist in the document."
		);
	});
});
