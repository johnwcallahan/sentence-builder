var sentenceBuilder = require('./index.js');

var sentence = [
	['Hello', 'Hi', 'Good morning', 'Good afternoon', 'Good evening'],
	['World!', 'Earth!', 'Universe!', ''],
	['How are you?', 'How\'s it going?', 'What\'s up?']
];


console.log(sentenceBuilder.build(sentence, ['Hello World! How are you?'], true));
