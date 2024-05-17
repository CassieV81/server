
import express from "express";
import cors from "cors";
import todos from "./routes/todo.js";


const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/todos', todos);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})