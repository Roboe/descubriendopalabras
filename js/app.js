(function (global, undefined) {
	//'use strict';

	function ajax(post_get, path, mimetype, send, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open(post_get, path, true);
		xhr.overrideMimeType(mimetype);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
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

	function r(array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	var $ = document.querySelector.bind(document);
	var colors = ["blue", "orange", "green", "dark", "purple"]; // CSS <html> classnames
	var html = $("html");
	var word = $("#word");
	var meaning = $("#meaning");

	getJSON("js/db.json", function (json) {
		//console.log(json);
		if (json.words) {
			var w = r(json.words);
			console.log(w);
			word.textContent = w.word;
			meaning.textContent = w.meaning;
			html.className = (!!w.color) ? w.color : r(colors);
		}
	});

}(this));
