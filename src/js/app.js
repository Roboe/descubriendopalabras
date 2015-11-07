(function(global) {
  'use strict';

  /* Utils */
  function fetchJSON(url) {
    return fetch(url)
      .then(function(response) {
        return response.json();
      });
  }

  function delArrayItem(array, item) {
    var arr = array.slice();
    var index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    }

    return arr;
  }

  function arrayndomize(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /* Constants */
  var $ = document.querySelector.bind(document);
  /* var log = console.log.bind(console); */
  var COLORS = ['blue', 'orange', 'green', 'dark', 'purple']; // CSS <html> classnames
  var DB_INDEX = 'db.json';
  var DB_PATH = 'db';

  var DB_INDEX_CACHED;

  var html = $('html');
  var wordElement = $('#word');
  var meaningElement = $('#meaning');
  var titleElement = $('#title');

  /* Variables */
  var hashWord;
  var choosenWord;

  /* Functions */
  function getHashWord() {
    return global.location.hash.substr(1); // Returns empty string if not available
  }

  function showWord(word) {
    console.log('Word:', word);
    fetchJSON(DB_PATH + '/' + word + '.json')
      .then(function(json) {
        console.log('JSON:', json);
        global.location.hash = json.id; // Trigger hashchange event, but its effect is ignored on the handler.
        global.document.title = titleElement.textContent + ': ' + json.dictionary_entry.word;

        if (!!json.bg_color && COLORS.indexOf(json.bg_color)) {
          html.className = json.bg_color;
        } else {
          var colors = delArrayItem(COLORS, html.className);
          console.log('colors', colors);

          html.className = arrayndomize(colors);
        }

        return json.dictionary_entry;
      })
      .then(function(entry) {
        console.log('Entry:', entry);
        wordElement.textContent = entry.word + '.';
        meaningElement.textContent = entry.definition;
      });

  }

  function onLoad() {
    hashWord = getHashWord();
    if (!choosenWord || hashWord !== choosenWord) {
      fetchJSON(DB_INDEX)
        .then(function(json) {
          if (json.words) {
            DB_INDEX_CACHED = json.words;
            return choosenWord = (hashWord && json.words.indexOf(hashWord) >= 0)
              ? hashWord
              : arrayndomize(json.words);
          }
        })
        .then(showWord);
    }
  }

  function generateNewWord() { // WIP
    var words = delArrayItem(DB_INDEX_CACHED, choosenWord);
    choosenWord = arrayndomize(words);
    showWord(choosenWord);
  }

  global.addEventListener('DOMContentLoaded', onLoad, false);
  global.addEventListener('hashchange', onLoad, false);
  $('#button-generate').addEventListener('click', generateNewWord, false);
}(this));
