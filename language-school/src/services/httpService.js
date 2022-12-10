const API_URL = "http://localhost:3000";

export function getClassrooms() {
  return fetch(`${API_URL}/classrooms`).then((response) => response.json());
}

export function getClassroom(id) {
  return fetch(`${API_URL}/classrooms/${id}`).then((response) =>
    response.json()
  );
}

export function getSubjects() {
  return fetch(`${API_URL}/subjects`).then((response) => response.json());
}

export function getTeachers() {
  return fetch(`${API_URL}/teachers`).then((response) => response.json());
}

export function getTeacher(id) {
  return fetch(`${API_URL}/teachers/${id}`).then((response) => response.json());
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

export async function deleteTeacher(id) {
  await fetch(`${API_URL}/teachers/${id}`, {
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

export async function createClassroom(data) {
  await fetch(`${API_URL}/classrooms`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateClassroom(data, id) {
  await fetch(`${API_URL}/classrooms/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function createTeacher(data) {
  await fetch(`${API_URL}/teachers`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updateTeacher(data, id) {
  await fetch(`${API_URL}/teachers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function createTimetable(data) {
  await fetch(`${API_URL}/timetables`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
