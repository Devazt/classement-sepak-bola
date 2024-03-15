import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const calculateStandings = async () => {
  try {
    const teams = await prisma.team.findMany();

    const standings = [];

    for (const team of teams) {
      const games = await prisma.game.findMany({
        where: {
          OR: [{ homeTeamId: team.id }, { awayTeamId: team.id }],
        },
      });

      let played = 0;
      let won = 0;
      let draw = 0;
      let lost = 0;
      let goalWin = 0;
      let goalLost = 0;
      let points = 0;

      for (const game of games) {
        const isHomeTeam = game.homeTeamId === team.id;
        const isAwayTeam = game.awayTeamId === team.id;
        const isDraw = game.scoreHome === game.scoreAway;

        if (isHomeTeam || isAwayTeam) {
          played++;

          if (
            (isHomeTeam && game.scoreHome > game.scoreAway) ||
            (isAwayTeam && game.scoreAway > game.scoreHome)
          ) {
            won++;
            points += 3;
            goalWin += isHomeTeam ? game.scoreHome : game.scoreAway;
            goalLost += isHomeTeam ? game.scoreAway : game.scoreHome;
          } else if (
            (isHomeTeam && game.scoreHome < game.scoreAway) ||
            (isAwayTeam && game.scoreAway < game.scoreHome)
          ) {
            lost++;
            goalWin += isHomeTeam ? game.scoreAway : game.scoreHome;
            goalLost += isHomeTeam ? game.scoreHome : game.scoreAway;
          } else {
            draw++;
            points += 1;
            goalWin += isHomeTeam ? game.scoreHome : game.scoreAway;
            goalLost += isHomeTeam ? game.scoreAway : game.scoreHome;
          }
        }
      }

      standings.push({
        teamName: team.teamName,
        play: played,
        win: won,
        draw: draw,
        lose: lost,
        goalWin: goalWin,
        goalLost: goalLost,
        points: points,
      });
    }

    standings.sort((a, b) => b.points - a.points);

    return standings;
  } catch (error) {
    throw new Error(`Error getting standings: ${error}`);
  }
};
