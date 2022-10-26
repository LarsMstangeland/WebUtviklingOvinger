import express, { request, response } from 'express';
import taskRouter from './router/task-router';
import listRouter from './router/list-router';

const app = express();
app.use(express.json());

const PORT = 3000;


app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/lists', listRouter);

/*
app.get('/api/v1/tasks', (request,response) => {
    response.json(tasks)
});


app.get('/api/v1/tasks/:id', (request, response) => {
    const id = request.params.id;
    const task = tasks.find(t => t.id == id);
    if(task){
        response.json(task);
    }
    else{
        response.status(404).send(`task with id ${id} not found`);
    }
});

app.post('/api/v1/tasks', (request, response) => {
    const task = request.body;

    if( !task.hasOwnProperty('id') || 
        !task.hasOwnProperty('title') ||
        !task.hasOwnProperty('done')){

            response.status(400).send('A task needs the following properties: id title and done')
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


app.delete('/api/v1/tasks/:id', (request,response) => {
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
*/

app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});