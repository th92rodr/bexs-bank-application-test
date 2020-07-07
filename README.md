# Bexs Banco Teste

This app has the objective of helping tourists travel around the world, paying the less possible.

To do that, the app will calculate the cheaper route between two locations, so tourists can travel saving money.

All the routes this app has access to will be store in a `csv` file.

This `csv` file follows the format below:

```csv
origem,destino,custo
GRU,BRC,10
BRC,SCL,5
GRU,CDG,75
GRU,SCL,20
GRU,ORL,56
```

---

## Requisites

To run the application, the following programs must be installed:

- `Node.js`<br />
  recommend version 12.18<br />
  minimum required version 8.12<br />

  `Node` can be installed from `https://nodejs.org/en/`.

- `NPM` or `Yarn`<br />

  - `NPM`:<br />
    required version 6.14

    `NPM` will be installed along side Node.

  - `Yarn`:<br />
    required version 1

    `Yarn` can be installed from `https://classic.yarnpkg.com/en/`.

---

## Software Architecture

The API implementation follows some patterns described below.

The **Data Mapper Pattern** ou **Repository Pattern** consists of a link between the application and the font of data been used (which can be a database, a file, or any other source of data).

This pattern aims to isolate the communication with the database.

The **Service Pattern** has the objective of abstracting the business logic of the application.

By using this pattern, the application was able to make the code reusable and easier to maintain.

Each service is the only responsible for a unique operation (which means, if other services need to execute an operation, they will call the service responsible for it and not implement the operation themselves).

Following this pattern, the app is also following the **DRY** principle (Don't Repeat Yourself).

By using these patterns this application was able to achieve the following principles:

- **SoC (Separation of Concerns)**: Esse princípio zela pela separação de responsabilidades de cada arquivo.

- **DRY (Don't Repeat Yourself)**: Esse princípio zela pelo maior reaproveitamento de código. Esse princípio não preza necessariamente pela não-repetição de código e sim regras de negócio.

- **SRP (Single Responsability Principle)**: Esse princípio zela que uma classe deve possuir apenas uma responsabilidade.

---

Summarizing the entities responsibilities:

- Middlewares:

- Controllers: receive requests, repass the request data, and send responses.

- Repositories: deal with data persistence.

- Services: apply business logic.

Utilizing all these concepts the application has reached the following code structure:

### Code Structure

```
src/
-- cli/
---- index.js
-- config/
---- celebrate.ts
-- controllers/
---- routes.controller.ts
-- errors/
---- AppError.ts
-- middlewares/
---- validationSchemas.ts
-- repositories/
---- routes.repository.ts
-- routes/
---- index.ts
-- services/
---- FindBestRoute.service.ts
-- utils/
---- fileOperation.js
---- graph.js
-- __tests__/
---- routes.tests.ts
-- app.ts
-- server.ts
jest.config.js
package.json
tsconfig.json
yarn.lock
input-file.csv
```

---

## Algorithm

In order to always find the best route between two locations, the application implements a **Weighted Graph** Data Structure.

Each node represents a location, each edge a route, and the edge's weight represents the corresponding route's cost.

---

## API

Through the API, it's possible to create new routes (which will be added to the `input-file.csv`), and consult the best route between two locations.

The API expects the `input-file.csv` file to be at the root path of the project's directory.

The API will be running on PORT `3333`.

### Running the API

- Install the project dependencies:

```sh
yarn install
# or
npm install
```

- Build the API:

```sh
yarn build
# or
npm run build
```

- Start the API:

```sh
yarn start
# or
npm start
```

### Endpoints

- `POST /routes`:

  Creates a new route.

  Expected body:

```json
{
    origem: string
    destino: string
    custo: number
}
```

- `GET /routes`:

  Finds the best route between two locations.

  Expected query parameters:

  - origem: string
  - destino: string

  Example of a valid request:

  `GET /routes/?origem=GRU&destino=CDG`

---

## Command Line Interface

Through the CLI, it's possible to consult the best route between two locations informed by the user.

After initialized, the CLI expects user inputs with the following format: `TO-FROM`.

Example:

```sh
Inform origin and destination: GRU-CDG
The best route is: GRU-CDG > 75

Inform origin and destination: BRC-ORL
The best route is: BRC-ORL > 30
```

### Running the Command Line Interface

- Install the project dependencies:

```sh
yarn install
# or
npm install
```

- Run the CLI:

The input file with the routes must be passed as the first argument when running the CLI.

```sh
yarn cli <input-file.csv>
# or
npm run cli <input-file.csv>
```

---

## Testing

- Install the project dependencies:

```sh
yarn install
# or
npm install
```

- Run tests:

```sh
yarn test
# or
npm run test
```

- Run coverage:

```sh
yarn coverage
# or
npm run coverage
```
