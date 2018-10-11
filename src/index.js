/**
 * Document Onload
 */
async function fetchQuotes() {
	let arrayOfQuoteObj = [];
	let index = -1;
	// Colours to be used throughout the app.
	const colours = [
		"is-light",
		"is-dark",
		"is-danger",
		"is-warning",
		"is-success",
		"is-info",
		"is-primary"
	];

	const res = await fetch(
		"https://gist.githubusercontent.com/balasubramanim/95406cbd0e17d63085de11a1f13e06b3/raw"
	);
	const quotes = await res.json();

	/**
	 * Get quote from the response and set Quote.
	 * Index - to calculate the position of the Quote being displayed in the array.
	 */
	const getQuote = () => {
		let randomColor = getRandomColour();
		let randomQuote = getRandomQuote(quotes.quotes);

		let quoteObj = {
			quote: randomQuote,
			colour: randomColor
		};

		if (index === -1) {
			arrayOfQuoteObj.push(quoteObj);
		} else {
			arrayOfQuoteObj.splice(index + 1, 0, quoteObj);
		}
		index++;
		setQuote(quoteObj);
	};

	/**
	 * Bind keyboard and mouse actions.
	 */
	const bindActions = () => {
		let nextQuoteEl = document.getElementById("next-quote");
		let prevQuoteEl = document.getElementById("prev-quote");
		prevQuoteEl.addEventListener("click", prevQuote);
		nextQuoteEl.addEventListener("click", nextQuote);
		Mousetrap.bind("space", function() {
			getQuote();
		});

		Mousetrap.bind("left", function() {
			prevQuote();
		});

		Mousetrap.bind("right", function() {
			nextQuote();
		});
	};

	/**
	 * Generate random quote from array of quotes.
	 * @param  {Array}  quotes 		[Array of quotes.]
	 * @return {Object} randomQuote [Random quote that is being returned.]
	 */
	const getRandomQuote = quotes => {
		let quotesArr = [...quotes];
		return quotesArr[Math.floor(quotesArr.length * Math.random())];
	};

	/**
	 * Generate random colour from set of colours.
	 * @param  {Array} colours [Array of colours.]
	 * @return {String}        [Single colour.]
	 */
	const getRandomColour = () => {
		return colours[Math.floor(colours.length * Math.random())];
	};

	/**
	 * Set quote and colour each time the function is called.
	 */
	const setQuote = arrayOfQuoteObj => {
		let quote = arrayOfQuoteObj.quote;
		let colour = arrayOfQuoteObj.colour;
		let url = quote.url;

		let className = `hero ${colour} is-fullheight`;

		document.getElementById("text").innerHTML = quote.quote;
		document.getElementById("author").innerHTML = quote.author;
		document.getElementById("section").setAttribute("class", className);

		// Showing icons back.
		let icons = document.getElementsByTagName("i");
		for (var i = icons.length - 1; i >= 0; i--) {
			icons[i].classList.remove("hide");
		}

		/**
		 * Temporary code. Will be handled later.
		 * Uncomment only when you handle routing. Else page will break on refresh.
		 */
		// history.pushState("", "", url);
	};

	/**
	 * Navigate to previous Quote.
	 * Navigate only when an index position (array) size is greater than one.
	 */
	const prevQuote = () => {
		if (index > 0) {
			index--;
			setQuote(arrayOfQuoteObj[index]);
		}
	};

	/**
	 * Navigate to next Quote.
	 * Stop navigating when you reached the last position of an index.
	 */
	const nextQuote = () => {
		if (arrayOfQuoteObj.length - 1 !== index) {
			index++;
			setQuote(arrayOfQuoteObj[index]);
		}
	};

	// Calling getQuote to initialize quote for the first time.
	// Called only once.
	getQuote();

	// Event binding during initial load.
	bindActions();
}
