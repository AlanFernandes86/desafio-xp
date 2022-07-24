import Joi from 'joi';
import customJoiMessages from '../utils/customJoiMessages';

export default Joi.object({
  username: Joi.string().min(6).required()
    .messages(customJoiMessages('username', 6)),

  password: Joi.string().min(6).required()
    .messages(customJoiMessages('password', 6)),
});
