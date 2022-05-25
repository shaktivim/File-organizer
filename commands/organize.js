
const fs = require('fs');
const path = require('path');

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex"],
    app: ["exe", "dmg", "pkg", "deb"],
};


function organizeFn(dirpath){
    // console.log("Organize command is passed");
    let destPath;
    if(dirpath == undefined){
        console.log("Please enter a valid directory path")
        return;
    }else{
        let doesExist = fs.existsSync(dirpath);                 // checking whether the passed path exists or not
        if(doesExist == true){        
            // making destination path where files will be organized, (making another folder inside testFiles folder)
            destPath = path.join(dirpath, 'organizedFiles');
            if(fs.existsSync(destPath) == false){       // checking whether created folder(destpath) already exists or not
                //creating new directory
                fs.mkdirSync(destPath);
            }else{
                console.log("Folder already exist");
            }
        }else{
            console.log("please enter a valid path, path not found")
            return;
        }
    }
    organizeHelper(dirpath, destPath);
    
}

function organizeHelper(src, dest){
    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    for(let i = 0; i<childNames.length; i++){
        let childAddress = path.join(src, childNames[i]);
        let checkForFile = fs.lstatSync(childAddress).isFile();     // checking if path is file or folder, we will not include folders to organize
        // console.log(childAddress + " " + checkForFile);

        if(checkForFile == true){
            let fileCategory = getCategory(childNames[i]);
            // console.log(childNames[i] + " " + fileCategory);
            sendFiles(childAddress, dest , fileCategory);
        }
    }
}

function getCategory(fileName){
    let ext = path.extname(fileName);
    ext = ext.slice(1);     // removing dot from ext
    for(let type in types){
        // console.log(types[type]);
        let cTypeArr = types[type];
        for(let i = 0; i < cTypeArr.length; i++){
            if(ext === cTypeArr[i]){
                return type;
            }
        }
    }
    return 'others';
}

function sendFiles(srcFilePath, dest, fileCategory){
    let catPath = path.join(dest, fileCategory);
    if(fs.existsSync(catPath) == false){
        // check if the category folder already already exist or not
        fs.mkdirSync(catPath);
    }

    let fileName = path.basename(srcFilePath);
    let destPath = path.join(catPath, fileName);
    fs.copyFileSync(srcFilePath, destPath);
    fs.unlinkSync(srcFilePath);     // deleted the file path
    console.log(fileName + " copied to " + destPath);
}

module.exports = {
    organizeFnKey : organizeFn
}