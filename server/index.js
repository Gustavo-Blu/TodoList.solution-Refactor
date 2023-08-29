const { blueBright } = require('chalk');
const PORT = process.env.PORT || 8080;
const app = require('./app');
const client = require('./db/client');

const init = async () => {
  client.connect();

  app.listen(PORT, () =>
    console.log(blueBright(`Listening at http://localhost:${PORT}`))
  );
};

init();
