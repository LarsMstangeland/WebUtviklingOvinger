import express from "express";
import taskService from "./task-service";

const app = express();

app.use(express.json());

app.get("/api/v1/tasks", (request, response) => {
    taskService
        .getAll()
        .then((rows) => response.json(rows))
        .catch((error) => response.status(500).send(error));
});

app.get("/api/v1/tasks/:id", (request, response) => {
    const id = request.params.id;
    taskService
        .get(id)
        .then((row) => {
            if (row.length === 0) {
                response.status(404).send(`Task with id ${id} not found.`);
            } else {
                response.json(row);
            }
        })
        .catch((error) => response.status(500).send(error));
});

app.post("/api/v1/tasks", (request, response) => {
    const task = request.body;
    if (!task.hasOwnProperty("id") || !task.hasOwnProperty("title") || !task.hasOwnProperty("done")) {
        response.status(400).send("A task needs the following properties: id, title and done.");
    } else {
        taskService
            .create(task)
            .then((result) => {
                response.status(201);
                response.location("tasks/" + task.id);
                response.send();
            })
            .catch((error) => response.status(500).send(error));
    }
});

app.delete("/api/v1/tasks/:id", (request, response) => {
    const id = request.params.id;

    taskService
        .delete(id)
        .then((result) => response.status(200).send())
        .catch((error) => response.status(500).send(error));
});
export default app;
