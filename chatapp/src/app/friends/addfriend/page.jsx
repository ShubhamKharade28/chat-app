"use client"
import FriendNav from '@/app/components/friendNav.component';
import ProfilePreview from '@/app/components/profilePreview';
import styles from '@/app/styles/friends.module.css';

import { useState } from 'react';

const AddFriend = () => {

    const currUser = localStorage.getItem('user');
    const [searchInput, setSearchInput] = useState("");
    const [Profiles, setProfiles] = useState([]);

    const onInputChange = (e) => {
        setSearchInput(e.target.value);
    }

    const onClickSearch = async (e) => {
        e.preventDefault();
        if(searchInput==""){
            alert('Enter input to search');
            return;
        }
        let result = await fetch('http://localhost:8080/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                user: currUser,
                search: searchInput
            })
        });

        result = await result.json();
        if(result.error){
            alert(result.error);
        }else if(result.usersFound){
            setProfiles(result.users);
        }else{
            alert("Users not found");
        }

        setSearchInput("");
    }

    return (
        <div className={styles.friends}>
            <div className={styles.addfriend}>
                <form className={styles.searchFriend}>
                    <input type="text" 
                    placeholder="Enter username or email to search" 
                    name="username" onChange={onInputChange} value={searchInput}/>
                    <button onClick={onClickSearch} className={styles.searchBtn}>Search</button>
                </form>
                <div className={styles.searchResult} >
                {
                    Profiles.map((profile) => {
                        return <ProfilePreview
                            name={profile.username} 
                            path={`/profile/${profile.username}`} 
                            isFriend={false}
                            key={profile.username}
                            />
                    })
                }
                </div>
            </div>
            <FriendNav />
        </div>
    )
}

export default AddFriend;