(function (global) {
	'use strict';

	/* Utils */
	function ajax(post_get, path, mimetype, send, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open(post_get, path, true);
		xhr.overrideMimeType(mimetype);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					callback(null, xhr.responseText);
				} else {
					callback(xhr.status);
				}
			}
		};
		xhr.send(send);
	}

	function getJSON(path, callback) {
		ajax("GET", path, "text/txt", null, function (error, response) {
			if (!error) {
				var db = JSON.parse(response);
				callback(db);
			} else {
				console.error("Request: " + error);
			}

		});
	}

	function arrayndomize(array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	function getHashWord() {
		return global.location.hash.substr(1); // Return empty string if not available
	}

	/* Constants */
	var $ = document.querySelector.bind(document),
		log = console.log.bind(console),
		COLORS = ["blue", "orange", "green", "dark", "purple"], // CSS <html> classnames
		DB = "js/db.json",

	/* Variables */
		html = $("html"),
		word_element = $("#word"),
		meaning_element = $("#meaning"),
		hashWord,
		choosenWord;

	/* Functions */
	function showWord(word) {
		word_element.textContent = word.word + ".";
		meaning_element.textContent = word.meaning;
		html.className = (!!word.color && COLORS.indexOf(word.color)) ? word.color : arrayndomize(COLORS.filter(function (color) {
			return color != html.className;
		}));
	}

	function onLoad() {
		hashWord = getHashWord();
		getJSON(DB, function (json) {
			if (json.words) {
				if (hashWord) {
					choosenWord = json.words.filter(function(word) {
						return word.meta.slug === hashWord;
					})[0];
				}
				choosenWord = choosenWord || arrayndomize(json.words);
				showWord(choosenWord);
			}
		});
	}

	global.addEventListener("DOMContentLoaded", onLoad, false);
	global.addEventListener("hashchange", onLoad, false);
}(this));
