const { green } = require("colors");
const Task = require("./task");
require('colors');

class Tasks {
    _list = {}; 

    get listArr() {
        const list = [];
        Object.keys(this._list).forEach( key => {
            // console.log(key);
            list.push(this._list[key]);
        })
        return list;
    }

    constructor(){
        this._list = {}; 
    }

    deleteTask( id = '' ){
        if (this._list[id]){
            delete this._list[id];
        }
    }
    
    loadTasksFromArr( tasks = [] ){
        tasks.forEach((task)=> {
            this._list[task.id] = task;
        });
    }
    
    createTask ( desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    fullList() {
        // let index = 1;
        // const list = this.listArr;
        // // Object.keys(this._list).forEach( key => {
        // //     list.push(this._list[key]);
        // // })
        // list.forEach(( task )=>{
        //     console.log(`${(index.toString()).green}. ${task['desc']} :: ${this.setColorTask(task['completedIn'])}`);
        //     index += 1;
        // })
        this.listArr.forEach((task,index) => {
            const idx = `${index + 1}`.green;
            const { desc, completedIn } = task;
            const state = (completedIn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            console.log(`${idx}. ${desc} :: ${state}`);
        })
    }

//     setColorTask(state){
//         if(state === null){
//             return 'Pendiente'.red;
//         }
//         else{
//             return 'Completado'.green;
//         }
//     }

    listPendingTasks( completed = true){
        let index = 1;
        this.listArr.forEach((task) => {
            const { desc, completedIn } = task;
            const idx = `${index}`.green;
            const state = (completedIn)
                            ? 'Completado'.green
                            : 'Pendiente'.red;
            if(completed ){
                if(completedIn){
                    console.log(`${idx}. ${desc} :: ${completedIn.green}`);
                    index += 1;
                }
            }else{
                if(!completedIn){
                    console.log(`${idx}. ${desc} `);
                    index += 1;
                }
            }})
    }

    troggleCompleted(ids = []){
        ids.forEach (id => {
            const task = this._list[id];
            if (!task.completedIn){
                task.completedIn = new Date().toISOString();
            }
        })

        this.listArr.forEach( task => {

            if (!ids.includes(task.id)){
                // const task = this._list[task.id];
                // task.completedIn = null;
                this._list[task.id].completedIn = null;
            }

        })
    }

}



module.exports = Tasks;