
import FriendNav from '../components/friendNav.component';
import Myfriends from '../components/myfriend.component';
import styles from '@/app/styles/friends.module.css';

const Friends = () => {
    return (
        <div className={styles.friends}>
            <Myfriends />
            <FriendNav />
        </div>
    )
}

export default Friends;