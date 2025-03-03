const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let todos = [];
let currentIndex = 0;

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post("/api/todos", (req, res) => {
  const { firstName, lastName, status } = req.body;
  const newTodo = {
    id: currentIndex++,
    firstName,
    lastName,
    status,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// Update an existing todo
app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, status } = req.body;

  const index = todos.findIndex(todo => todo.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos[index] = { ...todos[index], firstName, lastName, status };
  res.json(todos[index]);
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.json({ message: "Todo deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
