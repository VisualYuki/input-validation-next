// main-test
import "../temp/jquery-validation/dist/jquery.validate.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

//@ts-expect-ignore
$("#form-3").validate({
	submitHandler: function () {},
	invalidHandler: function () {},
});
