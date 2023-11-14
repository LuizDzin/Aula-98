Webcam.set({
    width: 400,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
var camera = document.getElementById("camera");

var SpeechRecognition = window.webkitSpeechRecognition

var recognition = new SpeechRecognition();

function Start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event) {
    console.log(event);
    
    var Content = event.results[0][0].transcript;
    
    document.getElementById("textbox").innerHTML = Content;
    console.log(Content);
    if(Content == "Tire minha selfie") {
        console.log("tirando selfie... ");
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    
    speakData = "Tirando sua selfie em 5 segundos";
    
    var utterThis = new SpeechSynthesisUtterance(speakData);
    
    synth.speak(utterThis)
    Webcam.attach(camera);

    setTimeout(function() {
        takeSelfie();
        save();
    }, 5000);
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfieImage").src;
    link.href = image;
    link.click();
}

function takeSelfie() {
    webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfieImage" src="'+data_uri+'"/>';
    })
}