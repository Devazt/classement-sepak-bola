import express from "express";
import cors from "cors";
import teamRoutes from "./team/team.router";
import gameRoutes from "./game/game.router";
import standingRoutes from "./standing/standing.router";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", teamRoutes);
app.use("/api", gameRoutes);
app.use("/api", standingRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "not found" });
});

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(5000, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:5000`)
);
