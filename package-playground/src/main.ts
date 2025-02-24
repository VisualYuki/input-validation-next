import {InputValidationNext, globalInputValidationNext} from "input-validation-next";

//TODO: why vs code IntelliSense don't work
import {messages_ru} from "input-validation-next/locale/messages_ru.es.js";

globalInputValidationNext.setRuleMessages(messages_ru);

globalInputValidationNext.addRule(
	"customRule",
	function (value: any) {
		return value === "qwe123";
	},
	"qwe123"
);

const pluginInstance = InputValidationNext(document.getElementById("form-1") as HTMLFormElement, {
	rules: {
		defaultAttrInput: {
			customRule: true,
		},
	},
});
