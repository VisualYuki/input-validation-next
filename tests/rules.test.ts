import {
	digits,
	email,
	getLength,
	isOptional,
	max,
	maxLength,
	min,
	minLength,
	range,
	required,
	url,
	date,
	number,
} from "@/rules";
import {describe, expect, test} from "vitest";
import {getFileContent} from "./utils";

document.body.innerHTML = getFileContent("./rules.html");

describe("", () => {
	let fakeInputNode = document.createElement("input");
	//let multipleSelect = document.createElement("select");

	//multipleSelect.setAttribute("multiple", "true");

	test("required", () => {
		expect(required("", {}, document.getElementById("disabled-select") as HTMLSelectElement)).toBe(false);
		expect(required("", {}, document.getElementById("select") as HTMLSelectElement)).toBe(true);
		expect(required("", {}, document.getElementById("unchecked-checkbox") as HTMLSelectElement)).toBe(false);
		expect(required("", {}, document.getElementById("checked-checkbox") as HTMLSelectElement)).toBe(true);

		expect(required("", {}, document.createElement("div"))).toBe(false);
		expect(required("1212", {}, document.createElement("div"))).toBe(true);

		expect(required("", {}, document.querySelector("[name='unchecked-radio-input']") as HTMLInputElement)).toBe(
			false
		);
		expect(required("", {}, document.querySelector("[name='checked-radio-input']") as HTMLInputElement)).toBe(true);
	});

	test("getLength", () => {
		expect(getLength([1, 2, 3], fakeInputNode)).toBe(3);
		expect(getLength("123", fakeInputNode)).toBe(3);

		expect(getLength("123", document.getElementById("multiple-select") as HTMLSelectElement)).toBe(2);
	});

	test("isOptional", () => {
		expect(isOptional("", {}, fakeInputNode)).toBe(true);
		expect(isOptional("123", {}, fakeInputNode)).toBe(false);
	});

	test("minLength", () => {
		expect(minLength("", 2, fakeInputNode)).toBe(true);
		expect(minLength("1", 2, fakeInputNode)).toBe(false);
		expect(minLength("1212", 2, fakeInputNode)).toBe(true);
	});

	test("maxLength", () => {
		expect(maxLength("", 2, fakeInputNode)).toBe(true);
		expect(maxLength("1", 2, fakeInputNode)).toBe(true);
		expect(maxLength("1212", 2, fakeInputNode)).toBe(false);
	});

	test("email", () => {
		expect(email("", undefined, fakeInputNode)).toBe(true);
		expect(email("moshkin.deinis.007@yandex.com", undefined, fakeInputNode)).toBe(true);
		expect(email("random text", undefined, fakeInputNode)).toBe(false);
		expect(email("moshkin.denis.com", undefined, fakeInputNode)).toBe(false);
		expect(email("moshkin.deinis.007@yandex.com", undefined, fakeInputNode)).toBe(true);
	});

	test("url", () => {
		expect(url("", undefined, fakeInputNode)).toBe(true);
		expect(url(12, undefined, fakeInputNode)).toBe(false);
		expect(url("http:/goggle.com", undefined, fakeInputNode)).toBe(false);
		expect(url("random text", undefined, fakeInputNode)).toBe(false);
		expect(url("https://mail.google.com", undefined, fakeInputNode)).toBe(true);
	});

	test("digits", () => {
		expect(digits("", undefined, fakeInputNode)).toBe(true);
		expect(digits("12", undefined, fakeInputNode)).toBe(true);
		expect(digits(12, undefined, fakeInputNode)).toBe(true);
		expect(digits(" 12", undefined, fakeInputNode)).toBe(false);
	});

	test("min", () => {
		expect(min("", undefined, fakeInputNode)).toBe(true);
		expect(min(" 12", 10, fakeInputNode)).toBe(true);
		expect(min(12, 10, fakeInputNode)).toBe(true);
		expect(min(5, 12, fakeInputNode)).toBe(false);
	});

	test("max", () => {
		expect(max("", undefined, fakeInputNode)).toBe(true);
		expect(max(" 12 ", 10, fakeInputNode)).toBe(false);
		expect(max(" 6 ", 10, fakeInputNode)).toBe(true);
		expect(max(5, 12, fakeInputNode)).toBe(true);
	});

	test("range", () => {
		expect(range("", [0, 10], fakeInputNode)).toBe(true);
		expect(range(" 11 ", [0, 10], fakeInputNode)).toBe(false);
		expect(range(" 5 ", [0, 10], fakeInputNode)).toBe(true);
		expect(range(5, [0, 10], fakeInputNode)).toBe(true);
	});

	test("number", () => {
		expect(number("", undefined, fakeInputNode)).toBe(true);
		expect(number("12.4", undefined, fakeInputNode)).toBe(true);
		expect(number("12..4/", undefined, fakeInputNode)).toBe(false);
		expect(number(12.4, undefined, fakeInputNode)).toBe(true);
		expect(number(5, undefined, fakeInputNode)).toBe(true);
		expect(number("-1.1", undefined, fakeInputNode)).toBe(true);
	});

	// test("date", () => {
	// 	expect(date("", undefined, fakeInputNode)).toBe(true);
	// 	expect(date("2020-02-20T10:00:00Z", undefined, fakeInputNode)).toBe(true);
	// 	expect(date("12.12.2012", undefined, fakeInputNode)).toBe(true);

	// 	//expect(date(5, undefined, fakeInputNode)).toBe(false);
	// });
});
