import GameForm from "@/components/game-form/GameForm";
import styles from "./input-skor-pertandingan.module.css";
import { getTeams } from "@/lib/data";

export default async function InputClub() {
  const teams = await getTeams();
  return (
    <div className={styles.container}>
      <GameForm teams={teams} />
    </div>
  );
}
