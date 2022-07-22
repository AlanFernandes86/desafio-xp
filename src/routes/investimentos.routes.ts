import { Router } from 'express';
import investimentoController from '../controllers/investimento.controller';

const router = Router();

router.post('/comprar', investimentoController.buy);
router.post('/vender', investimentoController.sell);
// router.get('/ativos/:codAtivo');

export default router;
