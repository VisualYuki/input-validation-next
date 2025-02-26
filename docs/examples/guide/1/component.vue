<template>
	<div class="container d-flex align-items-center justify-content-center">
		<!-- form -->
		<form id="myform">
			<!-- input wrap -->
			<div class="mb-3">
				<label class="form-label">inputName1</label>
				<input class="form-control" type="text" name="inputName1" required min-length="4" />
			</div>
			<!-- input wrap -->
			<div class="mb-3">
				<label class="form-label">inputName2</label>
				<input type="text" class="form-control" name="inputName2" />
			</div>
			<!-- submit button -->
			<button type="submit" class="btn btn-primary mx-auto d-block">submit form</button>
		</form>
	</div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {InputValidationNext} from "../../../../src";

onMounted(() => {
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
});
</script>

<style lang="scss" scoped></style>
