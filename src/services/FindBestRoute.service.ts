import Graph from "../utils/graph.js";
import AppError from "../errors/AppError";
import RoutesRepository from "../repositories/routes.repository";

interface Request {
  origem: string;
  destino: string;
}

interface BestRouteResponse {
  path: string[];
  cost: number;
}

export default class FindBestRouteService {
  public execute({ origem, destino }: Request): string {
    const routesRepository = new RoutesRepository();

    if (
      !routesRepository.checkOrigin(origem) ||
      !routesRepository.checkDestination(destino)
    ) {
      throw new AppError("Invalid origin or destination.", 400);
    }

    const routes = routesRepository.all();

    const graph = new Graph();

    routes.forEach((route) => {
      graph.addEdge(route.origem, route.destino, route.custo);
    });

    graph.printGraph();

    const bestRoute: BestRouteResponse | null = graph.shortestPath(
      origem,
      destino
    );

    if (bestRoute == null) {
      throw new AppError("There is no path between these two locations.", 400);
    }

    return this.prepareResponseString(bestRoute);
  }

  private prepareResponseString({ path, cost }: BestRouteResponse): string {
    let data = "";
    path.forEach((place) => {
      data = data + place + "-";
    });
    data = data.slice(0, -1);
    data = data + " > " + cost;

    return data;
  }
}
