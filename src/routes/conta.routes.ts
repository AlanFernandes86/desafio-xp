import { Router } from 'express';
import contaController from '../controllers/conta.controller';
import depositOrWithdrawMiddleware from '../middlewares/depositOrWithdraw.middleware';

const router = Router();

router.post('/deposito', depositOrWithdrawMiddleware, contaController.deposit);
router.post('/saque', depositOrWithdrawMiddleware, contaController.withdraw);
router.get('/ativos/:codClient', contaController.getWalletByCodClient);
router.get('/:codClient', contaController.getAccountByCodClient);

export default router;
