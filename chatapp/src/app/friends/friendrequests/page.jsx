"use client";
import styles from '@/app/styles/friends.module.css';
import ProfilePreview from '@/app/components/profilePreview';
import FriendNav from '@/app/components/friendNav.component';
import { useEffect, useState } from 'react';

const FriendRequests = () => {

    const [requests, setRequests] = useState([]);
    const user = localStorage.getItem('user');

    useEffect(() => {
        const getData = async () => {
            let res = await fetch(`http://localhost:8080/request/${user}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            res = await res.json();
            if(res.error){
                alert(res.error);
            }else{
                setRequests(res);
            }
        }
        getData();
    } , []);
    return (
        <div className={styles.friends} >
            <div className={styles.friendRequests}>
                {
                    requests.map((request) => {
                        return <ProfilePreview name={request} path={`profile/${request}`} isRequest={true} />
                    })
                }
            </div>
            <FriendNav />
        </div>
    )
}

export default FriendRequests;