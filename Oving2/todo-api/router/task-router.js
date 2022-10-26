import express, { request, response } from "express";
import tasks from "../data";

const taskRouter = express.Router();


//get operations

taskRouter.get('', (request, response) => {
    
    let listid = request.params.listid;

});

taskRouter.get('/:taskid', (request, response) => {

    const id = request.params.taskid
    const task = tasks.find(t => id == t.id)

    if(!task){
        response.status(400).send(`task with id ${id} not found`)
    }
    else{
        response.json(task)
    }

});

//post operations
taskRouter.post('', (request,response) => {

    const task = request.body;

    if( !task.hasOwnProperty('id')||
        !task.hasOwnProperty('title')||
        !task.hasOwnProperty('done')||
        !task.hasOwnProperty('listid')){

        response.status(400).send('A task needs the following properties: id title done and listid')
    }
    if(tasks.find(t => t.id == task.id)){
        response.status(400).send(`A task with id ${task.id} already exists`)
    }
    else{
        tasks.push(task);
        response.status(201);
        response.location('tasks/' + task.id);
        response.send();
    }

});

//delete operation
taskRouter.delete('/:taskid', (request,response) => {
    const id = request.params.id;
    const index = tasks.findIndex(t => t.id == id);

    if(index != -1){
        tasks.splice(index,1);
        response.json(tasks);
    }
    else{
        response.status(404).send(`Failed to delete task with id ${id}. Task not found.`)
    }
});

export default taskRouter;