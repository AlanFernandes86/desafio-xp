import { Router } from 'express';

import investimentosRouter from './investimentos.routes';
import contaRouter from './conta.routes';
import authMiddleware from '../middlewares/auth.middleware';

const routers = Router();

routers.use('/auth');

routers.use(authMiddleware);

routers.use('/investimentos', investimentosRouter);
routers.use('/conta', contaRouter);

export default routers;
