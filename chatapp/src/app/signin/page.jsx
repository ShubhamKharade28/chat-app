"use client"
import styles from '@/app/styles/signin.module.css';
import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignIn = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const onClickLogin = async (e) => {
        e.preventDefault();

        let result = await fetch('http://localhost:8080/auth/login', {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });

        result = await result.json();
        if(!result.userFound){
            alert("Invalid username or email!");
        }else{
            if(result.error){
                alert("Unknown error occurred");
            }
            else if(!result.passwordMatched){
                alert("Wrong password!");
            }
            else{
                const { user } = result;
                localStorage.setItem("user", user.username);
                localStorage.setItem("userEmail", user.email);

                router.push('/');

                alert("Signed in successfully");
            }
        }
    }
    return (
        <div className={styles.signin}>
            <h2 className={styles.heading}>Login to ChatApp</h2>
            <form className={styles.signin_form}>
                <input type="text" placeholder="username/email" name="username"
                    onChange={(e) => setUsername(e.target.value)} />

                <input type="password" placeholder="password" name="password"
                    onChange={(e) => setPassword(e.target.value)} />

                <button onClick={onClickLogin} className={styles.login_btn} type="submit">Login</button>
            </form>
            <div className="w-1/2 h-0.5 bg-purple-900 bg-blend-saturation"></div>
            <div className={styles.to_signup}>
                <div className="text-purple-900 font-bold">Don't have account?</div>
                <Link href="/signup"
                className={styles.to_signup_btn}>Signup &rArr;</Link>
            </div>
        </div>
    )
}

export default SignIn;