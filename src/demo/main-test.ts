//@ts-ignore
import $ from "jquery";
import "jquery-validation";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

$("#form-1").validate({
	debug: true,
	rules: {
		customRuleInput: {
			required: true,
			minlength: 4,
		},
	},
});
