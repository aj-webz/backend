import { Hono } from "hono";
import { todos } from "./store/todo.store.js";
import  type { Todo,TodoStatus } from "./types/todo.types.js";

const routes = new Hono();


routes.get("/", (c) => {
  return c.json(todos);
});


routes.post("/", async (c) => {
  const data = await c.req.json<Todo>();
  todos.push(data);
  return c.json(data, 201);
});


routes.patch("/:id/status", async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json<{ status: TodoStatus }>();

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return c.json({ message: "Todo not found" }, 404);
  }

  todo.status = body.status;
  todo.completed = body.status === "completed";

  return c.json(todo);
});


routes.delete("/:id", (c) => {
  const { id } = c.req.param();

  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return c.json({ message: "Todo not found" }, 404);
  }

  todos.splice(index, 1);
  return c.body(null, 204);
});

export default routes;
