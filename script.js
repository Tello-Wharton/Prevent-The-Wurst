

var myclass = "conversation";

var state = [];

var observer = new MutationObserver(function(mutations) {
    var targets = document.getElementsByClassName('conversation');

    for (var x = 0; x < targets.length; x++){
        if(targets[x].classList.contains('conversation')){
            if(targets[x].getAttribute("tracked") !== "true" ){
                console.log("New chatbox found")
                watch(targets[x]);
                targets[x].setAttribute("tracked", "true");
            }
        }
    }

});

var config = {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
};

observer.observe(document.body, config);

function watch(target){
    var observer = new MutationObserver(function(mutations) {
      /*
      mutations.forEach(function(mutation) {
        //console.log(mutation.type);
        console.log("cake");
        //Stop Sausages Goes Here
      });
      */
      var images = target.querySelectorAll('[class=_52kr]');

    });

    var config = { attributes: true, childList: true, characterData: true, subtree: true  };

    observer.observe(target, config);
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
