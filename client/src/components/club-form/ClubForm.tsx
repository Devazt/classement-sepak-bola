"use client";

import styles from "./clubForm.module.css";
import { useState } from "react";

export default function ClubForm({ onClubSubmit }: any) {
  const [teamName, setTeamName] = useState("");
  const [teamCity, setTeamCity] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!teamName || !teamCity) {
        setError("Please fill in all fields.");
        return;
      }

      await onClubSubmit({ teamName, teamCity });
      setTeamName("");
      setTeamName("");
      setError("");
    } catch (error) {
      console.error("Error submitting club:", error);
      setError("Failed to add club");
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
