import * as fs from 'fs'    

const obj = {
    a: 'Hello',
    b: 'World',
    c: 'NodeJS',
}

// Chuuyền thành json
const json = JSON.stringify(obj);

// Ghi file một cách đồng bộ
// fs.writeFileSync('./data.json', json, 'utf-8');
// Ghi file không đồng bộ

fs.writeFile('./date.json', json,'utf-8', (err) => {
    if(err) {
        console.log('error', err);
    } else {
        console.log('File is writen successfully!')
    }
});
