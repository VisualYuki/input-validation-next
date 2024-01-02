import "../../temp/jquery-validation/dist/jquery.validate.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

//@ts-ignore
$("#form-1").validate({
	submitHandler: function () {},
	rules: {
		//defaultAttrInput: {
		//	customRule: true,
		//	//required: true,
		//	minLength: 4,
		//},
		noExistProp: {
			range: [3, 5],
		},
		numberInputName: {
			range: [3, 5],
		},
		customRuleInput: {
			required: true,
			//customRule: true,
		},
	},
	messages: {
		customRuleInput: {
			required: "Required custom message",
		},
		noExistProp: {
			required: "Custom error message",
		},
	},
});
