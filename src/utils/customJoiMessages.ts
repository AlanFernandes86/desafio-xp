import Joi from 'joi';

export default (key: string, min?: number): Joi.LanguageMessages => ({
  'number.base': `"${key}" deve ser um número.`,
  'number.min': `"${key}" não pode ser menor que ${min}.`,
  'string.base': `"${key}" deve ser uma string.`,
  'string.min': `"${key}" não pode ter menos que ${min} caracteres.`,
  'any.required': `"${key}" é obrigatório.'`,
});
