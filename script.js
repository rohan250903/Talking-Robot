document.getElementById('speakButton').addEventListener('click', function() {
    var textToSpeak = document.getElementById('textToSpeak').value;
    var speechSynthesis = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(utterance);
    
    // Make the robot animate when speaking
    var robot = document.getElementById('robot');
    robot.style.animation = 'talking 1s infinite';
    
    utterance.onend = function() {
        robot.style.animation = '';
    };
});

document.getElementById('listenButton').addEventListener('click', function() {
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        document.getElementById('output').textContent = 'You said: ' + transcript;
        
        // Make the robot speak what it heard
        var speechSynthesis = window.speechSynthesis;
        var utterance = new SpeechSynthesisUtterance('You said: ' + transcript);
        speechSynthesis.speak(utterance);

        // Make the robot animate when speaking
        var robot = document.getElementById('robot');
        robot.style.animation = 'talking 1s infinite';

        utterance.onend = function() {
            robot.style.animation = '';
        };
    };

    recognition.onerror = function(event) {
        document.getElementById('output').textContent = 'Error occurred in recognition: ' + event.error;
    };
});
