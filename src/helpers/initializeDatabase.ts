import Stock from '../models/entities/Stock';
import getDataSource from '../models/MySqlDataSource';

const initializeDatabase = async () => {
  const dataSource = await getDataSource();
  const stocks = await dataSource.getRepository(Stock).query('SELECT * FROM Stock');
  console.log(stocks);
};

export default initializeDatabase;
