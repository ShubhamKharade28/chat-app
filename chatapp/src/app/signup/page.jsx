"use client";
import styles from '@/app/styles/signup.module.css';
import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onClickSignup = async (e) => {
        e.preventDefault();
        console.log(username,email);
        let result = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        result = await result.json();
        
        if(result.error){
            alert(result.error);
        }else if(result.userRegistered){
            localStorage.setItem('user', username);
            localStorage.setItem('userEmail', email);

            router.push('/');
        }else{
            alert('Unknown error occurred');
        }
    }
    return (
        <div className={styles.signup}>
            <h2 className={styles.heading}>Signup to ChatApp</h2>
            <form className={styles.signup_form}>
                <input type="email" placeholder="Enter email" name="email" required
                    onChange={(e) => setEmail(e.target.value)}/>

                <input type="text" placeholder="Enter name" name="name" required 
                    onChange={(e) => setName(e.target.value)}/>

                <input type="text" placeholder="Create Username" name="username" required
                    onChange={(e) => setUsername(e.target.value)}/>

                <input type="password" placeholder="Create Password" name="password" required
                    onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" onClick={onClickSignup} className={styles.signup_btn}>Signup</button>
            </form>
            <div className="w-1/2 h-0.5 bg-purple-900 lg:hidden"></div>
            <div className={styles.to_signin}>
                <div className="font-bold text-purple-950">Already have account?</div>
                <Link href="/signin"
                className={styles.to_signin_btn}>Signin &rArr;</Link>
            </div>
        </div>
    )
}

export default Register;