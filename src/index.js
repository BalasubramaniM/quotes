/**
 * Document Onload
 */
(function() {
	let quotes = null; // Hold quotes, received from API.
	let quotesURL =
		"https://gist.githubusercontent.com/balasubramanim/95406cbd0e17d63085de11a1f13e06b3/raw"; // Quotes URL.

	// Colours to be used throughout the app.
	const colours = [
		"#00d1b2",
		"#209cee",
		"#3273dc",
		"#23d160",
		"#ffdd57",
		"#ff3860"
	];

	/**
	 * Function to create AJAX request.
	 * @param  {String}   url      [Url to be called.]
	 * @param  {String}   method   [Method to be invoked to request.]
	 * @param  {Function} callback [Callback function to invoke after the request.]
	 * @return {[type]}            [Response of the request.]
	 */
	const makeAjax = (url, method, callback) => {
		let xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
			if (this.status === 404) {
				callback({ error: "URL not found!" });
			}
			if (this.readyState === 4 && this.status === 200) {
				callback(null, this.response);
			}
		};

		xhttp.open(method, url, true);
		xhttp.send();
	};

	/**
	 * Generate random quote from array of quotes.
	 * @param  {Array}  quotes 		[Array of quotes.]
	 * @return {Object} randomQuote [Random quote that is being returned.]
	 */
	const getRandomQuote = quotes => {
		let quotesArr = [...quotes];

		let randomQuote =
			quotesArr[Math.floor(quotesArr.length * Math.random())];
		return randomQuote;
	};

	const getQuotes = (err, quotesArr) => {
		if (!err) {
			if (typeof quotesArr === "string") {
				quotesArr = JSON.parse(quotesArr);
			}

			let quote = getRandomQuote(quotesArr.quotes);

			console.log(quote);
		} else {
			console.log(err);
		}
	};

	makeAjax(quotesURL, "GET", getQuotes);
})();
