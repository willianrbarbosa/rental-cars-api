import express from "express";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3003, () => {
  console.log("Server is running on port 3003!");
});

// https://www.notion.so/ESLint-e-Prettier-Trilha-Node-js-d3f3ef576e7f45dfbbde5c25fa662779
