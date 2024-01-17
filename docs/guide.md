# Guide

## Using NPM

Installing input-validation-next is straightforward, and can be done with npm package manager;

```sh
npm install input-validation-next;
```

After that, import plugin in your code. Required any bundler (webpack, vite, rollup);

```js
import {InputValidationNext} from "input-validation-next";
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
let myform = InputValidationNext(document.getElementById("myform"), {
	submitHandler: function (event) {
		console.log(this); // `this` contain many common info.
		console.log(event); // event of form submit
	},
	rules: {
		inputName2: {
			email: true,
		},
	},
	messages: {
		inputName2: "Custom error message for userEmail input.",
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
				<input type="text" name="inputName1" required min-length="4" />
			</div>
			<div>
				<input type="text" name="inputName2" />
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

## Adding rules

You can add local or global validators.
For global, there is `globalInputValidationNext` class, which exported default.

-  first argument (value) - input value.
-  second argument (params) - params of rule.
-  third argument (element) - input node.

```js
globalInputValidationNext.addRule(
	"firstUppercaseLetter",
	function (value, params, element) {
		return value[0] === value[0].toUpperCase();
	},
	"First letter is not uppercase"
);

let myform = InputValidationNext(document.getElementById("myform"), {
	submitHandler: function (event) {
		console.log(this);
		console.log(event);
	},
	rules: {
		userName: {
			firstUppercaseLetter: true,
		},
		userCaptcha: {
			customName: (value, params, element) => {
				return value === "Gf56Gj5";
			},
		},
	},
});
```

```html
<html>
	<head> </head>
	<body>
		<form>
			<div>
				<input type="text" name="userName" />
			</div>
			<div>
				<input type="text" name="userCaptcha" />
			</div>

			<button type="submit">submit form</button>
		</form>
	</body>
</html>
```

<div class="tip custom-block" style="padding-top: 8px">

[Example](https://ya.ru/) in online editor.

</div>

## Programming usage

Direcly validate form without submit event.

```js
let myform = InputValidationNext(document.getElementById("myform"), {});

myform.validate();
```

if form is valid or not?.

```js
let myform = InputValidationNext(document.getElementById("myform"), {});

myform.isValidForm();
```