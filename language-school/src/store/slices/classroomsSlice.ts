import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createClassroom, getClassrooms, updateClassroom } from "../../services/httpService";

export interface ClassroomDTO {
  classroom: number;
  description: string;
}

export interface ClassroomEntity extends ClassroomDTO {
  id: string;
}
interface ClassroomState {
  classrooms: ClassroomEntity[];
}

const initialState: ClassroomState = {
  classrooms: [],
};

export const getClassroomsThunk = createAsyncThunk(
  "getClassrooms",
  async (thunkApi) => {
    return await getClassrooms();
  }
);

export const createClassroomThunk = createAsyncThunk(
  "createClassroom",
  async (newClassroom: ClassroomDTO, thunkApi) => {
    return await createClassroom(newClassroom);
  }
);

export const updateClassroomThunk = createAsyncThunk(
  "updateClassroom",
  async (classroom: ClassroomEntity, thunkApi) => {
    return await updateClassroom(classroom as ClassroomDTO, classroom.id);
  }
);

export const ClassroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClassroomsThunk.fulfilled, (state, { payload }) => {
      state.classrooms = payload;
    });
  },
});
