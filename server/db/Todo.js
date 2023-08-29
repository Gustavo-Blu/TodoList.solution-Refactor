const client = require('./client');

// module.exports = Todo;

async function getTodos() {
  try {
    const {
      rows: [todos],
    } = await client.query(`
      SELECT * FROM todos;
    `);
    return todos;
  } catch (error) {
    throw error;
  }
}
async function getTodosById(id) {
  try {
    const { rows } = await client.query(
      `
      SELECT * FROM todos
      WHERE id = $1
    `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
async function createTodo({ taskName, asignee }) {
  try {
    const {
      rows: [todo],
    } = await client.query(
      `INSERT INTO todos(taskName, asignee) VALUES ($1, $2)
    RETURNING *
    `,
      [taskName, asignee]
    );
    return todo;
  } catch (error) {
    throw error;
  }
}
async function updateTodo({ id, ...feilds }) {}
async function deleteTodo(id) {}

module.exports = {};
