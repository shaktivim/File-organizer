//We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in a specific directory according to their extensions
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in a specific folders


// 1. Command line input in Javascript (method to take input from user in js through cmd or terminal)
// let input = process.argv[2];
// let input = process.argv[3];        // type <node FO.js tokyo denver> in the terminal and see the output
// console.log(input);

// let num1 = process.argv[2];
// let num2 = process.argv[3]; // input will be in type string
// console.log(Number(num1) + Number(num2));           //<node FO.js 5 8>

const fs = require('fs');
const path = require('path');

const organizeModuleFile = require('./commands/organize');
const helpModuleFile = require('./commands/help');


let inputArr = process.argv.slice(2);           
// enter < node FO.js organise 'C:\Users\SHAKTIVIM\Desktop\FJP-8\3_NodeJs\testFiles' >
// providing path of folder where files to be organized are present
// console.log(inputArr);
let command = inputArr[0];

switch(command){
    case "tree":
        console.log("Tree command is passed");
        break;
    case "organize":
        // console.log("Organize command is passed");
        organizeModuleFile.organizeFnKey(inputArr[1]);        // passing directory path where files are present
        break;
    case "help":
        helpModuleFile.helpListKey();
        break;
    default :
        console.log(command + "command does not exit. " + "Enter a valid command");
}



