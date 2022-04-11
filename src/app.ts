import express from "express";
import { connectDatabase } from "./database";
import routes from "./routes";

const app = express();

connectDatabase();

app.use(express.json());
app.use(routes);

export default app;
