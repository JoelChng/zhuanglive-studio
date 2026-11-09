/* Applies STUDIO config to the page: CSS variables + [data-studio] text/attrs. */
(function () {
	"use strict";
	var S = window.STUDIO || {};
	var brand = S.brand || {};
	var root = document.documentElement;
	if (brand.primary) root.style.setProperty("--studio-primary", brand.primary);
	if (brand.bg) root.style.setProperty("--studio-bg", brand.bg);
	if (brand.bgDeep) root.style.setProperty("--studio-bg-deep", brand.bgDeep);
	if (brand.accent) root.style.setProperty("--studio-accent", brand.accent);
	if (brand.danger) root.style.setProperty("--studio-danger", brand.danger);
	if (brand.text) root.style.setProperty("--studio-text", brand.text);

	function fill(el) {
		var key = el.getAttribute("data-studio");
		if (!key) return;
		var val = S[key];
		if (val == null && key.indexOf(".") !== -1) {
			var parts = key.split(".");
			val = S;
			for (var i = 0; i < parts.length; i++) {
				val = val ? val[parts[i]] : null;
			}
		}
		if (val == null) return;
		var as = el.getAttribute("data-studio-as") || "text";
		if (as === "html") el.innerHTML = String(val);
		else if (as === "src") el.setAttribute("src", String(val));
		else if (as === "href") el.setAttribute("href", String(val));
		else if (as === "content") el.setAttribute("content", String(val));
		else el.textContent = String(val);
	}
	var nodes = document.querySelectorAll("[data-studio]");
	for (var i = 0; i < nodes.length; i++) fill(nodes[i]);

	if (S.showName) {
		var titled = document.querySelectorAll("[data-studio-title]");
		for (var j = 0; j < titled.length; j++) {
			var tpl = titled[j].getAttribute("data-studio-title") || "{showName}";
			titled[j].textContent = tpl.replace(/\{showName\}/g, S.showName).replace(/\{studioLabel\}/g, S.studioLabel || "Studio");
		}
	}
})();
