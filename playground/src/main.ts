import {InputValidationNext} from "../../src/index";

InputValidationNext(document.getElementById("form-1") as HTMLFormElement, {
	rules: {
		["password-input-2"]: {
			equalTo: "#password-input-1",
		},
	},
});
