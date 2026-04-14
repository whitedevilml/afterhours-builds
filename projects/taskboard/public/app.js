const listEl = document.getElementById("list");
const formEl = document.getElementById("add-form");
const errEl = document.getElementById("err");

function showError(msg) {
  errEl.textContent = msg;
  errEl.hidden = !msg;
}

async function api(path, opts = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", ...opts.headers },
    ...opts,
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText || "Request failed");
  return data;
}

function li(task) {
  const item = document.createElement("li");
  item.className = "item" + (task.done ? " done" : "");
  item.dataset.id = task.id;

  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.className = "toggle";
  cb.checked = task.done;
  cb.title = "Mark done";
  cb.addEventListener("change", async () => {
    try {
      showError("");
      await api(`/api/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ done: cb.checked }),
      });
      await load();
    } catch (e) {
      showError(e.message);
      cb.checked = task.done;
    }
  });

  const span = document.createElement("span");
  span.className = "title";
  span.textContent = task.title;

  const del = document.createElement("button");
  del.type = "button";
  del.className = "del";
  del.textContent = "Remove";
  del.addEventListener("click", async () => {
    try {
      showError("");
      await api(`/api/tasks/${task.id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      showError(e.message);
    }
  });

  item.append(cb, span, del);
  return item;
}

async function load() {
  showError("");
  const { tasks } = await api("/api/tasks");
  listEl.replaceChildren(...tasks.map(li));
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("title");
  const title = input.value;
  try {
    showError("");
    await api("/api/tasks", { method: "POST", body: JSON.stringify({ title }) });
    input.value = "";
    await load();
  } catch (err) {
    showError(err.message);
  }
});

load().catch((e) => showError(e.message));
