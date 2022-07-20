import { Router } from 'express';

import authRouter from './auth.routes';
// import investimentosRouter from './investimentos.routes';
// import contaRouter from './conta.routes';
// import authMiddleware from '../middlewares/auth.middleware';

const routers = Router();

routers.use('/auth', authRouter);

// routers.use('/investimentos', authMiddleware, investimentosRouter);
// routers.use('/conta', authMiddleware,  contaRouter);

export default routers;
