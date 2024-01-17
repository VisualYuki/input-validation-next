# Config

-  **Type:** `Object`
-  **Details:**
   Second param for `InputValidationNext`

## submitHandler

-  **Type:** `Function(event)`
-  **Params:** `event` - submit event
-  **Binding:** `this` - common info.
-  **Details:**
   Callback after form submitting when the form is valid.

## invalidHandler

-  **Type:** `Function(event)`
-  **Params:** `event` - submit event
-  **Binding:** `this` - common info.
-  **Details:**
   Callback after form submitting when the form is invalid.

## rules

-  **Type:** `Object`

```js
InputValidationNext(document.getElementById("myform"), {
	rules: {
		inputName1: {
			required: true,
			customRule: true,
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
				<input type="text" name="inputName1" />
			</div>
			<button type="submit">submit form</button>
		</form>
	</body>
</html>
```

-  **Details:**
   Contain input name as object props, and each prop contain object of rules.

## messages

-  **Type:** `Object`
-  **Details:** Contain input name as object props, and each prop contain object of rules with error message as value.

```js
InputValidationNext(document.getElementById("myform"), {
	rules: {
		inputName1: {
			required: true,
			customRule: true,
		},
	},
	message: {
		inputName1: {
			required: "Required custom message",
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
				<input type="text" name="inputName1" />
			</div>
			<button type="submit">submit form</button>
		</form>
	</body>
</html>
```

## debug

-  **Type:** `Boolean`
-  **Default:** `true`
-  **Details:** Set console warning, if will be invalid user data (config, rule params);

## inputElementClass

-  **Type:** `String`
-  **Default:** `validation-input`
-  **Details:** Set input class for all inputs, involved in the plugin.

## inputElementErrorClass

-  **Type:** `String`
-  **Default:** `validation-input_error`
-  **Details:** Set input class, if input is invalid.

## inputElementSuccessClass

-  **Type:** `String`
-  **Default:** `validation-input_success`
-  **Details:** Set input class, if input is valid.

## errorElementClass

-  **Type:** `String`
-  **Default:** `validation-error-label`
-  **Details:** Add error message node, if input is invalid

## errorElementTag

-  **Type:** `String`
-  **Default:** `p`
-  **Details:** Tag for error message node.

## onSubmitFocusInvalid

-  **Type:** `Boolean`
-  **Default:** `true`
-  **Details:** Focus first invalid input, after form submitting.

## disableFormSubmitEvent

-  **Type:** `Boolean`
-  **Default:** `false`
-  **Details:** By default form submiting dont prevent to send data to server.

## enableDefaultValidationForm

-  **Type:** `Boolean`
-  **Default:** `false`
-  **Details:** By default browser can validate form, if form don't have "novalidate" attr and there is attr validators like as: required, min-length, max-length.
