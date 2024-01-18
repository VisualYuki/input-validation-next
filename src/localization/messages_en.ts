export let messages_en = {
	required: "This field is required.",
	minLength: "Please enter at least {0} characters.",
	maxLength: "Please enter max {0} characters.",
	range: "Please enter a value between {0} and {1}.",
	rangelength: "Please enter a value between {0} and {1} characters long.",
	email: "Please enter a valid email address.",
	url: "Please enter a valid URL.",
	//number: "Please enter a valid number.",
	digits: "Please enter only digits.",
	equalTo: "Please enter the same value again.",
	max: "Please enter a value less than or equal to {0}.",
	min: "Please enter a value greater than or equal to {0}.",
	//step: "Please enter a multiple of {0}.",
	//dateISO: "Please enter a valid date (ISO).",
};

export type MessagesOptional = {
	[Property in keyof Messages]?: Messages[Property];
};
export type Messages = typeof messages_en;

export type MessagesAny = Messages & {[index: string]: any};
export type MessagesOptionalAny = MessagesOptional & {[index: string]: string};
