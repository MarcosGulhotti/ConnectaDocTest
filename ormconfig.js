const host = process.env.NODE_ENV === "production" ? "postgres" : "localhost";

const devEnv = {
  host,
  type: "postgres",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["./src/entities/**/**.ts"],
  migrations: ["./src/migrations/**/**.ts"],
  cli: {
    entitiesDir: "./src/entities/**/**.ts",
    migrationsDir: "./src/migrations",
  },
};

const prodEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["./dist/src/entities/**/*.js"],
  migrations: ["./dist/src/migrations/*.js"],
  cli: {
    migrationsDir: "./dist/src/migrations",
  },
  synchronize: false,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

let exportModule = undefined;
if (process.env.NODE_ENV === "production") {
  exportModule = prodEnv;
} else {
  exportModule = devEnv;
}

module.exports = exportModule;
