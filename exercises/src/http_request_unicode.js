import * as https from "https";
import * as fs from 'fs';

const options = {
    protocol: 'https:',
    host: 'en.wikipedia.org',
    path: '/wiki/Unicode'
};

const request = https.request(options, responseStream => {
    let htmlText = '';
    responseStream.on('data', chunk => {
        htmlText += chunk;
    });
    responseStream.on('end', () => {
        writeToFile('./src/resources/Unicode.1.html', '\uFEFF' + htmlText, 'utf16le');

        const fileText = readFromFile('./src/resources/Unicode.1.html', 'utf16le');
        writeToFile('./src/resources/Unicode.2.html', fileText.slice(1), 'utf16le');

        const finalText = readFromFile('./src/resources/Unicode.2.html', 'utf8');
        writeToFile('./src/resources/Unicode.3.html', '\uFEFF' + finalText, 'utf16le');
    });
});

request.on('error', function (e) {
    console.error(e.message);
});

request.end();

function writeToFile(filePath, text, encoding) {
    fs.writeFileSync(filePath, text, { encoding: encoding });
}

function readFromFile(filePath, encoding) {
    return fs.readFileSync(filePath, { encoding: encoding });
}