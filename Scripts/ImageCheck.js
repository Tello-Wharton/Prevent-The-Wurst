    var app = new Clarifai.App(
      'Xq1nRePp4LvQspume-aSEqJieEoolAi2emDrmxZ6',
      'l0MQqDT-_qkjefid88hHBAQCSNUckkIcuGtCDG6r'
      );


    //Queries the Clarifi API
    function imageChecker(imageURL, callBackFunction){

      app.models.predict("e9576d86d2004ed1a38ba0cf39ecb4b1", imageURL).then(

        function(response) {

          var reformatedResponse = reformatResponse(response);
          callBackFunction(reformatedResponse);

        },

        function(err) {

      // I will  put an error reporting system in here!

        }
      );

    }

    // Reformat the reponse to a far reduced simpler set
    // [URL,SafeFactor]
    // e.g. get safefactor by:
    // SONResposne["SafeFactor"]
    function reformatResponse(response){

      var outputs = response['outputs'];
      var reformatted;

    //  for(var i in outputs){

      reformatted = ({
        "URL": outputs[0]['input']['data']['image']['url'] ,
        "SafeFactor": outputs[0]['data']['concepts'][0]['value'] 

      });

      //}

      
      console.log("response reformatted");
      
      return reformatted;


    }








