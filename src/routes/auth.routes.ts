import { Router } from 'express';
import authController from '../controllers/auth.controller';

const router = Router();

router.post('/new-client', authController.setClient);
// router.post('/login');

export default router;
