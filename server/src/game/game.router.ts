import { Router } from "express";
import * as gameController from "./game.controller";

const router = Router();

router.post("/games", gameController.addGame);
router.get("/games", gameController.listGames);

export default router;
