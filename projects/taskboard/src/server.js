import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TaskStore } from "./tasks.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const store = new TaskStore(path.join(root, "data", "tasks.json"));

const app = express();
app.use(express.json({ limit: "32kb" }));
app.use(express.static(path.join(root, "public")));

function sendError(res, err) {
  const status = err.status ?? 500;
  res.status(status).json({ error: err.message ?? "server error" });
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "taskboard" });
});

app.get("/api/tasks", async (_req, res) => {
  try {
    res.json({ tasks: await store.list() });
  } catch (e) {
    sendError(res, e);
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const task = await store.create(req.body?.title);
    res.status(201).json(task);
  } catch (e) {
    sendError(res, e);
  }
});

app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const task = await store.update(req.params.id, req.body ?? {});
    res.json(task);
  } catch (e) {
    sendError(res, e);
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await store.remove(req.params.id);
    res.status(204).end();
  } catch (e) {
    sendError(res, e);
  }
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`taskboard listening on http://127.0.0.1:${PORT}`);
});
