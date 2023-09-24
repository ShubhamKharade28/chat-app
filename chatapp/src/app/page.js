"use client";
import { useRouter } from 'next/navigation';

import Mychats from "./components/mychats.component";

export default function Home() {

  //localStorage.setItem("user", "shubham@gmail.com");

  const router = useRouter();
  const user = localStorage.getItem('user');
  if(!user){
    router.push("/signin");
  }

  return (
    <main className="main">
      <h1 className="my-10 text-6xl text-transparent stroke uppercase">My chats</h1>
      <Mychats />
    </main>
  )
}
