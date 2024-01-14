var S=Object.defineProperty;var F=(i,n,a)=>n in i?S(i,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[n]=a;var N=(i,n)=>()=>(n||i((n={exports:{}}).exports,n),n.exports);var c=(i,n,a)=>(F(i,typeof n!="symbol"?n+"":n,a),a);var Z=N((_,x)=>{(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))u(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&u(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function u(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();let M={required:"This field is required.",minLength:"Please enter at least {0} characters.",maxLength:"Please enter max {0} characters.",range:"Please enter a value between {0} and {1}.",rangelength:"Please enter a value between {0} and {1} characters long.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",max:"Please enter a value less than or equal to {0}.",min:"Please enter a value greater than or equal to {0}."};class g{static addRule(n,a,u){this.validators.set(n,{validator:a,errorText:u,index:this.index}),this.index++,u&&this.messages.set(n,u)}static setRuleMessages(n){for(let a in n)this.messages.set(a,n[a])}}c(g,"validators",new Map),c(g,"messages",new Map),c(g,"index",0);g.setRuleMessages(M);function p(i){console.warn("input-validation-next: "+i)}function q(i){return i&&typeof i=="object"&&!Array.isArray(i)}function A(i,n){let a=Object.assign({},i);return q(i)&&q(n)&&Object.keys(n).forEach(u=>{q(n[u])?u in i?a[u]=A(i[u],n[u]):Object.assign(a,{[u]:n[u]}):Object.assign(a,{[u]:n[u]})}),a}let R=g.validators;class I{constructor(n,a){c(this,"inputRulesNames",[]);c(this,"inputRulesMessages");c(this,"inputConfigRules");c(this,"inputNode");c(this,"mergedConfig");c(this,"needValidation",!0);c(this,"isValid",!1);c(this,"invalidRule","");c(this,"invalidRuleMessage","");c(this,"inputName","");c(this,"initRules",n=>{for(const a in n)switch(R.get(a)?(this.inputRulesNames.push(a),this.inputConfigRules[a]=n[a]):p(`rule param '${a}' doesn't exist with value '${n[a]}'`),a){case"required":typeof n[a]!="boolean"&&p(`rule param '${a}' isn't boolean with value '${n[a]}'`);break;case"minLegnth":case"maxLegnth":typeof n[a]!="number"&&p(`rule param '${a}' isn't number with value '${n[a]}'`);break}});c(this,"inputEvent",()=>{this.validate()});var u,e;this.inputNode=n,this.inputName=this.inputNode.getAttribute("name")||"",this.inputConfigRules=((u=a.rules)==null?void 0:u[this.inputName])||{},this.inputRulesMessages=((e=a.messages)==null?void 0:e[this.inputName])||{},this.mergedConfig=a,n.classList.add(this.mergedConfig.inputElementClass),n.getAttributeNames().forEach(t=>{let s;switch(t){case"required":this.inputConfigRules.required=!0;break;case"min-length":s=n.getAttribute(t),s&&(this.inputConfigRules.minLength=+s);break;case"max-length":s=n.getAttribute(t),s&&(this.inputConfigRules.maxLength=+s);break}}),this.initRules(this.inputConfigRules),this.inputRulesNames.sort((t,s)=>{var l,d;let r=(l=R.get(t))==null?void 0:l.index,o=(d=R.get(s))==null?void 0:d.index;return r<o?-1:1}),this.inputNode.getAttribute("type")==="radio"&&document.querySelectorAll(`input[name='${this.inputName}']`).forEach(t=>{t.addEventListener("input",this.inputEvent)}),this.inputRulesNames.length===0?this.needValidation=!1:this.setInputValidationEvents()}removeRules(n){n?this.inputRulesNames=this.inputRulesNames.filter(a=>!n.includes(a)):this.inputRulesNames=[]}addRules(n){if(this.initRules(n.rules),n.messages)for(let a in n.messages){let u=n.messages[a];this.inputRulesMessages[a]=u}}setInputValidationEvents(){this.inputNode.addEventListener("focusout",this.inputEvent),this.inputNode.addEventListener("input",this.inputEvent)}destroy(){this.inputNode.removeEventListener("focusout",this.inputEvent),this.inputNode.removeEventListener("input",this.inputEvent)}validate(n=!0){let a=this.inputNode.value,u=!0;if(this.inputRulesNames.every(e=>{var s;let t=this.inputConfigRules[e];if(!((s=R.get(e))!=null&&s.validator(a,t||null,this.inputNode))&&(u=!1,!u&&n)){let r=this.inputNode.parentElement.querySelector("."+this.mergedConfig.errorElementClass);this.inputNode.classList.remove(this.mergedConfig.inputElementSuccessClass),this.inputNode.classList.add(this.mergedConfig.inputElementErrorClass);let o;this.inputRulesMessages[e]?o=this.inputRulesMessages[e]:o=g.messages.get(e),typeof t=="number"?o=o.replace("{0}",t.toString()):Array.isArray(t)&&(o=o.replace("{0}",t[0]),o=o.replace("{1}",t[1])),r||(r=document.createElement(this.mergedConfig.errorElementTag),r.className=this.mergedConfig.errorElementClass,this.inputNode.parentElement.appendChild(r)),r.textContent=o,r.style.height=`${r.scrollHeight}px`,this.invalidRule=e,this.invalidRuleMessage=o;return}return!0}),u&&(this.isValid=!0,this.invalidRule="",this.invalidRuleMessage="",n)){let e=this.inputNode.parentElement.querySelector("."+this.mergedConfig.errorElementClass);e&&this.mergedConfig.errorElementClass==="validation-error-label"?e.style.height="0px":e==null||e.remove(),this.inputNode.classList.remove(this.mergedConfig.inputElementErrorClass),this.inputNode.classList.add(this.mergedConfig.inputElementSuccessClass)}return u}}class P{constructor(n,a){c(this,"formElement");c(this,"inputs",[]);c(this,"mergedConfig");c(this,"submitButton");c(this,"submitEventCallback",n=>{var e,t;this.mergedConfig.disableFormSubmitEvent&&(n.preventDefault(),n.stopImmediatePropagation());let a=()=>({config:{...this.mergedConfig},formElement:this.formElement,submitButton:this.submitButton,inputList:this.inputs.map(s=>s.inputNode),successList:this.inputs.filter(s=>s.isValid).map(s=>s.inputNode),errorList:this.inputs.filter(s=>!s.isValid).map(s=>({element:s.inputNode,message:s.invalidRuleMessage,rule:s.invalidRule}))});this.validate()?(e=this.mergedConfig.submitHandler)==null||e.call(a(),n):((t=this.mergedConfig.invalidHandler)==null||t.call(a(),n),n.preventDefault()),this.mergedConfig.disableFormSubmitEvent});this.formElement=n,this.mergedConfig=a,this.submitButton=this.formElement.querySelector("input[type='submit'], button[type='submit']"),this.init()}init(){this.formElement.querySelectorAll("select, input, textarea").forEach(n=>{let a=new I(n,this.mergedConfig);a.needValidation&&this.inputs.push(a)}),this.formElement.addEventListener("submit",this.submitEventCallback),this.mergedConfig.enableDefaultValidationForm?this.formElement.removeAttribute("novalidate"):this.formElement.setAttribute("novalidate","")}validate(n=!0){let a=!0;return this.inputs.forEach(u=>{u.validate(n)||(a=!1)}),!a&&this.mergedConfig.onSubmitFocusInvalid&&n&&this.formElement.querySelector("."+this.mergedConfig.inputElementErrorClass).focus(),a}removeRules(n,a){for(let u=0;u<this.inputs.length;u++)if(this.inputs[u].inputNode===n){this.inputs[u].removeRules(a);break}}addRules(n,a){for(let u=0;u<this.inputs.length;u++)if(this.inputs[u].inputNode===n){this.inputs[u].addRules(a);break}}destroy(){this.inputs.forEach(n=>{n.destroy()}),this.formElement.removeEventListener("submit",this.submitEventCallback)}}class k{constructor(n,a){c(this,"formWrap");this.formWrap=new P(n,a)}isValidForm(){return this.formWrap.validate(!1)}validate(){this.formWrap.validate()}removeRules(n,a){this.formWrap.removeRules(n,a)}addRules(n,a){this.formWrap.addRules(n,a)}destroy(){this.formWrap.destroy()}}let T={submitHandler(){},invalidHandler(){},debug:!0,inputElementClass:"validation-input",inputElementErrorClass:"validation-input_error",inputElementSuccessClass:"validation-input_success",errorElementClass:"validation-error-label",errorElementTag:"p",onSubmitFocusInvalid:!0,rules:{},messages:{},enableDefaultValidationForm:!1,disableFormSubmitEvent:!1};function L(i,n={}){let a=JSON.parse(JSON.stringify(T)),u=A(a,n);if(u.debug&&!(i instanceof HTMLFormElement))return p("root parameter is not form"),p("root parameter type is "+i),null;if(u.debug){for(let e in u)switch(e){case"submitHandler":case"invalidHandler":typeof u.submitHandler!="function"&&p(`field '${e}' is not function`);break;case"rules":case"messages":typeof u[e]!="object"&&(p(`field '${e}' doesn't object type`),u[e]={});break;case"debug":case"onSubmitFocusInvalid":case"enableDefaultValidationForm":case"disableFormSubmitEvent":typeof u[e]!="boolean"&&p(`field '${e}' doesn't boolean type`);break;case"inputElementClass":case"inputElementSuccessClass":case"errorElementTag":case"errorElementClass":case"inputElementErrorClass":typeof u[e]!="string"&&p(`field '${e}' doesn't boolean type`);break;default:p(`field '${e}' doesn't exist in config`),delete u[e]}for(let e in u.rules)i.querySelector(`[name='${e}']`)||(p(`input with name '${e}' doesn't exist in the document.`),delete u.rules[e]);for(let e in u.messages)i.querySelector(`[name='${e}']`)||(p(`input with name '${e}' doesn't exist in the document.`),delete u.messages[e])}return new k(i,u)}function z(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var H=D,V=/^(?:\w+:)?\/\/(\S+)$/,j=/^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/,O=/^[^\s\.]+\.\S{2,}$/;function D(i){if(typeof i!="string")return!1;var n=i.match(V);if(!n)return!1;var a=n[1];return a?!!(j.test(a)||O.test(a)):!1}const B=z(H);g.addRule("required",(i,n,a)=>{if(a instanceof HTMLSelectElement)return!a.selectedOptions[0].hasAttribute("disabled");if(a.getAttribute("type")==="checkbox")return a.checked;if(a.getAttribute("type")==="radio"){let u=document.querySelectorAll(`input[name='${a.getAttribute("name")}']`),e=!1;return u.forEach(t=>{t.checked&&(e=!0)}),e}return!!i},"");g.addRule("minLength",(i,n)=>n<=i.length,"");g.addRule("maxLength",(i,n)=>i.length<=n,"");g.addRule("email",i=>/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(i),"");g.addRule("url",i=>B(i),"");g.addRule("digits",i=>/^\d+$/.test(i),"");g.addRule("min",(i,n)=>n<=i,"");g.addRule("max",(i,n)=>i<=n,"");g.addRule("date",i=>!/Invalid|NaN/.test(new Date(i).toString()),"");g.addRule("range",(i,n)=>n[0]<=+i&&+i<=n[1],"");window.globalInputValidationNext=g;/*!
 * jQuery Validation Plugin v1.20.0
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2023 Jörn Zaefferer
 * Released under the MIT license
 */(function(i){typeof define=="function"&&define.amd?define(["jquery"],i):typeof x=="object"&&x.exports?x.exports=i(require("jquery")):i(jQuery)})(function(i){i.extend(i.fn,{validate:function(e){if(!this.length){e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing.");return}var t=i.data(this[0],"validator");return t||(this.attr("novalidate","novalidate"),t=new i.validator(e,this[0]),i.data(this[0],"validator",t),t.settings.onsubmit&&(this.on("click.validate",":submit",function(s){t.submitButton=s.currentTarget,i(this).hasClass("cancel")&&(t.cancelSubmit=!0),i(this).attr("formnovalidate")!==void 0&&(t.cancelSubmit=!0)}),this.on("submit.validate",function(s){t.settings.debug&&s.preventDefault();function r(){var o,l;return t.submitButton&&(t.settings.submitHandler||t.formSubmitted)&&(o=i("<input type='hidden'/>").attr("name",t.submitButton.name).val(i(t.submitButton).val()).appendTo(t.currentForm)),t.settings.submitHandler&&!t.settings.debug?(l=t.settings.submitHandler.call(t,t.currentForm,s),o&&o.remove(),l!==void 0?l:!1):!0}return t.cancelSubmit?(t.cancelSubmit=!1,r()):t.form()?t.pendingRequest?(t.formSubmitted=!0,!1):r():(t.focusInvalid(),!1)})),t)},valid:function(){var e,t,s;return i(this[0]).is("form")?e=this.validate().form():(s=[],e=!0,t=i(this[0].form).validate(),this.each(function(){e=t.element(this)&&e,e||(s=s.concat(t.errorList))}),t.errorList=s),e},rules:function(e,t){var s=this[0],r=typeof this.attr("contenteditable")<"u"&&this.attr("contenteditable")!=="false",o,l,d,h,f,m;if(s!=null&&(!s.form&&r&&(s.form=this.closest("form")[0],s.name=this.attr("name")),s.form!=null)){if(e)switch(o=i.data(s.form,"validator").settings,l=o.rules,d=i.validator.staticRules(s),e){case"add":i.extend(d,i.validator.normalizeRule(t)),delete d.messages,l[s.name]=d,t.messages&&(o.messages[s.name]=i.extend(o.messages[s.name],t.messages));break;case"remove":return t?(m={},i.each(t.split(/\s/),function(b,y){m[y]=d[y],delete d[y]}),m):(delete l[s.name],d)}return h=i.validator.normalizeRules(i.extend({},i.validator.classRules(s),i.validator.attributeRules(s),i.validator.dataRules(s),i.validator.staticRules(s)),s),h.required&&(f=h.required,delete h.required,h=i.extend({required:f},h)),h.remote&&(f=h.remote,delete h.remote,h=i.extend(h,{remote:f})),h}}});var n=function(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")};i.extend(i.expr.pseudos||i.expr[":"],{blank:function(e){return!n(""+i(e).val())},filled:function(e){var t=i(e).val();return t!==null&&!!n(""+t)},unchecked:function(e){return!i(e).prop("checked")}}),i.validator=function(e,t){this.settings=i.extend(!0,{},i.validator.defaults,e),this.currentForm=t,this.init()},i.validator.format=function(e,t){return arguments.length===1?function(){var s=i.makeArray(arguments);return s.unshift(e),i.validator.format.apply(this,s)}:(t===void 0||(arguments.length>2&&t.constructor!==Array&&(t=i.makeArray(arguments).slice(1)),t.constructor!==Array&&(t=[t]),i.each(t,function(s,r){e=e.replace(new RegExp("\\{"+s+"\\}","g"),function(){return r})})),e)},i.extend(i.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:i([]),errorLabelContainer:i([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(e){this.lastActive=e,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,e,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(e)))},onfocusout:function(e){!this.checkable(e)&&(e.name in this.submitted||!this.optional(e))&&this.element(e)},onkeyup:function(e,t){var s=[16,17,18,20,35,36,37,38,39,40,45,144,225];t.which===9&&this.elementValue(e)===""||i.inArray(t.keyCode,s)!==-1||(e.name in this.submitted||e.name in this.invalid)&&this.element(e)},onclick:function(e){e.name in this.submitted?this.element(e):e.parentNode.name in this.submitted&&this.element(e.parentNode)},highlight:function(e,t,s){e.type==="radio"?this.findByName(e.name).addClass(t).removeClass(s):i(e).addClass(t).removeClass(s)},unhighlight:function(e,t,s){e.type==="radio"?this.findByName(e.name).removeClass(t).addClass(s):i(e).removeClass(t).addClass(s)}},setDefaults:function(e){i.extend(i.validator.defaults,e)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:i.validator.format("Please enter no more than {0} characters."),minlength:i.validator.format("Please enter at least {0} characters."),rangelength:i.validator.format("Please enter a value between {0} and {1} characters long."),range:i.validator.format("Please enter a value between {0} and {1}."),max:i.validator.format("Please enter a value less than or equal to {0}."),min:i.validator.format("Please enter a value greater than or equal to {0}."),step:i.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){this.labelContainer=i(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||i(this.currentForm),this.containers=i(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var e=this.currentForm,t=this.groups={},s;i.each(this.settings.groups,function(o,l){typeof l=="string"&&(l=l.split(/\s/)),i.each(l,function(d,h){t[h]=o})}),s=this.settings.rules,i.each(s,function(o,l){s[o]=i.validator.normalizeRule(l)});function r(o){var l=typeof i(this).attr("contenteditable")<"u"&&i(this).attr("contenteditable")!=="false";if(!this.form&&l&&(this.form=i(this).closest("form")[0],this.name=i(this).attr("name")),e===this.form){var d=i.data(this.form,"validator"),h="on"+o.type.replace(/^validate/,""),f=d.settings;f[h]&&!i(this).is(f.ignore)&&f[h].call(d,this,o)}}i(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",r).on("click.validate","select, option, [type='radio'], [type='checkbox']",r),this.settings.invalidHandler&&i(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),i.extend(this.submitted,this.errorMap),this.invalid=i.extend({},this.errorMap),this.valid()||i(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var e=0,t=this.currentElements=this.elements();t[e];e++)this.check(t[e]);return this.valid()},element:function(e){var t=this.clean(e),s=this.validationTargetFor(t),r=this,o=!0,l,d;return s===void 0?delete this.invalid[t.name]:(this.prepareElement(s),this.currentElements=i(s),d=this.groups[s.name],d&&i.each(this.groups,function(h,f){f===d&&h!==s.name&&(t=r.validationTargetFor(r.clean(r.findByName(h))),t&&t.name in r.invalid&&(r.currentElements.push(t),o=r.check(t)&&o))}),l=this.check(s)!==!1,o=o&&l,l?this.invalid[s.name]=!1:this.invalid[s.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),i(e).attr("aria-invalid",!l)),o},showErrors:function(e){if(e){var t=this;i.extend(this.errorMap,e),this.errorList=i.map(this.errorMap,function(s,r){return{message:s,element:t.findByName(r)[0]}}),this.successList=i.grep(this.successList,function(s){return!(s.name in e)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){i.fn.resetForm&&i(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var e=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(e)},resetElements:function(e){var t;if(this.settings.unhighlight)for(t=0;e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,""),this.findByName(e[t].name).removeClass(this.settings.validClass);else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(e){var t=0,s;for(s in e)e[s]!==void 0&&e[s]!==null&&e[s]!==!1&&t++;return t},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(e){e.not(this.containers).text(""),this.addWrapper(e).hide()},valid:function(){return this.size()===0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{i(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").trigger("focus").trigger("focusin")}catch{}},findLastActive:function(){var e=this.lastActive;return e&&i.grep(this.errorList,function(t){return t.element.name===e.name}).length===1&&e},elements:function(){var e=this,t={};return i(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var s=this.name||i(this).attr("name"),r=typeof i(this).attr("contenteditable")<"u"&&i(this).attr("contenteditable")!=="false";return!s&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),r&&(this.form=i(this).closest("form")[0],this.name=s),this.form!==e.currentForm||s in t||!e.objectLength(i(this).rules())?!1:(t[s]=!0,!0)})},clean:function(e){return i(e)[0]},errors:function(){var e=this.settings.errorClass.split(" ").join(".");return i(this.settings.errorElement+"."+e,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=i([]),this.toHide=i([])},reset:function(){this.resetInternals(),this.currentElements=i([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(e){this.reset(),this.toHide=this.errorsFor(e)},elementValue:function(e){var t=i(e),s=e.type,r=typeof t.attr("contenteditable")<"u"&&t.attr("contenteditable")!=="false",o,l;return s==="radio"||s==="checkbox"?this.findByName(e.name).filter(":checked").val():s==="number"&&typeof e.validity<"u"?e.validity.badInput?"NaN":t.val():(r?o=t.text():o=t.val(),s==="file"?o.substr(0,12)==="C:\\fakepath\\"?o.substr(12):(l=o.lastIndexOf("/"),l>=0||(l=o.lastIndexOf("\\"),l>=0)?o.substr(l+1):o):typeof o=="string"?o.replace(/\r/g,""):o)},check:function(e){e=this.validationTargetFor(this.clean(e));var t=i(e).rules(),s=i.map(t,function(m,b){return b}).length,r=!1,o=this.elementValue(e),l,d,h,f;this.abortRequest(e),typeof t.normalizer=="function"?f=t.normalizer:typeof this.settings.normalizer=="function"&&(f=this.settings.normalizer),f&&(o=f.call(e,o),delete t.normalizer);for(d in t){h={method:d,parameters:t[d]};try{if(l=i.validator.methods[d].call(this,o,e,h.parameters),l==="dependency-mismatch"&&s===1){r=!0;continue}if(r=!1,l==="pending"){this.toHide=this.toHide.not(this.errorsFor(e));return}if(!l)return this.formatAndAdd(e,h),!1}catch(m){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+h.method+"' method.",m),m instanceof TypeError&&(m.message+=".  Exception occurred when checking element "+e.id+", check the '"+h.method+"' method."),m}}if(!r)return this.objectLength(t)&&this.successList.push(e),!0},customDataMessage:function(e,t){return i(e).data("msg"+t.charAt(0).toUpperCase()+t.substring(1).toLowerCase())||i(e).data("msg")},customMessage:function(e,t){var s=this.settings.messages[e];return s&&(s.constructor===String?s:s[t])},findDefined:function(){for(var e=0;e<arguments.length;e++)if(arguments[e]!==void 0)return arguments[e]},defaultMessage:function(e,t){typeof t=="string"&&(t={method:t});var s=this.findDefined(this.customMessage(e.name,t.method),this.customDataMessage(e,t.method),!this.settings.ignoreTitle&&e.title||void 0,i.validator.messages[t.method],"<strong>Warning: No message defined for "+e.name+"</strong>"),r=/\$?\{(\d+)\}/g;return typeof s=="function"?s=s.call(this,t.parameters,e):r.test(s)&&(s=i.validator.format(s.replace(r,"{$1}"),t.parameters)),s},formatAndAdd:function(e,t){var s=this.defaultMessage(e,t);this.errorList.push({message:s,element:e,method:t.method}),this.errorMap[e.name]=s,this.submitted[e.name]=s},addWrapper:function(e){return this.settings.wrapper&&(e=e.add(e.parent(this.settings.wrapper))),e},defaultShowErrors:function(){var e,t,s;for(e=0;this.errorList[e];e++)s=this.errorList[e],this.settings.highlight&&this.settings.highlight.call(this,s.element,this.settings.errorClass,this.settings.validClass),this.showLabel(s.element,s.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(e=0;this.successList[e];e++)this.showLabel(this.successList[e]);if(this.settings.unhighlight)for(e=0,t=this.validElements();t[e];e++)this.settings.unhighlight.call(this,t[e],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return i(this.errorList).map(function(){return this.element})},showLabel:function(e,t){var s,r,o,l,d=this.errorsFor(e),h=this.idOrName(e),f=i(e).attr("aria-describedby");d.length?(d.removeClass(this.settings.validClass).addClass(this.settings.errorClass),this.settings&&this.settings.escapeHtml?d.text(t||""):d.html(t||"")):(d=i("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass),this.settings&&this.settings.escapeHtml?d.text(t||""):d.html(t||""),s=d,this.settings.wrapper&&(s=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(s):this.settings.errorPlacement?this.settings.errorPlacement.call(this,s,i(e)):s.insertAfter(e),d.is("label")?d.attr("for",h):d.parents("label[for='"+this.escapeCssMeta(h)+"']").length===0&&(o=d.attr("id"),f?f.match(new RegExp("\\b"+this.escapeCssMeta(o)+"\\b"))||(f+=" "+o):f=o,i(e).attr("aria-describedby",f),r=this.groups[e.name],r&&(l=this,i.each(l.groups,function(m,b){b===r&&i("[name='"+l.escapeCssMeta(m)+"']",l.currentForm).attr("aria-describedby",d.attr("id"))})))),!t&&this.settings.success&&(d.text(""),typeof this.settings.success=="string"?d.addClass(this.settings.success):this.settings.success(d,e)),this.toShow=this.toShow.add(d)},errorsFor:function(e){var t=this.escapeCssMeta(this.idOrName(e)),s=i(e).attr("aria-describedby"),r="label[for='"+t+"'], label[for='"+t+"'] *";return s&&(r=r+", #"+this.escapeCssMeta(s).replace(/\s+/g,", #")),this.errors().filter(r)},escapeCssMeta:function(e){return e===void 0?"":e.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(e){return this.groups[e.name]||(this.checkable(e)?e.name:e.id||e.name)},validationTargetFor:function(e){return this.checkable(e)&&(e=this.findByName(e.name)),i(e).not(this.settings.ignore)[0]},checkable:function(e){return/radio|checkbox/i.test(e.type)},findByName:function(e){return i(this.currentForm).find("[name='"+this.escapeCssMeta(e)+"']")},getLength:function(e,t){switch(t.nodeName.toLowerCase()){case"select":return i("option:selected",t).length;case"input":if(this.checkable(t))return this.findByName(t.name).filter(":checked").length}return e.length},depend:function(e,t){return this.dependTypes[typeof e]?this.dependTypes[typeof e](e,t):!0},dependTypes:{boolean:function(e){return e},string:function(e,t){return!!i(e,t.form).length},function:function(e,t){return e(t)}},optional:function(e){var t=this.elementValue(e);return!i.validator.methods.required.call(this,t,e)&&"dependency-mismatch"},elementAjaxPort:function(e){return"validate"+e.name},startRequest:function(e){this.pending[e.name]||(this.pendingRequest++,i(e).addClass(this.settings.pendingClass),this.pending[e.name]=!0)},stopRequest:function(e,t){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[e.name],i(e).removeClass(this.settings.pendingClass),t&&this.pendingRequest===0&&this.formSubmitted&&this.form()&&this.pendingRequest===0?(i(this.currentForm).trigger("submit"),this.submitButton&&i("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!t&&this.pendingRequest===0&&this.formSubmitted&&(i(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},abortRequest:function(e){var t;this.pending[e.name]&&(t=this.elementAjaxPort(e),i.ajaxAbort(t),this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[e.name],i(e).removeClass(this.settings.pendingClass))},previousValue:function(e,t){return t=typeof t=="string"&&t||"remote",i.data(e,"previousValue")||i.data(e,"previousValue",{old:null,valid:!0,message:this.defaultMessage(e,{method:t})})},destroy:function(){this.resetForm(),i(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(e,t){e.constructor===String?this.classRuleSettings[e]=t:i.extend(this.classRuleSettings,e)},classRules:function(e){var t={},s=i(e).attr("class");return s&&i.each(s.split(" "),function(){this in i.validator.classRuleSettings&&i.extend(t,i.validator.classRuleSettings[this])}),t},normalizeAttributeRule:function(e,t,s,r){/min|max|step/.test(s)&&(t===null||/number|range|text/.test(t))&&(r=Number(r),isNaN(r)&&(r=void 0)),r||r===0?e[s]=r:t===s&&t!=="range"&&(e[t==="date"?"dateISO":s]=!0)},attributeRules:function(e){var t={},s=i(e),r=e.getAttribute("type"),o,l;for(o in i.validator.methods)o==="required"?(l=e.getAttribute(o),l===""&&(l=!0),l=!!l):l=s.attr(o),this.normalizeAttributeRule(t,r,o,l);return t.maxlength&&/-1|2147483647|524288/.test(t.maxlength)&&delete t.maxlength,t},dataRules:function(e){var t={},s=i(e),r=e.getAttribute("type"),o,l;for(o in i.validator.methods)l=s.data("rule"+o.charAt(0).toUpperCase()+o.substring(1).toLowerCase()),l===""&&(l=!0),this.normalizeAttributeRule(t,r,o,l);return t},staticRules:function(e){var t={},s=i.data(e.form,"validator");return s.settings.rules&&(t=i.validator.normalizeRule(s.settings.rules[e.name])||{}),t},normalizeRules:function(e,t){return i.each(e,function(s,r){if(r===!1){delete e[s];return}if(r.param||r.depends){var o=!0;switch(typeof r.depends){case"string":o=!!i(r.depends,t.form).length;break;case"function":o=r.depends.call(t,t);break}o?e[s]=r.param!==void 0?r.param:!0:(i.data(t.form,"validator").resetElements(i(t)),delete e[s])}}),i.each(e,function(s,r){e[s]=typeof r=="function"&&s!=="normalizer"?r(t):r}),i.each(["minlength","maxlength"],function(){e[this]&&(e[this]=Number(e[this]))}),i.each(["rangelength","range"],function(){var s;e[this]&&(Array.isArray(e[this])?e[this]=[Number(e[this][0]),Number(e[this][1])]:typeof e[this]=="string"&&(s=e[this].replace(/[\[\]]/g,"").split(/[\s,]+/),e[this]=[Number(s[0]),Number(s[1])]))}),i.validator.autoCreateRanges&&(e.min!=null&&e.max!=null&&(e.range=[e.min,e.max],delete e.min,delete e.max),e.minlength!=null&&e.maxlength!=null&&(e.rangelength=[e.minlength,e.maxlength],delete e.minlength,delete e.maxlength)),e},normalizeRule:function(e){if(typeof e=="string"){var t={};i.each(e.split(/\s/),function(){t[this]=!0}),e=t}return e},addMethod:function(e,t,s){i.validator.methods[e]=t,i.validator.messages[e]=s!==void 0?s:i.validator.messages[e],t.length<3&&i.validator.addClassRules(e,i.validator.normalizeRule(e))},methods:{required:function(e,t,s){if(!this.depend(s,t))return"dependency-mismatch";if(t.nodeName.toLowerCase()==="select"){var r=i(t).val();return r&&r.length>0}debugger;return this.checkable(t)?this.getLength(e,t)>0:e!=null&&e.length>0},email:function(e,t){return this.optional(t)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)},url:function(e,t){return this.optional(t)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})+(?::(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)},date:function(){var e=!1;return function(t,s){return e||(e=!0,this.settings.debug&&window.console&&console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")),this.optional(s)||!/Invalid|NaN/.test(new Date(t).toString())}}(),dateISO:function(e,t){return this.optional(t)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)},number:function(e,t){return this.optional(t)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)},digits:function(e,t){return this.optional(t)||/^\d+$/.test(e)},minlength:function(e,t,s){var r=Array.isArray(e)?e.length:this.getLength(e,t);return this.optional(t)||r>=s},maxlength:function(e,t,s){var r=Array.isArray(e)?e.length:this.getLength(e,t);return this.optional(t)||r<=s},rangelength:function(e,t,s){var r=Array.isArray(e)?e.length:this.getLength(e,t);return this.optional(t)||r>=s[0]&&r<=s[1]},min:function(e,t,s){return this.optional(t)||e>=s},max:function(e,t,s){return this.optional(t)||e<=s},range:function(e,t,s){return this.optional(t)||e>=s[0]&&e<=s[1]},step:function(e,t,s){var r=i(t).attr("type"),o="Step attribute on input type "+r+" is not supported.",l=["text","number","range"],d=new RegExp("\\b"+r+"\\b"),h=r&&!d.test(l.join()),f=function(C){var w=(""+C).match(/(?:\.(\d+))?$/);return w&&w[1]?w[1].length:0},m=function(C){return Math.round(C*Math.pow(10,y))},b=!0,y;if(h)throw new Error(o);return y=f(s),(f(e)>y||m(e)%m(s)!==0)&&(b=!1),this.optional(t)||b},equalTo:function(e,t,s){var r=i(s);return this.settings.onfocusout&&r.not(".validate-equalTo-blur").length&&r.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){i(t).valid()}),e===r.val()},remote:function(e,t,s,r){if(this.optional(t))return"dependency-mismatch";r=typeof r=="string"&&r||"remote";var o=this.previousValue(t,r),l,d,h;return this.settings.messages[t.name]||(this.settings.messages[t.name]={}),o.originalMessage=o.originalMessage||this.settings.messages[t.name][r],this.settings.messages[t.name][r]=o.message,s=typeof s=="string"&&{url:s}||s,h=i.param(i.extend({data:e},s.data)),o.old===h?o.valid:(o.old=h,l=this,this.startRequest(t),d={},d[t.name]=e,i.ajax(i.extend(!0,{mode:"abort",port:this.elementAjaxPort(t),dataType:"json",data:d,context:l.currentForm,success:function(f){var m=f===!0||f==="true",b,y,C;l.settings.messages[t.name][r]=o.originalMessage,m?(C=l.formSubmitted,l.toHide=l.errorsFor(t),l.formSubmitted=C,l.successList.push(t),l.invalid[t.name]=!1,l.showErrors()):(b={},y=f||l.defaultMessage(t,{method:r,parameters:e}),b[t.name]=o.message=y,l.invalid[t.name]=!0,l.showErrors(b)),o.valid=m,l.stopRequest(t,m)}},s)),"pending")}}});var a={},u;return i.ajaxPrefilter?i.ajaxPrefilter(function(e,t,s){var r=e.port;e.mode==="abort"&&(i.ajaxAbort(r),a[r]=s)}):(u=i.ajax,i.ajax=function(e){var t=("mode"in e?e:i.ajaxSettings).mode,s=("port"in e?e:i.ajaxSettings).port;return t==="abort"?(i.ajaxAbort(s),a[s]=u.apply(this,arguments),a[s]):u.apply(this,arguments)}),i.ajaxAbort=function(e){a[e]&&(a[e].abort(),delete a[e])},i});$("#form-3").validate({submitHandler:function(){},invalidHandler:function(){}});globalInputValidationNext.addRule("customRule",function(i){return i==="qwe123"},"Value isn't equal to 'qwe123'");let E=L(document.getElementById("form-1"),{submitHandler:function(){console.log("form is submited")},rules:{noExistProp:{range:[3,5],rqeuid:!0},numberInputName:{range:[3,5]},customRuleInput:{required:12,customRule:!0}},dsflsdf:12,messages:{defaultAttrInput:{required:"Required custom message for defaultAttrInput input"},customRuleInput:{required:"Required custom message"},noExistProp:{required:"Custom error message"}},enableDefaultValidationForm:!1,disableFormSubmitEvent:!0}),v=L(document.getElementById("form-2"),{submitHandler:function(){console.log("form is submited"),console.log(v==null?void 0:v.isValidForm())},invalidHandler:function(){console.log("form isn't submited"),console.log(v==null?void 0:v.isValidForm())},disableFormSubmitEvent:!0});E==null||E.removeRules(document.querySelector("#form-1 [name='defaultAttrInput']"),["minLength"]);E==null||E.addRules(document.querySelector("#form-1 [name='defaultInput']"),{rules:{minLength:4,required12:14},messages:{minLength:"custom minLenght message from addRules",dsdf:"12"}});L(document.getElementById("form-4"),{submitHandler:function(){console.log("form is submited"),console.log(v==null?void 0:v.isValidForm())},invalidHandler:function(){console.log("form isn't submited"),console.log(v==null?void 0:v.isValidForm())},rules:{requiredInput:{url:!0}}})});export default Z();