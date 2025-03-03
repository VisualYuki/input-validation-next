<style src='../node_modules/bootstrap/dist/css/bootstrap.css'>
</style>

<style>
a {
   text-decoration: none;
}
</style>

# Guide

## Using NPM

Installing input-validation-next is straightforward, and can be done with npm package manager:

```sh
npm install input-validation-next;
```

After that, import plugin in your code. Required any bundler (webpack, vite, rollup):

```js
import {InputValidationNext, globalInputValidationNext} from "input-validation-next";
```

## Using CDN

Also you can add plugin by cdn directly in browser without bundler. Add these imports to your html page:

```html
<script src="https://cdn.jsdelivr.net/npm/input-validation-next@latest/dist/input-validation-next.browser.js"></script>
```

## Getting Started

There is [InputValidationNext](https://visualyuki.github.io/input-validation-next/inputValidationNext.html) function for plugin initialization.

-  First argument is form element.
-  Second argument is [config](/config.html).

<<< ./examples/guide/1/index.html

Plugin support default validation attributes: required, min-length, max-length.

<<< ./examples/guide/1/index.js

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center ">
   <!-- form -->
   <form id='myform'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>inputName1</label>
         <input class="form-control" type="text" name="inputName1" required min-length="4" />
      </div>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>inputName2</label>
         <input type="text" class="form-control" name="inputName2" />
      </div>
      <!-- submit button -->
      <button type="submit" class="btn btn-primary mx-auto d-block">submit form</button>
   </form>
</div>
:::


<div class="tip custom-block" style="padding-top: 8px">

[Example](https://jsfiddle.net/VisualYuki/m9saLz4q/3/) in online editor.

</div>

## Adding rules

You can add local or global validators.
For global, there is [globalInputValidationNext](/globalInputValidationNext) class with `addRule` method.

-  first argument (value) - input value.
-  second argument (params) - params of rule.
-  third argument (element) - input node.

For local, you can define inline function direcly in rules. Ex: customName

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
      inputName1: {
         firstUppercaseLetter: true,
      },
      inputName2: {
         customName: (value, params, element) => {
            return value === "Gf56Gj5";
         },
      },
   },
   messages: {
      inputName2: {
         customName: "sdflsdf",
      },
   },
});
```

```html
<html>
   <head> </head>
   <body>
      <form id="myform">
         <div>
            <input type="text" name="inputName1" />
         </div>
         <div>
            <input type="text" name="inputName2" />
         </div>

         <button type="submit">submit form</button>
      </form>
   </body>
</html>
```

::: tip EXAMPLE
<div class="container d-flex align-items-center justify-content-center">
   <!-- form -->
   <form id='myform-2'>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>inputName1</label>
         <input class="form-control" type="text" name="inputName1" required min-length="4" />
      </div>
      <!-- input wrap -->
      <div class="mb-3">
         <label class='form-label'>inputName2</label>
         <input type="text" class="form-control" name="inputName2" />
      </div>
      <!-- submit button -->
      <button type="submit" class="btn btn-primary mx-auto d-block">submit form</button>
   </form>
</div>
:::

<div class="tip custom-block" style="padding-top: 8px">

[Example](https://jsfiddle.net/VisualYuki/h0ryxqfd/14/) in online editor.

</div>

## Programming usage

Direcly validate form without submit event.

```js
let myform = InputValidationNext(document.getElementById("myform"), {});

myform.validate();
```

Is form valid or not?.

```js
let myform = InputValidationNext(document.getElementById("myform"), {});

myform.isValidForm();
```

## Localization

There are two ways.

1. Import object from node_modules by bundler.


```js
import messages_ru from "input-validation-next/locale/messages_ru";

```



OR 2. Import object via cdn in browser.

```html
<script src="https://cdn.jsdelivr.net/npm/input-validation-next/dist/locale/messages_ru.browser.js"></script>
```

::: info
locale variants: [link](https://github.com/VisualYuki/input-validation-next/tree/main/src/locale)
:::


After that, add locale messages into plugin.

```js
globalInputValidationNext.setRuleMessages(messages_ru);
```

<script setup>
//import {InputValidationNext, globalInputValidationNext} from '../dist/input-validation-next.js'
import {onMounted} from "vue"

onMounted(() => {
   import('../dist/input-validation-next.js').then((module) => {

   let myform = module.InputValidationNext(document.getElementById("myform"), {
      submitHandler: function(event) {
         console.log(this);
      },
      rules: {
         inputName2: {
            email: true,
         },
      },
      messages: {
         inputName2: "Custom error message for userEmail input.",
      },
      disableFormSubmitEvent: true,
   });

   module.globalInputValidationNext.addRule(
      "firstUppercaseLetter",
      function(value, params, element) {
         return value[0] === value[0].toUpperCase();
      },
      "First letter is not uppercase"
   );

   let myform2 = module.InputValidationNext(document.getElementById("myform-2"), {
      submitHandler: function(event) {
         console.log(this);
         console.log(event);
      },
      rules: {
         inputName1: {
            firstUppercaseLetter: true,
         },
         inputName2: {
            customName: (value, params, element) => {
            return value === "qwe123";
            },
         },
      },
      messages: {
         inputName2: {
            customName: "error message for customName validator"
         }
      }
   });
   })
})
</script>
