# Validators

## required

-  **Type:** `any`
-  **Input types:** input, select, checbox, radio button.
-  **Falsy:** if the element is empty (text input) or unchecked (radio/checkbox) or if select option isn't selected (also select option with `disabled` attr).
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/L4qxwm6s/13/)

## minLength

-  **Type:** `number`
-  **Input types:** text input.
-  **Falsy:** if the input string value is more then validator param.
-  **Valid example:** `param <= input.value.length`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/5/)

## maxLength

-  **Type:** `number`
-  **Input types:** text input.
-  **Falsy:** if the input string value is less then validator param.
-  **Valid example:** `input.value.length <= param`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/5/)

## min

-  **Type:** `number`
-  **Input types:** text input.
-  **Falsy:** if the input value as number is less then validator param as number.
-  **Valid example:** `param <= parseInt(input.value)`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/5/)

## max

-  **Type:** `number`
-  **Input types:** text input.
-  **Falsy:** if the input value as number is more then validator param as number.
-  **Valid example:** `parseInt(input.value) <= param`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/5/)

## email

-  **Type:** `any`
-  **Details:**
   -  Return true if the value is a valid email address.
   -  Works with text inputs.

## url

-  **Type:** `any`
-  **Details:**
   -  Return true if the value is a valid url address.
   -  Works with text inputs.

## digits

-  **Type:** `number`
-  **Details:**
   -  Return true if the value contain only digits.
   -  Works with text inputs.

## range

-  **Type:** `[number1, number2]`
-  **Details:**
   -  Value must be more then first validator param and less then second validator param (comparison as numbers)

## date

-  **Type:** `any`
-  **Details:**
   -  Value must be date.
