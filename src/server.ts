import "reflect-metadata";
import app from "./app";
import { config } from "dotenv";
import cors from "cors";

config();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
