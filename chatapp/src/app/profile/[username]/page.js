"use client";
import ProfileComponent from "@/app/components/profile.component";
import { useState, useEffect } from "react";

const Profile = ({params}) => {
    const username = params.username;
    const [email, setEmail] = useState("not-available");

    useEffect(() => {
        const getData = async () => {
            let user = await fetch(`http://localhost:8080/search/${username}`);
            user = await user.json();
            
            if(user.error){
                alert(user.error);
            }else{
                setEmail(user.email);
            }
        }
    }, [])
    return <ProfileComponent username={username} useremail={email}/>
}

export default Profile;