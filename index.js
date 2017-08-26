'use strict';

module.exports = {
  build: build,
  combos: combos,
  numCombos: numCombos
}

/**
 * Builds sentence from array
 */
function build(sentence, notSentence, shouldOutputArray) {
	let arr = [];

  // Build sentence randomly
	for (let i = 0; i < sentence.length; i++) {
		let word = sentence[i][Math.floor(Math.random() * sentence[i].length)];
		if (word !== "") {
			arr.push(word);
		}
	}

  var output = arr.join(' ');

  if (notSentence && Array.isArray(notSentence)) {

    // Make sure there are possible combinations
    if (arraysEqual(getCombos(sentence), notSentence)) {
      throw new Error('No possible sentences');
    }

    // Keep generating new sentence until a qualifying one is found
    for (let i = 0; i < notSentence.length; i++) {
      if (notSentence[i] === output) {
        return build(sentence, notSentence, shouldOutputArray)
      }
    }
  }

  return shouldOutputArray && typeof(shouldOutputArray) === 'boolean'
    ? arr
    : output;
}

/**
 * Returns all possible combinations
 */
function combos(sentence, notSentence, index) {
  let combinations = getCombos(sentence);

  if (notSentence && Array.isArray(notSentence)) {
    for (let i = 0; i < notSentence.length; i++) {
      let index = combinations.indexOf(notSentence[i]);
      if (index !== -1) {
        combinations.splice(index, 1);
      }
    }
  }

  // Return specific combination if index is given
  return index > -1 && index < combinations.length
    ? combinations[index]
    : combinations;
}

/**
 * Returns number of possible combinations
 */
function numCombos(sentence, notSentence) {
  return combos(sentence, notSentence).length;
}


/* =============================================================================
Helper Functions
============================================================================= */

/**
 * Get all combinations
 */
function getCombos(arr) {
  if (arr.length == 1) {
    return arr[0];
  } else {
    let result = [];
    let allCasesOfRest = getCombos(arr.slice(1));

    for (let i = 0; i < allCasesOfRest.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        if (!arr[0][j]) {
          result.push(allCasesOfRest[i])
        } else {
          result.push(arr[0][j] + ' ' + allCasesOfRest[i]);
        }
      }
    }
    return result;
  }
}

/**
 * Returns true if contents of both arrays are equal (order doesn't matter)
 */
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  arr1.sort();
  arr2.sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
