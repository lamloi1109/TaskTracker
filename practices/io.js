// import readline from 'readline';
import * as process from 'process';
//  readable stream
// const r1 = readline.createInterface({
//     input,
//     output
// })

// r1.question('What is your name?', (name) => {
//     console.log(name);
//     r1.close();
// } )
const args = process.argv.slice(2);
console.log(args);

// processs.argv holds an array of command line values

