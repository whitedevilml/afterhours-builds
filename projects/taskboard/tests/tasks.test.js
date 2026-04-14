import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { TaskStore } from "../src/tasks.js";

test("TaskStore create and list", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "tb-"));
  const store = new TaskStore(path.join(dir, "tasks.json"));
  const a = await store.create(" First ");
  assert.equal(a.title, "First");
  assert.equal(a.done, false);
  const list = await store.list();
  assert.equal(list.length, 1);
  await fs.rm(dir, { recursive: true });
});

test("TaskStore update and remove", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "tb-"));
  const file = path.join(dir, "tasks.json");
  const store = new TaskStore(file);
  const t = await store.create("x");
  const u = await store.update(t.id, { done: true });
  assert.equal(u.done, true);
  await store.remove(t.id);
  assert.equal((await store.list()).length, 0);
  await fs.rm(dir, { recursive: true });
});

test("TaskStore rejects empty title", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "tb-"));
  const store = new TaskStore(path.join(dir, "tasks.json"));
  await assert.rejects(() => store.create("   "), (e) => e.status === 400);
  await fs.rm(dir, { recursive: true });
});
