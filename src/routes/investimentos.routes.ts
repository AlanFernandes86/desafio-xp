import { Router } from 'express';
import investimentoController from '../controllers/investimentos.controller';
import buyOrSellMiddleware from '../middlewares/buyOrSell.middleware';

const router = Router();

router.post('/comprar', buyOrSellMiddleware, investimentoController.buy);
router.post('/vender', buyOrSellMiddleware, investimentoController.sell);
router.get('/ativos', investimentoController.listStocksSeparately);
router.get('/ativos/:codAtivo', investimentoController.getStockByCodAtivo);

export default router;
