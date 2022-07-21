import { Router } from 'express';
import contaController from '../controllers/conta.controller';

const router = Router();

router.post('/deposito', contaController.deposit);
router.post('/saque', contaController.withdraw);
// router.get('/ativos/:codCliente');
// router.get('/:codCliente');

export default router;
