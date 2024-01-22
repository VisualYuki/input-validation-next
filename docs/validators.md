# Validators

## required

-  **Type:** `any`
-  **Input types:** input, select, checbox, radio button.
-  **Falsy:** if the element is empty (text input) or unchecked (radio/checkbox) or if select option isn't selected (also select option with `disabled` attr).
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/L4qxwm6s/13/)

## minLength

-  **Type:** `number`
-  **Falsy:** if the input string value is more then validator param.
-  **Valid example:** `param <= input.value.length`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

## maxLength

-  **Type:** `number`
-  **Falsy:** if the input string value is less then validator param.
-  **Valid example:** `input.value.length <= param`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

## min

-  **Type:** `number`
-  **Falsy:** if the input value as number is less then validator param as number.
-  **Valid example:** `param <= parseInt(input.value)`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

## max

-  **Type:** `number`
-  **Falsy:** if the input value as number is more then validator param as number.
-  **Valid example:** `parseInt(input.value) <= param`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

## digits

-  **Type:** `number`
-  **Falsy:** if the input value contain not digits.
-  **Valid example:** `parseInt(input.value) <= param`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

## range

-  **Type:** `[number1, number2]`
-  **Valid example:** `number1 <= value && value <= number2`
-  **Details:** Value must be more then first validator param and less then second validator param (comparison as numbers)
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

## email

-  **Type:** `any`
-  **Falsy:** Return false if the value isn't a valid email address.
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/9n2agwo3/2/)

## url

-  **Type:** `any`
-  **Falsy:** Return false if the value isn't a valid url address.
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/9n2agwo3/2/)

## date

-  **Type:** `any`
-  **Falsy:** Return false if the value isn't a valid date..
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/9n2agwo3/2/)
