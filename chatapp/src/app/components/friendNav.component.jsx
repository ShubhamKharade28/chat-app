
import Link from "next/link";
import styles from '@/app/styles/friends.module.css';

const FriendNav = () => {
    
    return (
        <div className={styles.friendNav}>
            <Link href="/friends">Friends</Link>
            <Link href="/friends/addfriend">Add</Link>
            <Link href="/friends/friendrequests">Requests</Link>
        </div>
    )
}

export default FriendNav;