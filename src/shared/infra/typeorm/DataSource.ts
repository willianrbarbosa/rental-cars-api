import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker_rentx_db",
  password: "123456",
  database: "rentx",
  entities: [
    "src/modules/cars/infra/typeorm/entities/*.ts",
    "src/modules/users/infra/typeorm/entities/*.ts",
  ],
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export { AppDataSource };
