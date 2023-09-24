"use client";
import { useEffect, useState } from 'react';
import styles from '@/app/styles/newchat.module.css';
import ProfilePreview from '../components/profilePreview';
import Link from 'next/link';

const NewChat = () => {
    // const [search, setSearch] = useState("");
    const [newFriends, setNewFriends] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const user = localStorage.getItem('user');
            let res = await fetch(`http://localhost:8080/chat/new/${user}`);
            res = await res.json();
            if(res.error){
                alert(res.error);
            }else{
                setNewFriends(res);
            }
        }
        getData();

        console.log(newFriends);
    }, [newFriends]);

    if(newFriends.length == 0){
        return (
            <div className="flex flex-col gap-5 mx-auto justify-start items-center py-10">
                <h1 className="text-xl">
                    You don't have friends
                </h1>
                <h2><Link href={'/friends/addfriend'}>Add friends &rArr;</Link></h2>
            </div>
        )
    }

    return (
        <div className={styles.newchat}>
        {
            newFriends.map((newFriend) => {
                return <ProfilePreview
                            name={newFriend}
                            path={`/profile/${newFriend}`}
                            startChat={true}
                            key={newFriend} />
            })
        }
        </div>
    )
}

export default NewChat;