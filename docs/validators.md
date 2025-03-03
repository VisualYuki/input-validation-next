<style src='../node_modules/bootstrap/dist/css/bootstrap.css'>
</style>

<style>
a {
   text-decoration: none;
}
</style>

# Validators

## required

-  **Type:** `true`
-  **Input types:** input, select, checbox, radio button.
-  **Falsy:** if the element is empty (text input) or unchecked (radio/checkbox) or if select option isn't selected (also select option with `disabled` attr).
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/L4qxwm6s/13/)

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>input text</label>
         <input class="form-control" type="text" name="inputName1" />
      </div>
   </form>
</div>
:::

## minLength

-  **Type:** `number`
-  **Falsy:** if the input string value is more then validator param.
-  **Valid example:** `param <= input.value.length`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform2'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>minLength: 4</label>
         <input class="form-control" type="text" name="inputName1" />
      </div>
   </form>
</div>
:::

## maxLength

-  **Type:** `number`
-  **Falsy:** if the input string value is less then validator param.
-  **Valid example:** `input.value.length <= param`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform3'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>maxLength: 4</label>
         <input class="form-control" type="text" name="inputName1" />
      </div>
   </form>
</div>
:::

## min

-  **Type:** `number`
-  **Falsy:** if the input value as number is less then validator param as number.
-  **Valid example:** `param <= parseInt(input.value)`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform4'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>min: 100</label>
         <input class="form-control" type="number" name="inputName1" />
      </div>
   </form>
</div>
:::

## max

-  **Type:** `number`
-  **Falsy:** if the input value as number is more then validator param as number.
-  **Valid example:** `parseInt(input.value) <= param`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform5'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>max: 100</label>
         <input class="form-control" type="text" name="inputName1" />
      </div>
   </form>
</div>
:::

## digits

-  **Type:** `number`
-  **Falsy:** if the input value contain not digits.
-  **Valid example:** `parseInt(input.value) <= param`
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform6'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>digits: true</label>
         <input class="form-control" type="text" name="inputName1" />
      </div>
   </form>
</div>
:::

## range

-  **Type:** `[number1, number2]`
-  **Valid example:** `number1 <= value && value <= number2`
-  **Details:** Value must be more then first validator param and less then second validator param (comparison as numbers)
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/cv23g7hd/15/)

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform7'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>range: [0,10]</label>
         <input class="form-control" type="text" name="inputName1" />
      </div>
   </form>
</div>
:::

## email

-  **Type:** `true`
-  **Falsy:** Return false if the value isn't a valid email address.
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/9n2agwo3/2/)

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform8'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>email: true</label>
         <input class="form-control" type="text" name="inputName1" />
      </div>
   </form>
</div>
:::

## url

-  **Type:** `true`
-  **Falsy:** Return false if the value isn't a valid url address.
-  **Example:** [Link](https://jsfiddle.net/VisualYuki/9n2agwo3/2/)

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform9'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>url: true</label>
         <input class="form-control" type="text" name="inputName1" />
      </div>
   </form>
</div>
:::

## number

-  **Type:** `true`
-  **Falsy:** Returns true if the value contains a valid decimal number.

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform10'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>number: true</label>
         <input class="form-control" type="text" name="inputName1" />
      </div>
   </form>
</div>
:::

## equalTo

-  **Type:** `css selector`
-  **Falsy:** Requires the element to be the same as another one

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform11'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>password input 1</label>
         <input class="form-control" type="text" name="inputName1" />
      </div>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>password input 2</label>
         <input class="form-control" type="text" name="inputName2" />
      </div>
   </form>
</div>
:::

<script setup>
import {onMounted} from "vue"

onMounted(() => {
   import('../dist/input-validation-next.es.js').then((module) => {
      let myform = module.InputValidationNext(document.getElementById("myform"), {
            rules: {
               inputName1: {
                  required: true,
               },
            },
            disableFormSubmitEvent: true,
         });

         let myform2 = module.InputValidationNext(document.getElementById("myform2"), {
            rules: {
               inputName1: {
                  minLength: 4
               },
            },
            disableFormSubmitEvent: true,
         });

         let myform3 = module.InputValidationNext(document.getElementById("myform3"), {
            rules: {
               inputName1: {
                  maxLength: 4
               },
            },
            disableFormSubmitEvent: true,
         });

         let myform4 = module.InputValidationNext(document.getElementById("myform4"), {
            rules: {
               inputName1: {
                  min: 100
               },
            },
            disableFormSubmitEvent: true,
         });

         let myform5 = module.InputValidationNext(document.getElementById("myform5"), {
            rules: {
               inputName1: {
                  max: 100
               },
            },
            disableFormSubmitEvent: true,
         });

         let myform6 = module.InputValidationNext(document.getElementById("myform6"), {
            rules: {
               inputName1: {
                  digits: true
               },
            },
            disableFormSubmitEvent: true,
         });

         let myform7 = module.InputValidationNext(document.getElementById("myform7"), {
            rules: {
               inputName1: {
                  range: [0,10]
               },
            },
            disableFormSubmitEvent: true,
         });

         let myform8 = module.InputValidationNext(document.getElementById("myform8"), {
            rules: {
               inputName1: {
                  email: true
               },
            },
            disableFormSubmitEvent: true,
         });

         let myform9 = module.InputValidationNext(document.getElementById("myform9"), {
            rules: {
               inputName1: {
                  url: true
               },
            },
            disableFormSubmitEvent: true,
         });

         let myform10 = module.InputValidationNext(document.getElementById("myform10"), {
            rules: {
               inputName1: {
                  number: true
               },
            },
            disableFormSubmitEvent: true,
         });

         let myform11 = module.InputValidationNext(document.getElementById("myform11"), {
            rules: {
               inputName2: {
                  equalTo: "input[name='inputName1']"
               },
            },
            disableFormSubmitEvent: true,
         });
   });


})
</script>
