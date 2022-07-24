import { Router } from 'express';
import authController from '../controllers/auth.controller';
import loginMiddleware from '../middlewares/login.middleware';
import newClientMiddleware from '../middlewares/newClient.middleware';

const router = Router();

router.post('/new-client', newClientMiddleware, authController.setClient);
router.post('/login', loginMiddleware, authController.login);

export default router;
