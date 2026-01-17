
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const http = require('http');

// Create a dummy audio file (small text file disguised as wav for testing payload)
const dummyAudioPath = path.join(__dirname, 'test_audio.wav');
fs.writeFileSync(dummyAudioPath, 'RIFF....WAVEfmt ....data....');

const form = new FormData();
// form.append('audio', fs.createReadStream(dummyAudioPath));
form.append('text', 'Hello, can you hear me?');
form.append('history', '[]');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/gemini-voice',
  method: 'POST',
  headers: form.getHeaders(),
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`Status Code: ${res.statusCode}`);
    const parsed = JSON.parse(data);
    console.log(`Full Response:`, parsed);
    // console.log(`Text Response: ${parsed.text}`);
    // console.log(`Audio Response Length: ${parsed.audio ? parsed.audio.length : 0}`);
    // Clean up
    fs.unlinkSync(dummyAudioPath);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
  fs.unlinkSync(dummyAudioPath);
});

form.pipe(req);
