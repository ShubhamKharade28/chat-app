"use client";
import styles from '@/app/styles/profilePreview.module.css';
import Link from 'next/link';
import { useState } from 'react';

const ProfilePreview = (props) => {
    const user = localStorage.getItem('user');
    const secondUser = props.name;

    const [ addTextValue, setAddTextValue] = useState('Add');
    const onClickAdd = async () => {
        let res = await fetch('http://localhost:8080/request/send', {
            method: 'POST',
            body: JSON.stringify({
                currUser: user,
                secondUser,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        res = await res.json();

        if(res.requestSent){
            // alert(`Friend request send to ${secondUser}`);
            setAddTextValue('Sent');
        }else{
            alert(res.error);
        }
    }
    
    const [removeTextValue, setRemoveTextValue] = useState('Remove');
    const onClickRemove = async (e) => {
        e.preventDefault();
        console.log(user, secondUser);
        let res = await fetch('http://localhost:8080/friend/remove', {
            method: 'POST',
            body: JSON.stringify({
                user: user,
                toRemove: secondUser,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        res = await res.json();
        if(res.error){
            alert(res.error);
        }else{
            // alert(`${res.friendRemoved} removed from friends!`);
            setRemoveTextValue('Removed');
        }
    }

    const [acceptTextValue, setAcceptTextValue] = useState('Accept');
    const onClickAccept = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8080/request/accept', {
            method: 'POST',
            body: JSON.stringify({
                currUser: user,
                secondUser,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if(res.error){
            alert(res.error);
        }else{
            setAcceptTextValue('Accepted');
        }
    }

    if(props.isRequest){
        return (
            <div className={styles.profilePreview}>
                <div className={styles.profilePhoto}></div>
                <Link className={styles.profileName} href={props.path}>{props.name}</Link>
                <button onClick={onClickAccept}>{acceptTextValue}</button>
            </div>
        )
    }

    if(props.startChat){
        return (
            <div className={styles.profilePreview}>
                <div className={styles.profilePhoto}></div>
                <Link className={styles.profileName} href={props.path}>{props.name}</Link>
                <button><Link href={`/chat/${props.name}`} >Chat</Link></button>
            </div>
        )
    }
    
    return (
        <div className={styles.profilePreview}>
            <div className={styles.profilePhoto}></div>
            <Link className={styles.profileName} href={props.path}>{props.name}</Link>
            {
                (props.isFriend) ? <button onClick={onClickRemove}>{removeTextValue}</button> 
                    : <button onClick={onClickAdd}>{addTextValue}</button>
            }
            
        </div>
    )
}

export default ProfilePreview;