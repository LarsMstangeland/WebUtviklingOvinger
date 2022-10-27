import todoApi from "./todo-api";

const port = 3000;
todoApi.listen(port, () => {
    console.info(`Server running on port ${port}`);
});
