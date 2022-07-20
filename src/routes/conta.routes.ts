import { Router } from 'express';

const router = Router();

router.post('/deposito');
router.post('/saque');
router.get('/ativos/:codCliente');
router.get('/:codCliente');

export default router;
