import { Router } from "express";
import * as teamController from "./team.controller";

const router = Router();

router.post("/teams", teamController.addTeam);
router.get("/teams", teamController.listTeams);

export default router;
