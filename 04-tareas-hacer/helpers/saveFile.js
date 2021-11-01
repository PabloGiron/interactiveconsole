const fs = require('fs');
const file = './db/data.json'


const saveDB = ( data ) => {
    
    fs.writeFileSync( file, JSON.stringify(data));
}

const readDB = (  ) => {
    if (!fs.existsSync(file)){
        return null;
    }

    const info = fs.readFileSync( file, {encoding: 'UTF-8'});
    const data = JSON.parse(info);

    // console.log(info);
    // console.log(data);
    return data;
}


module.exports = {
    saveDB,
    readDB
}
