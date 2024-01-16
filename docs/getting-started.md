# Installation

## Using NPM

Installing input-validation-next is straightforward, and can be done with npm package manager;

```sh
npm install input-validation-next;
```

After that, import plugin in your code. Required any bundler (webpack, vite, rollup);

```js
import "input-validation-next";
```

## Using CDN

Also you can add plugin by cdn direcly in browser without bundler. Add these imports to your html page:

```html
<script src="https://cdn.jsdelivr.net/npm/input-validatin-next"></script>
<script src="https://cdn.jsdelivr.net/npm/input-validatin-next"></script>
```

## Getting Started

There is [InputValidationNext](https://nodejs.org/) function for plugin initialization.

-  First argument is form element.
-  Second argument is [config](https://nodejs.org/).

```js
let form1 = InputValidationNext(document.getElementById("form-1"), {
	submitHandler: function (event) {
		console.log(this); // `this` contain many common info.
		console.log(event); // event of form submit
	},
	rules: {
		userEmail: {
			// input name
			email: true, // plugin rule
		},
	},
	messages: {
		userEmail: "Custom error message for userEmail input.",
	},
});
```

Plugin support default validation attributes: required, min-length, max-length,

```html
<html>
	<head> </head>
	<body>
		<!-- form tag is required -->
		<form>
			<div>
				<input type="text" name="userName" required min-length="4" />
			</div>
			<div>
				<input type="text" name="userEmail" />
			</div>

			<!-- submit button or submit link is required -->
			<button type="submit">submit form</button>
		</form>
	</body>
</html>
```

<div class="tip custom-block" style="padding-top: 8px">

[Example](https://ya.ru/) in online editor.

</div>
