const fs = require('fs');
const path = require('path');

function treeFn(dirPath){
    if(dirPath == undefined){
        console.log("Please enter a valid directory path")
        return;
    }else{
        let doesExist = fs.existsSync(dirPath);                 // checking whether the passed path exists or not
        if(doesExist == true){   
            treehelper(dirPath, " ");
        }
    }
}

function treehelper(targetpath, indent){
    let checkForFile = fs.lstatSync(targetpath).isFile();
    
    if(checkForFile == true){
        let fileName = path.basename(targetpath);
        console.log(indent + "|--- " + fileName);
    }else{
        let dirName = path.basename(targetpath);
        console.log(indent + "|___ " + dirName);
        
        let childrenArr = fs.readdirSync(targetpath);
        // console.log(childrenArr);
        for(let i = 0; i< childrenArr.length; i++){
            let childPath = path.join(targetpath, childrenArr[i]);
            treehelper(childPath, indent + "\t");
        }
    }
}

module.exports = {
    treeFnKey : treeFn
}