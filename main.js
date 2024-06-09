document.addEventListener('DOMContentLoaded', function () {
    const cameraStreamElement = document.getElementById('camera-stream');
    const photoCanvas = document.getElementById('photo-canvas');
    const startCameraButton = document.getElementById('start-camera');
    const takePhotoButton = document.getElementById('take-photo');
    const downloadPhotoLink = document.getElementById('download-photo');
    let cameraStream = null;

    startCameraButton.onclick = function() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    cameraStream = stream;
                    cameraStreamElement.srcObject = stream;
                    cameraStreamElement.play();
                })
                .catch(function(error) {
                    console.error("カメラが起動できません", error);
                });
        }
    };

    takePhotoButton.onclick = function() {
        if (!cameraStream) {
            return;
        }

        const context = photoCanvas.getContext('2d');
        
        // カメラの映像をCanvasに描画
        context.drawImage(cameraStreamElement, 0, 0, photoCanvas.width, photoCanvas.height);

        // Canvasの内容を画像として取得
        const photoDataUrl = photoCanvas.toDataURL('image/png');

        // ダウンロードリンクを更新
        downloadPhotoLink.href = photoDataUrl;
        downloadPhotoLink.download = 'photo.png';
        downloadPhotoLink.style.display = 'block';
        downloadPhotoLink.click();
    };
});