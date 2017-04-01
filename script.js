// Only hardcoded list values work offline
var bannedWords = ["sausage", "balls", "melon", "raddish"]

function replaceImage(captionList, image) {
    // If captionList contains banned words, replace them with danger
    // Replace image with placeholder image

}

function checkWord(inputWord) {
    for (i = 0; i < bannedWords.length; i++) {
        if (inputWord.toLowerCase() == bannedWords[i]) {
            inputWord = "Danger, banned word";
        }
    }
    // Add to a list of words contained in the image, and return the word list - DO LATER
    console.log(inputWord); // Used for testing - Remove later
    return inputWord;
}

function addBanned(inputWord) {
    for (i = 0; i < bannedWords.length; i++) {
        if (inputWord == bannedWords[i]) {
            bannedWords.push(inputWord);
        }
    }
}

function getBanned() {
    return bannedWords;
}


function saveBanned() {
    // Saves the banned words list to the JSON file again
}

// Loads the banned words list into a JS array to be used in JS - Only works on server
console.log("[BANNED WORDS] Loading list");
JSONItems = [];
$.getJSON("bannedWords.json", function(data){
    JSONItems = data;
    var bannedWords = $.map(JSONItems, function(el) { return el });
});
console.log("[BANNED WORDS] Loading complete");

// Testing the functions
checkWord("sausage");
checkWord("blueberry");
checkWord("MeLoN");
