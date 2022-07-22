import { Router } from 'express';
import contaController from '../controllers/conta.controller';

const router = Router();

router.post('/deposito', contaController.deposit);
router.post('/saque', contaController.withdraw);
router.get('/ativos/:codClient', contaController.getWalletByCodClient);
router.get('/:codClient', contaController.getAccountByCodClient);

export default router;
