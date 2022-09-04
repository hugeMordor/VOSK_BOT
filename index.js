import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);


// import mic from 'mic'
// import fs from 'fs'
// import {exec} from 'child_process'

const mic = require('mic')
const fs = require('fs')
const {exec} = require('child_process')
const TIME = 10000

//import exec_py from './exec_py.cjs'
// setTimeout(function() {
//     exec_py.execute
// }, TIME*10);



// let div = document.createElement('div');
// div.id = 'messages';
// let start = document.createElement('button');
// start.id = 'start';
// start.innerHTML = 'Start';
// let stop = document.createElement('button');
// stop.id = 'stop';
// stop.innerHTML = 'Stop';
// document.body.appendChild(div);
// document.body.appendChild(start);
// document.body.appendChild(stop);

var micInstance = mic({ 'rate': '16000', 'bitwidth': 16, 'channels': '1', 'debug': false, 'exitOnSilence': 6 });
var micInputStream = micInstance.getAudioStream();
var outputFileStream = fs.WriteStream('output.raw');
micInputStream.pipe(outputFileStream);
var chunkCounter = 0;
micInputStream.on('data', function(data) {
        console.log("Recieved Input Stream of Size %d: %d", data.length, chunkCounter++);
});

micInputStream.on('error', function(err) {
    cosole.log("Error in Input Stream: " + err);
});

micInputStream.on('startComplete', function() {
        console.log("Got SIGNAL startComplete");
        setTimeout(function() {  
            micInstance.pause();
            }, TIME);
    });
    
micInputStream.on('stopComplete', function() {
        console.log("Got SIGNAL stopComplete");
    });
    
micInputStream.on('pauseComplete', function() {
        console.log("Got SIGNAL pauseComplete");
        setTimeout(function() {
                micInstance.resume();
            }, TIME);
    });

micInputStream.on('resumeComplete', function() {
        console.log("Got SIGNAL resumeComplete");
        setTimeout(function() {
                micInstance.stop();
            }, TIME);
    });

micInputStream.on('silence', function() {
        console.log("Got SIGNAL silence");
    });

micInputStream.on('processExitComplete', function() {
        console.log("Got SIGNAL processExitComplete");
    });

micInstance.start();

setTimeout(function(){

    exec("python -u \"c:\\Users\\hugeMordor\\Desktop\\VOSK_bot\\file_chat_bot.py\"", (error, stdout, stderr) => {
        
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
    });

}, TIME*0.6)




