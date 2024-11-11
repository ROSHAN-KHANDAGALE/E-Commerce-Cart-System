/**
 * Importing packages in ES6
 */
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { initiatedDB } from "./config/db.js";
import mainRouter from "./routes/main.routes.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
initiatedDB();
app.use("/mern", mainRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;
