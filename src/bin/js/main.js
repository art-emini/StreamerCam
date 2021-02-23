var img = document.querySelector("img");



// function from https://codepen.io/www-0av-com/pen/jxzxEX

    function startr(){
        console.log ("starting...");
        document.querySelector("button").style.display = "none";
        document.querySelector("canvas").style.display = "none";
        navigator.getUserMedia = navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;
        if (navigator.getUserMedia) {
         navigator.getUserMedia({
             audio: true
           },
           function(stream) {
             audioContext = new AudioContext();
             analyser = audioContext.createAnalyser();
             microphone = audioContext.createMediaStreamSource(stream);
             javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
   
             analyser.smoothingTimeConstant = 0.8;
             analyser.fftSize = 1024;
   
             microphone.connect(analyser);
             analyser.connect(javascriptNode);
             javascriptNode.connect(audioContext.destination);
   
             canvasContext = document.getElementById("canvas").getContext("2d");
   
             javascriptNode.onaudioprocess = function() {
                 var array = new Uint8Array(analyser.frequencyBinCount);
                 analyser.getByteFrequencyData(array);
                 var values = 0;
   
                 var length = array.length;
                 for (var i = 0; i < length; i++) {
                   values += (array[i]);
                 }
   
                var average = values / length;
                
                                 
                canvasContext.clearRect(0, 0, 150, 300);
                canvasContext.fillStyle = '#FF0A55';
                canvasContext.fillRect(0, 300 - average, 150, 300);
                canvasContext.fillStyle = '#F62626';
                canvasContext.font = "24px impact";
                canvasContext.fillText(Math.round(average), 2, 30);

                // my addition 
                // for changing images

                // silent

                if(average <= 10) {
                    img.src = "yourImages/silent.png";
                }; 

                if(average >= 11 && average <= 30) {
                    img.src = "yourImages/semi-silent.png";
                };

                if(average >= 31 && average <= 65) {
                    img.src = "yourImages/normal.png";
                };

                if(average >= 66 && average <= 85) {
                    img.src = "yourImages/semi-loud.png";
                };

                if(average >= 86) {
                    img.src = "yourImages/loud.png";
                };

                 // console.log (average);
               } // end fn stream
           },
           function(err) {
             console.log("The following error occured: " + err.name)
           });
       } else {
         console.log("getUserMedia not supported");
        }
       }
       startr()