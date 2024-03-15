import { Request, Response } from "express";
import { createGame, getAllGames } from "./game.service";

export const addGame = async (req: Request, res: Response) => {
  try {
    const games = await createGame(req.body);
    res.json(games);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export const listGames = async (_req: Request, res: Response) => {
  try {
    const games = await getAllGames();
    res.status(200).json(games);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
