// JavaScript to send an asynchronous request to the server
document.getElementById('encode').addEventListener('click', function() {
    process('encode');
});

document.getElementById('decode').addEventListener('click', function() {
    process('decode');
});

function process(action) {
    const inputString = document.getElementById('input_string').value;
    const outputElement = document.getElementById('output');

    // Add a check for an empty input string
    if (inputString.trim() === '') {
        outputElement.textContent = 'Please enter some text.';
        return;
    }

    // Disable the buttons during the request
    document.getElementById('encode').disabled = true;
    document.getElementById('decode').disabled = true;

    // Make a POST request to the server to process the string
    fetch('/process', {
        method: 'POST',
        body: JSON.stringify({ "input_string": inputString, "action": action }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        outputElement.textContent = data.output_string;
    })
    .catch(error => {
        console.error('Error:', error);
        outputElement.textContent = 'An error occurred.';
    })
    .finally(() => {
        // Re-enable the buttons after the request is complete
        document.getElementById('encode').disabled = false;
        document.getElementById('decode').disabled = false;
    });
}
