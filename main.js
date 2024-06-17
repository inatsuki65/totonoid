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

function drawGraph(textarea_id, canvas_id) {
    jsonInput = document.getElementById(textarea_id).value;
    try {
        jsonData = JSON.parse(jsonInput);
        //const jsonData = JSON.parse(jsonData_.object);
        emotionData = {
            Anger: jsonData.object[0].result.fe.emotion_score['Anger'],
            Disgust: jsonData.object[0].result.fe.emotion_score['Disgust'],
            Fear: jsonData.object[0].result.fe.emotion_score['Fear'],
            Happy: jsonData.object[0].result.fe.emotion_score['Happy'],
            Neutral: jsonData.object[0].result.fe.emotion_score['Neutral'],
            Sad: jsonData.object[0].result.fe.emotion_score['Sad'],
            Surprise: jsonData.object[0].result.fe.emotion_score['Surprise']
        };
        console.log(jsonData.object[0].result.fe.emotion_score)
        ctx = document.getElementById(canvas_id).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(emotionData),
                datasets: [{
                    label: 'Emotion Values',
                    data: Object.values(emotionData),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(199, 199, 199, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(159, 159, 159, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (e) {
        alert('Invalid JSON input!');
        console.log(e);
    }
};

function calculateDifference() {
    jsonInput1 = document.getElementById('json-input').value;
    jsonInput2 = document.getElementById('json-input_2').value;
    try {
        jsonData1 = JSON.parse(jsonInput1);
        jsonData2 = JSON.parse(jsonInput2); 
        const value1 = parseFloat(jsonData1.object[0].result.fe.emotion_score['Happy']);
        const value2 = parseFloat(jsonData2.object[0].result.fe.emotion_score['Happy']);

        // Check if both values are numbers
        if (!isNaN(value1) && !isNaN(value2)) {
            // Calculate the difference and percentage change
            const difference = value2 - value1;
            const percentageChange = (difference / value1) * 100;

            // Display the result
            document.getElementById('result').innerText =
                `The percentage change is ${percentageChange.toFixed(2)}%`;
        } else {
            // Display an error message
            document.getElementById('result').innerText = 'Please enter valid numbers in both fields.';
        }
    } catch (e) {
        alert('Invalid JSON input!');
        console.log(e);
    }
};