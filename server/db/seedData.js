const client = require('./client');

async function dropTables() {
  console.log('dropping all tables...');

  try {
    await client.query(`
    DROP TABLE IF EXISTS todos;
    `);
  } catch (error) {
    throw error;
  }
}

async function createTables() {
  try {
    console.log('starting to build tables.....');
    await client.query(`
    CREATE TABLE todos(
      id SERIAL PRIMARY KEY,
      taskName VARCHAR(255) NOT NULL,
      asignee VARCHAR(255) NOT NULL
    );
    `);
    console.log('finished building tables');
  } catch (error) {
    console.log('error building tables!');
    throw error;
  }
}

async function createInitialTodos() {
  console.log('creating todos....');
  try {
    await client.query(
      `INSERT INTO todos(taskName, asignee) VALUES ($1, $2)
    RETURNING *
    `,
      ['buy dog food', 'Cody']
    );

    await client.query(
      `INSERT INTO todos(taskName, asignee) VALUES ($1, $2)
    RETURNING *
    `,
      ['take over the world', 'Pinky & the Brain']
    );

    console.log('finished creating users');
  } catch (error) {
    console.log('problem creting todos');
    throw error;
  }
}

async function rebuildDb() {
  try {
    client.connect();
    await dropTables();
    await createTables();
    await createInitialTodos();
  } catch (error) {
    console.log('error during rebuildDb');
    throw error;
  }
}

module.exports = {
  rebuildDb,
};
