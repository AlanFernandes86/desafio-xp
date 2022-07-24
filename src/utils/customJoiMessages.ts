import Joi from 'joi';

export default (key: string, min?: number): Joi.LanguageMessages => ({
  'number.base': `"${key}" deve ser um número.`,
  'number.min': `"${key}" não pode ser menor que ${min}.`,
  'any.required': `"${key}" é obrigatório.'`,
});
