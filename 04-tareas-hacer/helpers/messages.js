require('colors');

const showMenu = () => {

    return new Promise((resolve) => {
        
        console.clear();
        console.log('\n Seleccione una opcion \n'.green);
    
        console.log(`${ '1'.green }. Crear una tarea`);
        console.log(`${ '2'.green }. Listar tareas`);
        console.log(`${ '3'.green }. Listar completadas`);
        console.log(`${ '4'.green }. Listar pendiente`);
        console.log(`${ '5'.green }. Completar tarea`);
        console.log(`${ '6'.green }. Borrar una tarea`);
        console.log(`${ '0'.green }. Salir\n`); 
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`Presione ${'ENTER'.cyan} para continuar: \n`, (opt)=>{
            // console.log(`\nSeleccionó: ${ opt }`);
            readline.close();
            resolve(opt);
        });
    });
    
}

const pauseMenu = () => {

    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`Presione ${'ENTER'.cyan} para continuar: \n`, (opt)=>{
            // console.log(`\nSeleccionó: ${ opt }`);
            readline.close();
            resolve();
        });
    });
}

module.exports = {
    showMenu,
    pauseMenu
}