

// Only hardcoded list values work offline
var bannedExplicit = ["sausage", "balls", "melon", "raddish"];
var bannedGore = ["blood", "gun", "sword"];
var bannedStuff = ["kinks"];
var filterG = true;
var filterN = true;
var filterS = true;

function checkTag(inputTag) {
    if (filterG) {
            for (i = 0; i < bannedGore.length; i++) {
                if (inputTag.toLowerCase() == bannedGore[i]) {
                    inputTag = "Caution, this image may contain gore or violent imagery";
                }
            }
    }

    if (filterN) {
            for (i = 0; i < bannedExplicit.length; i++) {
                if (inputTag.toLowerCase() == bannedExplicit[i]) {
                    inputTag = "Caution, this image may contain explicit images";
                }
            }
    }

    if (filterS) {
            for (i = 0; i < bannedStuff.length; i++) {
                if (inputTag.toLowerCase() == bannedStuff[i]) {
                    inputTag = "Caution, this image may contain stuff";
                }
            }
    }

    // Add to a list of Tags contained in the image, and return the Tag list - DO LATER
    console.log(inputTag); // Used for testing - Remove later
    return inputTag;
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

function addBanned(inputTag, bannedList) {
    for (i = 0; i < bannedList.length; i++) {
        if (inputTag == bannedList[i]) {
            bannedList.push(inputTag);
        }
    }
}

function getBanned(bannedList) {
    return bannedList;
}


function saveBanned() {
    // Saves the banned Tags list to the JSON file again
}

function parseImage(url) {

}

function main() {
    // Loads the banned Tags list into a JS array to be used in JS - Only works on hosted server
    console.log("[BANNED TAGS] Loading list");

    /* - JSON DOES NOT WORK FOR NOW INTEGRATED WITH FACEBOOK
    var JSONItems = [];
    $.getJSON("bannedTags.json", function(data){
        JSONItems = data;
        bannedTags = $.map(JSONItems, function(el) { return el; });
    });
    console.log("[BANNED TAGS] Loading complete");
    */

    // Testing the functions with certain Tags
    //console.log("All tags " + bannedTags);
    console.log(bannedExplicit);
    console.log(bannedGore);
    checkTag("sausage");
    checkTag("sword");
    checkTag("thingy - unbanned");
}

main();
