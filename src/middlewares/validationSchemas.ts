import { Joi } from "celebrate";

const createRouteValidationSchema = {
  body: Joi.object().keys({
    origem: Joi.string().required(),
    destino: Joi.string().required(),
    custo: Joi.number().required(),
  }),
};

const findBestRouteValidationSchema = {
  query: Joi.object().keys({
    origem: Joi.string().required(),
    destino: Joi.string().required(),
  }),
};

export { createRouteValidationSchema, findBestRouteValidationSchema };
