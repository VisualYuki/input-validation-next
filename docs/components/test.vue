<template>
	<div v-html="props.html"></div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {InputValidationNext} from "../../src/index";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {readFileSync} from "fs";

const props = defineProps({
	html: String,
	js: String,
});
debugger;
onMounted(() => {
	debugger;
	eval(props.js);
});
</script>

<style lang="scss" scoped></style>
