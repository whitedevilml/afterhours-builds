import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * File-backed task store. Safe for single-process local/dev use.
 */
export class TaskStore {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async _read() {
    try {
      const raw = await fs.readFile(this.filePath, "utf8");
      return JSON.parse(raw);
    } catch (e) {
      if (e.code === "ENOENT") return { tasks: [] };
      throw e;
    }
  }

  async _write(data) {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), "utf8");
  }

  async list() {
    const data = await this._read();
    return [...data.tasks].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  async create(title) {
    const trimmed = String(title ?? "").trim();
    if (!trimmed) {
      const err = new Error("title required");
      err.status = 400;
      throw err;
    }
    const data = await this._read();
    const task = {
      id: randomUUID(),
      title: trimmed,
      done: false,
      createdAt: new Date().toISOString(),
    };
    data.tasks.push(task);
    await this._write(data);
    return task;
  }

  async update(id, patch) {
    const data = await this._read();
    const i = data.tasks.findIndex((t) => t.id === id);
    if (i === -1) {
      const err = new Error("not found");
      err.status = 404;
      throw err;
    }
    const t = data.tasks[i];
    if (typeof patch.done === "boolean") t.done = patch.done;
    if (patch.title !== undefined) {
      const trimmed = String(patch.title).trim();
      if (!trimmed) {
        const err = new Error("title cannot be empty");
        err.status = 400;
        throw err;
      }
      t.title = trimmed;
    }
    await this._write(data);
    return t;
  }

  async remove(id) {
    const data = await this._read();
    const next = data.tasks.filter((t) => t.id !== id);
    if (next.length === data.tasks.length) {
      const err = new Error("not found");
      err.status = 404;
      throw err;
    }
    await this._write({ tasks: next });
  }
}
