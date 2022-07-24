import Joi from 'joi';
import customJoiMessages from '../utils/customJoiMessages';

export default Joi.object({
  name: Joi.string().min(2).required()
    .messages(customJoiMessages('name', 2)),

  username: Joi.string().min(6).required()
    .messages(customJoiMessages('username', 6)),

  password: Joi.string().min(1).required()
    .messages(customJoiMessages('password', 1)),
});
