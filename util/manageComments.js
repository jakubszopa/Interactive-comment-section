const fs = require('fs')

function getJSONData() {
    data = fs.readFileSync('./data.json', 'utf8');
    parsedData = JSON.parse(data);
    console.log(parsedData);
    return parsedData;
}

function addCommentToJSONFile (commentContent) {
    fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        let parsedData = JSON.parse(data);
        parsedData.comments.push({commentContent});
        json = JSON.stringify(parsedData);
        fs.writeFile('data.json', json, 'utf8', callback);
    }});
}

module.exports = {
    getJSONData: getJSONData,
    addCommentToJSONFile: addCommentToJSONFile,
}