var sentenceBuilder = require('./index.js');

var sentence = [
	['Hello', 'Hi', 'Good morning', 'Good afternoon', 'Good evening'],
	['World!', 'Earth!', 'Universe!', ''],
	['How are you?', 'How\'s it going?', 'What\'s up?']
];

console.log(sentenceBuilder.build(sentence));
console.log(sentenceBuilder.build(sentence, 'Hello World! How are you?', true));
console.log(sentenceBuilder.combos(sentence, 'Hello World! How are you?'));
console.log(sentenceBuilder.combos(sentence, null, 3));
console.log(sentenceBuilder.numCombos(sentence));
console.log(sentenceBuilder.numCombos(sentence, ['Hi Earth! What\'s up?', 'Hi Earth! How are you?']));