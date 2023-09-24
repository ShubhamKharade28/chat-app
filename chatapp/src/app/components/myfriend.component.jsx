"use client";
import styles from '@/app/styles/friends.module.css';
import ProfilePreview from './profilePreview';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Myfriends = () => {
    const [friends, setFriends] = useState([]);
    const user = localStorage.getItem('user');

    const router = useRouter();
    if(!user){
        router.push('/signin');
    }

    useEffect(() => {
        const getData = async () => {
            let res = await fetch(`http://localhost:8080/friend/${user}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            res = await res.json();
            if(res.error){
                alert(res.error);
            }else{
                setFriends(res);
            }
        }
        getData();
    }, [])

    return (
        <div className={styles.myfriends}>
            {
                friends.map((friend) => {
                    return <ProfilePreview 
                        name={friend} 
                        path={`/profile/${friend}`} 
                        isFriend={true}
                        key={friend} />
                })
            }
        </div>
    )
}

export default Myfriends;