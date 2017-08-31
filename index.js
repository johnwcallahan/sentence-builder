'use strict';

module.exports = {
  build: build,
  combos: combos,
  numCombos: numCombos
}

/**
 * Builds sentence from array
 */
function build(sentence, exclude, shouldOutputArray) {
  // Check input
  if (!Array.isArray(sentence)) {
    throw new TypeError;
  }
  if (sentence.length < 2) {
    return sentence;
  }

  let arr = [];

  // Build sentence randomly
	for (let i = 0; i < sentence.length; i++) {
    let word;
    word = typeof(sentence[i]) === 'string'
      ? sentence[i]
      : sentence[i][Math.floor(Math.random() * sentence[i].length)];
    if (word !== "") {
      arr.push(word);
    }
  }

  var output = arr.join(' ');

  // If exclude is given and is a single string, convert it to array
  if (exclude && typeof(exclude) == 'string') {
    exclude = [exclude];
  }

  // If exclude parameter is given and valid, check against output
  if (exclude && Array.isArray(exclude)) {
    if (typeof(exclude) == 'string') {
      exclude = [exclude];
    }
    // Make sure there are possible combinations
    if (arraysEqual(getCombos(sentence), exclude)) {
      throw new Error('No possible sentences');
    }

    // Keep generating new sentence until a qualifying one is found
    for (let i = 0; i < exclude.length; i++) {
      if (exclude[i] === output) {
        return build(sentence, exclude, shouldOutputArray)
      }
    }
  }

  return shouldOutputArray && typeof(shouldOutputArray) === 'boolean'
    ? arr
    : output;
}

/**
 * Get combos, check against exclude and limit
 */
function combos(sentence, exclude, limit) {
  
  // Check input
  if (!Array.isArray(sentence)) {
    throw new TypeError;
  }
  if (sentence.length < 2) {
    return sentence;
  }

  // Wrap single strings in array
  for (let i = 0; i < sentence.length; i++) {
    if (typeof(sentence[i]) == 'string') {
      sentence[i] = [sentence[i]];
    }
  }

  // Get all combinations
  let combinations = getCombos(sentence);

  // If exclude is given and is a single string, convert it to array
  if (exclude && typeof(exclude) == 'string') {
    exclude = [exclude];
  }

  // If exclude parameter is given and valid, remove those from combos
  if (exclude && Array.isArray(exclude)) {
    for (let i = 0; i < exclude.length; i++) {
      let index = combinations.indexOf(exclude[i]);
      if (index !== -1) {
        combinations.splice(index, 1);
      }
    }
  }

  // Return specific combination if index is given
  return limit >= 1 && limit <= combinations.length
    ? combinations.slice(0, limit)
    : combinations;
}

/**
 * Returns number of possible combinations
 */
function numCombos(sentence, exclude) {
  return combos(sentence, exclude).length;
}

/* =============================================================================
Helper Functions
============================================================================= */

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

/**
 * Gets Cartesian product
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
