document.addEventListener('DOMContentLoaded', function () {
    let cameraStreamElement = document.getElementById('camera-stream');
    let startCameraButton = document.getElementById('start-camera');

    startCameraButton.addEventListener('click', function() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    cameraStreamElement.srcObject = stream;
                    cameraStreamElement.play();
                })
                .catch(function(error) {
                    console.error("素直に言おう、カメラを起動できない、そういうことよ！", error);
                });
        } else {
            alert("このブラウザは対応してないわ。知ってた？");
        }
    });
});