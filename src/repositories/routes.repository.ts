import AppError from "../errors/AppError";
import {
  addNewRow,
  readInputFile,
  getFilePath,
} from "../utils/fileOperations.js";

interface Route {
  origem: string;
  destino: string;
  custo: number;
}

export default class RoutesRepository {
  private routes: Route[];

  constructor() {
    const file: Route[] | null = readInputFile(getFilePath());

    if (file == null) {
      throw new AppError("Input file do not exists.", 500);
    }

    this.routes = file.map((route) => {
      route.custo = +route.custo;
      return route;
    });
  }

  public all(): Route[] {
    return this.routes;
  }

  public checkOrigin(origem: string): Boolean {
    return this.routes.some((route) => route.origem == origem);
  }

  public checkDestination(destino: string): Boolean {
    return this.routes.some((route) => route.destino == destino);
  }

  public create({ origem, destino, custo }: Route): Route {
    const newRoute: Route = { origem, destino, custo };

    addNewRow(this.routes, newRoute);

    return newRoute;
  }
}
