function init(func) {
	document.addEventListener("alpine:init", func);
}

init(() => {
	Alpine.magic("select", () => {
		return (className, el = null) => {
			if (el !== null) {
				return el.querySelector(className);
			} else {
				return document.querySelector(className);
			}
		};
	});

	Alpine.magic("selectAll", () => {
		return (className, el = null) => {
			if (el !== null) {
				return el.querySelectorAll(className);
			} else {
				return document.querySelectorAll(className);
			}
		};
	});
});
