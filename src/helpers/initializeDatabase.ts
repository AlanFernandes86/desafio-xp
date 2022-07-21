import stockSymbolList from '../data/local/stockSymbolList';
import Stock from '../models/entities/Stock';
import getDataSource from '../models/MySqlDataSource';
import getFullStockData from '../data/network/brapi.api';

const initializeDatabase = async () => {
  const dataSource = await getDataSource();
  const stocks = await dataSource.manager.find(Stock);

  if (stocks.length === 0) {
    try {
      console.log('Banco de dados vazio! Inserindo dados das ações no banco de dados, aguarde...');

      const stockList = await getFullStockData();

      const stocksWithQuantities = stockList.map(
        (stock) => {
          const stockSymbol = stockSymbolList.find(({ symbol }) => symbol === stock.symbol);
          return {
            codAcao: stock.symbol,
            shortName: stock.shortName || stock.symbol,
            longName: stock.longName || stock.symbol,
            marketPrice: stock.regularMarketPrice || 0,
            marketDayLow: stock.regularMarketDayLow || 0,
            marketDayHigh: stock.regularMarketDayHigh || 0,
            marketChange: stock.regularMarketChange || 0,
            marketChangePercent: stock.regularMarketChangePercent || 0,
            marketTime: stock.regularMarketTime || new Date(Date.now()),
            totalQuantity: stockSymbol?.quantity || 10000,
            availableQuantity: stockSymbol?.quantity || 10000,
            companyLogoUrl: stock.logourl || '',
          };
        },
      );

      await dataSource.manager.insert(
        Stock,
        stocksWithQuantities,
      );

      console.log('Dados inseridos com sucesso');
    } catch (error: any) {
      console.log('Error ao inserir dados', error.message);
    }
  }
};

export default initializeDatabase;
