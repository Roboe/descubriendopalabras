var fs = require('fs');
var db = require('./src/js/db.json');
var DEST = './db/';

db.words.forEach(function(word) {
  //console.log(word);
  var newWord = {
    id: word.meta.slug,
    dictionary_entry: {
      word: word.word,
      pronunciation_key: '',
      meaning_order: 0,
      grammatical_category: '',
      mark: '',
      definition: word.meaning,
      referenced_definition: '',
      usage_notes: '',
    },
    bg_color: word.color,
    meta: {
      source_name: word.meta.source,
      source_version: word.meta.version,
      added_on: word.meta.date,
    },
  };
  fs.writeFile(DEST + newWord.id + '.json', JSON.stringify(newWord, null, 2), function(err) {
    if (err) throw err;
    console.log('It\'s saved!');
  });
});
