const style = document.createElement("style");

style.innerText = `
.validation-error-label {
	height: 0;
	margin: 0;

	transition: height 0.2s ease-out;
	overflow: hidden;

	font-size: 13px;
	color: red;

	@media (max-width: 1023px) {
		font-size: 11px;
	}
}`;

document.body.appendChild(style);
