import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchTodosAsync } from '../todos/todosSlice';
import {
  fetchSingleTodoAsync,
  selectTodo,
  editTodoAsync,
  deleteTodoAsync,
} from './todoSlice';

const EditTodo = () => {
  const dispatch = useDispatch();
  const todo = useSelector(selectTodo);
  const { id } = useParams();

  const Navigate = useNavigate();

  const [taskName, setTaskName] = useState('');
  const [assignee, setAssignee] = useState('');

  useEffect(() => {
    dispatch(fetchSingleTodoAsync(id));
  }, [dispatch, id]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await dispatch(editTodoAsync({ id, taskName, assignee }));
    Navigate('/');
  };

  const handleDelete = async () => {
    await dispatch(deleteTodoAsync(id));
    Navigate('/');
  };

  return (
    <>
      <li key={todo.id}>
        <h2>
          <Link to={`/todos/${todo.id}`}>Task: {todo.taskName}</Link>
        </h2>
        <p>assigned by {todo.assignee}</p>
      </li>
      <form id="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="taskName">Task Name:</label>
        <input
          name="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label htmlFor="assignee">Assign To:</label>
        <input
          name="assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <div className="button-box">
          <button type="submit">Edit</button>

          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
      <div className="delete-button">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
};

export default EditTodo;
