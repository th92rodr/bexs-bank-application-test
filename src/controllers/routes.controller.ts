import { Request, Response } from 'express';

import AppError from '../errors/AppError';
import RoutesRepository from '../repositories/routes.repository';
import FindBestRouteService from '../services/FindBestRoute.service';

export default class RoutesController {
  public async create(request: Request, response: Response) {
    try {
      const { origem, destino, custo } = request.body;

      const routesRepository = new RoutesRepository();

      const route = routesRepository.create({
        origem,
        destino,
        custo,
      });

      return response.json(route);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ message: error.message });
      }
      return response.status(500).json({ message: error.message });
    }
  }

  public async findBestRoute(request: Request, response: Response) {
    try {
      const origem = request.query.origem as string;
      const destino = request.query.destino as string;

      const findBestRouteService = new FindBestRouteService();

      const bestRoute: string = findBestRouteService.execute({
        origem,
        destino,
      });

      return response.json(bestRoute);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({ message: error.message });
      }
      return response.status(500).json({ message: error.message });
    }
  }
}
