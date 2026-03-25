"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { fetcher } from "@/lib/fetcher"

export default function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin = async () => {
        const res = await fetcher(`/api/login`, {
            method:"POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            }),
            credentials:"same-origin"
        })

        const data = await res.json()
        if(data.token){
            localStorage.setItem("token", data.token) 
            alert("登入成功")
            router.push("/events")
        }
        else{
            alert("登入失敗")
        }  
    }

    return (
        <div className="container">
            <h1>Login</h1>
            <input 
              placeholder="email" 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
              type="password"
              placeholder="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>
        </div>
    )

}