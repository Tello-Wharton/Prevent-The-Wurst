


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
          images[x].style.textAlign = "center";
          var imageURL = images[x].realImage.match(/"([^"]+)"/)[1];

          console.log(images[x].realImage);
          console.log(imageURL);

          images[x].innerHTML = '<div class="clickable" onclick="return closeBox(this, event);" style="color: #777; font: 14px/100% arial, sans-serif; position: absolute; right: 5px; text-decoration: none; text-shadow: 0 1px 0 #fff; top: 5px; z-index: 20;">X</div>';
          images[x].innerHTML+= "<div style='textAlign: center; display: inline-block; position: relative; top: 50%; transform: translateY(-50%);'>" + returnTags(JSONARRAYHERE); + "</div>";

          $(images[x].parentNode.parentNode).css("pointer-events","none");
          $(images[x].parentNode).css("pointer-events","none");
          $(images[x]).css("pointer-events","none");
          $(images[x]).children().css("pointer-events", "all");

          // Get this function below to check if it needs to be unblocked
          var cake = parseImage(imageURL);
          console.log(cake);

        }
      }

    });

    var config = { attributes: true, childList: true, characterData: true, subtree: true  };

    observer.observe(target, config);
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Only hardcoded list values work offline

function returnTags(tagArray) {
    var tagString = JSON.stringify(tagArray);
    return tagString;
}

var bannedExplicit = ["sausage", "balls", "melon", "raddish"];
var bannedGore = ["blood", "gun", "sword"];
var filterG = true;
var filterN = true;
var filterS = true;

function checkTag(inputTag) {
    var unblock = true;
    var warning = "";
    if (filterG) {
            for (i = 0; i < bannedGore.length; i++) {
                if (inputTag.toLowerCase() == bannedGore[i]) {
                    unblock = false;
                    warning = "Caution! This image may contain graphic or gorey content.";
                    break;
                }
            }
    }

    if (filterN) {
            for (i = 0; i < bannedExplicit.length; i++) {
                if (inputTag.toLowerCase() == bannedExplicit[i]) {
                    unblock = false;
                    warning = "Caution! This image may contain nudity.";
                    break;
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
    var receivedJSON;
    var unblock;
    var warning;

    console.log(dataToTransmit);

		$.ajax({
			url: "/ajax/registervote", // Put in the URL for the server
			type: "POST",
			data: dataToTransmit,
			cache: false,
			success: function(returnedData) {

				receivedJSON = JSON.parse(returnedData);
                var rating = receivedJSON; // Change array index to get rating int
                var tags = receivedJSON; // Change array index to get tags array
                if (rating < 0.4) {
                    for (var t in tags) {
                        var returnVals = checkTag(t);
                        unblock = returnVals[0];
                        warning = returnVals[1];
                    }
                }

			}
        });
    // Returns the JSON object, whether it should be unblocked or not (false for an explicit image)
    // Lastly it returns the warning, if any
    return {"receivedJSON" : receivedJSON, "unblock" : unblock, "warning" : warning};
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
    //checkTest();
}

main();

function closeBox(obj, event){
  console.log("close");

  event.stopPropagation();
  removeCover(obj);

  return true;
}

function removeCover(obj){
  obj.parentNode.style.backgroundImage = obj.parentNode.realImage;
  obj.parentNode.setAttribute("state","tracked");


  $(obj.parentNode.parentNode).css("pointer-events","all");
  $(obj.parentNode).css("pointer-events","all");
  //$(images[x]).click(function(){ console.log("cake"); });
  console.log("guess who");

  obj.parentNode.innerHTML = '';
}
