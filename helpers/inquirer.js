const inquirer = require('inquirer');
require('colors');

const menuOpt = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer? \n',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear una tarea`
            },
            {
                value: '2',
                name: `${'2'.green}. Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.green}. Listar completadas`
            },
            {
                value: '4',
                name: `${'4'.green}. Listar pendiente`
            },
            {
                value: '5',
                name: `${'5'.green}. Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.green}. Borrar una tarea`
            },
            {
                value: '0',
                name: `${'0'.green}. Salir`}
            ]
    }
]



// --------------------------------------------------
const inquireMenu = async() => {
    console.clear();
    console.log('\n Seleccione una opcion \n'.green);

    const  {option}  = await inquirer.prompt(menuOpt);
    return option;
}

const pause = async() => {
    // const inputPause = [
    //     {
    //         type: 'input',
    //         name: 'pause',
    //         message: `Presione ${'ENTER'.cyan} para continuar: \n`
    //     }
    // ]
    // // console.log(`Presione ${'ENTER'.cyan} para continuar: \n`)
    // const {pause} = await inquirer.prompt(inputPause);
    // return pause;
    await inquirer.prompt([
        {
            type: 'input',
            name: 'pause',
            message: `Presione ${'ENTER'.cyan} para continuar: \n`,
            // default: 'Nothing'
        },
    ])
    .then(answers => {
        console.log(answers.pause);
    })
    // return console.log(pause);
}

const readInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate (value){
            if(value.length === 0){
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc; 
}

const listTaskDelete = async(tasks = [] )  => {
    
    const choices = tasks.map((task, index) => {
        
        const idx = `${index + 1}.`.cyan;

        return { 
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    });
    // console.log(choices);

    choices.unshift({
        value: '0',
        name:'0.'.cyan + 'Cancelar',
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(questions);
    return id;

}

const confirm = async(message) => {

    const question  = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const showCheckList = async(tasks = [] )  => {
    
    const choices = tasks.map((task, index) => {
        
        const idx = `${index + 1}.`.cyan;

        return { 
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: ( task.completedIn ) ? true : false
        }
    });
    // console.log(choices);

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(question);
    return ids;

}

module.exports = {
    inquireMenu,
    pause,
    readInput,
    listTaskDelete,
    confirm,
    showCheckList
}