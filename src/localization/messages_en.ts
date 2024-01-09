export let messages_en = {
	required: "This field is required.",
	minLength: "Please enter at least {0} characters.",
	maxLength: "Please enter max {0} characters.",
	range: "Please enter a value between {0} and {1}.",
};

export type _MessagesOptional = {
	[Property in keyof _Messages]?: _Messages[Property];
};
export type _Messages = typeof messages_en;

export type _MessagesAny = _Messages & {[index: string]: any};
export type _MessagesOptionalAny = _MessagesOptional & {[index: string]: string};
