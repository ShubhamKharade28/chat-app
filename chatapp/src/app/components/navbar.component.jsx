"use client";

import styles from '@/app/styles/navbar.module.css';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

const Nav = () => {
    const pathName = usePathname();

    if(pathName.includes('/chat') || pathName.includes('/signin') || pathName.includes('/signup')){
        return <div className="h-0"></div>
    }
    return (
        <div className={styles.nav}>
            <Link href="/" className={styles.nav_item}>My Chats</Link>
            <Link href="/newchat" className={styles.nav_item}>New Chat</Link>
            <Link href="/profile" className={styles.nav_item}>Profile</Link>
            <Link href="/friends" className={styles.nav_item}>Friends</Link>
        </div>
    )
}

export default Nav;