// import stockSymbolList from '../data/local/stockSymbolList';
import Stock from '../models/entities/Stock';
import getDataSource from '../models/MySqlDataSource';
import getFullStockData from '../data/network/brapi.api';

const initializeDatabase = async () => {
  const dataSource = await getDataSource();
  const stocks = await dataSource.manager.find(Stock);

  if (stocks.length === 0) {
    getFullStockData();
    // await dataSource.manager.insert(
    //   Stock,
    //   stockSymbolList.map(({ symbol, quantity, shortName }) => (
    //     {
    //       codAcao: symbol,
    //       shortName,
    //       totalQuantity: quantity,
    //       availableQuantity: quantity,
    //     }
    //   )),
    // );
  }
};

export default initializeDatabase;
