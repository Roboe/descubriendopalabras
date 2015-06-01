(function (global) {
	'use strict';

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

	/* Constants */
	var $ = document.querySelector.bind(document),
		COLORS = ["blue", "orange", "green", "dark", "purple"], // CSS <html> classnames
		DB = "js/db.json",

	/* Variables */
		html = $("html"),
		word = $("#word"),
		meaning = $("#meaning");

	getJSON(DB, function (json) {
		if (json.words) {
			var choosenWord = arrayndomize(json.words);
			word.textContent = choosenWord.word + ".";
			meaning.textContent = choosenWord.meaning;
			html.className = (!!choosenWord.color) ? choosenWord.color : arrayndomize(COLORS);
		}
	});

}(this));
