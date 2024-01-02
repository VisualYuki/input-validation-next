export function consoleWarning(message: string) {
	console.warn("input-validation-next: " + message);
}

export function objectIsEmpty(obj: object) {
	return JSON.stringify(obj) === "{}";
}
