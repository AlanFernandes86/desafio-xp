import { Router } from 'express';
import investimentoController from '../controllers/investimentos.controller';

const router = Router();

router.post('/comprar', investimentoController.buy);
router.post('/vender', investimentoController.sell);
router.get('/ativos', investimentoController.listStocksSeparately);
router.get('/ativos/:codAtivo', investimentoController.getStockByCodAtivo);

export default router;
