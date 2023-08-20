import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTeacher,
  getTeachers,
  updateTeacher,
} from "../../services/httpService";

export interface TeacherDTO {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface TeacherEntity extends TeacherDTO {
  id: string;
}

interface TeacherState {
  teachers: TeacherEntity[];
}

const initialState: TeacherState = {
  teachers: [],
};

export const getTeachersThunk = createAsyncThunk(
  "getTeachers",
  async (thunkApi) => {
    return await getTeachers();
  }
);

export const createTeacherThunk = createAsyncThunk(
  "createTeacher",
  async (newTeacher: TeacherDTO, thunkApi) => {
    return await createTeacher(newTeacher);
  }
);

export const updateTeacherThunk = createAsyncThunk(
  "updateTeacher",
  async (teacher: TeacherEntity, thunkApi) => {
    return await updateTeacher(teacher as TeacherDTO, teacher.id);
  }
);

export const TeacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeachersThunk.fulfilled, (state, { payload }) => {
      state.teachers = payload;
    });
  },
});
