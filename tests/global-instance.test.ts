import {describe, expect, test} from "vitest";
import {messages_ru} from "@/locale/messages_ru";
import globalInputValidationNext from "@/global-instance";
import {getFileContent, initInputWrap} from "./utils";

document.body.innerHTML = getFileContent("./examples.html");

describe("", () => {
	test("test localization", async () => {
		globalInputValidationNext.setRuleMessages(messages_ru);

		const [, inputWrapInstance] = initInputWrap("text-input-3", {
			rules: {
				["text-input-3"]: {
					required: true,
				},
			},
		});

		inputWrapInstance.validate();

		expect(inputWrapInstance.errorNode.textContent).toBe("Это поле обязательно.");
	});

	test("custom rule", async () => {
		globalInputValidationNext.addRule(
			"customRule",
			function (value: any) {
				return value === "qwe123";
			},
			"text must have 'qwe123'"
		);

		const [inputNode, inputWrapInstance] = initInputWrap("text-input-3", {
			rules: {
				["text-input-3"]: {
					customRule: true,
				},
			},
		});

		inputNode.value = "qwe12";
		expect(inputWrapInstance.validate()).toBe(false);
		expect(inputWrapInstance.errorNode.textContent).toBe("text must have 'qwe123'");

		inputNode.value = "qwe123";
		expect(inputWrapInstance.validate()).toBe(true);
		expect(inputWrapInstance.errorNode.textContent).toBe("");
	});
});
