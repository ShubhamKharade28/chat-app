"use client";
import ChatPreview from "./chatpreview.component";
import styles from '@/app/styles/chats.module.css';
import { useState, useEffect } from 'react';

const Mychats = () => {
    const [chats, setChats] = useState([]);
    const user = localStorage.getItem('user');

    useEffect(() => {
        const getData = async () => {
            let res = await fetch(`http://localhost:8080/chat/${user}`);
            res = await res.json();

            if(res.error){
                alert(res.error);
            }
            else{
                setChats(res);
            }
        }
        getData();
    }, []);

    return (
        <div className={styles.all_chats}>
            {
                chats.map((chat) => {
                    return <ChatPreview 
                                name={chat} 
                                path={`/chat/${chat}`}
                            />
                })
            }
        </div>
    )
}

export default Mychats;