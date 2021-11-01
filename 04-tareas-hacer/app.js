require('colors');
const {inquireMenu, 
       pause,
       readInput,
       listTaskDelete,
       confirm,
       showCheckList} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Task = require('./models/task');
const Tasks = require('./models/Tasks');

console.clear();

const main = async()=> {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if(tasksDB){
        tasks.loadTasksFromArr( tasksDB );
    }
    // await pause();
    
    do {
        opt =  await inquireMenu();
        // console.log(opt);

        switch(opt){
            case '1':
                //crear opción
                const desc = await readInput('Description:');
                tasks.createTask( desc );
                break;
            case '2':
                //Listar tareas
                tasks.fullList();
                // console.log( tasks.listArr );
            break;
            case '3':
                //Listar tareas completadas
                tasks.listPendingTasks();
            break;
            case '4':
                //Listar tareas completadas
                tasks.listPendingTasks(null);
            break;
            case '5':
                //Seleccionar tarea(s)
                const ids = await showCheckList( tasks.listArr );
                tasks.troggleCompleted( ids );
            break;
            case '6':
                //Borrar tareas
                const id = await listTaskDelete( tasks.listArr );
                if (id !== '0'){
                    const confirmDelete = await confirm('¿Está seguro de que desea borrarlo?')
                    // console.log( {confirmDelete} );
                    if(confirmDelete){
                        tasks.deleteTask(id);
                        console.log('Tarea borrada...')
                    }
                }
            break;
            default:
            break;
        }



        saveDB( tasks.listArr );
        if (opt !== '0') await pause(); 
    }while(opt !== '0');
    
}

main();