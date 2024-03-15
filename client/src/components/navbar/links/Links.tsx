"use client";

import Image from "next/image";
import styles from "./links.module.css";
import NavLink from "./navLink/NavLink";
import { useState } from "react";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Input Data Club",
    path: "/input-data-club",
  },
  {
    title: "Input Skor Pertandingan",
    path: "/input-skor-pertandingan",
  },
];

export default function Links() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink key={link.title} item={link} />
        ))}
      </div>
      <Image
        src={"/menu.png"}
        alt="menu"
        width={30}
        height={30}
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink key={link.title} item={link} />
          ))}
        </div>
      )}
    </div>
  );
}
