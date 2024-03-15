import { Router } from "express";
import * as standingController from "./standing.controller";

const router = Router();

router.get("/standings", standingController.getStandings);

export default router;
