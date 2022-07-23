import app from './app';
import initializeDatabase from './helpers/initializeDatabase';

const PORT = process.env.PORT || 3001;

const main = async () => {
  await initializeDatabase();
};

main();

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

export default server;
