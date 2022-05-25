
function helpFn(){
    console.log(`List of all commands:
        1) Tree Command - node FO.js tree <dirPath>
        2) Organize Command- node FO.js organise <dirname>
        3) Help Command - node FO.js help`)
}

module.exports = { helpListKey: helpFn };