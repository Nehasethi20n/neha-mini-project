import express from 'express';
import { Sequelize } from 'sequelize';

const db= new Sequelize('user_database', 'root', 'Neha_sethi20', {
  host: 'localhost',
  dialect: 'mysql'
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Welcome to my page');
});
export default app;