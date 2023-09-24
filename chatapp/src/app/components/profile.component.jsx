"use client";
import styles from '@/app/styles/profile.module.css';
import { useRouter } from 'next/navigation';

const ProfileComponent = ({username,useremail}) => {
    
    const router = useRouter();

    const logoutHandler = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userEmail');

        router.push('/signin');
    }

    return (
        <div className={styles.profile}>
            <div className={styles.profile_photo}></div>
            <div className={styles.profile_content}>
                <label className={styles.label}>Username</label>
                <div className={styles.user_name}>{username}</div>
                <label className={styles.label}>Email</label>
                <div className={styles.email}>{useremail}</div>
                {
                    username == localStorage.getItem('user')?
                    <div className={styles.btns}>
                        <button className={styles.edit_profile}>Edit Profile</button>
                        <button className={styles.logout} onClick={logoutHandler}>Logout</button>
                    </div> : <></>
                }
            </div>
        </div>
    )
}

export default ProfileComponent;