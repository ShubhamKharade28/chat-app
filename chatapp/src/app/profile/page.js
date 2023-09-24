"use client";
import ProfileComponent from "../components/profile.component";

const Profile = () => {
    const username = localStorage.getItem('user');
    const useremail = localStorage.getItem('userEmail');

    return (
        <ProfileComponent username={username} useremail={useremail}/>
    )
}

export default Profile;