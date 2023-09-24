"use client"

import styles from '@/app/styles/chats.module.css';
import Link from 'next/link';
import { useEffect, useState,useRef } from 'react';

export default function ChatId({params}) {

    const user1 = localStorage.getItem('user');
    const user2 = params.id;

    const [ Messages, setMessages ] = useState([]);
    const [ chatExist, setChatExist ] = useState(true);
    const [ chatId, setChatId ] = useState("");

    useEffect(() => {
        const getData = async () => {
            let chat = await fetch('http://localhost:8080/chat', {
                method: "POST",
                body: JSON.stringify({
                    user1,
                    user2,
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
            chat = await chat.json();
            if(chat.error){
                alert("Error occurred")
            }else if(!chat.found){
                setChatExist(false);
            }else{
                setChatExist(true);
                setChatId(chat.chatId);
                setMessages(chat.messages);
            }
        }
        getData();
    }, []);

    const [ messageInput, setMessageInput ] = useState("");
    const inputChangeHandler = (e) => {
        setMessageInput(e.target.value);
    }

    const messageEndRef = useRef("");
    useEffect(() => {
        console.log("Scrolling to bottom");
        messageEndRef.current?.scrollIntoView({behaviour: 'smooth'});
    },[Messages])
    
    const sendClickHandler = async (e) => {
        e.preventDefault();
        if(messageInput == "") return;

        if(!chatExist){
            let createRes = await fetch(`http://localhost:8080/chat/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user1,
                    user2,
                })
            });
            createRes = await createRes.json();
            if(createRes.error){
                alert(createRes.error);
                return;
            }else{
                setChatId(createRes.chatId);  
            }
        }

        let message = {
            sender: user1,
            receiver: user2,
            payload: messageInput,
        };

        let res = await fetch('http://localhost:8080/message/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
        res = await res.json();

        if(res.error) {
            alert("Error occurred");
        }else if(!res.success){
            alert("Failed to send message")
        }else{
            message.time = Date.now();
            let messages = Messages;
            messages.push(message);
            setMessages(messages);
            setMessageInput("");
        }
    }
    
    return (
        <div className={styles.chat}>
            <div className={styles.chatNav}>
                <Link className={styles.toHome} href="/">&lArr;</Link>
                <Link className={styles.toProfile} href={`/profile/${params.id}`}>
                    <div className={styles.profilePhoto}></div>
                    <div className={styles.profileName}>{params.id}</div>
                </Link>
            </div>

            <div className={styles.messages}>
            {
                Messages.map((item,index) => {
                    if(item.sender == user1){
                        return (
                            <div className={styles.messageSent} key={index}>
                                <div className={styles.messageRight}>{item.payload}</div>
                            </div>
                        );
                    }else{
                        return (
                            <div className={styles.messageReceived} key={index}>
                                <div className={styles.messageLeft}>{item.payload}</div>
                            </div>
                        );
                    }
                })
            }
            <span className="h-0" ref={messageEndRef}></span>
            </div>

            <form className={styles.messageToSend} >
                <input className={styles.messageInput} onChange={inputChangeHandler}
                 type="text" name="message" placeholder="Message" value={messageInput}/>
                <button className={styles.sendBtn} onClick={sendClickHandler} >
                    &rarr;
                </button>
            </form>
        </div>
    )
}