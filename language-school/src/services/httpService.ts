import axios from "axios";
import { TeacherDTO, TeacherEntity } from "../store/slices/teacherSlice";

const API_URL = "http://localhost:3000";

//------------------------------------Teachers------------------------------------
export function getTeachers(): Promise<TeacherEntity[]> {
  return axios
    .get(`${API_URL}/teachers`)
    .then((response) => response.data as TeacherEntity[]);
}

export function getTeacher(id) {
  return axios
    .get(`${API_URL}/teachers/${id}`)
    .then((response) => response.data);
}

export async function deleteTeacher(id) {
  await axios.delete(`${API_URL}/teachers/${id}`);
}

export async function createTeacher(data: TeacherDTO) {
  await axios.post(`${API_URL}/teachers`, JSON.stringify(data));
}

export async function updateTeacher(data: TeacherDTO , id: string) {
  await axios.put(`${API_URL}/teachers/${id}`, JSON.stringify(data));
}
//------------------------------------------------------------------

//------------------------------------Classroms------------------------------------
export function getClassrooms() {
  return axios.get(`${API_URL}/classrooms`).then((response) => {
    return response.data;
  });
}

export function getClassroom(id) {
  return axios
    .get(`${API_URL}/classrooms/${id}`)
    .then((response) => response.data);
}

export async function deleteClassroom(id) {
  await axios.delete(`${API_URL}/classrooms/${id}`);
}

export async function createClassroom(data) {
  await axios.post(`${API_URL}/classrooms`, JSON.stringify(data));
}

export async function updateClassroom(data, id) {
  await axios.put(`${API_URL}/classrooms/${id}`, JSON.stringify(data));
}
//------------------------------------------------------------------

//------------------------------------Subjcets------------------------------------
export function getSubjects() {
  return axios.get(`${API_URL}/subjects`).then((response) => response.data);
}

export function getSubject(id) {
  return axios
    .get(`${API_URL}/subjects/${id}`)
    .then((response) => response.data);
}

export async function deleteSubject(id) {
  await axios.delete(`${API_URL}/subjects/${id}`);
}

export async function createSubject(data) {
  await axios.post(`${API_URL}/subjects`, JSON.stringify(data));
}

export async function updateSubject(data, id) {
  await axios.put(`${API_URL}/subjects/${id}`, JSON.stringify(data));
}
//------------------------------------------------------------------

//------------------------------------Timetables------------------------------------
export async function deleteTimetable(id) {
  await axios.delete(`${API_URL}/timetables/${id}`);
}

export async function createTimetable(data) {
  await axios.post(`${API_URL}/timetables`, JSON.stringify(data));
}

export function getTimetables() {
  return axios.get(`${API_URL}/timetables`).then((response) => response.data);
}

export function getTimetable(id) {
  return axios
    .get(`${API_URL}/timetables/${id}`)
    .then((response) => response.data);
}

export async function updateTimetable(data, id) {
  await axios.put(`${API_URL}/timetables/${id}`, JSON.stringify(data));
}
//------------------------------------------------------------------