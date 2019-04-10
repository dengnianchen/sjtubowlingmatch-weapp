let style = {
	brandColor: "#FF0077",
	controlColor: "#FF5777",
	mainHeadingColor: "#333333",
	subHeadingColor: "#666666",
	darkPromptColor: "#999999",
	backgroundColor: "#EFEFEF",
	successColor: "#28a745",
	successBackgroundColor: "#BFFFC9",
	warnColor: "#FFC107",
	warnBackgroundColor: "#FFF5D9",
	dangerColor: "#FF6058",
	dangerBackgroundColor: "#FFE6E6",
	disableColor: "#999999",
	color: {
		num1: "#3ACCE1",
		num2: "#3497FD",
		num3: "#5773FF",
		num4: "#665EFF",
		darkGray: "#2A2E43",
		text: "#454F63",
		desc: "#959DAD",
		subDesc: "#999999",
		splitLine: "#F4F4F6",
		active: "#FF9057",
		inactive: "#78849E"
	},
	fontSize: {
		text: "28rpx",
		title: "50rpx",
		subTitle: "34rpx",
		desc: "24rpx",
		subDesc: "22rpx",
	}
};
style.button = {
	large: `
		width: 654rpx;
		height: 104rpx;
		line-height: 104rpx;
		border: none;
		border-radius: 27rpx;
		font-size: ${style.fontSize.text};
		`,
	primary: `
		background: #3ACCE1;
		color: #FFF;
		`,
	secondary: `
		background: #444F63;
		color: #FFF;
		`,
	beauty: `
		background: #FF4F9A;
		color: #FFF;
		`,
	disabled: `
		background: #D2D2D2;
		color: #FFF;
		`,
};

module.exports = style;