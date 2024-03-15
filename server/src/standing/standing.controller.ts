import { Request, Response } from "express";
import * as standingService from "./standing.service";

export const getStandings = async (_req: Request, res: Response) => {
  try {
    const standings = await standingService.calculateStandings();
    res.status(200).json(standings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
