export let messages_en = {
	required: "This field is required.",
	minLength: "Please enter at least {0} characters.",
	maxLength: "Please enter max {0} characters.",
	range: "Please enter a value between {0} and {1}.",
};

export type _TMessagesOptional = {
	[Property in keyof _TMessages]?: _TMessages[Property];
};
export type _TMessages = typeof messages_en;

export type _TMessagesAny = _TMessages & {[index: string]: any};
export type _TMessagesOptionalAny = _TMessagesOptional & {[index: string]: string};
