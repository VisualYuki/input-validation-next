export function consoleWarning(message: string) {
	console.warn("input-validation-next: " + message);
}

export function getSelectorName(name: string) {
	return `[name='${name}']`;
}
