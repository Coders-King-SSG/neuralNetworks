var cam_elm = document.getElementById('camera');

Webcam.set({
    width: 350,
    height:300,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach(cam_elm);

function captureImg() {
    Webcam.snap(function(data_url) {
        document.getElementById('result').innerHTML= '<img id="resultImg" src="'+data_url+'">';
    });
}

console.log(`ml5 version:`, ml5.version);

var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Rdp_4cMkZ/model.json', modelLoaded);

function modelLoaded() {
    console.log('model loaded')
}

function identifyImg() {
    var img = document.getElementById('resultImg');
    classifier.classify(img, gotResult);
}

function gotResult(error ,results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results);
        console.log(results[0].label)
        console.log(Number(results[0].confidence)*100)
        document.getElementById('result_object_name').innerHTML = results[0].label;
        document.getElementById('result_object_accuracy').innerHTML = (results[0].confidence).toFixed(3);
        document.getElementById('percent').innerHTML = (Number(results[0].confidence)*100).to + '%';
    }
}