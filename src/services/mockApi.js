import axios from "axios";

const client = axios.create({
  baseURL: "/mock-api",
  timeout: 4000,
});

function simulateDelay(payload, delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), delay);
  });
}

export async function fetchTasksMock(tasks) {
  await client.get("/tasks").catch(() => null);
  return simulateDelay(tasks, 600);
}

export async function saveTaskMock(task) {
  await client.post("/tasks", task).catch(() => null);
  return simulateDelay(task, 400);
}

export async function deleteTaskMock(id) {
  await client.delete(`/tasks/${id}`).catch(() => null);
  return simulateDelay({ ok: true, id }, 350);
}

export async function saveNoteMock(note) {
  await client.post("/notes", { note }).catch(() => null);
  return simulateDelay({ note }, 300);
}
