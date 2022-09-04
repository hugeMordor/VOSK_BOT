//var exec = require('child_process').exec
const { exec } = require("child_process");

execute = exec("python -u \"c:\\Users\\hugeMordor\\Desktop\\VOSK_bot\\file_chat_bot.py\"", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
});

module.exports = {
    execute: execute
};