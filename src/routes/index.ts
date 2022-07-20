import { Router } from 'express';

import investimentosRouter from './investimentos.routes';
import contaRouter from './conta.routes';

const routers = Router();

routers.use('/investimentos', investimentosRouter);
routers.use('/conta', contaRouter);

export default routers;
