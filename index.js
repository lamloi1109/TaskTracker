import * as process from 'process'
import * as path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import {task} from './task.js';
import * as fs from 'fs';
import { type } from 'os';
import { Console } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'task.json');
let commandList = [
    'add'
    , 'update'
    , 'delete'
    , 'mark'
    , 'done'
    , 'list'
    , 'list-done'
    , 'list-not-done'
    , 'list-in-progress'];
let taskList = [];

// The application should run from the command line, accept user actions and inputs as arguments, and store the tasks in a JSON file. The user should be able to:
// Add, Update, and Delete tasks
// Mark a task as in progress or done
// List all tasks
// List all tasks that are done
// List all tasks that are not done
// List all tasks that are in progress

// Flow:
// Read command line arguments
// Execute command
// Save tasks to JSON file

(() => {{
    try {
            
        const args = process.argv.slice(2);
        console.log(args);
        // Nếu như không có tham số thì thông báo lỗi
        if( args.length === 0) {
            console.log('Please input command');
            return;
        }

        // Phân tích tham số đầu vào
        const command = args[0];
        // Nếu như không có trong commandList thì thông báo lỗi
        if( !commandList.includes(command) ) {
            console.log('command is not valid!')
            return;
        }
        // Nếu như số lượng tham số quá nhiều thì báo lỗi

        // Nếu như tham số quá dài thì báo lỗi

        // ...

        // Kiểm tra json file
        // Nếu chưa có thì tạo json file
        if(!fs.existsSync(filePath)) {

            // Kiểm tra xem tasKList có đúng có pháp json hay không?
            // Nếu không thì thông báo lỗi
            // Nếu có thì ghi vào file
            
            const isJSON = isJSONSerializable(taskList);
            if(!isJSON) {
                taskList = [];
            }

            fs.writeFileSync(filePath, JSON.stringify(taskList), 'utf-8');
        }

        let taskJson = fs.readFileSync(filePath, 'utf-8');

        if(!isJSONParsable(taskJson)) {
            taskJson = JSON.stringify([]);
        }

        taskList = JSON.parse(taskJson);

        // Tươmg ứng với mỗi command thì gọi hàm tương ứng
        if(command === 'add') {
            const description = args[1];
            if( !description ) {
                console.log('Please input description');
                return;
            } 
            addTask( description );
        }    

        if(command === 'update') {
            const taskId = args[1]
            const newDescriptiion = args[2]
            updateTask(taskId, newDescriptiion)
        }



    } catch (error) {
        console.log(error);
    }
}})()


// Functions
// - addTask
function addTask(descriptionTask) {
    try {
    
        // Kiểm tra đầu vào
        if(addTask.length === 0) {
            console.log('Please input description');
            return;
        }

        // Tạo một task mới
        const newId = taskList.length + 1;
        // Kiểm tre xem id đã tồn tại chưa
        // Nếu đã tồn tại thì tăng id lên 1
        if( taskList.some( item => item.taskId === newId ) ) {
            newId = taskList.length + 1;
        }

        const newTask = task(newId, descriptionTask, 'todo');
        // Thêm vào list
        taskList.push(newTask?.getInstance());
        // Ghi list vào file

        const isJSON = isJSONSerializable(taskList);

        if(!isJSON) {
            console.log('# Output: Task list is not valid json!');
            return;
        }

        fs.writeFileSync(filePath, JSON.stringify(taskList), 'utf-8');
        // Thông báo thành công
        console.log(`# Output: Task added successfully (Id: ${newId})`);
                
    } catch (error) {
        console.log(error);    
    }
}

function isJSONSerializable(obj) {
    try {
        JSON.stringify(obj);
        return true;
    } catch (error) {
        return false;
    }
}

function isJSONParsable(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (error) {
        return false;
    }
}

// - updateTask

function updateTask(taskId, newDescription) {
    try{
        // Kiểm tra đầu vào
        // Kiểm tra task iđ có phải là số không
        // Kiểm tra đescription có phải là chuỗi không
        if (!Number.isInteger(Number.parseInt(taskId))) {
            console.log(`❌ Error: taskId must be an integer, but received ${taskId} (${typeof taskId}).`);
            return
        }

        if (typeof newDescription !== 'string') {
            console.log(`❌ Error: newDescription must be a string, but received ${newDescription} (${typeof newDescription}).`);
            return
        }

        if ( newDescription.length === 0) {
            console.log(`❌ Error: newDescription must not be empty.`);
            return
        }

        // Kiểm tra xem task có tồn tại hay không
        let taskIndex = taskList.findIndex(task => task.id == taskId);
        
        if( taskIndex === -1) {
            console.log(`❌ Error: Task with id ${taskId} not found.`);
            return
        }

        const currentTask = taskList[taskIndex];
        // Cập nhật trong taskList
        const description = currentTask.description;
        currentTask.description = newDescription;
        // Ghi nội dung vừa cập nhật vào file 
        fs.writeFileSync(filePath, JSON.stringify(taskList), 'utf-8');
        // Thông báo đã cập nhật thành công
        console.log(`# Output: Task updated successfully (Id: ${taskId}, Description: ${description} -> ${newDescription})`);

    }catch(error) {
        console.log(error)
    }
}


// - deleteTask
// - markTask
// - doneTask
// - listTask

// Function File
// - readFile
// - writeFile

// Json File
// - Chek if file exists
// - create json file
// - read json file
// - write json file

// input - Output

// How many solutions for write a file in nodejs?
// 1. fs.writeFile
// 2. fs.createWriteStream
// 3. fs.appendFile
// 4. fs.writeFileSync
// 5. fs.createWriteStream
// 6. fs.write
// 7. fs.writeSync

// Difference each of them?
// fs.writeFile
// fs.createWriteStream
// fs.appendFile
// fs.writeFileSync
// fs.createWriteStream
// fs.write
// fs.writeSync

// I should use some of them in this project

// How many way to read a file in nodejs?
// 1. fs.readFile
// 2. fs.createReadStream
// 3. fs.readFileSync
// 4. fs.read
// 5. fs.readSync

// Difference each of them?
// fs.readFile
// fs.createReadStream
// fs.readFileSync
// fs.read
// fs.readSync

// I should use some of them in this project
// How way to work with JSON file in nodejs?
// How way to create a task Object in project?
// How best way to manage task list in project?