import type {Messages} from "@/common";

export const messages_zh: Messages = {
	required: "这是必填字段",
	maxLength: "最多可以输入 {0} 个字符",
	minLength: "最少要输入 {0} 个字符",
	email: "请输入有效的电子邮件地址",
	url: "请输入有效的网址",
	number: "请输入有效的数字",
	digits: "只能输入数字",
	equalTo: "你的输入不相同",
	range: "请输入范围在 {0} 到 {1} 之间的数值",
	max: "请输入不大于 {0} 的数值",
	min: "请输入不小于 {0} 的数值",
};

window.messages_zh = messages_zh;
