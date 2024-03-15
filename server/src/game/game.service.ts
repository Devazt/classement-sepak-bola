import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createGame = async (gameData: any): Promise<any> => {
  try {
    const existingGame = await prisma.game.findFirst({
      where: {
        homeTeamId: gameData.homeTeamId,
        awayTeamId: gameData.awayTeamId,
      },
    });

    if (existingGame) {
      throw new Error("Game already exists");
    }

    const game = await prisma.game.create({
      data: gameData,
    });

    return game;
  } catch (error: any) {
    throw new Error(`Error creating game: ${error.message}`);
  }
};

export const getAllGames = async (): Promise<any[]> => {
  try {
    const games = await prisma.game.findMany();
    return games;
  } catch (error: any) {
    throw new Error(`Error fetching games: ${error.message}`);
  }
};
