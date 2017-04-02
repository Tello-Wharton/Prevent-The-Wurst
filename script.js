

// Only hardcoded list values work offline
var testTags = ["boo", "balls"]
var bannedExplicit = ["sausage", "balls", "melon", "raddish"];
var bannedGore = ["blood", "gun", "sword"];
var filterG = true;
var filterN = true;
var filterS = true;

function checkTag(inputTag) {
    var unblock = true;
    var warning = null;
    if (filterG) {
            for (i = 0; i < bannedGore.length; i++) {
                if (inputTag.toLowerCase() == bannedGore[i]) {
                    unblock = false;
                    warning = "Caution! This image may contain graphic or gorey content.";
                }
            }
    }

    if (filterN) {
            for (i = 0; i < bannedExplicit.length; i++) {
                if (inputTag.toLowerCase() == bannedExplicit[i]) {
                    unblock = false;
                    warning = "Caution! This image may contain nudity.";
                }
            }
    }

    if (filterS) {
        // Use silly images
    }

    // Add to a list of Tags contained in the image, and return the Tag list - DO LATER
    console.log(inputTag + " " + unblock); // Used for testing - Remove later
    console.log(warning);
    return unblock, warning;
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

function parseImage(imageURL) {
    var dataToTransmit = 'siteurl=' + imageURL;

		$.ajax({
			url: "/ajax/registervote", // Put in the URL for the server
			type: "POST",
			data: dataToTransmit,
			cache: false,
			success: function(returnedData) {

				var receivedJSON = JSON.parse(returnedData);
                var rating = receivedJSON; // Change array index to get rating int
                var tags = receivedJSON; // Change array index to get tags array
                if (rating < 0.4) {
                    for (var t in tags) {
                        checkTag(t);
                    }
                }

			}
        });
}

function checkTest() {
    for (var i = 0; i < testTags.length; i++) {
        checkTag(testTags[i]);
    }
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
    //console.log(bannedExplicit);
    //console.log(bannedGore);
    checkTag("sausage");
    checkTag("sword");
    checkTest();
}

main();
