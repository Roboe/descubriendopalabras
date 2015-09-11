(function(global) {
  'use strict';

  /* Utils */
  function ajax(method, path, mimetype, send, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, path, true);
    xhr.overrideMimeType(mimetype);
    xhr.onreadystatechange = function() {
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
    ajax('GET', path, 'text/txt', null, function(error, response) {
      if (!error) {
        var db = JSON.parse(response);
        callback(db);
      } else {
        console.error('Request: ' + error);
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
  var $ = document.querySelector.bind(document);
  var log = console.log.bind(console);
  var COLORS = ['blue', 'orange', 'green', 'dark', 'purple']; // CSS <html> classnames
  var DB = 'js/db.json';

  /* Variables */
  var html = $('html');
  var wordElement = $('#word');
  var meaningElement = $('#meaning');
  var titleElement = $('#title');
  var hashWord;
  var choosenWord;

  /* Functions */
  function showWord(word) {
    global.location.hash = word.meta.slug; // Trigger hashchange event, but its effect is ignored on the handler.
    global.document.title = titleElement.textContent + ': ' + word.word;
    wordElement.textContent = word.word + '.';
    meaningElement.textContent = word.meaning;
    html.className = (!!word.color && COLORS.indexOf(word.color)) ? word.color : arrayndomize(COLORS.filter(function(color) {
      return color !== html.className;
    }));
  }

  function onLoad() {
    hashWord = getHashWord();
    if (!choosenWord || hashWord !== choosenWord.meta.slug) {
      getJSON(DB, function(json) {
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
  }

  function generateNewWord() {
    getJSON(DB, function(json) {
      if (json.words) {
        choosenWord = arrayndomize(json.words.filter(function(word) {
          return word !== choosenWord;
        }));

        showWord(choosenWord);
      }
    });
  }

  global.addEventListener('DOMContentLoaded', onLoad, false);
  global.addEventListener('hashchange', onLoad, false);
  $('#button-generate').addEventListener('click', generateNewWord, false);
}(this));
