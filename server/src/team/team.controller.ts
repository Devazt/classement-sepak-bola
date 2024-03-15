import { Request, Response } from "express";
import { createTeam, getAllTeams } from "./team.service";

export const addTeam = async (req: Request, res: Response) => {
  const { teamName, teamCity } = req.body;
  try {
    const team = await createTeam(teamName, teamCity);
    res.status(201).json(team);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const listTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await getAllTeams();
    res.status(200).json(teams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
