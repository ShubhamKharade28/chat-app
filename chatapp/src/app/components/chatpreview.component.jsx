import styles from '@/app/styles/chats.module.css';
import Link from 'next/link';

const ChatPreview = (props) => {
        return (
        <Link className={styles.chat_preview} href={props.path}>
            <div className={styles.profile_photo}></div>
            <div className={styles.chat_name}>{props.name}</div>
        </Link>
        )
}

export default ChatPreview;