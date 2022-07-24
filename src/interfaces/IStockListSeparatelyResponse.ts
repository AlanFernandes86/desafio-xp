import IStock from './IStock';

interface IStockListSeparatelyReponse {
  purchased: IStock[];
  available: IStock[];
}

export default IStockListSeparatelyReponse;
