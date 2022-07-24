import Joi from 'joi';
import customJoiMessages from '../utils/customJoiMessages';

export default Joi.object({
  codCliente: Joi.number().min(1).required()
    .messages(customJoiMessages('codCliente', 1)),

  codAtivo: Joi.number().min(1).required()
    .messages(customJoiMessages('codAtivo', 1)),

  qtdeAtivo: Joi.number().min(1).required()
    .messages(customJoiMessages('qtdeAtivo', 1)),
});
