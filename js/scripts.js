//LOGIC A
//USER INPUT LOGIC
$(document).ready(function() {
  $("#form1").submit(function(event) {
    event.preventDefault();
    let regex = /^[a-zA-Z][a-zA-Z\s]*$/;      //regex for uppercase and lowercase letters, no numbers, punctuation, or symbols
    let outputSentence = (makeSentencePigLatin(getInputSentence()));
    if (regex.test(getInputSentence()) === true && getInputSentence().length < 300) {
      $("#output").text(outputSentence);
    } else {
      $("#output").text("Please enter a string with no numbers, symbols, or punctuation. 300 character limit.")
    }
  });
});

//this function gets the input sentence from the field
function getInputSentence () {
  let inputSentence = $("#input").val();
  return inputSentence;
}

//BUSINESS LOGIC
//this function takes a sentence array and applies the makeWordPigLatin function to each word, then joins it back and returns a string
function makeSentencePigLatin (inputSentence) {
  let inputSentenceArray = inputSentence.split(" ")     //splits the input sentence string into an array
  let outputSentenceArray = [];
  inputSentenceArray.forEach(function (word) {
    outputSentenceArray.push(makeWordPigLatin(word, findCutPosition(word)));    //for each word in the array, make that word pig latin
  });
  return outputSentenceArray.join(" ")      //join the array back into a string to be displayed
}

//this function finds where the first vowel occurs in an input word, and sets that to the cut position for later manipulation
function findCutPosition (inputWord) {
  let cutPosition;
  for (let i = 0; i < inputWord.length; i++) {    
    if (checkForVowels(inputWord.charAt(i)) === true) {     //checks if each letter is a vowel
      cutPosition = i;      //when it finds a vowel, add that index value as the cut position
      if (inputWord.charAt(cutPosition).toLowerCase() === "u" && inputWord.charAt(cutPosition - 1).toLowerCase() === "q") {    //if the vowel is u, checks if it has a q before it, if so it adds 1 to the cut position so that both the q and u will be cut
        cutPosition ++;
      }
      return cutPosition;
    }
  }
}

//this function checks whether an input character is a vowel
function checkForVowels (inputCharacter) {
  const vowels = ["a", "e", "i", "o", "u",]
  let isVowel;
  for (let v = 0; v < vowels.length; v++) {    //checks each vowel against the input character, returns true or false, since this is called in another for loop, the index variable cant be the same
    if (vowels[v] === inputCharacter.toLowerCase()) {     //compares against the toLowerCase of the input character to prevent any issues with capitalization
      isVowel = true;
      break;
    }
  }
  return isVowel;
}

//this function takes an input word and cut position, and outputs the word in pig latin
function makeWordPigLatin (inputWord, cutPosition) {
  let outputWord;
  if (cutPosition === 0) {      //if the cut position is zero, the first letter is a vowel
    outputWord = inputWord + "way";
  } else {      //otherwise the first letter or letters are consonants and are chopped off and put on the end
    outputWord = inputWord.slice(cutPosition) + inputWord.slice(0, cutPosition) + "ay";    
  }
  return outputWord;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//LOGIC B - As dry as possible
//USER INPUT LOGIC
$(document).ready(function() {
  $("#form2").submit(function(event) {
    event.preventDefault();
    if (/^[a-zA-Z][a-zA-Z\s]*$/.test($("#input2").val()) === true && $("#input2").val().length < 300) {
      $("#output").text($("#input2").val().split(" ").map(word => makeWordPigLatinB(word)).join(" "));
    } else {
      $("#output").text("Please enter a string with no numbers, symbols, or punctuation. 300 character limit.")
    }
  });
});

//BUSINESS LOGIC
function makeWordPigLatinB (inputWord) {  
  const vowels = ["a", "e", "i", "o", 'u'];
  for (let i = 0; i < inputWord.length; i++) {
    if (vowels.indexOf(inputWord.charAt(i).toLowerCase()) !== -1) {
      break;
      }
    if (inputWord.slice(i, i + 2).toLowerCase() === "qu") { 
      i++;
      }
  }
  if (i === 0) {
    return inputWord + "way";
  } else {
    return inputWord.slice(i) + inputWord.slice(0, i) + "ay";
  }
}
