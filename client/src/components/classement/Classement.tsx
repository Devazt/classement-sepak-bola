import styles from "./classement.module.css";

export default async function Classement({ standings }: any) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Klasemen Sepak Bola</h1>
      <div className={styles.tableBody}>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Klub</th>
              <th>Ma</th>
              <th>Me</th>
              <th>S</th>
              <th>K</th>
              <th>GM</th>
              <th>GK</th>
              <th>Point</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team: any, index: number) => (
              <tr key={team.teamName}>
                <td>{index + 1}</td>
                <td>{team.teamName}</td>
                <td>{team.play}</td>
                <td>{team.win}</td>
                <td>{team.draw}</td>
                <td>{team.lose}</td>
                <td>{team.goalWin}</td>
                <td>{team.goalLost}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.desc}>
        Ma = Main, Me = Menang, S = Seri, K = Kalah, GM = Goal Menang, GK = Goal
        Kalah
      </p>
    </div>
  );
}
