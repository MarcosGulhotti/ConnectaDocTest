import express from "express";
import { connectDatabase } from "./database";
import routes from "./routes";
import cors from "cors";

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
