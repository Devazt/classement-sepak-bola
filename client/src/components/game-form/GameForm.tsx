"use client";

import styles from "./game-form.module.css";
import { useEffect, useState } from "react";

interface Match {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  scoreHome: number;
  scoreAway: number;
}

interface MatchInput {
  [key: string]: string;
  homeTeam: string;
  awayTeam: string;
  scoreHome: string;
  scoreAway: string;
  homeTeamId: string;
  awayTeamId: string;
}

export default function GameForm({ teams }: { teams: any[] }) {
  const [matchInputs, setMatchInputs] = useState<MatchInput[]>([
    {
      homeTeam: "",
      awayTeam: "",
      scoreHome: "",
      scoreAway: "",
      homeTeamId: "",
      awayTeamId: "",
    },
  ]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/games", {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
      });
  }, []);

  const handleInputChange = (index: number, key: string, value: string) => {
    const updatedInputs = [...matchInputs];
    updatedInputs[index][key] = value;
    setMatchInputs(updatedInputs);
  };

  const handleAddMatchInput = () => {
    setMatchInputs([
      ...matchInputs,
      {
        homeTeam: "",
        awayTeam: "",
        scoreHome: "",
        scoreAway: "",
        homeTeamId: "",
        awayTeamId: "",
      },
    ]);
  };

  const handleRemoveMatchInput = (index: number) => {
    const updatedInputs = matchInputs.filter((_, i) => i !== index);
    setMatchInputs(updatedInputs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      for (const matchInput of matchInputs) {
        const response = await fetch("http://localhost:5000/api/games", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            homeTeamId: parseInt(matchInput.homeTeamId, 10),
            awayTeamId: parseInt(matchInput.awayTeamId, 10),
            scoreHome: parseInt(matchInput.scoreHome, 10),
            scoreAway: parseInt(matchInput.scoreAway, 10),
          }),
        });

        if (response.ok) {
          setMatchInputs([
            {
              homeTeam: "",
              awayTeam: "",
              scoreHome: "",
              scoreAway: "",
              homeTeamId: "",
              awayTeamId: "",
            },
          ]);
          const homeTeam = teams.find(
            (team) => team.id == matchInput.homeTeamId
          );
          const awayTeam = teams.find(
            (team) => team.id == matchInput.awayTeamId
          );
          alert(
            `Match ${homeTeam.teamName} vs. ${awayTeam.teamName} submitted successfully`
          );
        } else {
          const homeTeam = teams.find(
            (team) => team.id == matchInput.homeTeamId
          );
          const awayTeam = teams.find(
            (team) => team.id == matchInput.awayTeamId
          );
          alert(
            `Failed to submit match between ${homeTeam.teamName} and ${awayTeam.teamName}, the match already exists.`
          );
        }
      }
    } catch (error: any) {
      console.error("Error submitting match:", error);
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter Match Details</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {matchInputs.map((matchInput, index) => (
            <div key={index} className={styles.formInput}>
              <div className={styles.club}>
                <div className={styles.homeClub}>
                  <label htmlFor={`homeTeamId${index}`}>Home Club:</label>
                  <select
                    value={matchInput.homeTeamId}
                    onChange={(e) =>
                      handleInputChange(index, "homeTeamId", e.target.value)
                    }
                    required
                  >
                    <option value="">Select Home Team</option>
                    {teams.map((team: any, index: number) => (
                      <option key={index} value={team.id}>
                        {team.teamName}
                      </option>
                    ))}
                  </select>
                </div>
                <h1 className={styles.vs}>_</h1>
                <div className={styles.awayClub}>
                  <label htmlFor={`awayTeamId${index}`}>Away Club:</label>
                  <select
                    value={matchInput.awayTeamId}
                    onChange={(e) =>
                      handleInputChange(index, "awayTeamId", e.target.value)
                    }
                    required
                  >
                    <option value="">Select Away Team</option>
                    {teams.map((team, index: number) => (
                      <option key={index} value={team.id}>
                        {team.teamName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.score}>
                <div className={styles.scoreHome}>
                  <label htmlFor={`scoreHome${index}`}>Home Score:</label>
                  <input
                    type="number"
                    id={`scoreHome${index}`}
                    value={matchInput.scoreHome}
                    onChange={(e) =>
                      handleInputChange(index, "scoreHome", e.target.value)
                    }
                    required
                  />
                </div>
                <h1 className={styles.vs}>_</h1>
                <div className={styles.scoreAway}>
                  <label htmlFor={`scoreAway${index}`}>Away Score:</label>
                  <input
                    type="number"
                    id={`scoreAway${index}`}
                    value={matchInput.scoreAway}
                    onChange={(e) =>
                      handleInputChange(index, "scoreAway", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className={styles.remove}>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMatchInput(index)}
                    className={styles.remove}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className={styles.add}>
            <button type="button" onClick={handleAddMatchInput}>
              Add Match
            </button>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.matches}>
        <h2>Matches:</h2>
        <ul>
          {matches.map((match, index) => {
            const homeTeam = teams.find((team) => team.id === match.homeTeamId);
            const awayTeam = teams.find((team) => team.id === match.awayTeamId);
            return (
              <li key={index}>
                {homeTeam ? homeTeam.teamName : match.homeTeamId}{" "}
                {match.scoreHome} - {match.scoreAway}{" "}
                {awayTeam ? awayTeam.teamName : match.awayTeamId}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
