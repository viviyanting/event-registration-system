"use client"

import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () =>{
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <nav className={styles.nav}>
            <a href="/events" className={styles.link}>
              Events
            </a>
            <a href="/my-events" className={styles.link}>
              My Events
            </a>

            <button onClick={ handleLogout } className={styles.logout}>
                Logout
            </button>
        </nav>
    );
}