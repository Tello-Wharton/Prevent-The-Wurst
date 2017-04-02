

var myclass = "conversation";
var pagesConfig = {
  containerClass  : "conversation",
  imageClass      : "._4yp9"//"._52kr._3_om"
};



var observer = new MutationObserver(function(mutations) {
    var targets = document.getElementsByClassName(pagesConfig.containerClass);

    for (var x = 0; x < targets.length; x++){
        if(targets[x].classList.contains(pagesConfig.containerClass)){
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
      var images = target.querySelectorAll(pagesConfig.imageClass);
      for (var x = 0; x < images.length; x++){
        if(images[x].getAttribute("state") !== "tracked"){
          //console.log(images[x]);
          images[x].realImage = images[x].style.backgroundImage;
          images[x].style.backgroundImage = 'url("https://raw.githubusercontent.com/Tello-Wharton/Prevent-The-Wurst/master/circle.png")';
          images[x].setAttribute("state","tracked");

          var imageURL = images[x].realImage.match(/"([^"]+)"/)[1];
          
          console.log(images[x].realImage);
          console.log(imageURL);
        }
      }

    });

    var config = { attributes: true, childList: true, characterData: true, subtree: true  };

    observer.observe(target, config);
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Only hardcoded list values work offline

var bannedExplicit = ["sausage", "balls", "melon", "raddish"];
var bannedGore = ["blood", "gun", "sword"];
var bannedStuff = ["kinks"];
var filterG = true;
var filterN = true;
var filterS = true;

function replaceImage(captionList, image) {
    // If captionList contains banned words, replace them with danger
    // Replace image with placeholder image
}

function checkWord(inputWord) {
    if (filterG) {
            for (i = 0; i < bannedGore.length; i++) {
                if (inputWord.toLowerCase() == bannedGore[i]) {
                    inputWord = "Caution, this image may contain gore";
                }
            }
    }

    if (filterN) {
            for (i = 0; i < bannedExplicit.length; i++) {
                if (inputWord.toLowerCase() == bannedExplicit[i]) {
                    inputWord = "Caution, this image may contain explicit images";
                }
            }
    }

    if (filterS) {
            for (i = 0; i < bannedStuff.length; i++) {
                if (inputWord.toLowerCase() == bannedStuff[i]) {
                    inputWord = "Caution, this image may contain stuff";
                }
            }
    }

    // Add to a list of words contained in the image, and return the word list - DO LATER
    console.log(inputWord); // Used for testing - Remove later
    return inputWord;
}

// 1 for Gore, 2 for Explicit, 3 for Stuff [CURRENTLY UNUSED]
function setFilters(filterNum) {
    if (filterNum == 1) {
        filterG = !filterG;
    }

    else if (filterNum == 2) {
        filterN = !filterN;
    }

    else if (filterNum == 3) {
        filterS = !filterS;
    }

}

function addBanned(inputWord, bannedList) {
    for (i = 0; i < bannedList.length; i++) {
        if (inputWord == bannedList[i]) {
            bannedList.push(inputWord);
        }
    }
}

function getBanned(bannedList) {
    return bannedList;
}


function saveBanned() {
    // Saves the banned words list to the JSON file again
}

function main() {
    // Loads the banned words list into a JS array to be used in JS - Only works on hosted server
    console.log("[BANNED WORDS] Loading list");
    var JSONItems = [];
    $.getJSON("bannedWords.json", function(data){
        JSONItems = data;
        bannedWords = $.map(JSONItems, function(el) { return el; });
    });
    console.log("[BANNED WORDS] Loading complete");

    // Testing the functions with certain words
    console.log(bannedExplicit);
    console.log(bannedGore);
    checkWord("sausage");
    checkWord("sword");
    checkWord("thingy - unbanned");
}

main();
