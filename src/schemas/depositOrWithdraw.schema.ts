import Joi from 'joi';
import customJoiMessages from '../utils/customJoiMessages';

export default Joi.object({
  codCliente: Joi.number().required()
    .messages(customJoiMessages('codCliente')),

  valor: Joi.number().required()
    .messages(customJoiMessages('valor')),
});
