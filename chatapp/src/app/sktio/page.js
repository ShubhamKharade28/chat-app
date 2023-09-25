"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io('http://localhost:8080');

export default function sktio() {
    const [msg,setMsg] = useState('no message');
    useEffect(() => {
        socket.on('message', (data) => {
            console.log(data);
            setMsg(data);
        });

        socket.emit('message', 'Hello server');

        return () => {
            socket.disconnect();
        };
    },[])
    return (
        <div>{msg}</div>
    )
}