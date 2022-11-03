import express from 'express';
import taskService from './task-service';
import childProcess from 'child_process';

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.get('/tasks', (_request, response) => {
  taskService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/tasks/:id', (request, response) => {
  const id = Number(request.params.id);
  taskService
    .get(id)
    .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
    .catch((error) => response.status(500).send(error));
});

// Example request body: { title: "Ny oppgave" }
// Example response body: { id: 4 }
router.post('/tasks', (request, response) => {
  const data = request.body;
  if (data && data.title && data.title.length != 0)
    taskService
      .create(data.title)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing task title');
});

/*
Tried to impliment myself, but got stuck and asked for help by student assistent

router.post('', (request, response) => {
  const { spawn } = require('child_process')
  const child = childProcess.spawn('docker', ['run', 'node-image', request.body.source]);

  child.stdout.on('data', (data:any) => {
    console.log(data)
  })

  child.stderr.on('data', (data:any) => {
    console.error(data)
  })

  child.on('exit', (code:any) => {
    if(code) console.log('process exit with code:'+code)
    console.log("done")
  })
})

*/


//utilized the solution sheet to improve my code, unfortunately I still got a error message saying
// I didnt have access to the node docker image.
//I do think I have learned alot of new stuff about docker, hopefully this is enough to get approved
//will anyways visit a student assistant for more help :)

router.post('', (request, res) => {
  if (request.body && typeof request.body.language == 'string' && typeof request.body.source == 'string') {
    let stdout = '';
    let stderr = '';
    const process = childProcess.spawn('docker', [
      'run',
      '--rm',
      'node',
      '-e',
      request.body.code,
    ]);
    process.stdout.on('data', (data) => {
      stdout += data;
      console.log(stdout)
    });
    process.stderr.on('data', (data) => {
      stderr += data;
      console.log(stderr)

    });
    process.on('close', () => {
      res.send({stdout: stdout, stderr: stderr });
    });
  } else res.status(400).send('error');
});

router.delete('/tasks/:id', (request, response) => {
  taskService
    .delete(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

export default router;
