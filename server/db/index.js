const conn = require('./conn');
const Todo = require('./Todo');

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });

    await Todo.create({
      taskName: 'Buy dog food',
      assignee: 'Cody',
    });

    await Todo.create({
      taskName: 'Take over world',
      assignee: 'Cody',
    });

    console.log(`
      Seeding successful!
      `);
  } catch (error) {
    console.log(error);
    console.log('seeding was not successful');
  }
};

module.exports = {
  conn,
  syncAndSeed,
  models: {
    Todo,
  },
};
