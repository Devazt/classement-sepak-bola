"use client";

import { useState } from "react";
import styles from "./input-data-club.module.css";

export default function InputClub() {
  const [teamName, setTeamName] = useState("");
  const [teamCity, setTeamCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamName, teamCity }),
      });

      if (!response.ok) {
        alert("Cannot add team that already exists");
        throw new Error("Failed to add team");
      }

      setTeamName("");
      setTeamCity("");
      setError("");

      console.log("Team added successfully");
      alert("Team added successfully");
    } catch (error) {
      console.error("Error submitting team:", error);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Input Data Club</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Nama Club"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Kota"
            value={teamCity}
            onChange={(e) => setTeamCity(e.target.value)}
            required
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
