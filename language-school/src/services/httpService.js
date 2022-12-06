const API_URL = "http://localhost:3004";

export function getClassrooms() {
  return fetch(`${API_URL}/classrooms`).then((response) => response.json());
}

export function getSubjects() {
  return fetch(`${API_URL}/subjects`).then((response) => response.json());
}

export async function deleteClassroom(id) {
  await fetch(`${API_URL}/classrooms/${id}`, {
    method: "DELETE",
  });
}

export async function deleteSubject(id) {
  await fetch(`${API_URL}/subjects/${id}`, {
    method: "DELETE",
  });
}

export async function createSubject(data) {
  await fetch(`${API_URL}/subjects`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}