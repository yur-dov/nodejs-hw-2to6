const app = require('./app');
const mongoose = require('mongoose');

const { DB_URL, PORT = 3000 } = process.env;

mongoose
  .connect(DB_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log('Database connection successful kisskiss');
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
