import Classement from "@/components/classement/Classement";
import styles from "./home.module.css";
import { getStandings } from "@/lib/data";

export default async function Home() {
  const standing = await getStandings();

  return (
    <div className={styles.container}>
      <Classement standings={standing} />
    </div>
  );
}
