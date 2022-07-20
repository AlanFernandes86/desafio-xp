import { Router } from 'express';

const router = Router();

router.post('/comprar');
router.post('/vender');
router.get('/ativos/:codAtivo');

export default router;
