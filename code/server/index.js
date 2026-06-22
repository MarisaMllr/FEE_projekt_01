import express from "express";
import dotenv from "dotenv";
import { mkdirSync } from "fs";
import { CONFIG } from "./config.js";
import todoRouter from "./routes/TodoRouter.js";

dotenv.config({ path: "code/.env" });
mkdirSync(CONFIG.data(""), { recursive: true });

const app = express();

const hostname = process.env.HOSTNAME || "127.0.0.1";
const port = process.env.PORT || 8081;

app.use(express.static(CONFIG.public));
app.use(express.json());
app.use("/api/todos", todoRouter);
app.use((req, res) => {
    res.redirect('/');
});

app.listen(port, hostname, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Example app listening at http://${hostname}:${port}`);
    }
});
