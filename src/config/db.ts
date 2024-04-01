import { Sequelize } from 'sequelize';
import User from '../model/user';

const db= new Sequelize('users_database', 'root', 'Neha_sethi20', {
  host: 'localhost',
  dialect: 'mysql'
});

db.sync()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((error) => {
		console.error('Unable to connect to the database:', error);
	});
export default db;
