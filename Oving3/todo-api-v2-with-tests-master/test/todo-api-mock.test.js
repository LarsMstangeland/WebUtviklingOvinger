import axios from "axios";
import todoApi from "../todo-api";
import taskService from "../task-service";

axios.defaults.baseURL = "http://localhost:3001";

jest.mock("../task-service");

const testData = [
    { id: 1, title: "Les leksjon", done: 1 },
    { id: 2, title: "Møt opp på forelesning", done: 0 },
    { id: 3, title: "Gjør øving", done: 0 },
];

let webServer;
beforeAll(() => webServer = todoApi.listen(3001));
afterAll(() => webServer.close());

describe("Fetch tasks (GET)", () => {
    test("Fetch all tasks (200 OK)", async () => {
        taskService.getAll = jest.fn(() => Promise.resolve(testData));

        const response = await axios.get("/api/v1/tasks");
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testData);
    });

    test("Fetch task (200 OK)", async () => {
        //todo
        let taskid = 1
        taskService.get = jest.fn(() => Promise.resolve(testData[taskid]));

        const response = await axios.get("/api/v1/tasks/"+taskid);
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testData[taskid]);
    });

    test("Fetch all tasks (500 Internal Server Error)", async () => {
        //todo

        taskService.getAll = jest.fn(() => Promise.reject());

        try {
            const response = await axios.get("/api/v1/tasks");

        } catch (error) {
            expect(error.response.status).toEqual(500);
        }
    });

    test("Fetch task (404 Not Found)", async () => {
        //todo


        taskService.get = jest.fn(() => Promise.resolve());

        try {
            const response = await axios.get("DårligSti");

        } catch (error) {
            expect(error.response.status).toEqual(404);
        }
    });

    test("Fetch task (500 Internal Server error)", async () => {
        //todo

        let taskid = 1
        taskService.get = jest.fn(() => Promise.reject());

        try {
            const response = await axios.get("/api/v1/tasks/" + taskid);

        } catch (error) {
            expect(error.response.status).toEqual(500);
        }
    });
});

describe("Create new task (POST)", () => {
    test("Create new task (201 Created)", async () => {
        //todo
        const task = {

            id: 2,
            title: " bra",
            done: false

        }
        taskService.create = jest.fn(() => Promise.resolve(task));

        const response = await axios.post("/api/v1/tasks", task);
        expect(response.status).toEqual(201);
        expect(response.headers.location).toEqual("tasks/" + task.id);

    });

    test("Create new task (400 Bad Request)", async () => {
        //todo
        let task = "e"
        taskService.create = jest.fn(() => Promise.resolve(task));

        try {
            const response = await axios.post("/api/v1/tasks", task);

        } catch (error) {
            expect(error.response.status).toEqual(400);

        }
    });

    test("Create new task (500 Internal Server error)", async () => {
        //todo

        let task = {

            id: 2,
            title: " bra",
            done: false

        }
        taskService.create = jest.fn(() => Promise.reject(task));

        try {
            const response = await axios.post("/api/v1/tasks", task);

        } catch (error) {
            expect(error.response.status).toEqual(500);

        }
    });
});

describe("Delete task (DELETE)", () => {
    test("Delete task (200 OK)", async () => {

        let taskid = 2

        taskService.delete = jest.fn(() => Promise.resolve(taskid));

        const response = await axios.delete("/api/v1/tasks/2");

        expect(response.status).toEqual(200);
    });
});
