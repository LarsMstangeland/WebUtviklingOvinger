import express, { request, response } from "express";
import lists from "../datalist";
import tasks from "../data";
import taskRouter from "./task-router";

const listRouter = express.Router();

listRouter.get('/:listid', (request, response) => {

    const id = request.params.listid
    const list = lists.find(li => id == li.id)


    if(!list){
        response.status(400).send(`task with id ${id} not found`)
    }
    else{
        response.json(list)
    }
});

listRouter.get('/:listid/tasks', (request,response) => {
    let listid = request.params.listid;
    let filteredtasks = tasks.filter(task => task.listid == listid);
    
    if(filteredtasks.length == 0){
        response.status(400).send(`No list with id ${listid} found`)   
    }
    else{
        response.json(filteredtasks)

    }
});


listRouter.get('/:listid/tasks/:tasksid', (request, response) => {

    let listid = request.params.listid;
    let taskid = request.params.tasksid
    let filteredtasks = tasks.filter(task => task.listid == listid);
    let filteredtask = filteredtasks.find(task => taskid == task.id);

      
    if(filteredtasks.length == 0){
        response.status(400).send(`No list with id ${listid} found`)   
    }
    if(!filteredtask){
        response.status(400).send(`No task with id ${taskid} in list with id ${listid} found`)   
    }

    else{
        response.json(filteredtasks)

    }
});

listRouter.post('', (request, response) => {

    const newlist = request.body;

    if(!newlist.hasOwnProperty('id') || !newlist.hasOwnProperty('title')){
        response.status(400).send(`List needs to contain id and title`)
    }
    if(lists.find(l => l.id == newlist.id)){
        response.status(400).send(`cannot add a duplicate list`)
    }
    else{
        lists.push(newlist);
        response.send(201);
        response.location('/'+newlist.id);
        response.send();
    }
});


listRouter.post('/:listid/tasks', (request, response) => {

    const newtask = request.body;
    const listid = request.params.listid;

    if(!newtask.hasOwnProperty('id') || !newtask.hasOwnProperty('title') || !newtask.hasOwnProperty('done') || !newtask.hasOwnProperty('listid')){
        response.status(400).send(`List needs to contain id, title, done and listid`)
    }
    if(tasks.find(t => t.id == newtask.id)){
        response.status(400).send(`cannot add a duplicate task in list`)
    }
    else{
        tasks.push(newtask);
        response.send(201);
        response.location('/'+newtask.id);
        response.send();
    }
});



listRouter.delete('/:listid', (request,response) => {
    const id = request.params.listid;
    const list = lists.findIndex(l => l.id == id);

    if(list != -1){
        lists.splice(list,1);
        response.json(lists);
    }
    else{

        response.status(404).send(`Failed to delete list with id ${id}. List not found.`)
    }
});

listRouter.delete('/:listid/tasks/:taskid', (request, response) => {
    const listid = request.params.listid;
    const taskid = request.params.taskid;

    const taskinlist = tasks.find(task => task.id == taskid && task.listid == listid)

    if(taskinlist != -1){
        tasks.splice(taskinlist, 1)
        response.json(tasks)
    }
    else{
        response.status(404).send(`Failed to delete task with id ${taskid} In list ${listid}.`)

    }

})

//listRouter.use('/:listid/tasks',taskRouter)


export default listRouter;