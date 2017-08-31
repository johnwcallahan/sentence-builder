## Sentence Builder

Build a sentence with variability

```javascript
let sentence = [
  ['Hello', 'Hi'],
  ['World!', 'Earth!']
];

sentenceBuilder.build(sentence);
// Hi World!

sentenceBuilder.combos(sentence);
// ['Hello World!', 'Hi World!', 'Hello Earth!', 'Hi Earth!']
```

## Installation
1. Install the package: 
```
npm install --save sentence-builder
```

2. Require it in your project: 
```javascript
const sentenceBuilder = require('sentence-builder');
```

## Usage

### build()
Build a sentence:
```javascript
let sentence = [
  ['Hello', 'Hi'],
  ['World!', 'Earth!']
];

sentenceBuilder.build(sentence);
// Hi World!
```

All methods take a second parameter, `exclude`, which can be given as a single string or an array of strings.
```javascript
sentenceBuilder.build(sentence, 'Hi World!');
// Hi Earth!
```

Pass `true` as a third parameter to get output as an array.
```javascript
sentenceBuilder.build(sentence, null, true);
// ['Hi', 'World!']
```

### combos()
Effectively returns the Cartesian product.
```javascript
sentenceBuilder.combos(sentence);
// ['Hello World!', 'Hi World!', 'Hello Earth!', 'Hi Earth!']
```

Also takes the `excludes` parameter.
```javascript
sentenceBuilder.combos(sentence, ['Hi World!', 'Hello Earth!']);
// ['Hello World!', 'Hi Earth!']
```

Takes a third parameter, `limit`, which limits the results.
```javascript
sentenceBuilder.combos(sentence, null, 3);
// ['Hello World!', 'Hi World!', 'Hello Earth!']
```

### numCombos()
Returns the number of possible combinations.
```javascript
sentenceBuilder.numCombos(sentence);
// 4

sentenceBuilder.numCombos(sentence, 'Hi World!');
// 3
```

