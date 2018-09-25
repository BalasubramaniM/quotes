/**
 * Window ONLOAD.
 */
window.addEventListener("load", async e => {
	await fetchQuotes();

	if ("serviceWorker" in navigator) {
		try {
			navigator.serviceWorker.register("service-worker.js");
			console.log("Service Worker registered.");
		} catch (error) {
			console.log("Service Worker failed");
		}
	}
});
