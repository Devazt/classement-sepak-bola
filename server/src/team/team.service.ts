import { PrismaClient, Team } from "@prisma/client";

const prisma = new PrismaClient();
export const createTeam = async (
  teamName: string,
  teamCity: string
): Promise<Team> => {
  try {
    const existingTeam = await prisma.team.findFirst({
      where: {
        teamName,
        teamCity,
      },
    });

    if (existingTeam) {
      throw new Error("Team already exists");
    }

    const team = await prisma.team.create({
      data: {
        teamName,
        teamCity,
      },
    });

    return team;
  } catch (error) {
    throw new Error(`Error creating team: ${error}`);
  }
};

export const getAllTeams = async (): Promise<Team[]> => {
  try {
    const teams = await prisma.team.findMany();
    return teams;
  } catch (error) {
    throw new Error(`Error getting teams: ${error}`);
  }
};
