import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTodosAsync = createAsyncThunk('todos/fetchAll', async () => {
  const { data } = await axios.get('http://localhost:8080/api/todos');
  return data;
});

export const addTodoAsync = createAsyncThunk(
  'todos/addTodo',
  async ({ assignee, taskName }) => {
    const { data } = await axios.post('http://localhost:8080/api/todos', {
      assignee,
      taskName,
    });
    return data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    const { data } = await axios.delete(
      `http://localhost:8080/api/todos/${id}`
    );
    return data;
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    // All our data is async so our logic does not go here
    // addTodo: (state, action) => {
    //   state.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      const newState = state.filter((todo) => todo.id !== action.payload.id);
      return newState;
    });
  },
});

// Not needed as we are using extraBuilders
// export const { addTodo } = todosSlice.actions;

export const selectTodos = (state) => state.todos;

export default todosSlice.reducer;
