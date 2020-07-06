import { Router } from "express";
import { celebrate } from "celebrate";

import {
  createRouteValidationSchema,
  findBestRouteValidationSchema,
} from "../middlewares/validationSchemas";
import celebrateConfig from "../config/celebrate";
import RoutesController from "../controllers/routes.controller";

const routes = Router();

const routesController = new RoutesController();

routes.get(
  "/routes",
  celebrate(findBestRouteValidationSchema, celebrateConfig),
  routesController.findBestRoute
);

routes.post(
  "/routes",
  celebrate(createRouteValidationSchema, celebrateConfig),
  routesController.create
);

export default routes;
