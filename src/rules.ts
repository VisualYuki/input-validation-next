import globalInputValidationNext from "./global";

globalInputValidationNext.addValidator(
	"required",
	(value) => {
		return !!value;
	},
	"Это поле обязательно"
);
