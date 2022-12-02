import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleTodoAsync = createAsyncThunk(
  "todos/fetchSingleTodo",
  async (todoId) => {
    const { data } = await axios.get(
      `http://localhost:8080/api/todos/${todoId}`
    );
    return data;
  }
);

export const editTodoAsync = createAsyncThunk(
  "todos/editTodo",
  async ({ id, assignee, taskName }) => {
    const { data } = await axios.put(`http://localhost:8080/api/todos/${id}`, {
      assignee,
      taskName,
    });
    console.log("After axios put");
    return data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (id) => {
    const { data } = await axios.delete(
      `http://localhost:8080/api/todos/${id}`
    );
    return data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleTodoAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(editTodoAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      return {};
    });
  },
});

export const selectTodo = (state) => state.todo;

export default todoSlice.reducer;
